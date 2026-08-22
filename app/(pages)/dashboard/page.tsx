"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReusableInput from "@/components/ui/ReusableInput";
import { useToast } from "@/components/ui/ToastContext";
import styles from "./Dashboard.module.css";

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
    <div className={isMobile ? styles.pageContainerMobile : styles.pageContainer}>


      {/* KPI Cards */}
      <div className={isMobile ? styles.kpiGridMobile : styles.kpiGrid}>
        {[
          { label: "Current Streak", value: `${kpiSummary.currentStreak} Days`, sub: "Keep it up!", accent: "#2E7D32", bg: "#E8F5E9", icon: "🔥" },
          { label: "This Month", value: `${kpiSummary.workoutsThisMonth}`, sub: "Total workouts", accent: "var(--color-coral)", bg: "rgba(223, 108, 118, 0.12)", icon: "📅" },
          { label: "Sets Completed", value: `${kpiSummary.totalSets}`, sub: "Total sets", accent: "var(--color-plum)", bg: "rgba(74, 44, 78, 0.1)", icon: "✓" },
          { label: "Total Active Days", value: `${kpiSummary.totalActiveDays}`, sub: "All-time workouts", accent: "#2E7D32", bg: "#E8F5E9", icon: "💪" },
        ].map((card) => (
          <div key={card.label} className={styles.kpiCard}>
            <div className={styles.kpiCardInner}>
              <div>
                <p className={styles.kpiLabel}>{card.label}</p>
                <p className={isMobile ? `${styles.kpiValue} ${styles.kpiValueMobile}` : styles.kpiValue} style={{ color: card.accent }}>{card.value}</p>
                <p className={styles.kpiSub}>{card.sub}</p>
              </div>
              <div className={styles.kpiIconWrapper} style={{ background: card.bg }}>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={isMobile ? styles.mainGridMobile : styles.mainGrid}>
        {/* Today's Workout */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Today&apos;s Workout</h2>
            <span className={styles.categoryBadge}>{todaySummary.category}</span>
          </div>
          <div className={styles.statsRow}>
            <span className={styles.statText}>{todaySummary.uniqueExercises} Exercises</span>
            <span className={styles.statDivider}>•</span>
            <span className={styles.statText}>~{todaySummary.estimatedTimeMin} min</span>
            <span className={styles.statDivider}>•</span>
            <span className={styles.statText}>{todaySummary.totalSets} Sets</span>
          </div>
          <div className={styles.progressWrapper}>
            <div className={styles.progressHeader}>
              <span className={styles.statText}>Progress</span>
              <span className={styles.progressTextComplete}>{todaySummary.progressPercent}% Complete</span>
            </div>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarFill} style={{ width: `${todaySummary.progressPercent}%` }} />
            </div>
          </div>
          <div className={styles.btnGroup}>
            <button
              onClick={() => router.push("/dashboard/workout-log")}
              className={styles.primaryBtn}
            >
              Continue Workout
            </button>
            <button
              onClick={() => router.push("/dashboard/workout-log")}
              className={styles.outlineBtn}
            >
              View
            </button>
          </div>
        </div>

        {/* Quick Streak */}
        <div className={styles.card}>
          <h2 className={`${styles.cardTitle} ${styles.cardTitleSpaced}`}>Weekly Activity</h2>
          <div className={styles.weeklyGrid}>
            {weeklySummary.days.map((dayObj) => {
              const { dayName, isToday, performance } = dayObj;
              const done = performance > 0;
              
              let opacity = 0.12; // default
              if (performance > 0 && performance <= 5) opacity = 0.4;
              else if (performance > 5 && performance <= 10) opacity = 0.7;
              else if (performance > 10) opacity = 1.0;

              let bgColor = "#F4F5F7";
              let textColor = "var(--color-coral)";
              let borderStyle = "1.5px solid transparent";
              if (done) {
                bgColor = `rgba(223, 108, 118, ${opacity})`;
                textColor = opacity > 0.6 ? "#fff" : "var(--color-coral)";
                borderStyle = "1.5px solid rgba(223, 108, 118, 0.2)";
              } 
              
              if (isToday) {
                borderStyle = "2px solid var(--color-coral)";
                if(!done) bgColor = "#F4F5F7";
              }

              return (
                <div key={dayName} className={styles.dayCol}>
                  <div className={`${styles.dayLabel} ${isToday ? styles.dayLabelToday : styles.dayLabelNormal}`}>{dayName}</div>
                  <div 
                    className={styles.dayBox} 
                    style={{ background: bgColor, border: borderStyle, color: textColor }}
                  >
                    {done ? (isToday ? "●" : "✓") : ""}
                  </div>
                  {done && <div className={styles.dayDot} style={{ background: isToday ? "var(--color-coral)" : "var(--color-mauve)" }} />}
                </div>
              );
            })}
          </div>
          <div className={styles.weeklySummaryBanner}>
            <div>
              <p className={styles.bannerTitle}>🔥 {weeklySummary.activeDaysThisWeek} active days!</p>
              <p className={styles.bannerSub}>This week</p>
            </div>
            <div className={styles.bannerValue}>{weeklySummary.activeDaysThisWeek}</div>
          </div>
        </div>
      </div>

      {/* Quick Log */}
      <div className={styles.logCard}>
        <div className={styles.logHeader}>
          <div>
            <p className={styles.logSubTitle}>Quick Log</p>
            <h2 className={styles.logTitle}>Log a Set</h2>
          </div>
          <div className={styles.sessionBadge}>
            Session - Set 1
          </div>
        </div>

        <div className={isMobile ? styles.formGrid2Mobile : styles.formGrid2}>
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

        <div className={isMobile ? styles.formGrid3Mobile : styles.formGrid3}>
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
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>RPE — Rate of Perceived Exertion</label>
          <div className={styles.rpeGrid}>
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
                  className={`${styles.rpeBtn} ${isActive ? styles.rpeBtnActive : ""}`}
                  style={
                    { 
                      "--rpe-color": activeColor, 
                      "--rpe-bg": activeColor + "1A" // 10% opacity
                    } as React.CSSProperties
                  }
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Notes</label>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="Add form notes, cues, or observations..." 
            rows={3} 
            className={styles.notesTextarea}
          ></textarea>
        </div>

        {/* Footer */}
        <div className={styles.footerContainer}>
          <button 
            disabled={isSubmitting}
            onClick={handleSaveSet}
            className={styles.saveBtn}
          >
            {isSubmitting ? "Saving..." : "Save Set"}
          </button>
          <span className={styles.footerText}>Logged to today&apos;s session</span>
        </div>
      </div>
    </div>
  );
}