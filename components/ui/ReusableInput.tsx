"use client";

import { useState, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import styles from "./ReusableInput.module.css";

type InputType = "text" | "number" | "email" | "date" | "password" | "select" | "counter";

interface ReusableInputProps {
  label: string;
  name: string;
  type: InputType;
  value: string | number;
  onChange: (value: any) => void;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export default function ReusableInput({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  placeholder = "",
  options = [],
  onIncrement,
  onDecrement,
}: ReusableInputProps) {
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  // New state to toggle password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const validate = (val: string | number): string => {
    const stringVal = String(val);
    // 1. Check required status
    if (required && !stringVal.trim()) {
      return `${label} is required`;
    }

    // 2. Check type-specific validation
    if (stringVal) {
      switch (type) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(stringVal)) return "Please enter a valid email address";
          break;
        case "number":
          if (isNaN(Number(stringVal))) return "Please enter a valid number";
          break;
        case "date":
          const dateVal = new Date(stringVal);
          if (isNaN(dateVal.getTime())) return "Please enter a valid date";

          // DOB specific logic: Prevent future dates
          if (dateVal > new Date()) return "Date of birth cannot be in the future";
          break;
      }
    }
    return ""; // No errors
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    onChange(val);

    // Once touched, validate continuously on every keystroke
    if (touched) {
      setError(validate(val));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate(value));
  };

  if (type === "select") {
    return (
      <div className="mb-3">
        <label className={styles.label}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <select
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && (
          <div className={styles.errorText}>
            {error}
          </div>
        )}
      </div>
    );
  }

  if (type === "counter") {
    return (
      <div className="mb-3">
        <label className={styles.label}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <div className={styles.counterWrapper}>
          <button type="button" onClick={onDecrement} className={`${styles.counterBtn} ${styles.decrementBtn}`}>-</button>
          <input type="text" value={value} readOnly className={styles.counterValue} />
          <button type="button" onClick={onIncrement} className={`${styles.counterBtn} ${styles.incrementBtn}`}>+</button>
        </div>
        {error && (
          <div className={styles.errorText}>
            {error}
          </div>
        )}
      </div>
    );
  }

  // Determine the actual input type to render
  const currentInputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-3">
      <label className={styles.label}>
        {label} {required && <span className="text-danger">*</span>}
      </label>

      {/* Relative wrapper for absolute icon positioning */}
      <div className={styles.passwordWrapper}>
        <input
          type={currentInputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${type === "password" ? styles.passwordInput : ""} ${error ? styles.inputError : ""}`}
        />

        {/* Render the eye icon only for password types */}
        {type === "password" && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordToggle}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye Slash Icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              // Eye Icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className={styles.errorText}>
          {error}
        </div>
      )}
    </div>
  );
}