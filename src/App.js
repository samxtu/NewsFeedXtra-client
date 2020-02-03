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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

const countryArray = [
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AT', label: 'Austria', phone: '43' },
  { code: 'AU', label: 'Australia', phone: '61', suggested: true },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BG', label: 'Bulgaria', phone: '1-242' },
  { code: 'CA', label: 'Canada', phone: '1', suggested: true },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  { code: 'DE', label: 'Germany', phone: '49', suggested: true },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'FR', label: 'France', phone: '33', suggested: true },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GR', label: 'Greece', phone: '30' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IN', label: 'India', phone: '91' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JP', label: 'Japan', phone: '81', suggested: true },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PL', label: 'Poland', phone: '48' },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'US', label: 'United States', phone: '1', suggested: true },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  { code: 'ZA', label: 'South Africa', phone: '27' }
];




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
