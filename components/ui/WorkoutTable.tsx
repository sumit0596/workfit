"use client";

import React from "react";
import styles from "./WorkoutTable.module.css";

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
    <div className={styles.tableContainer}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeaderCell}>Date</th>
              <th className={styles.tableHeaderCell}>Exercise</th>
              <th className={styles.tableHeaderCell}>Category</th>
              <th className={styles.tableHeaderCell}>Set</th>
              <th className={styles.tableHeaderCell}>Resistance</th>
              <th className={styles.tableHeaderCell}>Stance</th>
              <th className={styles.tableHeaderCell}>Reps</th>
              <th className={styles.tableHeaderCell}>Target</th>
              <th className={styles.tableHeaderCell}>RPE</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.id} className={styles.tableRow}>
                <td className={`${styles.tableCell} ${styles.cellTextMuted}`}>{row.date}</td>
                <td className={`${styles.tableCell} ${styles.cellTextPlum}`}>{row.exercise}</td>
                <td className={styles.tableCell}>
                  <span className={styles.categoryPill} style={getCategoryStyle(row.category)}>
                    {row.category}
                  </span>
                </td>
                <td className={`${styles.tableCell} ${styles.cellTextDark}`}>{row.set}</td>
                <td className={styles.tableCell}>
                  {row.resistance !== "-" ? (
                    <span className={styles.resistancePill} style={getResistanceStyle(row.resistance)}>
                      {row.resistance}
                    </span>
                  ) : <span className={styles.cellTextGray}>—</span>}
                </td>
                <td className={`${styles.tableCell} ${styles.cellTextMuted}`}>{row.stance}</td>
                <td className={`${styles.tableCell} ${styles.cellTextDark}`}>{row.reps}</td>
                <td className={`${styles.tableCell} ${styles.cellTextGray}`}>{row.target}</td>
                <td className={`${styles.tableCell} ${styles.cellTextDarkMedium}`}>{row.rpe}<span style={{ color: "#9CA3AF", fontWeight: 400 }}>/10</span></td>
                <td className={styles.tableCell}>
                  <span className={styles.statusPill} style={getStatusStyle(row.status)}>
                    <span className={styles.statusDot}></span>
                    {row.status}
                  </span>
                </td>
                <td className={`${styles.tableCell} ${styles.cellNotes}`}>
                  {row.notes || <span className={styles.cellTextGray}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
