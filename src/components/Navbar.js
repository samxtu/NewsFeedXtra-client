import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import withSyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// mui icons 

const styles = theme => ({
    ...theme.common, 
    root: {
      flexGrow: 1,
    },
  menuButton: {
    marginRight: 0
  },
  search: {
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
  
class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: '',
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
        const { newClass, classes, openDrawer } = this.props;
        const { search } = this.state;
        
        return (
          <div className={classes.root}>
            <AppBar className={newClass}>
                <Toolbar className="nav-container">
                  <Hidden smUp>
                  <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="open drawer"
                      onClick={openDrawer}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Hidden>
                    <Link aria-label="Link to website homepage" className={classes.navhomelink} to="/"><h2>NewsFasta</h2></Link>
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
                </Toolbar>
            </AppBar>
        </div>
        )
    }
}

export default withSyles(styles)(Navbar);