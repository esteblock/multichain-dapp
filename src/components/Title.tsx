import * as React from 'react';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import {SetTitleButton} from './SetTitleButton'
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
    <Card >
        <h1> Title: {myTitle} </h1>
        <br/>
        <FormControl>
          Set new title:
          <OutlinedInput
            type="text"
            value={newTitle}
            onChange={handleNewTitleChange}
          />
        </FormControl>
        <br/>
        <br/>
        <SetTitleButton newTitle={newTitle}/>  
    </Card>
  );
}