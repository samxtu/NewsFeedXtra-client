import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import withSyles from '@material-ui/core/styles/withStyles';

const styles = (theme)=> ({
  root: {
    position: 'fixed',
    right:'10px',
    bottom: '10px'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

class ScrollUp extends Component {
 constructor(props){
     super(props)
     this.state = {
         visible: false
     }
 }
 componentDidMount(){
  const  This = this
  document.addEventListener("scroll", function(e) {
    if(window.pageYOffset > 300) This.setState({visible: true})
    else This.setState({visible: false})
  });
}
  render(){
    const {visible} = this.state;
    const {classes} = this.props;
    const scrollToTop = () =>{
      window.scrollTo(0, 0)
    }
    return (visible?(<Fab onClick={scrollToTop} color='primary' variant="extended" className={classes.root}>
        <UpIcon className={classes.extendedIcon} />
        <b>Top</b>
      </Fab>):null)
  }
}

export default withSyles(styles)(ScrollUp)
