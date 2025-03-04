import styles from "./Favorites.module.css";
import { useState, useEffect } from "react";
import FoodCard from "../../components/FoodCard/FoodCard";

const Favorites = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0 }, { behavior: "smooth" });
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(savedRecipes);
  }, []);

  return (
    <div className={styles.favorites}>
      <div className={styles.favoritescontainer}>
        {savedRecipes.length === 0 && (
          <h1 className={styles.norecipes}>Your favorites list is empty</h1>
        )}
        {savedRecipes.map((recipe) => (
          <FoodCard
            key={recipe._id}
            _id={recipe._id}
            src={recipe.src}
            title={recipe.title}
            description={recipe.description}
            category={recipe.category}
            author={recipe.author}
            setSavedRecipes={setSavedRecipes}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
