import React, {Component, Fragment} from 'react';
import withSyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';


const styles = () => ({  paper: {
      width: "100%",
      borderRadius: 0,
      margin: "auto",
      textAlign: "center"
  },
});

class Footer extends Component {
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  render() {
    const {classes} = this.props;
    const linktoapi = 'https://newsapi.org';
    return (
      <Fragment>
        <Paper className={classes.paper}>
          <Typography variant="body1">Powered by:</Typography>
          <hr className={classes.paper} />
          <Typography variant="body2" color="primary">JECS&trade;</Typography>
          <Typography component={Link} to={linktoapi} target="_blank" rel="noopener" variant="body2" color="primary">News API</Typography>
          <hr className={classes.paper} />
          <Typography variant="body2" color="primary">&#169; JECS&trade; 2020</Typography>
        </Paper>
      </Fragment>
  );
  }
}

export default withSyles(styles)(Footer)