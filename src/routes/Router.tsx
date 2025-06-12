import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";

import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { DaatTorahPage } from "../pages/DaatTorahPage";
import { EngagedPage } from "../pages/EngagedPage";
import { HereToServeYouPage } from "../pages/HereToServeYouPage";
import { UserGuidePage } from "../pages/UserGuidePage";
import LoginPage from "../pages/LoginPage";
import Signup from "../pages/SignupPage";
import CandidatesPage from "../pages/admin/CandidatesPage"

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/users", element: <UserPage /> },
      { path: "/daattorah", element: <DaatTorahPage /> },
      { path: "/engaged", element: <EngagedPage /> },
      { path: "/heretoserve", element: <HereToServeYouPage /> },
      { path: "/guide", element: <UserGuidePage /> },
      { path: "/login", element: <LoginPage /> },
      {path: "/signup", element: <Signup/>},
      {path: "/home", element: <HomePage/>},
      {path: "/adminCandidates", element: <CandidatesPage />},
      {path: "/adminMatchmakers", element: <MatchmakersPage/>},
      {path: "/adminParents", element: <ParentsPage/>}
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
