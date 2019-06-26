import React, { Component } from 'react'
import { connect } from 'react-redux';
 import {  addRecipeStep, getRecipe } from '../../actions/recipesAction';
 import Button from '@material-ui/core/Button';

export class NewStepPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thumbnail: 'https://photos.smugmug.com/Test/i-W5SXVkM/0/1d663a9e/S/fettuccine-S.jpg',
     
    }
    // this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)

}

      // componentWillReceiveProps(nextProps){
      //     console.log("NEXT PROPS:", nextProps)
      //     if(this.props.recipe !==  nextProps.recipe ){
      //       nextProps.getRecipe(this.props.param)
      // }
      //   }

    onSubmit(e) {
      e.preventDefault();
      const AddedStep= {
        text: this.props.text,
        thumbnail: this.state.thumbnail,
      }
        this.props.addRecipeStep(this.props.param, AddedStep);

       
      }

 
  render() {
      const { recipeId, changedProp, recipe, param, onSubmit, text, handleChange, name } = this.props;

    return (
      <form onSubmit={onSubmit} className={this.props.ClassName}>
        <div className='Card'>
            <input name={name} placeholder='Add Step Instructions' value={text} onChange={handleChange}  />
            <Button onClick={this.props.Close} type="submit" variant="contained">Add</Button>
            <Button onClick={this.props.Close} variant="contained">Cancel </Button>
        </div>
      </form>
    )
  }
}




const mapStateToProps = state => ({
     recipe: state.recipes.item,

})

export default connect(mapStateToProps, { addRecipeStep, getRecipe})(NewStepPost) 