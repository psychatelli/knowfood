import React, { Component } from 'react'
import {  getRecipe } from '../../actions/recipesAction';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

// import RecipeStepEdit from '../../components/EditRecipe/recipeStepEdit';
import Step from './step';

export class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {         
          title: this.props.recipe.title,
          thumbnaileEdited: '',
          indexEdited: '',
          recipeText : '',
          recipeThumbnail: '',
          stepTitle: ''

        }
   

    }
    componentWillMount() {
      this.props.getRecipe(this.props.match.params.id);
    }

  
  render() {

    const { recipe} = this.props;

    return (
      <div>
              <h4>{recipe.title}</h4>
              <Step Step={recipe.step}  />
              <button>Submit</button>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  recipe: state.recipes.item
});

export default connect(mapStateToProps, { getRecipe })(Recipe);
 