import styles from "./Home.module.css";
import Hero from "./Hero/Hero";
import Post from "./Post/Post";
import PropTypes from "prop-types";

const Home = ({
  randomRecipes,
  searchTerm,
  setSearchTerm,
  setCategoryTerm,
}) => {
  return (
    <div className={styles.home}>
      <Hero
        randomRecipes={randomRecipes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCategoryTerm={setCategoryTerm}
      />
      <Post />
    </div>
  );
};

Home.propTypes = {
  randomRecipes: PropTypes.array,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  setCategoryTerm: PropTypes.func,
};

export default Home;
