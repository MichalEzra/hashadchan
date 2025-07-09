import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { DaatTorahPage } from "../pages/DaatTorahPage";
// import EngagedPage from "../pages/EngagedPage";
import { HereToServeYouPage } from "../pages/HereToServeYouPage";
import { UserGuidePage } from "../pages/UserGuidePage";
import CandidatesPage from "../pages/admin/CandidateManagementPage"
import CandidateForm from "../components/forms/CandidateForm";
import MatchmakerManagementPage from "../pages/admin/MatchmakerManagementPage";
import CandidateManagementPage from "../pages/admin/CandidateManagementPage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import MatchPage from "../components/matches/MatchPage";
// import CandidateForm from "../components/candidate/CandidateForm";
import AlgorithmMatchingPage from "../components/matches/AlgorithmMatchingPage";//✅ ייבוא לדף הצעות שידוכים
import EngagedPage from "../pages/EngagedPage";
import SuggestionsPage from "../pages/SuggestionsPage";
import MatchmakerForm from "../components/forms/MatchmakerForm";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/daattorah", element: <DaatTorahPage /> },
      { path: "/engaged", element: <EngagedPage /> },
      { path: "/hereToServeYou", element: <HereToServeYouPage /> },
      { path: "/userGuide", element: <UserGuidePage /> },
      // { path: "/login", element: <LoginPage /> },
      // { path: "/signup", element: <Signup /> },
      { path: "/home", element: <HomePage /> },
      { path: "/candidates/edit/:id", element: <CandidateForm /> },
      // { path: "/candidates/new", element: <CandidateForm /> },     
      //עמודי ניהול 
      { path: "/candidates", element: <CandidateManagementPage /> },
      { path: "/matchmakers", element: <MatchmakerManagementPage /> },
      { path: "/users", element: <UserManagementPage /> },
      { path: "/match", element: <MatchPage /> },
      { path: "/candidates/new", element: <CandidateForm /> },
      { path: "/matchmaker/new", element: <MatchmakerForm /> },

      { path: "/algorithm-match", element: <AlgorithmMatchingPage /> }, // לדף הצעות שידוכים מהאלגוריתם
      { path: "/suggestions", element: <SuggestionsPage /> }
    ],
  },
]);


const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
