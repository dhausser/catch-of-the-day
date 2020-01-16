import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

function Order({ fishes, order, removeFromOrder }) {
  const renderOrder = (key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';

    // Make sure the fish is loaded before we continue!
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 500, exit: 500 }}
        >
          <li key={key}>
            {`Sorry ${fish ? fish.name : 'fish'} is no longer available`}
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition
        classNames="order"
        key={key}
        timeout={{ enter: 500, exit: 500 }}
      >
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span key={count}>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs
            {' '}
            {fish.name}
          </span>
          <span className="price">
            {formatPrice(count * fish.price)}
            <button type="button" onClick={() => removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  const orderIds = Object.keys(order);
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    if (isAvailable) {
      return prevTotal + count * fish.price;
    }
    return prevTotal;
  }, 0);

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup component="ul" className="order">
        {orderIds.map(renderOrder)}
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </TransitionGroup>
    </div>
  );
}

Order.propTypes = {
  fishes: PropTypes.objectOf,
  order: PropTypes.objectOf,
  removeFromOrder: PropTypes.func.isRequired,
};

Order.defaultProps = {
  fishes: [],
  order: [],
};

export default Order;
