import { useEffect } from 'react';
import Router from './routes/Router';
import { useAppDispatch, useAppSelector } from './redux/store';
import { loadUserFromToken, setUser } from './redux/auth/auth.slice';
import { getUserFromToken } from './auth/auth.utils';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    // למשל, לקרוא לפעולה שמעדכנת את ה־Redux עם פרטי המשתמש
    dispatch(loadUserFromToken(token));
  }
}, [dispatch]);



    return <>
      <Router /> 
       {/* זה עוטף את כל הניווט */}
      {/* <MatchPage /> */}
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
