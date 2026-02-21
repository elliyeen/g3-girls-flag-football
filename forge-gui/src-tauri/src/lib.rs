use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::process::Command;

// ── TOML data structures ──────────────────────────────────────────────────────

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Compliance {
    controls_total:       u32,
    controls_implemented: u32,
    open_findings:        u32,
    #[serde(default)]
    required_level: u8,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Milestone {
    id:           String,
    name:         String,
    description:  String,
    owner:        String,
    due_date:     String,
    #[serde(default)]
    completed_date: Option<String>,
    status:       String,
    #[serde(default)]
    notes:        Option<String>,
    #[serde(default)]
    dependencies: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Phase {
    name:           String,
    start_date:     String,
    end_date:       String,
    status:         String,
    completion_pct: u8,
    #[serde(default)]
    notes: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Project {
    id:               String,
    name:             String,
    description:      String,
    sponsor:          String,
    pm:               String,
    start_date:       String,
    target_end_date:  String,
    current_phase:    String,
    overall_status:   String,
    budget_total_usd: u64,
    budget_spent_usd: u64,
    compliance:       Compliance,
    #[serde(default)]
    milestones: Vec<Milestone>,
    #[serde(default)]
    phases: Vec<Phase>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Risk {
    id:               String,
    title:            String,
    description:      String,
    category:         String,
    probability:      String,
    impact:           String,
    status:           String,
    owner:            String,
    identified_date:  String,
    last_reviewed:    String,
    #[serde(default)]
    mitigation_plan: String,
    #[serde(default)]
    contingency_plan: Option<String>,
    #[serde(default)]
    escalation_required: bool,
    #[serde(default)]
    notes: Option<String>,
}

#[derive(Debug, Deserialize)]
struct RisksFile { risks: Vec<Risk> }

#[derive(Debug, Deserialize, Serialize, Clone)]
struct SecurityAttestation {
    #[serde(default)]
    is_current: bool,
    #[serde(default)]
    expiry_date: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Vendor {
    name: String,
    #[serde(default)]
    status: String,
    #[serde(default)]
    contract_end_date: Option<String>,
    #[serde(default)]
    security_attestation: Option<SecurityAttestation>,
}

#[derive(Debug, Deserialize)]
struct VendorsFile {
    #[serde(default)]
    vendors: Vec<Vendor>,
}

// ── Frontend types ────────────────────────────────────────────────────────────

#[derive(Debug, Serialize, Clone)]
pub struct ProjectSummary {
    pub id:                 String,
    pub name:               String,
    pub agent_id:           String,
    pub status:             String,
    pub phase:              String,
    pub pm:                 String,
    pub budget_total:       u64,
    pub budget_spent:       u64,
    pub budget_burn_pct:    Option<f32>,
    pub open_risks:         usize,
    pub critical_risks:     usize,
    pub overdue_milestones: usize,
    pub total_milestones:   usize,
    pub done_milestones:    usize,
    pub compliance_pct:     f32,
    pub open_findings:      u32,
}

#[derive(Debug, Serialize)]
pub struct AgentDetail {
    pub summary:    ProjectSummary,
    pub project:    serde_json::Value,
    pub milestones: Vec<serde_json::Value>,
    pub risks:      Vec<serde_json::Value>,
    pub vendors:    Vec<serde_json::Value>,
    pub reports:    Vec<ReportFile>,
}

#[derive(Debug, Serialize, Clone)]
pub struct ReportFile {
    pub filename:   String,
    pub path:       String,
    pub agent_id:   String,
    pub size_bytes: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AppConfig {
    pub forge_binary: String,
    pub data_dir:     String,
    pub output_dir:   String,
    pub logs_dir:     String,
    pub config_path:  String,
}

impl Default for AppConfig {
    fn default() -> Self {
        let home = dirs::home_dir().unwrap_or_default();
        let base = home.join("Tech PM").join("tpm-agents");
        Self {
            forge_binary: base.join("target").join("release").join("forge")
                .to_string_lossy().into(),
            data_dir:    base.join("data").to_string_lossy().into(),
            output_dir:  base.join("outputs").to_string_lossy().into(),
            logs_dir:    base.join("logs").to_string_lossy().into(),
            config_path: base.join("config").join("settings.toml")
                .to_string_lossy().into(),
        }
    }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

fn agent_ids() -> Vec<&'static str> {
    vec!["physical_security", "crm", "cloud_migration", "erp",
         "infrastructure", "agile", "risk"]
}

fn risk_score(probability: &str, impact: &str) -> u8 {
    let p = match probability { "high" => 3, "medium" => 2, _ => 1 };
    let i = match impact       { "high" => 3, "medium" => 2, _ => 1 };
    p * i
}

fn load_project(data_dir: &str, agent_id: &str) -> anyhow::Result<Project> {
    let path = PathBuf::from(data_dir).join(agent_id).join("project.toml");
    let raw  = std::fs::read_to_string(&path)?;
    Ok(toml::from_str(&raw)?)
}

fn load_risks(data_dir: &str, agent_id: &str) -> Vec<Risk> {
    let path = PathBuf::from(data_dir).join(agent_id).join("risks.toml");
    let Ok(raw) = std::fs::read_to_string(&path) else { return vec![]; };
    toml::from_str::<RisksFile>(&raw).map(|f| f.risks).unwrap_or_default()
}

fn load_vendors(data_dir: &str, agent_id: &str) -> Vec<Vendor> {
    let path = PathBuf::from(data_dir).join(agent_id).join("vendors.toml");
    let Ok(raw) = std::fs::read_to_string(&path) else { return vec![]; };
    toml::from_str::<VendorsFile>(&raw).map(|f| f.vendors).unwrap_or_default()
}

fn today_string() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let secs = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs();
    epoch_secs_to_date(secs)
}

fn epoch_secs_to_date(secs: u64) -> String {
    let mut d    = (secs / 86400) as i64;
    let mut year = 1970i32;
    loop {
        let yd = if is_leap(year) { 366 } else { 365 };
        if d < yd { break; }
        d -= yd;
        year += 1;
    }
    let mdays = [31i64, if is_leap(year) { 29 } else { 28 }, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let mut month = 1u32;
    for &md in &mdays {
        if d < md { break; }
        d -= md;
        month += 1;
    }
    format!("{:04}-{:02}-{:02}", year, month, d + 1)
}

fn is_leap(y: i32) -> bool {
    (y % 4 == 0 && y % 100 != 0) || y % 400 == 0
}

fn project_to_summary(agent_id: &str, p: &Project, risks: &[Risk]) -> ProjectSummary {
    let today = today_string();
    let open_risks = risks.iter()
        .filter(|r| r.status == "open" || r.status == "mitigating" || r.status == "escalated")
        .count();
    let critical_risks = risks.iter()
        .filter(|r| risk_score(&r.probability, &r.impact) >= 6 || r.escalation_required)
        .count();
    let overdue_milestones = p.milestones.iter()
        .filter(|m| m.status != "complete" && m.due_date < today)
        .count();
    let done_milestones = p.milestones.iter()
        .filter(|m| m.status == "complete")
        .count();
    let compliance_pct = if p.compliance.controls_total > 0 {
        p.compliance.controls_implemented as f32 / p.compliance.controls_total as f32 * 100.0
    } else {
        0.0
    };
    let budget_burn_pct = if p.budget_total_usd > 0 {
        Some(p.budget_spent_usd as f32 / p.budget_total_usd as f32 * 100.0)
    } else {
        None
    };
    ProjectSummary {
        id:                 p.id.clone(),
        name:               p.name.clone(),
        agent_id:           agent_id.to_string(),
        status:             p.overall_status.clone(),
        phase:              p.current_phase.clone(),
        pm:                 p.pm.clone(),
        budget_total:       p.budget_total_usd,
        budget_spent:       p.budget_spent_usd,
        budget_burn_pct,
        open_risks,
        critical_risks,
        overdue_milestones,
        total_milestones:   p.milestones.len(),
        done_milestones,
        compliance_pct,
        open_findings:      p.compliance.open_findings,
    }
}

fn collect_reports(dir: &PathBuf, agent_id: &str) -> Vec<ReportFile> {
    let Ok(entries) = std::fs::read_dir(dir) else { return vec![]; };
    let mut files: Vec<ReportFile> = entries
        .flatten()
        .filter(|e| e.path().extension().and_then(|x| x.to_str()) == Some("md"))
        .map(|e| {
            let path     = e.path();
            let filename = path.file_name().unwrap_or_default().to_string_lossy().to_string();
            let size     = e.metadata().map(|m| m.len()).unwrap_or(0);
            ReportFile { filename, path: path.to_string_lossy().to_string(),
                         agent_id: agent_id.to_string(), size_bytes: size }
        })
        .collect();
    files.sort_by(|a, b| b.filename.cmp(&a.filename));
    files
}

fn config_path() -> PathBuf {
    dirs::config_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("forge-gui")
        .join("config.json")
}

// ── Tauri commands ────────────────────────────────────────────────────────────
// Commands are in a submodule to avoid the Rust 1.83+ E0255 macro namespace
// conflict caused by tauri-macros generating both `macro_rules! __cmd__X` and
// `pub use __cmd__X` in the same scope.

mod commands {
    use super::*;

    #[tauri::command]
    pub fn get_portfolio(data_dir: String) -> Result<Vec<ProjectSummary>, String> {
        let mut summaries = Vec::new();
        for id in agent_ids() {
            if let Ok(project) = load_project(&data_dir, id) {
                let risks = load_risks(&data_dir, id);
                summaries.push(project_to_summary(id, &project, &risks));
            }
        }
        Ok(summaries)
    }

    #[tauri::command]
    pub fn get_agent_detail(agent_id: String, data_dir: String) -> Result<AgentDetail, String> {
        let project = load_project(&data_dir, &agent_id).map_err(|e| e.to_string())?;
        let risks   = load_risks(&data_dir, &agent_id);
        let vendors = load_vendors(&data_dir, &agent_id);
        let summary = project_to_summary(&agent_id, &project, &risks);

        let out_base = PathBuf::from(data_dir.trim_end_matches('/'))
            .parent().unwrap_or_else(|| std::path::Path::new("."))
            .join("outputs");
        let reports = collect_reports(&out_base.join(&agent_id), &agent_id);

        Ok(AgentDetail {
            summary,
            project:    serde_json::to_value(&project).unwrap_or_default(),
            milestones: project.milestones.iter()
                .map(|m| serde_json::to_value(m).unwrap_or_default()).collect(),
            risks: risks.iter()
                .map(|r| serde_json::to_value(r).unwrap_or_default()).collect(),
            vendors: vendors.iter()
                .map(|v| serde_json::to_value(v).unwrap_or_default()).collect(),
            reports,
        })
    }

    #[tauri::command]
    pub fn get_all_reports(output_dir: String) -> Result<Vec<ReportFile>, String> {
        let base = PathBuf::from(&output_dir);
        let mut all = Vec::new();
        for id in agent_ids() {
            all.extend(collect_reports(&base.join(id), id));
        }
        all.sort_by(|a, b| b.filename.cmp(&a.filename));
        Ok(all)
    }

    #[tauri::command]
    pub fn read_report_file(path: String) -> Result<String, String> {
        std::fs::read_to_string(&path).map_err(|e| e.to_string())
    }

    #[tauri::command]
    pub fn run_forge(binary_path: String, args: Vec<String>) -> Result<String, String> {
        let out = Command::new(&binary_path)
            .args(&args)
            .output()
            .map_err(|e| format!("Failed to launch forge: {e}"))?;
        let combined = format!(
            "{}{}",
            String::from_utf8_lossy(&out.stdout),
            String::from_utf8_lossy(&out.stderr)
        );
        if out.status.success() { Ok(combined) } else { Err(combined) }
    }

    #[tauri::command]
    pub fn get_app_config() -> Result<AppConfig, String> {
        let path = super::config_path();
        if path.exists() {
            let raw = std::fs::read_to_string(&path).map_err(|e| e.to_string())?;
            serde_json::from_str(&raw).map_err(|e| e.to_string())
        } else {
            Ok(AppConfig::default())
        }
    }

    #[tauri::command]
    pub fn save_app_config(config: AppConfig) -> Result<(), String> {
        let path = super::config_path();
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
        let raw = serde_json::to_string_pretty(&config).map_err(|e| e.to_string())?;
        std::fs::write(&path, raw).map_err(|e| e.to_string())
    }

    #[tauri::command]
    pub fn read_settings_toml(config_path: String) -> Result<String, String> {
        std::fs::read_to_string(&config_path).map_err(|e| e.to_string())
    }
}

// ── Entry point ───────────────────────────────────────────────────────────────

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_portfolio,
            commands::get_agent_detail,
            commands::get_all_reports,
            commands::read_report_file,
            commands::run_forge,
            commands::get_app_config,
            commands::save_app_config,
            commands::read_settings_toml,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Forge");
}
