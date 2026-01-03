'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.div<{ $height?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${props => props.$height ? `${props.$height}px` : '100vh'};
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  overflow: hidden;
`

const ViewerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const ImageSlider = styled.div<{ $translateX: number; $isDragging: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(${props => props.$translateX}px);
  transition: ${props => props.$isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'};
  will-change: transform;
`

const ViewerImageWrapper = styled.div<{ $height?: number }>`
  flex-shrink: 0;
  width: 100vw;
  height: ${props => props.$height ? `${props.$height}px` : '100vh'};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
`

const galleryImages = Array.from({ length: 18 }, (_, i) => `/img/f_${i + 1}.jpeg`)

export default function GalleryViewerPage() {
  const router = useRouter()
  const params = useParams()
  const initialIndex = parseInt(params.index as string, 10) || 0
  
  // 모든 상태를 로컬에서 관리 (URL 변경과 독립적으로)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [translateX, setTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, translateX: 0 })
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(undefined)
  const sliderRef = useRef<HTMLDivElement>(null)
  const urlUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const totalImages = galleryImages.length

  // 초기 인덱스 설정 및 뷰포트 높이 고정 (상단/하단 바 숨김 상태 유지)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 페이지 전환 시 현재 뷰포트 높이를 즉시 캡처 (상단/하단 바가 숨겨진 상태라면 그 높이 유지)
      const currentHeight = window.innerHeight
      setViewportHeight(currentHeight)
      
      // 스크롤 완전히 막기 (상단/하단 바가 나타나지 않도록)
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.height = `${currentHeight}px`
      document.documentElement.style.position = 'fixed'
      document.documentElement.style.width = '100%'
      document.documentElement.style.top = '0'
      document.documentElement.style.left = '0'
      
      document.body.style.overflow = 'hidden'
      document.body.style.height = `${currentHeight}px`
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = '0'
      document.body.style.left = '0'
      
      // 스크롤 위치를 맨 위로 고정 (하지만 실제로는 스크롤이 없어야 함)
      window.scrollTo(0, 0)
      
      // resize 이벤트에서도 높이 유지 (상단/하단 바가 나타나려고 하면 막음)
      const preventBarShow = () => {
        const newHeight = window.innerHeight
        if (newHeight > currentHeight) {
          // 높이가 커졌다는 것은 상단/하단 바가 나타나려는 것
          // 원래 높이를 유지
          document.documentElement.style.height = `${currentHeight}px`
          document.body.style.height = `${currentHeight}px`
        } else {
          // 높이가 작아졌다면 실제 높이 사용
          setViewportHeight(newHeight)
          document.documentElement.style.height = `${newHeight}px`
          document.body.style.height = `${newHeight}px`
        }
      }
      
      window.addEventListener('resize', preventBarShow)
      
      const initialTranslateX = -initialIndex * window.innerWidth
      setCurrentIndex(initialIndex)
      setTranslateX(initialTranslateX)

      return () => {
        // 정리: 스타일 복원
        window.removeEventListener('resize', preventBarShow)
        document.documentElement.style.overflow = ''
        document.documentElement.style.height = ''
        document.documentElement.style.position = ''
        document.documentElement.style.width = ''
        document.documentElement.style.top = ''
        document.documentElement.style.left = ''
        document.body.style.overflow = ''
        document.body.style.height = ''
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.top = ''
        document.body.style.left = ''
        
        if (urlUpdateTimeoutRef.current) {
          clearTimeout(urlUpdateTimeoutRef.current)
        }
      }
    }
  }, [initialIndex]) // initialIndex가 변경될 때만 (다른 갤러리 이미지를 클릭한 경우)

  // URL 업데이트는 스와이프 완료 후에만 (debounce)
  const updateURL = useCallback((index: number) => {
    if (urlUpdateTimeoutRef.current) {
      clearTimeout(urlUpdateTimeoutRef.current)
    }
    
    urlUpdateTimeoutRef.current = setTimeout(() => {
      // URL만 업데이트하고 페이지 리로드나 리렌더링 없이
      window.history.replaceState(null, '', `/gallery/${index}`)
    }, 100) // 스와이프 완료 후 100ms 뒤에 URL 업데이트
  }, [])

  const handleClose = () => {
    router.back()
  }

  // 드래그 시작
  const handleDragStart = useCallback((clientX: number, clientY?: number) => {
    setIsDragging(true)
    setDragStart({
      x: clientX,
      y: clientY || 0,
      translateX: translateX,
    })
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'none'
    }
  }, [translateX])

  // 드래그 중
  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || typeof window === 'undefined') return

    const deltaX = clientX - dragStart.x
    const newTranslateX = dragStart.translateX + deltaX
    const minTranslateX = -(totalImages - 1) * window.innerWidth
    const maxTranslateX = 0

    const clampedTranslateX = Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX))
    setTranslateX(clampedTranslateX)
  }, [isDragging, dragStart, totalImages])

  // 드래그 종료 및 스냅
  const handleDragEnd = useCallback(() => {
    if (!isDragging || typeof window === 'undefined') return
    
    const dragDelta = translateX - dragStart.translateX
    const threshold = window.innerWidth * 0.15

    let newIndex = currentIndex

    if (Math.abs(dragDelta) > threshold) {
      if (dragDelta < 0) {
        newIndex = Math.min(currentIndex + 1, totalImages - 1)
      } else {
        newIndex = Math.max(currentIndex - 1, 0)
      }
    } else {
      const currentIndexFromTranslate = Math.round(-translateX / window.innerWidth)
      newIndex = Math.max(0, Math.min(totalImages - 1, currentIndexFromTranslate))
    }
    
    // 드래그 종료 시 transition 다시 활성화
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
    
    setIsDragging(false)
    setCurrentIndex(newIndex)
    const newTranslateX = -newIndex * window.innerWidth
    setTranslateX(newTranslateX)
    
    // URL 업데이트 (스와이프 완료 후)
    updateURL(newIndex)
  }, [isDragging, translateX, dragStart, currentIndex, totalImages, updateURL])

  // 키보드 이벤트 (ESC로 닫기)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 마우스 이벤트
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.target === sliderRef.current || (e.target as HTMLElement).closest('[data-viewer-image]')) {
        handleDragStart(e.clientX)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDragMove(e.clientX)
      }
    }

    const handleMouseUp = () => {
      handleDragEnd()
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleDragStart, handleDragMove, handleDragEnd])

  // 터치 이벤트
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const currentX = e.touches[0].clientX
        const currentY = e.touches[0].clientY
        const deltaX = Math.abs(currentX - dragStart.x)
        const deltaY = Math.abs(currentY - dragStart.y)
        
        if (deltaX > deltaY && deltaX > 10) {
          e.preventDefault()
          handleDragMove(currentX)
        }
      }
    }

    const handleTouchEnd = () => {
      handleDragEnd()
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, dragStart, handleDragStart, handleDragMove, handleDragEnd])

  return (
    <Container $height={viewportHeight}>
      <CloseButton onClick={handleClose} aria-label="Close viewer">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </CloseButton>

      <ViewerContainer>
        <ImageSlider ref={sliderRef} $translateX={translateX} $isDragging={isDragging}>
          {galleryImages.map((src, imgIndex) => (
            <ViewerImageWrapper key={imgIndex} $height={viewportHeight} data-viewer-image>
              <Image
                src={src}
                alt={`Gallery image ${imgIndex + 1}`}
                width={1920}
                height={1080}
                priority={Math.abs(imgIndex - currentIndex) <= 1}
              />
            </ViewerImageWrapper>
          ))}
        </ImageSlider>
      </ViewerContainer>
    </Container>
  )
}
