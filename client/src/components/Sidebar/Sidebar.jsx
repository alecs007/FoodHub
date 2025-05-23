import styles from "./Sidebar.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import arrow_right from "../../assets/arrow-right.png";
import arrow_down from "../../assets/arrow-down.png";
import right_arrow from "../../assets/right-arrow.png";
import saved from "../../assets/saved.png";
import explore from "../../assets/explore.png";

const Sidebar = ({
  sidebarOpen,
  setCategoryTerm,
  setSidebarOpen,
  setSearchTerm,
  toggleButtonRef,
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
      requestAnimationFrame(() => {
        const section = document.getElementById("post");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    }, 500);
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
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
    setSearchTerm("");
  };

  const handleFavoritesClick = () => {
    setSidebarOpen(false);
    navigate("/favorites");
  };

  const handleExploreClick = () => {
    setSidebarOpen(false);
    setCategoryTerm("");
    navigate("/browse");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (!sidebarOpen) setToggleMenu(false);
  }, [sidebarOpen]);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
        setToggleMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSidebarOpen, toggleButtonRef]);

  return (
    <div
      className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}
      ref={sidebarRef}
    >
      <div className={styles.sidebarcontent}>
        <div className={styles.menucontainer}>
          <div
            className={`${styles.menu} ${toggleMenu ? styles.open : ""}`}
            onClick={() => setToggleMenu((prev) => !prev)}
          >
            <h2>Categories</h2>
            <img
              src={toggleMenu ? arrow_down : arrow_right}
              alt="arrow"
              className={styles.image}
            />
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
        <div className={styles.menu} onClick={handleFavoritesClick}>
          <h2>Favorites</h2>
          <img src={saved} alt="save" className={styles.imagestar} />
        </div>
        <div className={styles.menu} onClick={handleHomeClick}>
          <h2>Home</h2>
          <img src={right_arrow} alt="arrow" className={styles.image} />
        </div>
        <div className={styles.menu} onClick={handlePostClick}>
          <h2>Post recipe</h2>
          <img src={right_arrow} alt="arrow" className={styles.image} />
        </div>
        <div className={styles.menu} onClick={handleExploreClick}>
          <h2>Explore</h2>
          <img src={explore} alt="explore" className={styles.imagestar} />
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setCategoryTerm: PropTypes.func.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  toggleButtonRef: PropTypes.object.isRequired,
};

export default Sidebar;
