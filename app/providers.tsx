'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '@/theme/theme'

export function CKProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  )
}