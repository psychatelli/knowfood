import { GET_RECIPES,DELETE_RECIPES,ADD_RECIPE,GET_RECIPE,DELETE_RECIPE,POST_STEP,DELETE_STEP, UPDATE_RECIPE, RECIPE_LOADING
} from '../actions/types';
   

const initialState = {
    items: [],
    steps: [],
    item: {},
    itemSelected: {},
    loading: false
  };

  
  

  export default function(state = initialState, action) {
      switch(action.type) {

        case RECIPE_LOADING:
        return {
          ...state,
          loading: true
        };

        case GET_RECIPES:
        return{
            ...state,
            items: action.payload,
        };
  
        case GET_RECIPE:
        //  console.log(`Reducer Recipe: ${...state}
        return{
            ...state,
            item: action.payload,
        };

        case ADD_RECIPE:
        return {
           ...state,
             items: [action.payload, ...state.items],
        };

        // case POST_STEP:
        // //  console.log(`RECUDER ${JSON.stringify(action.payload)}`); 
        // return {
        //    ...state,
        //    item: action.payload,
        //   };

      
        case DELETE_RECIPE:
        return {
           ...state,
          item: action.payload,
        };

        case UPDATE_RECIPE:
        // console.log(`RECUDER ${JSON.stringify(state)}`); 

        return {
           ...state,
          items: state.items.filter(recipe => recipe._id !== action.payload)
        };

     

        default:
        return state;
      }
  }


  