'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';
import { useUser } from "@/context/UserContext";


export default function AuthCallback() {
  const router = useRouter();
  const { user, logout } = useUser();

  async function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      <h2>Welcome {user?.name || "friend"}</h2>
      <img src="/images/waitingCat.jpg"></img>
      <button
        className="text-black bg-white border border-black outline-none cursor-pointer"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}