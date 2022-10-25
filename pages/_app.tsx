import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { 
  ChakraProvider,
  ColorModeScript
} from "@chakra-ui/react"
import { useState } from 'react'


function MyApp({ Component, pageProps }: AppProps) {
  return ( 
    <ChakraProvider>
      <Component {...pageProps} />
      <ColorModeScript initialColorMode='dark' />
    </ChakraProvider>
  )
}

export default MyApp
