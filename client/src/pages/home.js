import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipes, addRecipe, deleteRecipe } from '../actions/recipes';
import CircleButton from '../components/common/circleButton';
import Menu_dropdown from '../components/common/menu_dropdown';
import EditableInput from '../components/common/editableInput';

export class Home extends Component {


      constructor(props) {
        super(props);
        this.state = {
          title: 'Add title',
          thumbnail: 'Add thumbnail',
          errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

    }



      componentWillMount() {
        this.props.getRecipes();
      }


   

    onDeleteClick(id) {
      this.props.deleteRecipe(id);
      console.log(`THIS IS THE ID: ${id}`)
    }

    onSubmit(e) {
      e.preventDefault();
      // const { user } = .props.auth;
      const newRecipe = {
        title: this.state.title,
        thumbnail: this.state.thumbnail
        // name: user.name,
        // avatar: user.avatar
      }
        this.props.addRecipe(newRecipe);
        // this.setState({ text: ''});
    }


       


        handleChange = input => evt => {
          this.setState({[input]: evt.target.value})
          console.log(input)
      } 

  render() {
    const { recipes } = this.props;
    
    

    const Recipes = recipes.map(item => (
      <div className='Card RecipeCard'>
         <div className='SpaceBetween'>
            <div>         
              <h5> 
              <EditableInput 
              HandleChange={this.handleChange(item._id)} 
              value={item.title} 
              name='title'
              />  
              </h5>
            </div>

            <div> 
              <Menu_dropdown deleteItem={this.onDeleteClick.bind(this, item._id)} />
            </div>
      </div>

         <img src={item.thumbnail} />
      </div>
    ))

    console.log(recipes)

    return (
      <div className='Grid_wrapper'>
        <form onSubmit={this.onSubmit}>
        <div className='SpaceBetween'>
            <div>  </div>

            <div> 
              <CircleButton type="submit" color='primary' size='small' icon='add' onClick={this.onSubmit} /> 
            </div>
        </div>
       
        {Recipes}
        </form> 
      </div>

     
    )
  }
}


const mapStateToProps = state => ({
  recipes: state.recipes.items,
})

export default connect(mapStateToProps, {getRecipes, addRecipe, deleteRecipe})(Home)
// export default Home