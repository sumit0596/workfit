"use client";

import React, { useState, useEffect } from "react";
import WorkoutTable, { WorkoutRow } from "@/components/ui/WorkoutTable";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Tick01Icon } from "@hugeicons/core-free-icons";

// Removed static mockData in favor of API

export default function DailyWorkoutPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [workoutData, setWorkoutData] = useState<WorkoutRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("/api/workouts/daily");
        if (res.ok) {
          const json = await res.json();
          setWorkoutData(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch workouts", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  const filteredData = workoutData.filter(row => activeFilter === "All" || row.category === activeFilter);

  return (
    <div style={{ padding: isMobile ? "24px 16px" : "40px 24px", width: "100%", overflowX: "hidden", minHeight: "100vh" }}>
      <div style={{ maxWidth: "100%", margin: "0 auto", width: "100%" }}>
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
        <div style={{ paddingBottom: 24, width: '100%', display: 'grid', position: 'relative' }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>Loading workouts...</div>
          ) : workoutData.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>No workouts logged yet. Go to the dashboard to log a set!</div>
          ) : (
            <WorkoutTable data={filteredData} />
          )}
        </div>
      </div>
    </div>
  );
}
