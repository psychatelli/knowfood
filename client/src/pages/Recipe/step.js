import React, { Component } from 'react'

export default class Step extends Component {

  render() {

const {Item, stepID, Step} = this.props;


var StepItems = Step.map((item, index) => {
    return (
        <div className='RecipeStepEdit'>
          <h3>{item.text}</h3>
            {/* <h6>STEP {index + 1}</h6> */}
            {/* <input value={item.text} /> */}
            {/* <img src={item.thumbnail}/> */}
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
