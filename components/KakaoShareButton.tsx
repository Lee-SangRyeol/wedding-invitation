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
    // 카카오 SDK 로드 및 초기화
    const initKakao = () => {
      const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || ''
      
      if (!KAKAO_JS_KEY) {
        console.warn('NEXT_PUBLIC_KAKAO_JS_KEY가 설정되지 않았습니다.')
        return
      }

      if (window.Kakao) {
        // 이미 SDK가 로드된 경우
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JS_KEY)
        }
        return
      }

      // SDK 로드
      const script = document.createElement('script')
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
      script.async = true
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JS_KEY)
        }
      }
      script.onerror = () => {
        console.error('카카오 SDK 로드 실패')
      }
      document.head.appendChild(script)
    }

    // 약간의 딜레이를 두고 초기화 (DOM 준비 대기)
    const timer = setTimeout(initKakao, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleShare = () => {
    const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || ''
    
    if (!KAKAO_JS_KEY) {
      alert('카카오톡 공유 기능을 사용하려면 환경 변수가 설정되어야 합니다.\n관리자에게 문의하세요.')
      return
    }

    if (!window.Kakao) {
      alert('카카오 SDK가 아직 로드 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }

    if (!window.Kakao.isInitialized()) {
      // 재시도: 초기화 시도
      try {
        window.Kakao.init(KAKAO_JS_KEY)
      } catch (error) {
        console.error('카카오 SDK 초기화 실패:', error)
        alert('카카오톡 공유 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.')
        return
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const ogImage = imageUrl || `${siteUrl}/img/f_6.jpeg`

    // 카카오톡 공유하기
    // description에 줄바꿈을 유지하기 위해 \n 사용
    // buttons는 최대 2개까지 가능하며, 반드시 content.link와 동일한 URL이어야 함
    try {
      const shareData = {
        objectType: 'feed' as const,
        content: {
          title: title,
          description: description, // \n으로 줄바꿈
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
      }

      console.log('카카오톡 공유 데이터:', JSON.stringify(shareData, null, 2))
      console.log('description 원본:', description)
      console.log('description 길이:', description.length)
      console.log('줄바꿈 포함 여부:', description.includes('\n'))
      
      // 카카오톡 공유 API 호출
      window.Kakao.Share.sendDefault(shareData)
    } catch (error) {
      console.error('카카오톡 공유 실패:', error)
      alert('카카오톡 공유 중 오류가 발생했습니다.')
    }
  }

  return (
    <ShareButton onClick={handleShare}>
      카카오톡으로 공유하기
    </ShareButton>
  )
}

