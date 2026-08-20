"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import styles from "./Loader.module.css";

const LoaderContext = createContext({
  isLoading: false,
});

export default function Loader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Keep track of concurrent requests so the loader doesn't hide too early
    let activeRequests = 0;

    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      activeRequests++;
      setIsLoading(true);

      try {
        const response = await originalFetch(...args);
        return response;
      } finally {
        activeRequests--;
        if (activeRequests === 0) {
          setIsLoading(false);
        }
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  // FIX: Wrapped the return values in the Provider component
  return (
    <LoaderContext.Provider value={{ isLoading }}>
      {children}
      
      {isLoading && (
        <div className={styles.overlay}> {/* Assuming you added the overlay class to CSS */}
          <span className={styles.loader}></span>
        </div>
      )}
    </LoaderContext.Provider>
  );
}