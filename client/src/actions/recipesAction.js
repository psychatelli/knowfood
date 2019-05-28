import axios from 'axios';
import {GET_RECIPES, DELETE_RECIPES, ADD_RECIPE ,GET_RECIPE,DELETE_RECIPE,POST_STEP,DELETE_STEP, UPDATE_RECIPE, SELECTED_RECIPE, RECIPE_LOADING, GET_ERRORS } from './types';





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

  export const getRecipe = id => dispatch => {
    dispatch(setRecipeLoading());
    axios
      .get(`/api/recipe/${id}`)
      .then(res =>
        dispatch({
          type: GET_RECIPE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: null
        })
      ); 
  };

  // export const getRecipe = recipeData => dispatch => {
  //   dispatch({
  //     type: SELECTED_RECIPE,
  //     payload: recipeData
  //   })
  // };


  // Add Recipe
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
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


  // Add Recipe Step
  export const addRecipeStep = (id, recipeData) => dispatch => {
    // dispatch(clearErrors());
    axios
      .post(`/api/recipe/step/${id}`, recipeData)
      .then(res =>
        dispatch({
          type: POST_STEP,
          payload: res.data
        }),
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  //Delete Recipe Step /step/:recipe_id/:step_id
  export const deleteRecipeStep = (recipe_id, step_id) => dispatch => {
    console.log(`deleteRecipeStep: ${recipe_id} ${step_id}`)
    axios
      .delete(`/api/recipe/step/${recipe_id}/${step_id}`)
      .then(res =>
        dispatch({
          type: GET_RECIPE,
          payload: res.data
        }),
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
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





// Set loading state
export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};