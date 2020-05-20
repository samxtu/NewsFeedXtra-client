import React from "react";
import { BrowserRouter as Router, Switch, withRouter, Route, 
  // Link
 } from "react-router-dom";
import "./App.css";
import mainTheme from './util/mainTheme';
// MUI stufff
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import MenuOpenIcon from '@material-ui/icons/MenuOpen';

//pages
import home from "./pages/home";
import topStories from "./pages/topStories";
import redirect from "./pages/redirect";
import results from "./pages/results";
import category from "./pages/category";
import country from "./pages/country";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollUp from "./components/ScrollUp";
//mui stuff
import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import EditAttributesIcon from '@material-ui/icons/EditAttributes';
// import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
// import countryArray from './util/consts';

// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: "100%",
  },
  // list: {
  //   width: 250,
  // },
  // countryButton:{
  //   borderColor: "#2D283E",
  //   borderStyle:"block"
  // },
  // icon:{
  //   color: "#2D283E",
  // },
  // bulletText: {
  //   color: "rgba(37, 30, 30, 1)",
  // },
  // catheader: {
  //   padding: '3px 0 0 10px'
  // },
  // drawer: {
  //   flexShrink: 0,
  // },
  // drawerPaper: {
  //   width: drawerWidth,
  // },
  // drawerHeader: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: theme.spacing(0, 1),
  //   ...theme.mixins.toolbar,
  //   justifyContent: 'flex-end',
  // },
}));

const theme = createMuiTheme(mainTheme);

function App() {
  const classes = useStyles();
  // const [straight, setState] = React.useState(false);
  const myCountry = localStorage.myCountry;
  if(!myCountry || myCountry === 'undefined'){
    fetch(`http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IPSTACK_API_KEY}`)
    .then(res =>{
     res.json().then(data=>{
      localStorage.setItem('myCountry',data.country_code)
     })
    })
  }
  // let urlToCategory = (window.location.href.split('?')[0].includes("category/") === true)?
  // ('/category'):(
  //  (window.location.href.split('?')[0].includes("country/") === true)?
  //  `/country/${window.location.href.split('?')[0].split('country/')[1].split('/')[0]}`
  // :(
  //   (window.location.href.split('?')[0].includes('results') === true)?(
  //     (window.location.href.split('?')[0].includes('results/') === true)?(
  //       (window.location.href.split('?')[0].split('results/')[1].split('/')[0].length !== 2)?(
  //         (window.location.href.split('?')[0].split('results/')[1].split('/')[1] !== null)?(
  //            `/results/${window.location.href.split('?')[0].split('results/')[1].split('/')[1]}` 
  //          ):  `/results` 
  //        ):  `/results/${window.location.href.split('?')[0].split('results/')[1].split('/')[0]}` 
  //   ) :  `/results` 
  // ):(window.location.href.split('?')[0].includes("/top-stories")?
  // '/top-stories': '/category')));
  // let urlToCountry = (window.location.href.split('?')[0].includes("country/") === true)?
  // ('/country'):(
  //  (window.location.href.split('?')[0].includes("category/") === true)?
  //  `/country`:((window.location.href.split('?')[0].includes('results') === true)?(
  //     (window.location.href.split('?')[0].includes('results/') === true)?(
  //       (window.location.href.split('?')[0].split('results/')[1].split('/')[0].length === 2)?(
  //         (window.location.href.split('?')[0].split('results/')[1].split('/')[1] !== null)?(
  //            `/results/${window.location.href.split('?')[0].split('results/')[1].split('/')[1]}` 
  //          ):  `/results` 
  //        ):  `/results/${window.location.href.split('?')[0].split('results/')[1].split('/')[0]}` 
  //   ) :  `/results` 
  // ):'/country'));
  // let search = window.location.href.split('?')[1];
  // const [pop, setCountryDrawerOpen] = React.useState(false);
  // const [ready, setReady] = React.useState(false);
  // const toggleDrawer = (side, open) => event => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   if(open===true) funcToStore()
  //   setState( open );
  // };
  
  // const handleDrawerOpen = () => {
  //   setCountryDrawerOpen(true);
  //   setTimeout(function() {
  //     setReady(true)
  //   }, 100);
  // };

  // const handleDrawerClose = () => {
  //   setCountryDrawerOpen(false);
  //   setReady(false)
  // };

  

  // const handleClickAway = () => {
  //   if(pop === true && ready === true) handleDrawerClose();
  // };

  // const sideList = side => (
  //   <div
  //     className={classes.list}
  //     role="presentation"
  //     onClick={toggleDrawer(side, false)}
  //     onKeyDown={toggleDrawer(side, false)}
  //   >
  //     <Typography variant='body2' className={classes.catheader}>Categories:</Typography>
  //     <List 
  //       className={classes.noPad}>
  //           {['general','entertainment','business','health','science','sports','technology'].map((text, index) => (
  //               text === category?(
  //               <Link  key={index+text} to={{ pathname: urlToCategory+`/${text}`, search: search }}  className={classes.link}>
  //               <ListItem
  //               className={classes.noPad} button key={text}>
  //               <CenterFocusStrongIcon className={classes.icon} />
  //               <ListItemText classes={{primary:classes.bulletText}} primary={text} />
  //               </ListItem>
  //               </Link>
  //               ):(
  //               <Link  key={index+text} to={{ pathname: urlToCategory+`/${text}`, search: search }}  className={classes.link}>
  //               <ListItem 
  //               className={classes.noPad} button key={text}>
  //               <EditAttributesIcon className={classes.icon} />
  //               <ListItemText classes={{primary:classes.bulletText}} primary={text} />
  //               </ListItem>
  //               </Link>
  //           )))}
  //       </List>
  //       <Divider/>
  //       <Typography variant='body2' className={classes.catheader}>Countries:</Typography>
  //           <List>
  //               <ListItem
  //                aria-label="Countries" 
  //                name="countryButton" 
  //                id="countryButton" 
  //                onClick={handleDrawerOpen}
  //                button key="countryButton"
  //                className={classes.countryButton}>
  //                  <MenuOpenIcon className={classes.icon} />
  //                 <ListItemText primary={"Choose a country"} />
  //               </ListItem>
  //           </List>
  //   </div>
  // );
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <Navbar newClass={classes.appBar}
          //  approp={{
          //   urlToCategory,
          //   urlToCountry,
          //   search
          // }} 
          // activateListener={funcToStore}//
          // openDrawer={toggleDrawer('left', true)}
          />
          {/* <Drawer anchor="left" open={straight} onClose={toggleDrawer('left', false)}>
            {sideList('left')}
          </Drawer>
          
          <ClickAwayListener onClickAway={ handleClickAway }>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="top"
            open={pop}
            ModalProps={{ onBackdropClick: handleDrawerClose }}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <Button onClick={handleDrawerClose}>Close</Button>
            </div>
            <Divider />
            <List>
              {countryArray.map((text) => (
                <ListItem
                onClick={handleDrawerClose}
                component={Link}
                to={{ pathname: `${urlToCountry}/${text.code.toLowerCase()}`, search: search }}
                 button key={text.label}>
                  <ListItemIcon><Typography color="primary">{text.code}</Typography></ListItemIcon>
                  <ListItemText primary={text.label} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          </ClickAwayListener> */}
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />   
              <Route exact path="/top-stories/:title?" component={topStories} />   
              <Route exact path="/redirect" component={redirect} />   
              <Route exact path="/results/:param1?/:param2?" component={results} />   
              <Route exact path="/country/:name/:title?" component={country} />   
              <Route exact path="/category/:title" component={category} />   
            </Switch>
            <ScrollUp />
            <Footer />
            </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default withRouter(App);