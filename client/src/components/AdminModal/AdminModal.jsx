import styles from "./AdminModal.module.css";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { useState } from "react";
import axios from "axios";

const AdminModal = ({ onClose, verifyAdmin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        "http://localhost:8080/api/admin/login",
        { password },
        { withCredentials: true }
      );
      verifyAdmin();
      setTimeout(() => onClose(), 100);
    } catch (err) {
      setError(err.response?.data?.error || "❌ Server error");
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
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        required
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>,
    document.body
  );
};

AdminModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  verifyAdmin: PropTypes.func.isRequired,
};

export default AdminModal;
