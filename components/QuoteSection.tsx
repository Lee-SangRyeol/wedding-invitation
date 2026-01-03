'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

const Section = styled.section`
  width: 100%;
  padding: 4rem 1rem;
  background-color: #F0F0F1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 100px;
`

const Container = styled.div`
  max-width: 28rem;
  width: 100%;
  text-align: center;
  padding: 2rem 0;
`

const FlowerIconWrapper = styled.div`
  width: 2rem;
  height: auto;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }
`

const QuoteText = styled.p`
  font-size: 1rem;
  color: #49413a;
  line-height: 2;
  margin-bottom: 0.5rem;
  font-family: 'IropkeBatangM', serif;

  @media (min-width: 768px) {
    font-size: 1.125rem;
    line-height: 2.2;
  }
`

const Attribution = styled.p`
  font-size: 0.875rem;
  color: #49413a;
  margin-top: 2rem;
  font-family: 'IropkeBatangM', serif;

  &.fade-in-visible {
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

export default function QuoteSection() {
  const flowerRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 0 }) as React.RefObject<HTMLDivElement>
  const text1Ref = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 300 }) as React.RefObject<HTMLParagraphElement>
  const text2Ref = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 600 }) as React.RefObject<HTMLParagraphElement>
  const attributionRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 900 }) as React.RefObject<HTMLParagraphElement>

  return (
    <Section>
      <Container>
        <FlowerIconWrapper ref={flowerRef}>
          <Image
            src="/img/flower.png"
            alt="꽃 아이콘"
            width={32}
            height={48}
            priority
          />
        </FlowerIconWrapper>
        <QuoteText ref={text1Ref}>
          그리스도께서 너희를 사랑하신 것 같이
        </QuoteText>
        <QuoteText ref={text2Ref}>
          너희도 사랑 가운데서 행하라
        </QuoteText>
        <Attribution ref={attributionRef}>
          에베소서 5:2
        </Attribution>
      </Container>
    </Section>
  )
}

