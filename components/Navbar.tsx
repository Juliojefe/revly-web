import { FaHome, FaCompass, FaPlusSquare, FaBell, FaUser, FaEnvelope, FaSearch } from "react-icons/fa";
import styles from '../app/styles/navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <FaHome className={styles.icon} />
      <FaUser className={styles.icon} />
      <FaCompass className={styles.icon} />
      <FaPlusSquare className={styles.icon} />
      <FaBell className={styles.icon} />
    </nav>
  );
}
