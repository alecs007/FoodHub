import styles from "./Header.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          Food<span className={styles.span}>Hub</span>
        </div>
      </Link>
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`${styles.togglebutton} ${sidebarOpen ? styles.open : ""}`}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </header>
  );
};

Header.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

export default Header;
