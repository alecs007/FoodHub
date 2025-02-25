import styles from "./Browse.module.css";
import PropTypes from "prop-types";
import FoodCard from "../../components/FoodCard/FoodCard";

const Browse = ({ filteredRecipes }) => {
  return (
    <div className={styles.browse}>
      <div className={styles.recipecontainer}>
        {filteredRecipes.length === 0 && (
          <h1 className={styles.norecipes}>No recipes found</h1>
        )}
        {filteredRecipes.map((recipe) => (
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
  filteredRecipes: PropTypes.array,
};
export default Browse;
