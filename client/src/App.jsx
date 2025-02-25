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

function App() {
  const [recipes, setRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

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
      const res = await axios.get("http://localhost:8080/api/approved");
      setRecipes(res.data);
      setRandomRecipes(getRandomRecipes(res.data));
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, recipes]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Home
                  randomRecipes={randomRecipes}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              }
            />
            <Route
              path="/browse"
              element={<Browse filteredRecipes={filteredRecipes} />}
            />
          </Route>
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
