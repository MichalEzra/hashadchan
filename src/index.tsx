import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, useAppSelector } from './redux/store';
import { BrowserRouter } from 'react-router';
import ErrorBoundary from './pages/ErrorBoundary';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// const { user } = useAppSelector((state) => state.auth);
// console.log("Redux user:", user);
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <ErrorBoundary>
    <Provider store={store}>
    <App />
</Provider>
</ErrorBoundary>
    {/* </BrowserRouter> */}

  </React.StrictMode>
);


