import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import countryArray from '../util/consts';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import withSyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
// import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
// mui icons 

const styles = theme => ({
    ...theme.common, 
    root: {
      fontFamily: "Playfair Display",
      flexGrow: 1,
    },
  // menuButton: {
  //   marginRight: 0
  // },
  toolbar:{
    marginRight: '1%'
  },
  toolbar2:{
    minHeight: '36.5px'
  },
  mobileBtn:{
    width: '49%'
  },
  search: {
    fontFamily: "Playfair Display",
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    paddingLeft: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.only('xs')]: {
      marginLeft: theme.spacing(0.5),
      width: 'auto',
      height: '80%'
    },
    [theme.breakpoints.only('sm')]: {
      marginLeft: theme.spacing(0.5),
      width: 'auto',
      height: '85%'
    },
    [theme.breakpoints.only('md')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      height: '90%'
    },
    [theme.breakpoints.only('lg')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      height: '95%'
    },
    [theme.breakpoints.only('xl')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      height: '100%'
    },
  },
  searchIcon: {
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(3),
      height: '100%',
      top:'0%',
      margin: 0
    },
    [theme.breakpoints.only('sm')]: {
      width: theme.spacing(4),
      height: '100%',
      top:'0%',
      margin: 'auto'
    },
    [theme.breakpoints.only('md')]: {
      width: theme.spacing(5),
      height: '100%',
      top:'0%',
      margin: 'auto'
    },
    [theme.breakpoints.only('lg')]: {
      width: theme.spacing(6),
      height: '100%',
      top:'0%',
      margin: 'auto'
    },
    [theme.breakpoints.only('xl')]: {
      width: theme.spacing(7),
      height: '100%',
      top:'0%',
      margin: 'auto'
    },
  },
  inputRoot: {
    fontFamily: "Playfair Display",
    color: 'inherit',
    [theme.breakpoints.only('xs')]: {
      height:'90%'
    },
    [theme.breakpoints.only('sm')]: {
      height: '70%'
    },
    [theme.breakpoints.only('md')]: {
      height: '80%'
    },
    [theme.breakpoints.only('lg')]: {
      height: '90%'
    },
    [theme.breakpoints.only('xl')]: {
      height: '100%'
    },
  },
  navhomelink: {
    fontFamily: "Playfair Display",
    color: 'inherit',
    [theme.breakpoints.only('xs')]: {
      fontSize: '70%'
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: '70%'
    },
    [theme.breakpoints.only('md')]: {
      fontSize: '80%'
    },
    [theme.breakpoints.only('lg')]: {
      fontSize: '90%'
    },
    [theme.breakpoints.only('xl')]: {
      fontSize: '100%'
    },
  },
  inputInput: {
    fontFamily: "Playfair Display",
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1, 1, 1, 3),
      marginTop:1,
      height: '100%',
      fontSize: '100%',
      width: 120,
      '&:focus': {
        width: 150,
      },
    },
    [theme.breakpoints.only('sm')]: {
      padding: theme.spacing(1, 1, 1, 4),
      height: '85%',
      fontSize: '85%',
      width: 90,
      '&:focus': {
        width: 140,
      },
    },
    [theme.breakpoints.only('md')]: {
      padding: theme.spacing(1, 1, 1, 5),
      height: '90%',
      fontSize: '90%',
      width: 100,
      '&:focus': {
        width: 160,
      },
    },
    [theme.breakpoints.only('lg')]: {
      padding: theme.spacing(1, 1, 1, 6),
      height: '95%',
      fontSize: '95%',
      width: 140,
      '&:focus': {
        width: 180,
      },
    },
    [theme.breakpoints.only('xl')]: {
      padding: theme.spacing(1, 1, 1, 7),
      height: '100%',
      fontSize: '100%',
      width: 160,
      '&:focus': {
        width: 200,
      },
    },
  },
})
const categoriesArray = [
  {
      id: 'general',
      sources: 'abc-news,al-jazeera-english,associated-press,axios,bbc-news,cbc-news,cbs-news,cnn,fox-news,google-news,google-news-au,google-news-ca,google-news-in,google-news-uk,independent,nbc-news,news24,newsweek,reuters,the-huffington-post'
  },{
      id:'business',
      sources: 'australian-financial-review,bloomberg,business-insider,business-insider-uk,cnbc,financial-post,the-wall-street-journal,fortune'
  },{
      id:'entertainment',
      sources: 'buzzfeed,entertainment-weekly,ign,mashable,mtv-news,mtv-news-uk,polygon,the-lad-bible'
  },{
      id:'health',
      sources:'medical-news-today'
  },{
      id:'sports',
      sources: 'bbc-sport,bleacher-report,espn,espn-cric-info,football-italia,four-four-two,fox-sports,nfl-news,nhl-news,talksport,the-sport-bible'
  },{
      id:'science',
      sources:'national-geographic,new-scientist,next-big-future'
  },{
      id:'technology',
      sources: 'ars-technica,crypto-coins-news,engadget,hacker-news,recode,techcrunch,techradar,the-next-web,the-verge,wired'
  }
]
const ITEM_HEIGHT = 48;
var urlToCategory='';
var urlToCountry='';

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: '',
      anchorEl1: null,
      anchorEl2: null,
      redirect: false
    }
  }
  componentDidMount(){
    this.setState({
      search: window.location.search.split('?')[1]
    })
  }
  
  submitSearch = (e) => {
    e.preventDefault()
    if(!this.state.search){}
    else document.getElementById('linktores').click()
  }
  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }
    render (){
        const { newClass, classes, 
          // openDrawer,
          // activateListener,
          //  approp: {urlToCategory, urlToCountry} 
          } = this.props;
        const { search, anchorEl1, anchorEl2 } = this.state;
        
  const isMenu1Open = Boolean(anchorEl1);
  const isMenu2Open = Boolean(anchorEl2);
  const funcToStore = ()=>{
    urlToCategory = (window.location.href.split('?')[0].includes("category/") === true)?
   ('/category'):(
    (window.location.href.split('?')[0].includes("country/") === true)?
    `/country/${window.location.href.split('?')[0].split('country/')[1].split('/')[0]}`
   :((window.location.href.split('?')[0].includes('results') === true)?(
       (window.location.href.split('?')[0].includes('results/') === true)?(
         (window.location.href.split('?')[0].split('results/')[1].split('/')[0].length === 2)?
          `/results/${window.location.href.split('?')[0].split('results/')[1].split('/')[0]}`: 
          (window.location.href.split('?')[0].split('results/')[1].split('/')[1]?(
              `/results/${window.location.href.split('?')[0].split('results/')[1].split('/')[1]}` 
            ): `/results` ) ) : `/results` ):(window.location.href.split('?')[0].includes("/top-stories")?
             '/top-stories': '/category')));
    urlToCountry = (window.location.href.split('?')[0].includes("country/") === true)?
   ('/country'):( (window.location.href.split('?')[0].includes("category/") === true)?
    `/country`:((window.location.href.split('?')[0].includes('results') === true)?(
       (window.location.href.split('?')[0].includes('results/') === true)?(
         (window.location.href.split('?')[0].split('results/')[1].split('/')[0].length === 2)?(
           (window.location.href.split('?')[0].split('results/')[1].split('/')[1])?(
              `/results/${window.location.href.split('?')[0].split('results/')[1].split('/')[1]}` 
            ):  `/results` ):  `/results/${window.location.href.split('?')[0].split('results/')[1].split('/')[0]}` 
            ) :  `/results`  ):'/country'));
 }
  const handleProfileMenu1Open = (event) => {
    funcToStore()
    this.setState({anchorEl1: event.currentTarget})
  };
  const handleProfileMenu2Open = (event) => {
    funcToStore()
    this.setState({anchorEl2: event.currentTarget})
  };
  const handleMenu1Close = () => {
    this.setState({anchorEl1: null})
  };
  const handleMenu2Close = () => {
    this.setState({anchorEl2: null})
  };

        const menu1Id = 'categories-menu';
        const menu2Id = 'countries-menu';
        const renderMenu1 = (
          <Menu
            anchorEl={anchorEl1}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menu1Id}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenu1Open}
            onClose={handleMenu1Close}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 8,
                width: '100%',
                textAlign:'center',
                marginTop: '50px'
              },
            }}
          >
            {categoriesArray.map(category=>(
              <MenuItem component={Link} href={`${urlToCategory}/${category.id}`} to={{ pathname: `${urlToCategory}/${category.id}`, search: search }} onClick={handleMenu1Close}>{category.id}</MenuItem>
            ))}
          </Menu>
        );
        const renderMenu2 = (
          <Menu
            anchorEl={anchorEl2}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menu2Id}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenu2Open}
            onClose={handleMenu2Close}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 8,
                width: '100%',
                textAlign:'center',
                marginTop: '50px'
              },
            }}
          >
            {countryArray.map(country=>(
              <MenuItem component={Link} href={`${urlToCountry}/${country.code.toLowerCase()}`} to={{pathname: `${urlToCountry}/${country.code.toLowerCase()}`, search: search }} onClick={handleMenu2Close}>{country.label}</MenuItem>
            ))}
          </Menu>
        );
        return (
          <div className={classes.root}>
            <AppBar className={newClass}>
                <Toolbar className={classes.toolbar}>
                  {/* <Hidden smUp>
                  <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="open drawer"
                      onClick={openDrawer}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Hidden> */}
                    <Link aria-label="Link to website homepage" className={classes.navhomelink} href='/' to="/"><h2>NewsFeedXtra</h2></Link>
                    <form className={classes.search} onSubmit={this.submitSearch}>
                        <Link aria-label="Link to search results" id='linktores' to={{ pathname:'/results', search: search, state: {details:{}} }} />
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                        name='search'
                        value={search  || ''}
                        onChange={this.handleChange}
                        placeholder="Search for articles…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </form>
                    <Hidden xsDown>
                    <span style={{flexGrow: 1}}></span>
                    <Button
                      variant="contained" 
                      color="primary"
                      edge="end"
                      aria-label="news categories"
                      aria-controls={menu1Id}
                      aria-haspopup="true"
                      onClick={handleProfileMenu1Open}
                      disableElevation
                    >
                      Categories
                    </Button>
                    <Button
                      variant="contained" 
                      color="primary"
                      edge="end"
                      aria-label="Covered countries"
                      aria-controls={menu2Id}
                      aria-haspopup="true"
                      onClick={handleProfileMenu2Open}
                      disableElevation
                    >
                      Countries
                    </Button>
                    </Hidden>
                </Toolbar>
                <Hidden smUp>
                <Toolbar className={classes.toolbar2}>
                    <Button
                      variant="contained" 
                      color="primary"
                      edge="end"
                      aria-label="news categories"
                      aria-controls={menu1Id}
                      aria-haspopup="true"
                      onClick={handleProfileMenu1Open}
                      disableElevation
                      className={classes.mobileBtn}
                    >
                      Categories
                    </Button>
                    <Button
                      variant="contained" 
                      color="primary"
                      edge="end"
                      aria-label="Covered countries"
                      aria-controls={menu2Id}
                      aria-haspopup="true"
                      onClick={handleProfileMenu2Open}
                      disableElevation
                      className={classes.mobileBtn}
                    >
                      Countries
                    </Button>
                </Toolbar>
                </Hidden>
            </AppBar>
            {renderMenu1}
            {renderMenu2}
        </div>
        )
    }
}

export default withSyles(styles)(Navbar);