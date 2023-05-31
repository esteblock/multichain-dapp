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

            // let source = new SorobanClient.Account(address, sequence)
            // let transaction = contractTransaction({
            //     networkPassphrase: activeChain.networkPassphrase,
            //     source: source,
            //     contractId: Constants.TokenId_1,
            //     method: 'xfer',
            //     params: [invoker, nonce, contractIdentifier(Constants.LiquidityPoolId), bigNumberToI128(BigNumber(inputTokenAmount).shiftedBy(7))]
            // })
            // try{
            // 
            // 
            
            // let result
            // result1 = await sendTransaction(
            //     contractTransaction({
            //         networkPassphrase: activeChain.networkPassphrase,
            //         source: source,
            //         contractId: Constants.TokenId_1,
            //         method: 'xfer',
            //         params: [invoker, nonce, contractIdentifier(Constants.LiquidityPoolId), bigNumberToI128(BigNumber(inputTokenAmount).shiftedBy(7))]
            //     }), {sorobanContext})

            
            
            //     console.log("result1: ", result1)
                
            // let transaction
            // if (outputToken == currencies[1]){
            //     transaction = contractTransaction({
            //         networkPassphrase: activeChain.networkPassphrase,
            //         source: source,
            //         contractId: Constants.LiquidityPoolId,
            //         method: 'swap',
            //         params: [accountIdentifier(address), bigNumberToI128(BigNumber(0)), bigNumberToI128(BigNumber(outputTokenAmount).shiftedBy(7))]})
    
            // }
            // else{

            //     transaction = contractTransaction({
            //         networkPassphrase: activeChain.networkPassphrase,
            //         source: source,
            //         contractId: Constants.LiquidityPoolId,
            //         method: 'swap',
            //         params: [accountIdentifier(address), bigNumberToI128(BigNumber(outputTokenAmount).shiftedBy(7)), bigNumberToI128(BigNumber(0))]})

            // }
            //     console.log("Sending swap transaction")
            //     const result = await sendTransaction(transaction, {sorobanContext})
            //     console.log("swap:sendTransaction:result: ", result)
            // }
            // catch(error){
            //     console.log("Error while sending the transaction: ", error)

            // }

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