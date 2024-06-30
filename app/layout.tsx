import type { Metadata } from 'next'
import './globals.css'
import { CKProviders } from './providers'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/desktop/Sidebar'
import ActivityBar from '@/components/desktop/ActivityBar'
import Player from '@/components/global/Player'
import PlayerFallback from '@/components/fallbacks/PlayerFallback'
import ActivityBarFallback from '@/components/fallbacks/SidebarFallback'
import { Suspense } from 'react'
import TopLoadingBar from '@/components/global/TopLoadingBar'
import BottomBar from '@/components/global/MobileBottom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { Flex } from '@chakra-ui/react'
 
export const metadata: Metadata = {
  title: 'Soundscape',
  description: 'A music streaming platform',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600']
})

export default function DesktopLLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' chakra-ui-dark'} style={{
        display: 'flex',
        overflow: 'hidden',
        height: '100vh'
      }}>
        <CKProviders>
          <TopLoadingBar />
          <Sidebar />
          <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={[`calc(100dvh - 3.875rem - 8.2rem)`, 'calc(100vh - 6.25rem)']} flexDir={'column'} overflowY={'auto'}>
            <Suspense>
              {children}
            </Suspense>
          </Flex>
          <Suspense fallback={<ActivityBarFallback />}>
            <ActivityBar />
          </Suspense>
          <Suspense fallback={<PlayerFallback />}>
            <Player />
          </Suspense>
          <BottomBar />
          <ToastContainer newestOnTop={true} />
        </CKProviders>
      </body>
    </html>
  )
}
