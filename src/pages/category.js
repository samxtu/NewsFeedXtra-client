import React , { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";
//mui stuff
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import withSyles from '@material-ui/core/styles/withStyles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
//Components
import Scream from '../components/Scream';
import Categories from '../components/Categories';
import Countries from '../components/Countries';
import NewsSkeleton from '../components/NewsSkeleton';
import countryArray from '../util/consts';
import ReadMore from '../components/ReadMore';
// api initialization
const gnewsapiproxy = 'https://newsfeedxtra-api.netlify.app/.netlify/functions/server';

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
var networkDataReceived = false;
var countryCovered = false;
var gnews = false;
var newsAPI = false;

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
        color: '#f4976c', 
        fontColor: '#f4976c',
        [theme.breakpoints.only('xs')]: {
            fontSize: '1.5rem'
          },
          [theme.breakpoints.only('sm')]: {
            fontSize: '1.5rem'
          },
    }
  });
class category extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            news: [],
            countryNews: [],
            myCountry: localStorage.myCountry,
            error: false,
            theError: '',
            category: this.props.match.params.title,
            props: {}
        }
    }

    UNSAFE_componentWillMount(){
        if(countryArray.filter(country => country.code === this.state.myCountry)[0]){
            countryCovered = true;
            if(countryArray.filter(country => Boolean(country.code === this.state.myCountry) && Boolean(country.api === 'newsAPI'))[0]){
                newsAPI = true;
                caches.match(`${gnewsapiproxy}/topheadlines/''/${this.state.myCountry.toLowerCase()}/''/${this.props.match.params.title}/''/5/''`).then(function(res) {
                        if (!res) throw Error("No data");
                    return res.json();
                }).then(function(response) {
                    // don't overwrite newer network data
                    if (!networkDataReceived) {
                        This.setState({
                            loading: false,
                            countryNews: response.articles
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            if(countryArray.filter(country => Boolean(country.code === this.state.myCountry) && Boolean(country.api === 'gnews'))[0]){
                gnews = true;
                caches.match(`${gnewsapiproxy}/topic/${this.props.match.params.title==='general'?'nation':this.props.match.params.title}/${this.state.myCountry.toLowerCase()}/5`).then(function(res) {
                    if (!res) throw Error("No data");
                    return res.json();
                }).then(function(response) {
                    // don't overwrite newer network data
                    if (!networkDataReceived) {
                        This.setState({
                            loading: false,
                            countryNews: response.articles
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
        const This = this;
        // fetch cached data
        caches.match(`${gnewsapiproxy}/topheadlines/''/''/${categoriesArray[categoriesArray.findIndex(elem => elem.id === this.props.match.params.title)].sources}/''/''/5/''`).then(function(res) {
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
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.setState({
            category: this.props.match.params.title,
            props: this.props
        })
        if(countryCovered){
            if(gnews){
              axios.get(`${gnewsapiproxy}/topic/${this.props.match.params.title==='general'?'nation':this.props.match.params.title}/${this.state.myCountry.toLowerCase()}/5`)
              .then(response => {
                if(response.data.status === 'ok'){
                    networkDataReceived = true
                    this.setState({
                        loading: false,
                        error: false,
                        countryNews: response.data.articles
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
            if(newsAPI){
                axios.get(`${gnewsapiproxy}/topheadlines/''/${this.state.myCountry}/''/${this.props.match.params.title}/''/5/''`)
                  .then(response => {
                    if(response.data.status === 'ok'){
                        networkDataReceived = true
                        this.setState({
                            loading: false,
                            error: false,
                            countryNews: response.data.articles
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
        }
            axios.get(`${gnewsapiproxy}/topheadlines/''/''/${categoriesArray[categoriesArray.findIndex(elem => elem.id === this.props.match.params.title)].sources}/''/''/5/''`)
              .then(response => {
                if(response.data.status === 'ok'){
                    networkDataReceived = true
                    this.setState({
                        loading: false,
                        error: false,
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

    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.props.match.params.title !== nextProps.match.params.title){
            networkDataReceived = false;
            window.scrollTo(0, 0)
            this.setState({category: nextProps.match.params.title,page:1,cachePage:1,props:nextProps,loading: true})
            if(countryCovered){
                if(newsAPI){
                    axios.get(`${gnewsapiproxy}/topheadlines/''/${this.state.myCountry}/''/${nextProps.match.params.title}/''/''/${this.state.page}`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                error: false,
                                countryNews: response.data.articles
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
                        //check cache async
                        const This = this;
                        // fetch cached data
                        caches.match(`${gnewsapiproxy}/topheadlines/''/${this.state.myCountry.toLowerCase()}/''/${nextProps.match.params.title}/''/5/''`).then(function(res) {
                                if (!res) throw Error("No data");
                            return res.json();
                        }).then(function(response) {
                            // don't overwrite newer network data
                            if (!networkDataReceived) {
                                This.setState({
                                    loading: false,
                                    countryNews: response.articles
                                })
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                }
                if(gnews){
                    axios.get(`${gnewsapiproxy}/topic/${nextProps.match.params.title==='general'?'nation':nextProps.match.params.title}/${this.state.myCountry.toLowerCase()}/5`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                error: false,
                                countryNews: response.data.articles
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
                    caches.match(`${gnewsapiproxy}/topic/${nextProps.match.params.title==='general'?'nation':nextProps.match.params.title}/${this.state.myCountry.toLowerCase()}/5`).then(function(res) {
                        if (!res) throw Error("No data");
                        return res.json();
                    }).then(function(response) {
                        // don't overwrite newer network data
                        if (!networkDataReceived) {
                            This.setState({
                                loading: false,
                                countryNews: response.articles
                            })
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            } 
            axios.get(`${gnewsapiproxy}/topheadlines/''/''/${categoriesArray[categoriesArray.findIndex(elem => elem.id === nextProps.match.params.title)].sources}/''/''/''/${this.state.page}`)
                .then(response => {
                if(response.data.status === 'ok'){
                    this.setState({
                        loading: false,
                        error: false,
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
        caches.match(`${gnewsapiproxy}/topheadlines/''/''/${categoriesArray[categoriesArray.findIndex(elem => elem.id === nextProps.match.params.title)].sources}/''/''/5/''`).then(function(res) {
                if (!res) throw Error("No data");
            console.log("we got the good stuff")
            return res.json();
        }).then(function(response) {
            console.log(response)
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
            
    }    
    }

    render (){
        const {classes} = this.props;
        const {loading, news, error, theError, countryNews, myCountry, category } = this.state;
        const headers = [];
        let fetchError = error?(<Alert className={classes.alert} elevation={6} variant="filled" severity="warning">{theError}</Alert>):null;
        let recentScreamMarkUp = !loading?news.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={false} />)
            } else return null
        }):(<NewsSkeleton />)
        let countryScreamMarkUp = !loading&&countryCovered&&countryNews.length>0?countryNews.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={false} />)
            } else return null
        }):(null)
        return (
            <Grid container spacing={2}>
            <Helmet>
                <meta
                name="description"
                content={`Trending ${category} news headlines from sources around the world`}
                />
                <title>NewsFeedXtra | {category}</title>
            </Helmet>
            {fetchError}
                <Hidden smDown>
                <Grid item md={2}>
                    
                </Grid></Hidden>
                <Grid item md={8} sm={9} xs={12}>
                    {!loading&&countryCovered&&countryNews.length>0&&(<Fragment><Typography className={classes.titleheader} component={Link} href={'/country/'+myCountry.toLowerCase()+'/'+this.state.category} to={'/country/'+myCountry.toLowerCase()+'/'+this.state.category} variant='h4' color='textPrimary'><b>{this.state.category}: {countryArray.filter(country => country.code === myCountry)[0].label} <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                    {countryScreamMarkUp}
                    {!loading&&countryCovered&&countryNews.length>0&&(<ReadMore link={'/country/'+myCountry.toLowerCase()+'/'+this.state.category} />)}
                    {!loading&&countryCovered&&countryNews.length>0&&(<br/>)}
                    {!loading&&news.length>0&&(<Fragment><Typography className={classes.titleheader} component={Link} href={'/top-stories/'+this.state.category} to={'/top-stories/'+this.state.category} variant='h4' color='textPrimary'><b>{this.state.category}: World headlines <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                    {recentScreamMarkUp}
                    {!loading&&news.length>0&&(<ReadMore link={'/top-stories/'+this.state.category} />)}
                </Grid>
                <Hidden xsDown>
                    <Grid item md={2} sm={3} xs={12}>
                        <Categories category={this.state.category} country={this.state.country} urlTo='/category' />
                        <Countries  category={this.state.category} country={this.state.country} urlTo='/country'  />
                    </Grid>
                </Hidden>
            </Grid>
        )
    }
}

export default withSyles(styles)(category);