import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

function StorePicker({ history }) {
  const myInput = useRef();

  const goToStore = (event) => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    const storeName = myInput.current.value;
    // 3. Change the page to /store/whatever-they-entered
    history.push(`/store/${storeName}`);
  };

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter A Store</h2>
      <input
        type="text"
        ref={myInput}
        required
        placeholder="Store Name"
        defaultValue={getFunName()}
      />
      <button type="submit">Visit Store →</button>
    </form>
  );
}

StorePicker.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default StorePicker;
