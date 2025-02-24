import styles from "./Browse.module.css";
import PropTypes from "prop-types";
import FoodCard from "../../components/FoodCard/FoodCard";

const Browse = ({ recipes }) => {
  return (
    <div className={styles.browse}>
      <div className={styles.recipecontainer}>
        {recipes.map((recipe) => (
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
  );
};

Browse.propTypes = {
  recipes: PropTypes.array,
};
export default Browse;
