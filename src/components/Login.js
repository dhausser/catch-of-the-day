import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ authenticate }) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <button className="github" type="submit" onClick={() => authenticate('Github')}>
      Log In With GitHub
    </button>
    <button className="twitter" type="submit" onClick={() => authenticate('Twitter')}>
      Log In With Twitter
    </button>
    <button className="facebook" type="submit" onClick={() => authenticate('Facebook')}>
      Log In With Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
