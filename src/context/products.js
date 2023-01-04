import React, { useCallback, useMemo, useState } from 'react';
import * as PropTypes from 'prop-types';

// IMPORTANT: this is mostly viable in smaller apps
// and low-frequency state updates (log in/ log out, switching themes).
// In other cases USE REDUX.
// p.s. By the way toggling "Favorites" is possibly a more frequent state update
// hence maybe it is not a good idea to use Context API for it.

// TO SWITCH FROM REDUX TO CONTEXT API we need to take several STEPS:

// STEP 1:
// define initial data (if there is any)
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'Red Scarf',
    description: 'A pretty red scarf.',
    isFavorite: false,
  },
  {
    id: 'p2',
    title: 'Blue T-Shirt',
    description: 'A pretty blue t-shirt.',
    isFavorite: false,
  },
  {
    id: 'p3',
    title: 'Green Trousers',
    description: 'A pair of lightly green trousers.',
    isFavorite: false,
  },
  {
    id: 'p4',
    title: 'Orange Hat',
    description: 'Street style! An orange hat.',
    isFavorite: false,
  },
];

// STEP-2:
// create context that should reflect HOW our "pseudo-store" should look like
const ProductsContext = React.createContext({
  // here we have data
  products: [],
  // and a way of manipulating it (with no specific implementation as we don't need it here)
  toggleFavorite: () => {},
});

// STEP-3:
// define a React component which will provide context all over the app:
// - it should receive "children" to properly function as a wrapper
export function ProductsContextProvider({ children }) {
  // - it should have state which is needed to update "products"(move to/remove from "favorites")
  // and in turn pass updated products to children
  const [productsList, setProductsList] = useState(DUMMY_PRODUCTS);

  // STEP-4:
  // define a specific implementation of data changing methods:
  const toggleFavorite = useCallback(
    (productId) => {
      const index = productsList.findIndex(({ id }) => id === productId);
      const updatedProduct = {
        ...productsList[index],
        isFavorite: !productsList[index].isFavorite,
      };

      setProductsList((prevProductsList) => [
        ...prevProductsList.slice(0, index),
        updatedProduct,
        ...prevProductsList.slice(index + 1),
      ]);
    },
    [productsList],
  );

  // STEP-5:
  // define a concrete object with data and methods
  // that match what we had when we created context at STEP-2
  const products = useMemo(
    () => ({
      products: productsList,
      toggleFavorite,
    }),
    [productsList, toggleFavorite],
  );

  return (
    // STEP-6:
    // pass object created at STEP-5 via "value" prop to children
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}

// STEP-7:
// remove all Redux-specific tools from the code (useSelector, useDispatch)

// STEP-8
// use "useContext" hook to get access to data and methods in components that need it

ProductsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsContext;
