export type Screen =
  | "dashboard"
  | "workout-log"
  | "body-progress"
  | "overload"
  | "exercises"
  | "history"
  | "complete"
  | "exercise-detail";

export const RESISTANCE_BANDS = [
  { label: "Yellow — Light", value: "yellow", color: "#F5C842" },
  { label: "Red — Medium", value: "red", color: "#E53935" },
  { label: "Black — Heavy", value: "black", color: "#212121" },
  { label: "Blue — X-Heavy", value: "blue", color: "#1976D2" },
];

export const CATEGORIES = ["All", "Warmup/Cardio", "Upper Body", "Lower Body", "Core"];

export const exercises = [
  { id: 1, name: "Chest Press", category: "Upper Body", equipment: "Resistance Tube", targetReps: "8–12", recommended: "Red", muscles: ["Pectorals", "Triceps", "Front Delts"], personalBest: "12 reps @ Red Band", description: "Anchor band at chest height, press forward with both arms extending fully." },
  { id: 2, name: "Lat Pulldown", category: "Upper Body", equipment: "Resistance Tube", targetReps: "8–12", recommended: "Black", muscles: ["Latissimus Dorsi", "Biceps", "Rear Delts"], personalBest: "10 reps @ Black Band", description: "Anchor band overhead, pull down to chest level while engaging lats." },
  { id: 3, name: "Squats", category: "Lower Body", equipment: "Bodyweight", targetReps: "12–15", recommended: "Yellow", muscles: ["Quadriceps", "Glutes", "Hamstrings"], personalBest: "15 reps @ Yellow Band", description: "Stand on band, hold handles at shoulders, squat to parallel." },
  { id: 4, name: "Bicep Curl", category: "Upper Body", equipment: "Resistance Tube", targetReps: "10–15", recommended: "Red", muscles: ["Biceps", "Forearms"], personalBest: "15 reps @ Red Band", description: "Stand on band, curl handles toward shoulders with controlled motion." },
  { id: 5, name: "Tricep Extension", category: "Upper Body", equipment: "Resistance Tube", targetReps: "10–12", recommended: "Red", muscles: ["Triceps"], personalBest: "12 reps @ Red Band", description: "Anchor band overhead, extend arms downward keeping elbows fixed." },
  { id: 6, name: "Shoulder Press", category: "Upper Body", equipment: "Resistance Tube", targetReps: "8–12", recommended: "Red", muscles: ["Deltoids", "Triceps"], personalBest: "10 reps @ Red Band", description: "Stand on band, press handles overhead from shoulder height." },
  { id: 7, name: "Plank", category: "Core", equipment: "Bodyweight", targetReps: "30–60s", recommended: "—", muscles: ["Core", "Shoulders"], personalBest: "60 seconds", description: "Hold push-up position with straight body line, brace core throughout." },
  { id: 8, name: "Glute Bridge", category: "Lower Body", equipment: "Resistance Tube", targetReps: "15–20", recommended: "Yellow", muscles: ["Glutes", "Hamstrings"], personalBest: "20 reps @ Yellow Band", description: "Lie on back with band across hips, drive hips upward squeezing glutes." },
  { id: 9, name: "Jumping Jacks", category: "Warmup/Cardio", equipment: "Bodyweight", targetReps: "30–60s", recommended: "—", muscles: ["Full Body", "Cardio"], personalBest: "60 seconds", description: "Jump feet wide while raising arms overhead, return to start." },
  { id: 10, name: "Russian Twists", category: "Core", equipment: "Bodyweight", targetReps: "20–30", recommended: "—", muscles: ["Obliques", "Core"], personalBest: "30 reps", description: "Sit at 45°, feet elevated, rotate torso side to side with control." },
  { id: 11, name: "Lunge", category: "Lower Body", equipment: "Resistance Tube", targetReps: "10–12", recommended: "Red", muscles: ["Quadriceps", "Glutes"], personalBest: "12 reps @ Red Band", description: "Stand on band, step forward into lunge pressing handles at sides." },
  { id: 12, name: "Front Raise", category: "Upper Body", equipment: "Resistance Tube", targetReps: "12–15", recommended: "Yellow", muscles: ["Front Deltoids"], personalBest: "15 reps @ Yellow Band", description: "Stand on band, raise arms straight in front to shoulder height." },
];

export const workoutLogEntries = [
  { id: 1, date: "Aug 19", exercise: "Chest Press", category: "Upper Body", set: 1, resistance: "Red", stance: "Door Anchor", reps: 12, target: "8–12", rpe: 8, status: "GOAL MET", notes: "Strong set, full extension." },
  { id: 2, date: "Aug 19", exercise: "Chest Press", category: "Upper Body", set: 2, resistance: "Red", stance: "Door Anchor", reps: 10, target: "8–12", rpe: 9, status: "GOAL MET", notes: "" },
  { id: 3, date: "Aug 19", exercise: "Lat Pulldown", category: "Upper Body", set: 1, resistance: "Black", stance: "Door Anchor", reps: 10, target: "8–12", rpe: 7, status: "GOAL MET", notes: "Good lat engagement." },
  { id: 4, date: "Aug 19", exercise: "Lat Pulldown", category: "Upper Body", set: 2, resistance: "Black", stance: "Door Anchor", reps: 9, target: "8–12", rpe: 8, status: "BUILD", notes: "" },
  { id: 5, date: "Aug 19", exercise: "Shoulder Press", category: "Upper Body", set: 1, resistance: "Red", stance: "Double Feet", reps: 8, target: "8–12", rpe: 8, status: "GOAL MET", notes: "" },
  { id: 6, date: "Aug 19", exercise: "Bicep Curl", category: "Upper Body", set: 1, resistance: "Red", stance: "Single Foot", reps: 14, target: "10–15", rpe: 7, status: "GOAL MET", notes: "Controlled tempo." },
  { id: 7, date: "Aug 18", exercise: "Squats", category: "Lower Body", set: 1, resistance: "Yellow", stance: "Double Feet", reps: 15, target: "12–15", rpe: 7, status: "GOAL MET", notes: "Good depth." },
  { id: 8, date: "Aug 18", exercise: "Squats", category: "Lower Body", set: 2, resistance: "Yellow", stance: "Double Feet", reps: 13, target: "12–15", rpe: 8, status: "GOAL MET", notes: "" },
  { id: 9, date: "Aug 18", exercise: "Lunge", category: "Lower Body", set: 1, resistance: "Red", stance: "Single Foot", reps: 12, target: "10–12", rpe: 8, status: "GOAL MET", notes: "" },
  { id: 10, date: "Aug 17", exercise: "Plank", category: "Core", set: 1, resistance: "—", stance: "Other", reps: 60, target: "30–60s", rpe: 6, status: "GOAL MET", notes: "Held full 60s." },
  { id: 11, date: "Aug 17", exercise: "Russian Twists", category: "Core", set: 1, resistance: "—", stance: "Other", reps: 28, target: "20–30", rpe: 7, status: "GOAL MET", notes: "" },
  { id: 12, date: "Aug 16", exercise: "Tricep Extension", category: "Upper Body", set: 1, resistance: "Red", stance: "Door Anchor", reps: 9, target: "10–12", rpe: 8, status: "BUILD", notes: "Nearly there." },
];

export const weightData = [
  { date: "Jul 1", weight: 71.2 },
  { date: "Jul 8", weight: 70.8 },
  { date: "Jul 15", weight: 70.5 },
  { date: "Jul 22", weight: 70.1 },
  { date: "Aug 1", weight: 70.0 },
  { date: "Aug 8", weight: 69.8 },
  { date: "Aug 15", weight: 69.6 },
  { date: "Aug 19", weight: 69.6 },
];

export const bodyFatData = [
  { date: "Jul 1", fat: 19.2 },
  { date: "Jul 8", fat: 18.9 },
  { date: "Jul 15", fat: 18.6 },
  { date: "Jul 22", fat: 18.2 },
  { date: "Aug 1", fat: 18.0 },
  { date: "Aug 8", fat: 17.9 },
  { date: "Aug 15", fat: 17.8 },
  { date: "Aug 19", fat: 17.8 },
];

export const measurementData = [
  { date: "Jul 1", chest: 98, arms: 33, waist: 82, thighs: 56, shoulders: 112 },
  { date: "Jul 15", chest: 99, arms: 34, waist: 81, thighs: 57, shoulders: 113 },
  { date: "Aug 1", chest: 100, arms: 34.5, waist: 80, thighs: 57.5, shoulders: 114 },
  { date: "Aug 15", chest: 101, arms: 35, waist: 79, thighs: 58, shoulders: 115 },
];

export const overloadExercises = [
  {
    id: 1, name: "Chest Press", current: "Red Band", bestReps: 12, bestRPE: 8, goal: "12 reps", progress: 85, status: "Progressing",
    history: [
      { week: "W1", resistance: "Yellow", reps: 8 },
      { week: "W2", resistance: "Yellow", reps: 10 },
      { week: "W3", resistance: "Red", reps: 8 },
      { week: "W4", resistance: "Red", reps: 10 },
      { week: "W5", resistance: "Red", reps: 12 },
    ]
  },
  {
    id: 2, name: "Lat Pulldown", current: "Black Band", bestReps: 10, bestRPE: 7, goal: "12 reps", progress: 72, status: "Progressing",
    history: [
      { week: "W1", resistance: "Red", reps: 8 },
      { week: "W2", resistance: "Red", reps: 10 },
      { week: "W3", resistance: "Black", reps: 8 },
      { week: "W4", resistance: "Black", reps: 9 },
      { week: "W5", resistance: "Black", reps: 10 },
    ]
  },
  {
    id: 3, name: "Squats", current: "Yellow Band", bestReps: 15, bestRPE: 7, goal: "15 reps", progress: 100, status: "Goal Met",
    history: [
      { week: "W1", resistance: "—", reps: 10 },
      { week: "W2", resistance: "—", reps: 12 },
      { week: "W3", resistance: "Yellow", reps: 10 },
      { week: "W4", resistance: "Yellow", reps: 13 },
      { week: "W5", resistance: "Yellow", reps: 15 },
    ]
  },
  {
    id: 4, name: "Shoulder Press", current: "Red Band", bestReps: 8, bestRPE: 8, goal: "12 reps", progress: 55, status: "Build",
    history: [
      { week: "W1", resistance: "Yellow", reps: 8 },
      { week: "W2", resistance: "Yellow", reps: 10 },
      { week: "W3", resistance: "Red", reps: 6 },
      { week: "W4", resistance: "Red", reps: 7 },
      { week: "W5", resistance: "Red", reps: 8 },
    ]
  },
];

export const calendarData: Record<string, "completed" | "partial" | "rest"> = {
  "2026-08-01": "completed",
  "2026-08-02": "rest",
  "2026-08-03": "completed",
  "2026-08-04": "completed",
  "2026-08-05": "partial",
  "2026-08-06": "rest",
  "2026-08-07": "completed",
  "2026-08-08": "completed",
  "2026-08-09": "rest",
  "2026-08-10": "completed",
  "2026-08-11": "completed",
  "2026-08-12": "partial",
  "2026-08-13": "completed",
  "2026-08-14": "rest",
  "2026-08-15": "completed",
  "2026-08-16": "completed",
  "2026-08-17": "completed",
  "2026-08-18": "completed",
  "2026-08-19": "partial",
};
