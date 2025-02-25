import styles from "./AdminModal.module.css";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { useState } from "react";

const AdminModal = ({ onClose }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      onClose();
    } else {
      alert("Incorrect password");
    }
  };
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <h2>Enter Admin Password</h2>
      <input
        type="password"
        value={password}
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>,
    document.body
  );
};

AdminModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AdminModal;
