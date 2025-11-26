'use client';

import { FaHome, FaCompass, FaPlusSquare, FaBell, FaUser, FaEnvelope, FaSearch } from "react-icons/fa";
import styles from '../app/styles/navbar.module.css';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  function doNothing() {
    return; //  for now do nothing
  }

  return (
    <nav className={styles.navbar}>
      <FaHome
        className={`${styles.icon} ${pathname === '/home' ? styles.active : ''}`}
        onClick={async () => router.push("/home")}
      />
      <FaUser
        className={`${styles.icon} ${pathname === '/myProfile' ? styles.active : ''}`}
        onClick={async () => router.push("/myProfile")}
      />
      <FaCompass
        className={`${styles.icon} ${pathname === '/explore' ? styles.active : ''}`}
        onClick={async () => router.push("/explore")}
      />
      <FaPlusSquare
        className={styles.icon}
        onClick={doNothing}
      />
      <FaBell
        className={styles.icon}
        onClick={doNothing}
      />
    </nav>
  );
}