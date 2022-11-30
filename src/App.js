import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Meals from './pages/Meals';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
    </Switch>
  );
}

export default App;
