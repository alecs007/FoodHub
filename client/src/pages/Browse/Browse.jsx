import styles from "./Browse.module.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import FoodCard from "../../components/FoodCard/FoodCard";
import search from "../../assets/search.png";

const Browse = ({ filteredRecipes, setSearchTerm, searchTerm }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [browseSearchTerm, setBrowseSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(savedRecipes);
  }, []);

  return (
    <div className={styles.browse}>
      <div className={styles.inputcontainer}>
        <input
          className={styles.search}
          type="text"
          value={browseSearchTerm}
          onChange={(e) => setBrowseSearchTerm(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && setSearchTerm(browseSearchTerm)
          }
          placeholder="Search for food recipes..."
        />
        <div
          className={styles.searchicon}
          onClick={() => setSearchTerm(browseSearchTerm)}
        >
          <img src={search} alt="search" />
        </div>
      </div>
      <div className={styles.recipecontainer}>
        {filteredRecipes.length === 0 && (
          <h1 className={styles.norecipes}>No recipes found</h1>
        )}
        {filteredRecipes.map((recipe) => (
          <FoodCard
            key={recipe._id}
            _id={recipe._id}
            src={recipe.imageUrl}
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

Browse.propTypes = {
  filteredRecipes: PropTypes.array,
  setSearchTerm: PropTypes.func,
  searchTerm: PropTypes.string,
};
export default Browse;
