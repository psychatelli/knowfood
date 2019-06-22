import { GET_PROFILES, GET_PROFILE, PROFILE_LOADING } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    // itemSelected: {},
    loading: true,
    errors: {}
  };

  
   

  export default function(state = initialState, action) {
      switch(action.type) {
        case PROFILE_LOADING:
        return {
          ...state,
          loading: true
        };

        case GET_PROFILES:
        return{
            ...state,
            items: action.payload,
        };
  
        case GET_PROFILE:
        return{
            ...state,
            item: action.payload,
        };

        // case ADD_RECIPE:
        // return {
        //    ...state,
        //      items: [action.payload, ...state.items],
        // };

        // case POST_STEP:
        // //  console.log(`RECUDER ${JSON.stringify(action.payload)}`); 
        // return {
        //    ...state,
        //    item: action.payload,
        //   };

      
        // case DELETE_RECIPE:
        // return {
        //    ...state,
        //   items: state.items.filter(recipe => recipe._id !== action.payload)
        // };


        // case RECIPE_ERROR:
        //     console.log(`DELETE RECIPE REDUCER ${action.payload}`)
        //   return{
        //     ...state,
        //     errors: action.payload,
        //     loading: false
        //   };

        // case UPDATE_RECIPE:
        // return {
        //    ...state,
        //    item: action.payload,
        // };

     

        default:
        return state;
      }
  }


  