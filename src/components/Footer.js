import React, { Component, Fragment } from "react";
import withSyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = () => ({
  paper: {
    fontFamily: "Playfair Display",
    display: "flex",
    flexDirection: "column",
    borderRadius: 2,
    width: "100%",
    margin: "20px auto auto auto",
    textAlign: "center",
  },
});

class Footer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    const { classes } = this.props;
    const linktoapi = "https://www.linkedin.com/in/samwel-ngwale-12363811a/";
    return (
      <Fragment>
        <Paper className={classes.paper}>
          <hr className={classes.paper} />
          <Typography
            component={Link}
            aria-label="Link to developer of the site"
            to={{ pathname: '/redirect', hash: linktoapi }}
            target="_blank"
            rel="noopener"
            variant="body2"
            color="primary"
          >
            Powered by: Samwel Ngwale
          </Typography>
          <hr className={classes.paper} />
          <Typography variant="body2" color="primary">
            &#169; Samwel Ngwale&trade; 2022
          </Typography>
        </Paper>
      </Fragment>
    );
  }
}

export default withSyles(styles)(Footer);
