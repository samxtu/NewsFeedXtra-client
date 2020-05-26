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
import countryArray from '../util/consts';
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
