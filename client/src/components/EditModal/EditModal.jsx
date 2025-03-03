import styles from "./EditModal.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import axios from "axios";

const EditModal = ({
  id,
  recipe,
  onClose,
  fetchRecipes,
  fetchPendingRecipes,
}) => {
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
  const [editedTitle, setEditedTitle] = useState(recipe.title);
  const [editedDescription, setEditedDescription] = useState(
    recipe.description
  );
  const [editedCategory, setEditedCategory] = useState(recipe.category);
  const [editedAuthor, setEditedAuthor] = useState(recipe.author);
  const [editedImage, setEditedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = async () => {
    try {
      if (editedTitle.length > 30) {
        alert("Food name should be less than 25 characters");
        return;
      }
      if (editedAuthor.length > 25) {
        alert("Author name should be less than 25 characters");
        return;
      }
      if (editedTitle.length <= 0) {
        alert("Food name is required");
        return;
      }
      if (editedDescription.length <= 0) {
        alert("Food description is required");
        return;
      }
      if (editedImage && editedImage.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 1MB");
        return;
      }
      if (editedCategory.length <= 0) {
        alert("Food category is required");
        return;
      }
      if (editedAuthor.trim() === "") {
        alert("Author name is required");
        return;
      }

      const formData = new FormData();
      formData.append("title", editedTitle);
      formData.append("description", editedDescription);
      formData.append("category", editedCategory);
      formData.append("author", editedAuthor);

      if (editedImage) {
        formData.append("image", editedImage);
      }

      const res = await axios.put(`http://localhost:8080/api/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Post updated:", res.data);
      alert("✅ Post updated!");

      if (recipe.status === "pending") {
        fetchPendingRecipes();
      } else {
        fetchRecipes();
      }
      onClose();
    } catch (err) {
      console.log("Failed to update post. Try again.", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.editmodal}>
      <div className={styles.editmodalcontent}>
        <div className={styles.editmodaltitle}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
        <div className={styles.editmodaldescription}>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.editmodalimg}>
          <img
            src={
              previewImage
                ? previewImage
                : `http://localhost:8080${recipe.imageUrl}`
            }
            alt="Image"
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            id="editfileInput"
            hidden
            className={styles.file_input}
          />
          <label htmlFor="editfileInput" className={styles.filelabel}>
            Add a photo
          </label>
        </div>
        <div className={styles.editmodalcategory}>
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
                checked={editedCategory === name}
                className={styles.radio}
                onChange={(e) => setEditedCategory(e.target.value)}
              />
              {name}
            </label>
          ))}
        </div>
        <div className={styles.editmodalauthor}>
          <input
            type="text"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
          />
        </div>
        <div className={styles.editmodalbuttons}>
          <button onClick={onClose} style={{ backgroundColor: "#e74c3c" }}>
            Cancel
          </button>
          <button style={{ backgroundColor: "#4d9cdd" }} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

EditModal.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditModal;
