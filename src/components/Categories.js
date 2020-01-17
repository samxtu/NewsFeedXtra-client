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
    color: 'inherit',
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
    color: 'inherit',
    padding: 0
  },
  bulletText: {
    fontSize: "80%",
    [Theme.breakpoints.only('xs')]: {
      padding: "0 0 0 0",
    },
    [Theme.breakpoints.only('sm')]: {
      padding: "0 0 0 0",
    },
    [Theme.breakpoints.only('md')]: {
      padding: "0 0 0 0",
    },
    [Theme.breakpoints.only('lg')]: {
      padding: "0 0 0 0",
    },
    [Theme.breakpoints.only('xl')]: {
      padding: "0 0 0 0",
    },
  }
});

export default function SimpleCard({category,country,urlTo,search}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.noPad}
        title="Categories:"
        subheader="Current: All categories"
      />
      <CardContent 
        className={classes.noPad}>
        <List 
        className={classes.noPad}>
            {['general','entertainment','business','health','science','sports','technology'].map((text, index) => (
                text === category?(
                <Link  key={index+text} to={{ pathname: `${urlTo}/${text}`, search: search }}  className={classes.link}>
                <ListItem
                className={classes.noPad} button key={text}>
                <CenterFocusStrongIcon className={classes.noPad} />
                <ListItemText className={classes.bulletText} primary={text} />
                </ListItem>
                </Link>
                ):(
                <Link  key={index+text} to={{ pathname: `${urlTo}/${text}`, search: search  }}  className={classes.link}>
                <ListItem 
                className={classes.noPad} button key={text}>
                <EditAttributesIcon className={classes.noPad} />
                <ListItemText  className={classes.bulletText} >{text}</ListItemText>
                </ListItem>
                </Link>
            )))}
        </List>
      </CardContent>
    </Card>
  );
}
