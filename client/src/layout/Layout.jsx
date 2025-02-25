import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";

const Layout = ({ setCategoryTerm, setSearchTerm }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={styles.layout}>
      <Header
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        setSearchTerm={setSearchTerm}
      />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setCategoryTerm={setCategoryTerm}
      />
    </div>
  );
};

export default Layout;
