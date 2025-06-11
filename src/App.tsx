import React from 'react';
import { Provider } from "react-redux";
import Router from './routes/Router';
import AddCandidate from './components/candidate/CandidateForm';
import { store } from './api/store';
import { RouterProvider } from 'react-router';
import Navbar from './components/navbar/Navbar';
import AppRouter from './routes/Router';

function App() {
    return (
    <Provider store={store}>
      <Router />  {/* זה עוטף את כל הניווט */}
      {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter> */}
    </Provider>
    )

}

export default App;
