import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { ProductsContextProvider } from './context/products';

ReactDOM.render(
  <ProductsContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductsContextProvider>,
  document.getElementById('root'),
);
