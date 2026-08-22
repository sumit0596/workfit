"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReusableInput from "@/components/ui/ReusableInput";
import { useToast } from "@/components/ui/ToastContext";

export default function DashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  const [setNumber, setSetNumber] = useState(1);
  const [exercise, setExercise] = useState("");
  const [band, setBand] = useState("");
  const [stance, setStance] = useState("");
  const [reps, setReps] = useState("");
  const [rpe, setRpe] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [weeklySummary, setWeeklySummary] = useState({
    days: [
      { dayName: "Mon", isToday: false, performance: 0 },
      { dayName: "Tue", isToday: false, performance: 0 },
      { dayName: "Wed", isToday: false, performance: 0 },
      { dayName: "Thu", isToday: false, performance: 0 },
      { dayName: "Fri", isToday: false, performance: 0 },
      { dayName: "Sat", isToday: false, performance: 0 },
      { dayName: "Sun", isToday: false, performance: 0 },
    ],
    activeDaysThisWeek: 0
  });

  const fetchWeeklySummary = async () => {
    try {
      const res = await fetch("/api/workouts/weekly-summary");
      if (res.ok) {
        const data = await res.json();
        setWeeklySummary(data);
      }
    } catch (err) {
      console.error("Failed to fetch weekly summary", err);
    }
  };

  const [kpiSummary, setKpiSummary] = useState({
    currentStreak: 0,
    workoutsThisMonth: 0,
    totalSets: 0,
    totalActiveDays: 0,
  });

  const fetchKpiSummary = async () => {
    try {
      const res = await fetch("/api/workouts/kpi");
      if (res.ok) {
        const data = await res.json();
        setKpiSummary(data);
      }
    } catch (err) {
      console.error("Failed to fetch KPI summary", err);
    }
  };

  const [todaySummary, setTodaySummary] = useState({
    category: "None",
    uniqueExercises: 0,
    estimatedTimeMin: 0,
    totalSets: 0,
    progressPercent: 0
  });

  const fetchTodaySummary = async () => {
    try {
      const res = await fetch("/api/workouts/today-summary");
      if (res.ok) {
        const data = await res.json();
        setTodaySummary(data);
      }
    } catch (err) {
      console.error("Failed to fetch today's summary", err);
    }
  };

  const handleSaveSet = async () => {
    if (!exercise || !setNumber || !reps || !rpe) {
      showToast("Please fill in all required fields (Exercise, Set Number, Reps, RPE)", "warn");
      return;
    }

    setIsSubmitting(true);

    try {
      // Derive a simple category based on exercise selection
      let category = "General";
      const exerciseLower = exercise.toLowerCase();
      if (["squat", "deadlift", "lunge"].includes(exerciseLower)) category = "Lower Body";
      else if (["bench-press", "bench press", "chest press", "shoulder press", "bicep curl", "tricep extension", "lat pulldown"].includes(exerciseLower)) category = "Upper Body";
      else if (["plank", "russian twists", "crunch"].includes(exerciseLower)) category = "Core";

      const response = await fetch("/api/workouts/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exercise: exercise.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()),
          category,
          setNumber,
          band: band ? band.charAt(0).toUpperCase() + band.slice(1) : "-",
          stance: stance ? stance.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) : "-",
          reps: Number(reps),
          rpe,
          notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to log set");
      }

      showToast("Set logged successfully!", "success");
      setSetNumber(prev => prev + 1);
      
      // Update the summary dynamically
      fetchTodaySummary();
      fetchWeeklySummary();
      fetchKpiSummary();
      
      // Auto-hide success message and navigate
      setTimeout(() => {
        router.push("/dashboard/daily-workout");
      }, 1000);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchTodaySummary();
    fetchWeeklySummary();
    fetchKpiSummary();

    // Check initial window size
    setIsMobile(window.innerWidth < 768);

    // Update on resize
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);


    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <div style={{ padding: isMobile ? "20px 16px 100px" : "32px 32px 40px" }}>


      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Current Streak", value: `${kpiSummary.currentStreak} Days`, sub: "Keep it up!", accent: "#2E7D32", bg: "#E8F5E9", icon: "🔥" },
          { label: "This Month", value: `${kpiSummary.workoutsThisMonth}`, sub: "Total workouts", accent: "var(--color-coral)", bg: "rgba(223, 108, 118, 0.12)", icon: "📅" },
          { label: "Sets Completed", value: `${kpiSummary.totalSets}`, sub: "Total sets", accent: "var(--color-plum)", bg: "rgba(74, 44, 78, 0.1)", icon: "✓" },
          { label: "Total Active Days", value: `${kpiSummary.totalActiveDays}`, sub: "All-time workouts", accent: "#2E7D32", bg: "#E8F5E9", icon: "💪" },
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
            <span style={{ background: "rgba(223, 108, 118, 0.12)", color: "var(--color-coral)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>{todaySummary.category}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: "#6B7280" }}>{todaySummary.uniqueExercises} Exercises</span>
            <span style={{ color: "#D9DDE3" }}>•</span>
            <span style={{ fontSize: 13, color: "#6B7280" }}>~{todaySummary.estimatedTimeMin} min</span>
            <span style={{ color: "#D9DDE3" }}>•</span>
            <span style={{ fontSize: 13, color: "#6B7280" }}>{todaySummary.totalSets} Sets</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "#6B7280" }}>Progress</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-coral)" }}>{todaySummary.progressPercent}% Complete</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: "#F4F5F7", overflow: "hidden" }}>
              <div style={{ width: `${todaySummary.progressPercent}%`, height: "100%", background: "linear-gradient(90deg, var(--color-plum), var(--color-coral))", borderRadius: 4, transition: "width 0.5s ease-out" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => router.push("/dashboard/workout-log")}
              style={{ flex: 1, padding: "12px", background: "var(--color-coral)", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              Continue Workout
            </button>
            <button
              onClick={() => router.push("/dashboard/workout-log")}
              style={{ padding: "12px 16px", background: "transparent", color: "var(--color-coral)", border: "1.5px solid var(--color-coral)", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              View
            </button>
          </div>
        </div>

        {/* Quick Streak */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #D9DDE3" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2A2D34", margin: "0 0 16px" }}>Weekly Activity</h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {weeklySummary.days.map((dayObj) => {
              const { dayName, isToday, performance } = dayObj;
              const done = performance > 0;
              
              let opacity = 0.12; // default
              if (performance > 0 && performance <= 5) opacity = 0.4;
              else if (performance > 5 && performance <= 10) opacity = 0.7;
              else if (performance > 10) opacity = 1.0;

              let bgColor = "#F4F5F7";
              let textColor = "var(--color-coral)";
              if (done) {
                bgColor = `rgba(223, 108, 118, ${opacity})`;
                textColor = opacity > 0.6 ? "#fff" : "var(--color-coral)";
              } else if (isToday) {
                bgColor = "#F4F5F7";
              }

              return (
                <div key={dayName} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: isToday ? "var(--color-coral)" : "#6B7280", fontWeight: isToday ? 700 : 500, marginBottom: 6 }}>{dayName}</div>
                  <div style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: 8,
                    background: bgColor,
                    border: isToday ? "2px solid var(--color-coral)" : (done ? "1.5px solid rgba(223, 108, 118, 0.2)" : "1.5px solid transparent"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: textColor,
                    transition: "all 0.3s"
                  }}>
                    {done ? (isToday ? "●" : "✓") : ""}
                  </div>
                  {done && <div style={{ width: 4, height: 4, borderRadius: "50%", background: isToday ? "var(--color-coral)" : "var(--color-mauve)", margin: "4px auto 0" }} />}
                </div>
              );
            })}
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(223, 108, 118, 0.12), rgba(158, 104, 150, 0.12))", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(223, 108, 118, 0.2)" }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--color-plum)" }}>🔥 {weeklySummary.activeDaysThisWeek} active days!</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6B7280" }}>This week</p>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--color-coral)" }}>{weeklySummary.activeDaysThisWeek}</div>
          </div>
        </div>
      </div>

      {/* Quick Log */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #D9DDE3", marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Quick Log</p>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#2A2D34", margin: 0 }}>Log a Set</h2>
          </div>
          <div style={{ background: "#F3F4F6", color: "#6B7280", padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            Session - Set 1
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: 24, marginBottom: 24 }}>
          {/* Exercise */}
          <ReusableInput
            label="Exercise"
            name="exercise"
            type="select"
            value={exercise}
            onChange={setExercise}
            placeholder="Select exercise..."
            options={[
              { label: "Squat", value: "squat" },
              { label: "Deadlift", value: "deadlift" },
              { label: "Bench Press", value: "bench-press" },
            ]}
          />

          {/* Set Number */}
          <ReusableInput
            label="Set Number"
            name="setNumber"
            type="counter"
            value={setNumber}
            onChange={(val) => setSetNumber(Number(val))}
            onDecrement={() => setSetNumber(prev => Math.max(1, prev - 1))}
            onIncrement={() => setSetNumber(prev => prev + 1)}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 24, marginBottom: 24 }}>
          {/* Resistance Band */}
          <ReusableInput
            label="Resistance Band"
            name="band"
            type="select"
            value={band}
            onChange={setBand}
            placeholder="Select band..."
            options={[
              { label: "Red — Medium", value: "red" },
              { label: "Black — Heavy", value: "black" },
              { label: "Purple — Extra Heavy", value: "purple" },
            ]}
          />

          {/* Stance / Anchor */}
          <ReusableInput
            label="Stance / Anchor"
            name="stance"
            type="select"
            value={stance}
            onChange={setStance}
            placeholder="Select stance..."
            options={[
              { label: "Double Feet", value: "double-feet" },
              { label: "Single Foot", value: "single-foot" },
              { label: "Door Anchor (High)", value: "door-high" },
            ]}
          />

          {/* Reps */}
          <ReusableInput
            label="Reps"
            name="reps"
            type="number"
            value={reps}
            onChange={setReps}
            placeholder="0"
          />
        </div>

        {/* RPE */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", marginBottom: 8 }}>RPE — Rate of Perceived Exertion</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isActive = rpe === num;
              
              const colorGradient = [
                "#4ade80", // 1 (Green)
                "#22c55e", // 2 (Darker Green)
                "#84cc16", // 3 (Lime)
                "#eab308", // 4 (Yellow)
                "#f59e0b", // 5 (Amber/Orange-Yellow)
                "#f97316", // 6 (Orange)
                "#ea580c", // 7 (Dark Orange)
                "#ef4444", // 8 (Red)
                "#dc2626", // 9 (Dark Red)
                "#991b1b"  // 10 (Very Dark Red)
              ];
              const activeColor = colorGradient[num - 1];

              return (
                <button 
                  key={num} 
                  onClick={() => setRpe(num)}
                  style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 8, 
                    border: isActive ? `1px solid ${activeColor}` : "1px solid #D9DDE3", 
                    background: isActive ? activeColor : "#fff", 
                    color: isActive ? "#fff" : "#6B7280", 
                    fontSize: 15, 
                    fontWeight: 600, 
                    cursor: "pointer", 
                    outline: "none", 
                    transition: "all 0.2s" 
                  }}
                  onMouseEnter={(e) => { 
                    if (!isActive) {
                      e.currentTarget.style.borderColor = activeColor; 
                      e.currentTarget.style.color = activeColor; 
                      e.currentTarget.style.background = activeColor + "1A"; // 10% opacity hex
                    }
                  }}
                  onMouseLeave={(e) => { 
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "#D9DDE3"; 
                      e.currentTarget.style.color = "#6B7280"; 
                      e.currentTarget.style.background = "#fff"; 
                    }
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", marginBottom: 8 }}>Notes</label>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="Add form notes, cues, or observations..." 
            rows={3} 
            style={{ width: "100%", padding: "16px", borderRadius: 8, border: "1px solid #D9DDE3", background: "#fff", color: "#2A2D34", fontSize: 15, outline: "none", resize: "vertical", fontFamily: "inherit" }}
          ></textarea>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button 
            disabled={isSubmitting}
            onClick={handleSaveSet}
            style={{ padding: "12px 24px", background: isSubmitting ? "#9CA3AF" : "var(--color-coral)", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: "0 4px 12px rgba(223, 108, 118, 0.3)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { if(!isSubmitting){ e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(223, 108, 118, 0.4)"; } }}
            onMouseLeave={(e) => { if(!isSubmitting){ e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(223, 108, 118, 0.3)"; } }}
          >
            {isSubmitting ? "Saving..." : "Save Set"}
          </button>
          <span style={{ fontSize: 14, color: "#9CA3AF" }}>Logged to today&apos;s session</span>
        </div>
      </div>
    </div>
  );
}