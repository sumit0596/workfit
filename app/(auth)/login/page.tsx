"use client";

import { useState, FormEvent, useEffect } from "react";
import ReusableInput from "@/components/ui/ReusableInput";
import styles from "./LoginForm.module.css";
import { useToast } from "@/components/ui/ToastContext";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Use NextAuth signIn method
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // We handle the redirect manually
      });

      if (res?.error) {
        showToast(`Login Failed: ${res.error}`, "error");
        return;
      }

      // If successful, redirect to the dashboard
      if (res?.ok) {
        showToast("Login successful!", "success");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("An error occurred during login.", "error");
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
          <form onSubmit={handleLogin}>

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

              </div>
              <Link href="/forgot-password" className={`${styles.textLink} text-decoration-none`} style={{ fontSize: "0.85rem", color: "var(--color-coral)" }}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3 btn-login">
              Login
            </button>

            <div className="text-center" style={{ fontSize: "0.85rem", color: "var(--color-mauve)" }}>
              Don't have an account?{" "}
              <Link href="/register" style={{ color: "var(--color-coral)" }} className="text-decoration-none fw-semibold border-bottom pb-1">
                Sign up here
              </Link>
            </div>
          </form>
        </div>

        <div className="col-lg-7 d-none d-lg-block p-3">
          {/* FIX 1: Using styles.carouselPanel */}
          <div className={`${styles.carouselPanel} w-100 h-100 position-relative rounded overflow-hidden`}>
            <div id="gymCarousel" className="carousel slide carousel-fade h-100" data-bs-ride="carousel">
              <div className="carousel-inner h-100">
                <div className="carousel-item h-100 active">
                  {/* FIX 2: Using styles.carouselItemImg */}
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" alt="Gym 1" className={`${styles.carouselItemImg} d-block`} />
                </div>
                <div className="carousel-item h-100">
                  <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" alt="Gym 2" className={`${styles.carouselItemImg} d-block`} />
                </div>
                <div className="carousel-item h-100">
                  <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" alt="Gym 3" className={`${styles.carouselItemImg} d-block`} />
                </div>
              </div>

              {/* FIX 3: Using styles.imageOverlay */}
              <div className={styles.imageOverlay}></div>

              {/* FIX 4: Using styles.textOverlay */}
              <div className={styles.textOverlay}>
                <p className="fs-6 fw-light mb-0" style={{ lineHeight: "1.6" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* FIX 5: Using styles.customIndicators */}
              <div className={styles.customIndicators}>
                <button type="button" data-bs-target="#gymCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#gymCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#gymCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>

              {/* FIX 6: Using styles.carouselNextBtn */}
              <button className={styles.carouselNextBtn} type="button" data-bs-target="#gymCarousel" data-bs-slide="next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}