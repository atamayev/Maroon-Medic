import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { UUIDContextProvider } from './Wraps/UUIDContext';
import { VerifyContextProvider } from './Wraps/VerifyContext';
import { SearchContextProvider } from './Wraps/SearchContext';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <UUIDContextProvider>
      <VerifyContextProvider>
        <SearchContextProvider>

            <Routes>
              <Route path = "/*" element = {<App/>} />
            </Routes>

        </SearchContextProvider>
      </VerifyContextProvider>
    </UUIDContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

