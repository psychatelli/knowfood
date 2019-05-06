import { combineReducers } from 'redux';
import recipeReducer from './recipesReducer';
 
export default combineReducers({
   recipes: recipeReducer
  
  });