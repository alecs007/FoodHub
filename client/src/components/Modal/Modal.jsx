import styles from "./Modal.module.css";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import share from "../../assets/share.png";

const Modal = ({ onClose, _id, src, title, description, category, author }) => {
  const categories = [
    { name: "Breakfast", color: "#FFC300" },
    { name: "Lunch", color: "#E63946" },
    { name: "Dinner", color: "#6A5ACD" },
    { name: "Dessert", color: "#ffb4a2" },
    { name: "Vegetarian", color: "#065511" },
    { name: "High Protein", color: "#B22222" },
    { name: "Gluten-free", color: "#90BE6D" },
    { name: "Low carb", color: "#A67C52" },
    { name: "Kids' favourites", color: "#FFA500" },
    { name: "Quick meal", color: "#0077B6" },
  ];
  const shareURL = `${window.location.origin}/browse?recipe=${_id}`;

  const originalTitle = document.title;

  useEffect(() => {
    document.title = `${title} - FoodHub`;

    return () => {
      document.title = originalTitle;
    };
  }, [title, originalTitle]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: "I found this amazing recipe on FoodHub!",
          url: shareURL,
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      alert(
        "Sharing is not supported on this device. Please copy the link manually."
      );
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalp1}>
        <img src={src} alt={title} className={styles.modalimg} />
        <h1>{title}</h1>
        <div className={styles.modalinfo}>
          <div className={styles.modalcategory}>{category}</div>
          <div className={styles.modalauthor}>By {author}</div>
        </div>
      </div>
      <div className={styles.modalp2}>
        <p>
          {description.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      <div className={styles.modalclose} onClick={onClose}>
        &#x2715;
      </div>
      <div className={styles.modalshare} onClick={handleShare}>
        <img src={share} alt="share" />
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Modal;
