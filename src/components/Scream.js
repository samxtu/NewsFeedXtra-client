import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../util/MyButton';
import clsx from 'clsx';
import noImg from '../images/no-image.jpg';

//MUI stuff
import withSyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';

// mui icons 
import AllOutIcon from '@material-ui/icons/AllOut';
import LinkIcon from '@material-ui/icons/Link';
import FlagIcon from '@material-ui/icons/Flag';


const styles = theme => ({
    ...theme.common,
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 1,
        [theme.breakpoints.only('xs')]: {
          height: 60,
        },
        [theme.breakpoints.only('sm')]: {
          height: 100,
        },
        [theme.breakpoints.only('md')]: {
          height: 140,
        },
        [theme.breakpoints.only('lg')]: {
          height: 180,
        },
        [theme.breakpoints.only('xl')]: {
          height: 220,
        },
    },
    button: {
        float: 'right',
        padding: 0,
        margin: 0
    },
    image: {
      [theme.breakpoints.only('xs')]: {
        minWidth: 90,
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
    content: {
        padding: 3,
        marginLeft: '5px',
        objectFit: 'cover',
        width: '100%'
    },
    link: {
      position: 'relative',
      color: 'inherit',
      left: '10px',
      margin: 0
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(0deg)'
    },
    typo: {
      marginBottom: 0
    }
})

class Scream extends Component {
  constructor(props){
    super(props)
    this.state = {
      desc: 'Take a peek',
      expanded: false
    }
  }
    render (){
        dayjs.extend(relativeTime);
      
        const handleExpandClick = () => {
          if(this.state.desc === 'Take a peek') this.setState({ desc: 'Minimize' })
          if(this.state.desc === 'Minimize') this.setState({ desc: 'Take a peek' })
          this.setState({ expanded: !this.state.expanded })
        };
        const { classes, scream: { source: {name}, author, title, description, url, urlToImage, publishedAt, content } } = this.props;

        return (
          <Card className={classes.card}>
            <CardMedia
              className={classes.image}
              image={urlToImage?(urlToImage):(noImg)}
              title={"Profile"}
            />
            <CardContent className={classes.content}>
              <Typography
                className={classes.typo}
                variant="h5"
                color="primary"
                component={Link}
                to={{ pathname: '/redirect', hash: url }} target="_blank" rel="noopener"
              >
                {title?(title):('This article does not have a title!')}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {publishedAt?(dayjs(publishedAt).fromNow()):('')} {name?(' from '+name):('')}{author?(' by '+author):('')}
              </Typography>
              <Typography
                className={classes.typo} variant="body1">{description?(description):('')}</Typography><br/>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <Typography
                className={classes.typo} variant='body2' color='textSecondary' >Some content:</Typography>
                <Typography
                className={classes.typo} paragraph>{content?(content.split('[+')[0]): ('')}</Typography>
            </Collapse>
            <MyButton btnClassName={classes.typo} tip="History">
                <FlagIcon color="primary" />
              </MyButton>
              <span>:Trending</span>
              <span
                className={clsx(classes.expand,classes.link, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={this.state.expanded}
                >
                <MyButton btnClassName={classes.typo} tip="More details..." btnName={title} >
                  <AllOutIcon color="primary" />
                </MyButton>
                {this.state.desc}
              </span>
              <Link to={{ pathname: '/redirect', hash: url }} target="_blank" rel="noopener" className={classes.link}>
                <MyButton btnClassName={classes.typo} tip="View on original source">
                  <LinkIcon color="primary" />
                </MyButton>
                View on source
              </Link>
            </CardContent>
          </Card>
        );
    }
}


export default (withSyles(styles)(Scream));