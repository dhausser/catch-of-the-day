import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

function EditFishForm({
  fish, index, updateFish, deleteFish,
}) {
  const handleChange = (e) => {
    // update that fish
    // 1. Take a copy of the current fish
    const updatedFish = {
      ...fish,
      [e.currentTarget.name]:
        e.currentTarget.name === 'price'
          ? parseFloat(e.currentTarget.value)
          : e.currentTarget.value,
    };
    updateFish(index, updatedFish);
  };

  return (
    <div className="fish-edit">
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={fish.name}
      />
      <input
        type="text"
        name="price"
        onChange={handleChange}
        value={formatPrice(fish.price)}
      />
      <select
        type="text"
        name="status"
        onChange={handleChange}
        value={fish.status}
      >
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea
        name="desc"
        onChange={handleChange}
        value={fish.desc}
      />
      <input
        type="text"
        name="image"
        onChange={handleChange}
        value={fish.image}
      />
      <button type="button" onClick={() => deleteFish(index)}>
        Remove Fish
      </button>
    </div>
  );
}

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.string.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
};

export default EditFishForm;
