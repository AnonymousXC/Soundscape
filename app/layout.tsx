import type { Metadata } from 'next'
import './globals.css'
import { CKProviders } from './providers'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/desktop/Sidebar'
import ActivityBar from '@/components/desktop/ActivityBar'
import Player from '@/components/Player'
 
export const metadata: Metadata = {
  title: 'Soundscape',
  description: 'A music streaming platform',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
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
          <Sidebar />
          {children}
          <ActivityBar />
          <Player />
        </CKProviders>
      </body>
    </html>
  )
}
