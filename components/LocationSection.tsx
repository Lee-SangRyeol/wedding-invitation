'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

declare global {
  interface Window {
    kakao: any
  }
}

interface LocationSectionProps {
  venueName: string
  address: string
  latitude: number
  longitude: number
}

const Section = styled.section`
  width: 100%;
  padding: 38px 26px;
  background-color: #F0F0F1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 100px;
`

const Container = styled.div`
  max-width: 28rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LocationLabel = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  text-align: center;
  font-family: 'IropkeBatangM', serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`

const Title = styled.h2`
  font-size: 1.5rem;
  color: #374151;
  text-align: center;
  font-weight: 400;
  font-family: 'IropkeBatangM', serif;
  margin-bottom: 2rem;
`

const VenueName = styled.div`
  font-size: 1rem;
  color: #374151;
  text-align: center;
  font-weight: 400;
  font-family: 'IropkeBatangM', serif;
  margin-bottom: 0.5rem;
`

const Address = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  font-family: 'IropkeBatangM', serif;
  margin-bottom: 15px;
`

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 0;
  overflow: hidden;
  position: relative;
  background-color: #f3f4f6;
  border-radius: 24px 24px 0 0 ;
`

const Map = styled.div`
  width: 100%;
  height: 100%;
`

const NavigationButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  background-color: rgb(209, 219, 191);
  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 24px 24px;
  border-bottom: 1px solid #e5e7eb;
`

const NavButton = styled.a`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  text-decoration: none;
  color: #374151;
  transition: background-color 0.2s;
  border-right: 1px solid #e5e7eb;

  &:last-child {
    border-right: none;
  }

  &:active {
    background-color: #f3f4f6;
  }
`

const NavIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const NavLabel = styled.div`
  font-size: 0.75rem;
  color: #374151;
  font-family: 'IropkeBatangM', serif;
`

const InfoSection = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  background-color: transparent;
`

const InfoItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1.25rem 0;
  border-bottom: 1px solid #e5e7eb;
  
  &:last-child {
    border-bottom: none;
  }
`

const InfoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: rgb(184, 202, 150);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color:rgb(47, 47, 47);
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 1.5;
  }
  
  .icon-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(47, 47, 47);
    font-family: 'IropkeBatangM', serif;
  }
`

const InfoContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const InfoTitle = styled.div`
  font-size: 0.9375rem;
  color: #374151;
  font-weight: 500;
  font-family: 'IropkeBatangM', serif;
  margin-bottom: 0.25rem;
`

const InfoText = styled.div`
  font-size: 0.8125rem;
  color: #6b7280;
  font-family: 'IropkeBatangM', serif;
  line-height: 1.5;
`

export default function LocationSection({ venueName, address, latitude, longitude }: LocationSectionProps) {
  const labelRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 0 }) as React.RefObject<HTMLDivElement>
  const titleRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 200 }) as React.RefObject<HTMLHeadingElement>
  const venueRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 400 }) as React.RefObject<HTMLDivElement>
  const mapRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 600 }) as React.RefObject<HTMLDivElement>
  const navRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 800 }) as React.RefObject<HTMLDivElement>
  const infoRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 1000 }) as React.RefObject<HTMLDivElement>
  const mapElementRef = useRef<HTMLDivElement>(null)

  // 카카오 지도 초기화 (API 키 필요 - 환경변수에서 가져오거나 직접 입력)
  useEffect(() => {
    if (!mapElementRef.current) return

    // 카카오 지도 API JavaScript 키 (실제 사용 시 환경변수로 관리)
    const APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || 'YOUR_APP_KEY'

    // 이미 로드된 경우 스킵
    if (window.kakao && window.kakao.maps) {
      initMap()
      return
    }

    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    script.async = true
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          initMap()
        })
      }
    }
    document.head.appendChild(script)

    function initMap() {
      if (!mapElementRef.current || !window.kakao?.maps) return

      const container = mapElementRef.current
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3, // 확대 레벨 (3이 적당함)
      }
      
      const map = new window.kakao.maps.Map(container, options)
      
      // 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude)
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      })
      marker.setMap(map)
    }

    return () => {
      // 스크립트는 재사용 가능하므로 제거하지 않음
    }
  }, [latitude, longitude, venueName])

  // 네이버 지도 URL 생성
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`
  
  // 카카오 내비 URL 생성
  const kakaoNavUrl = `kakaomap://route?sp=&ep=${latitude},${longitude}&by=CAR`
  const kakaoNavWebUrl = `https://map.kakao.com/link/to/${encodeURIComponent(address)},${latitude},${longitude}`
  
  // 티맵 URL 생성
  const tmapUrl = `tmap://route?goalname=${encodeURIComponent(venueName)}&goalx=${longitude}&goaly=${latitude}`

  const handleKakaoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (!isMobile) {
      e.preventDefault()
      window.open(kakaoNavWebUrl, '_blank')
    }
  }

  const handleTmapClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (!isMobile) {
      e.preventDefault()
      alert('티맵 앱이 필요합니다.')
    }
  }

  return (
    <Section>
      <Container>
        <LocationLabel ref={labelRef}>LOCATION</LocationLabel>
        <Title ref={titleRef}>오시는 길</Title>
        <VenueName ref={venueRef}>{venueName}</VenueName>
        <Address ref={venueRef}>{address}</Address>

        <MapContainer ref={mapRef}>
          <Map ref={mapElementRef} id="kakao-map" />
        </MapContainer>

        <NavigationButtons ref={navRef}>
          <NavButton href={naverMapUrl} target="_blank" rel="noopener noreferrer">
            <NavIcon>
              <Image
                src="/img/N_M_icon.png"
                alt="네이버 지도"
                width={20}
                height={20}
              />
            </NavIcon>
            <NavLabel>네이버 지도</NavLabel>
          </NavButton>
          <NavButton href={kakaoNavUrl} onClick={handleKakaoClick}>
            <NavIcon>
              <Image
                src="/img/K_M_icon.png"
                alt="카카오 내비"
                width={20}
                height={20}
              />
            </NavIcon>
            <NavLabel>카카오 내비</NavLabel>
          </NavButton>
          <NavButton href={tmapUrl} onClick={handleTmapClick}>
            <NavIcon>
              <Image
                src="/img/T_M_icon.png"
                alt="티맵"
                width={20}
                height={20}
              />
            </NavIcon>
            <NavLabel>티맵</NavLabel>
          </NavButton>
        </NavigationButtons>

        <InfoSection ref={infoRef}>
          <InfoItem>
            <InfoIcon>
              <span className="icon-text">P</span>
            </InfoIcon>
            <InfoContent>
              <InfoTitle>주차안내</InfoTitle>
              <InfoText>수원 파티웨딩유. 무료 주차</InfoText>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <svg fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4C6.8 4 5 5.8 5 8v5H3v3h2v11c0 .55.45 1 1 1h3l.344-1h13.312L23 28h3c.55 0 1-.45 1-1V16h2v-3h-2V8c0-2.2-1.8-4-4-4zm0 2h14c1.117 0 2 .883 2 2H7c0-1.117.883-2 2-2zm-2 4h8v7H7zm10 0h8v7h-8zM7 19h18v6H7zm1 2v2h4v-2zm12 0v2h4v-2z" />
              </svg>
            </InfoIcon>
            <InfoContent>
              <InfoTitle>셔틀안내</InfoTitle>
              <InfoText>
                [수원역] 13번 출구 - 파티웨딩유 안내판<br />
                14시 40분 부터 10~15분 간격
              </InfoText>
            </InfoContent>
          </InfoItem>
        </InfoSection>
      </Container>
    </Section>
  )
}

