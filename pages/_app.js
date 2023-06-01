import "@/styles/globals.css";
import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";
// import { Provider } from "react-redux";
// import store from "../store/index";

// import { configureChains, WagmiConfig, createClient } from "wagmi";
// import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
// import { ConnectKitProvider, getDefaultClient } from "connectkit";


import { WagmiConfig, createConfig } from "wagmi";
import { mainnet, polygon, optimism, polygonMumbai } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";


const theme = extendBaseTheme({
    styles: {
        global: {
            "html, body": {
                color: "white",
                lineHeight: "tall",
            },
        },
    },
});

// const { chains, provider } = configureChains(
//     [polygonMumbai],
//     [
//         jsonRpcProvider({
//             rpc: (chain) => ({
//                 http: `https://filecoin-hyperspace.chainstacklabs.com/rpc/v0`,
//             }),
//         }),
//     ]
// );

// const client = createClient({
//     autoConnect: true,
//     connectors: [
//         new MetaMaskConnector({ chains }),
//         new CoinbaseWalletConnector({
//             chains,
//             options: {
//                 appName: "ThePeerDao",
//             },
//         }),
//     ],
//     provider,
// });

const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
const infuraId = `https://polygon-mumbai.infura.io/v3/${infuraKey}`;
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const chains = [polygonMumbai, polygon];

const config = createConfig(
    getDefaultConfig({
      appName: "Teacho",
      infuraId,
      walletConnectProjectId,
      chains,
    }),
  );

export default function App({ Component, pageProps }) {
    return (
        <div>
            <WagmiConfig config={config}>
                <ConnectKitProvider debugMode>
                    {/* <Provider store={store}> */}
                        <ChakraProvider theme={theme}>
                            <Component {...pageProps} />
                        </ChakraProvider>
                    {/* </Provider> */}
                </ConnectKitProvider>
            </WagmiConfig>
        </div>
    );
}
