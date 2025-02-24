import styles from "./Header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          Food<span className={styles.span}>Hub</span>
        </div>
      </Link>
      <div
        onClick={() => setOpen(!open)}
        className={`${styles.togglebutton} ${open ? styles.open : ""}`}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </header>
  );
};

export default Header;
