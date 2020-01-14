import React, { Component, Fragment } from 'react';

//MUI stuff
import withSyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import noImg from '../images/no-image.jpg';

const styles = theme => ({
    ...theme.common,
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 1,
        height: 220
    },
    content: { 
        width: '100%',
        margin: 'auto',
        padding: '5px',
        zIndex: 110
    },
    image: {
        minWidth: 150
    },
    topdiv: {
      padding: '0 0px 10px 2px',
      top:'0',
      height: 5,
      backgroundColor: 'rgba(74, 226, 184, 0.98)' ,
      width: '100%'
    },
    datediv: {
        padding: '0 0px 5px 2px',
        margin: '10px 0px 5px 2px',
        height: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
        width: '50%'
    },
    datediv2: {
        margin: '20px 0px 20px 2px',
        height: 9,
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
        width: '80%'
    },
    desdiv: {
        height: 40,
        padding: '0 0px 20px 2px',
        margin: '10px 0px 0px 2px',
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
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
                        <div
                            className={classes.topdiv}
                            color="primary"
                        >
                        </div>
                        <div color="textSecondary" className={classes.datediv}></div>
                        <div color='textSecondary' className={classes.desdiv}></div><br/>
                        <div color='primary' className={classes.datediv2}></div>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <div
                            className={classes.topdiv}
                            color="primary"
                        >
                        </div>
                        <div color="textSecondary" className={classes.datediv}></div>
                        <div color='textSecondary' className={classes.desdiv}></div><br/>
                        <div color='primary' className={classes.datediv2}></div>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <div
                            className={classes.topdiv}
                            color="primary"
                        >
                        </div>
                        <div color="textSecondary" className={classes.datediv}></div>
                        <div color='textSecondary' className={classes.desdiv}></div><br/>
                        <div color='primary' className={classes.datediv2}></div>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <div
                            className={classes.topdiv}
                            color="primary"
                        >
                        </div>
                        <div color="textSecondary" className={classes.datediv}></div>
                        <div color='textSecondary' className={classes.desdiv}></div><br/>
                        <div color='primary' className={classes.datediv2}></div>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <div
                            className={classes.topdiv}
                            color="primary"
                        >
                        </div>
                        <div color="textSecondary" className={classes.datediv}></div>
                        <div color='textSecondary' className={classes.desdiv}></div><br/>
                        <div color='primary' className={classes.datediv2}></div>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <div
                            className={classes.topdiv}
                            color="primary"
                        >
                        </div>
                        <div color="textSecondary" className={classes.datediv}></div>
                        <div color='textSecondary' className={classes.desdiv}></div><br/>
                        <div color='primary' className={classes.datediv2}></div>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <div
                            className={classes.topdiv}
                            color="primary"
                        >
                        </div>
                        <div color="textSecondary" className={classes.datediv}></div>
                        <div color='textSecondary' className={classes.desdiv}></div><br/>
                        <div color='primary' className={classes.datediv2}></div>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                        className={classes.image}
                        image={noImg}
                        title={"Profile"}
                        />
                        <CardContent className={classes.content}>
                        <div
                            className={classes.topdiv}
                            color="primary"
                        >
                        </div>
                        <div color="textSecondary" className={classes.datediv}></div>
                        <div color='textSecondary' className={classes.desdiv}></div><br/>
                        <div color='primary' className={classes.datediv2}></div>
                        </CardContent>
                    </Card>
            </Fragment>
        )
    }
}

export default withSyles(styles)(NewsSkeleton)
