import "@/styles/globals.css";
import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../store/index";

const theme = extendBaseTheme({
  styles: {
    global: {
      'html, body': {
        color: 'white',
        lineHeight: 'tall',
      },
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  );
}
