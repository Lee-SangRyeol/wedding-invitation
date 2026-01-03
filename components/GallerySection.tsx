'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

interface GallerySectionProps {
  onScrollToInfo?: () => void
  onViewerStateChange?: (isOpen: boolean) => void
}

const Section = styled.section`
  width: 100%;
  padding: 160px 0px;
  background-color: #F0F0F1;
  position: relative;
  margin-bottom: 100px;
`

const Title = styled.h2`
  font-size: 45px;
  font-weight: 300;
  color: rgb(155, 155, 139);
  text-align: center;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    font-size: 1.875rem;
    margin-bottom: 3rem;
  }
`

const Viewer = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  max-height: ${props => props.$isOpen ? '100vh' : '0'};
  height: 100vh;
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-bottom: ${props => props.$isOpen ? '2rem' : '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

const ViewerImageWrapper = styled.div`
  flex-shrink: 0;
  width: 100vw;
  height: 100vh;
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
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #333;
  }
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    gap: 0.5rem;
    max-width: 1200px;
  }
`

const GridItem = styled.div`
  position: relative;
  aspect-ratio: 2 / 3; /* 1:1.5 비율 (가로:세로) */
  cursor: pointer;
  overflow: hidden;
  background-color: #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem auto 0;
  padding: 0.75rem 1.5rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  font-size: 0.875rem;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'IropkeBatangM', serif;

  &:hover {
    background-color: #f9fafb;
  }
`

const ArrowIcon = styled.svg<{ $animate: boolean }>`
  width: 0.875rem;
  height: 0.875rem;
  fill: #9ca3af;
  animation: ${props => props.$animate ? 'bounce 1.5s infinite' : 'none'};

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(4px);
    }
  }
`

export default function GallerySection({ onScrollToInfo, onViewerStateChange }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 0 }) as React.RefObject<HTMLHeadingElement>
  const gridRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 300 }) as React.RefObject<HTMLDivElement>
  const [showAll, setShowAll] = useState(false)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, translateX: 0 })
  const viewerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const thumbnailImages = Array.from({ length: 18 }, (_, i) => `/img/p_${i + 1}.jpeg`)
  const fullQualityImages = Array.from({ length: 18 }, (_, i) => `/img/f_${i + 1}.jpeg`)

  const initialDisplayCount = 9 // 3x3 = 9개
  const displayedImages = showAll ? thumbnailImages : thumbnailImages.slice(0, initialDisplayCount)
  const totalImages = fullQualityImages.length

  // 이미지 클릭 시 뷰어 열기
  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex(index)
    const initialTranslateX = -index * (typeof window !== 'undefined' ? window.innerWidth : 0)
    setTranslateX(initialTranslateX)
    setIsViewerOpen(true)
          // Viewer 컴포넌트의 위치로 스크롤 이동
          if (viewerRef.current) {
            const viewerTop = viewerRef.current.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
              top: viewerTop,
              behavior: 'smooth'
            })
          }
  }

  // 뷰어 닫기
  const handleClose = () => {
    setIsViewerOpen(false)
    setTranslateX(0)
    setCurrentIndex(0)
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
  }, [isDragging, translateX, dragStart, currentIndex, totalImages])

  // 키보드 이벤트 (ESC로 닫기)
  useEffect(() => {
    if (!isViewerOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isViewerOpen])

  // 마우스 이벤트
  useEffect(() => {
    if (!isViewerOpen) return

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
  }, [isViewerOpen, isDragging, handleDragStart, handleDragMove, handleDragEnd])

  // 터치 이벤트
  useEffect(() => {
    if (!isViewerOpen) return

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
  }, [isViewerOpen, isDragging, dragStart, handleDragStart, handleDragMove, handleDragEnd])

  // 뷰어 상태 변경 시 부모 컴포넌트에 알림
  useEffect(() => {
    onViewerStateChange?.(isViewerOpen)
  }, [isViewerOpen, onViewerStateChange])

  // 뷰어가 열려있을 때 스크롤 제한 및 Viewer 위치로 이동
  useEffect(() => {
    if (isViewerOpen) {
      
      // 스크롤 제한
      // document.body.style.overflow = 'hidden'
      // document.documentElement.style.overflow = 'hidden'
      
      // 스크롤 위치 고정을 위해 body에 padding 추가 (스크롤바가 사라져도 레이아웃이 흔들리지 않도록)
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      // 스크롤 복원
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isViewerOpen])

  return (
    <>
      <Section ref={sectionRef}>
        <Title ref={titleRef}>Gallery</Title>
        
        <Viewer ref={viewerRef} $isOpen={isViewerOpen}>
          {isViewerOpen && (
            <>
              <CloseButton onClick={handleClose} aria-label="Close viewer">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </CloseButton>
              
              <ViewerContainer>
                <ImageSlider ref={sliderRef} $translateX={translateX} $isDragging={isDragging}>
                  {fullQualityImages.map((src, imgIndex) => (
                    <ViewerImageWrapper key={imgIndex} data-viewer-image>
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
            </>
          )}
        </Viewer>
        
        <GalleryGrid ref={gridRef}>
          {displayedImages.map((src, index) => {
            // 전체 이미지 배열에서의 실제 인덱스
            const actualIndex = index
            return (
              <GridItem
                key={actualIndex}
                onClick={(e) => handleImageClick(actualIndex, e)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${actualIndex + 1}`}
                  width={300}
                  height={300}
                  priority={index < 9}
                />
              </GridItem>
            )
          })}
        </GalleryGrid>

        {!showAll && thumbnailImages.length > initialDisplayCount && (
          <MoreButton onClick={() => setShowAll(true)}>
            <ArrowIcon $animate={true} viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" fill="currentColor"/>
            </ArrowIcon>
            사진 더 보기
          </MoreButton>
        )}
      </Section>
    </>
  )
}
