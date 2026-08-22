"use client";

import { useState, FormEvent } from "react";
import ReusableInput from "@/components/ui/ReusableInput";
import { useToast } from "@/components/ui/ToastContext";
import Link from "next/link";
import styles from "../login/LoginForm.module.css"; // Reuse login styles

export default function ForgotPasswordForm() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("If the email exists, a reset link was sent.", "success");
        setSubmitted(true);
      } else {
        showToast(data.message || "An error occurred", "error");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      showToast("Network error. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="row w-100 mx-0 justify-content-center">
        <div className="col-12 col-lg-4 d-flex flex-column justify-content-center px-4 px-md-5 py-5">
          <div className="mb-5 d-flex align-items-center">
            <svg className={styles.brandLogo} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 22V2h4l8 12V2h4v20h-4L8 10v12H4z"></path>
            </svg>
            <div className="ms-3">
              <h5 className="mb-0 fw-bold text-light">ActiveX Gym</h5>
            </div>
          </div>

          <h3 className="fw-semibold mb-1">Reset Password 🔒</h3>
          <p className="mb-4 pb-2" style={{ color: "var(--color-mauve)", fontSize: "0.9rem" }}>
            Enter your email and we'll send you a link to reset your password.
          </p>

          {submitted ? (
            <div className="alert alert-success text-center">
              Check your inbox (and spam folder) for the reset link!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <ReusableInput
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="example@gmail.com"
                required
              />

              <button type="submit" className="btn btn-primary w-100 mt-4 mb-3 btn-login" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="text-center mt-3" style={{ fontSize: "0.85rem", color: "var(--color-mauve)" }}>
            Remember your password?{" "}
            <Link href="/login" style={{ color: "var(--color-coral)" }} className="text-decoration-none fw-semibold border-bottom pb-1">
              Back to Login
            </Link>
          </div>
        </div>

        <div className="col-lg-7 d-none d-lg-block p-3">
          <div className={`${styles.carouselPanel} w-100 h-100 position-relative rounded overflow-hidden`}>
            <div className="carousel slide carousel-fade h-100">
              <div className="carousel-inner h-100">
                <div className="carousel-item h-100 active">
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" alt="Gym 1" className={`${styles.carouselItemImg} d-block`} />
                </div>
              </div>
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
