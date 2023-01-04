import React from 'react';
import * as PropTypes from 'prop-types';

import './Card.css';

function Card({ children, style }) {
  return (
    <div className="card" style={style}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.string.isRequired,
};

export default Card;
