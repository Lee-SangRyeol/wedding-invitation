'use client'

import { useEffect } from 'react'
import styled from 'styled-components'

declare global {
  interface Window {
    Kakao: any
  }
}

const ShareButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #FEE500;
  color: #000000;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'IropkeBatangM', serif;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FDD835;
  }

  &:active {
    background-color: #FBC02D;
  }
`

interface KakaoShareButtonProps {
  title?: string
  description?: string
  imageUrl?: string
}

export default function KakaoShareButton({ 
  title = '이정규 ♥ 이유빈 결혼합니다',
  description = '2026년 2월 28일 (토) 오후 3시 40분\n파티 웨딩유\n소중한 분들을 초대합니다',
  imageUrl
}: KakaoShareButtonProps) {
  useEffect(() => {
    // 카카오 SDK 로드
    if (!window.Kakao) {
      const script = document.createElement('script')
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
      script.async = true
      document.head.appendChild(script)

      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          // 카카오 SDK 초기화 (JavaScript 키 필요)
          const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || ''
          if (KAKAO_JS_KEY) {
            window.Kakao.init(KAKAO_JS_KEY)
          }
        }
      }
    }
  }, [])

  const handleShare = () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 로드되지 않았습니다.')
      return
    }

    if (!window.Kakao.isInitialized()) {
      alert('카카오 SDK가 초기화되지 않았습니다.')
      return
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const ogImage = imageUrl || `${siteUrl}/img/f_6.jpeg`

    // 카카오톡 공유하기
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description.replace(/\n/g, ' '),
        imageUrl: ogImage,
        link: {
          mobileWebUrl: siteUrl,
          webUrl: siteUrl,
        },
      },
      buttons: [
        {
          title: '청첩장 보러가기',
          link: {
            mobileWebUrl: siteUrl,
            webUrl: siteUrl,
          },
        },
      ],
    })
  }

  return (
    <ShareButton onClick={handleShare}>
      카카오톡으로 공유하기
    </ShareButton>
  )
}

