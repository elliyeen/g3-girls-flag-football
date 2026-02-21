import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { useAppStore } from "@/store";
import { ROLE_META, type UserRole } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ROLES: UserRole[] = ["admin", "manager", "viewer"];
const ROLE_ACTIVE: Record<UserRole, string> = {
  admin:   "border-ember",
  manager: "border-steel",
  viewer:  "border-subtle",
};

export default function Account() {
  const navigate  = useNavigate();
  const { account, setAccount, setRole } = useAppStore();
  const [name,    setName]    = useState(account.name);
  const [email,   setEmail]   = useState(account.email);
  const [initials,setInitials]= useState(account.avatar_initials);
  const [saved,   setSaved]   = useState(false);

  function save() {
    setAccount({ ...account, name, email, avatar_initials: initials });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="px-6 py-5 space-y-6 max-w-[560px]">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-subtle hover:text-primary text-[12px] mb-3 transition-colors"
        >
          <ArrowLeft size={13} /> Back
        </button>
        <h1 className="text-title">Account</h1>
        <p className="text-caption mt-0.5">Profile and access level</p>
      </div>

      {/* Avatar + profile */}
      <div className="card space-y-4">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-raised border border-border
                          flex items-center justify-center text-[16px] font-semibold text-subtle">
            {account.avatar_initials}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-primary">{account.name}</p>
            <p className="text-caption">{account.email}</p>
          </div>
        </div>

        <hr className="divider" />

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-label">Display Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-label">Email</label>
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-label">Avatar Initials</label>
            <Input
              value={initials}
              onChange={e => setInitials(e.target.value.slice(0, 3).toUpperCase())}
              className="w-20"
              maxLength={3}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" size="sm" onClick={save}>
            {saved && <Check size={12} />}
            {saved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      {/* Access level */}
      <div className="space-y-3">
        <p className="text-label">Access Level</p>
        <p className="text-caption">
          Controls what actions are available in this session. Stored locally.
        </p>
        <div className="space-y-2">
          {ROLES.map(r => {
            const isActive = account.role === r;
            const meta     = ROLE_META[r];
            return (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  "w-full flex items-start gap-3 p-4 rounded-lg border text-left transition-all duration-150",
                  isActive ? ROLE_ACTIVE[r] : "border-border hover:border-muted"
                )}
              >
                <div className={cn(
                  "size-4 rounded-full border-2 mt-0.5 shrink-0 transition-colors flex items-center justify-center",
                  isActive ? ROLE_ACTIVE[r] : "border-border"
                )}>
                  {isActive && <div className="size-1.5 rounded-full bg-current" />}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-primary">{meta.label}</p>
                  <p className="text-caption mt-0.5">{meta.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Capability matrix */}
      <div className="card overflow-hidden p-0">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-label">Capability Matrix</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-label text-left font-normal py-2 pl-4 pr-3">Feature</th>
              {ROLES.map(r => (
                <th key={r} className="text-label text-center font-normal py-2 px-3">
                  {ROLE_META[r].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["View dashboard",        true,  true,  true],
              ["View reports",          true,  true,  true],
              ["Ask AI",                true,  true,  true],
              ["Run agents",            true,  true,  false],
              ["Run all agents",        true,  true,  false],
              ["Edit settings",         true,  false, false],
              ["Manage access",         true,  false, false],
            ].map(([label, admin, manager, viewer]) => (
              <tr key={label as string} className="border-b border-border last:border-0">
                <td className="py-2.5 pl-4 pr-3 text-[12px] text-subtle">{label}</td>
                {([admin, manager, viewer] as boolean[]).map((allowed, i) => (
                  <td key={i} className="py-2.5 px-3 text-center">
                    {allowed
                      ? <span className="text-jade text-[12px]">Yes</span>
                      : <span className="text-muted text-[12px]">—</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
