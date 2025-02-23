import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.title}>
        DISCOVER<span>.</span>COOK<span>.</span>ENJOY<span>!</span>
      </div>
      <input
        className={styles.search}
        type="text"
        placeholder="Search for food recipes.."
      />
    </section>
  );
};

export default Hero;
