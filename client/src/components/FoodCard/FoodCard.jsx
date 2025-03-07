import styles from "./FoodCard.module.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import arrow from "../../assets/right-arrow.png";
import save from "../../assets/save.png";
import saved from "../../assets/saved.png";

const FoodCard = ({
  _id,
  src,
  title,
  description,
  category,
  author,
  setSavedRecipes,
}) => {
  const categories = [
    { name: "Breakfast", color: "#FFC300" },
    { name: "Lunch", color: "#E63946" },
    { name: "Dinner", color: "#6A5ACD" },
    { name: "Dessert", color: "#ffb4a2" },
    { name: "Vegetarian", color: "#065511" },
    { name: "High Protein", color: "#B22222" },
    { name: "Gluten-free", color: "#90BE6D" },
    { name: "Low carb", color: "#A67C52" },
    { name: "Kids' favourites", color: "#FFA500" },
    { name: "Quick meal", color: "#0077B6" },
  ];

  const [isSaved, setIsSaved] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setIsSaved(savedRecipes.some((recipe) => recipe._id === _id));
  }, [_id]);

  const handleSave = () => {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    if (isSaved) {
      savedRecipes = savedRecipes.filter((recipe) => recipe._id !== _id);
    } else {
      const newRecipe = { _id, title, src, description, category, author };
      savedRecipes.push(newRecipe);
    }

    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    setIsSaved(!isSaved);

    if (setSavedRecipes) {
      setSavedRecipes(savedRecipes);
    }
  };

  const handleOpen = () => {
    setSearchParams({ recipe: _id });
  };

  return (
    <div className={styles.foodcard}>
      <img
        src={isSaved ? saved : save}
        alt="Save"
        className={`${styles.save} ${isSaved && styles.saved}`}
        onClick={handleSave}
      />
      <img
        className={styles.cardimage}
        src={`http://localhost:8080${src}`}
        alt={title}
      />
      <h1 className={styles.cardtitle}>{title}</h1>
      <p className={styles.carddescription}>
        {description.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <div className={styles.cardinfo}>
        <div
          className={styles.cardcategory}
          style={{
            backgroundColor: categories.find((c) => c.name === category).color,
          }}
        >
          {category}
        </div>
        <div className={styles.cardauthor}>By: {author}</div>
      </div>
      <button className={styles.cardbutton} onClick={handleOpen}>
        More info
        <img src={arrow} alt="Arrow" />
      </button>
    </div>
  );
};

FoodCard.propTypes = {
  _id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  setSavedRecipes: PropTypes.func,
};

export default FoodCard;
