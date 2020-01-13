import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../init-firebase';

function Inventory({
  storeId, fishes, setFishes, updateFish, deleteFish, loadSampleFishes, addFish,
}) {
  const [uid, setUid] = useState(null);
  const [owner, setOwner] = useState(null);

  /**
   * TO FIX: REBASE: The options argument must contain a data property of type ANY. Instead, got undefined
   */
  const authHandler = async (authData) => {
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(storeId, {
      context: {
        setState: ({ fishes }) => setFishes({ ...fishes }),
        state: { fishes },
      },
    });
    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${storeId}/owner`, {
        data: authData.uid,
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    setUid(authData.uid);
    setOwner(store.owner || authData.uid);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        authHandler(user);
      }
    });
  });

  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(authHandler);
  };

  const logout = async () => {
    console.log('Logging out!');
    await firebase.auth().signOut();
    setUid(null);
  };

  // 1. Check if they are logged in
  if (!uid) {
    return <Login authenticate={authenticate} />;
  }

  // 2. Check if they are the owner of the store
  if (uid !== owner) {
    return (
      <div>
        <p>Sorry you are not the owner!</p>
        <button onClick={logout}>Log Out!</button>
      </div>
    );
  }

  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <button onClick={logout}>
        Log Out!
      </button>
      {Object.keys(fishes).map((key) => (
        <EditFishForm
          key={key}
          index={key}
          fish={fishes[key]}
          updateFish={updateFish}
          deleteFish={deleteFish}
        />
      ))}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>
        Load Sample Fishes
      </button>
    </div>
  );
}

Inventory.propTypes = {
  storeId: PropTypes.string,
  fishes: PropTypes.object,
  setFishes: PropTypes.func,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  addFish: PropTypes.func,
};

export default Inventory;
