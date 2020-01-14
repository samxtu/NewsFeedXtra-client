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


class category extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            news: [],
            category: this.props.match.params.title,
            country: 'All'
        }
    }
    componentDidMount(){
        if(this.props.match.params.name){
            newsapi.v2.topHeadlines({
                category: this.props.match.params.title,
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
        } else {
            newsapi.v2.topHeadlines({
                category: this.props.match.params.title,
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
        if(nextProps.match.params.name){
            this.setState({
                category: nextProps.match.params.title,
                country: nextProps.match.params.name
            })
            newsapi.v2.topHeadlines({
                category: nextProps.match.params.title,
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
        } else {
            this.setState({
                category: nextProps.match.params.title
            })
            newsapi.v2.topHeadlines({
                category: nextProps.match.params.title,
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
                    <Categories category={this.state.category} country={this.state.country} urlTo='/category' />
                    <Countries  category={this.state.category} country={this.state.country} urlTo={`/category/${this.state.category}`}  />
                </Grid>
            </Grid>
        )
    }
}

export default category;