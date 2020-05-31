import React from 'react';
import {Link} from 'react-router-dom';
//mui
import Typography from '@material-ui/core/Typography';

export default function ReadMore({ link }) {
    return (<Typography component={Link} href={link} to={link} variant='h6' style={{ color: '#c3938f', fontColor: '#c3938f'}}><b>Read more >>></b></Typography>)
}