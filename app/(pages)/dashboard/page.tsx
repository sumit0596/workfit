"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial window size
    setIsMobile(window.innerWidth < 768);

    // Update on resize
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamically format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ padding: isMobile ? "20px 16px 100px" : "32px 32px 40px" }}>
      {/* Header */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#2A2D34", margin: 0 }}>
              Good Morning 👋
            </h1>
            <p style={{ color: "#6B7280", marginTop: 4, fontSize: 15 }}>
              Ready for today&apos;s workout? — {formattedDate}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button style={{ background: "#fff", border: "1.5px solid #D9DDE3", borderRadius: 8, width: 40, height: 40, cursor: "pointer", fontSize: 16 }}>🔔</button>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #1976D2, #42A5F5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>JD</div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Current Streak", value: "7 Days", sub: "Keep it up!", accent: "#2E7D32", bg: "#E8F5E9", icon: "🔥" },
          { label: "This Month", value: "24", sub: "Total workouts", accent: "#1976D2", bg: "#E3F2FD", icon: "📅" },
          { label: "Sets Completed", value: "186", sub: "Total sets", accent: "#6366F1", bg: "#EEF2FF", icon: "✓" },
          { label: "Weight Change", value: "-1.8 kg", sub: "Since starting", accent: "#2E7D32", bg: "#E8F5E9", icon: "↓" },
        ].map((card) => (
          <div key={card.label} style={{ background: "#fff", borderRadius: 12, padding: "20px", border: "1px solid #D9DDE3", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", margin: 0 }}>{card.label}</p>
                <p style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, color: card.accent, margin: "8px 0 4px", lineHeight: 1 }}>{card.value}</p>
                <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>{card.sub}</p>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
        {/* Today's Workout */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #D9DDE3" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2A2D34", margin: 0 }}>Today&apos;s Workout</h2>
            <span style={{ background: "#E3F2FD", color: "#1976D2", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>Upper Body</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: "#6B7280" }}>6 Exercises</span>
            <span style={{ color: "#D9DDE3" }}>•</span>
            <span style={{ fontSize: 13, color: "#6B7280" }}>~32 min</span>
            <span style={{ color: "#D9DDE3" }}>•</span>
            <span style={{ fontSize: 13, color: "#6B7280" }}>18 Sets</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "#6B7280" }}>Progress</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#2E7D32" }}>65% Complete</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: "#F4F5F7", overflow: "hidden" }}>
              <div style={{ width: "65%", height: "100%", background: "linear-gradient(90deg, #2E7D32, #4CAF50)", borderRadius: 4 }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => router.push("/dashboard/workout-log")}
              style={{ flex: 1, padding: "12px", background: "#1976D2", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              Continue Workout
            </button>
            <button
              onClick={() => router.push("/dashboard/workout-log")}
              style={{ padding: "12px 16px", background: "transparent", color: "#1976D2", border: "1.5px solid #1976D2", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              View
            </button>
          </div>
        </div>

        {/* Quick Streak */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #D9DDE3" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2A2D34", margin: "0 0 16px" }}>Weekly Activity</h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const done = [0, 1, 2, 3, 4].includes(i);
              const todayIndex = 1; // Assuming Tuesday is "today" for this UI mockup
              const today = i === todayIndex;
              return (
                <div key={day} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: today ? "#1976D2" : "#6B7280", fontWeight: today ? 700 : 400, marginBottom: 6 }}>{day}</div>
                  <div style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: 8,
                    background: done ? (today ? "#1976D2" : "#E8F5E9") : "#F4F5F7",
                    border: today ? "2px solid #1976D2" : "1.5px solid #D9DDE3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                  }}>
                    {done ? (today ? "●" : "✓") : ""}
                  </div>
                  {done && <div style={{ width: 4, height: 4, borderRadius: "50%", background: today ? "#1976D2" : "#2E7D32", margin: "4px auto 0" }} />}
                </div>
              );
            })}
          </div>
          <div style={{ background: "#E8F5E9", borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#2E7D32" }}>🔥 7-day streak!</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6B7280" }}>Best: 12 days</p>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#2E7D32" }}>7</div>
          </div>
        </div>
      </div>
    </div>
  );
}