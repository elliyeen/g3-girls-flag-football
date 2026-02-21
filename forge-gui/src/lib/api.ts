import { invoke } from "@tauri-apps/api/core";
import type { AppConfig, AgentDetail, ProjectSummary, ReportFile, ProjectBrief } from "./types";

export const api = {
  getPortfolio:    (dataDir: string) =>
    invoke<ProjectSummary[]>("get_portfolio", { dataDir }),

  getAgentDetail:  (agentId: string, dataDir: string, outputDir: string) =>
    invoke<AgentDetail>("get_agent_detail", { agentId, dataDir, outputDir }),

  getAllReports:   (outputDir: string) =>
    invoke<ReportFile[]>("get_all_reports", { outputDir }),

  readReportFile:  (path: string) =>
    invoke<string>("read_report_file", { path }),

  runForge:        (binaryPath: string, args: string[]) =>
    invoke<string>("run_forge", { binaryPath, args }),

  getAppConfig:    () =>
    invoke<AppConfig>("get_app_config"),

  saveAppConfig:   (config: AppConfig) =>
    invoke<void>("save_app_config", { config }),

  scanProjects:    (dataDir: string) =>
    invoke<string[]>("scan_projects", { dataDir }),

  writeProjectBrief: (dataDir: string, brief: ProjectBrief) =>
    invoke<string>("write_project_brief", {
      dataDir,
      slug:           brief.slug,
      name:           brief.name,
      description:    brief.description,
      sponsor:        brief.sponsor,
      pm:             brief.pm,
      startDate:      brief.start_date,
      targetEndDate:  brief.target_end_date,
      budgetTotalUsd: brief.budget_total_usd,
    }),
};
