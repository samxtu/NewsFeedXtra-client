import React , { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import withSyles from '@material-ui/core/styles/withStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
//Components
import Scream from '../components/Scream';
import Categories from '../components/Categories';
import Countries from '../components/Countries';
import NewsSkeleton from '../components/NewsSkeleton';
import Hidden from '@material-ui/core/Hidden';
// mui stuff
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('9047eaa819904eb49205d2d53ab54356');
    
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

class category extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            page: 1,
            cachePage: 1,
            moreLoading: false,
            news: [],
            error: false,
            theError: '',
            category: this.props.match.params.title,
            country: 'All',
            props: {}
        }
    }
    
    componentDidMount(){
        console.log('category did mount')
        var networkDataReceived = false;
        this.setState({
            category: this.props.match.params.title,
            country: this.props.match.params.name?this.props.match.params.name:'All',
            props: this.props
        })
        if(this.props.match.params.name){
            //fetch fresh data
            newsapi.v2.topHeadlines({
                category: this.props.match.params.title,
                country: this.props.match.params.name,
                page: this.state.page
              }).then(response => {
                if(response.status === 'ok'){
                    this.setState({
                        loading: false,
                        page: this.state.page+1,
                        news: response.articles
                    })
                }  else{
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
            
        const This = this;
        // fetch cached data
        caches.match(`https://newsapi.org/v2/top-headlines?category=${this.props.match.params.title}&country=${this.props.match.params.name}&page=${this.state.cachePage}`).then(function(res) {
            if (!res) throw Error("No data");
            return res.json();
        }).then(function(response) {
            // don't overwrite newer network data
            if (!networkDataReceived) {
                This.setState({
                    loading: false,
                    cachePage: This.state.cachePage+1,
                    news: response.articles
                })
            }
        }).catch(err=>{
            console.log(err)
        })
        } else {
            newsapi.v2.topHeadlines({
                category: this.props.match.params.title,
                page: this.state.page
              }).then(response => {
                if(response.status === 'ok'){
                    this.setState({
                        loading: false,
                        page: this.state.page+1,
                        news: response.articles
                    })
                }  else{
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
            
            const This = this;
        // fetch cached data
        caches.match(`https://newsapi.org/v2/top-headlines?category=${this.props.match.params.title}&page=${this.state.cachePage}`).then(function(res) {
            if (!res) throw Error("No data");
            return res.json();
        }).then(function(response) {
            // don't overwrite newer network data
            if (!networkDataReceived) {
                This.setState({
                    loading: false,
                    cachePage: This.state.cachePage+1,
                    news: response.articles
                })
            }
        }).catch(err=>{
            console.log(err)
        })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.props.match.params.title !== nextProps.match.params.title || this.state.props.match.params.name !== nextProps.match.params.name){
            var networkDataReceived = false;
            this.setState({page:1,cachePage:1,props:nextProps})
            if(nextProps.match.params.name){
                this.setState({
                    category: nextProps.match.params.title,
                    country: nextProps.match.params.name
                })
                newsapi.v2.topHeadlines({
                    category: nextProps.match.params.title,
                    country: nextProps.match.params.name,
                    page: this.state.page
                  }).then(response => {
                    if(response.status === 'ok'){
                        this.setState({
                            loading: false,
                            page: this.state.page+1,
                            news: response.articles
                        })
                    }  else{
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
                
            const This = this;
            // fetch cached data
            caches.match(`https://newsapi.org/v2/top-headlines?category=${nextProps.match.params.title}&country=${nextProps.match.params.name}&page=${this.state.cachePage}`).then(function(res) {
                if (!res) throw Error("No data");
                return res.json();
            }).then(function(response) {
                // don't overwrite newer network data
                if (!networkDataReceived) {
                    This.setState({
                        loading: false,
                        cachePage: This.state.cachePage+1,
                        news: response.articles
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
            } else {
                this.setState({
                    category: nextProps.match.params.title
                })
                newsapi.v2.topHeadlines({
                    category: nextProps.match.params.title,
                    page: this.state.page
                  }).then(response => {
                    if(response.status === 'ok'){
                        this.setState({
                            loading: false,
                            page: this.state.page+1,
                            news: response.articles
                        })
                    }  else{
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
                
            const This = this;
            // fetch cached data
            caches.match(`https://newsapi.org/v2/top-headlines?category=${nextProps.match.params.title}&page=${this.state.cachePage}`).then(function(res) {
                if (!res) throw Error("No data");
                console.log("we got the good stuff")
                return res.json();
            }).then(function(response) {
                console.log(response)
                // don't overwrite newer network data
                if (!networkDataReceived) {
                    This.setState({
                        loading: false,
                        cachePage: This.state.cachePage+1,
                        news: response.articles
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
            }
    }    }

    addMoreHeadlines = () =>{
        var networkDataReceived = false;
        this.setState({moreLoading: true})
        const This = this;
        if(this.state.country === 'All'){
            return newsapi.v2.topHeadlines({
            category: this.state.category,
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
                    caches.match('https://newsapi.org/v2/top-headlines?category='+this.state.category+'&page='+this.state.cachePage,{ignoreMethod:true,ignoreVary:true})
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
                }
            });
        } else{
            return newsapi.v2.topHeadlines({
            category: this.state.category,
            country: this.state.country,
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
                    caches.match('https://newsapi.org/v2/top-headlines?category='+this.state.category+'&country='+this.state.country+'&page='+this.state.cachePage,{ignoreMethod:true,ignoreVary:true})
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
                }
            });
        }
    }

    render (){
        const {classes} = this.props;
        const {loading, news, error, theError, moreLoading } = this.state;
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
        let recentScreamMarkUp = !loading?news.map((scream,ind)=><Scream key={`${scream.title}${ind}`} scream={scream} trending={false} />):(<NewsSkeleton />)
        return (
            <Grid container spacing={2}>
            {fetchError}
                <Grid item md={10} sm={9} xs={12}>
                    {recentScreamMarkUp}
                    {moreButton}
                </Grid>
                <Hidden xsDown>
                    <Grid item md={2} sm={3} xs={12}>
                        <Categories category={this.state.category} country={this.state.country} urlTo='/category' />
                        <Countries  category={this.state.category} country={this.state.country} urlTo={`/category/${this.state.category}`}  />
                    </Grid>
                </Hidden>
            </Grid>
        )
    }
}

export default withSyles(styles)(category);