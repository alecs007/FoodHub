import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./layout/Layout";
import Loader from "./components/Loader/Loader";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

const Home = lazy(() => import("./pages/Home/Home"));
const Browse = lazy(() => import("./pages/Browse/Browse"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [recipes, setRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categoryTerm, setCategoryTerm] = useState("");

  const getRandomRecipes = (allRecipes) => {
    if (allRecipes.length <= 10) return allRecipes;
    return allRecipes
      .map((recipe) => ({ recipe, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ recipe }) => recipe)
      .slice(0, 10);
  };
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/approved`);

      const shuffledRecipes = res.data
        .map((recipe) => ({ recipe, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ recipe }) => recipe);

      setRecipes(shuffledRecipes);
      setRandomRecipes(getRandomRecipes(shuffledRecipes));
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "" && categoryTerm.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, recipes]);

  useEffect(() => {
    if (categoryTerm.trim() === "" && searchTerm.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) =>
          recipe.category.toLowerCase().includes(categoryTerm.toLowerCase())
        )
      );
    }
  }, [categoryTerm, recipes]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            element={
              <Layout
                setCategoryTerm={setCategoryTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          >
            <Route
              path="/"
              element={
                <Home
                  randomRecipes={randomRecipes}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setCategoryTerm={setCategoryTerm}
                />
              }
            />
            <Route
              path="/browse"
              element={
                <Browse
                  filteredRecipes={filteredRecipes}
                  setSearchTerm={setSearchTerm}
                  searchTerm={searchTerm}
                  categoryTerm={categoryTerm}
                />
              }
            />
            <Route path="/favorites" element={<Favorites />} />
          </Route>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
