import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { store } from './store'
import { Provider } from 'react-redux'

//Styles
import './scss/_core.scss';

//Pages
import { ComprarTicket, Home } from './pages';

//Components
import { NavigationBar } from './components';

//Vars
import { nav } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <NavigationBar logo={nav.logo} menu={nav.menu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comprar-ticket" element={<ComprarTicket />} />
          {/* <Route path='*' element={<ErrorPage error="404" message="Not Found" />} /> */}
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
