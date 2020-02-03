import React from "react";
import { BrowserRouter as Router, Switch, withRouter, Route, Link } from "react-router-dom";
import "./App.css";
import mainTheme from './util/mainTheme';
// MUI stufff
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//pages
import home from "./pages/home";
import redirect from "./pages/redirect";
import results from "./pages/results";
import category from "./pages/category";
import country from "./pages/country";

//Components
import Navbar from "./components/Navbar";

//mui stuff
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: "100%",
  },
  list: {
    width: 250,
  },
  icon:{
    color: "rgba(74, 226, 184, 0.98)",
  },
  bulletText: {
    color: "rgba(37, 30, 30, 1)",
  },
  catheader: {
    padding: '3px 0 0 10px'
  }
}));

const theme = createMuiTheme(mainTheme);

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <Typography variant='body2' className={classes.catheader}>Categories:</Typography>
      <List 
        className={classes.noPad}>
            {['general','entertainment','business','health','science','sports','technology'].map((text, index) => (
                text === category?(
                <Link  key={index+text} to={{ pathname: `/category/${text}` }}  className={classes.link}>
                <ListItem
                className={classes.noPad} button key={text}>
                <CenterFocusStrongIcon className={classes.icon} />
                <ListItemText classes={{primary:classes.bulletText}} primary={text} />
                </ListItem>
                </Link>
                ):(
                <Link  key={index+text} to={{ pathname: `/category/${text}` }}  className={classes.link}>
                <ListItem 
                className={classes.noPad} button key={text}>
                <EditAttributesIcon className={classes.icon} />
                <ListItemText classes={{primary:classes.bulletText}} primary={text} />
                </ListItem>
                </Link>
            )))}
        </List>
        <Divider/>
      {/* <Typography variant='body2' className={classes.catheader}>Countries:</Typography> */}
      {/* <List 
        className={classes.noPad}>
            {countryArray.map((text) => (
                <Link  key={text} to={{ pathname: `/country/${text}` }}  className={classes.link}>
                <ListItem  className={classes.noPad}>
                <ListItemText classes={{primary:classes.bulletText}} primary={text} />
                </ListItem>
                </Link>
            ))}
        </List> */}
    </div>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <Navbar newClass={classes.appBar} openDrawer={toggleDrawer('right', true)}/>
          <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
            {sideList('right')}
          </Drawer>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />   
              <Route exact path="/redirect" component={redirect} />   
              <Route exact path="/results/:param1?/:param2?" component={results} />   
              <Route exact path="/country/:name/:title?" component={country} />   
              <Route exact path="/category/:title/:name?" component={category} />   
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default withRouter(App);
