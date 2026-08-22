"use client";

import React, { useState, useEffect } from "react";
import WorkoutTable, { WorkoutRow } from "@/components/ui/WorkoutTable";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import styles from "./DailyWorkout.module.css";

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
    <div className={isMobile ? `${styles.pageContainer} ${styles.pageContainerMobile}` : styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={isMobile ? `${styles.headerSection} ${styles.headerSectionMobile}` : styles.headerSection}>
          <div>
            <p className={styles.dateLabel}>Aug 19, 2026</p>
            <h1 className={styles.pageTitle}>Daily Workout Log</h1>
            <p className={styles.pageSubtitle}>Upper Body • Push + Pull</p>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.setsCountBox}>
              <div className={styles.setsValue}>12</div>
              <div className={styles.setsLabel}>Sets</div>
            </div>
            <button className={styles.completeBtn}>
              <HugeiconsIcon icon={Tick01Icon} size={20} color="currentColor" />
              Complete
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className={styles.filtersRow}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchIcon}>
              <HugeiconsIcon icon={Search01Icon} size={18} color="currentColor" />
            </div>
            <input
              type="text"
              placeholder="Search exercises..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterBtnGroup}>
            {["All", "Upper Body", "Lower Body", "Core"].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterBtnActive : ""}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table Component */}
        <div className={styles.tableSection}>
          {isLoading ? (
            <div className={styles.loadingText}>Loading workouts...</div>
          ) : workoutData.length === 0 ? (
            <div className={styles.emptyStateText}>No workouts logged yet. Go to the dashboard to log a set!</div>
          ) : (
            <WorkoutTable data={filteredData} />
          )}
        </div>
      </div>
    </div>
  );
}
