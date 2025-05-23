import styles from "./AdminPanel.module.css";
import AdminModal from "../../components/AdminModal/AdminModal";
import EditModal from "../../components/EditModal/EditModal";
import FoodCard from "../../components/FoodCard/FoodCard";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [isOpen, setIsOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [pendingRecipes, setPendingRecipes] = useState([]);
  const [editedRecipe, setEditedRecipe] = useState(null);

  const verifyAdmin = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin-check`, {
        withCredentials: true,
      });
      setIsAdmin(res.data.isAdmin);
    } catch (err) {
      setIsAdmin(false);
      console.log("Failed to verify admin", err);
    }
  };

  useEffect(() => {
    verifyAdmin();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/approved`);
      setRecipes(res.data.reverse());
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };
  const fetchPendingRecipes = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/pending`, {
        withCredentials: true,
      });
      setPendingRecipes(res.data);
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/${id}`, {
        withCredentials: true,
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
      setPendingRecipes(pendingRecipes.filter((recipe) => recipe._id !== id));
    } catch (err) {
      console.log("Failed to delete data", err);
    }
  };

  const approveRecipe = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/api/${id}/approve`,
        {},
        {
          withCredentials: true,
        }
      );
      setPendingRecipes(pendingRecipes.filter((recipe) => recipe._id !== id));
      alert("Post approved!");
    } catch (err) {
      console.log("Failed to approve post", err);
      alert("❌ Failed to approve post");
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchPendingRecipes();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/admin/logout`,
        {},
        { withCredentials: true }
      );
      alert("✅ Logged out");
      setIsAdmin(false);
      verifyAdmin();
      window.location.reload();
    } catch (err) {
      alert("❌ Failed to logout", err);
    }
  };

  return (
    <div className={styles.adminpanel}>
      {isOpen && (
        <AdminModal
          onClose={() => setIsOpen(false)}
          verifyAdmin={verifyAdmin}
        />
      )}
      {editedRecipe && (
        <EditModal
          id={editedRecipe._id}
          recipe={editedRecipe}
          onClose={() => setEditedRecipe(null)}
          fetchPendingRecipes={fetchPendingRecipes}
          fetchRecipes={fetchRecipes}
        />
      )}
      {!isAdmin && <h1 className={styles.unauthorized}>Unauthorized</h1>}
      {isAdmin && (
        <div>
          <div className={styles.adminsearch}>
            <div className={styles.buttoncontainer}>
              <button
                className={`${styles.categorybutton} ${
                  !showPending ? styles.active : ""
                }`}
                onClick={() => setShowPending(false)}
              >
                Approved recipes
              </button>
              <button
                className={`${styles.categorybutton} ${
                  showPending ? styles.active : ""
                }`}
                onClick={() => setShowPending(true)}
              >
                Pending recipes
              </button>
              <button className={styles.logoutbutton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className={styles.adminrecipes}>
            {!showPending &&
              recipes.map((recipe) => (
                <div className={styles.adminrecipe} key={recipe._id}>
                  <div className={styles.buttoncontainer}>
                    <button
                      className={styles.adminbutton}
                      style={{ backgroundColor: "#e74c3c" }}
                      onClick={() => deleteRecipe(recipe._id)}
                    >
                      Delete
                    </button>
                    <button
                      className={styles.adminbutton}
                      style={{ backgroundColor: "#4d9cdd" }}
                      onClick={() => setEditedRecipe(recipe)}
                    >
                      Edit
                    </button>
                  </div>
                  <FoodCard
                    src={recipe.imageUrl}
                    title={recipe.title}
                    description={recipe.description}
                    category={recipe.category}
                    author={recipe.author}
                  />
                </div>
              ))}
            {showPending &&
              pendingRecipes.map((recipe) => (
                <div className={styles.adminrecipe} key={recipe._id}>
                  <div className={styles.buttoncontainer}>
                    <button
                      className={styles.adminbutton}
                      onClick={() => deleteRecipe(recipe._id)}
                      style={{ backgroundColor: "#e74c3c" }}
                    >
                      Reject
                    </button>
                    <button
                      className={styles.adminbutton}
                      style={{ backgroundColor: "#2ecc71" }}
                      onClick={() => approveRecipe(recipe._id)}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.adminbutton}
                      style={{ backgroundColor: "#4d9cdd" }}
                      onClick={() => setEditedRecipe(recipe)}
                    >
                      Edit
                    </button>
                  </div>
                  <FoodCard
                    src={recipe.imageUrl}
                    title={recipe.title}
                    description={recipe.description}
                    category={recipe.category}
                    author={recipe.author}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
