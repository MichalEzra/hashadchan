import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import Router from './routes/Router';
import AddCandidate from './components/candidate/CandidateForm';
import { store } from './api/store';
import { RouterProvider } from 'react-router';
import Navbar from './components/navbar/Navbar';
import AppRouter from './routes/Router';
import { useAppDispatch, useAppSelector } from './redux/store';
import { getSession, isValidToken } from './auth/auth.utils';
import { setUser } from './redux/auth/auth.slice';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  // const dispatch = useAppDispatch();
  // const user = useAppSelector(state => state.auth.user);

  // useEffect(() => {
  //   const session = getSession();
  //   if (session && isValidToken(session.token)) {
  //     dispatch(setUser(session));
  //   }
  // }, [dispatch]);

    return (
    <Provider store={store}>
      <Router />  {/* זה עוטף את כל הניווט */}
      {/* user ? <HomePage /> : <LoginPage />; */}
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
