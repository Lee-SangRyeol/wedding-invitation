'use client'

import styled from 'styled-components'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

interface InfoContent {
  groomName: string
  brideName: string
  date: string
  time: string
  location: string
  address: string
  message?: string
}

interface InfoSectionProps {
  content: InfoContent
}

const Section = styled.section`
// background-color:rgb(210, 223, 186);
  width: 100%;
  margin-bottom: 100px;

  @media (min-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Card = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`

const CenterContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const DecorativeLine = styled.div`
  display: inline-block;
  border-top: 2px solid #8B6F47;
  width: 6rem;
  margin-bottom: 1rem;
`

const DecorativeLineBottom = styled.div`
  display: inline-block;
  border-top: 2px solid #8B6F47;
  width: 6rem;
  margin-top: 1rem;
`

const DecorativeLineLight = styled.div`
  display: inline-block;
  border-top: 1px solid #D4A574;
  width: 4rem;
`

const MainTitle = styled.h1`
  font-size: 18px;
  font-family: 'IropkeBatangM', serif;
  color: #5C4A2E;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`

const DateText = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: #5C4A2E;
`

const TimeText = styled.p`
  font-size: 1rem;
  color: #374151;
`

const LocationText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #5C4A2E;
`

const AddressText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.75;
`

const MessageContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const MessageText = styled.p`
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.75;
  white-space: pre-line;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const Spacer = styled.div`
  margin-top: 3rem;
`

const SpaceY = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

// 메시지 줄별 페이드인을 위한 컴포넌트
function FadeInMessageLine({ line, delay }: { line: string; delay: number }) {
  const textRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay }) as React.RefObject<HTMLParagraphElement>
  return <MessageText ref={textRef}>{line}</MessageText>
}

export default function InfoSection({ content }: InfoSectionProps) {
  const titleRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 0 }) as React.RefObject<HTMLDivElement>
  const spacerRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 1200 }) as React.RefObject<HTMLDivElement>

  // 메시지를 줄별로 분리하여 각각 페이드인 적용
  const messageLines = content.message ? content.message.split('\n').filter(line => line.trim() !== '') : []

  return (
    <Section>
      <Card>
        <CenterContainer ref={titleRef}>
          <DecorativeLine />
          <MainTitle>소중한 분들을 초대합니다</MainTitle>
          <DecorativeLineBottom />
        </CenterContainer>

        {content.message && (
          <MessageContainer>
            {messageLines.map((line, index) => (
              <FadeInMessageLine key={index} line={line} delay={300 + (index * 300)} />
            ))}
          </MessageContainer>
        )}

        {/* <CenterContainer>
          <SpaceY>
            <DateText>{content.date}</DateText>
            <TimeText>{content.time}</TimeText>
          </SpaceY>
        </CenterContainer>

        <CenterContainer>
          <SpaceY>
            <LocationText>{content.location}</LocationText>
            <AddressText>{content.address}</AddressText>
          </SpaceY>
        </CenterContainer> */}



        {/* <CenterContainer ref={spacerRef}>
          <Spacer>
            <DecorativeLineLight />
          </Spacer>
        </CenterContainer> */}
      </Card>
    </Section>
  )
}
