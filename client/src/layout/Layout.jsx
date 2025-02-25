import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Loader from "../components/Loader/Loader";

const Layout = ({ setCategoryTerm }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={styles.layout}>
      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Sidebar sidebarOpen={sidebarOpen} setCategoryTerm={setCategoryTerm} />
    </div>
  );
};

export default Layout;
