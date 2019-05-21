import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getRecipe, getRecipes} from '../../actions/recipesAction';

import Step from './step';

import SingleRecipe from '../../components/SingleRecipe/editRecipe';

 class NewRecipe extends Component {

  constructor(props) {
      super(props);
      this.state = {
        MyRecipe : []
      }
  }

    componentWillMount() {
      // this.props.getRecipes();
        this.props.getRecipe(this.props.match.params.id);
      
        // this.setState =({MyRecipe : this.props.recipe })
      }



  render() {
    const { recipe, loading } = this.props;
    let RecipeContent;

    if (recipe === null || loading || Object.keys(recipe).length === 0) {
      RecipeContent = <p>Loading...</p>;
    } else {
      RecipeContent = (
        <div>
         
           <h2> {recipe.title}</h2>
        {/* <SingleRecipe/> */}

        <Step Step={recipe.step}/>

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
  
  export default connect(mapStateToProps, { getRecipe })(NewRecipe);
   