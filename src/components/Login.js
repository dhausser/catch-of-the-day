import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ authenticate }) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <button type="button" className="github" onClick={() => authenticate('Github')}>
      Log In With GitHub
    </button>
    <button type="button" className="twitter" onClick={() => authenticate('Twitter')}>
      Log In With Twitter
    </button>
    <button type="button" className="facebook" onClick={() => authenticate('Facebook')}>
      Log In With Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
