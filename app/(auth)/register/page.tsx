"use client";

import { useState, FormEvent, useEffect } from "react";
import ReusableInput from "@/components/ui/ReusableInput";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleRegister = async (e: FormEvent) => {
  e.preventDefault();
  
  try {
    // 1. Send the POST request to our Next.js API route
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // 2. Pass the React state values as the body
      body: JSON.stringify({ fname, lname, email, password }),
    });

    const data = await response.json();

    // 3. Handle success or failure
    if (response.ok) {
      alert("Success! User saved to database.");
      setEmail(""); // Clear the form
      setPassword("");
    } else {
      alert(`Failed: ${data.message}`); // E.g., "User already exists"
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("An error occurred while connecting to the server.");
  }
};

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
    <div className="row w-100 mx-0 justify-content-center">
      <div className={`col-12 col-lg-6 d-flex flex-column justify-content-center px-4 px-md-6 py-5 ${styles.registerContainer}`}>
        <div className="mb-5 d-flex align-items-center">

          <svg className={styles.brandLogo} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22V2h4l8 12V2h4v20h-4L8 10v12H4z"></path>
          </svg>
          <div className="ms-3">
            <h5 className="mb-0 fw-bold text-light">ActiveX Gym</h5>
            <small style={{ color: "var(--color-yellow)", fontSize: "0.7rem" }}>
              Start Now !
            </small>
          </div>
        </div>

        <h3 className="fw-semibold mb-1">Hey, Welcome Back ! 👋</h3>
        <p className="mb-4 pb-2" style={{ color: "var(--color-mauve)", fontSize: "0.9rem" }}>
          Please enter your details
        </p>

        {/* Form */}
        <form onSubmit={handleRegister}>
          <ReusableInput
            label="First Name"
            name="fname"
            type="text"
            value={fname}
            onChange={setFname}
            placeholder="Jhon"
            required
          />
          <ReusableInput
            label="Last Name"
            name="fname"
            type="text"
            value={lname}
            onChange={setLname}
            placeholder="Jhon"
            required
          />
          <ReusableInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="example@gmail.com"
            required
          />
          
          <ReusableInput
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••••"
            required
          />

          <div className="d-flex justify-content-between align-items-center mb-4 pb-1 mt-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label
                className="form-check-label"
                htmlFor="rememberMe"
                style={{ fontSize: "0.85rem", color: "var(--color-light)" }}
              >
                Remember me
              </label>
            </div>
            {/* Using styles.textLink */}
            <a href="#" className={`${styles.textLink} text-decoration-none`} style={{ fontSize: "0.85rem" }}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3 btn-login">
            Login
          </button>

          <div className="text-center" style={{ fontSize: "0.85rem", color: "var(--color-mauve)" }}>
            Don't have an account?{" "}
            <a href="#" style={{ color: "var(--color-coral)" }} className="text-decoration-none fw-semibold border-bottom pb-1">
              Sign up here
            </a>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}