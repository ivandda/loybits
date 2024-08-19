import {contractTx } from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";

export default async function fetchAddReward(
  api: any, activeAccount: any, contract: any,
  tokens: number, name: string, category: string,
  description: string, id: string) {
  try {
    const result = await contractTx(api, activeAccount.address, contract, `add_reward`, {},
      [tokens, name, category, description, id])

    if(result.extrinsicHash) {
      toast.success("Reward added successfully!")
    } else {
      throw new Error("There was an error creating the reward.")
    }

  } catch (e) {
    console.error(e)
    toast.error('Error while adding reward. Try again…')
  }

}
