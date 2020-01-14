import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CardHeader from '@material-ui/core/CardHeader';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';

const useStyles = makeStyles({
  card: {
    // minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0',
  },
//   title: {
//     fontSize: 14,
//   },
  noPad: {
    padding: '1px',
  },
  link: {
    color: 'inherit'
  },
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
                <ListItemIcon 
                 className={classes.noPad}><CenterFocusStrongIcon /></ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
                </Link>
                ):(
                <Link  key={index+text} to={{ pathname: `${urlTo}/${text}`, search: search  }}  className={classes.link}>
                <ListItem 
                className={classes.noPad} button key={text}>
                <ListItemIcon 
                 className={classes.noPad}><EditAttributesIcon /></ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
                </Link>
            )))}
        </List>
      </CardContent>
    </Card>
  );
}
