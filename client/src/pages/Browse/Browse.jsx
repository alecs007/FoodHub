import styles from "./Browse.module.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../../components/FoodCard/FoodCard";
import Modal from "../../components/Modal/Modal";
import search from "../../assets/search.png";

const Browse = ({
  filteredRecipes,
  setSearchTerm,
  searchTerm,
  categoryTerm,
}) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [browseSearchTerm, setBrowseSearchTerm] = useState(searchTerm);
  const [visibleRecipes, setVisibleRecipes] = useState(30);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const recipeId = searchParams.get("recipe");

    if (recipeId) {
      if (filteredRecipes?.length > 0) {
        const foundRecipe = filteredRecipes.find(
          (recipe) => recipe._id === recipeId
        );
        if (foundRecipe) {
          setSelectedRecipe(foundRecipe);
        } else {
          setSearchParams({});
        }
      }
    } else {
      setSelectedRecipe(null);
    }
  }, [filteredRecipes, searchParams, setSearchParams]);

  const closeModal = () => {
    setSearchParams({});
    setSelectedRecipe(null);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisibleRecipes((prevVisibleRecipes) => prevVisibleRecipes + 30);
    }, 300);
  };

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(savedRecipes);
  }, []);

  return (
    <div className={styles.browse}>
      {!categoryTerm && (
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
      )}

      <div className={styles.recipecontainer}>
        {filteredRecipes.length === 0 && (
          <h1 className={styles.norecipes}>No recipes found</h1>
        )}
        {filteredRecipes.slice(0, visibleRecipes).map((recipe) => (
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
        ))}{" "}
      </div>
      {visibleRecipes < filteredRecipes.length && (
        <button className={styles.loadmore} onClick={handleLoadMore}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
      {selectedRecipe && (
        <Modal
          onClose={closeModal}
          _id={selectedRecipe._id}
          src={selectedRecipe.imageUrl}
          title={selectedRecipe.title}
          description={selectedRecipe.description}
          category={selectedRecipe.category}
          author={selectedRecipe.author}
        />
      )}
    </div>
  );
};

Browse.propTypes = {
  filteredRecipes: PropTypes.array,
  setSearchTerm: PropTypes.func,
  searchTerm: PropTypes.string,
  categoryTerm: PropTypes.string,
};
export default Browse;
