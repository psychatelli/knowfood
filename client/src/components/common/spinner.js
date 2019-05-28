import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
// });

const styles = theme => ({
      root: {
    flexGrow: 1,
    marginTop: '30px'
  },
  });

function Spinner({classes}) {

  return (
    <div className={classes.root}>
      <LinearProgress />
      <br />
      {/* <LinearProgress color="secondary" /> */}
    </div>
  );
}

export default (withStyles(styles)(Spinner));
