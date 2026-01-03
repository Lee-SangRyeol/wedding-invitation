'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styled from 'styled-components'

interface IntroSectionProps {
  onScrollToNext: () => void
}

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 1rem;
  background-color: #F0F0F1;
  position: relative;
  gap: 2rem;
  margin-bottom: 100px;

  @media (min-width: 768px) {
    padding: 3rem 1rem;
  }
`

const TextContainer = styled.div`
  text-align: center;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
  width: 100%;
  flex-shrink: 0;
  
  @media (min-width: 768px) {
  }
`

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 300;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.75;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.875rem;
  }
`

const Subtitle = styled.p`
  font-size:15px;
  color: rgb(110, 98, 87);
  margin-bottom: 2rem;
  font-weight: 900;
  font-family: 'IropkeBatangM', serif;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`

const DateText = styled.p`
  font-size: 30px;
  color:rgb(110, 98, 87);
  margin-top: 1rem;
  font-weight: 900;
  letter-spacing: 0.05em;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`

const DayText = styled.p`
  font-size: 0.75rem;
  color: rgb(110, 98, 87);
  margin-top: 0.5rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 20rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    display: block;
    mask-image: linear-gradient(to bottom, 
      rgba(0, 0, 0, 1) 0%, 
      rgba(0, 0, 0, 1) 90%, 
      rgba(0, 0, 0, 0.8) 95%, 
      rgba(0, 0, 0, 0) 100%);
    -webkit-mask-image: linear-gradient(to bottom, 
      rgba(0, 0, 0, 1) 0%, 
      rgba(0, 0, 0, 1) 90%, 
      rgba(0, 0, 0, 0.8) 95%, 
      rgba(0, 0, 0, 0) 100%);
  }
`

const ViewDetailsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 2rem;
  cursor: pointer;
`

// const ViewDetailsText = styled.p`
//   font-size: 0.875rem;
//   color: #1f2937;
//   font-weight: 500;

//   @media (min-width: 768px) {
//     font-size: 1rem;
//   }
// `

// const ArrowIcon = styled.svg`
//   width: 1.25rem;
//   height: 1.25rem;
//   color: #1f2937;
// `

// const CanvasContainer = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   pointer-events: none;
//   z-index: 1;
//   overflow: hidden;
// `

// const Canvas = styled.canvas`
//   width: 100%;
//   height: 100%;
// `

// interface TulipParticle {
//   x: number
//   y: number
//   vx: number
//   vy: number
//   rotation: number
//   rotationSpeed: number
//   scale: number
//   imageIndex: number
//   image: HTMLImageElement | null
// }

export default function IntroSection({ onScrollToNext }: IntroSectionProps) {
  const [showOpenImage, setShowOpenImage] = useState(false)
  const [showViewDetails, setShowViewDetails] = useState(false)
  // const canvasRef = useRef<HTMLCanvasElement>(null)
  // const animationFrameRef = useRef<number | null>(null)
  // const particlesRef = useRef<TulipParticle[]>([])
  // const imagesRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOpenImage(true)
      setShowViewDetails(true)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // useEffect(() => {
    // const canvas = canvasRef.current
    // if (!canvas) return

    // const ctx = canvas.getContext('2d')
    // if (!ctx) return

    // Canvas 크기 설정
    // const resizeCanvas = () => {
    //   canvas.width = canvas.offsetWidth
    //   canvas.height = canvas.offsetHeight
    // }
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)

    // 튤립 이미지 로드
    // const tulipImages = ['/img/tuliip_1.png', '/img/tuliip_2.png', '/img/tuliip_3.png', '/img/tuliip_4.png']
    // let loadedImages = 0

    // tulipImages.forEach((src, index) => {
    //   const img = document.createElement('img')
    //   img.onload = () => {
    //     loadedImages++
    //     imagesRef.current[index] = img
    //     if (loadedImages === tulipImages.length) {
    //       initParticles()
    //     }
    //   }
    //   img.src = src
    // })

    // 파티클 초기화 (10개씩 5번 생성)
    // const initParticles = () => {
    //   particlesRef.current = []
    //   const particlesPerBatch = 2 // 한 번에 생성할 파티클 수
    //   const batchCount = 5 // 생성할 배치 수
    //   const delayBetweenBatches = 5000 // 배치 간 딜레이 (ms)

    //   const createParticleBatch = (batchIndex: number) => {
    //     for (let i = 0; i < particlesPerBatch; i++) {
    //       const globalIndex = batchIndex * particlesPerBatch + i
          
    //       // 상단 전체에서 고르게 분산하여 시작
    //       const startX = Math.random() * canvas.width // 전체 너비에서 고르게
    //       const startY = Math.random() * canvas.height * 0.2 // 상단 20% 영역에서 시작
          
    //       // 왼쪽 아래 방향으로 떨어지는 대각선 방향
    //       // 왼쪽으로 (음수 vx), 아래로 (양수 vy)
    //       const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2 // 대략 45도 각도 ± 변동
    //       const speed = Math.random() * 2.0 + 1.3 // 속도
          
    //       particlesRef.current.push({
    //         x: startX,
    //         y: startY,
    //         vx: -Math.cos(angle) * speed, // 왼쪽 방향 (음수)
    //         vy: Math.sin(angle) * speed, // 아래 방향 (양수)
    //         rotation: Math.random() * Math.PI * 2,
    //         rotationSpeed: (Math.random() - 0.5) * 0.05,
    //         scale: Math.random() * 0.1 + 0.05, // 0.03 ~ 0.07 크기 (훨씬 작게) - 이 값을 수정하면 크기 변경됨
    //         imageIndex: globalIndex % 4, // 4개 이미지를 순환 사용
    //         image: imagesRef.current[globalIndex % 4] || null,
    //       })
    //     }
    //   }

    //   // 첫 번째 배치 즉시 생성
    //   createParticleBatch(0)

    //   // 나머지 배치들을 딜레이를 두고 생성
    //   for (let batch = 1; batch < batchCount; batch++) {
    //     setTimeout(() => {
    //       createParticleBatch(batch)
    //     }, delayBetweenBatches * batch)
    //   }
    // }

    // 애니메이션 루프
    // const animate = () => {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height)

    //   particlesRef.current.forEach((particle) => {
    //     if (!particle.image) return

    //     // 위치 업데이트
    //     particle.x += particle.vx
    //     particle.y += particle.vy
    //     particle.rotation += particle.rotationSpeed

    //     // 중력 효과 (대각선 방향 유지하면서 약간 가속)
    //     particle.vy += 0.005

    //     // 바람 효과 (약간의 좌우 흔들림)
    //     particle.vx += (Math.random() - 0.5) * 0.01

    //     // 화면 밖으로 나가면 상단에서 재생성
    //     if (particle.y > canvas.height + 50 || particle.x < -50) {
    //       // 상단 전체에서 고르게 다시 시작
    //       particle.x = Math.random() * canvas.width
    //       particle.y = Math.random() * canvas.height * 0.2
          
    //       // 왼쪽 아래 방향 재설정
    //       const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2
    //       const speed = Math.random() * 0.4 + 0.2
    //       particle.vx = -Math.cos(angle) * speed
    //       particle.vy = Math.sin(angle) * speed
    //     }

    //     // 이미지 그리기
    //     ctx.save()
    //     ctx.translate(particle.x, particle.y)
    //     ctx.rotate(particle.rotation)
    //     ctx.scale(particle.scale, particle.scale)
    //     ctx.drawImage(
    //       particle.image,
    //       -particle.image.width / 2,
    //       -particle.image.height / 2
    //     )
    //     ctx.restore()
    //   })

    //   animationFrameRef.current = requestAnimationFrame(animate)
    // }

    // 애니메이션 시작
    // animate()

    // return () => {
    //   window.removeEventListener('resize', resizeCanvas)
    //   if (animationFrameRef.current) {
    //     cancelAnimationFrame(animationFrameRef.current)
    //   }
    // }
  // }, [])

  const handleViewDetailsClick = () => {
    onScrollToNext()
  }

  return (
    <Section>
      {/* <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer> */}
      <TextContainer>
        <DateText>The Wedding of </DateText>
        <DayText>Jung-kyu & Yu-bin</DayText>
        <DayText>2026. 02. 28</DayText>
      </TextContainer>

      <ImageWrapper>
        {!showOpenImage ? (
          <Image
            src="/img/close.png"
            alt="닫힌 편지봉투"
            width={400}
            height={600}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            priority
          />
        ) : (
          <Image
            src="/img/open.png"
            alt="열린 편지봉투"
            width={400}
            height={600}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            priority
          />
        )}
      </ImageWrapper>

      <TextContainer>
        <Subtitle>
        새로운 시작, 그 설렘을 담아
        <br />
        소중한 분들을 모십니다
        </Subtitle>
      </TextContainer>

      {showViewDetails && (
        <ViewDetailsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleViewDetailsClick}
        >
          {/* <ViewDetailsText>View Details</ViewDetailsText> */}
          {/* <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowIcon
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </ArrowIcon>
          </motion.div> */}
        </ViewDetailsContainer>
      )}
    </Section>
  )
}
