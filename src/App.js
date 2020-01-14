import React from "react";
import { BrowserRouter as Router, Switch, withRouter } from "react-router-dom";
import "./App.css";
import mainTheme from './util/mainTheme';
import {Route} from 'react-router-dom';
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    position: 'fixed',
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
  }
}));


const theme = createMuiTheme(mainTheme);


function App() {
  const classes = useStyles();
  
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <Navbar navatarClass={classes.navatar} newClass={classes.appBar} />
        
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
