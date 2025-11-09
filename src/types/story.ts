export interface Transaction {
  hash: string;
  type: "swap" | "mint" | "stake" | "transfer" | "defi";
  protocol: string;
  timestamp: Date;
  fromToken?: string;
  toToken?: string;
  amount?: string;
  valueUSD: number;
  gasFee: string;
}

export interface Story {
  id: string;
  transaction: Transaction;
  narration: string;
  audioUrl?: string;
  audioDuration: number;
  likes: number;
  isLiked: boolean;
  isMinted: boolean;
}

export const mockStories: Story[] = [
  {
    id: "1",
    transaction: {
      hash: "0x1234567890abcdef1234567890abcdef12345678",
      type: "swap",
      protocol: "Uniswap",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      fromToken: "ETH",
      toToken: "PEPE",
      amount: "0.5",
      valueUSD: 1250.0,
      gasFee: "0.008 ETH",
    },
    narration:
      "You just swapped 0.5 ETH for 20,000 PEPE on Uniswap — a bold move into the memecoin realm! The frogs are gathering...",
    audioDuration: 9,
    likes: 42,
    isLiked: false,
    isMinted: false,
  },
  {
    id: "2",
    transaction: {
      hash: "0xabcdef1234567890abcdef1234567890abcdef12",
      type: "mint",
      protocol: "Zora",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      amount: "1",
      valueUSD: 150.0,
      gasFee: "0.003 ETH",
    },
    narration:
      "A new NFT has entered your collection on Zora. This digital artifact now carries your signature on the blockchain forever.",
    audioDuration: 12,
    likes: 128,
    isLiked: true,
    isMinted: true,
  },
  {
    id: "3",
    transaction: {
      hash: "0xfedcba0987654321fedcba0987654321fedcba09",
      type: "stake",
      protocol: "Lido",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      fromToken: "ETH",
      amount: "2.5",
      valueUSD: 6250.0,
      gasFee: "0.012 ETH",
    },
    narration:
      "You've staked 2.5 ETH with Lido, joining the ranks of validators securing Ethereum. Your assets now work while you sleep.",
    audioDuration: 11,
    likes: 89,
    isLiked: false,
    isMinted: false,
  },
  {
    id: "4",
    transaction: {
      hash: "0x567890abcdef1234567890abcdef1234567890ab",
      type: "defi",
      protocol: "Aave",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      fromToken: "USDC",
      amount: "5000",
      valueUSD: 5000.0,
      gasFee: "0.005 ETH",
    },
    narration:
      "Your 5,000 USDC has been deposited into Aave's lending pool. Now you're earning yield while providing liquidity to the DeFi ecosystem.",
    audioDuration: 14,
    likes: 203,
    isLiked: true,
    isMinted: false,
  },
];
