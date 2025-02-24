import styles from "./FoodCard.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "../Modal/Modal";
import arrow from "../../assets/right-arrow.png";

const FoodCard = ({ src, title, description, category, author }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.foodcard}>
      <img className={styles.cardimage} src={src} alt="" />
      <h1 className={styles.cardtitle}>{title}</h1>
      <p className={styles.carddescription}>{description}</p>
      <div className={styles.cardinfo}>
        <div className={styles.cardcategory}>{category}</div>
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
