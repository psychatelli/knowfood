import React, { Component } from 'react'
import { updateRecipe, getRecipes } from '../../actions/recipesAction';
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
          stepTitle: ''
 
        }
        this.handleChange = this.handleChange.bind(this);
         this.updateRecipe = this.updateRecipe.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }


    handleChange = input => evt => {
        this.setState({
          [input]: evt.target.value,
          // thumbnaileEdited: input.thumbnail,
        //   titleEdited: evt.target.value,
        //   indexEdited: input._id
          })

        //   this.updateRecipe()
        } 


      


      

  

        updateRecipe() {
        let newRecipe = {
           title: this.state.title
        }
            this.props.updateRecipe(this.props.recipe._id, newRecipe)
            this.props.getRecipes()
        }



        onSubmit(e) {
            e.preventDefault();
            const EditedRecipe = {
               title: this.props.title,
            }
              this.props.updateRecipe(EditedRecipe);
          
             
          }



          handleStepChange = input => evt => {
              console.log(evt)
            this.setState({
              [input]: evt.target.value,
              // thumbnaileEdited: input.thumbnail,
            //   titleEdited: evt.target.value,
            //   indexEdited: input._id
              })
    
            //   this.updateRecipe()
            } 

  render() {

    const { recipe} = this.props;
   
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <label>TITLE</label> <input  value={this.state.title} onChange={this.handleChange('title')} onBlur={this.updateRecipe}/>
            <RecipeStepEdit steps={recipe.step} onChange={this.handleStepChange('stepTitle')} />

            <button>Submit</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    recipe: state.recipes.itemSelected,

  })
  
  export default connect(mapStateToProps, {updateRecipe, getRecipes})(EditRecipe)
  
