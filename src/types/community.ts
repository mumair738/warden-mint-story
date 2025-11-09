export interface LeaderboardEntry {
  rank: number;
  userId: string;
  ensName: string;
  pfpUrl?: string;
  score: string;
  topStoryId: string;
}

export interface WeeklyStory {
  id: string;
  narration: string;
  votes: number;
  votePercentage: number;
  protocol: string;
  type: string;
  timestamp: Date;
  hasVoted: boolean;
}

export const mockLeaderboardTraders: LeaderboardEntry[] = [
  { rank: 1, userId: "1", ensName: "cryptowhale.eth", score: "$2.4M Volume", topStoryId: "1" },
  { rank: 2, userId: "2", ensName: "degen420.eth", score: "$1.8M Volume", topStoryId: "2" },
  { rank: 3, userId: "3", ensName: "diamondhands.eth", score: "$1.2M Volume", topStoryId: "3" },
  { rank: 4, userId: "4", ensName: "moonboy.eth", score: "$950K Volume", topStoryId: "4" },
  { rank: 5, userId: "5", ensName: "hodler.eth", score: "$820K Volume", topStoryId: "5" },
];

export const mockLeaderboardCollectors: LeaderboardEntry[] = [
  { rank: 1, userId: "6", ensName: "collector.eth", score: "89 Moments", topStoryId: "1" },
  { rank: 2, userId: "7", ensName: "artlover.eth", score: "67 Moments", topStoryId: "2" },
  { rank: 3, userId: "8", ensName: "nftking.eth", score: "54 Moments", topStoryId: "3" },
  { rank: 4, userId: "9", ensName: "curator.eth", score: "42 Moments", topStoryId: "4" },
  { rank: 5, userId: "10", ensName: "minter.eth", score: "38 Moments", topStoryId: "5" },
];

export const mockLeaderboardFavorites: LeaderboardEntry[] = [
  { rank: 1, userId: "11", ensName: "popular.eth", score: "12.5K Likes", topStoryId: "1" },
  { rank: 2, userId: "12", ensName: "viral.eth", score: "9.8K Likes", topStoryId: "2" },
  { rank: 3, userId: "13", ensName: "trending.eth", score: "7.2K Likes", topStoryId: "3" },
  { rank: 4, userId: "14", ensName: "famous.eth", score: "6.1K Likes", topStoryId: "4" },
  { rank: 5, userId: "15", ensName: "star.eth", score: "5.4K Likes", topStoryId: "5" },
];

export const mockWeeklyStories: WeeklyStory[] = [
  {
    id: "w1",
    narration: "In a daring midnight swap, you transformed 5 ETH into 150,000 PEPE tokens. The memecoin gods smiled upon this bold sacrifice.",
    votes: 1247,
    votePercentage: 32,
    protocol: "Uniswap",
    type: "swap",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    hasVoted: false,
  },
  {
    id: "w2",
    narration: "Your wallet executed a perfect arbitrage across three chains in 2.3 seconds. A masterclass in DeFi precision.",
    votes: 1089,
    votePercentage: 28,
    protocol: "Multi-chain",
    type: "defi",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    hasVoted: false,
  },
  {
    id: "w3",
    narration: "The NFT mint that changed everything. Edition #1 of the legendary collection now sits in your wallet, a digital artifact of perfect timing.",
    votes: 892,
    votePercentage: 23,
    protocol: "Zora",
    type: "mint",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    hasVoted: true,
  },
  {
    id: "w4",
    narration: "Staked 32 ETH to become a validator. Your commitment to the network will echo through the blockchain for years to come.",
    votes: 445,
    votePercentage: 11,
    protocol: "Ethereum",
    type: "stake",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    hasVoted: false,
  },
  {
    id: "w5",
    narration: "A complex DeFi position worth $50K, opened at the perfect moment. Your timing was impeccable, your strategy flawless.",
    votes: 234,
    votePercentage: 6,
    protocol: "Aave",
    type: "defi",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    hasVoted: false,
  },
];
