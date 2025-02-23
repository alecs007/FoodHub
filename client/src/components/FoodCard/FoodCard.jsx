import styles from "./FoodCard.module.css";
import image from "../../assets/pizza.jpg";
import arrow from "../../assets/right-arrow.png";

const FoodCard = () => {
  return (
    <div className={styles.foodcard}>
      <img className={styles.cardimage} src={image} alt="" />
      <h1 className={styles.cardtitle}>Lasagna bolognese</h1>
      <p className={styles.carddescription}>
        Pissa este un termen latin, apărut în secolul IX, care înseamnă „pâine
        plată”. Începând cu secolul XIV a căpătat sensul de „pâine plată
        acoperită cu brânză” în limba italiană. Un om care se pricepe la
        prepararea pizzei se numește pizzaiolo, iar un restaurant care servește
        pizza se numește „pizzerie” (în italiană pizzeria). De la multe pizzerii
        se poate comanda și la domiciliu, prin telefon sau internet. Pizza se
        găsește, de asemenea, în supermarket-uri, sub formă congel
      </p>
      <div className={styles.cardinfo}>
        <div className={styles.cardcategory}>Vegetarian</div>
        <div className={styles.cardauthor}>By: Anonymus</div>
      </div>
      <button className={styles.cardbutton}>
        More info
        <img src={arrow} alt="Arrow" />
      </button>
    </div>
  );
};

export default FoodCard;
