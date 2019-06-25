import React, { Component } from 'react'
import Moment from 'react-moment'

export default class Comments extends Component {

  render() {

const {Item, stepID, Comment} = this.props;


var CommentItems = Comment.map((item, index) => {
    return (
        <div className='Comment'>
                <div className='Info'>
                  <div> <img className='Avatar' src={item.avatar} /> </div>
                  <div>  {item.username} </div>
                  <div className='Date'> <Moment format='MM/DD/YYYY'>{item.date}</Moment> </div> 
                </div>

            <p>{item.text} </p>
        </div>
     );
    });


    return  (
        <div>
          {CommentItems}
        </div>
      )
    
  }
}
