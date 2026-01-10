'use client'

import { useRouter } from 'next/navigation';
import styles from "./myProfile.module.css";
import { useUser } from '../../providers/UserProvider';

export default function myProfile() {
  return (
    <div className={styles.container}>
      <h2>My Profile Page</h2>
    </div>
  );
}