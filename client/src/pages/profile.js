import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProfile } from '../actions/profileActions';
import { getUsersRecipes } from '../actions/recipesAction';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CircleButton from '../components/common/circleButton';
import Moment from 'react-moment'
import Menu_dropdown from '../components/common/menu_dropdown';

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

export class Profile extends Component {


      constructor(props) {
        super(props);
        this.state = {
          
          errors: {},
          
        }
    }

      componentWillMount() {
         this.props.getProfile(this.props.match.params.id);
         this.props.getUsersRecipes(this.props.match.params.id)
      }

      render() {
      const { profile, recipes, classes } = this.props;
      
  

      const Recipes = recipes.map((item) => (
        <div className='Card RecipeCard'>
            <div className='SpaceBetween'>
                <div>         
                <h5> {item.title} </h5>
                <div className='Info'>
                  <div> <img className='Avatar' src={item.avatar} /> </div>
                  <div>  {item.username} </div>
                  {/* <div> <Moment format='YYY/MM/DD'>{item.date}</Moment> </div>  */}
                </div> 
  
                </div>
  
                <div> 
                  <Menu_dropdown  
                  // deleteItem={this.onDeleteClick.bind(this, item._id)} 
                //   editContent={this.editRow.bind(this, item)}
                  />
                </div>
            </div>
            <Link to={`/recipe/${item._id}`}>  
            <img src={item.thumbnail} /> 
            </Link>
        </div>
      ))



    
    return (
      <div className='Grid_wrapper'>
       <h6>Recipes By: {profile.username} </h6>

          {Recipes}


      </div>

     
    )
  }
}




const mapStateToProps = state => ({
  profile: state.profiles.item,
  recipes: state.recipes.items
})


export default connect(mapStateToProps, {getProfile, getUsersRecipes})(withStyles(styles)(Profile));
  