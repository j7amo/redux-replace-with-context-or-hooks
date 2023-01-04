import React from 'react';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';
import useStore from '../store-with-hooks/store';

function Products() {
  // const { products } = useContext(ProductsContext);
  const [state] = useStore();
  const { products } = state;

  return (
    <ul className="products-list">
      {products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
}

export default Products;
