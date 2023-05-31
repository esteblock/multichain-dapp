import React from 'react'
import {useSorobanReact } from "@soroban-react/core"
import Button from '@mui/material/Button';
import {useSendTransaction, contractTransaction} from '@soroban-react/contracts'
import * as SorobanClient from 'soroban-client'
import contract_ids from '../../contract_ids.json'
import BigNumber from 'bignumber.js'


interface SetTitleButtonProps {
    newTitle: string,
}

function stringToScVal(title: string){
    let new_title_scval = SorobanClient.xdr.ScVal.scvString(title)
    console.log("new_title_scval: ", new_title_scval)
    return new_title_scval;
}


export function SetTitleButton (
                {newTitle}: SetTitleButtonProps){

    const sorobanContext =  useSorobanReact()
    const { sendTransaction } = useSendTransaction()
    const { activeChain, server, address } = sorobanContext
    
    const handleSetNewTitle = async (): Promise<void> => {
        if (!activeChain || ! address || !server) {
            console.log("No active chain")
            return
        }
        else{
            console.log("trying to set new title: ", newTitle)
            console.log("sorobanContext.activeChain?.name?.toLocaleLowerCase(): ", sorobanContext.activeChain?.name?.toLocaleLowerCase())
            let currentChain = sorobanContext.activeChain?.name?.toLocaleLowerCase()
            console.log("currentChain: ", currentChain)
            console.log("contract_ids[currentChain].title_id: ", contract_ids[currentChain]?.title_id)
            let contractId = contract_ids[currentChain]?.title_id;

            const source = await server.getAccount(address)
            
            let transaction = contractTransaction({
                networkPassphrase: activeChain.networkPassphrase,
                source: source,
                contractId: contractId,
                method: 'set_title',
                params: [stringToScVal(newTitle)]
            })

            console.log("created transaction: ", transaction)

            
            let result
            result = await sendTransaction(transaction, {sorobanContext})
            console.log("sendTransaction:result: ", result)
            

            alert(newTitle)
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