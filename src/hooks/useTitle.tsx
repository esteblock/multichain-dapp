import { SorobanContextType } from '@soroban-react/core';
import {useContractValue} from '@soroban-react/contracts'
import contract_ids from '../contract_ids.json'
//import {scvalToString} from '@soroban-react/utils';

import * as SorobanClient from 'soroban-client';


export function scvalToString(value: SorobanClient.xdr.ScVal): string | undefined {
  return value.obj()?.bin().toString();
}

// export function scvalToString(value: SorobanClient.xdr.ScVal): string | undefined {
//   console.log("value: ", value)
//   return value.bytes().toString();
// }


interface useTitleProps {
  sorobanContext: SorobanContextType
}


export function useTitle({sorobanContext}: useTitleProps){
    //if (sorobanContext.address){
      let title_scval
      let title   
      
      title_scval = useContractValue({ 
        contractId: '8dcbff6d3f543575a2cb763bac9858df483597a9449cace64f608d8e76faf08e',
        method: 'read_title',
        sorobanContext: sorobanContext
      })

      console.log("title_scval: ", title_scval)
      console.log("title_scval: ", title_scval.result)

      if(title_scval.result){
        //token.symbol.result && convert.scvalToString(token.symbol.result)?.replace("\u0000", "")
        title = title_scval.result && scvalToString(title_scval.result)?.replace("\u0000", "")
        console.log("title: ", title)
        
        return title
      }

      return 'wrong connection'
  // }
  //  else{return 'Loading title...'}
    
}