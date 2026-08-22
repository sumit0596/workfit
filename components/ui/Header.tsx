"use client";

import { useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";

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
    <div 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: isMobile ? "16px 20px" : "32px 32px 16px",
        background: isMobile ? "rgba(255, 255, 255, 0.9)" : "transparent",
        backdropFilter: isMobile ? "blur(10px)" : "none",
        position: isMobile ? "sticky" : "static",
        top: 0,
        zIndex: 30,
        borderBottom: isMobile ? "1px solid #D9DDE3" : "none",
        boxShadow: isMobile ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: "#2A2D34", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          {greeting} {greetingEmoji}
        </h1>
        {!isMobile && (
          <p style={{ color: "#6B7280", marginTop: 4, fontSize: 15 }}>
            Ready for today's workout? — {formattedDate}
          </p>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 16 }}>
        <button style={{ background: "#fff", border: "1.5px solid #D9DDE3", borderRadius: 8, width: isMobile ? 36 : 40, height: isMobile ? 36 : 40, cursor: "pointer", fontSize: isMobile ? 14 : 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          🔔
        </button>
        <div style={{ position: "relative" }}>
          <div 
            onClick={() => isMobile && setShowDropdown(!showDropdown)}
            style={{ 
              width: isMobile ? 36 : 40, 
              height: isMobile ? 36 : 40, 
              borderRadius: "50%", 
              background: "linear-gradient(135deg, var(--color-plum), var(--color-mauve))", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              color: "var(--color-yellow)", 
              fontWeight: 700, 
              fontSize: isMobile ? 13 : 15,
              cursor: isMobile ? "pointer" : "default"
            }}
          >
            {userInitials}
          </div>
          
          {isMobile && showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: 8,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                padding: "4px 0",
                minWidth: 120,
                zIndex: 50,
                border: "1px solid #D9DDE3"
              }}
            >
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  background: "transparent",
                  border: "none",
                  textAlign: "left",
                  color: "#dc3545",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
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
