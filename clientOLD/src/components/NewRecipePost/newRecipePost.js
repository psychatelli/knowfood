import React, { Component } from 'react'
import { connect } from 'react-redux';
 import {  addRecipe, getRecipes } from '../../actions/recipesAction';
 import Button from '@material-ui/core/Button';

export class NewRecipePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      thumbnail: 'https://photos.smugmug.com/Test/i-W5SXVkM/0/1d663a9e/S/fettuccine-S.jpg',
     
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
}


    onSubmit(e) {
      e.preventDefault();
      const AddedRecipe = {
        title: this.state.title,
        thumbnail: this.state.thumbnail,
      }
        this.props.addRecipe(AddedRecipe);

        this.setState({ 
          title : '',
          // thumbnail : '',
        });
      }

    handleChange = e => {
      this.setState({
        title: e.target.value
        })
      }
      
     



  render() {
    return (
      <form onSubmit={this.onSubmit} className={this.props.ClassName}>
      <div className='Card'>
        <input name='newTitle' placeholder='Add Title' value={this.state.title} onChange={this.handleChange}  />
        {/* <button type="submit">Add </button>  */}
        <Button onClick={this.props.Close} type="submit" variant="contained">Add </Button>

        <Button onClick={this.props.Close} variant="contained">Cancel </Button>
      </div>
      </form>
    )
  }
}




const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { addRecipe})(NewRecipePost)