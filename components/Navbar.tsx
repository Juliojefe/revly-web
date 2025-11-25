import { FaHome, FaCompass, FaPlusSquare, FaBell, FaUser, FaEnvelope, FaSearch } from "react-icons/fa";
// import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <FaHome className="icon" />
        <FaCompass className="icon" />
        <FaSearch className="icon" />
      </div>

      <div className="nav-center">
        <FaPlusSquare className="icon" />
      </div>

      <div className="nav-right">
        <FaEnvelope className="icon" />
        <FaBell className="icon" />
        <FaUser className="icon" />
      </div>
    </nav>
  );
}
