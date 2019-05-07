import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipes } from '../actions/recipes';


export class Recipes extends Component {

  componentWillMount() {
    this.props.getRecipes();

}


  render() {
    const { recipes } = this.props;
    
    const Recipes = recipes.map(item => (
      <div>
        <h3> {item.title} </h3>
         <img src={item.thumbnail} />
      </div>
    ))

    return (
      <div>
          <h1>Welcome to Your Web App</h1>

          {Recipes}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  recipes: state.recipes.items,
})

export default connect(mapStateToProps, {getRecipes})(Recipes)
// export default Home;
