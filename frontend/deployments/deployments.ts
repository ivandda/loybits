import { SubstrateDeployment } from '@scio-labs/use-inkathon'
import { env } from '@/config/environment'

export enum ContractIds {
  Loybits = 'loybits_manager'
}

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  const networks = env.supportedChains
  const deployments: SubstrateDeployment[] = []

  for (const networkId of networks) {
    for (const contractId of Object.values(ContractIds)) {
      const abi = await import(`/${contractId}/${contractId}.json`)
      const { address } = await import(`/${contractId}/${networkId}.ts`)

      deployments.push({ contractId, networkId, abi, address })
    }
  }

  return deployments
}
