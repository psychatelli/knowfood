import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getRecipe, deleteRecipe, addRecipeStep} from '../../actions/recipesAction';
import { withStyles } from '@material-ui/core/styles';
import Spinner from '../../components/common/spinner';
import Step from './step';
import EditRecipe from '../../components/EditRecipe/editRecipe';
import Drawer from '@material-ui/core/Drawer';
// import SingleRecipe from '../../components/SingleRecipe/editRecipe';
import Menu_dropdown from '../../components/common/menu_dropdown';
import CircleButton from '../../components/common/circleButton';
import NewStepPost from '../../components/NewStepPost/newStepPost';

import Button from '@material-ui/core/Button';

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


 class Recipe extends PureComponent {

  constructor(props) {
      super(props);
      this.state = {
        active: true,
        right: false,
        text: '',
        thumbnail: 'https://photos.smugmug.com/Test/i-W5SXVkM/0/1d663a9e/S/fettuccine-S.jpg',
      }
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.props.getRecipe(this.props.match.params.id);
      
      }


    //   componentWillReceiveProps(nextProps){
    //     console.log("NEXT PROPS:", nextProps)
    //     if(this.props.recipe !==  nextProps.recipe ){
    //       nextProps.getRecipe(this.props.match.params.id)
    // }
    //   }

  //   componentWillUpdate(nextProps){
  //     console.log("NEXT PROPS:", nextProps)
  //     if(this.props.getRecipe !==  nextProps.getRecipe ){
  //       nextProps.getRecipe(this.props.param)
  // }
  //   }


      // shouldComponentUpdate(nextProp, nextState) {
      //   console.log('NEXTPROP', nextProp)
      //   console.log('NEXTSTATE', nextState)

      //   return(this.props.recipe === nextState.recipe ? false: true)

      // }

      onDeleteClick(id) {
        this.props.deleteRecipe(id);
      }

      editRow = (recipe) =>{
        // this.props.selectedRecipe(recipe);
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





      onSubmit(e) {
        e.preventDefault();
        const AddedStep= {
          text: this.state.text,
          thumbnail: this.state.thumbnail
        }
          this.props.addRecipeStep(this.props.match.params.id, AddedStep);
  
          this.props.getRecipe(this.props.match.params.id)

          this.setState({ 
            text : '',
            // thumbnail : '',
          });



        }
  
      
  
      handleChange = e => {
        this.setState({
          text: e.target.value
          })
        }


  render() {
    const { recipe, loading, classes } = this.props;
    let RecipeContent;

   

    if (recipe === null || loading || Object.keys(recipe).length === 0) {
      RecipeContent = <Spinner/>;
    } else {
      RecipeContent = (
        <div className='Grid_wrapper'>

        <h1> {this.state.updateStep} </h1>
        <div className='Recipe_header'>  
            <div className='SpaceBetween'>
                <div> <h5> {recipe.title} </h5> </div>

                <div> 
                <Menu_dropdown   deleteItem={this.onDeleteClick.bind(this, recipe._id)} editContent={this.editRow.bind(this, recipe)}/>
                </div>

            </div>

            <div>
              <img src={recipe.thumbnail} width='100'/>
            </div>

            <div> 
            <p>Ingredients:</p> <p>{recipe.ingredients}</p>
            </div>

         </div>


         <div className='SpaceBetween'>
         <div>  </div>
         <CircleButton color='primary' size='small' icon='add' Click={() => this.setState({active: !this.state.active})} /> 

         </div>


        <NewStepPost handleChange={this.handleChange} text={this.state.text} onSubmit={this.onSubmit} param={this.props.match.params.id}   ClassName={ this.state.active ? "HideInput" : "ShowInput" } Close={() => this.setState({active: !this.state.active})} />

      

        
        <Step Step={recipe.step}/>

        <Drawer   anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
            <div tabIndex={0} role="button" onClick={this.toggleDrawer('right', false)}   onKeyDown={this.toggleDrawer('right', false)}></div>
            
            <div className={classes.DrawerContainer}>
              <br/>
              <EditRecipe param={this.props.match.params.id} />
            </div>


        </Drawer>


        </div>
      );
    }
  
    return (
      <div>
        {RecipeContent}
      </div>
    )
  }
}


  

const mapStateToProps = state => ({
    recipe: state.recipes.item,
  });
  
   export default connect(mapStateToProps, { deleteRecipe, getRecipe, addRecipeStep})(withStyles(styles)(Recipe));
