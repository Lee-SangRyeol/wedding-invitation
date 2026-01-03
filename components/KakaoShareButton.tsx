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
  description = '2026년 2월 28일 (토) 오후 3시 40분\n파티 웨딩유',
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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wedding-invitation.asia'
    const ogImage = imageUrl || `${siteUrl}/img/f_6.jpeg`

    // 카카오톡 공유하기 - 공식 문서 기준 정확한 구조
    // 중요: content.link는 이미지 클릭 시 이동할 링크 (필수)
    // buttons.link는 버튼 클릭 시 이동할 링크 (content.link와 동일해야 함)
    // 모든 URL은 절대 경로(https://)로 시작해야 함
    try {
      // 공유할 링크 URL (모든 링크가 동일해야 함)
      // URL이 올바른 형식인지 확인
      const shareLink = {
        mobileWebUrl: siteUrl,
        webUrl: siteUrl,
      }

      // URL 유효성 검사
      if (!shareLink.mobileWebUrl.startsWith('http://') && !shareLink.mobileWebUrl.startsWith('https://')) {
        console.error('URL은 http:// 또는 https://로 시작해야 합니다:', shareLink.mobileWebUrl)
        alert('URL 형식이 올바르지 않습니다.')
        return
      }

      // 카카오톡 링크 공유 데이터 구조
      // 중요: 모든 URL은 절대 경로(https://)로 시작해야 함
      const shareData = {
        objectType: 'feed' as const,
        content: {
          title: title,
          description: description, // \n으로 줄바꿈
          imageUrl: ogImage,
          // 이미지 클릭 시 이동할 링크 (필수)
          // mobileWebUrl: 모바일 웹에서 열릴 URL
          // webUrl: PC 웹에서 열릴 URL
          link: {
            mobileWebUrl: shareLink.mobileWebUrl,
            webUrl: shareLink.webUrl,
          },
        },
        // 버튼 배열 (최대 2개)
        // 각 버튼의 link는 content.link와 동일한 URL을 사용해야 함
        buttons: [
          {
            title: '청첩장 보러가기',
            link: {
              mobileWebUrl: shareLink.mobileWebUrl,
              webUrl: shareLink.webUrl,
            },
          },
        ],
      }

      // 디버깅 로그
      console.log('=== 카카오톡 공유 데이터 ===')
      console.log('제목:', title)
      console.log('설명:', description)
      console.log('이미지 URL:', ogImage)
      console.log('사이트 URL:', siteUrl)
      console.log('공유 링크:', shareLink)
      console.log('전체 데이터:', JSON.stringify(shareData, null, 2))
      console.log('Kakao 객체 확인:', {
        exists: !!window.Kakao,
        initialized: window.Kakao?.isInitialized(),
        hasLink: !!(window.Kakao?.Link),
        hasShare: !!(window.Kakao?.Share),
      })
      
      // 카카오톡 공유 API 호출
      // Link.sendDefault 사용 (공식 권장 방법)
      if (window.Kakao?.Link?.sendDefault) {
        console.log('Link.sendDefault 사용')
        window.Kakao.Link.sendDefault(shareData)
      } else if (window.Kakao?.Share?.sendDefault) {
        console.log('Share.sendDefault 사용 (대체)')
        window.Kakao.Share.sendDefault(shareData)
      } else {
        const errorMsg = '카카오톡 공유 API를 사용할 수 없습니다.'
        console.error(errorMsg)
        console.error('Kakao 객체:', window.Kakao)
        console.error('사용 가능한 메서드:', Object.keys(window.Kakao || {}))
        alert(errorMsg + '\n콘솔을 확인해주세요. (F12)')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('카카오톡 공유 실패:', error)
      console.error('에러 상세:', error)
      alert('카카오톡 공유 중 오류가 발생했습니다.\n에러: ' + errorMessage)
    }
  }

  return (
    <ShareButton onClick={handleShare}>
      카카오톡으로 공유하기
    </ShareButton>
  )
}

