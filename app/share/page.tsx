'use client'

import { use } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import KakaoShareButton from '@/components/KakaoShareButton'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const Card = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 3rem 2rem;
  max-width: 28rem;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  color: #333;
  text-align: center;
  font-family: 'IropkeBatangM', serif;
  line-height: 1.6;
`

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

const InfoText = styled.p`
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  font-family: 'IropkeBatangM', serif;
  line-height: 1.6;
`

export default function SharePage() {
  const siteUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://wedding-invitation.asia'

  return (
    <Container>
      <Card>
        <Title>
          이정규 ♥ 이유빈<br />
          결혼합니다
        </Title>
        
        <ImageWrapper>
          <Image
            src="/img/f_6.jpeg"
            alt="이정규 ♥ 이유빈 결혼사진"
            width={600}
            height={900}
            priority
          />
        </ImageWrapper>

        <InfoText>
          2026년 2월 28일 (토) 오후 3시 40분<br />
          파티 웨딩유<br />
          <br />
          카카오톡으로 공유하여<br />
          소중한 분들을 초대해보세요
        </InfoText>

        <KakaoShareButton 
          imageUrl={`${siteUrl}/img/f_6.jpeg`}
        />
      </Card>
    </Container>
  )
}

