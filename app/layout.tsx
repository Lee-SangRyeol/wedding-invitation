import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import MusicPlayer from '@/components/MusicPlayer'
import DisableZoom from '@/components/DisableZoom'
import './globals.css'

export const metadata: Metadata = {
  title: '이정규 ♥ 이유빈 결혼합니다',
  description: '2026년 2월 28일 (토) 오후 3시 40분\n파티 웨딩유\n소중한 분들을 초대합니다',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  openGraph: {
    title: '이정규 ♥ 이유빈 결혼합니다',
    description: '2026년 2월 28일 (토) 오후 3시 40분\n파티 웨딩유\n소중한 분들을 초대합니다',
    type: 'website',
    images: [
      {
        url: '/img/bb.jpeg',
        width: 600,
        height: 900,
        alt: '이정규 ♥ 이유빈 결혼합니다',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이정규 ♥ 이유빈 결혼합니다',
    description: '2026년 2월 28일 (토) 오후 3시 40분\n파티 웨딩유\n소중한 분들을 초대합니다',
    images: ['/img/bb.jpeg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 프로덕션 도메인 (환경 변수로 설정 가능)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wedding-invitation.asia'
  
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Open Graph 메타 태그 (카카오톡 공유용) */}
        <meta property="og:title" content="이정규 ♥ 이유빈 결혼합니다" />
        <meta property="og:description" content="2026년 2월 28일 (토) 오후 3시 40분&#10;파티 웨딩유&#10;소중한 분들을 초대합니다" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/img/bb.jpeg`} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="이정규 ♥ 이유빈 결혼합니다" />
        <meta property="og:site_name" content="청첩장" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Twitter Card (선택사항) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="이정규 ♥ 이유빈 결혼합니다" />
        <meta name="twitter:description" content="2026년 2월 28일 (토) 오후 3시 40분&#10;파티 웨딩유&#10;소중한 분들을 초대합니다" />
        <meta name="twitter:image" content={`${siteUrl}/img/bb.jpeg`} />
        
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

