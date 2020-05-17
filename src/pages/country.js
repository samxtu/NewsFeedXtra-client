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
const countryArray = [
    { code: 'BS', label: 'Bahamas', api: 'gnews' },
    { code: 'BH', label: 'Bahrain', api: 'gnews' },
    { code: 'BD', label: 'Bangladesh', api: 'gnews' },
    { code: 'BB', label: 'Barbados', api: 'gnews' },
    { code: 'BY', label: 'Belarus', api: 'gnews' },
    { code: 'BZ', label: 'Belize', api: 'gnews' },
    { code: 'BJ', label: 'Benin', api: 'gnews' },
    { code: 'BM', label: 'Bermuda', api: 'gnews' },
    { code: 'BT', label: 'Bhutan', api: 'gnews' },
    { code: 'BO', label: 'Bolivia', api: 'gnews' },
    { code: 'BA', label: 'Bosnia and Herzegovina', api: 'gnews' },
    { code: 'BW', label: 'Botswana', api: 'gnews' },
    { code: 'BV', label: 'Bouvet Island', api: 'gnews' },
    { code: 'IO', label: 'British Indian Ocean Territory', api: 'gnews' },
    { code: 'BN', label: 'Brunei Darussalam', api: 'gnews' },
    { code: 'BF', label: 'Burkina Faso', api: 'gnews' },
    { code: 'BI', label: 'Burundi', api: 'gnews' },
    { code: 'KH', label: 'Cambodia', api: 'gnews' },
    { code: 'CM', label: 'Cameroon', api: 'gnews' },
    { code: 'CV', label: 'Cape Verde', api: 'gnews' },
    { code: 'KY', label: 'Cayman Islands', api: 'gnews' },
    { code: 'CF', label: 'Central African Republic', api: 'gnews' },
    { code: 'TD', label: 'Chad', api: 'gnews' },
    { code: 'CL', label: 'Chile', api: 'gnews' },
    { code: 'CX', label: 'Christmas Island', api: 'gnews' },
    { code: 'CC', label: 'Cocos (Keeling) Islands', api: 'gnews' },
    { code: 'KM', label: 'Comoros', api: 'gnews' },
    { code: 'CG', label: 'Congo', api: 'gnews' },
    { code: 'CD', label: 'Congo, the Democratic Republic of', api: 'gnews' },
    { code: 'CK', label: 'Cook Islands', api: 'gnews' },
    { code: 'CR', label: 'Costa Rica', api: 'gnews' },
    { code: 'CI', label: 'Cote D"ivoire', api: 'gnews' },
    { code: 'HR', label: 'Croatia', api: 'gnews' },
    { code: 'CY', label: 'Cyprus', api: 'gnews' },
    { code: 'DK', label: 'Denmark', api: 'gnews' },
    { code: 'DJ', label: 'Djibouti', api: 'gnews' },
    { code: 'DM', label: 'Dominica', api: 'gnews' },
    { code: 'DO', label: 'Dominican Republic', api: 'gnews' },
    { code: 'EC', label: 'Ecuador', api: 'gnews' },
    { code: 'SV', label: 'El Salvador', api: 'gnews' },
    { code: 'GQ', label: 'Equatorial Guinea', api: 'gnews' },
    { code: 'ER', label: 'Eritrea', api: 'gnews' },
    { code: 'EE', label: 'Estonia', api: 'gnews' },
    { code: 'ET', label: 'Ethiopia', api: 'gnews' },
    { code: 'FK', label: 'Falkland Islands (Malvinas)', api: 'gnews' },
    { code: 'FO', label: 'Faroe Islands', api: 'gnews' },
    { code: 'FJ', label: 'Fiji', api: 'gnews' },
    { code: 'FI', label: 'Finland', api: 'gnews' },
    { code: 'GF', label: 'French Guiana', api: 'gnews' },
    { code: 'PF', label: 'French Polynesia', api: 'gnews' },
    { code: 'TF', label: 'French Southern Territories', api: 'gnews' },
    { code: 'GA', label: 'Gabon', api: 'gnews' },
    { code: 'GM', label: 'Gambia', api: 'gnews' },
    { code: 'GE', label: 'Georgia', api: 'gnews' },
    { code: 'GH', label: 'Ghana', api: 'gnews' },
    { code: 'GI', label: 'Gibraltar', api: 'gnews' },
    { code: 'GL', label: 'Greenland', api: 'gnews' },
    { code: 'GD', label: 'Grenada', api: 'gnews' },
    { code: 'GP', label: 'Guadeloupe', api: 'gnews' },
    { code: 'GU', label: 'Guam', api: 'gnews' },
    { code: 'GT', label: 'Guatemala', api: 'gnews' },
    { code: 'GN', label: 'Guinea', api: 'gnews' },
    { code: 'GW', label: 'Guinea-Bissau', api: 'gnews' },
    { code: 'GY', label: 'Guyana', api: 'gnews' },
    { code: 'HT', label: 'Haiti', api: 'gnews' },
    { code: 'HM', label: 'Heard Island and Mcdonald Islands', api: 'gnews' },
    { code: 'VA', label: 'Holy See (Vatican City State)', api: 'gnews' },
    { code: 'HN', label: 'Honduras', api: 'gnews' },
    { code: 'IS', label: 'Iceland', api: 'gnews' },
    { code: 'IR', label: 'Iran, Islamic Republic of', api: 'gnews' },
    { code: 'IQ', label: 'Iraq', api: 'gnews' },
    { code: 'JM', label: 'Jamaica', api: 'gnews' },
    { code: 'JO', label: 'Jordan', api: 'gnews' },
    { code: 'KZ', label: 'Kazakhstan', api: 'gnews' },
    { code: 'KE', label: 'Kenya', api: 'gnews' },
    { code: 'KI', label: 'Kiribati', api: 'gnews' },
    { code: 'KP', label: 'Korea, Democratic People"s Republic of', api: 'gnews' },
    { code: 'KW', label: 'Kuwait', api: 'gnews' },
    { code: 'KG', label: 'Kyrgyzstan', api: 'gnews' },
    { code: 'LA', label: 'Lao People"s Democratic Republic', api: 'gnews' },
    { code: 'LB', label: 'Lebanon', api: 'gnews' },
    { code: 'LS', label: 'Lesotho', api: 'gnews' },
    { code: 'LR', label: 'Liberia', api: 'gnews' },
    { code: 'LY', label: 'Libyan Arab Jamahiriya', api: 'gnews' },
    { code: 'LI', label: 'Liechtenstein', api: 'gnews' },
    { code: 'LU', label: 'Luxembourg', api: 'gnews' },
    { code: 'MO', label: 'Macao', api: 'gnews' },
    { code: 'MK', label: 'Macedonia, the Former Yugosalv Republic of', api: 'gnews' },
    { code: 'MG', label: 'Madagascar', api: 'gnews' },
    { code: 'MW', label: 'Malawi', api: 'gnews' },
    { code: 'MV', label: 'Maldives', api: 'gnews' },
    { code: 'ML', label: 'Mali', api: 'gnews' },
    { code: 'MT', label: 'Malta', api: 'gnews' },
    { code: 'MH', label: 'Marshall Islands', api: 'gnews' },
    { code: 'MQ', label: 'Martinique', api: 'gnews' },
    { code: 'MR', label: 'Mauritania', api: 'gnews' },
    { code: 'MU', label: 'Mauritius', api: 'gnews' },
    { code: 'YT', label: 'Mayotte', api: 'gnews' },
    { code: 'FM', label: 'Micronesia, Federated States of', api: 'gnews' },
    { code: 'MD', label: 'Moldova, Republic of', api: 'gnews' },
    { code: 'MC', label: 'Monaco', api: 'gnews' },
    { code: 'MN', label: 'Mongolia', api: 'gnews' },
    { code: 'MS', label: 'Montserrat', api: 'gnews' },
    { code: 'MZ', label: 'Mozambique', api: 'gnews' },
    { code: 'MM', label: 'Myanmar', api: 'gnews' },
    { code: 'NA', label: 'Namibia', api: 'gnews' },
    { code: 'NR', label: 'Nauru', api: 'gnews' },
    { code: 'NP', label: 'Nepal', api: 'gnews' },
    { code: 'AN', label: 'Netherlands Antilles', api: 'gnews' },
    { code: 'NC', label: 'New Caledonia', api: 'gnews' },
    { code: 'NI', label: 'Nicaragua', api: 'gnews' },
    { code: 'NE', label: 'Niger', api: 'gnews' },
    { code: 'NU', label: 'Niue', api: 'gnews' },
    { code: 'NF', label: 'Norfolk Island', api: 'gnews' },
    { code: 'MP', label: 'Northern Mariana Islands', api: 'gnews' },
    { code: 'OM', label: 'Oman', api: 'gnews' },
    { code: 'PK', label: 'Pakistan', api: 'gnews' },
    { code: 'PW', label: 'Palau', api: 'gnews' },
    { code: 'PS', label: 'Palestinian Territory, Occupied', api: 'gnews' },
    { code: 'PA', label: 'Panama', api: 'gnews' },
    { code: 'PG', label: 'Papua New Guinea', api: 'gnews' },
    { code: 'PY', label: 'Paraguay', api: 'gnews' },
    { code: 'PE', label: 'Peru', api: 'gnews' },
    { code: 'PN', label: 'Pitcairn', api: 'gnews' },
    { code: 'PR', label: 'Puerto Rico', api: 'gnews' },
    { code: 'QA', label: 'Qatar', api: 'gnews' },
    { code: 'RE', label: 'Reunion', api: 'gnews' },
    { code: 'RW', label: 'Rwanda', api: 'gnews' },
    { code: 'SH', label: 'Saint Helena', api: 'gnews' },
    { code: 'KN', label: 'Saint Kitts and Nevis', api: 'gnews' },
    { code: 'LC', label: 'Saint Lucia', api: 'gnews' },
    { code: 'PM', label: 'Saint Pierre and Miquelon', api: 'gnews' },
    { code: 'VC', label: 'Saint Vincent and the Grenadines', api: 'gnews' },
    { code: 'WS', label: 'Samoa', api: 'gnews' },
    { code: 'SM', label: 'San Marino', api: 'gnews' },
    { code: 'ST', label: 'Sao Tome and Principe', api: 'gnews' },
    { code: 'SN', label: 'Senegal', api: 'gnews' },
    { code: 'CS', label: 'Serbia and Montenegro', api: 'gnews' },
    { code: 'SC', label: 'Seychelles', api: 'gnews' },
    { code: 'SL', label: 'Sierra Leone', api: 'gnews' },
    { code: 'SB', label: 'Solomon Islands', api: 'gnews' },
    { code: 'SO', label: 'Somalia', api: 'gnews' },
    { code: 'GS', label: 'South Georgia and the South Sandwich Islands', api: 'gnews' },
    { code: 'ES', label: 'Spain', api: 'gnews' },
    { code: 'LK', label: 'Sri Lanka', api: 'gnews' },
    { code: 'SD', label: 'Sudan', api: 'gnews' },
    { code: 'SR', label: 'Suriname', api: 'gnews' },
    { code: 'SJ', label: 'Svalbard and Jan Mayen', api: 'gnews' },
    { code: 'SZ', label: 'Swaziland', api: 'gnews' },
    { code: 'SY', label: 'Syrian Arab Republic', api: 'gnews' },
    { code: 'TJ', label: 'Tajikistan', api: 'gnews' },
    { code: 'TZ', label: 'Tanzania, United Republic of', api: 'gnews' },
    { code: 'TL', label: 'Timor-Leste', api: 'gnews' },
    { code: 'TG', label: 'Togo', api: 'gnews' },
    { code: 'TK', label: 'Tokelau', api: 'gnews' },
    { code: 'TO', label: 'Tonga', api: 'gnews' },
    { code: 'TT', label: 'Trinidad and Tobago', api: 'gnews' },
    { code: 'TN', label: 'Tunisia', api: 'gnews' },
    { code: 'TM', label: 'Turkmenistan', api: 'gnews' },
    { code: 'TC', label: 'Turks and Caicos Islands', api: 'gnews' },
    { code: 'TV', label: 'Tuvalu', api: 'gnews' },
    { code: 'UG', label: 'Uganda', api: 'gnews' },
    { code: 'AE', label: 'United Arab Emirates', api: 'gnews' },
    { code: 'UK', label: 'United Arab Emirates', api: 'gnews' },
    { code: 'UM', label: 'United States Minor Outlying Islands', api: 'gnews' },
    { code: 'UY', label: 'Uruguay', api: 'gnews' },
    { code: 'UZ', label: 'Uzbekistan', api: 'gnews' },
    { code: 'VU', label: 'Vanuatu', api: 'gnews' },
    { code: 'VN', label: 'Viet Nam', api: 'gnews' },
    { code: 'VG', label: 'Virgin Islands, British', api: 'gnews' },
    { code: 'VI', label: 'Virgin Islands, U.S.', api: 'gnews' },
    { code: 'WF', label: 'Wallis and Futuna', api: 'gnews' },
    { code: 'EH', label: 'Western Sahara', api: 'gnews' },
    { code: 'YE', label: 'Yemen', api: 'gnews' },
    { code: 'ZM', label: 'Zambia', api: 'gnews' },
    { code: 'ZW', label: 'Zimbabwe', api: 'gnews' },
	{ code: 'AF', label: 'Afghanistan', api: 'gnews' },
    { code: 'AL', label: 'Albania', api: 'gnews' },
    { code: 'DZ', label: 'Algeria', api: 'gnews' },
    { code: 'AS', label: 'American Samoa', api: 'gnews' },
    { code: 'AD', label: 'Andorra', api: 'gnews' },
    { code: 'AO', label: 'Angola', api: 'gnews' },
    { code: 'AI', label: 'Anguilla', api: 'gnews' },
    { code: 'AQ', label: 'Antarctica', api: 'gnews' },
    { code: 'AG', label: 'Antigua and Barbuda', api: 'gnews' },
    { code: 'AM', label: 'Armenia', api: 'gnews' },
    { code: 'AW', label: 'Aruba', api: 'gnews' },
    { code: 'AZ', label: 'Azerbaijan', api: 'gnews' },
    { code: 'AR', label: 'Argentina', api: 'newsAPI' },
    { code: 'AT', label: 'Austria', api: 'newsAPI' },
    { code: 'AU', label: 'Australia', api: 'newsAPI' },
    { code: 'BE', label: 'Belgium', api: 'newsAPI' },
    { code: 'BR', label: 'Brazil', api: 'newsAPI' },
    { code: 'BG', label: 'Bulgaria', api: 'newsAPI' },
    { code: 'CA', label: 'Canada', api: 'newsAPI' },
    { code: 'CH', label: 'Switzerland', api: 'newsAPI' },
    { code: 'CN', label: 'China', api: 'newsAPI' },
    { code: 'CO', label: 'Colombia', api: 'newsAPI' },
    { code: 'CU', label: 'Cuba', api: 'newsAPI' },
    { code: 'CZ', label: 'Czech Republic', api: 'newsAPI'  },
    { code: 'DE', label: 'Germany', api: 'newsAPI' },
    { code: 'EG', label: 'Egypt', api: 'newsAPI' },
    { code: 'FR', label: 'France', api: 'newsAPI' },
    { code: 'GB', label: 'United Kingdom', api: 'newsAPI' },
    { code: 'GR', label: 'Greece', api: 'newsAPI' },
    { code: 'HK', label: 'Hong Kong', api: 'newsAPI' },
    { code: 'HU', label: 'Hungary', api: 'newsAPI' },
    { code: 'ID', label: 'Indonesia', api: 'newsAPI' },
    { code: 'IE', label: 'Ireland', api: 'newsAPI' },
    { code: 'IL', label: 'Israel', api: 'newsAPI' },
    { code: 'IN', label: 'India', api: 'newsAPI' },
    { code: 'IT', label: 'Italy', api: 'newsAPI' },
    { code: 'JP', label: 'Japan', api: 'newsAPI' },
    { code: 'KR', label: 'Korea, Republic of', api: 'newsAPI' },
    { code: 'LT', label: 'Lithuania', api: 'newsAPI' },
    { code: 'LV', label: 'Latvia', api: 'newsAPI' },
    { code: 'MA', label: 'Morocco', api: 'newsAPI' },
    { code: 'MX', label: 'Mexico', api: 'newsAPI' },
    { code: 'MY', label: 'Malaysia', api: 'newsAPI' },
    { code: 'NG', label: 'Nigeria', api: 'newsAPI' },
    { code: 'NL', label: 'Netherlands', api: 'newsAPI' },
    { code: 'NO', label: 'Norway', api: 'newsAPI' },
    { code: 'NZ', label: 'New Zealand', api: 'newsAPI' },
    { code: 'PH', label: 'Philippines', api: 'newsAPI' },
    { code: 'PL', label: 'Poland', api: 'newsAPI' },
    { code: 'PT', label: 'Portugal', api: 'newsAPI' },
    { code: 'RO', label: 'Romania', api: 'newsAPI' },
    { code: 'RS', label: 'Serbia', api: 'newsAPI' },
    { code: 'RU', label: 'Russian Federation', api: 'newsAPI' },
    { code: 'SA', label: 'Saudi Arabia', api: 'newsAPI' },
    { code: 'SE', label: 'Sweden', api: 'newsAPI' },
    { code: 'SG', label: 'Singapore', api: 'newsAPI' },
    { code: 'SI', label: 'Slovenia', api: 'newsAPI' },
    { code: 'SK', label: 'Slovakia', api: 'newsAPI' },
    { code: 'TH', label: 'Thailand', api: 'newsAPI' },
    { code: 'TR', label: 'Turkey', api: 'newsAPI' },
    { code: 'TW', label: 'Taiwan, Province of China', api: 'newsAPI' },
    { code: 'UA', label: 'Ukraine', api: 'newsAPI' },
    { code: 'US', label: 'United States', api: 'newsAPI' },
    { code: 'VE', label: 'Venezuela', api: 'newsAPI' },
    { code: 'ZA', label: 'South Africa', api: 'newsAPI' }
];
var newsAPI = false;
var gnews = false;
var networkDataReceived = false;
const styles = () => ({
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
            props: {}
        }
    }

    UNSAFE_componentWillMount(){
        if(countryArray.filter(country => Boolean(country.code === this.state.myCountry) && Boolean(country.api === 'newsAPI'))[0]){
        newsAPI = true;
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
                        caches.match('https://newsapi.org/v2/top-headlines?country='+this.props.match.params.name+'&category='+cat.id+'&pageSize=5',{ignoreMethod:true,ignoreVary:true})
                        .then(function(res) {
                            if (!res) throw Error("No data");
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
        //more code needed here
    }
    }

    componentDidMount(){
        this.setState({props:this.props})
        window.scrollTo(0, 0)
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
                axios.get(`${gnewsapiproxy}/topic/${this.props.match.params.title}/${this.props.match.params.name.toLowerCase()}/20`)
                  .then(response => {
                    if(response.data.status === 'ok'){
                        this.setState({
                            loading: false,
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
                    return axios.get(`${gnewsapiproxy}/topic/${category.id}/${this.props.match.params.name.toLowerCase()}/5`)    
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
                            business: [],
                            entertainment: [],
                            general: [],
                            health: [],
                            science: [],
                            sports: [],
                            technology: [],
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
                        news: response.articles
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
            }
            if(gnews){
                axios.get(`${gnewsapiproxy}/topic/${nextProps.match.params.title}/${nextProps.match.params.name.toLowerCase()}/20`)
                  .then(response => {
                    if(response.data.status === 'ok'){
                        this.setState({
                            loading: false,
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

                //some cache fetch async code here
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
                        if (!res) throw Error("No data");
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
                    })
                    .then(()=> resolve(true))
                    .catch(err=> reject(err))
                }))
            })
            Promise.all(cachegets)
            }
            if(gnews){
                categoriesArray.map(category =>{
                    return axios.get(`${gnewsapiproxy}/topic/${category.id}/${nextProps.match.params.name.toLowerCase()}/5`)
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

                //more cache fetch async code here
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
            return axios.get(`${gnewsapiproxy}/topic/${this.state.category}/${this.state.country}/${20*this.state.page}`)
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
                    // caches.match('https://newsapi.org/v2/top-headlines?country='+this.state.country+'&category='+this.state.category+'&page='+this.state.cachePage,{ignoreMethod:true,ignoreVary:true})
                    // .then(function(res) {
                    //     if (!res) throw Error("No data");
                    //     console.log("we got the good stuff")
                    //     return res.json();
                    // }).then(function(response) {
                    //     console.log(response)
                    //     // don't overwrite newer network data
                    //     if (!networkDataReceived) {
                    //         console.log("the state was set")
                    //         This.setState({
                    //             moreLoading: false,
                    //             cachePage: This.state.cachePage+1,
                    //             news: This.state.news.concat(response.articles)
                    //         })
                    //         console.log(This.state.news)
                    //     }
                    // }).catch(err=> {
                    //     this.setState({
                    //         moreLoading: false
                    //     })
                    //     return console.log(err)
                    // })
                }
            });
        }
    }

    render (){
        const {classes} = this.props;
        const {loading, news, error, theError, moreLoading,category,general,generalActive,generalViz,
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
                        {!loading&&generalViz&&(<Fragment><Typography component={Link} href={'/category/general'} to={'/category/general'} variant='h4' color='textPrimary'><b>General <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
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
                        {!loading&&entertainmentViz&&(<Fragment><Typography component={Link} href={'/category/entertainment'} to={'/category/entertainment'} variant='h4' color='textPrimary'><b>Entertainment <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
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
                        {!loading&&businessViz&&(<Fragment><Typography component={Link} href={'/category/business'} to={'/category/business'} variant='h4' color='textPrimary'><b>Business <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
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
                        {!loading&&healthViz&&(<Fragment><Typography component={Link} href={'/category/health'} to={'/category/health'} variant='h4' color='textPrimary'><b>Health <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
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
                        {!loading&&scienceViz&&(<Fragment><Typography component={Link} href={'/category/science'} to={'/category/science'} variant='h4' color='textPrimary'><b>Science <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
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
                        {!loading&&sportsViz&&(<Fragment><Typography component={Link} href={'/category/sports'} to={'/category/sports'} variant='h4' color='textPrimary'><b>Sports <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                        {sportsMarkup}
                        </Fragment>
                        </VizSensor>
                        <br/>
                        {!loading&&technologyViz&&(<Fragment><Typography component={Link} href={'/category/technology'} to={'/category/technology'} variant='h4' color='textPrimary'><b>Technology <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
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
