import {contractTx } from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";

export default async function fetchRewardClaim(api: any, activeAccount: any, contract: any, reward: string) {
  try {
    const result = await contractTx(api, activeAccount.address, contract, `register_claim`, {}, [reward])

    if(result.extrinsicHash) {
      toast.success("Reward claimed successfully!")
    } else {
      throw new Error("There was an error creating the claim.")
    }

  } catch (e) {
    console.error(e)
    toast.error('Error while claiming reward. Try again…')
  }

}
