import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from "./Contexts/authContext"
import "bootstrap/dist/css/bootstrap.min.css";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
      <Routes>
        <Route path = "/*" element = {<App/>} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

