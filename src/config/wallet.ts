import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, polygon, base } from '@reown/appkit/networks'

// Get projectId from environment or use a placeholder for development
export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'demo-project-id'

export const networks = [mainnet, arbitrum, polygon, base] as const

export const wagmiAdapter = new WagmiAdapter({
  networks: networks as any,
  projectId,
})

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as any,
  projectId,
  metadata: {
    name: 'AI Crypto Story',
    description: 'Transform your crypto journey into epic narratives',
    url: 'https://aicryptostory.app',
    icons: ['https://aicryptostory.app/icon.png']
  },
  features: {
    analytics: false,
  }
})
