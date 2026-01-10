'use client';

import { FaHome, FaCompass, FaPlusSquare, FaBell, FaUser } from "react-icons/fa";
import styles from '@/app/styles/navbar.module.css';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  function doNothing() {
    return;
  }

  return (
    <nav className={styles.navbar}>

      <div 
        className={`${styles.iconWrapper} ${pathname === '/home' ? styles.active : ''}`}
        onClick={() => router.push("/home")}
      >
        <FaHome className={styles.icon} />
        <p>Home</p>
      </div>

      <div 
        className={`${styles.iconWrapper} ${pathname === '/myProfile' ? styles.active : ''}`}
        onClick={() => router.push("/myProfile")}
      >
        <FaUser className={styles.icon} />
        <p>Profile</p>
      </div>

      <div 
        className={`${styles.iconWrapper} ${pathname === '/explore' ? styles.active : ''}`}
        onClick={() => router.push("/explore")}
      >
        <FaCompass className={styles.icon} />
        <p>Explore</p>
      </div>

      <div className={styles.iconWrapper} onClick={doNothing}>
        <FaPlusSquare className={styles.icon} />
        <p>Create</p>
      </div>

      <div className={styles.iconWrapper} onClick={doNothing}>
        <FaBell className={styles.icon} />
        <p>Notifs</p>
      </div>

    </nav>
  );
}