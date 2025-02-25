import styles from "./Home.module.css";
import Hero from "./Hero/Hero";
import Post from "./Post/Post";

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

export default Home;
