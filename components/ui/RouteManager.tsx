"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteManager() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Format the path
    const activePath = pathname.replace(/^\/+/, "");
    const routeClass = activePath === "" ? "homePage" : activePath.replace(/\//g, "-");

    // 2. Define your base classes so they don't get deleted
    const baseClasses = ["min-h-full", "flex", "flex-col"];

    // 3. Apply the combined classes to the body
    document.body.className = [...baseClasses, routeClass].join(" ");
  }, [pathname]); // This triggers every time the route changes

  return null; // This component renders nothing visually
}