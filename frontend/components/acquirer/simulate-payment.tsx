'use client'

import Modal from "@/components/shared/modal";
import {Dispatch, SetStateAction} from "react/index";
import {useState} from "react";
import {Dialog, DialogTitle} from "@radix-ui/react-dialog";
import Image from "next/image";
import fetchSimulatePayment from "@/lib/hooks/use-payment";
import {useInkathon, useRegisteredContract} from "@scio-labs/use-inkathon";
import {ContractIds} from "@/deployments/deployments";
import toast from "react-hot-toast";


export default function Payment({
      showModal,
      setShowModal,
    }: {
      showModal: boolean;
      setShowModal: Dispatch<SetStateAction<boolean>>;
    }) {

  const {api, activeAccount} = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.Loybits)
  const [userAddress, setUserAddress] = useState<string>();
  const [tokenAmount, setTokenAmount] = useState<number>();

  const onCreate = () => {
    if(userAddress && tokenAmount) {
      fetchSimulatePayment(api, activeAccount, contract, userAddress, tokenAmount).then(() => setShowModal(false))
    }
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className={'p-6'}>
        <DialogTitle className={'bg-gradient-to-br from-black to-stone-700 bg-clip-text text-center font-display text-2xl font-bold py-4'}> Payment Simulator </DialogTitle>
        {/*<h1 className={"bg-gradient-to-br from-black to-stone-700 bg-clip-text text-center font-display text-xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"}>  </h1>*/}
        <p> Please enter the amount of tokens and the address you would like to give them to. </p>

        <div className={"flex flex-col py-4"}>
          <label className={'font-bold'}> Customer Address </label>
          <input
            className={'border rounded-2xl p-2 border-violet-600 mb-2'}
            type={"string"}
            placeholder={'User Address'}
            value={userAddress}
            onInput={e => setUserAddress((e.target as HTMLInputElement).value)}
          />

          <label className={'font-bold'}> Loybits </label>
          <input
            className={'border rounded-2xl p-2 border-violet-600'}
            type={"number"}
            placeholder={'Token Amount'}
            value={tokenAmount}
            onInput={e => setTokenAmount((e.target as HTMLInputElement).value as unknown as number)}
          />
        </div>


        <button
          className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:border-gray-500 mb-2"
          onClick={onCreate}
          rel="noopener noreferrer"
        >
          <p>Create</p>
        </button>

        <p className={'font-thin text-sm'}> This is for Demo purposes, this functionality would be integrated to your current PoS system. </p>
      </div>

    </Modal>
  )
}
