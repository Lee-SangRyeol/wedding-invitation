'use client'

import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import IntroSection from '@/components/IntroSection'
import QuoteSection from '@/components/QuoteSection'
import InfoSection from '@/components/InfoSection'
import KidSection from '@/components/KidSection'
import CalendarSection from '@/components/CalendarSection'
import GallerySection from '@/components/GallerySection'
import LocationSection from '@/components/LocationSection'
import AccountSection from '@/components/AccountSection'
import EndingSection from '@/components/EndingSection'

// 최소 높이 설정 (필요시 조정)
const BASE_MIN_HEIGHT = 9000 // 기본 최소 높이 (px)

const Main = styled.main<{ $isViewerOpen: boolean; $viewportHeight: number; $actualHeight: number | null }>`
  position: relative;
  width: 100%;
  min-height: ${props => {
    // 측정 전: BASE_MIN_HEIGHT 사용 (스크롤 막힘 방지)
    // 측정 후: 무조건 측정된 값 + 10vh 사용 (여분 공간 제거)
    const extraVH = props.$viewportHeight * 0.1 // 10vh
    const baseHeight = props.$actualHeight !== null
      ? props.$actualHeight + extraVH // 측정된 값 + 10vh
      : BASE_MIN_HEIGHT // 측정 전에는 BASE_MIN_HEIGHT 사용
    return props.$isViewerOpen ? `${baseHeight + props.$viewportHeight}px` : `${baseHeight}px`
  }};
  overflow-x: hidden;
  transition: min-height 0.3s ease;
  
  /* 카카오톡 브라우저 호환성 */
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
`


// 편지 내용 - 여기에 실제 내용을 작성하세요
const infoContent = {
  groomName: '이정규',
  brideName: '이유빈',
  date: '2026년 2월 28일 (토)',
  time: '오후 3시 40분',
  location: '파티 웨딩유',
  address: '경기도 수원시 권선구 세화로 218',
  message: `

서로의 삶의 
가장 따듯한 이유가 된 
저희 두 사람이
사랑의 이름으로 하나 됩니다.

저희의 작은 시작을
따듯한 축복으로 채워주세요`,
}

export default function Home() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const endingRef = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [actualHeight, setActualHeight] = useState<number | null>(null)

  // 뷰포트 높이 계산
  useEffect(() => {
    const updateViewportHeight = () => {
      const height = window.innerHeight
      setViewportHeight(height)
      console.log('[Viewport Height]', height, 'px')
    }
    
    updateViewportHeight()
    window.addEventListener('resize', updateViewportHeight)
    
    return () => {
      window.removeEventListener('resize', updateViewportHeight)
    }
  }, [])

  // EndingSection이 화면에 보일 때 실제 높이 측정
  useEffect(() => {
    let isMeasured = false // 중복 측정 방지

    const measureActualHeight = () => {
      if (isMeasured || !endingRef.current) return // 이미 측정되었거나 ref가 없으면 스킵
      
      // EndingSection의 bottom 위치 측정
      const endingRect = endingRef.current.getBoundingClientRect()
      const endingBottom = endingRect.bottom + window.scrollY
      
      // 실제 필요한 높이 계산 (약간의 여유 공간 추가)
      const measuredHeight = endingBottom + 50 // 50px 여유 공간
      
      // actualHeight를 항상 업데이트 (측정값 저장)
      setActualHeight(measuredHeight)
      isMeasured = true
      
      const extraVH = window.innerHeight * 0.1 // 10vh
      const finalHeight = measuredHeight + extraVH
      
      console.log('[Actual Height Measurement] 측정 완료', {
        endingBottom,
        measuredHeight,
        baseMinHeight: BASE_MIN_HEIGHT,
        difference: measuredHeight - BASE_MIN_HEIGHT,
        extraVH: extraVH,
        finalHeight: finalHeight,
        willUse: `measuredHeight + 10vh (${finalHeight}px) - 여분 공간 제거`
      })
    }

    // Intersection Observer로 EndingSection이 화면에 보일 때 측정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // EndingSection이 화면에 보이고 (intersecting) 충분히 보일 때 (intersectionRatio > 0.5)
          if (entry.isIntersecting && entry.intersectionRatio > 0.5 && !isMeasured) {
            // 약간의 딜레이를 두고 측정 (레이아웃 안정화 대기)
            setTimeout(() => {
              measureActualHeight()
            }, 100)
          }
        })
      },
      {
        threshold: [0.5, 0.75, 1.0], // 50%, 75%, 100% 보일 때 감지
        rootMargin: '0px'
      }
    )

    // EndingSection 관찰 시작
    if (endingRef.current) {
      observer.observe(endingRef.current)
    }

    // 리사이즈 시에도 재측정 (단, 이미 측정된 경우는 제외)
    const handleResize = () => {
      if (!isMeasured && endingRef.current) {
        // 리사이즈 시 EndingSection이 보이는지 확인
        const rect = endingRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        if (isVisible) {
          setTimeout(() => {
            measureActualHeight()
          }, 100)
        }
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 뷰어 상태 변경 감지
  useEffect(() => {
    const calculatedHeight = actualHeight !== null 
      ? (isViewerOpen ? actualHeight + viewportHeight : actualHeight)
      : (isViewerOpen ? BASE_MIN_HEIGHT + viewportHeight : BASE_MIN_HEIGHT)
    
    console.log('[Viewer State]', {
      isViewerOpen,
      viewportHeight,
      actualHeight,
      baseMinHeight: BASE_MIN_HEIGHT,
      calculatedMinHeight: calculatedHeight,
      minHeight: `${calculatedHeight}px`
    })
  }, [isViewerOpen, viewportHeight, actualHeight])

  // 페이지 로드 시 1.5초간 스크롤 비활성화
  useEffect(() => {
    // 페이지 로드 시 스크롤 막기
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    // 1.5초 후 스크롤 다시 활성화
    const scrollTimer = setTimeout(() => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }, 1500)

    return () => {
      clearTimeout(scrollTimer)
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  // 스크롤 방향 전환 문제 디버깅 및 해결
  useEffect(() => {
    let lastScrollY = window.scrollY
    let scrollEndTimer: NodeJS.Timeout | null = null
    let isScrolling = false
    let lastScrollDirection: 'up' | 'down' | null = null
    let wheelEventCount = 0
    let scrollEventCount = 0


    // 스크롤 이벤트
    const handleScroll = () => {
      scrollEventCount++
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      
      if (Math.abs(scrollDelta) > 0.5) {
        isScrolling = true
        const currentDirection = scrollDelta > 0 ? 'down' : 'up'
        
        // 방향이 바뀌었는지 확인
        if (lastScrollDirection !== null && lastScrollDirection !== currentDirection) {
          // 방향 변경 감지
        }
        
        lastScrollDirection = currentDirection
        lastScrollY = currentScrollY
        
        // 스크롤 종료 타이머 리셋
        if (scrollEndTimer) {
          clearTimeout(scrollEndTimer)
        }
        
        scrollEndTimer = setTimeout(() => {
          isScrolling = false
        }, 150)
      }
      
    }

    // 마우스 휠 이벤트 - 스크롤이 멈춘 후 반대 방향으로 시작할 때만 처리
    let reverseWheelCheckTimer: NodeJS.Timeout | null = null
    let reverseWheelCheckCount = 0
    
    const handleWheel = (e: WheelEvent) => {
      wheelEventCount++
      const currentScrollY = window.scrollY
      const wheelDirection = e.deltaY > 0 ? 'down' : 'up'
      
      // 스크롤이 멈춘 상태에서 반대 방향으로 휠이 시작되는 경우만 처리
      if (!isScrolling && lastScrollDirection !== null && wheelDirection !== lastScrollDirection) {
        reverseWheelCheckCount++
        
        // 타이머 리셋 (여러 번 호출되는 것을 방지)
        if (reverseWheelCheckTimer) {
          clearTimeout(reverseWheelCheckTimer)
        }
        
        reverseWheelCheckTimer = setTimeout(() => {
          const newScrollY = window.scrollY
          const scrollChanged = Math.abs(newScrollY - currentScrollY) > 0.5
          
          if (!scrollChanged && Math.abs(e.deltaY) > 1) {
            
            // 스크롤을 강제로 활성화
            const scrollAmount = wheelDirection === 'down' ? Math.min(10, e.deltaY) : Math.max(-10, e.deltaY)
            window.scrollBy({ top: scrollAmount, behavior: 'auto' })
            
            // 리플로우 트리거
            const html = document.documentElement
            const originalTransform = html.style.transform
            html.style.transform = 'translateZ(0)'
            
            requestAnimationFrame(() => {
              html.style.transform = originalTransform
            })
          }
          
          reverseWheelCheckCount = 0
        }, 100)
      }
    }

    // 터치 이벤트
    let touchStartY = 0
    let touchStartScrollY = 0
    let touchMoveCount = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartScrollY = window.scrollY
      touchMoveCount = 0
      
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      
      touchMoveCount++
      const currentY = e.touches[0].clientY
      const deltaY = currentY - touchStartY
      const currentScrollY = window.scrollY
      
      
      // 스크롤이 멈춘 상태에서 반대 방향으로 터치가 시작되는 경우
      if (!isScrolling && lastScrollDirection !== null && touchMoveCount <= 5 && Math.abs(deltaY) > 5) {
        const touchDirection = deltaY > 0 ? 'down' : 'up'
        
        if (touchDirection !== lastScrollDirection) {
          // 리플로우 트리거
          const html = document.documentElement
          const originalTransform = html.style.transform
          html.style.transform = 'translateZ(0)'
          
          requestAnimationFrame(() => {
            html.style.transform = originalTransform
          })
        }
      }
    }

    const handleTouchEnd = () => {
      const endScrollY = window.scrollY
      const scrollDelta = endScrollY - touchStartScrollY
      
    }

    // 페이지 로드 완료 후
    const handleLoad = () => {
      // 스크롤이 안 되는 경우 강제로 활성화 시도 (방향 설정 방지)
      setTimeout(() => {
        const scrollHeight = document.documentElement.scrollHeight
        const windowHeight = window.innerHeight
        const currentScrollY = window.scrollY
        
        if (scrollHeight > windowHeight && currentScrollY === 0) {
          
          // 스크롤 방향 설정을 방지하기 위해 임시로 isScrolling을 true로 설정
          const wasScrolling = isScrolling
          isScrolling = true
          
          // 미세하게 스크롤을 움직여서 활성화
          window.scrollTo({ top: 1, behavior: 'auto' })
          
          requestAnimationFrame(() => {
            const newScrollY = window.scrollY
            // 즉시 0으로 복원 (방향 변경 감지 방지)
            window.scrollTo({ top: 0, behavior: 'auto' })
            
            // 스크롤 방향 설정 복원
            setTimeout(() => {
              isScrolling = wasScrolling
              lastScrollDirection = null // 방향 초기화
            }, 10)
          })
        }
      }, 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }
    
    return () => {
      if (scrollEndTimer) {
        clearTimeout(scrollEndTimer)
      }
      if (reverseWheelCheckTimer) {
        clearTimeout(reverseWheelCheckTimer)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('load', handleLoad)
    }
  }, [])


  const handleScrollToNext = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToInfo = () => {
    if (infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Main ref={mainRef} $isViewerOpen={isViewerOpen} $viewportHeight={viewportHeight} $actualHeight={actualHeight}>
        <IntroSection onScrollToNext={handleScrollToNext} />

        <QuoteSection />

        {/* <InvitationSection /> */}

        <div ref={infoRef}>
          <InfoSection content={infoContent} />
        </div>

        <KidSection 
          groomName={infoContent.groomName}
          brideName={infoContent.brideName}
        />

        <CalendarSection
          weddingDate={new Date(2026, 1, 28, 15, 40)} // 2026년 2월 28일 오후 3시 40분
          groomName={infoContent.groomName}
          brideName={infoContent.brideName}
        />

        <div ref={galleryRef}>
          <GallerySection 
            onScrollToInfo={handleScrollToInfo}
            onViewerStateChange={setIsViewerOpen}
          />
        </div>

        <LocationSection
          venueName={infoContent.location}
          address={infoContent.address}
          latitude={37.2715048903505} // 경기도 수원시 권선구 세화로 218
          longitude={126.995309613603}
        />

        <AccountSection 
        groomAccounts={
          [
            { bank: '국민', accountNumber: '202-01-0793-877', accountHolder: '이동호' },
            { bank: '국민', accountNumber: '240-21-0525-029', accountHolder: '박승이' },
            { bank: '국민', accountNumber: '552002-04-048433', accountHolder: '이정규' },
          ]
        }
        brideAccounts={
          [
            { bank: '농협', accountNumber: '617-12-129506', accountHolder: '이광선' },
            { bank: '신한', accountNumber: '110-432-372005', accountHolder: '홍경민' },
            { bank: '카카오', accountNumber: '3333-08-8906892', accountHolder: '이유빈' },
          ]
        }
        />

        <EndingSection sectionRef={endingRef} />
      </Main>
  )
}
