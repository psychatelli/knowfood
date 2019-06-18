
import axios from 'axios';
import {GET_PROFILES, GET_PROFILE, PROFILE_LOADING, PROFILE_ERROR } from './types';



export const getProfiles = () => async dispatch => {
  //  dispatch(setProfileLoading());
    try {
      const res = await axios.get('/api/profile/all');
      console.log(res.data)

      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    } catch(err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: null
      })
    }
  }



  export const getProfile = id => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get(`/api/profile/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: PROFILE_ERROR,
          payload: null
        })
      ); 
  };

  // Set loading state
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};