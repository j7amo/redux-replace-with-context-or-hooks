import { initStore } from './store';

// STEP-9:
// declare initial state
const initialState = {
  products: [
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
  ],
};

// STEP-10:
// declare actions available for working with this store
const actions = {
  TOGGLE_FAV: (state, productId) => {
    const prodIndex = state.products.findIndex((p) => p.id === productId);
    const newFavStatus = !state.products[prodIndex].isFavorite;
    const updatedProducts = [...state.products];
    updatedProducts[prodIndex] = {
      ...state.products[prodIndex],
      isFavorite: newFavStatus,
    };

    return {
      products: updatedProducts,
      // we don't need to do the merging of OLD and NEW states here
      // because we do it later in the store.js
    };
  },
};

// STEP-11:
// define a function that we will call in the entry point (index.js) of the app
const configureStore = () => initStore(actions, initialState);

// STEP-12:
// proceed to "index.js"
export default configureStore;
