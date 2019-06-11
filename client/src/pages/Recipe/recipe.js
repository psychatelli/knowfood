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
import Alert from '../../components/common/alert';
import authReducer from '../../reducers/authReducer';


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
      // this.onSubmit = this.onSubmit.bind(this);
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

    componentDidUpdate(nextProps){
      console.log("NEXT PROPS:", nextProps)
      if(this.props.getRecipe !==  nextProps.getRecipe ){
        this.props.getRecipe(this.props.param)
  }
    }


      // shouldComponentUpdate(nextProp, nextState) {
      //   console.log('NEXTPROP', nextProp)
      //   console.log('NEXTSTATE', nextState)

      //   return(this.props.recipe === nextState.recipe ? false: true)

      // }

      onDeleteClick(id) {
        this.props.deleteRecipe(id);
        // this.props.history.push('/recipies');
        //  window.location.href = '/recipies';

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
    const { recipe, loading, classes, auth  } = this.props;
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
                <Menu_dropdown   deleteItem={this.onDeleteClick.bind(this, recipe._id, )} editContent={this.editRow.bind(this, recipe)}/>
                </div>

               

            </div>

            <div>
              <img src={recipe.thumbnail} width='100'/>
            </div>

            <div> 
            <p>Ingredients:</p> <p>{recipe.ingredients}</p>
            </div>

            <div>
                  comments
                  {recipe.comments.length}
                </div>
         </div>


         <div className=''>
         {!auth.loading && recipe.user === auth.user._id && (
            <center>
                <CircleButton color='primary' size='small' icon='add' Click={() => this.setState({active: !this.state.active})} /> 
            </center>
          )}
         </div>


        <NewStepPost handleChange={this.handleChange} text={this.state.text} 
        onSubmit={this.onSubmit.bind(this)}
        param={this.props.match.params.id}   ClassName={ this.state.active ? "HideInput" : "ShowInput" } Close={() => this.setState({active: !this.state.active})} />

      

        
        <Step Step={recipe.step}/>

        <Drawer   anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
            <div tabIndex={0} role="button" onClick={this.toggleDrawer('right', false)}   onKeyDown={this.toggleDrawer('right', false)}></div>
            
            <div className={classes.DrawerContainer}>

            {!auth.loading && recipe.user === auth.user._id && (
               <div className='SpaceBetween'>
                 <div> </div>
                 <Button color="secondary" onClick={this.onDeleteClick.bind(this, recipe._id, )}>
                  DELETE
                </Button>
                </div> 
              )}
              <br/>
              <EditRecipe param={this.props.match.params.id} />
            </div>


        </Drawer>


        </div>
      );
    }
  
    return (
      <div>
        <Alert/>
        {RecipeContent}
      </div>
    )
  }
}

// Recipe.PropTypes = {
//   deleteRecipe: PropTypes.func.isRequired
// }
  

const mapStateToProps = state => ({
    recipe: state.recipes.item,
    auth: state.auth
  });
  
   export default connect(mapStateToProps, { deleteRecipe, getRecipe, addRecipeStep})(withStyles(styles)(Recipe));
