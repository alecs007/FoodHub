import styles from "./FoodCard.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "../Modal/Modal";
import arrow from "../../assets/right-arrow.png";

const FoodCard = ({ src, title, description, category, author }) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className={styles.foodcard}>
      <img
        className={styles.cardimage}
        src={`http://localhost:8080${src}`}
        alt={title}
      />
      <h1 className={styles.cardtitle}>{title}</h1>
      <p className={styles.carddescription}>{description}</p>
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
      <button className={styles.cardbutton} onClick={() => setIsOpen(true)}>
        More info
        <img src={arrow} alt="Arrow" />
      </button>
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          src={src}
          title={title}
          description={description}
          category={category}
          author={author}
        />
      )}
    </div>
  );
};

FoodCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default FoodCard;
