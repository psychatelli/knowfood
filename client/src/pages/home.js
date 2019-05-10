import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipes, addRecipe, deleteRecipe, updateRecipe } from '../actions/recipesAction';
import CircleButton from '../components/common/circleButton';
import Menu_dropdown from '../components/common/menu_dropdown';
import EditableInput from '../components/common/editableInput';
import NewRecipePost from '../components/NewRecipePost/newRecipePost';
import DrawerRight from '../components/common/drawerright';
import Button from '@material-ui/core/Button';



export class Home extends Component {


      constructor(props) {
        super(props);
        this.state = {
          _id: '',
          title: '',
          thumbnail: 'AddThumbnail',
          titleEdited: 'a',
          thumbnaileEdited: '',
          indexEdited: '',
          errors: {},
          active: true,


        }
        // this.handleChange = this.handleChange.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this)
    }

   


      componentWillMount() {
        this.props.getRecipes();
        console.log('Component will mount')
      }

     
     
     
      onDeleteClick(id) {
        this.props.deleteRecipe(id);

      }
  
    
   
      updateRecipe() {
        let newRecipe = {
           title: this.state.titleEdited
        }
            // console.log(`your updateRecipe ${this.state.indexEdited} ${this.state.thumbnaileEdited} ${this.state.titleEdited}`)
            this.props.updateRecipe(this.state.indexEdited, newRecipe)

            this.setState({ 
              tindexEdited : '',
              thumbnaileEdited : '',
              titleEdited : ''
             });
          }

          
      // handleChange = input => evt => {
      //   this.setState({
      //     // [input]: evt.target.value,
      //     // thumbnaileEdited: input.thumbnail,
      //     titleEdited: evt.target.value,
      //     indexEdited: input._id
      //     })
      //   } 

      // handleChange = e => {
      //   this.setState({
      //     title: e.target.value
      //     })
      //   }
  
       
        
      editRow = (recipe) =>{
        this.setState({
           _id: recipe.id,
           thumbnaileEdited: recipe.thumbnail,
           titleEdited: recipe.title,
        })
    }
        

  render() {
    const { recipes } = this.props;
    
    const NotesIcon = (
      <Button><i title="Notes" className="material-icons">note</i> Notes</Button>
  )

    const Recipes = recipes.map((item) => (
      <div className='Card RecipeCard'>
         <div className='SpaceBetween'>
              <div>         
                {/* <EditableInput 
                HandleChange={this.handleChange(item._id)} 
                value={item.title} 
                name='title'
                />   */}
                {/* <input placeholder='Insert Title...' value={item.title} name={item.id} onChange={this.handleChange(item)} onBlur={this.updateRecipe}  /> */}
                <h5> {item.title} </h5>
              </div>

              <div> 
                <Menu_dropdown title='' deleteItem={this.onDeleteClick.bind(this, item._id)} editContent={this.editRow.bind(this, item)}/>
              </div>
          </div>
              {/* <h6>{item.thumbnail}</h6> */}
         <img src={item.thumbnail} />
      </div>
    ))


    return (
      <div className='Grid_wrapper'>
        <div className='SpaceBetween'>
            <div> <h4>{this.state.titleEdited} </h4> </div>

            <div> 
              <CircleButton color='primary' size='small' icon='add' Click={() => this.setState({active: !this.state.active})} /> 
              
            </div>
        </div>
       
          <NewRecipePost  ClassName={ this.state.active ? "HideInput" : "ShowInput" } Close={() => this.setState({active: !this.state.active})} />
       
      
        {Recipes}

       {NotesIcon}
       
        <DrawerRight buttonContent={NotesIcon}>
            <h5>Edit Recipe</h5>
        <h5>{this.state.titleEdited}</h5>
        </DrawerRight>
      </div>

     
    )
  }
}


const mapStateToProps = state => ({
  recipes: state.recipes.items,
})

export default connect(mapStateToProps, {getRecipes, deleteRecipe, updateRecipe})(Home)
// export default Home