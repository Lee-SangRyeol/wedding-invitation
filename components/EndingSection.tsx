'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

interface EndingSectionProps {
  sectionRef?: React.RefObject<HTMLElement>
}

const Section = styled.section`
  width: 100%;
  padding: 0;
  background-color: #F0F0F1;
  position: relative;
`

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

export default function EndingSection({ sectionRef }: EndingSectionProps = {}) {
  const imageRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) as React.RefObject<HTMLDivElement>

  return (
    <Section ref={sectionRef}>
      <ImageContainer ref={imageRef}>
        <Image
          src="/img/ending.png"
          alt="축하해주신 모든 분들께 진심으로 감사드리며 행복하게 살겠습니다"
          width={1920}
          height={1080}
          priority
        />
      </ImageContainer>
    </Section>
  )
}

