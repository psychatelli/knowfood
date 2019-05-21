import React, { Component } from 'react'
import { updateRecipe, selectedRecipe, getRecipe } from '../actions/recipesAction';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import RecipeStepEdit from './Recipe/EditRecipe/recipeStepEdit';
import PropTypes from 'prop-types';

// import Step from './step';

 class Recipe extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {         
    //       title: this.props.recipe.title,
    //       thumbnaileEdited: '',
    //       indexEdited: '',
    //       recipeText : '',
    //       recipeThumbnail: '',
    //       stepTitle: ''

    //     }
    // }


    componentDidMount() {
      this.props.getRecipe(this.props.match.params.id);
    }

  
  render() {

    const { recipe} = this.props;

    const NewObj =JSON.stringify(recipe);

    console.log(`My Recipe ${NewObj}`);


    // const Recipee = recipe.map(item => (
    //   <div>
    //     <h3> {item.title} </h3>
    //      <img src={item.thumbnail} />
    //   </div>
    // ))
    

    return (
      <div>
       
            <h4>{recipe.title}</h4>
            {/* <h2>{recipe.step[0].text}</h2> */}
            {NewObj}
            {/* <RecipeStepEdit steps={recipe.step} /> */}

      </div>
    )
  }
}

Recipe.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipes.item,

})

export default connect(mapStateToProps, {getRecipe})(Recipe)
