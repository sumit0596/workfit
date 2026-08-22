"use client";

import { useState, FormEvent, Suspense } from "react";
import ReusableInput from "@/components/ui/ReusableInput";
import { useToast } from "@/components/ui/ToastContext";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../login/LoginForm.module.css"; 

function ResetPasswordFormContent() {
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      showToast("Invalid or missing reset token.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Password reset successfully! You can now log in.", "success");
        router.push("/login");
      } else {
        showToast(data.message || "An error occurred", "error");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      showToast("Network error. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="alert alert-danger text-center w-100">
        Invalid password reset link. Please request a new one.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <ReusableInput
        label="New Password"
        name="newPassword"
        type="password"
        value={newPassword}
        onChange={setNewPassword}
        placeholder="••••••••••"
        required
      />
      <ReusableInput
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="••••••••••"
        required
      />
      <button type="submit" className="btn btn-primary w-100 mt-4 mb-3 btn-login" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
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

          <h3 className="fw-semibold mb-1">Create New Password 🔑</h3>
          <p className="mb-4 pb-2" style={{ color: "var(--color-mauve)", fontSize: "0.9rem" }}>
            Enter your new password below.
          </p>

          <Suspense fallback={<div className="text-center text-light">Loading...</div>}>
            <ResetPasswordFormContent />
          </Suspense>
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
