import * as SorobanClient from 'soroban-client';
import { SorobanContextType } from '@soroban-react/core';
import { useContractValue } from '@soroban-react/contracts'

import contract_ids from '../contract_ids.json'


export function scvalToString(value: SorobanClient.xdr.ScVal): string | undefined {
  return value.value()?.toString();
}

interface useTitleProps {
  sorobanContext: SorobanContextType
}


export function useTitle({sorobanContext}: useTitleProps){
      let title_scval
      let title 
      let currentChain = sorobanContext.activeChain?.name?.toLocaleLowerCase()
      // console.log("useTitle: currentChain: ", currentChain)
      // console.log("useTitle: contract_ids[currentChain].title_id: ", contract_ids[currentChain]?.title_id)
      
      title_scval = useContractValue({ 
        contractAddress: contract_ids[currentChain]?.title_id,
        method: 'read_title',
        sorobanContext: sorobanContext
      })


      if(title_scval.result){
        title = title_scval.result && scvalToString(title_scval.result)?.replace("\u0000", "")
        // console.log("useTitle: Reading the contract: title: ", title)
        return title
      }

      return 'useTitle: wrong connection'
}