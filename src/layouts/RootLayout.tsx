import React, { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { useAppSelector } from "../redux/store";
import SideNav from "../components/navbar/SideNav";
import styles from './RootLayout.module.css';

const RootLayout: React.FC = () => {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const hideSideNavRoutes = ["/", "/home"]; // כל עמוד שבו את לא רוצה את ה־SideNav
  const showSideNav = !!user && !hideSideNavRoutes.includes(location.pathname);


  return (
    <div className={`${styles.rootLayout} ${showSideNav ? styles.withSideNav : styles.withoutSideNav}`}>
      {showSideNav && (
        <div className={styles.sideNav}>
          <SideNav onClose={() => { }} />
        </div>
      )}

      <div className={styles.contentArea}>
        <Navbar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
