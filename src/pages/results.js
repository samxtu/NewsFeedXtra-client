import React , { Component } from 'react';
import Grid from '@material-ui/core/Grid';


//Components
import Scream from '../components/Scream';
import Categories from '../components/Categories';
import Countries from '../components/Countries';
import DetailSearch from '../components/DetailSearch';
import NewsSkeleton from '../components/NewsSkeleton';

// mui stuff
import Typography  from '@material-ui/core/Typography';
import withSyles from '@material-ui/core/styles/withStyles';
import Hidden from '@material-ui/core/Hidden';

//newsapi
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('9047eaa819904eb49205d2d53ab54356');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
const styles = theme => ({
    ...theme.common,
    full: {
        width: 'inherit 100%'
    },
    center: {
        margin: '0 0 0 50%',
        float: 'center'
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
            urlCat: '',
            urlCou: '',
            category: 'All',
            country: 'All'
        }
    }
    
    componentDidMount(){
            this.setState({
                search: this.props.location.search.split('?')[1]
            })
            if(!this.props.match.params.param1){
                newsapi.v2.topHeadlines({
                    q: this.props.location.search.split('?')[1]
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
            }
            else if(this.props.match.params.param1 && this.props.match.params.param1.length ===2){
                if(this.props.match.params.param2 && this.props.match.params.param2.length > 2){
                    newsapi.v2.topHeadlines({
                        q: this.props.location.search.split('?')[1],
                        country: this.props.match.params.param1,
                        category: this.props.match.params.param2
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
                        urlCat: `/${this.props.match.params.param1}`,
                        urlCou: `/${this.props.match.params.param2}`,
                        category: this.props.match.params.param2,
                        country: this.props.match.params.param1
                    })
                } else{
                    newsapi.v2.topHeadlines({
                        q: this.props.location.search.split('?')[1],
                        country: this.props.match.params.param1
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
                        urlCat: `/${this.props.match.params.param1}`,
                        country: this.props.match.params.param1
                    })
                }
            } else if(this.props.match.params.param1 && this.props.match.params.param1.length > 2){
                if(this.props.match.params.param2 && this.props.match.params.param2.length ===2){
                    newsapi.v2.topHeadlines({
                        q: this.props.location.search.split('?')[1],
                        country: this.props.match.params.param2,
                        category: this.props.match.params.param1
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
                        urlCat: `/${this.props.match.params.param2}`,
                        urlCou: `/${this.props.match.params.param1}`,
                        category: this.props.match.params.param1,
                        country: this.props.match.params.param2
                    })
                } else {
                    newsapi.v2.topHeadlines({
                        q: this.props.location.search.split('?')[1],
                        category: this.props.match.params.param1
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
                        urlCou: `/${this.props.match.params.param1}`,
                        category: this.props.match.params.param1
                    })
                }
            }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.location.search){
            this.setState({
                search: nextProps.location.search.split('?')[1],
                loading: true,
                news: [],
                totalResults: null
            })
            if(!nextProps.match.params.param1){
                newsapi.v2.topHeadlines({
                    q: nextProps.location.search.split('?')[1]
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
            }
            else if(nextProps.match.params.param1 && nextProps.match.params.param1.length ===2){
                if(nextProps.match.params.param2 && nextProps.match.params.param2.length > 2){
                    newsapi.v2.topHeadlines({
                        q: nextProps.location.search.split('?')[1],
                        country: nextProps.match.params.param1,
                        category: nextProps.match.params.param2
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
                        urlCat: `/${nextProps.match.params.param1}`,
                        urlCou: `/${nextProps.match.params.param2}`,
                        category: nextProps.match.params.param2,
                        country: nextProps.match.params.param1
                    })
                } else{
                    newsapi.v2.topHeadlines({
                        q: nextProps.location.search.split('?')[1],
                        country: nextProps.match.params.param1
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
                        urlCat: `/${nextProps.match.params.param1}`,
                        country: nextProps.match.params.param1
                    })
                }
            } else if(nextProps.match.params.param1 && nextProps.match.params.param1.length > 2){
                if(nextProps.match.params.param2 && nextProps.match.params.param2.length ===2){
                    newsapi.v2.topHeadlines({
                        q: nextProps.location.search.split('?')[1],
                        country: nextProps.match.params.param2,
                        category: nextProps.match.params.param1
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
                        urlCat: `/${nextProps.match.params.param2}`,
                        urlCou: `/${nextProps.match.params.param1}`,
                        category: nextProps.match.params.param1,
                        country: nextProps.match.params.param2
                    })
                } else {
                    newsapi.v2.topHeadlines({
                        q: nextProps.location.search.split('?')[1],
                        category: nextProps.match.params.param1
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
                        urlCou: `/${nextProps.match.params.param1}`,
                        category: nextProps.match.params.param1
                    })
                }
            }

        }
    }

    onDetChange = (dets) => {
      console.log(dets)
    }

    render (){
        const {loading, news, totalResults, urlCat, urlCou, search,category,country} = this.state;
        const {classes } = this.props;
        let recentScreamMarkUp = !loading?news.map((scream,ind)=><Scream key={`${scream.title}${ind}`} scream={scream}/>):(<NewsSkeleton />)
        return (
            <Grid container spacing={2}>
                <Grid item md={10} sm={9} xs={12}>
                    {totalResults && !loading?(
                    <Typography className={classes.center}  variant='body2' color='textSecondary'>{totalResults} results for <em>{this.props.location.search.split('?')[1]}</em></Typography>
                   ):(!loading?(<Typography className={classes.full}  variant='h5' color='textSecondary'>{totalResults} results for <em>{this.props.location.search.split('?')[1]}</em></Typography>):(''))} 
                   {recentScreamMarkUp}
                </Grid>
                <Hidden xsDown>
                    <Grid item md={2} sm={3} xs={12}>
                        <DetailSearch className={classes.full}  onDetChange={(dets) => this.onDetChange(dets)} />
                        <Categories className={classes.full} search={search} category={category} country={country} urlTo={'/results'+urlCat} />
                        <Countries className={classes.full} search={search}  category={category} country={country}  urlTo={'/results'+urlCou} />
                    </Grid>
                </Hidden>
            </Grid>
        )
    }
}

export default withSyles(styles)(results);