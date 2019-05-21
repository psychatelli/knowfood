import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getRecipe} from '../actions/recipesAction';

import Step from './Recipe/step';



 class NewRecipe extends Component {


    componentDidMount() {
        this.props.getRecipe(this.props.match.params.id);
      }



  render() {
    const { recipe } = this.props.recipe;
    const NewObj = JSON.stringify(this.props.recipe)


    return (
      <div>
        <p>{NewObj}</p>
        {recipe.title}
        {/* <Step Step={this.props.recipe.step}/> */}

      </div>
    )
  }
}

NewRecipe.propTypes = {
    getRecipe: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired
  };
  

const mapStateToProps = state => ({
    recipe: state.recipes.item
  });
  
  export default connect(mapStateToProps, { getRecipe })(NewRecipe);
   