import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
// import { ProductsContextProvider } from './context/products';
import configureStore from './store-with-hooks/productsSlice';

// STEP-13:
// import and call "configureStore" to initialize store
// p.s. don't forget to remove/comment out all the Redux/Context stuff
configureStore();

ReactDOM.render(
  // <ProductsContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </ProductsContextProvider>,
  document.getElementById('root'),
);
