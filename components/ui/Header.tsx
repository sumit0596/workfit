"use client";

import { useState, useEffect, useRef } from "react";
import { getSession, signOut } from "next-auth/react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [greeting, setGreeting] = useState("Good Morning");
  const [greetingEmoji, setGreetingEmoji] = useState("🌅");
  const [userInitials, setUserInitials] = useState("GU");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [updates, setUpdates] = useState<any[]>([]);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

    fetch("/api/updates")
      .then(res => res.json())
      .then(data => {
        if (data.updates) {
          setUpdates(data.updates);
        }
      })
      .catch(err => console.error("Failed to fetch updates:", err));

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
        <div className={styles.notificationWrapper} ref={notificationRef}>
          <button 
            className={isMobile ? `${styles.notificationBtn} ${styles.notificationBtnMobile}` : styles.notificationBtn}
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (showDropdown) setShowDropdown(false);
            }}
          >
            🔔
            <span className={styles.notificationBadge}></span>
          </button>
          
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>What's New</div>
              <div className={styles.notificationList}>
                {updates.length === 0 ? (
                  <div className={styles.notificationItem}>
                    <p className={styles.notificationText}>Checking for updates...</p>
                  </div>
                ) : (
                  updates.map((update, idx) => (
                    <div key={idx} className={styles.notificationItem}>
                      <div className={styles.notificationDot}></div>
                      <div>
                        <p className={styles.notificationText}>{update.message}</p>
                        <p className={styles.notificationTime}>
                          {new Date(update.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styles.profileWrapper} ref={profileRef}>
          <div 
            onClick={() => {
              if (isMobile) {
                setShowDropdown(!showDropdown);
                if (showNotifications) setShowNotifications(false);
              }
            }}
            className={isMobile ? `${styles.profileIcon} ${styles.profileIconMobile}` : styles.profileIcon}
          >
            {userInitials}
          </div>
          
          {isMobile && showDropdown && (
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
  );
}
