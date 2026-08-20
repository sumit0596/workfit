"use client";

import Sidebar from "@/components/ui/Sidebar";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      
      {/* Left Section: Sidebar stays constant across all dashboard pages */}
      {showSidebar && <Sidebar />}

      {/* Right Section: Page content changes dynamically */}
      <main
        style={{
          flex: 1,
          marginLeft: showSidebar ? "240px" : "0", 
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
    </div>
  );
}