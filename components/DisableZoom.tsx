'use client'

import { useEffect } from 'react'

/**
 * 모바일 브라우저에서 확대 방지를 위한 컴포넌트
 */
export default function DisableZoom() {
  useEffect(() => {
    // 핀치 줌 방지
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    // 더블탭 줌 방지
    let lastTouchEnd = 0
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }

    // 확대 제스처 방지
    const handleGestureStart = (e: Event) => {
      e.preventDefault()
    }

    // 이벤트 리스너 등록
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: false })
    document.addEventListener('gesturestart', handleGestureStart)
    document.addEventListener('gesturechange', handleGestureStart)
    document.addEventListener('gestureend', handleGestureStart)

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('gesturestart', handleGestureStart)
      document.removeEventListener('gesturechange', handleGestureStart)
      document.removeEventListener('gestureend', handleGestureStart)
    }
  }, [])

  return null
}

