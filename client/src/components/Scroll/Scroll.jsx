import styles from "./Scroll.module.css";
import double_arrows from "../../assets/double-arrows.png";

const Scroll = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.scrolltop} onClick={scrollToTop}>
      <img src={double_arrows} alt="Scroll to top" />
    </div>
  );
};

export default Scroll;
