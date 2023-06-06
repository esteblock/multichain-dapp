import React from 'react'
import {useSorobanReact } from "@soroban-react/core"
import Button from '@mui/material/Button';
import {contractTransaction, useSendTransaction} from '@soroban-react/contracts'
import * as SorobanClient from 'soroban-client'
import contract_ids from '../contract_ids.json'


interface SetTitleButtonProps {
    newTitle: string,
}

function stringToScVal(title: string){
    return SorobanClient.xdr.ScVal.scvString(title)
}


export function SetTitleButton ({newTitle}: SetTitleButtonProps){

    const sorobanContext =  useSorobanReact()
    const { sendTransaction } = useSendTransaction()
    const { activeChain, server, address } = sorobanContext
    
    const handleSetNewTitle = async (): Promise<void> => {
        if (!activeChain || ! address || !server) {
            console.log("No active chain")
            return
        }
        else{
            let currentChain = sorobanContext.activeChain?.name?.toLocaleLowerCase()
            console.log("handleSetNewTitle: currentChain: ", currentChain)
            console.log("handleSetNewTitle: contract_ids[currentChain].title_id: ", contract_ids[currentChain]?.title_id)
            let contractId = contract_ids[currentChain]?.title_id;
            
            const source = await server.getAccount(address)
            
            let transaction = contractTransaction({
                networkPassphrase: activeChain.networkPassphrase,
                source: source,
                contractId: contractId,
                method: 'set_title',
                params: [stringToScVal(newTitle)]
            })

            
            let result = await sendTransaction(transaction, {sorobanContext})
            console.log("handleSetNewTitle: result: ", result)
            sorobanContext.connect();
        }

    }


    return(
        <Button
            size="small"
            variant="contained"
            onClick={handleSetNewTitle}>
              Set New Title
          </Button>

    )
}