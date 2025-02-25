import styles from "./Home.module.css";
import Hero from "./Hero/Hero";
import Post from "./Post/Post";

const Home = ({ randomRecipes }) => {
  return (
    <div className={styles.home}>
      <Hero randomRecipes={randomRecipes} />
      <Post />
    </div>
  );
};

export default Home;
