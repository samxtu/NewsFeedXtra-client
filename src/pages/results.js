import React , { Component } from 'react';
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

//newsapi
const NewsAPI = require('newsapi');
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
            props:{}
        }
    }
    
    componentDidMount(){
        console.log('results did mount')
            this.setState({
                search: this.props.location.search.split('?')[1],
                props: this.props
            })
            const newsapi = new NewsAPI(process.env.REACT_APP_WORLDNEWS_API_KEY);
            if(!this.props.match.params.param1){
                newsapi.v2.everything({
                    qInTitle: this.props.location.search.split('?')[1],
                    sortBy:'publishedAt',
                    language: 'en',
                    pageSize: 50
                  }).then(response => {
                    if(response.status === 'ok'){
                        this.setState({
                            loading: false,
                            news: response.articles,
                            totalResults: response.totalResults
                        })
                    } 
                })
                .catch((err)=>{
                    console.log(err)
                });
            }
            else if(this.props.match.params.param1 && this.props.match.params.param1.length ===2){
                if(this.props.match.params.param2 && this.props.match.params.param2.length > 2){
                    newsapi.v2.topHeadlines({
                        qInTitle: this.props.location.search.split('?')[1],
                        sortBy:'publishedAt',
                        language: 'en',
                        country: this.props.match.params.param1,
                        category: this.props.match.params.param2,
                        pageSize: 50
                      }).then(response => {
                        if(response.status === 'ok'){
                            console.log(response.totalResults)
                            this.setState({
                                loading: false,
                                news: response.articles,
                                totalResults: response.totalResults
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
                    newsapi.v2.topHeadlines({
                        qInTitle: this.props.location.search.split('?')[1],
                        sortBy:'publishedAt',
                        language: 'en',
                        country: this.props.match.params.param1,
                        pageSize: 50
                      }).then(response => {
                        if(response.status === 'ok'){
                            console.log(response.totalResults)
                            this.setState({
                                loading: false,
                                news: response.articles,
                                totalResults: response.totalResults
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
                    newsapi.v2.topHeadlines({
                        qInTitle: this.props.location.search.split('?')[1],
                        sortBy:'publishedAt',
                        language: 'en',
                        country: this.props.match.params.param2,
                        category: this.props.match.params.param1,
                        pageSize: 50
                      }).then(response => {
                        if(response.status === 'ok'){
                            console.log(response.totalResults)
                            this.setState({
                                loading: false,
                                news: response.articles,
                                totalResults: response.totalResults
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
                    newsapi.v2.topHeadlines({
                        qInTitle: this.props.location.search.split('?')[1],
                        sortBy:'publishedAt',
                        language: 'en',
                        category: this.props.match.params.param1,
                        pageSize: 50
                      }).then(response => {
                        if(response.status === 'ok'){
                            console.log(response.totalResults)
                            this.setState({
                                loading: false,
                                news: response.articles,
                                totalResults: response.totalResults
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
        const newsApi = new NewsAPI(process.env.REACT_APP_WORLDNEWS_API_KEY);
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
                newsApi.v2.everything({
                    qInTitle: nextProps.location.search.split('?')[1],
                    sortBy:'publishedAt',
                    language: 'en',
                    pageSize: 50
                  }).then(response => {
                    if(response.status === 'ok'){
                        console.log(response.totalResults)
                        this.setState({
                            loading: false,
                            error: false,
                            news: response.articles,
                            totalResults: response.totalResults
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
                    newsApi.v2.topHeadlines({
                        qInTitle: nextProps.location.search.split('?')[1],
                        sortBy:'publishedAt',
                        language: 'en',
                        country: nextProps.match.params.param1,
                        category: nextProps.match.params.param2,
                        pageSize: 50
                      }).then(response => {
                        if(response.status === 'ok'){
                            console.log(response.totalResults)
                            this.setState({
                                loading: false,
                                error: false,
                                news: response.articles,
                                totalResults: response.totalResults
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
                    newsApi.v2.topHeadlines({
                        qInTitle: nextProps.location.search.split('?')[1],
                        sortBy:'publishedAt',
                        language: 'en',
                        country: nextProps.match.params.param1,
                        pageSize: 50
                      }).then(response => {
                        if(response.status === 'ok'){
                            console.log(response.totalResults)
                            this.setState({
                                loading: false,
                                error: false,
                                news: response.articles,
                                totalResults: response.totalResults
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
                    newsApi.v2.topHeadlines({
                        qInTitle: nextProps.location.search.split('?')[1],
                        sortBy:'publishedAt',
                        country: nextProps.match.params.param2,
                        category: nextProps.match.params.param1,
                        pageSize: 50
                      }).then(response => {
                        if(response.status === 'ok'){
                            console.log(response.totalResults)
                            this.setState({
                                loading: false,
                                error: false,
                                news: response.articles,
                                totalResults: response.totalResults
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
                    newsApi.v2.topHeadlines({
                        qInTitle: nextProps.location.search.split('?')[1],
                        sortBy:'publishedAt',
                        language: 'en',
                        category: nextProps.match.params.param1,
                        pageSize: 50
                      }).then(response => {
                        if(response.status === 'ok'){
                            console.log(response.totalResults)
                            this.setState({
                                loading: false,
                                error: false,
                                news: response.articles,
                                totalResults: response.totalResults
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
        const {loading, news, totalResults, urlCat, urlCou, search,category,country} = this.state;
        const {classes } = this.props;
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
            <Hidden smDown>
            <Grid item md={2}>
                
            </Grid>
            </Hidden>
                <Grid item md={8} sm={9} xs={12}>
                    {resultsCount && !loading?(
                    <Typography className={classes.center}  variant='body2' color='textSecondary'>{resultsCount} results for <em>{this.props.location.search.split('?')[1]}</em></Typography>
                   ):(!loading?(<Typography className={classes.full}  variant='h5' color='textSecondary'>{resultsCount} results for <em>{this.props.location.search.split('?')[1]}</em></Typography>):(''))} 
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