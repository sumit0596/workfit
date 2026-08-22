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

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/dashboard", icon: DashboardSquare01Icon },
    { label: "Workout", href: "/dashboard/daily-workout", icon: Task01Icon },
    { label: "Progress", href: "/dashboard/progress", icon: ArrowUp01Icon },
    { label: "Exercises", href: "/dashboard/exercises", icon: BookOpen01Icon },
    { label: "History", href: "/dashboard/history", icon: Clock01Icon },
  ];

  return (
    <nav 
      className="d-md-none" // Hide on medium and up
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTop: "1px solid #D9DDE3",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 8px",
        height: "calc(64px + env(safe-area-inset-bottom, 16px))",
        paddingBottom: "env(safe-area-inset-bottom, 16px)", // For iOS home bar
        zIndex: 1000,
        boxShadow: "0 -4px 12px rgba(0,0,0,0.03)"
      }}
    >
      {navItems.map((item) => {
        // Special logic: "/dashboard" should exactly match for Home, 
        // others can match exactly.
        const isActive = item.href === "/dashboard" 
          ? pathname === "/dashboard" 
          : pathname === item.href;

        const IconComponent = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: isActive ? "var(--color-plum)" : "#9CA3AF",
              position: "relative",
            }}
          >
            {/* Top Indicator */}
            {isActive && (
              <div 
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "32px",
                  height: "3px",
                  backgroundColor: "var(--color-plum)",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px"
                }}
              />
            )}
            
            <HugeiconsIcon 
              icon={item.icon}
              size={22} 
              color={isActive ? "var(--color-plum)" : "#9CA3AF"} 
            />
            <span style={{ 
              fontSize: "10px", 
              fontWeight: isActive ? 700 : 500, 
              marginTop: "4px" 
            }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
