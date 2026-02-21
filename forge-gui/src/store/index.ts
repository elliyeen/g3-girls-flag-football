import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppConfig, UserAccount, UserRole } from "../lib/types";

interface AppStore {
  config:       AppConfig | null;
  setConfig:    (c: AppConfig) => void;

  account:      UserAccount;
  setAccount:   (a: UserAccount) => void;
  setRole:      (r: UserRole) => void;

  selectedModel:    string;
  setSelectedModel: (m: string) => void;

  runOutput:    string;
  runStatus:    "idle" | "running" | "success" | "error";
  setRunOutput: (o: string) => void;
  setRunStatus: (s: AppStore["runStatus"]) => void;
  clearRun:     () => void;
}

const DEFAULT_ACCOUNT: UserAccount = {
  name:            "Project Manager",
  email:           "pm@seal.local",
  role:            "admin",
  avatar_initials: "PM",
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      config:    null,
      setConfig: (config) => set({ config }),

      account:   DEFAULT_ACCOUNT,
      setAccount:(account) => set({ account }),
      setRole:   (role) => set((s) => ({ account: { ...s.account, role } })),

      selectedModel:    "default",
      setSelectedModel: (selectedModel) => set({ selectedModel }),

      runOutput: "",
      runStatus: "idle",
      setRunOutput: (runOutput) => set({ runOutput }),
      setRunStatus: (runStatus) => set({ runStatus }),
      clearRun:     () => set({ runOutput: "", runStatus: "idle" }),
    }),
    {
      name: "seal-store",
      partialize: (s) => ({ config: s.config, account: s.account, selectedModel: s.selectedModel }),
    }
  )
);
