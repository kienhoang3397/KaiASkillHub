import { http } from "wagmi";
import { mainnet, klaytn } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { KAIROS_CHAIN, WALLET_CONFIG } from "./constants";

export const config = getDefaultConfig({
  appName: WALLET_CONFIG.appName,
  projectId: WALLET_CONFIG.projectId,
  chains: [KAIROS_CHAIN, klaytn, mainnet],
  transports: {
    [KAIROS_CHAIN.id]: http(KAIROS_CHAIN.rpcUrls.default.http[0]),
    [klaytn.id]: http(),
    [mainnet.id]: http(),
  },
});
