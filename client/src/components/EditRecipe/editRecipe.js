import React, { Component } from 'react'
import { updateRecipe, getRecipe, addRecipeStep, deleteRecipeStep } from '../../actions/recipesAction';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import RecipeStepEdit from './recipeStepEdit';
import Comments from './comments';

export class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          TheRecipe: this.props.recipe,        
          title: this.props.recipe.title,
          thumbnaileEdited: '',
          indexEdited: 'ds',
          recipeText : '',
          recipeThumbnail: '',
          stepText: '',
          stepThumbnail: '',
          StepId: '',
          recipeId: this.props.recipe._id,
 
        }
        this.handleChange = this.handleChange.bind(this);
        //  this.updateRecipe = this.updateRecipe.bind(this)

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
            console.log('You are firing update')
        }



        handleStepChange = index => evt =>{
          const newStateContent = this.state.TheRecipe;
          let array = newStateContent.step.slice() // create mutable copy of the array
    
          array[index][evt.target.name] = evt.target.value;
          let newObj = {...this.state.TheRecipe}
          //  console.log(`YOUR OBJ ${newObj}`)
    
        this.setState({
          TheRecipe: newObj
        });
    
    }

          updateRecipeStep() {
          //   const newStateContent = this.state.TheRecipe;
          // let StepArray = newStateContent.step.slice() // create mutable copy of the array
          let NewRecipe =  this.state.TheRecipe
          this.props.updateRecipe(this.props.recipe._id, this.state.TheRecipe)

            console.log(`YOUR updateRecipeStep ${JSON.stringify(this.state.TheRecipe)}`)

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

         
         
 
        //  handleChange = (e, index,) => {
        //   let array = this.state.car.features.slice() // create mutable copy of the array
        //   array[index] = e.target.value // set the value of the feature at the index in question to e.target.value
        //   const newObj = { ...this.state.car, features: array } // create a new object by spreading in the this.state.car and overriding features with our new array 
        //   this.setState({ car: newObj }) // set this.state.car to our new object
        // }

         
 
  render() {
 
    const { recipe, DeletePost, param } = this.props;
    const {TheRecipe} = this.state
   
    console.log(`THE RECIPE: ${this.state.TheRecipe}`);


    const Steps =  TheRecipe.step.map(function (item, index) {
      return (
        <div  key={item._id} className='RecipeStepEdit'>

          <div className='SpaceBetween'> 
            <h6>STEP {index + 1}</h6>
            <div size="small" onClick={() => { this.deleteStep(item._id)}} >
            <i style={{color: 'gray', size: '5'}} className="material-icons">close</i>
            </div>
          </div>
            
            <input name='text' value={item.text} col='50' row='50' onChange={this.handleStepChange(index)} onBlur={() => {this.updateRecipeStep()}}  />

            <img src={item.thumbnail}/>
        </div>
      )
      
    }.bind(this))


  
    return (
      <div>

        <form onSubmit={this.onSubmit}>
            <label>TITLE</label> 
            <input  value={this.state.title} onChange={this.handleChange('title')} onBlur={() => {this.updateRecipe()}} />
            {Steps}

            <Comments Comment={recipe.comments}/>

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
  
 