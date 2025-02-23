import styles from "./Home.module.css";
import Hero from "./Hero/Hero";

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
    </div>
  );
};

export default Home;
