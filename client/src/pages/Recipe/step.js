import React, { Component } from 'react'

export default class Step extends Component {

  render() {

const {Item, stepID, Step} = this.props;


var StepItems = Step.map((item, index) => {
    return (
        <div className='RecipeStepEdit'>
            <h6>STEP {index + 1}</h6>
            <p>{item.text} </p>
            <img src={item.thumbnail}/>
        </div>
     );
    });


    return  (
        <div>
          {StepItems}
        </div>
      )
    
  }
}
