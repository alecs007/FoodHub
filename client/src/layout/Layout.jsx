import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
