import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipes, addRecipe, deleteRecipe, getRecipe } from '../actions/recipesAction';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
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

export class Recipies extends Component {


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
      }

     
  

      onDeleteClick(id) {
        this.props.deleteRecipe(id);
      }
  
      editRow = (recipe) =>{ 
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
      const { recipes, classes, auth } = this.props;
      
  


    const Recipes = recipes.map((item) => (
      <div className='Card RecipeCard'>
          <div className='SpaceBetween'>
              <div>         
                <h5> {item.title} </h5>
                <span> {item.username} </span>
                <span> <Moment format='YYY/MM/DD'>{item.date}</Moment> </span> 

              </div>

              <div> 
                <Menu_dropdown  
                // deleteItem={this.onDeleteClick.bind(this, item._id)} 
                editContent={this.editRow.bind(this, item)}/>
              </div>
          </div>
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

// Recipies.prototype = {
//   recipes
// }


const mapStateToProps = state => ({
  recipes: state.recipes.items,
  auth: state.auth
})


export default connect(mapStateToProps, {getRecipes, deleteRecipe, getRecipe})(withStyles(styles)(Recipies));
 