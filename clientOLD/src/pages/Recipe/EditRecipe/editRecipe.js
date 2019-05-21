import React, { Component } from 'react'
import { getRecipe } from '../../../actions/recipesAction';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import RecipeStepEdit from './recipeStepEdit';

export class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {         
          title: this.props.recipe.title,
          thumbnaileEdited: '',
          indexEdited: '',
          recipeText : '',
          recipeThumbnail: '',
          stepTitle: '',
          Recipe: this.props.recipe

        }

    }


   

      


  render() {

    const { recipe} = this.props;
   



    const NewString = JSON.stringify(recipe)
    return (
      <div>
        {NewString}
        <form onSubmit={this.onSubmit}>
            <label>TITLE</label> <input  value={this.state.title}  onBlur={this.updateRecipe}
            // InputProps={{
            //     startAdornment: <InputAdornment position="start">Title</InputAdornment>,
            //   }}
            />
                
            <RecipeStepEdit steps={this.props.recipe.step}  />

            <button>Submit</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    recipe: state.recipes.item,

  })
  
  export default connect(mapStateToProps, { getRecipe})(EditRecipe)
  
