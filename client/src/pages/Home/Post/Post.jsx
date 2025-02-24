import styles from "./Post.module.css";
import { useState } from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";
import image from "../../../assets/pizza.jpg";

const Post = () => {
  const categories = [
    { name: "Breakfast", color: "#FFC300" },
    { name: "Lunch", color: "#E63946" },
    { name: "Dinner", color: "#6A5ACD" },
    { name: "Dessert", color: "#ffb4a2" },
    { name: "Vegetarian", color: "#065511" },
    { name: "High Protein", color: "#B22222" },
    { name: "Gluten-free", color: "#90BE6D" },
    { name: "Low carb", color: "#A67C52" },
    { name: "Kids' favourites", color: "#FFA500" },
    { name: "Quick meal", color: "#0077B6" },
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const [fileName, setFileName] = useState("No photo chosen");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "No photo chosen");
  };

  return (
    <section className={styles.post}>
      <div className={styles.title}>
        POST YOUR BEST RECIPES<span>!</span>
      </div>
      <div className={styles.formcontainer}>
        <div className={styles.form}>
          <div className={styles.nameinput}>
            <h2>
              Food name <span className={styles.red}>*</span>
            </h2>
            <input type="text" placeholder="Enter food name" />
          </div>
          <div className={styles.descriptioninput}>
            <h2>
              Description <span className={styles.red}>*</span>
            </h2>
            <textarea placeholder="Enter food description (ingredients, preparation, nutriments etc)" />
          </div>
          <div className={styles.photoinput}>
            <input
              type="file"
              id="fileInput"
              hidden
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className={styles.filelabel}>
              Add a photo
            </label>
            <span className={styles.filename}>{fileName}</span>
          </div>
          <div className={styles.categoryinput}>
            <h2>
              Choose category <span className={styles.red}>*</span>
            </h2>
            <div className={styles.categories}>
              {categories.map(({ name, color }) => (
                <label
                  key={name}
                  className={styles.category}
                  style={{
                    backgroundColor: color,
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    value={name}
                    checked={selectedCategory === name}
                    onChange={() => handleCategoryChange(name)}
                    className={styles.radio}
                  />
                  {name}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.usernameinput}>
            <h2>Your name</h2>
            <input type="text" placeholder="Anonymus" />
          </div>
        </div>
      </div>
      <div className={styles.previewcontainer}>
        <div className={styles.preview}>
          <h2>PREVIEW</h2>
          <FoodCard
            src={image}
            title="pizza"
            description="description"
            category="Vegetarian"
            author="EU"
          />
          <button className={styles.button}> POST !</button>
          <h3>
            <span className={styles.red}>DISCLAIMER</span> Any information that
            is irrelevant to food domain will not be accepted. Before posting,
            consider to check if the details of your recipe are clear and
            precise.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Post;
