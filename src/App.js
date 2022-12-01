import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import './App.css';
import './style/recipes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />

    </Switch>
  );
}

export default App;
