import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipes, addRecipe, deleteRecipe, selectedRecipe } from '../actions/recipesAction';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import CircleButton from '../components/common/circleButton';
import Menu_dropdown from '../components/common/menu_dropdown';
import EditableInput from '../components/common/editableInput';
import EditRecipe from '../components/EditRecipe/editRecipe';

import NewRecipePost from '../components/NewRecipePost/newRecipePost';
// import DrawerRight from '../components/common/drawerright';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  DrawerContainer: {
    width: 400,
    padding: 20
  }
  
};

export class Home extends Component {


      constructor(props) {
        super(props);
        this.state = {
          _id: '',
          title: '',
          thumbnail: 'AddThumbnail',
          errors: {},
          active: true,
          right: false,


        }

    }

      componentWillMount() {
        this.props.getRecipes();
        console.log('Component will mount')
      }

     

      onDeleteClick(id) {
        this.props.deleteRecipe(id);
      }
  
      editRow = (recipe) =>{
        this.props.selectedRecipe(recipe);
        this.MytoggleDrawer()
    }

    
    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };

    MytoggleDrawer = () => {
      this.setState({
        right: true,
      });
    };



  render() {
    const { recipes, classes } = this.props;
    
    const NotesIcon = (
      <Button><i  className="Opendrawer">note</i> Notes</Button>
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
                <Menu_dropdown  deleteItem={this.onDeleteClick.bind(this, item._id)} editContent={this.editRow.bind(this, item)}/>

              </div>
          </div>
              {/* <h6>{item.thumbnail}</h6> */}
          <Link to={`/recipe/${item._id}`}>  
          <img src={item.thumbnail} /> 
          </Link>
      </div>
    ))


    return (
      <div className='Grid_wrapper'>
        <div className='SpaceBetween'>
            <div>  </div>

            <div> 
              <CircleButton color='primary' size='small' icon='add' Click={() => this.setState({active: !this.state.active})} /> 
              
            </div>
        </div>
       
          <NewRecipePost  ClassName={ this.state.active ? "HideInput" : "ShowInput" } Close={() => this.setState({active: !this.state.active})} />
       
      
        {Recipes}

       


        <Drawer   anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div tabIndex={0} role="button" onClick={this.toggleDrawer('right', false)}   onKeyDown={this.toggleDrawer('right', false)}></div>
          

         <div className={classes.DrawerContainer}>
          <br/>
          
          <EditRecipe />
            
          </div>
        </Drawer>




      </div>

     
    )
  }
}


const mapStateToProps = state => ({
  recipes: state.recipes.items,
})

// export default connect(mapStateToProps, {getRecipes, deleteRecipe, updateRecipe})(Home)
// export default Home
export default connect(mapStateToProps, {getRecipes, deleteRecipe, selectedRecipe})(withStyles(styles)(Home));
