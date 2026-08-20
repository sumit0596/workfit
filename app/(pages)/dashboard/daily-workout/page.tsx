"use client";

import React, { useState, useEffect } from "react";
import WorkoutTable, { WorkoutRow } from "@/components/ui/WorkoutTable";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Tick01Icon } from "@hugeicons/core-free-icons";

// Mock data based on the screenshot
const mockData: WorkoutRow[] = [
  { id: "1", date: "Aug 19", exercise: "Chest Press", category: "Upper Body", set: 1, resistance: "Red", stance: "Door Anchor", reps: 12, target: "8-12", rpe: 8, status: "GOAL MET", notes: "Strong set, full extens..." },
  { id: "2", date: "Aug 19", exercise: "Chest Press", category: "Upper Body", set: 2, resistance: "Red", stance: "Door Anchor", reps: 10, target: "8-12", rpe: 9, status: "GOAL MET", notes: "" },
  { id: "3", date: "Aug 19", exercise: "Lat Pulldown", category: "Upper Body", set: 1, resistance: "Black", stance: "Door Anchor", reps: 10, target: "8-12", rpe: 7, status: "GOAL MET", notes: "Good lat engagement." },
  { id: "4", date: "Aug 19", exercise: "Lat Pulldown", category: "Upper Body", set: 2, resistance: "Black", stance: "Door Anchor", reps: 9, target: "8-12", rpe: 8, status: "BUILD", notes: "" },
  { id: "5", date: "Aug 19", exercise: "Shoulder Press", category: "Upper Body", set: 1, resistance: "Red", stance: "Double Feet", reps: 8, target: "8-12", rpe: 8, status: "GOAL MET", notes: "" },
  { id: "6", date: "Aug 19", exercise: "Bicep Curl", category: "Upper Body", set: 1, resistance: "Red", stance: "Single Foot", reps: 14, target: "10-15", rpe: 7, status: "GOAL MET", notes: "Controlled tempo." },
  { id: "7", date: "Aug 18", exercise: "Squats", category: "Lower Body", set: 1, resistance: "Yellow", stance: "Double Feet", reps: 15, target: "12-15", rpe: 7, status: "GOAL MET", notes: "Good depth." },
  { id: "8", date: "Aug 18", exercise: "Squats", category: "Lower Body", set: 2, resistance: "Yellow", stance: "Double Feet", reps: 13, target: "12-15", rpe: 8, status: "GOAL MET", notes: "" },
  { id: "9", date: "Aug 18", exercise: "Lunge", category: "Lower Body", set: 1, resistance: "Red", stance: "Single Foot", reps: 12, target: "10-12", rpe: 8, status: "GOAL MET", notes: "" },
  { id: "10", date: "Aug 17", exercise: "Plank", category: "Core", set: 1, resistance: "-", stance: "Other", reps: 60, target: "30-60s", rpe: 6, status: "GOAL MET", notes: "Held full 60s." },
  { id: "11", date: "Aug 17", exercise: "Russian Twists", category: "Core", set: 1, resistance: "-", stance: "Other", reps: 28, target: "20-30", rpe: 7, status: "GOAL MET", notes: "" },
  { id: "12", date: "Aug 16", exercise: "Tricep Extension", category: "Upper Body", set: 1, resistance: "Red", stance: "Door Anchor", reps: 9, target: "10-12", rpe: 8, status: "BUILD", notes: "Nearly there." },
];

export default function DailyWorkoutPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredData = mockData.filter(row => activeFilter === "All" || row.category === activeFilter);

  return (
    <div style={{ padding: isMobile ? "24px 16px" : "40px 24px", maxWidth: 1200, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", width: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", marginBottom: 32, flexWrap: "wrap", gap: 24 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px" }}>Aug 19, 2026</p>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--color-plum)", margin: "0 0 8px", letterSpacing: "-0.5px" }}>Daily Workout Log</h1>
          <p style={{ fontSize: 15, color: "#6B7280", margin: 0 }}>Upper Body • Push + Pull</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#fff", padding: "12px 20px", borderRadius: 12, border: "1px solid #D9DDE3", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "var(--color-coral)", lineHeight: 1 }}>12</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", marginTop: 4, textTransform: "uppercase" }}>Sets</div>
          </div>
          <button style={{
            background: "var(--color-coral)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "16px 24px",
            fontSize: 16,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(223, 108, 118, 0.4)",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(223, 108, 118, 0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(223, 108, 118, 0.4)"; }}
          >
            <HugeiconsIcon icon={Tick01Icon} size={20} color="currentColor" />
            Complete
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ position: "relative", width: 280 }}>
          <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none", display: "flex", alignItems: "center" }}>
            <HugeiconsIcon icon={Search01Icon} size={18} color="currentColor" />
          </div>
          <input
            type="text"
            placeholder="Search exercises..."
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              borderRadius: 8,
              border: "1px solid #D9DDE3",
              fontSize: 15,
              outline: "none",
              color: "#2A2D34"
            }}
            onFocus={e => e.currentTarget.style.borderColor = "var(--color-plum)"}
            onBlur={e => e.currentTarget.style.borderColor = "#D9DDE3"}
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Upper Body", "Lower Body", "Core"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: "12px 20px",
                borderRadius: 8,
                border: activeFilter === filter ? "1px solid var(--color-plum)" : "1px solid #D9DDE3",
                background: activeFilter === filter ? "rgba(74, 44, 78, 0.05)" : "#fff",
                color: activeFilter === filter ? "var(--color-plum)" : "#6B7280",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Component */}
      <div style={{ flex: 1, minHeight: 0, minWidth: 0, paddingBottom: 24 }}>
        <WorkoutTable data={filteredData} />
      </div>
    </div>
  );
}
