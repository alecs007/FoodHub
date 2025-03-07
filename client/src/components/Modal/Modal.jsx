import styles from "./Modal.module.css";
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
      <div className={styles.modalcontent}>
        <img
          className={styles.share}
          src={share}
          alt="share"
          onClick={handleShare}
        />
        <img
          className={styles.modalimage}
          src={`http://localhost:8080${src}`}
          alt={title}
        />
        <h1 className={styles.modaltitle}>{title}</h1>
        <p className={styles.modaldescription}>
          {description.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className={styles.modalinfo}>
          <div
            className={styles.modalcategory}
            style={{
              backgroundColor: categories.find((c) => c.name === category)
                .color,
            }}
          >
            {category}
          </div>
          <div className={styles.modalauthor}>By: {author}</div>
          <button className={styles.modalbutton} onClick={onClose}>
            Close
          </button>
        </div>
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
