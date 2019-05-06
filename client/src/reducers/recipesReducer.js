import { GET_RECIPES,DELETE_RECIPES,ADD_RECIPE,GET_RECIPE,DELETE_RECIPE,POST_STEP,DELETE_STEP } from '../actions/types';
   

const initialState = {
    items: [],
    item: {},
    loading: false
  };


  export default function(state = initialState, action) {
      switch(action.type) {
        case GET_RECIPES:
        return{
            ...state,
            items: action.payload,
        };

        // case GET_RECIPE:
        // return{
        //     ...state,
        //     item: action.payload,
        //     loading: false
        // };

        // case DELETE_RECIPE:
        // return{
        //     ...state,
        //     items: state.items.filter(item => item._id !== action.payload)
        // };

        // case POST_STEP:
        // return{
        //     ...state,
        //     items: state.items.filter(item => item._id !== action.payload)
        // };

        // case DELETE_STEP:
        // return{
        //     ...state,
        //     items: state.items.filter(item => item._id !== action.payload)
        // };

        default:
        return state;
      }
  }
