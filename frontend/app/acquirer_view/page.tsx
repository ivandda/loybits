'use client'

import Image from "next/image";
import MyRewardList from "@/components/web3/my-rewards";
import {useState} from "react";
import Payment from "@/components/acquirer/simulate-payment";

export default function AcquirerMain() {
  const [openSimulator, setOpenSimulator] = useState(false);

  return (
    <>
      <Payment showModal={openSimulator} setShowModal={setOpenSimulator}/>
      <div className="z-10 w-full max-w-2xl px-5 xl:px-0">
        <h1 className="animate-fade-up bg-gradient-to-br from-white to-stone-400 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
          My Rewards
        </h1>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <button
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:border-gray-500"
            rel="noopener noreferrer"
            onClick={() => setOpenSimulator(true)}
          >
            <Image
              src="/money.webp"
              alt="Logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            />
            <p>Simulate Payment</p>
          </button>
          <button
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            rel="noopener noreferrer"
          >
            <Image
              src="/giftcard.webp"
              alt="Logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            />
            <p>
              Add Reward
            </p>
          </button>
          <a
            className="group flex items-center justify-center space-x-2 rounded-full border border-pink-500 bg-pink-600 px-5 py-2 text-sm text-white transition-colors hover:border-pink-900"
            href="/AI/business"
            rel="noopener noreferrer"
          >
            <Image
              src="/MrLoy.PNG"
              alt="Logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            />
            <p>Let Mr Loy help you!</p>
          </a>
        </div>
      </div>
      <MyRewardList/>
    </>
  );
}