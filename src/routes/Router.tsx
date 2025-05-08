import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { DaatTorahPage } from "../pages/DaatTorahPage";
import { EngagedPage } from "../pages/EngagedPage";
import { HereToServeYouPage } from "../pages/HereToServeYouPage";
import { HomePage } from "../pages/HomePage";
import { UserGuidePage } from "../pages/UserGuidePage";
import  UserPage  from "../pages/UserPage"; // דף חדש שלך


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/users",
    element: <UserPage />,
  },
  {
    path: "/daattorah",
    element: <DaatTorahPage />,
  },
  {
    path: "/engaged",
    element: <EngagedPage />,
  },
  {
    path: "/heretoserve",
    element: <HereToServeYouPage />,
  },
  {
    path: "/guide",
    element: <UserGuidePage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
