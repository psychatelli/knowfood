import React, { Component } from 'react'
import { updateRecipe, getRecipe, addRecipeStep, deleteRecipeStep } from '../../actions/recipesAction';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

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
          StepId: '',
          theRecipe: this.props.recipe,
 
        }
        this.handleChange = this.handleChange.bind(this);
         this.updateRecipe = this.updateRecipe.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.deleteStep = this.deleteStep.bind(this);


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
            // this.props.getRecipe(this.props.param);
          }

 
          deleteStep(selectedID) {
            this.props.deleteRecipeStep(this.props.recipe._id, selectedID)
            
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
 
    const { recipe, DeletePost, param } = this.props;
    const {theRecipe} = this.state
   



    const Steps =  recipe.step.map(function (item, index) {
      return (
        <div  key={item._id} className='RecipeStepEdit'>

          <div className='SpaceBetween'> 
            <h6>STEP {index + 1}</h6>
            <div size="small" onClick={() => { this.deleteStep(item._id)}} >
            <h6>X</h6>
            </div>
          </div>



            
            <input value={item.text} col='50' row='50'  />

            <img src={item.thumbnail}/>
        </div>
      )
      
    }.bind(this))
  
    return (
      <div>

        <form onSubmit={this.onSubmit}>
            <label>TITLE</label> <input  value={this.state.title} onChange={this.handleChange('title')} onBlur={this.updateRecipe}/>
          {Steps}
            <button>Submit</button>
        </form>
      </div>
    )
  }
}

 
const mapStateToProps = state => ({
    recipe: state.recipes.item

  })
  
  export default connect(mapStateToProps, {updateRecipe, addRecipeStep, deleteRecipeStep, getRecipe})(EditRecipe)
  
 