import axios from 'axios';
import {GET_RECIPES,DELETE_RECIPES, ADD_RECIPE ,GET_RECIPE,DELETE_RECIPE,POST_STEP,DELETE_STEP, UPDATE_RECIPE } from './types';

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




  // Add Post
export const addRecipe = recipeData => dispatch => {
  // dispatch(clearErrors());
  // console.log(`AddREcipe: ${JSON.stringify(recipeData)}`)
  axios
    .post('/api/recipe', recipeData)
    .then(res =>
      dispatch({
        type: ADD_RECIPE,
        payload: res.data
      }),
    )
    // .catch(err =>
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data
    //   })
    // );
};


// Delete Recipe
export const deleteRecipe = id => dispatch => {
  axios
    .delete(`/api/recipe/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_RECIPE,
        payload: id
      })
    )
    // .catch(err =>
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data
    //   })
    // );

};
   
  
// Update Recipe
export const updateRecipe = (recipeId, recipeData ) => dispatch => {
  axios
    .put(`/api/recipe/${recipeId}`, recipeData)
    .then(res =>
      dispatch({
        type: UPDATE_RECIPE,
        payload: res.data
      })
      
    )

  

    // .catch(err =>
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data
    //   })
    // );
};