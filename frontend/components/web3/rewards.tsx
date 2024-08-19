'use client'

import {useInkathon, useRegisteredContract} from "@scio-labs/use-inkathon";
import {ContractIds} from "@/deployments/deployments";
import {useEffect, useState} from "react";
import fetchRewards from "@/lib/hooks/use-rewards";
import Image from "next/image";
import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";

export default function RewardList() {
  const {api, activeAccount} = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.Loybits)
  const [rewards, setRewards]= useState([]);

  useEffect(() => {
    if(activeAccount) {
      fetchRewards(api, activeAccount, contract).then(res => {
        let rewards = []
        res.map(({ acquirerAddress, acquirerName, title, description, category, cost, id}) => {
          rewards.push({title, description, cost,
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
        {rewards.map(({ title, description, demo, cost, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            cost={cost}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))}
      </div>
  )
}
