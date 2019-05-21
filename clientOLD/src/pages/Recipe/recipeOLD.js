import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipe, deleteRecipe, selectedRecipe } from '../../actions/recipesAction';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import CircleButton from '../../components/common/circleButton';
import Menu_dropdown from '../../components/common/menu_dropdown';
import EditableInput from '../../components/common/editableInput';

import NewRecipePost from '../../components/NewRecipePost/newRecipePost';
// import DrawerRight from '../components/common/drawerright';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import StepFeed from './stepFeed';
import RecipeStepEdit from '../../components/EditRecipe/recipeStepEdit';

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

export class Recipe extends Component {


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
        this.props.getRecipe(this.props.match.params.id);
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
    const { recipe, classes } = this.props;
    
    const NotesIcon = (
      <Button><i  className="Opendrawer">note</i> Notes</Button>
  )




    return (
      <div className='Grid_wrapper'>
        <div className='SpaceBetween'>
            <div>  </div>

            <div> 
              <CircleButton color='primary' size='small' icon='add' Click={() => this.setState({active: !this.state.active})} /> 
              
            </div>
        </div>
       
          <NewRecipePost  ClassName={ this.state.active ? "HideInput" : "ShowInput" } Close={() => this.setState({active: !this.state.active})} />
       
      
             <div className='Card RecipeCard'>
      
          <div className='SpaceBetween'>
               <div>         
              
                 <h5> {recipe.title} </h5>
               </div>

               <div> 
                 <Menu_dropdown  deleteItem={this.onDeleteClick.bind(this, recipe._id)} editContent={this.editRow.bind(this, recipe)}/>

               </div>
           </div>
           <Link to={`/recipe/${recipe._id}`}>  
           <img src={recipe.thumbnail} /> 
           </Link>
       </div>

       
       <RecipeStepEdit steps={recipe.step} />

        <Drawer   anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div tabIndex={0} role="button" onClick={this.toggleDrawer('right', false)}   onKeyDown={this.toggleDrawer('right', false)}></div>
          

         <div className={classes.DrawerContainer}>
          <br/>
          
          {/* <EditRecipe /> */}
            
          </div>
        </Drawer>




      </div>

     
    )
  }
}


const mapStateToProps = state => ({
  recipe: state.recipes.item,
})

// export default connect(mapStateToProps, {getRecipes, deleteRecipe, updateRecipe})(Home)
// export default Home
export default connect(mapStateToProps, {getRecipe, deleteRecipe})(withStyles(styles)(Recipe));
