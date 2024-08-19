'use client'

import {useInkathon, useRegisteredContract} from "@scio-labs/use-inkathon";
import {ContractIds} from "@/deployments/deployments";
import {useEffect, useState} from "react";
import fetchRewards from "@/lib/hooks/use-rewards";
import Image from "next/image";
import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";
import fetchRewardClaim from "@/lib/hooks/use-claim";
import OwnerCard from "@/components/home/ownerCard";

export default function MyRewardList() {
  const {api, activeAccount} = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.Loybits)
  const [rewards, setRewards]= useState<{
    title: string,
    description: string,
    cost: number,
    id: string,
    demo: any
  }[]>([]);

  useEffect(() => {
    if(activeAccount) {
      fetchRewards(api, activeAccount, contract).then(res => {
        let rewards: {
          title: string,
          description: string,
          cost: number,
          id: string,
          demo: any
        }[] = [];
        res.filter((reward: any) => reward.acquirerAddress === activeAccount.address).map(({ acquirerAddress, acquirerName, title, description, category, cost, id}:
                   {acquirerAddress: string,
                     acquirerName: string,
                     title: string,
                     description: string,
                     category: string,
                     cost: number,
                     id: string
                   }) => {
          rewards.push({title, description, cost, id,
            demo: (<div className="flex items-center justify-center space-x-20">
              <Image alt={category} src={`/${category}.webp`} width={180} height={180} />
            </div>)})
        })

        setRewards(rewards)
      })
    }
  }, [activeAccount]);

  return (
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {rewards.map(({ title, description, demo, cost }) => (
          <OwnerCard
            key={title}
            title={title}
            description={description}
            cost={cost}
            demo={demo}
          />
        ))}
      </div>
  )
}
