import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.title}>
        DISCOVER<span>.</span>COOK<span>.</span>ENJOY<span>!</span>
      </div>
    </section>
  );
};

export default Hero;
