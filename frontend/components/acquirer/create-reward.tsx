'use client'

import Modal from "@/components/shared/modal";
import {Dispatch, SetStateAction} from "react/index";
import {useState} from "react";
import {DialogTitle} from "@radix-ui/react-dialog";
import {useInkathon, useRegisteredContract} from "@scio-labs/use-inkathon";
import {ContractIds} from "@/deployments/deployments";
import fetchAddReward from "@/lib/hooks/use-create-reward";

export default function CreateReward({
      showModal,
      setShowModal,
    }: {
      showModal: boolean;
      setShowModal: Dispatch<SetStateAction<boolean>>;
    }) {

  const {api, activeAccount} = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.Loybits)
  const [tokens, setTokens] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [id, setId] = useState<string>();

  const addReward = () => {
    if(tokens && title && category && description && id) {
      fetchAddReward(api, activeAccount, contract,
        tokens, title, category, description, id
      ).then(() => {
        setShowModal(false)
        setTitle('');
        setCategory('');
        setDescription('');
        setId('');
        setTokens(0);
      })
    }
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className={'p-6'}>
        <DialogTitle className={'bg-gradient-to-br from-black to-stone-700 bg-clip-text text-center font-display text-2xl font-bold py-4'}> Add Reward </DialogTitle>
        <p> Please enter the details associated to the reward to create.</p>

        <div className={"flex flex-col py-4"}>
          <label className={'font-bold'}> Title </label>
          <input
            className={'border rounded-2xl p-2 border-violet-600 mb-2'}
            type={"string"}
            placeholder={'Title'}
            value={title}
            onInput={e => setTitle((e.target as HTMLInputElement).value)}
          />

          <label className={'font-bold'}> Identifier </label>
          <input
            className={'border rounded-2xl p-2 border-violet-600 mb-2'}
            type={"string"}
            placeholder={'Text Id'}
            value={id}
            onInput={e => setId((e.target as HTMLInputElement).value)}
          />

          <label className={'font-bold'}> Description </label>
          <input
            className={'border rounded-2xl p-2 border-violet-600 mb-2'}
            type={"string"}
            placeholder={'Description'}
            value={description}
            onInput={e => setDescription((e.target as HTMLInputElement).value)}
          />

          <label className={'font-bold'}> Category </label>
          <select id="categories" className="border rounded-2xl p-2 border-violet-600 mb-2"
           value={category} onInput={e => setCategory((e.target as HTMLInputElement).value)}
          >
            <option selected>Choose a Category</option>
            <option value="giftcard">Gift card</option>
            <option value="discount">Discount</option>
            <option value="gastronomy">Gastronomy</option>
            <option value="beverage">Beverage</option>
            <option value="trip">Trip</option>
          </select>

          <label className={'font-bold'}> Price in Loybits </label>
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
          onClick={addReward}
          rel="noopener noreferrer"
        >
          <p>Create</p>
        </button>

      </div>

    </Modal>
  )
}
