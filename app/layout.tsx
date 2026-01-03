import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import MusicPlayer from '@/components/MusicPlayer'
import DisableZoom from '@/components/DisableZoom'
import './globals.css'

export const metadata: Metadata = {
  title: '청첩장',
  description: '소중한 분들을 초대합니다',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <link
          rel="preload"
          href="/fonts/IropkeBatangM_web/IropkeBatangM.woff"
          as="font"
          type="font/woff"
          crossOrigin=""
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <DisableZoom />
          <MusicPlayer />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

