import { GET_RECIPES,DELETE_RECIPES,ADD_RECIPE,GET_RECIPE,DELETE_RECIPE,POST_STEP,DELETE_STEP, UPDATE_RECIPE, RECIPE_LOADING, RECIPE_ERROR, GET_USERS_RECIPES
} from '../actions/types';


const initialState = {
    items: [],
    steps: [],
    item: {},
    itemSelected: {},
    loading: true,
    errors: {}
  };

  
  

  export default function(state = initialState, action) {
      switch(action.type) {

        case RECIPE_LOADING:
        return {
          ...state,
          loading: true
        };

        case GET_RECIPES:
        case GET_USERS_RECIPES:  
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
          items: state.items.filter(recipe => recipe._id !== action.payload)
        };
        case RECIPE_ERROR:
            console.log(`DELETE RECIPE REDUCER ${action.payload}`)
          return{
            ...state,
            errors: action.payload,
            loading: false
          };

        case UPDATE_RECIPE:
        // console.log(`RECUDER ${JSON.stringify(state)}`); 

        return {
           ...state,
           item: action.payload,
          // items: state.items.filter(recipe => recipe._id !== action.payload)
        };

     

        default:
        return state;
      }
  }


  