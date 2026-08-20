"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReusableInput from "@/components/ui/ReusableInput";

export default function DashboardPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [greeting, setGreeting] = useState("Good Morning");
  const [greetingEmoji, setGreetingEmoji] = useState("👋");
  const [setNumber, setSetNumber] = useState(1);
  const [exercise, setExercise] = useState("");
  const [band, setBand] = useState("");
  const [stance, setStance] = useState("");
  const [reps, setReps] = useState("");
  const [rpe, setRpe] = useState<number | null>(null);

  useEffect(() => {
    // Check initial window size
    setIsMobile(window.innerWidth < 768);

    // Update on resize
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // Determine greeting based on time of day
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
              {greeting} {greetingEmoji}
            </h1>
            <p style={{ color: "#6B7280", marginTop: 4, fontSize: 15 }}>
              Ready for today&apos;s workout? — {formattedDate}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button style={{ background: "#fff", border: "1.5px solid #D9DDE3", borderRadius: 8, width: 40, height: 40, cursor: "pointer", fontSize: 16 }}>🔔</button>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-plum), var(--color-mauve))", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-yellow)", fontWeight: 700 }}>JD</div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Current Streak", value: "7 Days", sub: "Keep it up!", accent: "#2E7D32", bg: "#E8F5E9", icon: "🔥" },
          { label: "This Month", value: "24", sub: "Total workouts", accent: "var(--color-coral)", bg: "rgba(223, 108, 118, 0.12)", icon: "📅" },
          { label: "Sets Completed", value: "186", sub: "Total sets", accent: "var(--color-plum)", bg: "rgba(74, 44, 78, 0.1)", icon: "✓" },
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
            <span style={{ background: "rgba(223, 108, 118, 0.12)", color: "var(--color-coral)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>Upper Body</span>
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
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-coral)" }}>65% Complete</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: "#F4F5F7", overflow: "hidden" }}>
              <div style={{ width: "65%", height: "100%", background: "linear-gradient(90deg, var(--color-plum), var(--color-coral))", borderRadius: 4 }} />
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
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const done = [0, 1, 2, 3, 4].includes(i);
              const todayIndex = 1; // Assuming Tuesday is "today" for this UI mockup
              const today = i === todayIndex;
              return (
                <div key={day} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: today ? "var(--color-coral)" : "#6B7280", fontWeight: today ? 700 : 500, marginBottom: 6 }}>{day}</div>
                  <div style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: 8,
                    background: done ? (today ? "var(--color-coral)" : "rgba(223, 108, 118, 0.12)") : "#F4F5F7",
                    border: today ? "2px solid var(--color-coral)" : "1.5px solid rgba(223, 108, 118, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: today ? "#fff" : "var(--color-coral)",
                  }}>
                    {done ? (today ? "●" : "✓") : ""}
                  </div>
                  {done && <div style={{ width: 4, height: 4, borderRadius: "50%", background: today ? "var(--color-coral)" : "var(--color-mauve)", margin: "4px auto 0" }} />}
                </div>
              );
            })}
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(223, 108, 118, 0.12), rgba(158, 104, 150, 0.12))", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(223, 108, 118, 0.2)" }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--color-plum)" }}>🔥 7-day streak!</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6B7280" }}>Best: 12 days</p>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--color-coral)" }}>7</div>
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
              return (
                <button 
                  key={num} 
                  onClick={() => setRpe(num)}
                  style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 8, 
                    border: isActive ? "1px solid var(--color-plum)" : "1px solid #D9DDE3", 
                    background: isActive ? "var(--color-plum)" : "#fff", 
                    color: isActive ? "#fff" : "#6B7280", 
                    fontSize: 15, 
                    fontWeight: 600, 
                    cursor: "pointer", 
                    outline: "none", 
                    transition: "all 0.2s" 
                  }}
                  onMouseEnter={(e) => { 
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "var(--color-plum)"; 
                      e.currentTarget.style.color = "var(--color-plum)"; 
                      e.currentTarget.style.background = "rgba(74, 44, 78, 0.05)"; 
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
          <textarea placeholder="Add form notes, cues, or observations..." rows={3} style={{ width: "100%", padding: "16px", borderRadius: 8, border: "1px solid #D9DDE3", background: "#fff", color: "#2A2D34", fontSize: 15, outline: "none", resize: "vertical", fontFamily: "inherit" }}></textarea>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={{ padding: "12px 24px", background: "var(--color-coral)", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 12px rgba(223, 108, 118, 0.3)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(223, 108, 118, 0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(223, 108, 118, 0.3)"; }}
          >
            Save Set
          </button>
          <span style={{ fontSize: 14, color: "#9CA3AF" }}>Logged to today&apos;s session</span>
        </div>
      </div>
    </div>
  );
}