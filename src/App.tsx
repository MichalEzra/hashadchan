import { useEffect } from 'react';
import Router from './routes/Router';
import { useAppDispatch } from './redux/store';
import { setUser } from './redux/auth/auth.slice';
import { getUserFromToken, mapJwtClaims } from './auth/auth.utils';
import MatchPage from './components/matches/MatchPage';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const rawUser = getUserFromToken();
    if (rawUser) {
      const user = mapJwtClaims(rawUser);
      dispatch(setUser(user));
    }
  }
}, []);



    return <>
      <Router /> 
       {/* זה עוטף את כל הניווט */}
      <MatchPage />
    </>
    // <Provider store={store}>
      {/* user ? <HomePage /> : <LoginPage />; */}
      {/* <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter> */}
    {/* <CandidateManagementPage/> */}
    {/* </Provider> */}
    

}

export default App;
