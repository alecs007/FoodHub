import styles from "./Post.module.css";
import { useState } from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";
import axios from "axios";
import no_image from "../../../assets/no_image.jpg";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const [fileName, setFileName] = useState("No photo chosen");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "No photo chosen");
    console.log(file);
    setImageFile(file);
  };

  const handleSubmit = async () => {
    try {
      if (title.length <= 0) {
        setErrorMessage("Food name is required");
        return;
      }
      if (description.length <= 0) {
        setErrorMessage("Food description is required");
        return;
      }
      if (!imageFile) {
        setErrorMessage("Food image is required");
        return;
      }
      if (imageFile.size > 1000 * 1024 * 1024) {
        setErrorMessage("Image size should be less than 1000MB");
        return;
      }
      if (category.length <= 0) {
        setErrorMessage("Food category is required");
        return;
      }
      if (author.length <= 0) {
        setAuthor("Anonymous");
      }
      setErrorMessage("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", imageFile);
      formData.append("category", category);
      formData.append("author", author || "Anonymous");

      const res = await axios.post("http://localhost:8080/api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTitle("");
      setDescription("");
      setImageFile(null);
      setCategory("");
      setAuthor("");
      setFileName("No photo chosen");
      document.querySelector('input[type="file"]').value = "";
      alert("Post submited");
    } catch (err) {
      console.log("Failed to submit  post", err);
      setErrorMessage("Failed to submit post");
    }
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
            <input
              type="text"
              placeholder="Enter food name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.descriptioninput}>
            <h2>
              Description <span className={styles.red}>*</span>
            </h2>
            <textarea
              placeholder="Enter food description (ingredients, preparation, nutriments etc)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.photoinput}>
            <input
              type="file"
              accept="image/*"
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
                    checked={category === name}
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
            <input
              type="text"
              placeholder="Anonymus"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.previewcontainer}>
        <div className={styles.preview}>
          <h2>PREVIEW</h2>

          <div className={styles.foodcard}>
            <img
              className={styles.cardimage}
              src={imageFile ? URL.createObjectURL(imageFile) : no_image}
              alt={title}
            />
            <h1 className={styles.cardtitle}>{title}</h1>
            <p className={styles.carddescription}>{description}</p>
            <div className={styles.cardinfo}>
              {category && (
                <div
                  className={styles.cardcategory}
                  style={{
                    backgroundColor: categories.find((c) => c.name === category)
                      .color,
                  }}
                >
                  {category}
                </div>
              )}
              {author && <div className={styles.cardauthor}>By: {author}</div>}
            </div>
          </div>
          <div className={styles.buttoncontainer}>
            <button className={styles.button} onClick={() => handleSubmit()}>
              POST !
            </button>
            <div className={styles.status}>{errorMessage}</div>
          </div>

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
