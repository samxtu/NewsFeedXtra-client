import React , { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import countryArray from '../util/consts';
//Components
import Scream from '../components/Scream';
import Categories from '../components/Categories';
import Countries from '../components/Countries';
import DetailSearch from '../components/DetailSearch';
import NewsSkeleton from '../components/NewsSkeleton';
import Filters from '../components/Filters';

// mui stuff
import Typography  from '@material-ui/core/Typography';
import withSyles from '@material-ui/core/styles/withStyles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//newsapi
const gnewsapiproxy = 'https://newsfeedxtra-api.netlify.app/.netlify/functions/server';

const ITEM_HEIGHT = 48;
const styles = theme => ({
    ...theme.common,
    container:{
        fontFamily: "Playfair Display"
    },
    full: {
        fontFamily: "Playfair Display",
        width: 'inherit 100%'
    },
    center: {
        fontFamily: "Playfair Display",
        margin: '0 0 0 10%',
    }
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

class results extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            totalResults: null,
            search: '',
            news: [],
            urlCat: '/results',
            urlCou: '/results',
            category: 'All',
            country: 'All',
            props:{},
            anchorEl1: null,
            anchorEl2: null,
        }
    }
    
    componentDidMount(){
            this.setState({
                search: this.props.location.search.split('?')[1],
                props: this.props
            })
            if(!this.props.match.params.param1){
                axios.get(`${gnewsapiproxy}/everything/en/''/${this.props.location.search.split('?')[1]}/publishedAt/50/''`)
                  .then(response => {
                    if(response.data.status === 'ok'){
                        this.setState({
                            loading: false,
                            news: response.data.articles,
                            totalResults: response.data.totalResults
                        })
                    } 
                })
                .catch((err)=>{
                    console.log(err)
                });
            }
            else if(this.props.match.params.param1 && this.props.match.params.param1.length ===2){
                if(this.props.match.params.param2 && this.props.match.params.param2.length > 2){
                    axios.get(`${gnewsapiproxy}/topheadlines/en/${this.props.match.params.param1}/''/${this.props.match.params.param2}/${this.props.location.search.split('?')[1]}/50/''`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                news: response.data.articles,
                                totalResults: response.data.totalResults
                            })
                        } 
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                    this.setState({
                        urlCat: `/results/${this.props.match.params.param1}`,
                        urlCou: `/results/${this.props.match.params.param2}`,
                        category: this.props.match.params.param2,
                        country: this.props.match.params.param1
                    })
                } else{
                    axios.get(`${gnewsapiproxy}/topheadlines/en/${this.props.match.params.param1}/''/''/${this.props.location.search.split('?')[1]}/50/''`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                news: response.data.articles,
                                totalResults: response.data.totalResults
                            })
                        } 
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                    this.setState({
                        urlCat: `/results/${this.props.match.params.param1}`,
                        country: this.props.match.params.param1
                    })
                }
            } else if(this.props.match.params.param1 && this.props.match.params.param1.length > 2){
                if(this.props.match.params.param2 && this.props.match.params.param2.length ===2){
                    axios.get(`${gnewsapiproxy}/topheadlines/en/${this.props.match.params.param2}/''/${this.props.match.params.param1}/${this.props.location.search.split('?')[1]}/50/''`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                news: response.data.articles,
                                totalResults: response.data.totalResults
                            })
                        } 
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                    this.setState({
                        urlCat: `/results/${this.props.match.params.param2}`,
                        urlCou: `/results/${this.props.match.params.param1}`,
                        category: this.props.match.params.param1,
                        country: this.props.match.params.param2
                    })
                } else {
                    axios.get(`${gnewsapiproxy}/topheadlines/en/''/''/${this.props.match.params.param1}/''/50/''`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                news: response.data.articles,
                                totalResults: response.data.totalResults
                            })
                        } 
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                    this.setState({
                        urlCou: `/results/${this.props.match.params.param1}`,
                        category: this.props.match.params.param1
                    })
                }
            }
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.props.match.params.param1 !== nextProps.match.params.param1 
            || this.state.props.match.params.param2 !== nextProps.match.params.param2 
            || this.state.props.location.search !== nextProps.location.search){
            this.setState({props: nextProps,loading: true })
            window.scrollTo(0, 0)
            if(nextProps.location.search){
                this.setState({
                    search: nextProps.location.search.split('?')[1]
                })
            if(!nextProps.match.params.param1){
                axios.get(`${gnewsapiproxy}/everything/en/''/${nextProps.location.search.split('?')[1]}/publishedAt/50/''`)
                  .then(response => {
                    if(response.data.status === 'ok'){
                        this.setState({
                            loading: false,
                            error: false,
                            news: response.data.articles,
                            totalResults: response.data.totalResults
                        })
                    } 
                })
                .catch((err)=>{
                    console.log(err)
                });
                this.setState({
                    urlCat: `/results`,
                    urlCou: `/results`,
                    category: 'All',
                    country: 'All'
                })
            }
            else if(nextProps.match.params.param1 && nextProps.match.params.param1.length ===2){
                if(nextProps.match.params.param2 && nextProps.match.params.param2.length > 2){
                    axios.get(`${gnewsapiproxy}/topheadlines/en/${nextProps.match.params.param1}/''/${nextProps.match.params.param2}/${nextProps.location.search.split('?')[1]}/50/''`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                error: false,
                                news: response.data.articles,
                                totalResults: response.data.totalResults
                            })
                        } 
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                    this.setState({
                        urlCat: `/results/${nextProps.match.params.param1}`,
                        urlCou: `/results/${nextProps.match.params.param2}`,
                        category: nextProps.match.params.param2,
                        country: nextProps.match.params.param1
                    })
                } else{
                    axios.get(`${gnewsapiproxy}/topheadlines/en/${nextProps.match.params.param1}/''/''/${nextProps.location.search.split('?')[1]}/50/''`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                error: false,
                                news: response.data.articles,
                                totalResults: response.data.totalResults
                            })
                        } 
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                    this.setState({
                        urlCat: `/results/${nextProps.match.params.param1}`,
                        urlCou: '/results',
                        category: 'All',
                        country: nextProps.match.params.param1
                    })
                }
            } else if(nextProps.match.params.param1 && nextProps.match.params.param1.length > 2){
                if(nextProps.match.params.param2 && nextProps.match.params.param2.length ===2){
                    axios.get(`${gnewsapiproxy}/topheadlines/''/${nextProps.match.params.param2}/''/${nextProps.match.params.param1}/${nextProps.location.search.split('?')[1]}/50/''`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                error: false,
                                news: response.data.articles,
                                totalResults: response.data.totalResults
                            })
                        } 
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                    this.setState({
                        urlCat: `/results/${nextProps.match.params.param2}`,
                        urlCou: `/results/${nextProps.match.params.param1}`,
                        category: nextProps.match.params.param1,
                        country: nextProps.match.params.param2
                    })
                } else {
                    axios.get(`${gnewsapiproxy}/topheadlines/en/''/''/${nextProps.match.params.param1}/${nextProps.location.search.split('?')[1]}/50/''`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
                                error: false,
                                news: response.data.articles,
                                totalResults: response.data.totalResults
                            })
                        } 
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                    this.setState({
                        urlCou: `/results/${nextProps.match.params.param1}`,
                        urlCat: '/results',
                        country: 'All',
                        category: nextProps.match.params.param1
                    })
                }
            }
        }
    }
    }

    onDetChange = (dets) => {
    //   console.log(dets)
    }

    render (){
        const {loading, news, totalResults, urlCat, urlCou, search,category,country, anchorEl1, anchorEl2 } = this.state;
        const {classes } = this.props;
        
        const isMenu1Open = Boolean(anchorEl1);
        const isMenu2Open = Boolean(anchorEl2);
   
        const handleProfileMenu1Open = (event) => {
          this.setState({anchorEl1: event.currentTarget})
        };
        const handleProfileMenu2Open = (event) => {
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
                      marginTop: '40px'
                    },
                  }}
                >
                  {categoriesArray.map(category=>(
                    <MenuItem key={category.id} component={Link} href={`${urlCat}/${category.id}`} to={{ pathname: `${urlCat}/${category.id}`, search: search }} onClick={handleMenu1Close}>{category.id}</MenuItem>
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
                      marginTop: '35px'
                    },
                  }}
                >
                  {countryArray.map(country=>(
                    <MenuItem key={country.code+country.label} component={Link} href={`${urlCou}/${country.code.toLowerCase()}`} to={{pathname: `${urlCou}/${country.code.toLowerCase()}`, search: search }} onClick={handleMenu2Close}>{country.label}</MenuItem>
                  ))}
                </Menu>
              );
        let resultsCount = totalResults;
        const headers = [];
        let recentScreamMarkUp = !loading?news.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={false} />)
            } else{
                resultsCount = resultsCount - 1;
                return null
            }
        }
        ):(<NewsSkeleton />)
        return (
            <Grid container spacing={2} className={classes.container}>
            {renderMenu1}
            {renderMenu2}
            <Hidden smDown>
            <Grid item md={2}>
                
            </Grid>
            </Hidden>
                <Grid item md={8} sm={9} xs={12}>
                    {resultsCount && !loading?(
                    <Fragment>
                        <Typography className={classes.center}  variant='body2' color='textSecondary'>{resultsCount} results for <em>{this.props.location.search.split('?')[1]}</em></Typography>
                        <ButtonGroup disableElevation fullWidth size='small' color="default" aria-label="Filter buttons by country or category or both">
                        <Button color='default' disabled>Filter</Button>
                        <Button aria-label="Filter by category" aria-controls={menu1Id} aria-haspopup="true" onClick={handleProfileMenu1Open}>By Category</Button>
                        <Button aria-label="Filter by country" aria-controls={menu2Id} aria-haspopup="true"  onClick={handleProfileMenu2Open}>By Country</Button>
                        </ButtonGroup>
                    </Fragment>
                   ):(!loading?(<Fragment><Typography className={classes.full}  variant='h5' color='textSecondary'>{resultsCount} results for <em>{this.props.location.search.split('?')[1]}</em></Typography><div style={{ height:'300px' }}></div></Fragment>):(''))} 
                   {category===country?(''):(
                       <Filters country={country} category={category} search={search} param1={this.state.props.match.params.param1} />
                   )}
                   {recentScreamMarkUp}
                </Grid>
                <Hidden xsDown>
                    <Grid item md={2} sm={3} xs={12}>
                        <DetailSearch className={classes.full}  onDetChange={(dets) => this.onDetChange(dets)} />
                        <Categories className={classes.full} search={search} category={category} country={country} urlTo={urlCat} />
                        <Countries className={classes.full} search={search}  category={category} country={country}  urlTo={urlCou} />
                    </Grid>
                </Hidden>
            </Grid>
        )
    }
}

export default withSyles(styles)(results);