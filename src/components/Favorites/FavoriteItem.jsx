import React from 'react';
import * as PropTypes from 'prop-types';

import Card from '../UI/Card';
import './FavoriteItem.css';

function FavoriteItem({ title, description }) {
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="favorite-item">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Card>
  );
}

FavoriteItem.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FavoriteItem;
