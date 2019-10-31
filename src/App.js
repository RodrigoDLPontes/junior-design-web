import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Map from './Map';
import Table from './Table';

const App = () => (
  <Router>
    <Switch>
      <Route path="/map">
        <Map/>
      </Route>
      <Route path="/table">
        <Table/>
      </Route>
      <Route path="/">
        <Login/>
      </Route>
    </Switch>
  </Router>
)

export default App;