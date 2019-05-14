import { GET_RECIPES,DELETE_RECIPES,ADD_RECIPE,GET_RECIPE,DELETE_RECIPE,POST_STEP,DELETE_STEP, UPDATE_RECIPE, SELECTED_RECIPE } from '../actions/types';
   

const initialState = {
    items: [],
    item: {},
    itemSelected: {},
    loading: false
  };


  export default function(state = initialState, action) {
      switch(action.type) {
        case GET_RECIPES:
        return{
            ...state,
            items: action.payload,
        };

        case ADD_RECIPE:
        console.log(`RECUDER ${JSON.stringify(action.payload)}`); 
        return {
           ...state,
             items: [action.payload, ...state.items],
        };

        case DELETE_RECIPE:
        return {
           ...state,
          items: state.items.filter(recipe => recipe._id !== action.payload),
        };

        case UPDATE_RECIPE:
        console.log(`RECUDER ${JSON.stringify(state)}`); 

        return {
           ...state,
          items: state.items.filter(recipe => recipe._id !== action.payload)
        };

        case SELECTED_RECIPE:
        return{
            ...state,
            itemSelected: action.payload,
        };
     

        default:
        return state;
      }
  }


  