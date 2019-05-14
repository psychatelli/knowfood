import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  DrawerContainer: {
    width: 400,
    padding: 5
  }
  
};

class DrawerRight extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  
 



  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };


 

 

  

  render() {
    const { classes, buttonContent, children, MyOpenState } = this.props;

   


    return (
      <div>
        <span  onClick={this.toggleDrawer('right', true)}>{buttonContent}</span>       
        <Drawer   anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div tabIndex={0} role="button"
            // onClick={this.toggleDrawer('right', false)}   onKeyDown={this.toggleDrawer('right', false)}
          >

         <div className={classes.DrawerContainer}>
          {children}
         </div>
          
            
          </div>
        </Drawer>
      </div>
    );
  }
}

DrawerRight.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerRight);