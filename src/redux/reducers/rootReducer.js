import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import allRecipesReducer from './allRecipesReducer';

const rootReducer = combineReducers({
  recipeReducer,
  allRecipesReducer,
});

export default rootReducer;
