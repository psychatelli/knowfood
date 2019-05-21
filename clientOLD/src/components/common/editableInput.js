import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


export default class EditableInput extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          editing: false,
          submitting: false,
          // draftText: this.props.value,
          // text: this.props.value,
          error: false,
        }
    
        this.success = this.success;
        this.failure = this.failure;
      }
    
        success = () => {
            this.setState({submitting: false});
        }
    
    
        failure = () => {
            this.setState({
                submitting: false,
                error: true
            });
        }
    
        handleCancel = (e) => {
          e.preventDefault();

            this.setState({draftText: this.state.text});
            this.toggleEditing(e);
        }
        
        handleClickOutside = (e) => {
          e.preventDefault();

          if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
              this.toggleEditing(e);
          }
        }


        toggleEditing = (e) => {
           e.preventDefault();

            // so we can close on outside click
            if (this.state.editing) {
                document.removeEventListener('mousedown', this.handleClickOutside);
            } else {
                document.addEventListener('mousedown', this.handleClickOutside);
            }
        
            this.setState({editing: !this.state.editing});
        }
    
        handleChange = (e) => {
            this.setState({draftText: e.target.value});
        }
    
      // actually submit the request etc.
        triggerSubmit = () => {
            this.setState({
                text: this.state.draftText,
                submitting: true,
            });
    
            // submit
            // this.props.submitCallback(this.state.draftText, this.success, this.failure);
        }
      
    
      // check for enter or cancel
        handleKeyDown = (e) => {
            const enter_key = 13;
            const escape_key = 27;
    
            if (e.keyCode == enter_key) {
            this.toggleEditing();
            this.triggerSubmit();
            } else if (e.keyCode == escape_key) {
            this.toggleEditing();
            }
        }
    

  render() {
    let controlLinks;
    let editing;
    let textOrInput;
    let error;

    if (this.state.error) {
        error = <span className="error">error!</span>
      }

 

      if (this.state.editing) {
        textOrInput = <div>
        <TextField
          // onChange={this.handleChange}
          onChange={this.props.HandleChange}
          onKeyDown={this.handleKeyDown}
          value={this.props.value}
          margin="normal"
          fullWidth
          multiline
          variant="outlined"
          name={this.props.name}
        />
        </div>
        controlLinks = (
          <div>
            <a className="edit-link blue-link" onClick={this.handleCancel} href="#">CANCEL</a>
          </div>
        )
  
        editing = 'editing';
      } else {
        textOrInput = <span onClick={this.toggleEditing} className="text">{this.props.value}</span>
        controlLinks = <div><a className="edit-link blue-link" onClick={this.toggleEditing} href="#">EDIT</a></div>
        editing = '';
      }



    return (
      <div>
        
        <div
        className={`${this.props.className} ${editing} editable-field`}
        ref={(node) => { this.wrapperRef = node; }}
      >
        {textOrInput}
        {error}
        {controlLinks}
      </div>


      </div>
    )
  }
}
