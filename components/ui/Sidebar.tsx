"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
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
  { href: "/dashboard/daily-workout", label: "Daily Workout", icon: Task01Icon },
  { href: "/dashboard/history", label: "Workout History", icon: Clock01Icon },
  { href: "/dashboard/body-progress", label: "Body Progress", icon: BodyPartMuscleIcon },
  { href: "/dashboard/exercises", label: "Exercise Library", icon: BookOpen01Icon },
  { href: "/dashboard/overload", label: "Progress / Overload", icon: ArrowUp01Icon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState("Loading...");
  const [userInitials, setUserInitials] = useState("--");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user?.name) {
        setUserName(session.user.name);
        const parts = session.user.name.split(" ");
        if (parts.length >= 2) {
          setUserInitials((parts[0][0] + parts[1][0]).toUpperCase());
        } else {
          setUserInitials(parts[0][0].toUpperCase());
        }
      } else {
        setUserName("Guest User");
        setUserInitials("GU");
      }
    });
  }, []);

  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        background: "var(--color-coral)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
        borderRight: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "4px 0 20px rgba(74, 44, 78, 0.1)",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "24px 20px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "var(--color-plum)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
              color: "var(--color-yellow)",
              boxShadow: "0 2px 8px rgba(74, 44, 78, 0.25)",
            }}
          >
            W
          </div>
          <div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px", display: "block", lineHeight: 1.2 }}>
              ActiveX Gym
            </span>
            <small style={{ color: "var(--color-yellow)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.02em" }}>
              Fitness Tracker
            </small>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={{ padding: "16px 12px", flex: 1 }}>
        <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 12px", marginBottom: 10 }}>
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
                padding: "11px 14px",
                borderRadius: 10,
                textDecoration: "none",
                background: active ? "var(--color-plum)" : "transparent",
                color: active ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
                fontSize: 14,
                fontWeight: active ? 600 : 500,
                marginBottom: 4,
                boxShadow: active ? "0 4px 12px rgba(74, 44, 78, 0.25)" : "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.16)";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20 }}>
                <HugeiconsIcon
                  icon={iconData}
                  size={18}
                  color={active ? "var(--color-yellow)" : "currentColor"}
                />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* User profile */}
      <div style={{ padding: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--color-plum), var(--color-mauve))",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-yellow)",
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(74, 44, 78, 0.2)",
            }}
          >
            {userInitials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {userName}
            </div>
            <div style={{ color: "var(--color-yellow)", fontSize: 11, opacity: 0.9 }}>Active Member</div>
          </div>
          <div style={{ position: "relative" }}>
            <button
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                padding: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
              onClick={() => setShowDropdown(!showDropdown)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              }}
              title="Settings"
            >
              <HugeiconsIcon icon={Settings02Icon} size={18} color="currentColor" />
            </button>

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  right: 0,
                  marginBottom: 8,
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  padding: "4px 0",
                  minWidth: 120,
                  zIndex: 50
                }}
              >
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  style={{
                    width: "100%",
                    padding: "8px 16px",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    color: "#dc3545",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
