import React, { Component } from 'react'
import { updateRecipe, getRecipe, addRecipeStep, deleteRecipeStep } from '../../../actions/recipesAction';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import RecipeStepEdit from './recipeStepEdit';
import Comments from '../comments';

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
          showStatus: ''
 
        }
        this.handleChange = this.handleChange.bind(this);
        //  this.updateRecipe = this.updateRecipe.bind(this)

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
        }



        handleStepChange = index => evt =>{
          const newStateContent = this.state.TheRecipe;
          let array = newStateContent.step.slice() // create mutable copy of the array
    
          array[index][evt.target.name] = evt.target.value;
          let newObj = {...this.state.TheRecipe}
    
        this.setState({
          TheRecipe: newObj
        });
    
    }

          updateRecipeStep() {
          let NewRecipe =  this.state.TheRecipe
          this.props.updateRecipe(this.props.recipe._id, this.state.TheRecipe)
            }

 
          deleteStep(selectedID, index) {
            this.state.TheRecipe.step.splice(index, 1)
            this.props.deleteRecipeStep(this.props.recipe._id, selectedID)
          }

          // componentWillReceiveProps(nextProps){
          //   if(nextProps.recipe !== this.props.recipe){
          //     this.props.getRecipe(this.props.param);

          //   }
          // }


        onSubmit(e) {
            e.preventDefault();
            const EditedRecipe = {
               title: this.props.title,
            }
              this.props.updateRecipe(EditedRecipe);
          }

  

         
 
  render() {
 
    const { recipe, DeletePost, param ,Visibility, auth} = this.props;
    const {TheRecipe} = this.state
 


    const Steps =  TheRecipe.step.map(function (item, index) {
      return (
        <div  key={item._id} className='RecipeStepEdit'>
          <div className='SpaceBetween'> 
            <h6>STEP {index + 1}</h6>
            <div size="small" onClick={() => { this.deleteStep(item._id, index)}} >
            <i style={{color: 'gray', size: '5'}} className="material-icons Hand">close</i>
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
            <br/>
            {/* <Comments Comment={recipe.comments}/> */}
            <Comments param={recipe._id} Comment={recipe.comments} Visibility={Visibility}/>
        </form>
      </div>
    )
  }
}

 
const mapStateToProps = state => ({
    recipe: state.recipes.item,
    auth: state.auth
  })
  
  export default connect(mapStateToProps, {updateRecipe, addRecipeStep, deleteRecipeStep, getRecipe})(EditRecipe)
  
 