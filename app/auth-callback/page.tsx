"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from './auth-callback.module.css';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = decodeURIComponent(searchParams.get("name") || "");
    const email = decodeURIComponent(searchParams.get("email") || "");
    const profilePic = decodeURIComponent(searchParams.get("profilePic") || "");
    const isGoogle = searchParams.get("isGoogle") === "true";
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (name && email && accessToken && refreshToken) {
      //  save data for sessions
      // private String message;
      // private String name;
      // private String email;
      // private String profilePic;
      // private boolean isGoogle;
      // private String accessToken;
      // private String refreshToken;
      router.push("/home");
    } else {
      router.push("/login?error=Authentication failed. Please try again.");
    }
  }, [searchParams, router]);

  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading…</p>
    </div>
  );
}
