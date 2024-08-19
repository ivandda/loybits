'use client'

import {contractQuery, decodeOutput } from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";

export default async function fetchRewards(api, activeAccount, contract) {
  try {
    const result = await contractQuery(api, activeAccount.address, contract, `get_rewards`)
    const { output, isError, decodedOutput } = decodeOutput(result, contract, `get_rewards`)
    console.log('Rewards')
    console.log(output)
    if (isError) throw new Error(decodedOutput)
    return output

  } catch (e) {
    console.error(e)
    toast.error('Error while fetching rewards. Try again…')
  }

}
