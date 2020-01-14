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


class home extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            news: []
        }
    }
    componentDidMount(){
        newsapi.v2.topHeadlines({
            language: 'en'
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
    render (){
        const {loading, news} = this.state;
        let recentScreamMarkUp = !loading?news.map((scream,ind)=><Scream key={`${scream.title}${ind}`} scream={scream}/>):(<NewsSkeleton />)
        return (
            <Grid container spacing={1}>
                <Grid item sm={10} xs={12}>
                    {recentScreamMarkUp}
                </Grid>
                <Grid  item sm={2} xs={12}>
                    <Categories category='All' country='All' urlTo='/category' />
                    <Countries country='All' category='All'  urlTo='/country' />
                </Grid>
            </Grid>
        )
    }
}

export default home;