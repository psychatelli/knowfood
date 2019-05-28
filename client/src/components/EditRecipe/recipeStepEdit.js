import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class RecipeStepEdit extends Component {
 

  render() {
    const { steps, onChange, step_id  } = this.props;

    return steps.map((item, index, deleteStep) => (

      <div  key={item._id} className='RecipeStepEdit'>
      <button onClick={deleteStep(item._id)}> Delete </button>

      <h6>STEP {index + 1}</h6>
      <input value={item.text} col='50' row='50'  />

      <img src={item.thumbnail}/>
  </div>
    //   <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}




export default RecipeStepEdit;




