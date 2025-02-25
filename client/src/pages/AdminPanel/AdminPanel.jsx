import styles from "./AdminPanel.module.css";
import AdminModal from "../../components/AdminModal/AdminModal";
import FoodCard from "../../components/FoodCard/FoodCard";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showPending, setShowPending] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [pendingRecipes, setPendingRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/approved");
      setRecipes(res.data);
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };
  const fetchPendingRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/pending");
      setPendingRecipes(res.data);
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${id}`);
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
      setPendingRecipes(pendingRecipes.filter((recipe) => recipe._id !== id));
    } catch (err) {
      console.log("Failed to delete data", err);
    }
  };

  const approveRecipe = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/${id}/approve`);
      setPendingRecipes(pendingRecipes.filter((recipe) => recipe._id !== id));
      alert("Post approved!");
    } catch (err) {
      console.log("Failed to delete data", err);
      alert("❌ Failed to approve post");
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchPendingRecipes();
  }, []);

  return (
    <div className={styles.adminpanel}>
      {isOpen && <AdminModal onClose={() => setIsOpen(false)} />}
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
        </div>
      </div>
      <div className={styles.adminrecipes}>
        {!showPending &&
          recipes.map((recipe) => (
            <div className={styles.adminrecipe} key={recipe._id}>
              <button
                className={styles.adminbutton}
                style={{ backgroundColor: "#e74c3c" }}
                onClick={() => deleteRecipe(recipe._id)}
              >
                Delete
              </button>

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
  );
};

export default AdminPanel;
