import { GET_RECIPES,DELETE_RECIPES, UPDATE_LIKES, ADD_RECIPE,GET_RECIPE,DELETE_RECIPE,POST_STEP,DELETE_STEP, UPDATE_RECIPE, RECIPE_LOADING, RECIPE_ERROR, GET_USERS_RECIPES, DELETE_COMMENT
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
        return {
           ...state,
           item: action.payload,
        };

        case UPDATE_LIKES:
        return {
           ...state,
           items: state.items.map(recipe => recipe._id === action.payload.id  ? { ...recipe, likes: action.payload.likes } : recipe ),
          //  posts: state.posts.map(post =>   post._id === payload.id ? { ...post, likes: payload.likes } : post),
           loading: false
        };

     

        default:
        return state;
      }
  }


  