import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Link} from 'react-router-dom';
import BackspaceIcon from '@material-ui/icons/Backspace';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: "Playfair Display",
    '& > * + *': {
      marginLeft: theme.spacing(2),
    }
  },
  breadcrumb:{
    fontFamily: "Playfair Display",
      display: 'inline-block'
  },
  clearButton: {
      display: 'inline-block'
  }
}));

export default function CustomSeparator({country,category,search,param1}) {
  const classes = useStyles();
  const [state, setState] = React.useState({    
  });
  
  useEffect(()=>{   
      console.log('useEffect is called')
      const countryArray = [
        { code: 'AR', label: 'Argentina', phone: '54' },
        { code: 'AT', label: 'Austria', phone: '43' },
        { code: 'AU', label: 'Australia', phone: '61', suggested: true },
        { code: 'BE', label: 'Belgium', phone: '32' },
        { code: 'BR', label: 'Brazil', phone: '55' },
        { code: 'BG', label: 'Bulgaria', phone: '1-242' },
        { code: 'CA', label: 'Canada', phone: '1', suggested: true },
        { code: 'CH', label: 'Switzerland', phone: '41' },
        { code: 'CN', label: 'China', phone: '86' },
        { code: 'CO', label: 'Colombia', phone: '57' },
        { code: 'CU', label: 'Cuba', phone: '53' },
        { code: 'CZ', label: 'Czech Republic', phone: '420' },
        { code: 'DE', label: 'Germany', phone: '49', suggested: true },
        { code: 'EG', label: 'Egypt', phone: '20' },
        { code: 'FR', label: 'France', phone: '33', suggested: true },
        { code: 'GB', label: 'United Kingdom', phone: '44' },
        { code: 'GR', label: 'Greece', phone: '30' },
        { code: 'HK', label: 'Hong Kong', phone: '852' },
        { code: 'HU', label: 'Hungary', phone: '36' },
        { code: 'ID', label: 'Indonesia', phone: '62' },
        { code: 'IE', label: 'Ireland', phone: '353' },
        { code: 'IL', label: 'Israel', phone: '972' },
        { code: 'IN', label: 'India', phone: '91' },
        { code: 'IT', label: 'Italy', phone: '39' },
        { code: 'JP', label: 'Japan', phone: '81', suggested: true },
        { code: 'KR', label: 'Korea, Republic of', phone: '82' },
        { code: 'LT', label: 'Lithuania', phone: '370' },
        { code: 'LV', label: 'Latvia', phone: '371' },
        { code: 'MA', label: 'Morocco', phone: '212' },
        { code: 'MX', label: 'Mexico', phone: '52' },
        { code: 'MY', label: 'Malaysia', phone: '60' },
        { code: 'NG', label: 'Nigeria', phone: '234' },
        { code: 'NL', label: 'Netherlands', phone: '31' },
        { code: 'NO', label: 'Norway', phone: '47' },
        { code: 'NZ', label: 'New Zealand', phone: '64' },
        { code: 'PH', label: 'Philippines', phone: '63' },
        { code: 'PL', label: 'Poland', phone: '48' },
        { code: 'PT', label: 'Portugal', phone: '351' },
        { code: 'RO', label: 'Romania', phone: '40' },
        { code: 'RS', label: 'Serbia', phone: '381' },
        { code: 'RU', label: 'Russian Federation', phone: '7' },
        { code: 'SA', label: 'Saudi Arabia', phone: '966' },
        { code: 'SE', label: 'Sweden', phone: '46' },
        { code: 'SG', label: 'Singapore', phone: '65' },
        { code: 'SI', label: 'Slovenia', phone: '386' },
        { code: 'SK', label: 'Slovakia', phone: '421' },
        { code: 'TH', label: 'Thailand', phone: '66' },
        { code: 'TR', label: 'Turkey', phone: '90' },
        { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
        { code: 'UA', label: 'Ukraine', phone: '380' },
        { code: 'US', label: 'United States', phone: '1', suggested: true },
        { code: 'VE', label: 'Venezuela', phone: '58' },
        { code: 'ZA', label: 'South Africa', phone: '27' }
      ];
      let countryToUseIndex = country === 'All'?(-1):(countryArray.findIndex(
            cou => cou.code === country.toUpperCase()
        ))
        if(country === 'All' || category === 'All'){
            if(country === param1){
                setState({
                    linkToParam1: `/results/${country}`,
                    param2Name: countryArray[countryToUseIndex].label,
                    param1Name: null
                })
            } else {
                setState({
                    linkToParam1: `/results/${category}`,
                    param2Name: category,
                    param1Name: null,
                })
            }
        } else{      
            if(country === param1){
                    setState({
                        linkToParam1: `/results/${country}`,
                        param1Name: countryArray[countryToUseIndex].label,
                        param2Name: category
                    })
                } else {
                    setState({
                        linkToParam1: `/results/${category}`,
                        param1Name: category,
                        param2Name: countryToUseIndex>= 0?countryArray[countryToUseIndex].label:null,
                    })
                }
            }
  },[country,category,search,param1])
  return (
    <div className={classes.root}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.breadcrumb}>
        <Typography color="textPrimary" variant='body2'>
          Filters:
        </Typography>
        {state.param1Name?<MuiLink color="textPrimary" component={Link} to={{ pathname: state.linkToParam1, search: search }}>
          <Typography variant='body1' color='textPrimary'>{state.param1Name}</Typography>
        </MuiLink>:null}
        <Typography color="textPrimary" variant='body1'>{state.param2Name}</Typography>
      </Breadcrumbs>
      <Tooltip title='Clear filters' placement='top' className={classes.clearButton}>
            <IconButton component={Link} to={{ pathname: '/results', search: search }} name={'clear'} aria-label={'clear filters'} size='small'>
                <BackspaceIcon color="primary"  />
            </IconButton>
      </Tooltip>
    </div>
  );
}



var s = ''