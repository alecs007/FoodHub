import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Food<span className={styles.span}>Hub</span>
      </div>
    </header>
  );
};

export default Header;
