import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { addComment, deleteComment } from '../../actions/recipesAction';

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }



  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { param } = this.props;
    
    const newComment = {
      text: this.state.text,
      username: user.username,
      avatar: user.avatar
    }

    this.props.addComment(param, newComment);
    this.setState({ text: ''});
}

deleteComment(commentId) {
    this.props.deleteComment(this.props.param,commentId)
}

handleChange (e) {
  this.setState({
    [e.target.name]: e.target.value
    })
  }



  render() {

const { Comment, param, Visibility} = this.props;
const {text } = this.state;
const { user } = this.props.auth;

 
var CommentItems = Comment.map((item) => {
    return (
        <div className='Comment'>
                  <div className='SpaceBetween'>
                      <div className='Info'>
                        <div> <img className='Avatar' src={item.avatar} /> </div>
                        <div>  {item.username} </div>
                         <div className='Date'> <Moment format='MM/DD/YYYY'>{item.date}</Moment> </div> 
                      </div>

                      <div>
                        <span className={Visibility}>
                            <i onClick={() => { this.deleteComment(item._id)}} className="material-icons gray_font Hand">close</i>
                        </span>
                      </div>
                  </div>
            <p>{item.text} </p>
        </div>
     );
    });


    return  (
        <div>
          <br/>
        <h6>Comments</h6>
          <form onSubmit={this.onSubmit.bind(this)}>
                  <input name='text' value={text} placeholder='Add Comment...' onChange={this.handleChange} />
          </form>
          <br/>
          {CommentItems}
        </div>
      )
    
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

 export default connect(mapStateToProps, {addComment, deleteComment})(Comments);

