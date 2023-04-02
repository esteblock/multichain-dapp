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
import { accountIdentifier } from '@soroban-react/utils';
import { useContractValue } from '@soroban-react/contracts'
import contract_ids from '../contract_ids.json'




export function Title ({balancesBigNumber}:{balancesBigNumber: any}){
 
  const [newTitle, setNewTitle] = React.useState('');

    const handleNewTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(event.target.value)
      
    };

  console.log("contract_ids: ", contract_ids.standalone.title_id,)
  const sorobanContext = useSorobanReact()

  
  const currentTitle = useContractValue({ 
    contractId: '7c370998aa3d022a6736a5ca04470775039f120198b0ef716dae011225c80051',
    method: 'read_title',
    sorobanContext: sorobanContext
  })
  console.log("currentTitle: ", currentTitle)


    return (   
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
       Your title here
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