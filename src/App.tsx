import React from 'react';
import { Provider } from "react-redux";
import Router from './routes/Router';
import AddCandidate from './components/candidate/CandidateForm';

function App() {
  return <div>
      <h1>מערכת שידוכים</h1>
      <AddCandidate />
    </div>;
}

export default App;
