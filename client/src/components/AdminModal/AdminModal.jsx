import styles from "./AdminModal.module.css";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { useState } from "react";
import axios from "axios";
import foodhub_icon from "../../assets/foodhub-icon.png";

const AdminModal = ({ onClose, verifyAdmin }) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/admin/login`,
        { password },
        { withCredentials: true }
      );
      verifyAdmin();
      setTimeout(() => onClose(), 100);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "❌ Server error");
      setLoading(false);
    }
  };
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <img src={foodhub_icon} alt="foodhub-icon" />
        <h2>Welcome back!</h2>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          required
        />
        <button onClick={handleSubmit}>
          {loading ? "Loading..." : "Submit"}
        </button>
        <div className={styles.error}>{error || ""}</div>
      </div>
    </div>,
    document.body
  );
};

AdminModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  verifyAdmin: PropTypes.func.isRequired,
};

export default AdminModal;
