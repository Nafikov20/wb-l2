import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import {App} from "./app";

import '../public/styles/mocks/index.css';



ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
);
