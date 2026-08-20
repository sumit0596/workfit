"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  DashboardSquare01Icon, 
  Task01Icon, 
  Clock01Icon, 
  BodyPartMuscleIcon, 
  BookOpen01Icon, 
  ArrowUp01Icon,
  Settings02Icon
} from "@hugeicons/core-free-icons";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardSquare01Icon },
  { href: "/dashboard/workout-log", label: "Daily Workout", icon: Task01Icon },
  { href: "/dashboard/history", label: "Workout History", icon: Clock01Icon },
  { href: "/dashboard/body-progress", label: "Body Progress", icon: BodyPartMuscleIcon },
  { href: "/dashboard/exercises", label: "Exercise Library", icon: BookOpen01Icon },
  { href: "/dashboard/overload", label: "Progress / Overload", icon: ArrowUp01Icon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        background: "#20242A",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "24px 24px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#1976D2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            W
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>
            ActiveX Gym
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={{ padding: "16px 12px", flex: 1 }}>
        <p style={{ color: "#6B7280", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 12px", marginBottom: 8 }}>
          Menu
        </p>
        {navItems.map((item) => {
          const active = pathname === item.href;
          const iconData = item.icon;
          
          return (
            <Link
              href={item.href}
              key={item.href}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                textDecoration: "none",
                background: active ? "#1976D2" : "transparent",
                color: active ? "#fff" : "#9CA3AF",
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                marginBottom: 2,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Removed 'variant' prop to resolve TypeScript assignment error */}
              <div style={{ display: "flex", alignItems: "center", justifyItems: "center", width: 20 }}>
                <HugeiconsIcon 
                  icon={iconData} 
                  size={18} 
                  color="currentColor"
                />
              </div>
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* User profile (Mocked) */}
      <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1976D2, #42A5F5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            JD
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              James Davis
            </div>
            <div style={{ color: "#6B7280", fontSize: 11 }}>Active Member</div>
          </div>
          <button 
            style={{ 
              background: "none", 
              border: "none", 
              color: "#6B7280", 
              cursor: "pointer", 
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <HugeiconsIcon icon={Settings02Icon} size={18} color="currentColor" />
          </button>
        </div>
      </div>
    </aside>
  );
}
