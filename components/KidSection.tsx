'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

interface KidSectionProps {
  groomName: string
  brideName: string
}

const Section = styled.section`
  width: 100%;
  padding: 3rem 1rem;
  background-color: #F0F0F1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;

  @media (min-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Container = styled.div`
  max-width: 28rem;
  width: 100%;
  text-align: center;
`

const KidImageContainer = styled.div`
  width: 100%;
  max-width: 28rem; /* 컨테이너 최대 너비 고정 */
  margin-bottom: 2rem;
  flex-shrink: 0;
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

const CenterContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const NamesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const Name = styled.span`
  font-size: 15px;
  font-weight: 900;
  color: #5C4A2E;
  font-family: 'IropkeBatangM', serif;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`

const Dot = styled.span`
  color: #8B6F47;
`

const SubText = styled.p`
  font-size: 15px;
  color: #4b5563;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-family: 'IropkeBatangM', serif;
`

const RelationshipText = styled.span`
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  text-align: left;
`

export default function KidSection({ groomName, brideName }: KidSectionProps) {
  const imageRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 0 }) as React.RefObject<HTMLDivElement>
  const textRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 300 }) as React.RefObject<HTMLDivElement>

  return (
    <Section>
      <Container>
        <KidImageContainer ref={imageRef}>
          <Image
            src="/img/kid.jpeg"
            alt="Wedding couple"
            width={800}
            height={600}
            priority
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </KidImageContainer>

        <CenterContainer ref={textRef}>
          {/* <NamesContainer>
            <Name>{groomName}</Name>
            <Dot>·</Dot>
            <Name>{brideName}</Name>
          </NamesContainer> */}
          <SubText>
            이동호 · 박승이 <RelationshipText>아들</RelationshipText><Name>이정규</Name>
          </SubText>
          <SubText>
            이광선 · 홍경민 <RelationshipText>딸</RelationshipText><Name>이유빈</Name>
          </SubText>
        </CenterContainer>
      </Container>
    </Section>
  )
}

