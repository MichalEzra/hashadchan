import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const RootLayout: FC = () => {
  return (
    <>
      <Navbar />
        <main >
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
