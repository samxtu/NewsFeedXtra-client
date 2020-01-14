import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import withSyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    ...theme.common,
    redirecting: {
        margin: '10%',
        width: '100%'
    }
})

class redirect extends Component {
    componentDidMount(){
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
            <div className={classes.redirecting}>
                <Typography variant='body2'>We are redirecting you!</Typography>
                <LinearProgress variant="query" />
                <LinearProgress variant="query" color="secondary" />
                <Button onClick={this.cliked}><Typography variant='caption'>Click here if you were not redirected</Typography></Button>
                <Typography variant='subtitle1'>Note: we are not in any way associated with the source of this article.</Typography>
            </div>
        )
    }
}

export default withSyles(styles)(redirect)
