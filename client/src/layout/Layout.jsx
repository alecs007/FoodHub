import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Scroll from "../components/Scroll/Scroll";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";

const Layout = ({ setCategoryTerm, setSearchTerm }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleButtonRef = useRef(null);

  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0 });
    setTimeout(() => {
      setLoading(false);
    }, 170);
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <Header
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        setSearchTerm={setSearchTerm}
        toggleButtonRef={toggleButtonRef}
      />
      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      )}
      <Footer />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setCategoryTerm={setCategoryTerm}
        toggleButtonRef={toggleButtonRef}
      />
      <Scroll />
    </div>
  );
};

Layout.propTypes = {
  setCategoryTerm: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
export default Layout;
