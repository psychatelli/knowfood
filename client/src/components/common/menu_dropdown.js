import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class Menu_dropdown extends React.Component {

// const Menu_dropdown = ({ name, value, error, info, onChange, options }) => {
    
   
    state = {
        anchorEl: null,
        // selectedIndex: 0,
      };
    
      handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, anchorEl: null });

        if(index == 1) {
            console.log("this is the firt one");
        }
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });

         
      };

      DeleteItem = () => {
        this.setState({ anchorEl: null });
        this.props.deleteItem()
      }

      showDetails = () => {
          let Post = this.props.post
          console.log(Post.name, Post.img)
        };


        Edit = () => {
          this.props.editContent()
          this.handleClose()

        }
 
        render() {
            const { anchorEl } = this.state;
            const {deleteItem, editContent, title, authLoding, itemUser, authUserId} = this.props;

 
        return (
                <div> 
                    <List>
                        <a  aria-haspopup="true" aria-controls="lock-menu" onClick={this.handleClickListItem}>
                        <i className="material-icons">more_horiz</i></a>
                    </List>
 
                    <Menu title={title} id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                        <MenuItem  selected={0 === this.state.selectedIndex} onClick={this.handleClose}> Share </MenuItem>
                    </Menu>
                </div>
    );
  }
}


  Menu_dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
  };
  
  export default Menu_dropdown;