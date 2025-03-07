import styles from "./Favorites.module.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../../components/FoodCard/FoodCard";
import Modal from "../../components/Modal/Modal";

const Favorites = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 }, { behavior: "smooth" });
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(savedRecipes);
  }, []);

  useEffect(() => {
    const recipeId = searchParams.get("recipe");
    if (recipeId && savedRecipes?.length > 0) {
      const foundRecipe = savedRecipes.find(
        (recipe) => recipe._id === recipeId
      );
      if (foundRecipe) {
        setSelectedRecipe(foundRecipe);
      } else {
        setSearchParams({});
      }
    } else {
      setSelectedRecipe(null);
    }
  }, [savedRecipes, searchParams, setSearchParams]);

  const closeModal = () => {
    setSearchParams({});
    setSelectedRecipe(null);
  };

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
      {selectedRecipe && (
        <Modal
          onClose={closeModal}
          _id={selectedRecipe._id}
          src={selectedRecipe.src}
          title={selectedRecipe.title}
          description={selectedRecipe.description}
          category={selectedRecipe.category}
          author={selectedRecipe.author}
        />
      )}
    </div>
  );
};

export default Favorites;
