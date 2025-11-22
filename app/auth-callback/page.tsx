"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from '../styles/loading.module.css';
import { useUser } from "@/context/UserContext";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();

  useEffect(() => {
    const name = decodeURIComponent(searchParams.get("name") || "");
    const email = decodeURIComponent(searchParams.get("email") || "");
    const profilePic = decodeURIComponent(searchParams.get("profilePic") || "");
    const isGoogle = searchParams.get("isGoogle") === "true";
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (name && email && accessToken && refreshToken) {
      const userData = {
        name,
        email,
        profilePic,
        isGoogle,
        accessToken,
        refreshToken,
      };
      setUser(userData);
      router.push("/home");
    } else {
      router.push("/login?error=Authentication failed. Please try again.");
    }
  }, [searchParams, router, setUser]);

  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading…</p>
    </div>
  );
}
