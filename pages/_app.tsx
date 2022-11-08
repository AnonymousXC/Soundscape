import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { 
  ChakraProvider,
  ColorModeScript
} from "@chakra-ui/react"
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
    <ChakraProvider>
      <Component {...pageProps} />
      <Head>
          <title id='win-title'>Soundscape</title>
          <link rel="shortcut icon" href="" type="image/x-icon" id='site-icon' />
      </Head>
      <ColorModeScript initialColorMode='dark' />
    </ChakraProvider>
  )
}

export default MyApp
