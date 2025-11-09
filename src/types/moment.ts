export interface MomentNFT {
  id: string;
  tokenId: number;
  narration: string;
  protocol: string;
  type: string;
  timestamp: Date;
  likes: number;
  audioUrl?: string;
  audioDuration: number;
  artworkColors: string[];
}

export const mockMoments: MomentNFT[] = [
  {
    id: "m1",
    tokenId: 1337,
    narration: "You just swapped 0.5 ETH for 20,000 PEPE on Uniswap — a bold move into the memecoin realm!",
    protocol: "Uniswap",
    type: "swap",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    likes: 42,
    audioDuration: 9,
    artworkColors: ["#00f0ff", "#ff00ff", "#00ffaa"],
  },
  {
    id: "m2",
    tokenId: 1338,
    narration: "A new NFT has entered your collection on Zora. This digital artifact now carries your signature forever.",
    protocol: "Zora",
    type: "mint",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 128,
    audioDuration: 12,
    artworkColors: ["#ff6b6b", "#4ecdc4", "#ffe66d"],
  },
  {
    id: "m3",
    tokenId: 1339,
    narration: "You've staked 2.5 ETH with Lido, joining validators securing Ethereum. Your assets now work while you sleep.",
    protocol: "Lido",
    type: "stake",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 89,
    audioDuration: 11,
    artworkColors: ["#667eea", "#764ba2", "#f093fb"],
  },
  {
    id: "m4",
    tokenId: 1340,
    narration: "Your 5,000 USDC deposit into Aave's lending pool. Now earning yield while providing DeFi liquidity.",
    protocol: "Aave",
    type: "defi",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 203,
    audioDuration: 14,
    artworkColors: ["#fa709a", "#fee140", "#30cfd0"],
  },
  {
    id: "m5",
    tokenId: 1341,
    narration: "Bridge transfer complete: 1 ETH successfully crossed from Ethereum to Arbitrum in seconds.",
    protocol: "Arbitrum",
    type: "transfer",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    likes: 67,
    audioDuration: 8,
    artworkColors: ["#a8edea", "#fed6e3", "#ffeaa7"],
  },
  {
    id: "m6",
    tokenId: 1342,
    narration: "Liquidity provided to the ETH/USDC pool. Your contribution strengthens the backbone of DeFi.",
    protocol: "Uniswap",
    type: "defi",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 156,
    audioDuration: 10,
    artworkColors: ["#ff9a9e", "#fecfef", "#ffecd2"],
  },
];
