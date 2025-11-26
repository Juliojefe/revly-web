'use client'

import { useRouter } from 'next/navigation';
import styles from "./explore.module.css";
import { useUser } from '@/context/UserContext';

export default function explore() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2>My explore Page</h2>
    </div>
  );
}