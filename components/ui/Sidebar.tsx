"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getSession, signOut } from "next-auth/react";
import { HugeiconsIcon } from "@hugeicons/react";
import styles from "./Sidebar.module.css";
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
  const router = useRouter();
  const [userName, setUserName] = useState("Loading...");
  const [userInitials, setUserInitials] = useState("--");
  const [showDropdown, setShowDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <aside className={styles.sidebarContainer}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoIcon}>
            W
          </div>
          <div>
            <span className={styles.logoTitle}>
              ActiveX Gym
            </span>
            <small className={styles.logoSubtitle}>
              Fitness Tracker
            </small>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className={styles.navMenu}>
        <p className={styles.navHeader}>
          Menu
        </p>
        {navItems.map((item) => {
          const active = pathname === item.href;
          const iconData = item.icon;

          return (
            <div
              key={item.href}
              onClick={() => router.push(item.href)}
              className={active ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
            >
              <div className={styles.navItemIcon}>
                <HugeiconsIcon
                  icon={iconData}
                  size={18}
                  color={active ? "var(--color-yellow)" : "currentColor"}
                />
              </div>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* User profile */}
      <div className={styles.profileSection}>
        <div className={styles.profileWrapper}>
          <div className={styles.profileAvatar}>
            {userInitials}
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>
              {userName}
            </div>
            <div className={styles.profileStatus}>Active Member</div>
          </div>
          <div className={styles.settingsContainer} ref={profileDropdownRef}>
            <button
              className={styles.settingsBtn}
              onClick={() => setShowDropdown(!showDropdown)}
              title="Settings"
            >
              <HugeiconsIcon icon={Settings02Icon} size={18} color="currentColor" />
            </button>

            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <button
                  onClick={() => console.log('Navigate to profile')}
                  className={styles.menuBtn}
                >
                  Profile
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className={styles.logoutBtn}
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
