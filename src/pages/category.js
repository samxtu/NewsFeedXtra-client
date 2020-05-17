import React , { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
// api initialization
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.REACT_APP_WORLDNEWS_API_KEY);
const gnewsapiproxy = 'https://us-central1-worldnews-bf737.cloudfunctions.net/api';
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
                caches.match(`https://newsapi.org/v2/top-headlines?country=${this.state.myCountry}&category=${this.props.match.params.title}&pageSize=5`).then(function(res) {
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
                //some cache fetch code here
                gnews = true;
            }
        }
        const This = this;
        // fetch cached data
        caches.match(`https://newsapi.org/v2/top-headlines?sources=${categoriesArray[categoriesArray.findIndex(elem => elem.id === this.props.match.params.title)].sources}&pageSize=5`).then(function(res) {
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
              axios.get(`${gnewsapiproxy}/topic/${this.props.match.params.title}/${this.state.myCountry.toLowerCase()}/5`)
              .then(response => {
                if(response.data.status === 'ok'){
                    networkDataReceived = true
                    this.setState({
                        loading: false,
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
                newsapi.v2.topHeadlines({
                    country: this.state.myCountry,
                    category: this.props.match.params.title,
                    pageSize: 5
                  }).then(response => {
                    if(response.status === 'ok'){
                        networkDataReceived = true
                        this.setState({
                            loading: false,
                            countryNews: response.articles
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
            newsapi.v2.topHeadlines({
                sources: categoriesArray[categoriesArray.findIndex(elem => elem.id === this.props.match.params.title)].sources,
                pageSize: 5
              }).then(response => {
                if(response.status === 'ok'){
                    networkDataReceived = true
                    this.setState({
                        loading: false,
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
    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.props.match.params.title !== nextProps.match.params.title){
            networkDataReceived = false;
            window.scrollTo(0, 0)
            this.setState({page:1,cachePage:1,props:nextProps,loading: true})
            if(countryCovered){
                this.setState({
                    category: nextProps.match.params.title,
                })
                if(newsAPI){
                    newsapi.v2.topHeadlines({
                        country: this.state.myCountry,
                        category: nextProps.match.params.title,
                        page: this.state.page
                      }).then(response => {
                        if(response.status === 'ok'){
                            this.setState({
                                loading: false,
                                countryNews: response.articles
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
                        caches.match(`https://newsapi.org/v2/top-headlines?country=${this.state.myCountry}&category=${nextProps.match.params.title}&pageSize=5`).then(function(res) {
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
                    axios.get(`${gnewsapiproxy}/topic/${nextProps.match.params.title}/${this.state.myCountry.toLowerCase()}/5`)
                      .then(response => {
                        if(response.data.status === 'ok'){
                            this.setState({
                                loading: false,
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
                    //come cache fetch code missing down here async with get req and
                    //dont forget to add online success bool to avoid posting cached articles
                    //when you have new articles from async get also check this for all cache fetch
                }
                

            } 
            newsapi.v2.topHeadlines({
                sources: categoriesArray[categoriesArray.findIndex(elem => elem.id === nextProps.match.params.title)].sources,
                page: this.state.page
                }).then(response => {
                if(response.status === 'ok'){
                    this.setState({
                        loading: false,
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
        caches.match(`https://newsapi.org/v2/top-headlines?sources=${categoriesArray[categoriesArray.findIndex(elem => elem.id === nextProps.match.params.title)].sources}&pageSize=5`).then(function(res) {
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
        const {loading, news, error, theError, countryNews, myCountry } = this.state;
        const headers = [];
        let fetchError = error?(<Alert className={classes.alert} elevation={6} variant="filled" severity="warning">{theError}</Alert>):null;
        let recentScreamMarkUp = !loading?news.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={false} />)
            } else return null
        }):(<NewsSkeleton />)
        let countryScreamMarkUp = !loading?countryNews.map((scream,ind)=>{
            if(scream.title && !headers.includes(scream.title)){
                headers.push(scream.title)
                return (<Scream key={`${scream.title}${ind}`} scream={scream} trending={false} />)
            } else return null
        }):(null)
        return (
            <Grid container spacing={2}>
            {fetchError}
                <Hidden smDown>
                <Grid item md={2}>
                    
                </Grid></Hidden>
                <Grid item md={8} sm={9} xs={12}>
                    {!loading&&countryCovered&&(<Fragment><Typography component={Link} href={'/country/'+myCountry+'/'+this.state.category} to={'/country/'+myCountry+'/'+this.state.category} variant='h4' color='textPrimary'><b>{this.state.category}: {countryArray.filter(country => country.code === myCountry)[0].label} <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                    {countryScreamMarkUp}
                    {!loading&&(<Fragment><Typography component={Link} href={'/top-stories/'+this.state.category} to={'/top-stories/'+this.state.category} variant='h4' color='textPrimary'><b>{this.state.category}: World headlines <ChevronRightIcon className={classes.muiIcons} /></b></Typography><hr/></Fragment>)}
                    {recentScreamMarkUp}
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