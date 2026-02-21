import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Shell }      from "@/components/layout/Shell";
import { useAppStore } from "@/store";
import { api }        from "@/lib/api";
import Dashboard      from "@/pages/Dashboard";
import Agents         from "@/pages/Agents";
import AgentDetail    from "@/pages/AgentDetail";
import Reports        from "@/pages/Reports";
import Ask            from "@/pages/Ask";
import Settings       from "@/pages/Settings";
import Account        from "@/pages/Account";

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function Initialiser() {
  const { setConfig } = useAppStore();
  useEffect(() => {
    // Always fetch from disk on mount so stale localStorage never blocks data load
    api.getAppConfig().then(setConfig).catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <Initialiser />
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route index         element={<Dashboard />} />
            <Route path="agents"     element={<Agents />} />
            <Route path="agents/:id" element={<AgentDetail />} />
            <Route path="reports"    element={<Reports />} />
            <Route path="ask"        element={<Ask />} />
            <Route path="settings"   element={<Settings />} />
            <Route path="account"    element={<Account />} />
            <Route path="*"          element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
