// Коментар: Header компонент для навігації між сторінками
//src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css"; // Якщо у тебе є модульні стилі

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-card">Add Card</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
