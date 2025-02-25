import styles from "./Hero.module.css";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { Link, useNavigate } from "react-router-dom";

const Hero = ({ randomRecipes, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/browse");
    }
  };
  return (
    <section className={styles.hero}>
      <div className={styles.title}>
        DISCOVER<span>.</span>COOK<span>.</span>ENJOY<span>!</span>
      </div>
      <input
        className={styles.search}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for food recipes..."
      />
      <div className={styles.description}>
        <span className={styles.name}>FoodHub</span> provides endless cooking
        recipes for you to take your culinary skills to next level! Go ahead and
        look for your favorite recipes:
      </div>
      <Link to="/browse">
        <button
          className={styles.button}
          onClick={() => {
            setSearchTerm("");
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
        <div className={styles.cards}>
          {randomRecipes &&
            randomRecipes.map((recipe) => (
              <FoodCard
                key={recipe._id}
                src={recipe.imageUrl}
                title={recipe.title}
                description={recipe.description}
                category={recipe.category}
                author={recipe.author}
              />
            ))}
          {randomRecipes &&
            randomRecipes.map((recipe) => (
              <FoodCard
                key={recipe._id}
                src={recipe.imageUrl}
                title={recipe.title}
                description={recipe.description}
                category={recipe.category}
                author={recipe.author}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
