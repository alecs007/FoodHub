import styles from "./Header.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Header = ({ setSidebarOpen, sidebarOpen, toggleButtonRef }) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    setSidebarOpen(false);
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("hero");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={handleIconClick}>
        Food<span className={styles.span}>Hub</span>
      </div>
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`${styles.togglebutton} ${sidebarOpen ? styles.open : ""}`}
        ref={toggleButtonRef}
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
  toggleButtonRef: PropTypes.object.isRequired,
};

export default Header;
