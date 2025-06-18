import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, useAppSelector } from './redux/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// const { user } = useAppSelector((state) => state.auth);
// console.log("Redux user:", user);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
</Provider>

  </React.StrictMode>
);


