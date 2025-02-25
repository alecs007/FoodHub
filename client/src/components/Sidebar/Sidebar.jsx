import styles from "./Sidebar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow_right from "../../assets/arrow-right.png";
import arrow_down from "../../assets/arrow-down.png";
import right_arrow from "../../assets/right-arrow.png";

const Sidebar = ({
  sidebarOpen,
  setCategoryTerm,
  setSidebarOpen,
  setSearchTerm,
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
  const [toggleMenu, setToggleMenu] = useState(false);

  const navigate = useNavigate();

  const handlePostClick = () => {
    setSidebarOpen(false);
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("post");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleHomeClick = () => {
    setSidebarOpen(false);
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("hero");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleCategoryClick = (category) => {
    setSidebarOpen(false);
    setCategoryTerm(category);
    navigate("/browse");
    setSearchTerm("");
  };

  return (
    <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
      <div className={styles.sidebarcontent}>
        <div className={styles.menucontainer}>
          <div
            className={`${styles.menu} ${toggleMenu ? styles.open : ""}`}
            onClick={() => setToggleMenu((prev) => !prev)}
          >
            <h2>Category</h2>
            <img src={toggleMenu ? arrow_down : arrow_right} alt="arrow" />
          </div>
          {toggleMenu && (
            <div className={styles.submenu}>
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={styles.category}
                  style={{ backgroundColor: category.color }}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.menu} onClick={handleHomeClick}>
          <h2>Home</h2>
          <img src={right_arrow} alt="arrow" />
        </div>
        <div className={styles.menu} onClick={handlePostClick}>
          <h2>Post recipe</h2>
          <img src={right_arrow} alt="arrow" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
