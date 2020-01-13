import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

function Fish({ details, addToOrder, index }) {
  const {
    image, name, price, desc, status,
  } = details;
  const isAvailable = status === 'available';
  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button
        type="button"
        disabled={!isAvailable}
        onClick={() => addToOrder(index)}
      >
        {isAvailable ? 'Add To Order' : 'Sold Out!'}
      </button>
    </li>
  );
}

Fish.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  addToOrder: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
};

export default Fish;
