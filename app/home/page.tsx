'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';

export default function AuthCallback() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h2>Home page under construction, enjoy this cat for now</h2>
      <img src="/images/waitingCat.jpg"></img>
      <button
        className="text-black bg-white border border-black outline-none cursor-pointer"
        onClick={async () => router.push("/login")}
      >
        Log out
      </button>
    </div>
  );
}