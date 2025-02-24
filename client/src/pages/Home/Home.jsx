import styles from "./Home.module.css";
import Hero from "./Hero/Hero";
import Post from "./Post/Post";

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <Post />
    </div>
  );
};

export default Home;
