"use client";

import Sidebar from "@/components/ui/Sidebar";
import BottomNav from "@/components/ui/BottomNav";
import Header from "@/components/ui/Header";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial window size
    setIsMobile(window.innerWidth < 768);

    // Update on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showSidebar = !isMobile;
  const showHeader = isMobile || pathname === "/dashboard";

  return (
    <div className={styles.layoutContainer}>
      
      {/* Left Section: Sidebar stays constant across all dashboard pages */}
      {showSidebar && <Sidebar />}

      {/* Right Section: Page content changes dynamically */}
      <main
        className={`${styles.mainContent} ${showSidebar ? styles.mainContentDesktop : ""} ${isMobile ? styles.mainContentMobile : ""}`}
      >
        {showHeader && <Header />}
        {children}
      </main>

      {isMobile && <BottomNav />}
    </div>
  );
}