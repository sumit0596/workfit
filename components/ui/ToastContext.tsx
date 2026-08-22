"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import styles from "./ToastContext.module.css";

export type ToastType = "success" | "error" | "warn" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 11);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000); // auto-dismiss after 4 seconds
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`toast-container position-fixed top-0 end-0 p-3 ${styles.toastContainerWrapper}`}>
        {toasts.map((toast) => {
          let bgClass = "text-bg-primary";
          if (toast.type === "success") bgClass = "text-bg-success";
          else if (toast.type === "error") bgClass = "text-bg-danger";
          else if (toast.type === "warn") bgClass = "text-bg-warning";
          else if (toast.type === "info") bgClass = "text-bg-info";

          return (
            <div
              key={toast.id}
              className={`toast show align-items-center border-0 ${bgClass} mb-2 ${styles.toastWrapper}`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className={`toast-body flex-grow-1 fw-medium ${styles.toastText}`}>
                  {toast.message}
                </div>
                <button
                  type="button"
                  className={`btn-close me-2 m-auto ${toast.type === 'warn' ? '' : 'btn-close-white'}`}
                  onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                  aria-label="Close"
                ></button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
