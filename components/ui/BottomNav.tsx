"use client";

import { usePathname, useRouter } from "next/navigation";
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
import styles from "./BottomNav.module.css";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/dashboard", icon: DashboardSquare01Icon },
    { label: "Workout", href: "/dashboard/daily-workout", icon: Task01Icon },
    { label: "Progress", href: "/dashboard/progress", icon: ArrowUp01Icon },
    { label: "Exercises", href: "/dashboard/exercises", icon: BookOpen01Icon },
    { label: "History", href: "/dashboard/history", icon: Clock01Icon },
  ];

  return (
    <nav
      className={`d-md-none ${styles.navContainer}`} // Hide on medium and up
    >
      {navItems.map((item) => {
        // Special logic: "/dashboard" should exactly match for Home, 
        // others can match exactly.
        const isActive = item.href === "/dashboard"
          ? pathname === "/dashboard"
          : pathname === item.href;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => router.push(item.href)}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            {/* Top Indicator */}
            {isActive && (
              <div className={styles.indicator} />
            )}

            <HugeiconsIcon
              icon={item.icon}
              size={22}
              color={isActive ? "var(--color-plum)" : "#9CA3AF"}
            />
            <span className={`${styles.label} ${isActive ? styles.active : ""}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}