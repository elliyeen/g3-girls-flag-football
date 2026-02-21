import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutGrid, Activity, FileText, MessageSquare,
  Settings, ChevronRight, Shield, FolderPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import type { UserRole } from "@/lib/types";
import { ROLE_META } from "@/lib/types";

const NAV = [
  { to: "/",        icon: LayoutGrid,   label: "Overview"  },
  { to: "/agents",  icon: Activity,     label: "Agents"    },
  { to: "/submit",  icon: FolderPlus,   label: "New Project" },
  { to: "/reports", icon: FileText,     label: "Reports"   },
  { to: "/ask",     icon: MessageSquare,label: "Ask Seal"  },
];

const ROLE_COLOR: Record<UserRole, string> = {
  admin:   "text-ember",
  manager: "text-steel",
  viewer:  "text-subtle",
};

export function Sidebar() {
  const { account } = useAppStore();
  const navigate    = useNavigate();

  return (
    <aside className="flex flex-col w-[220px] min-w-[220px] h-full border-r border-border bg-surface">
      {/* Wordmark — space for macOS traffic lights (28px titlebar = pt-7) */}
      <div
        className="pt-[52px] px-5 pb-4"
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        <span className="flex items-center gap-2 text-[15px] font-bold tracking-tight text-bright">
          <Shield size={16} className="text-ember" strokeWidth={2} />
          Seal
        </span>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 px-2 space-y-0.5 overflow-y-auto"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => cn(
              "flex items-center gap-2.5 px-3 h-8 rounded-md text-[13px] transition-colors duration-100",
              isActive
                ? "bg-raised text-bright font-medium"
                : "text-subtle hover:text-primary hover:bg-raised/50"
            )}
          >
            {({ isActive }) => (
              <>
                <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
                {label}
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-4 px-3">
          <p className="text-label mb-2">Settings</p>
        </div>

        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-2.5 px-3 h-8 rounded-md text-[13px] transition-colors duration-100",
            isActive
              ? "bg-raised text-bright font-medium"
              : "text-subtle hover:text-primary hover:bg-raised/50"
          )}
        >
          {({ isActive }) => (
            <>
              <Settings size={15} strokeWidth={isActive ? 2 : 1.5} />
              Settings
            </>
          )}
        </NavLink>
      </nav>

      {/* Account footer */}
      <button
        onClick={() => navigate("/account")}
        className="group flex items-center gap-3 px-4 py-4 border-t border-border
                   hover:bg-raised/50 transition-colors duration-100 text-left w-full"
      >
        <div className="flex-shrink-0 size-7 rounded-full bg-raised border border-border
                        flex items-center justify-center text-[11px] font-semibold text-subtle">
          {account.avatar_initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-primary truncate">{account.name}</p>
          <p className={cn("text-[11px]", ROLE_COLOR[account.role])}>
            {ROLE_META[account.role].label}
          </p>
        </div>
        <ChevronRight size={13} className="text-muted group-hover:text-subtle transition-colors" />
      </button>
    </aside>
  );
}
