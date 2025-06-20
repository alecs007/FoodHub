import styles from "./Hero.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FoodCard from "../../../components/FoodCard/FoodCard";
import Modal from "../../../components/Modal/Modal";
import search from "../../../assets/search.png";
import best_chefs from "../../../assets/best_chefs.webp";

const Hero = ({
  randomRecipes,
  searchTerm,
  setSearchTerm,
  setCategoryTerm,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const recipeId = searchParams.get("recipe");
    if (recipeId && randomRecipes?.length > 0) {
      const foundRecipe = randomRecipes.find(
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
  }, [randomRecipes, searchParams, setSearchParams]);

  const closeModal = () => {
    setSearchParams({});
    setSelectedRecipe(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(heroSearchTerm);
      navigate("/browse");
    }
  };

  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(savedRecipes);
    setSearchTerm("");
    setCategoryTerm("");
  }, []);

  const [heroSearchTerm, setHeroSearchTerm] = useState(searchTerm);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.title}>
        DISCOVER<span>.</span>COOK<span>.</span>ENJOY<span>!</span>
      </div>
      <div className={styles.subtitle}>
        <img src={best_chefs} alt="With the best chefs image" />
      </div>
      <div className={styles.inputcontainer}>
        <input
          className={styles.search}
          type="text"
          value={heroSearchTerm}
          onChange={(e) => setHeroSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for food recipes..."
        />
        <div
          className={styles.searchicon}
          onClick={() => {
            setSearchTerm(heroSearchTerm);
            navigate("/browse");
          }}
        >
          <img src={search} alt="search" />
        </div>
      </div>
      <div className={styles.description}>
        <span className={styles.name}>
          Food<span style={{ color: "var(--color-2)" }}>Hub </span>
        </span>
        provides endless cooking recipes for you to take your culinary skills to
        next level! Go ahead and look for your favorite recipes:
      </div>
      <Link to="/browse">
        <button
          className={styles.button}
          onClick={() => {
            setSearchTerm("");
            setCategoryTerm("");
          }}
        >
          Explore recipes
          <div className={styles.icon}>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </Link>
      <div className={styles.slider}>
        {randomRecipes ? (
          <div className={styles.cards}>
            {[...randomRecipes, ...randomRecipes].map((recipe, index) => (
              <FoodCard
                key={`${recipe._id}-${index}`}
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
        ) : (
          <div className={styles.spinner}></div>
        )}
      </div>
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
    </section>
  );
};

Hero.propTypes = {
  randomRecipes: PropTypes.array,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  setCategoryTerm: PropTypes.func,
};
export default Hero;
