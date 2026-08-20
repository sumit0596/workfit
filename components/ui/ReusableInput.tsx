"use client";

import { useState, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import styles from "../ui/ReusableInput.module.css";

type InputType = "text" | "number" | "email" | "date" | "password";

interface ReusableInputProps {
  label: string;
  name: string;
  type: InputType;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

export default function ReusableInput({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  placeholder = "",
}: ReusableInputProps) {
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  
  // New state to toggle password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const labelStyles = {
    fontWeight: 600,
    color: "#333",
    letterSpacing: "0.5px",
  };

  const inputStyles = {
    padding: ".8rem",
    borderRadius: "15px",
    // Add extra padding on the right if it's a password field so text doesn't hide behind the icon
    paddingRight: type === "password" ? "45px" : ".8rem",
  };

  const validate = (val: string): string => {
    // 1. Check required status
    if (required && !val.trim()) {
      return `${label} is required`;
    }

    // 2. Check type-specific validation
    if (val) {
      switch (type) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) return "Please enter a valid email address";
          break;
        case "number":
          if (isNaN(Number(val))) return "Please enter a valid number";
          break;
        case "date":
          const dateVal = new Date(val);
          if (isNaN(dateVal.getTime())) return "Please enter a valid date";

          // DOB specific logic: Prevent future dates
          if (dateVal > new Date()) return "Date of birth cannot be in the future";
          break;
      }
    }
    return ""; // No errors
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  // Determine the actual input type to render
  const currentInputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <Form.Group className="mb-3" controlId={`input-${name}`}>
      <Form.Label style={labelStyles}>
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>
      
      {/* Relative wrapper for absolute icon positioning */}
      <div style={{ position: "relative" }}>
        <Form.Control
          type={currentInputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={!!error}
          style={inputStyles}
        />
        
        {/* Render the eye icon only for password types */}
        {type === "password" && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#6c757d",
              display: "flex",
              alignItems: "center",
              zIndex: 10, // Ensures it sits above the input
            }}
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
        <div style={{ fontSize: "0.85rem", marginTop: "4px", color: "#dc3545" }}>
          {error}
        </div>
      )}
    </Form.Group>
  );
}