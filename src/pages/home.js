import React , { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import withSyles from '@material-ui/core/styles/withStyles';
//Components
import Scream from '../components/Scream';
import Categories from '../components/Categories';
import Countries from '../components/Countries';
import NewsSkeleton from '../components/NewsSkeleton';
import Hidden from '@material-ui/core/Hidden';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

// mui stuff
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('9047eaa819904eb49205d2d53ab54356');
var networkDataReceived = false;
    
const styles = () => ({
    alert: {
        width: "100%",
        textAlign: "center"
    },
    button: {
      textAlign:'center',
      width:'100%',
      margin:'auto'
    },
    buttonProgress: {
      position: 'relative',
      textAlign:'center',
      width:'100%',
      margin:'auto',
      left:'45%'
    },
  });

class home extends Component {
    constructor(props){
        super(props);
        this.state = {
            moreLoading: false,
            loading: true,
            error: false,
            theError: '',
            news: [],
            page: 1,
            cachePage: 1
        }
    }
    
    fetchOnline = () =>{
        return newsapi.v2.topHeadlines({
        language: 'en',
        // sortBy: 'popularity',
        // from: new Date(new Date().getTime() - (48 * 60 * 60 * 1000)).toISOString(),
        // to: new Date().toISOString(),
        page: this.state.page
        }).then(response => {
            if(response.status === 'ok'){
                networkDataReceived = true;
                this.setState({
                    loading: false,
                    error: false,
                    page: this.state.page+1,
                    news: response.articles
                })
            } else{
                this.setState({
                    error: true,
                    theError: "Sorry! Problem loading new headlines!"
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            this.setState({
                error: true,
                theError: "Offline: Turn on data for latest headlines."
            })
        });
    }
    UNSAFE_componentWillMount(){
        // fetch cached data
        const This = this;
        console.log("This was invoked, func!")
        caches.open('mysite-dynamic').then((cache)=>{
        console.log("This was invoked, cache!")
            cache.match('https://newsapi.org/v2/top-headlines?language=en&page='+this.state.cachePage,{ignoreMethod:true,ignoreVary:true})
            .then(function(res) {
                if (!res) throw Error("No data");
                console.log("we got the good stuff")
                return res.json();
            }).then(function(response) {
                console.log(response)
                // don't overwrite newer network data
                if (!networkDataReceived) {
                    console.log("the state was set")
                    This.setState({
                        loading: false,
                        cachePage: This.state.cachePage+1,
                        news: response.articles
                    })
                    console.log(This.state.news)
                }
            }).catch((err)=> {
                return console.log(err)
            })
        }).catch(err=>{
            console.log(err)
            console.log("we got nothing there")
            This.setState({
                error: true,
                theError: "Sorry! Problem loading new headlines!"
            })
        })
    }
    componentDidMount(){
        console.log('Home did mount')
        return this.fetchOnline();
    }
    addMoreHeadlines = () =>{
        this.setState({moreLoading: true})
        const This = this;
        return newsapi.v2.topHeadlines({
            language: 'en',
            page: this.state.page
            }).then(response => {
                if(response.status === 'ok'){
                    networkDataReceived = true;
                    this.setState({
                        moreLoading: false,
                        error: false,
                        page: this.state.page+1,
                        news: this.state.news.concat(response.articles)
                    })
                } else{
                    this.setState({
                        moreLoading: false,
                        error: true,
                        theError: "Sorry! Problem loading new headlines!"
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
                if(this.state.theError === "Offline: Turn on data for latest headlines."){
                    caches.match('https://newsapi.org/v2/top-headlines?language=en&page='+this.state.cachePage,{ignoreMethod:true,ignoreVary:true})
                    .then(function(res) {
                        if (!res) throw Error("No data");
                        console.log("we got the good stuff")
                        return res.json();
                    }).then(function(response) {
                        console.log(response)
                        // don't overwrite newer network data
                        if (!networkDataReceived) {
                            console.log("the state was set")
                            This.setState({
                                moreLoading: false,
                                cachePage: This.state.cachePage+1,
                                news: This.state.news.concat(response.articles)
                            })
                            console.log(This.state.news)
                        }
                    }).catch(err=> {
                        this.setState({
                            moreLoading: false
                        })
                        return console.log(err)
                    })
                } else {
                    this.setState({
                        moreLoading: false,
                        error: true,
                        theError: "Sorry! Problem loading new headlines!"
                    })
                }
            });
    }
    render (){
        const {classes} = this.props;
        const { loading, news, error, theError, moreLoading } = this.state;
        let moreButton = moreLoading?(
            <Fragment>
                <Button
                variant="outlined"
                color="primary"
                disabled={true}
                endIcon={<ExpandMoreIcon />}
                className={classes.button}
                >
                Load more headlines
                </Button>
                <CircularProgress color='primary' size={24} className={classes.buttonProgress} />
            </Fragment>
        ):(
            <Button
              variant="outlined"
              color="primary"
              endIcon={<ExpandMoreIcon />}
              onClick={this.addMoreHeadlines}
              className={classes.button}
            >
              Load more headlines
            </Button>
            );
        let fetchError = error?(<Alert className={classes.alert} elevation={6} variant="filled" severity="warning">{theError}</Alert>):null;
        let recentScreamMarkUp = !loading?news.map((scream,ind)=><Scream key={`${scream.title}${ind}`} scream={scream} trending={true} />):(<NewsSkeleton />)
        return (
            <Grid container spacing={1}>
                {fetchError}
                <Grid item md={10} sm={9} xs={12}>
                    {recentScreamMarkUp}
                    {moreButton}
                </Grid>
                <Hidden xsDown>
                    <Grid  item md={2} sm={3} xs={12}>
                        <Categories category='All' country='All' urlTo='/category' />
                        <Countries country='All' category='All'  urlTo='/country' />
                    </Grid>
                </Hidden>
            </Grid>
        )
    }
}

export default withSyles(styles)(home);