import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import foodhub_icon from "../../assets/foodhub-icon.png";

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <img src={foodhub_icon} alt="foodhub-icon" />
      <h1 className={styles.notfoundtitle}>404</h1>
      <Link to="/">
        <h2 className={styles.notfoundsubtitle}>
          Go to Food<span>Hub</span>
        </h2>
      </Link>
    </div>
  );
};

export default NotFound;
