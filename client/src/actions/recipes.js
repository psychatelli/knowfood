import axios from 'axios';
// import {GET_RECIPES,DELETE_RECIPES,ADD_RECIPE,GET_RECIPE,DELETE_RECIPE,POST_STEP,DELETE_STEP } from './types';
import {GET_RECIPES} from './types';

const data = [
    {
        title: 'This is title 1',
        thumbnail: "Thumnail 1"
    },
    {
        title: 'This is title 2',
        thumbnail: "Thumnail 2"
    },
    
]

// export const getRecipes = () => dispatch => {
//     dispatch({
//     type: GET_RECIPES,
//     payload: data
//       });
//     }


export const getRecipes = () => dispatch => {
    axios
      .get('/api/recipe')
      .then(res =>
        dispatch({
          type: GET_RECIPES,
          payload: res.data
        })
      )
      
  };