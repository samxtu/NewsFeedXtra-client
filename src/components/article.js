import React, { Component,Fragment } from 'react';
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
import Hidden from '@material-ui/core/Hidden';


const styles = theme => ({
    ...theme.common,
    card: {
        paddingBottom:0,
        marginBottom: 1,
        position: 'relative',
        [theme.breakpoints.only('xs')]: {
          // height: '',
          paddingBottom:0,
          marginBottom:5
        },
        [theme.breakpoints.only('sm')]: {
          // height: 160,
          display: 'flex',
          paddingBottom:0,
          marginBottom:0
        },
        [theme.breakpoints.only('md')]: {
          // height: 160,
        display: 'flex',
        },
        [theme.breakpoints.only('lg')]: {
          // height: 180,
        display: 'flex',
        },
        [theme.breakpoints.only('xl')]: {
          // height: 220,
        display: 'flex',
        },
    },
    button: {
        float: 'right',
        padding: 0,
        margin: 0
    },
    image: {
      [theme.breakpoints.only('xs')]: {
        minWidth: '100%',
        height: 200
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
        objectFit: 'cover',
        padding: 0,
        "&:last-child": {
          paddingBottom: 0
        },
        width: '100%',
        [theme.breakpoints.only('xs')]: {
          marginLeft: '3px',
          padding:'0 0 0 3px'
        },
        [theme.breakpoints.only('sm')]: {
          marginLeft: '3px',
          padding:'0 0 0 3px'
        },
        [theme.breakpoints.only('md')]: {
          padding: 2,
          marginLeft: '5px',
        },
        [theme.breakpoints.only('lg')]: {
          padding: 3,
          marginLeft: '5px',
        },
        [theme.breakpoints.only('xl')]: {
          padding: 3,
          marginLeft: '5px',
        },
    },
    link: {
      position: 'relative',
      color: 'inherit',
      left: '10px',
      margin: 0,
      [theme.breakpoints.only('xs')]: {
        fontSize: '100%'
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '80%',
      },
      [theme.breakpoints.only('md')]: {
        fontSize: '90%',
      },
      [theme.breakpoints.only('lg')]: {
        fontSize: '100%',
      },
      [theme.breakpoints.only('xl')]: {
        fontSize: '100%',
      },
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
    typoTitle: {
      marginBottom: 0,
      paddingTop: 0,
      marginTop: 0,
      [theme.breakpoints.only('xs')]: {
        fontSize: '150%',
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '90%',
      },
      [theme.breakpoints.only('md')]: {
        fontSize: '95%',
      },
      [theme.breakpoints.only('lg')]: {
        fontSize: '100%',
      },
      [theme.breakpoints.only('xl')]: {
        fontSize: '100%',
      },
    },
    typoSubtitle: {
      marginBottom: 0,
      [theme.breakpoints.only('xs')]: {
        fontSize: '100%',
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '80%',
      },
      [theme.breakpoints.only('md')]: {
        fontSize: '90%',
      },
      [theme.breakpoints.only('lg')]: {
        fontSize: '100%',
      },
      [theme.breakpoints.only('xl')]: {
        fontSize: '100%',
      },
    },
    typoDetails: {
      marginBottom: 0,
      [theme.breakpoints.only('xs')]: {
        fontSize: '100%',
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '80%',
      },
      [theme.breakpoints.only('md')]: {
        fontSize: '90%',
      },
      [theme.breakpoints.only('lg')]: {
        fontSize: '100%',
      },
      [theme.breakpoints.only('xl')]: {
        fontSize: '100%',
      },
    },
    typoButton: {
      marginBottom: 0,
      [theme.breakpoints.only('xs')]: {
        fontSize: '110%',
        paddingRight: '8px'
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '60%',
      },
      [theme.breakpoints.only('md')]: {
        fontSize: '90%',
      },
      [theme.breakpoints.only('lg')]: {
        fontSize: '100%',
      },
      [theme.breakpoints.only('xl')]: {
        fontSize: '100%',
      },
    },
})

class Scream extends Component {
  constructor(props){
    super(props)
    this.state = {
      expanded: false
    }
  }

  shouldComponentUpdate(){
    return false;
  }
    render (){
        dayjs.extend(relativeTime);
      
        const handleExpandClick = () => {
          console.log('this was called')
          this.setState({ expanded: !this.state.expanded })
          console.log(this.state)
        };
        const { classes, trending, scream: { source: {name}, author, title, description, url, urlToImage, publishedAt, content } } = this.props;

        return (
          <Card className={classes.card}>
            <CardMedia
              className={classes.image}
              image={urlToImage?(urlToImage.toLowerCase().includes('https://')?(urlToImage):(urlToImage.toLowerCase().includes('http://')?(urlToImage.toLowerCase().replace('http://','https://')):('https://'+urlToImage))):(noImg)}
              title={"Profile"}
            />
            <CardContent className={classes.content}>
              <Typography
                className={classes.typoTitle}
                variant="h5"
                color="primary"
                component={Link}
                aria-label="Link to headline source"
                to={{ pathname: '/redirect', hash: url }} target="_blank" rel="noopener"
              >
                {title?(title):('This article does not have a title!')}
              </Typography>
              <Typography variant="body2" className={classes.typoSubtitle} color="textSecondary">
                {publishedAt?(dayjs(publishedAt).fromNow()):('')} {name?(' from '+name):('')}{author?(' by '+author.split(',')[0]):('')}
              </Typography>
              <Typography
                className={classes.typoDetails} variant="body1">{description?(description):('')}</Typography>
                <Hidden smDown><br/></Hidden>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <Typography
                className={classes.typoDetails} variant='body2' color='textSecondary' >Some content:</Typography>
                <Typography
                className={classes.typoDetails} paragraph>{content?(content.split('[+')[0]): ('')}</Typography>
            </Collapse>
            <Hidden only='xs'>
              {trending?(
              <Fragment><FlagIcon className={classes.typoButton} color="primary" />
              <span className={classes.link}>:Trending</span></Fragment>):null}
              <span
                className={clsx(classes.expand,classes.link, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={this.state.expanded}
                >
                <MyButton btnClassName={classes.typo} tip="More details..." btnName={title} >
                  <AllOutIcon className={classes.typoButton} color="primary" />
                </MyButton>
                {this.state.expanded?'Minimize':'Take a peek'}
              </span>
              <Link to={{ pathname: '/redirect', hash: url }} target="_blank" rel="noopener" className={classes.link}>
                <MyButton btnClassName={classes.typo} tip="View on original source">
                  <LinkIcon className={classes.typoButton} color="primary" />
                </MyButton>
                Read
              </Link>
              </Hidden>
            </CardContent>
          </Card>
        );
    }
}


export default withSyles(styles)(Scream);