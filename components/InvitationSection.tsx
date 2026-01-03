'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

const Section = styled.section`
  width: 100%;
  padding: 3rem 1rem;
  background-color: #F0F0F1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Container = styled.div`
  max-width: 28rem;
  width: 100%;
  text-align: center;
`

const InvitationImage = styled.div`
  width: 100%;
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

export default function InvitationSection() {
  const imageRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) as React.RefObject<HTMLDivElement>

  return (
    <Section>
      <Container>
        <InvitationImage ref={imageRef}>
          <Image
            src="/img/image.png"
            alt="INVITATION"
            width={800}
            height={1200}
            priority
          />
        </InvitationImage>
      </Container>
    </Section>
  )
}

