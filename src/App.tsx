import React from 'react';
import { Provider } from "react-redux";
import Router from './routes/Router';
import AddCandidate from './components/candidate/CandidateForm';
import { store } from './api/store';
import { RouterProvider } from 'react-router';
import Navbar from './components/navbar/Navbar';

function App() {
    return (
<>
      <Navbar />
      {/* שאר הנתיבים וה־Routes שלך */}
    </>
    )

}

export default App;
