import {contractTx } from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";

export default async function fetchSimulatePayment(api: any, activeAccount: any, contract: any, user: string, tokens: number) {
  try {
    const result = await contractTx(api, activeAccount.address, contract, `register_payment`, {}, [tokens, user])

    if(result.extrinsicHash) {
      toast.success("Payment registered successfully!")
    } else {
      throw new Error("There was an error creating the payment.")
    }

  } catch (e) {
    console.error(e)
    toast.error('Error while registering payment. Try again…')
  }

}
