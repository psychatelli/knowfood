import axios from 'axios';
import { setAlert } from './alert';
import {GET_RECIPES, DELETE_RECIPES, UPDATE_LIKES, ADD_RECIPE ,GET_RECIPE,DELETE_RECIPE,POST_STEP,DELETE_STEP, UPDATE_RECIPE, SELECTED_RECIPE, RECIPE_LOADING, GET_ERRORS, RECIPE_ERROR, GET_USERS_RECIPES, ADD_COMMENT } from './types';





export const getRecipes = () => async dispatch => {

    try {
      const res = await axios.get('/api/recipe');
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    } catch(err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status },
      })
    }
  }



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



export const getUsersRecipes = id => dispatch => {
    dispatch(setRecipeLoading());
    axios
      .get(`/api/recipe/user/${id}`)
      .then(res =>
        dispatch({
          type: GET_USERS_RECIPES,
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

  //Delete Recipe Step /step/:recipe_id/:step_id
  // export const deleteRecipeStep = (recipe_id, step_id) => dispatch => {
  //   console.log(`deleteRecipeStep: ${recipe_id} ${step_id}`)
  //   axios
  //     .delete(`/api/recipe/step/${recipe_id}/${step_id}`)
  //     .then(res =>
  //       dispatch({
  //         type: GET_RECIPE,
  //         payload: res.data
  //       }),
  //     )
  //     .catch(err =>
  //       dispatch({
  //         type: GET_ERRORS,
  //         payload: err.response.data
  //       })
  //     );
  // };

  export const deleteRecipeStep = (recipe_id, step_id) => async dispatch => {
    try {
      const res = await axios.delete(`/api/recipe/step/${recipe_id}/${step_id}`);
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    } catch(err) {
      
      // const errors = err.response.data.errors;

      //   if(errors) {
      //       errors.forEach(error => dispatch(setAlert(error.msg, 'danger') ))
      //   }

      dispatch({
        type: RECIPE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }



// Delete Recipe
// export const deleteRecipe = id => dispatch => {
 
//   axios
//     .delete(`/api/recipe/${id}`)
//     .then(res =>
//       dispatch({
//         type: DELETE_RECIPE,
//         payload: res.data
//       })
//     )
//     // .catch(err =>
//     //   dispatch({
//     //     type: GET_ERRORS,
//     //     payload: err.response.data
//     //   })
//     // );

// };


export const deleteRecipe = (id) => async dispatch => {

  try{
    const res = await axios.delete(`/api/recipe/${id}`);
    dispatch({
      type: DELETE_RECIPE,
      payload: res.data
    });
    dispatch(setAlert('Post Removed', 'success'))

  }catch(err){
    dispatch({
      type: RECIPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status },
      loading: false
    })
  }
}

   
// Update Recipe
export const updateRecipe = (recipeId, recipeData) => dispatch => {
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




//Add Comment 
 export const addComment = (recipeId, commentData) => async dispatch => {

  try {
    const res = await axios.post(`/api/recipe/comment/${recipeId}`, commentData);
    dispatch({
      type: GET_RECIPE,
      payload: res.data
    })

  }catch(err){
    dispatch({
      type: RECIPE_ERROR,
      payload: null,
    })
  }
};


//Delete Comment 
export const deleteComment = (recipeId, commentId) => async dispatch => {

  try {
    const res = await axios.delete(`/api/recipe/comment/${recipeId}/${commentId}`);
    dispatch({
      type: GET_RECIPE,
      payload: res.data
    })

  }catch(err){
    dispatch({
      type: RECIPE_ERROR,
      payload: null,
    })
  }
};




//ADD like 
export const addLike = (recipeId) => async dispatch => {

  try {
    const res = await axios.put(`/api/recipe/like/${recipeId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { recipeId, likes: res.data}
    })

  }catch(err){
    dispatch({
      type: RECIPE_ERROR,
      payload: null,
    })
  }
};


//Remove like 
export const removeLike = (recipeId) => async dispatch => {
  console.log(recipeId)
  try {
    const res = await axios.put(`/api/recipe/unlike/${recipeId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { recipeId, likes: res.data}
    })

  }catch(err){
    dispatch({
      type: RECIPE_ERROR,
      payload: null,
    })
  }
};



