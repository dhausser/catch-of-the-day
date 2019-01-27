import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact="true" path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route component={NotFound} /> 
      </Switch>
    </BrowserRouter>
  )
}

render(<Root />, document.getElementById('main'));
