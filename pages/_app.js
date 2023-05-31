import "@/styles/globals.css";
import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";


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
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
