import React from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';

import Card from '../UI/Card';
import './ProductItem.css';
import { toggleFav } from '../../store/actions/products';

function ProductItem({
  id, description, title, isFav,
}) {
  const dispatch = useDispatch();

  const toggleFavHandler = () => {
    dispatch(toggleFav(id));
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
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isFav: PropTypes.bool.isRequired,
};
export default ProductItem;
