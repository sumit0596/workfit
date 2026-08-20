"use client";

import React from "react";

export type WorkoutRow = {
  id: string;
  date: string;
  exercise: string;
  category: string;
  set: number;
  resistance: string;
  stance: string;
  reps: number;
  target: string;
  rpe: number;
  status: "GOAL MET" | "BUILD";
  notes: string;
};

interface WorkoutTableProps {
  data: WorkoutRow[];
}

const getCategoryStyle = (category: string) => {
  switch (category) {
    case "Upper Body": return { background: "rgba(158, 104, 150, 0.15)", color: "var(--color-plum)" }; // Mauve-ish bg, plum text
    case "Lower Body": return { background: "rgba(223, 108, 118, 0.15)", color: "var(--color-coral)" };
    case "Core": return { background: "rgba(245, 235, 145, 0.5)", color: "#8a7d18" };
    default: return { background: "#f3f4f6", color: "#4b5563" };
  }
};

const getResistanceStyle = (resistance: string) => {
  switch (resistance) {
    case "Red": return { background: "#fee2e2", color: "#ef4444" };
    case "Black": return { background: "#1f2937", color: "#f9fafb" };
    case "Yellow": return { background: "#fef9c3", color: "#eab308" };
    default: return { background: "#f3f4f6", color: "#9ca3af" };
  }
};

const getStatusStyle = (status: string) => {
  if (status === "GOAL MET") return { background: "#dcfce7", color: "#16a34a" };
  if (status === "BUILD") return { background: "#ffedd5", color: "#ea580c" };
  return { background: "#f3f4f6", color: "#4b5563" };
};

export default function WorkoutTable({ data }: WorkoutTableProps) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #D9DDE3", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ overflow: "auto", flex: 1 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 10, borderBottom: "2px solid #F3F4F6", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <tr>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Exercise</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Set</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Resistance</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Stance</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Reps</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Target</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>RPE</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
              <th style={{ padding: "16px 24px", color: "#6B7280", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr 
                key={row.id} 
                style={{ borderBottom: idx === data.length - 1 ? "none" : "1px solid #F3F4F6", transition: "background 0.2s" }} 
                onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"} 
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "16px 24px", color: "#6B7280" }}>{row.date}</td>
                <td style={{ padding: "16px 24px", fontWeight: 600, color: "var(--color-plum)" }}>{row.exercise}</td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, ...getCategoryStyle(row.category) }}>
                    {row.category}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", fontWeight: 700, color: "#111827" }}>{row.set}</td>
                <td style={{ padding: "16px 24px" }}>
                  {row.resistance !== "-" ? (
                    <span style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, ...getResistanceStyle(row.resistance) }}>
                      {row.resistance}
                    </span>
                  ) : <span style={{ color: "#D1D5DB" }}>—</span>}
                </td>
                <td style={{ padding: "16px 24px", color: "#6B7280" }}>{row.stance}</td>
                <td style={{ padding: "16px 24px", fontWeight: 700, color: "#111827" }}>{row.reps}</td>
                <td style={{ padding: "16px 24px", color: "#9CA3AF" }}>{row.target}</td>
                <td style={{ padding: "16px 24px", fontWeight: 600, color: "#4B5563" }}>{row.rpe}<span style={{ color: "#9CA3AF", fontWeight: 400 }}>/10</span></td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, ...getStatusStyle(row.status) }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor" }}></span>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", color: "#6B7280", maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {row.notes || <span style={{ color: "#D1D5DB" }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
