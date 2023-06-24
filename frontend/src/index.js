import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';
import { VerifyContextProvider } from './contexts/verify-context';
import { SearchContextProvider } from './contexts/search-context';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <VerifyContextProvider>
      <SearchContextProvider>

          <Routes>
            <Route path = "/*" element = {<App/>} />
          </Routes>

      </SearchContextProvider>
    </VerifyContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
