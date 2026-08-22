"use client";

import { useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [greeting, setGreeting] = useState("Good Morning");
  const [greetingEmoji, setGreetingEmoji] = useState("🌅");
  const [userInitials, setUserInitials] = useState("GU");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Mobile Check
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // Time-based Greeting
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
      setGreetingEmoji("🌅");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
      setGreetingEmoji("☀️");
    } else if (hour >= 17 && hour < 22) {
      setGreeting("Good Evening");
      setGreetingEmoji("🌇");
    } else {
      setGreeting("Good Night");
      setGreetingEmoji("🌙");
    }

    // User session
    getSession().then((session) => {
      if (session?.user?.name) {
        const parts = session.user.name.split(" ");
        if (parts.length >= 2) {
          setUserInitials((parts[0][0] + parts[1][0]).toUpperCase());
        } else {
          setUserInitials(parts[0][0].toUpperCase());
        }
      }
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={isMobile ? `${styles.headerContainer} ${styles.mobileHeader}` : styles.headerContainer}>
      <div>
        <h1 className={isMobile ? `${styles.greetingTitle} ${styles.greetingTitleMobile}` : styles.greetingTitle}>
          {greeting} {greetingEmoji}
        </h1>
        {!isMobile && (
          <p className={styles.subtitle}>
            Ready for today's workout? — {formattedDate}
          </p>
        )}
      </div>
      <div className={isMobile ? `${styles.actionsContainer} ${styles.actionsContainerMobile}` : styles.actionsContainer}>
        <button className={isMobile ? `${styles.notificationBtn} ${styles.notificationBtnMobile}` : styles.notificationBtn}>
          🔔
        </button>
        <div className={styles.profileWrapper}>
          <div 
            onClick={() => isMobile && setShowDropdown(!showDropdown)}
            className={isMobile ? `${styles.profileIcon} ${styles.profileIconMobile}` : styles.profileIcon}
          >
            {userInitials}
          </div>
          
          {isMobile && showDropdown && (
            <div className={styles.dropdownMenu}>
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
  );
}
