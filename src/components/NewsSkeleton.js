import React, { Component, Fragment } from 'react';

//MUI stuff
import withSyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Skeleton from '@material-ui/lab/Skeleton';

import noImg from '../images/no-image.jpg';

const styles = theme => ({
    ...theme.common,
    card: {
        position: 'relative',
        marginBottom: 1,
        [theme.breakpoints.only('xs')]: {
        //   height: 60,
        },
        [theme.breakpoints.only('sm')]: {
          height: 100,
          display: 'flex',
        },
        [theme.breakpoints.only('md')]: {
          height: 140,
          display: 'flex',
        },
        [theme.breakpoints.only('lg')]: {
          height: 180,
          display: 'flex',
        },
        [theme.breakpoints.only('xl')]: {
          height: 220,
          display: 'flex',
        },
    },
    content: { 
        width: '100%',
        margin: 'auto',
        padding: '5px',
        zIndex: 110
    },
    image: {
        [theme.breakpoints.only('xs')]: {
          maxWidth: 0,
          maxHeight: 0
        },
        [theme.breakpoints.only('sm')]: {
          minWidth: 120,
        },
        [theme.breakpoints.only('md')]: {
          minWidth: 150,
        },
        [theme.breakpoints.only('lg')]: {
          minWidth: 150,
        },
        [theme.breakpoints.only('xl')]: {
          minWidth: 150,
        },
    },
    topdiv: {
      padding: '0 0px 10px 2px',
      top:'0',
      height: 5,
      backgroundColor: '#2D283E' ,
      width: '100%'
    },
    datediv: {
        padding: '0 0px 5px 2px',
        margin: '10px 0px 5px 2px',
        height: 2,
        backgroundColor: '#2D283E' ,
        width: '50%'
    },
    datediv2: {
        margin: '20px 0px 20px 2px',
        height: 9,
        backgroundColor: '#2D283E' ,
        width: '80%'
    },
    desdiv: {
        height: 40,
        padding: '0 0px 20px 2px',
        margin: '10px 0px 0px 2px',
        backgroundColor: '#2D283E' ,
        width: '100%'
    }
})


export class NewsSkeleton extends Component {
    render() {
        const {classes} = this.props
        return (
            <Fragment>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <Skeleton className={classes.topdiv} color="primary" />
                        <Skeleton color="textSecondary" className={classes.datediv}/>
                        <Skeleton color='textSecondary' className={classes.desdiv}/><br/>
                        <Skeleton color='primary' className={classes.datediv2}/>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <Skeleton className={classes.topdiv} color="primary" />
                        <Skeleton color="textSecondary" className={classes.datediv}/>
                        <Skeleton color='textSecondary' className={classes.desdiv}/><br/>
                        <Skeleton color='primary' className={classes.datediv2}/>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <Skeleton className={classes.topdiv} color="primary" />
                        <Skeleton color="textSecondary" className={classes.datediv}/>
                        <Skeleton color='textSecondary' className={classes.desdiv}/><br/>
                        <Skeleton color='primary' className={classes.datediv2}/>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <Skeleton className={classes.topdiv} color="primary" />
                        <Skeleton color="textSecondary" className={classes.datediv}/>
                        <Skeleton color='textSecondary' className={classes.desdiv}/><br/>
                        <Skeleton color='primary' className={classes.datediv2}/>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <Skeleton className={classes.topdiv} color="primary" />
                        <Skeleton color="textSecondary" className={classes.datediv}/>
                        <Skeleton color='textSecondary' className={classes.desdiv}/><br/>
                        <Skeleton color='primary' className={classes.datediv2}/>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <Skeleton className={classes.topdiv} color="primary" />
                        <Skeleton color="textSecondary" className={classes.datediv}/>
                        <Skeleton color='textSecondary' className={classes.desdiv}/><br/>
                        <Skeleton color='primary' className={classes.datediv2}/>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <Skeleton className={classes.topdiv} color="primary" />
                        <Skeleton color="textSecondary" className={classes.datediv}/>
                        <Skeleton color='textSecondary' className={classes.desdiv}/><br/>
                        <Skeleton color='primary' className={classes.datediv2}/>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <Skeleton className={classes.topdiv} color="primary" />
                        <Skeleton color="textSecondary" className={classes.datediv}/>
                        <Skeleton color='textSecondary' className={classes.desdiv}/><br/>
                        <Skeleton color='primary' className={classes.datediv2}/>
                        </CardContent>
                    </Card>
            </Fragment>
        )
    }
}

export default withSyles(styles)(NewsSkeleton)
