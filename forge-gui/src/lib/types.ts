export type AgentId =
  | "physical_security" | "crm" | "cloud_migration"
  | "erp" | "infrastructure" | "agile" | "risk";

export type ProjectStatus = "on_track" | "at_risk" | "off_track" | "on_hold" | "completed";
export type RiskStatus    = "open" | "mitigating" | "accepted" | "closed" | "escalated";
export type MilestoneStatus = "not_started" | "in_progress" | "complete" | "overdue" | "blocked";

export interface ProjectSummary {
  id:                 string;
  name:               string;
  agent_id:           AgentId;
  status:             ProjectStatus;
  phase:              string;
  pm:                 string;
  budget_total:       number;
  budget_spent:       number;
  budget_burn_pct:    number | null;
  open_risks:         number;
  critical_risks:     number;
  overdue_milestones: number;
  total_milestones:   number;
  done_milestones:    number;
  compliance_pct:     number;
  open_findings:      number;
}

export interface Milestone {
  id:             string;
  name:           string;
  description:    string;
  owner:          string;
  due_date:       string;
  completed_date: string | null;
  status:         MilestoneStatus;
  notes:          string | null;
  dependencies:   string[];
}

export interface Risk {
  id:                  string;
  title:               string;
  description:         string;
  category:            string;
  probability:         string;
  impact:              string;
  status:              RiskStatus;
  owner:               string;
  identified_date:     string;
  last_reviewed:       string;
  mitigation_plan:     string;
  contingency_plan:    string | null;
  escalation_required: boolean;
  notes:               string | null;
}

export interface Vendor {
  name:              string;
  status:            string;
  contract_end_date: string | null;
  security_attestation: { is_current: boolean; expiry_date: string | null } | null;
}

export interface AgentDetail {
  summary:    ProjectSummary;
  project:    Record<string, unknown>;
  milestones: Milestone[];
  risks:      Risk[];
  vendors:    Vendor[];
  reports:    ReportFile[];
}

export interface ReportFile {
  filename:   string;
  path:       string;
  agent_id:   string;
  size_bytes: number;
}

export interface AppConfig {
  forge_binary: string;
  data_dir:     string;
  output_dir:   string;
  logs_dir:     string;
  config_path:  string;
}

export type UserRole = "admin" | "manager" | "viewer";

export interface UserAccount {
  name:        string;
  email:       string;
  role:        UserRole;
  avatar_initials: string;
}

export const AGENT_META: Record<AgentId, { label: string; role: string; clearance: string }> = {
  physical_security: { label: "Physical Security", role: "Guardian",   clearance: "FedRAMP High" },
  crm:               { label: "CRM",                role: "Communicator", clearance: "FedRAMP Moderate" },
  cloud_migration:   { label: "Cloud Migration",    role: "Navigator",  clearance: "FedRAMP High" },
  erp:               { label: "ERP",                role: "Sentinel",   clearance: "FedRAMP Moderate" },
  infrastructure:    { label: "Infrastructure",     role: "Foundation", clearance: "FedRAMP High" },
  agile:             { label: "Agile",              role: "Coach",      clearance: "SOC 2" },
  risk:              { label: "Risk",               role: "Watchdog",   clearance: "FedRAMP High" },
};

export const ROLE_META: Record<UserRole, { label: string; description: string }> = {
  admin:   { label: "Admin",   description: "Full access — run agents, edit settings, manage access." },
  manager: { label: "Manager", description: "Run agents, view all reports. Cannot edit global settings." },
  viewer:  { label: "Viewer",  description: "Read-only access to reports and project status." },
};
