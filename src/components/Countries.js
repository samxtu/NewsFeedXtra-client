import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import {Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  button: {
    fontFamily: "Playfair Display",
    display: 'block',
    marginTop: theme.spacing(2),
    [theme.breakpoints.only('sm')]: {
      fontSize: '70%'
    }
  },
  formControl: {
    fontFamily: "Playfair Display",
    margin: theme.spacing(1),
    minWidth: '90%',
  },
  noPad: {
    padding: '1px',
  }
}));
export default function ControlledOpenSelect({country,category,urlTo,search}) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

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

  const handleChange = event => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  return (
    <Card className={classes.card}>
    <CardContent 
      className={classes.noPad}>
      <Button className={classes.button} onClick={handleOpen}>
        <b>News by country:</b>
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Countries</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
            
            {countryArray.map((text, index) => (
              text.code===country?(
                <MenuItem 
                  component={Link}
                  href={`${urlTo}/${text.code.toLowerCase()}`}
                  to={{ pathname: `${urlTo}/${text.code.toLowerCase()}`, search: search }} key={text.label} value={text.code}>{'=>'+text.label}</MenuItem>
              ):(
              <MenuItem 
                component={Link}
                href={`${urlTo}/${text.code.toLowerCase()}`}
                to={{ pathname: `${urlTo}/${text.code.toLowerCase()}`, search: search }} key={text.label} value={text.code}>{text.label}</MenuItem>
            )))}
          
        </Select>
      </FormControl>
      </CardContent>
    </Card>
  );
}
