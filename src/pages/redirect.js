import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import withSyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    ...theme.common,
    redirecting: {
        fontFamily: "Playfair Display",
        margin: '10% 0 10% 0',
        width: '100%',
        minHeight: '500px'
    }
})

class redirect extends Component {
    componentDidMount(){
        console.log('redirect did mount')
        setTimeout(() =>{
            window.location.replace(this.props.location.hash.split('#')[1])
          }, 1000);
    }
    cliked = () =>{
        window.location.replace(this.props.location.hash.split('#')[1])
    }
    render() {
        const {classes} = this.props;
        return (
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} className={classes.redirecting}>
                    <Typography variant='body2'>We are redirecting you!</Typography>
                    <LinearProgress variant="query" />
                    <LinearProgress variant="query" color="secondary" />
                    <Button onClick={this.cliked}><Typography variant='caption'>Click here if you were not redirected</Typography></Button>
                    <Typography variant='subtitle1'>Note: we are not in any way associated with the source of this article.</Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        )
    }
}

export default withSyles(styles)(redirect)
