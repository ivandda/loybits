'use client'

import {contractQuery, decodeOutput, contractTx } from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";

export default async function fetchLoybitsBalance(api, activeAccount, contract, pathname) {
  try {
    let finalResult;
    const userType = pathname === '/user_view' ? 'user' : 'acquirer';
    const result = await contractQuery(api, activeAccount.address, contract, `get_balance_${userType}`)
    const { output, isError, decodedOutput } = decodeOutput(result, contract, `get_balance_${userType}`)
    if (isError) throw new Error(decodedOutput);
    if(output === null && userType === 'user') {
      const result = await contractTx(api, activeAccount.address, contract, `add_user`)
      if(result.extrinsicHash) {
        const result = await contractQuery(api, activeAccount.address, contract, `get_balance_${userType}`)
        const { output, isError, decodedOutput } = decodeOutput(result, contract, `get_balance_${userType}`)
        if (isError) throw new Error(decodedOutput)
        finalResult = output;
      } else {
        throw new Error ("Unable to create user");
      }
    }
    finalResult = output;
    return finalResult;

  } catch (e) {
    console.error(e)
    toast.error('Error while fetching balance. Try again…')
  }

}
