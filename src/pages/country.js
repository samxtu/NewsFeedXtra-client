import React , { Component, Fragment } from 'react';
import VizSensor from 'react-visibility-sensor';
import { Link } from 'react-router-dom';
import axios from 'axios';
//mui stuff
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import withSyles from '@material-ui/core/styles/withStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
//Components
import Scream from '../components/Scream';
import Categories from '../components/Categories';
import Countries from '../components/Countries';
import NewsSkeleton from '../components/NewsSkeleton';
import Hidden from '@material-ui/core/Hidden';
import countryArray from '../util/consts';

// mui stuff
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.REACT_APP_WORLDNEWS_API_KEY);
const gnewsapiproxy = 'https://us-central1-worldnews-bf737.cloudfunctions.net/api';
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

var newsAPI = false;
var gnews = false;
var networkDataReceived = false;
const styles = (theme) => ({
    alert: {
        fontFamily: "Playfair Display",
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
    muiIcons: {
        position: 'relative',
        top: '13px',
        [theme.breakpoints.only('xs')]: {
            top: '10px',
          },
        [theme.breakpoints.only('sm')]: {
            top: '10px',
        },
        '&.MuiSvgIcon-root': {
            height: '2em',
            width: '2em',
            [theme.breakpoints.only('xs')]: {
                height: '1.5em',
                width: '1.5em',
              },
              [theme.breakpoints.only('sm')]: {
                height: '1.5em',
                width: '1.5em',
              },
        }
    },
    titleheader: {
        [theme.breakpoints.only('xs')]: {
            fontSize: '1.5rem'
          },
          [theme.breakpoints.only('sm')]: {
            fontSize: '1.5rem'
          },
    }
  });
class country extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            moreLoading: false,
            news: [],
            business: [],
            entertainment: [],
            general: [],
            health: [],
            science: [],
            sports: [],
            technology: [],
            businessActive: false,
            generalActive: true,
            entertainmentActive: false,
            healthActive: false,
            sportsActive: false,
            scienceActive: false,
            businessViz: false,
            entertainmentViz: false,
            healthViz: false,
            sportsViz: false,
            scienceViz: false,
            technologyViz: false,
            error: false,
            theError: '',
            category: 'All',
            page: 1,
            cachePage: 1,
            country: this.props.match.params.name,
            myCountry: localStorage.myCountry,
            props: {}
        }
    }

    UNSAFE_componentWillMount(){
        console.log('will mount')
        if(countryArray.filter(country => Boolean(country.code === this.state.myCountry) && Boolean(country.api === 'newsAPI'))[0]){
            newsAPI = true;
            console.log('is in newsAPI')
            if(this.props.match.params.title){
                const This = this;
                // fetch cached data
                caches.match(`https://newsapi.org/v2/top-headlines?country=${this.props.match.params.name}&category=${this.props.match.params.title}&page=${this.state.cachePage}`).then(function(res) {
                    if (!res) throw Error("No data");
                    return res.json();
                }).then(function(response) {
                    // don't overwrite newer network data
                    if (!networkDataReceived) {
                        This.setState({
                            loading: false,
                            news: response.articles,
                            cachePage: this.state.cachePage + 1
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            } else{        
                const This = this;
                // fetch cached data
                let cachegets = []
                    categoriesArray.map(cat=>{
                        return cachegets.push(new Promise((resolve,reject)=>{
                            caches.match('https://newsapi.org/v2/top-headlines?country='+this.props.match.params.name+'&category='+cat.id+'&pageSize=5',{ignoreMethod:true,ignoreVary:true})
                            .then(function(res) {
                                if (!res) {
                                    console.log('No data')
                                    resolve(true)
                                }
                                return res.json();
                            })
                            .then(function(response) {
                                // don't overwrite newer network data
                                if (!networkDataReceived) {
                                    This.setState({
                                        loading: false,
                                        [cat.id]: response.articles
                                    })
                                }
                                return true;
                            })
                            .then(()=> resolve(true))
                            .catch(err=> reject(err))
                        }))
                    })
                    return Promise.all(cachegets)
            }
        }
        if(countryArray.filter(country => Boolean(country.code === this.state.myCountry) && Boolean(country.api === 'gnews'))[0]){
            gnews = true;
            console.log('is in gnews')
            if(this.props.match.params.title){
                const This = this;
                // fetch cached data
                caches.match(`https://us-central1-worldnews-bf737.cloudfunctions.net/api/topic/${this.props.match.params.title==='general'?'nation':this.props.match.params.title}/${this.props.match.params.name}/20`).then(function(res) {
                    if (!res) throw Error("No data");
                    return res.json();
                }).then(function(response) {
                    // don't overwrite newer network data
                    if (!networkDataReceived) {
                        This.setState({
                            loading: false,
                            news: response.articles
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            } else{        
                const This = this;
                // fetch cached data
                let cachegets = []
                    categoriesArray.map(cat=>{
                        return cachegets.push(new Promise((resolve,reject)=>{
                            caches.match('https://us-central1-worldnews-bf737.cloudfunctions.net/api/topic/'+(cat.id==="general"?"nation":cat.id)+'/'+this.props.match.params.name+'/5',{ignoreMethod:true,ignoreVary:true})
                            .then(function(res) {
                                if (!res) {
                                    console.log('No data')
                                    resolve(true)
                                }
                                return res.json();
                            })
                            .then(function(response) {
                                // don't overwrite newer network data
                                if (!networkDataReceived) {
                                    This.setState({
                                        loading: false,
                                        [cat.id]: response.articles
                                    })
                                }
                                return true;
                            })
                            .then(()=> resolve(true))
                            .catch(err=> reject(err))
                        }))
                    })
                    return Promise.all(cachegets)
            }
        }
    }

    componentDidMount(){
        this.setState({props:this.props})
        window.scrollTo(0, 0)
        console.log('can mount')
        if(this.props.match.params.title){
            this.setState({category: this.props.match.params.title})
            if(newsAPI){
                newsapi.v2.topHeadlines({
                    country: this.props.match.params.name,
                    category: this.props.match.params.title,
                    page: this.state.page
                  }).then(response => {
                    if(response.status === 'ok'){
                        this.setState({
                            loading: false,
                            error: false,
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
            }
            if(gnews){
                axios.get(`${gnewsapiproxy}/topic/${this.props.match.params.title==='general'?'nation':this.props.match.params.title}/${this.props.match.params.name.toLowerCase()}/20`)
                  .then(response => {
                    if(response.data.status === 'ok'){
                        this.setState({
                            loading: false,
                            error: false,
                            page: this.state.page+1,
                            news: response.data.articles
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
            }
            
        } else {
            if(newsAPI){
                categoriesArray.map(category =>{
                    return newsapi.v2.topHeadlines({
                        country: this.props.match.params.name,
                        category: category.id,
                        pageSize: 5
                        }).then(response => {
                            if(response.status === 'ok'){
                                networkDataReceived = true;
                                this.setState({
                                    loading: false,
                                    error: false,
                                    [category.id]: response.articles
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
                })
            }
            if(gnews){
                categoriesArray.map(category =>{
                    return axios.get(`${gnewsapiproxy}/topic/${category.id==='general'?'nation':category.id}/${this.props.match.params.name.toLowerCase()}/5`)    
                        .then(response => {
                            if(response.data.status === 'ok'){
                                networkDataReceived = true;
                                this.setState({
                                    loading: false,
                                    error: false,
                                    [category.id]: response.data.articles
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
                })
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.props.match.params.title !== nextProps.match.params.title || this.state.props.match.params.name !== nextProps.match.params.name){
        window.scrollTo(0, 0)
        this.setState({page:1,cachePage:1,props: nextProps,loading: true})
        networkDataReceived = false;
        if(nextProps.match.params.title){
            this.setState({
                category: nextProps.match.params.title,
                country: nextProps.match.params.name
            })
            if(newsAPI){
                newsapi.v2.topHeadlines({
                    country: nextProps.match.params.name,
                    category: nextProps.match.params.title,
                    page: this.state.page
                  }).then(response => {
                    if(response.status === 'ok'){
                        this.setState({
                            loading: false,
                            error: false,
                            business: [],
                            entertainment: [],
                            general: [],
                            health: [],
                            science: [],
                            sports: [],
                            technology: [],
                            news: response.articles,
                            page: this.state.page + 1
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
            caches.match(`https://newsapi.org/v2/top-headlines?country=${nextProps.match.params.name}&category=${nextProps.match.params.title}&page=${this.state.cachePage}`).then(function(res) {
                if (!res) throw Error("No data");
                return res.json();
            }).then(function(response) {
                // don't overwrite newer network data
                if (!networkDataReceived) {
                    This.setState({
                        loading: false,
                        business: [],
                        entertainment: [],
                        general: [],
                        health: [],
                        science: [],
                        sports: [],
                        technology: [],
                        news: response.articles,
                        cachePage: this.state.cachePage + 1
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
            }
            if(gnews){
                axios.get(`${gnewsapiproxy}/topic/${nextProps.match.params.title==='general'?'nation':nextProps.match.params.title}/${nextProps.match.params.name.toLowerCase()}/20`)
                  .then(response => {
                    if(response.data.status === 'ok'){
                        this.setState({
                            loading: false,
                            error: false,
                            business: [],
                            entertainment: [],
                            general: [],
                            health: [],
                            science: [],
                            sports: [],
                            technology: [],
                            news: response.data.articles
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
                caches.match(`https://us-central1-worldnews-bf737.cloudfunctions.net/api/topic/${nextProps.match.params.title==='general'?'nation':nextProps.match.params.title}/${nextProps.match.params.name}/20`).then(function(res) {
                    if (!res) throw Error("No data");
                    return res.json();
                }).then(function(response) {
                    // don't overwrite newer network data
                    if (!networkDataReceived) {
                        This.setState({
                            loading: false,
                            business: [],
                            entertainment: [],
                            general: [],
                            health: [],
                            science: [],
                            sports: [],
                            technology: [],
                            news: response.articles
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        } else {
            this.setState({
                country: nextProps.match.params.name,
                category: 'All'
            })
            if(newsAPI){            
                categoriesArray.map(category =>{
                    return newsapi.v2.topHeadlines({
                        country: nextProps.match.params.name,
                        category: category.id,
                        pageSize: 5
                        }).then(response => {
                            if(response.status === 'ok'){
                                networkDataReceived = true;
                                this.setState({
                                    loading: false,
                                    error: false,
                                    news: [],
                                    [category.id]: response.articles
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
                })
                
                const This = this;
            // fetch cached data
            let cachegets = []
            categoriesArray.map(cat=>{
                return cachegets.push(new Promise((resolve,reject)=>{
                    caches.match('https://newsapi.org/v2/top-headlines?country='+nextProps.match.params.name+'&category='+cat.id+'&pageSize=5',{ignoreMethod:true,ignoreVary:true})
                    .then(function(res) {
                        if (!res) {
                            console.log('No data')
                            resolve(true)
                        }
                        return res.json();
                    })
                    .then(function(response) {
                        // don't overwrite newer network data
                        if (!networkDataReceived) {
                            This.setState({
                                loading: false,
                                news: [],
                                [cat.id]: response.articles
                            })
                        }
                        return true;
                    })
                    .then(()=> resolve(true))
                    .catch(err=> reject(err))
                }))
            })
            Promise.all(cachegets)
            }
            if(gnews){
                categoriesArray.map(category =>{
                    return axios.get(`${gnewsapiproxy}/topic/${category.id==='general'?'nation':category.id}/${nextProps.match.params.name.toLowerCase()}/5`)
                    .then(response => {
                        if(response.data.status === 'ok'){
                            networkDataReceived = true;
                            this.setState({
                                loading: false,
                                error: false,
                                news: [],
                                [category.id]: response.data.articles
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
                })

                const This = this;
                // fetch cached data
                let cachegets = []
                categoriesArray.map(cat=>{
                    return cachegets.push(new Promise((resolve,reject)=>{
                        caches.match('https://us-central1-worldnews-bf737.cloudfunctions.net/api/topic/'+(cat.id==="general"?"nation":cat.id)+'/'+nextProps.match.params.name+'/5',{ignoreMethod:true,ignoreVary:true})
                        .then(function(res) {
                            if (!res) {
                                console.log('No data')
                                resolve(true)
                            }
                            return res.json();
                        })
                        .then(function(response) {
                            // don't overwrite newer network data
                            if (!networkDataReceived) {
                                This.setState({
                                    loading: false,
                                    news: [],
                                    [cat.id]: response.articles
                                })
                            }
                            return true;
                        })
                        .then(()=> resolve(true))
                        .catch(err=> reject(err))
                    }))
                })
                Promise.all(cachegets)
            }
        }
    }
    }

    addMoreHeadlines = () =>{
        var networkDataReceived = false;
        this.setState({moreLoading: true})
        const This = this;
        if(newsAPI){
            return newsapi.v2.topHeadlines({
            country: this.state.country,
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
                    caches.match('https://newsapi.org/v2/top-headlines?country='+this.state.country+'&category='+this.state.category+'&page='+this.state.cachePage,{ignoreMethod:true,ignoreVary:true})
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
        if(gnews){
            return axios.get(`${gnewsapiproxy}/topic/${this.state.category==='general'?'nation':this.state.category}/${this.state.country}/${20*this.state.page}`)
            .then(response => {
                if(response.data.status === 'ok'){
                    networkDataReceived = true;
                    this.setState({
                        moreLoading: false,
                        error: false,
                        page: this.state.page+1,
                        news: this.state.news.concat(response.data.articles)
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
                    caches.match('https://us-central1-worldnews-bf737.cloudfunctions.net/api/topic/'+(this.state.category==="general"?"nation":this.state.category)+'/'+this.state.country+'/'+20*this.state.cachePage,{ignoreMethod:true,ignoreVary:true})
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
        const {country,loading, news, error, theError, moreLoading,category,general,generalActive,
        business,businessActive,businessViz,entertainment, entertainmentViz, entertainmentActive, health, healthActive, healthViz,
        sportsActive, sports, sportsViz, science, scienceActive, scienceViz, technology, technologyViz } = this.state;
        const headers = [];
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
        let recentScreamMarkUp = !loading?news.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={false} />)
            } else return null
        }):(<NewsSkeleton />)

        let generalMarkup = !loading?general.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={true} />)
            } else return null
        }):(<NewsSkeleton />)
        let entertainmentMarkup = !loading&&entertainmentViz?entertainment.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={true} />)
            } else return null
        }):(null)
        let sportsMarkup = !loading&&sportsViz?sports.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={true} />)
            } else return null
        }):(null)
        let healthMarkup = !loading&&healthViz?health.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={true} />)
            } else return null
        }):(null)
        let businessMarkup = !loading&&businessViz?business.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={true} />)
            } else return null
        }):(null)
        let scienceMarkup = !loading&&scienceViz?science.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={true} />)
            } else return null
        }):(null)
        let technologyMarkup = !loading&&technologyViz?technology.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={true} />)
            } else return null
        }):(null)

        return (
            <Grid container spacing={2}>
                {fetchError}
                <Hidden smDown>
                <Grid item md={2}>
                    
                </Grid></Hidden>
                <Grid item md={8} sm={9} xs={12}>
                    {category !== 'All'&&recentScreamMarkUp}
                    {category !== 'All'&&moreButton}
                    {category === 'All'&&(
                    <Fragment>
                        <VizSensor 
                        partialVisibility={true}
                        active={generalActive}
                        onChange={(isVisible) => {
                            this.setState({
                                entertainmentViz: isVisible,
                                generalActive: !isVisible,
                                entertainmentActive: true
                            })
                        }}>
                        <Fragment>
                        {!loading&&(<Fragment><Typography className={classes.titleheader} component={Link} href={'/country/'+country+'/general'} to={'/country/'+country+'/general'} variant='h4' color='textPrimary'><b>General <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                        {generalMarkup}
                        </Fragment>
                        </VizSensor>
                        <br/>
                        <VizSensor 
                        partialVisibility={true}
                        active={entertainmentActive}
                        onChange={(isVisible) => {
                            this.setState({
                                businessViz: isVisible,
                                entertainmentActive: !isVisible,
                                businessActive: true
                            })
                        }}>
                        <Fragment>
                        {!loading&&entertainmentViz&&(<Fragment><Typography className={classes.titleheader} component={Link} href={'/country/'+country+'/entertainment'} to={'/country/'+country+'/entertainment'} variant='h4' color='textPrimary'><b>Entertainment <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                        {entertainmentMarkup}
                        </Fragment>
                        </VizSensor>
                        <br/>
                        <VizSensor 
                        partialVisibility={true}
                        active={businessActive}
                        onChange={(isVisible) => {
                            this.setState({
                                healthViz: isVisible,
                                businessActive: !isVisible,
                                healthActive: true
                            })
                        }}>
                        <Fragment>
                        {!loading&&businessViz&&(<Fragment><Typography className={classes.titleheader} component={Link} href={'/country/'+country+'/business'} to={'/country/'+country+'/business'} variant='h4' color='textPrimary'><b>Business <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                        {businessMarkup}
                        </Fragment>
                        </VizSensor>
                        <br/>
                        <VizSensor 
                        partialVisibility={true}
                        active={healthActive}
                        onChange={(isVisible) => {
                            this.setState({
                                scienceViz: isVisible,
                                healthActive: !isVisible,
                                scienceActive: true
                            })
                        }}>
                        <Fragment>
                        {!loading&&healthViz&&(<Fragment><Typography className={classes.titleheader} component={Link} href={'/country/'+country+'/health'} to={'/country/'+country+'/health'} variant='h4' color='textPrimary'><b>Health <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                        {healthMarkup}
                        </Fragment>
                        </VizSensor>
                        <br/>
                        <VizSensor 
                        partialVisibility={true}
                        active={scienceActive}
                        onChange={(isVisible) => {
                            this.setState({
                                sportsViz: isVisible,
                                scienceActive: !isVisible,
                                sportsActive: true
                            })
                        }}>
                        <Fragment>
                        {!loading&&scienceViz&&(<Fragment><Typography className={classes.titleheader} component={Link} href={'/country/'+country+'/science'} to={'/country/'+country+'/science'} variant='h4' color='textPrimary'><b>Science <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                        {scienceMarkup}
                        </Fragment>
                        </VizSensor>
                        <br/>
                        <VizSensor 
                        partialVisibility={true}
                        active={sportsActive}
                        onChange={(isVisible) => {
                            this.setState({
                                technologyViz: isVisible,
                                sportsActive: !isVisible
                            })
                        }}>
                        <Fragment>
                        {!loading&&sportsViz&&(<Fragment><Typography className={classes.titleheader} component={Link} href={'/country/'+country+'/sports'} to={'/country/'+country+'/sports'} variant='h4' color='textPrimary'><b>Sports <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                        {sportsMarkup}
                        </Fragment>
                        </VizSensor>
                        <br/>
                        {!loading&&technologyViz&&(<Fragment><Typography className={classes.titleheader} component={Link} href={'/country/'+country+'/technology'} to={'/country/'+country+'/technology'} variant='h4' color='textPrimary'><b>Technology <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                        {technologyMarkup}
                    </Fragment>
                    )}
                </Grid>
                <Hidden xsDown>
                    <Grid item md={2} sm={3} xs={12}>
                        <Categories  category={this.state.category} country={this.state.country}  urlTo={`/country/${this.state.country}`} />
                        <Countries  category={this.state.category} country={this.state.country}  urlTo='/country' />
                    </Grid>
                </Hidden>
            </Grid>
        )
    }
}

export default withSyles(styles)(country);
