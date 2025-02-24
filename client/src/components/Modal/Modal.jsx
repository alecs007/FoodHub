import styles from "./Modal.module.css";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Modal = ({ onClose, src, title, description, category, author }) => {
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <img className={styles.modalimage} src={src} alt="" />
        <h1 className={styles.modaltitle}>{title}</h1>
        <p className={styles.modaldescription}>{description}</p>
        <div className={styles.modalinfo}>
          <div className={styles.modalcategory}>{category}</div>
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
