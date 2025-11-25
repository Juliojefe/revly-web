'use client';

import { FaHome, FaCompass, FaPlusSquare, FaBell, FaUser, FaEnvelope, FaSearch } from "react-icons/fa";
import styles from '../app/styles/navbar.module.css';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  function doNothing() {
    //  for now do nothing
    return;
  } 

  return (
    <nav className={styles.navbar}>
      <FaHome className={styles.icon} onClick={async () => router.push("/home")}/>
      <FaUser className={styles.icon} onClick={async () => router.push("/myProfile")} />
      <FaCompass className={styles.icon} onClick={async () => router.push("/explore")}/>
      <FaPlusSquare className={styles.icon} onClick={doNothing}/>
      <FaBell className={styles.icon} onClick={doNothing}/>
    </nav>
  );
}