import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Card from '@material-ui/core/Card';
import {Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardHeader from '@material-ui/core/CardHeader';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';

const Theme = createMuiTheme()
const useStyles = makeStyles({
  card: {
    fontFamily: "Playfair Display",
    padding: 0
  },
  bullet: {
    display: 'inline-block',
    margin: '0',
  },
//   title: {
//     fontSize: 14,
//   },
  noPad: {
    padding: 0,
    margin: 0,
  },
  header: {
    fontFamily: "Playfair Display",
    padding: 0,
    margin: 0,
    [Theme.breakpoints.only('sm')]: {
      fontSize:'95%'
    },
  },
  subheader: {
    fontFamily: "Playfair Display",
    padding: 0,
    margin: 0,
    [Theme.breakpoints.only('sm')]: {
      fontSize:'80%'
    }
  },
  thecard: {
    fontFamily: "Playfair Display",
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    margin: 0,
    [Theme.breakpoints.only('xs')]: {
      margin: "2px 4px 2px 2px",
    },
    [Theme.breakpoints.only('sm')]: {
      margin: "1px 2px 1px 1px",
    },
    [Theme.breakpoints.only('md')]: {
      margin: "1px 2px 1px 1px",
    },
    [Theme.breakpoints.only('lg')]: {
      margin: "4px 8px 4px 4px",
    },
    [Theme.breakpoints.only('xl')]: {
      margin: "5px 10px 5px 5px",
    },
  },
  link: {
    fontFamily: "Playfair Display",
    padding: 0
  },
  icon:{
    color: "#2D283E",
  },
  bulletText: {
    color: "rgba(37, 30, 30, 1)",
    [Theme.breakpoints.only('xs')]: {
      padding: "0 0 0 0",
    },
    [Theme.breakpoints.only('sm')]: {
      fontSize: "80%",
      margin:'0 0 0 2px',
      padding:'0 0 0 2px',
    },
    [Theme.breakpoints.only('md')]: {
      fontSize: "95%",
      margin:'0 0 0 5px',
      padding:'0 0 0 5px',
    },
    [Theme.breakpoints.only('lg')]: {
      margin:'0 0 0 8px',
      padding:'0 0 0 8px',
    },
    [Theme.breakpoints.only('xl')]: {
      margin:'0 0 0 10px',
      padding:'0 0 0 10px',
    },
  },
});

export default function SimpleCard({category,country,urlTo,search}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{title: classes.header, subheader: classes.subheader}} 
          title='Categories:'
          subheader={`Current: ${category}`}
      />
      <CardContent 
        className={classes.thecard}>
        <List 
        className={classes.noPad}>
            {['general','entertainment','business','health','science','sports','technology'].map((text, index) => (
                text === category?(
                <Link  key={index+text} href={`${urlTo}/${text}`} to={{ pathname: `${urlTo}/${text}`, search: search }}  className={classes.link}>
                <ListItem
                className={classes.noPad} button key={text}>
                <CenterFocusStrongIcon className={classes.icon} />
                <ListItemText classes={{primary:classes.bulletText}} primary={text} />
                </ListItem>
                </Link>
                ):(
                <Link  key={index+text} href={`${urlTo}/${text}`} to={{ pathname: `${urlTo}/${text}`, search: search  }}  className={classes.link}>
                <ListItem 
                className={classes.noPad} button key={text}>
                <EditAttributesIcon className={classes.icon} />
                <ListItemText classes={{primary:classes.bulletText}} primary={text} />
                </ListItem>
                </Link>
            )))}
        </List>
      </CardContent>
    </Card>
  );
}
