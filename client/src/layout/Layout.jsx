import styles from "./Layout.module.css";
import Outlet from "react-router-dom";
import Header from "../components/Header/Header";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
