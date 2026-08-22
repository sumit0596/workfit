"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon } from "@hugeicons/core-free-icons";
import styles from "./ComingSoon.module.css";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ 
  title, 
  description = "We're working hard to bring you this feature. Check back soon for updates!" 
}: ComingSoonProps) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconInner}>
            <HugeiconsIcon icon={Clock01Icon} size={40} color="currentColor" />
          </div>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        
        <button 
          className={styles.backBtn}
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
