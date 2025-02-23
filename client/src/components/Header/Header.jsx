import styles from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Food<span className={styles.span}>Hub</span>
      </div>
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
