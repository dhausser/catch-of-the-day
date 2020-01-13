import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../init-firebase';

function App({ match: { params: { storeId } } }) {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});
  const refContainer = useRef({});

  useEffect(() => {
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      setOrder(JSON.parse(localStorageRef));
    }

    let ref = refContainer.current;
    ref = base.syncState(`${storeId}/fishes`, {
      context: {
        setState: ({ fishes: fishesCopy }) => setFishes(fishesCopy),
        state: { fishes },
      },
      state: 'fishes',
    });

    /**
     * TODO
     */
    // localStorage.setItem(
    //   storeId,
    //   JSON.stringify(order)
    // );

    return () => {
      base.removeBinding(ref);
    };
  }, [fishes, storeId]);

  const addFish = (fish) => {
    // 1. Take a copy of the existing state
    const fishesCopy = { ...fishes };
    // 2. Add our new fish to that fishes variable
    fishesCopy[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    setFishes(fishesCopy);
  };

  const updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishesCopy = { ...fishes };
    // 2. Update that state
    fishesCopy[key] = updatedFish;
    // 3. Set that to state
    setFishes(fishesCopy);
  };

  const deleteFish = (key) => {
    // 1. take a copy of state
    const fishesCopy = { ...fishes };
    // 2. update the state
    fishesCopy[key] = null;
    // 3. update state
    setFishes(fishesCopy);
  };

  const loadSampleFishes = () => setFishes(sampleFishes);

  const addToOrder = (key) => {
    // 1. take a copy of state
    const orderCopy = { ...order };
    // 2. Either add to the order, or update the number in our order
    orderCopy[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    setOrder(orderCopy);
  };

  const removeFromOrder = (key) => {
    // 1. take a copy of state
    const orderCopy = { ...order };
    // 2. remove that item from order
    delete orderCopy[key];
    // 3. call setState to update or state object
    setOrder(orderCopy);
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.keys(fishes).map((key) => (
            <Fish
              key={key}
              index={key}
              details={fishes[key]}
              addToOrder={addToOrder}
            />
          ))}
        </ul>
      </div>
      <Order
        fishes={fishes}
        order={order}
        removeFromOrder={removeFromOrder}
      />
      <Inventory
        addFish={addFish}
        updateFish={updateFish}
        deleteFish={deleteFish}
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
        setFishes={setFishes}
        storeId={storeId}
      />
    </div>
  );
}

App.propTypes = {
  match: PropTypes.objectOf.isRequired,
  params: PropTypes.objectOf.isRequired,
  storeId: PropTypes.string.isRequired,
};

export default App;
