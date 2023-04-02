import React from 'react';
import Grid from '@mui/material/Grid';
import {Title} from './Title'


export default function ComponentsGrid() {


  return (

  <Grid
    container
    columns={{ xs: 4, sm: 8, md: 10 }}
    direction='row'
    alignItems="center"
    justifyContent="center">   
    <Title/>  
  </Grid>   
  )
}
