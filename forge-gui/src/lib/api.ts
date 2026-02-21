import { invoke } from "@tauri-apps/api/core";
import type { AppConfig, AgentDetail, ProjectSummary, ReportFile } from "./types";

export const api = {
  getPortfolio:    (dataDir: string) =>
    invoke<ProjectSummary[]>("get_portfolio", { dataDir }),

  getAgentDetail:  (agentId: string, dataDir: string) =>
    invoke<AgentDetail>("get_agent_detail", { agentId, dataDir }),

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

};
