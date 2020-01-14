import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import withSyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
// mui icons 

const styles = theme => ({
    ...theme.common,
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
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
  // UNSAFE_componentWillReceiveProps(nextProps){
  //   if(nextProps){
  //     this.setState({
  //       search: nextProps.location.search.split('?')[1]
  //     })
  //   }
  // }
  
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
        const { newClass, classes } = this.props;
        const { search } = this.state;
        
        return (
            <AppBar className={newClass}>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/"><h2>World news</h2></Button>
                    <form className={classes.search} onSubmit={this.submitSearch}>
                        <Link id='linktores' to={{ pathname:'/results', search: search, state: {details:{}} }} />
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                        name='search'
                        value={search}
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
        )
    }
}

export default withSyles(styles)(Navbar);