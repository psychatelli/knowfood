import { combineReducers } from 'redux';
import recipeReducer from './recipesReducer';
import alertReducer from './alertReducer';  
import authReducer from './authReducer';

export default combineReducers({
   recipes: recipeReducer,
   alert: alertReducer,
   auth: authReducer
  });