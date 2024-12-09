import { type Chain } from "wagmi";

// Contract Configuration
export const CONTRACT_ADDRESS = "0xa8723135ed89f50de251ccbf817dc276aa41db53";

// Network Configuration
export const NETWORK = {
  chainId: "0x3e9", // 1001 in decimal (Klaytn Baobab)
  chainName: "Kairos",
  nativeCurrency: {
    name: "KLAY",
    symbol: "KLAY",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.ankr.com/klaytn_testnet"],
  blockExplorerUrls: ["https://kairos.klaytn.net"],
} as const;

// Chain Configuration for wagmi
export const KAIROS_CHAIN: Chain = {
  id: 1001,
  name: NETWORK.chainName,
  network: "kairos",
  nativeCurrency: NETWORK.nativeCurrency,
  rpcUrls: {
    public: { http: NETWORK.rpcUrls },
    default: { http: NETWORK.rpcUrls },
  },
  blockExplorers: {
    default: { name: "KairosScan", url: NETWORK.blockExplorerUrls[0] },
  },
  contracts: {},
};

// Wallet Configuration
export const WALLET_CONFIG = {
  appName: "Course Certificate DApp",
  projectId: "07d02c4c5fed902fbc67ae532051716c",
};

// Routes Configuration
export const ROUTES = {
  home: "/",
  course: "/course/:id",
};

// Experience Points Configuration
export const XP_CONFIG = {
  baseXP: 100,
  bonusXP: 500,
  xpPerLevel: 100,
};

// Toast Configuration
export const TOAST_CONFIG = {
  position: "top-right" as const,
  success: {
    duration: 5000,
    icon: "🎉",
  },
  error: {
    duration: 5000,
    icon: "❌",
  },
};

// Achievement Levels
export const ACHIEVEMENT_LEVELS = {
  BEGINNER: {
    name: "Beginner",
    minLevel: 0,
    maxLevel: 4,
    color: "text-blue-500",
  },
  INTERMEDIATE: {
    name: "Intermediate",
    minLevel: 5,
    maxLevel: 9,
    color: "text-green-500",
  },
  ADVANCED: {
    name: "Advanced",
    minLevel: 10,
    maxLevel: 14,
    color: "text-purple-500",
  },
  EXPERT: {
    name: "Expert",
    minLevel: 15,
    color: "text-yellow-500",
  },
} as const;
