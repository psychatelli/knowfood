import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function CircleButton(props) {
  const { classes, color, icon, size, onclick, type, Click  } = props;
  return (
    <div>
      <Fab type={type} color={color} size={size} className={classes.fab} onClick={Click}>
      <i className="material-icons">{icon}</i>
      </Fab>
     
      
    </div>
  );
}

CircleButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircleButton);