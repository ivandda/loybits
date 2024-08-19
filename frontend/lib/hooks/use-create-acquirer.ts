import {contractTx } from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";

export default async function fetchCreateAcquirer(
  api: any, activeAccount: any, contract: any,
  tokens: number, name: string) {
  try {
    const result = await contractTx(api, activeAccount.address, contract, `add_acquirer`, {},
      [tokens, name])

    if(result.extrinsicHash) {
      toast.success("Business added successfully!")
    } else {
      throw new Error("There was an error creating the account.")
    }

  } catch (e) {
    console.error(e)
    toast.error('Error while adding business. Try again…')
  }

}
