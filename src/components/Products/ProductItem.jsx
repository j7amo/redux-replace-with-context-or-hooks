import React from 'react';
import * as PropTypes from 'prop-types';

import Card from '../UI/Card';
import './ProductItem.css';
import useStore from '../../store-with-hooks/store';
import { TOGGLE_FAV } from '../../store/actions/products';

function ProductItem({
  id, description, title, isFav,
}) {
  // const { toggleFavorite } = useContext(ProductsContext);
  const [, dispatch] = useStore(false);

  const toggleFavHandler = () => {
    dispatch({
      type: TOGGLE_FAV,
      payload: id,
    });
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={isFav ? 'is-fav' : ''}>{title}</h2>
        <p>{description}</p>
        <button
          className={!isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
          type="button"
        >
          {isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
}

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isFav: PropTypes.bool.isRequired,
};
export default React.memo(ProductItem);
