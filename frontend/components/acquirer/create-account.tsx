'use client'

import Modal from "@/components/shared/modal";
import {Dispatch, SetStateAction} from "react/index";
import {useState} from "react";
import {DialogTitle} from "@radix-ui/react-dialog";
import {useInkathon, useRegisteredContract} from "@scio-labs/use-inkathon";
import {ContractIds} from "@/deployments/deployments";
import fetchAddReward from "@/lib/hooks/use-create-reward";
import fetchCreateAcquirer from "@/lib/hooks/use-create-acquirer";

export default function CreateAccount({
      showModal,
      setShowModal,
    }: {
      showModal: boolean;
      setShowModal: Dispatch<SetStateAction<boolean>>;
    }) {

  const {api, activeAccount} = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.Loybits)
  const [tokens, setTokens] = useState<number>();
  const [name, setName] = useState<string>();;

  const addAccount = () => {
    if(tokens && name) {
      fetchCreateAcquirer(api, activeAccount, contract,
        tokens, name
      ).then(() => {
        setShowModal(false)
        setName('')
        setTokens(0);
      })
    }
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className={'p-6'}>
        <DialogTitle className={'bg-gradient-to-br from-black to-stone-700 bg-clip-text text-center font-display text-2xl font-bold py-4'}> Create Business Account </DialogTitle>
        <p> Please enter the amount of tokens and a reference name for your business </p>

        <div className={"flex flex-col py-4"}>
          <label className={'font-bold'}> Name </label>
          <input
            className={'border rounded-2xl p-2 border-violet-600 mb-2'}
            type={"string"}
            placeholder={'Title'}
            value={name}
            onInput={e => setName((e.target as HTMLInputElement).value)}
          />

          <label className={'font-bold'}> Initial Sum of Loybits </label>
          <input
            className={'border rounded-2xl p-2 border-violet-600 mb-2'}
            type={"number"}
            placeholder={'Loybits'}
            value={tokens}
            onInput={e => setTokens((e.target as HTMLInputElement).value as unknown as number)}
          />
        </div>

        <button
          className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:border-gray-500 mb-2"
          onClick={addAccount}
          rel="noopener noreferrer"
        >
          <p>Create</p>
        </button>

      </div>

    </Modal>
  )
}
