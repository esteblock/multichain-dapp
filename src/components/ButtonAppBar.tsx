import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {futurenet, standalone} from '@soroban-react/chains';




import {WalletData} from '@soroban-react/wallet-data'
import { useSorobanReact } from '@soroban-react/core'

export default function ButtonAppBar() {
  const sorobanContext=useSorobanReact()
  
  return (

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Soroban Multichain Dapp with @soroban-react
          </Typography>
          <div>
          {!sorobanContext.address &&
            <div>
              <Button
              size="small"
              variant="contained"
              onClick={()=> sorobanContext.setActiveChain(standalone)}>
                Connect to Standalone
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={()=> sorobanContext.setActiveChain(futurenet)}>
                Connect to Futurenet
            </Button>    
            </div>
          
          }

          </div>
          <WalletData sorobanContext={sorobanContext} />
        </Toolbar>
      </AppBar>
  
  );
}
