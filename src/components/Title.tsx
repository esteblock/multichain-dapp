import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';


import {SetTitleButton} from './buttons/SetTitleButton'

import { useSorobanReact } from '@soroban-react/core';
import { useTitle } from '../hooks/useTitle';

export const Title : React.FunctionComponent = () => {
 
  const sorobanContext = useSorobanReact()
  const myTitle = useTitle({sorobanContext})
  const [newTitle, setNewTitle] = React.useState<string>(''); 

  const handleNewTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  };

    return (   
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
       Title: {myTitle}
        </Typography>
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-amount">Set a new title</InputLabel>
          <OutlinedInput
            
            type="text"
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">
            </InputAdornment>}
             value={newTitle}
            onChange={handleNewTitleChange}
            label="New title"
          />
        </FormControl>

      </CardContent>
       <CardActions>
        <SetTitleButton
          newTitle={newTitle}
        ></SetTitleButton>
      </CardActions>
      
    </Card>
  );
}