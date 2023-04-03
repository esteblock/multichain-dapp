import { SorobanContextType } from '@soroban-react/core';
import {useContractValue} from '@soroban-react/contracts'
import contract_ids from '../contract_ids.json'
//import {scvalToString} from '@soroban-react/utils';

import * as SorobanClient from 'soroban-client';


export function scvalToString(value: SorobanClient.xdr.ScVal): string | undefined {
  console.log("value.obj(): ", value.obj())
  console.log("value.obj()?.bin(): ", value.obj()?.bin())
  console.log("value.obj()?.bin().toString(): ", value.obj()?.bin().toString())
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
        contractId: 'b6f037e2236ca326215510c64851e9ffc12fe0cc2b7f289d540ebac5a4e34035',
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