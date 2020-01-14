import React , { Component } from 'react';
import Grid from '@material-ui/core/Grid';


//Components
import Scream from '../components/Scream';
import Categories from '../components/Categories';
import Countries from '../components/Countries';
import NewsSkeleton from '../components/NewsSkeleton';

// mui stuff
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('9047eaa819904eb49205d2d53ab54356');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them


class country extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            news: [],
            category: 'All',
            country: this.props.match.params.name
        }
    }
    componentDidMount(){
        if(this.props.match.params.title){
            newsapi.v2.topHeadlines({
                country: this.props.match.params.name,
                category: this.props.match.params.title
              }).then(response => {
                if(response.status === 'ok'){
                    this.setState({
                        loading: false,
                        news: response.articles
                    })
                } 
            })
            .catch((err)=>{
                console.log(err)
            });
        } else {
        newsapi.v2.topHeadlines({
            country: this.props.match.params.name
          }).then(response => {
            if(response.status === 'ok'){
                this.setState({
                    loading: false,
                    news: response.articles
                })
            } 
        })
        .catch((err)=>{
            console.log(err)
        });
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.match.params.title){
            this.setState({
                category: nextProps.match.params.title,
                country: nextProps.match.params.name
            })
            newsapi.v2.topHeadlines({
                country: nextProps.match.params.name,
                category: nextProps.match.params.title
              }).then(response => {
                if(response.status === 'ok'){
                    this.setState({
                        loading: false,
                        news: response.articles
                    })
                } 
            })
            .catch((err)=>{
                console.log(err)
            });
        } else {
            this.setState({
                country: nextProps.match.params.name
            })
            newsapi.v2.topHeadlines({
                country: nextProps.match.params.name
              }).then(response => {
                if(response.status === 'ok'){
                    this.setState({
                        loading: false,
                        news: response.articles
                    })
                } 
            })
            .catch((err)=>{
                console.log(err)
            });
        }
    }
    render (){
        const {loading, news} = this.state;
        let recentScreamMarkUp = !loading?news.map((scream,ind)=><Scream key={`${scream.title}${ind}`} scream={scream}/>):(<NewsSkeleton />)
        return (
            <Grid container spacing={2}>
                <Grid item sm={10} xs={12}>
                    {recentScreamMarkUp}
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Categories  category={this.state.category} country={this.state.country}  urlTo={`/country/${this.state.country}`} />
                    <Countries  category={this.state.category} country={this.state.country}  urlTo='/country' />
                </Grid>
            </Grid>
        )
    }
}

export default country;
