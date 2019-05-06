import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipes } from '../actions/recipes';

 
export class Home extends Component {

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

    console.log(recipes)

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

export default connect(mapStateToProps, {getRecipes})(Home)
// export default Home