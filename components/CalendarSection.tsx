'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

const Section = styled.section`
  min-height: 570px;
  width: calc(100% - 20px);
  padding: 3rem 1rem;
  background-color: #f6f5f5;
  display: flex;
  margin-right: 10px;
  margin-left: 10px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Header = styled.div`
  text-align: center;
  width: 100%;
`

const DateText = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: #544f4f;
  margin-bottom: 0.5rem;
  font-family: 'IropkeBatangM', serif;
`

const TimeText = styled.div`
  font-size: 0.875rem;
  font-weight: 900;
  color: #544f4f;
  font-family: 'IropkeBatangM', serif;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 1.5rem 0;
`

const CalendarContainer = styled.div`
  width: 100%;
`

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const WeekDay = styled.div<{ $isSunday: boolean }>`
  text-align: center;
  font-size: 0.75rem;
  color: ${props => props.$isSunday ? '#ef4444' : '#6b7280'};
  font-family: 'IropkeBatangM', serif;
  padding: 0.5rem 0;
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`

const CalendarDay = styled.div<{ $isSunday: boolean; $isHighlighted: boolean }>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: ${props => {
    if (props.$isHighlighted) return '#ffffff';
    return props.$isSunday ? '#ef4444' : '#6b7280';
  }};
  background-color: ${props => props.$isHighlighted ? 'rgb(178, 198, 142)' : 'transparent'};
  border-radius: 50%;
  font-family: 'IropkeBatangM', serif;
  position: relative;
`

const CountdownContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`

const CountdownBox = styled.div`
  background-color:rgb(224, 235, 204);
  border-radius: 0.25rem;
  padding: 1rem 0.75rem;
  min-width: 3.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CountdownNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #374151;
  font-family: 'IropkeBatangM', serif;
  line-height: 1.2;
`

const CountdownLabel = styled.div`
  font-size: 0.625rem;
  color: #6b7280;
  margin-top: 0.25rem;
  font-family: 'IropkeBatangM', serif;
`

const Colon = styled.div`
  font-size: 1.25rem;
  color: #9ca3af;
  padding: 0 0.25rem;
`

const Message = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  font-family: 'IropkeBatangM', serif;
  margin-top: 1rem;
`

const HighlightedNumber = styled.span`
  color: #ef4444;
  font-weight: 500;
`

interface CalendarSectionProps {
  weddingDate: Date
  groomName: string
  brideName: string
}

export default function CalendarSection({ weddingDate, groomName, brideName }: CalendarSectionProps) {
  const headerRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 0 }) as React.RefObject<HTMLDivElement>
  const calendarRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 300 }) as React.RefObject<HTMLDivElement>
  const countdownRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 600 }) as React.RefObject<HTMLDivElement>
  const messageRef = useScrollFadeIn({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', delay: 900 }) as React.RefObject<HTMLDivElement>

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          totalDays: days,
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
        })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [weddingDate])

  // 2026년 2월 달력 생성
  // 2월 1일은 일요일, 2월 28일은 토요일
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  const calendarDays: (number | null)[] = []

  // 2월 1일이 일요일이므로 첫 번째 날부터 시작
  for (let i = 1; i <= 28; i++) {
    calendarDays.push(i)
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return `${year}.${month}.${date.getDate()}`
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const dayOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][date.getDay()]
    const period = hours >= 12 ? '오후' : '오전'
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
    return `${dayOfWeek} ${period} ${displayHours}시 ${minutes}분`
  }

  const getDayOfWeek = (day: number) => {
    // 2월 1일이 일요일(0)이므로
    return (day - 1) % 7
  }

  return (
    <Section>
      <Container>
        <Header ref={headerRef}>
          <DateText>{formatDate(weddingDate)}</DateText>
          <TimeText>{formatTime(weddingDate)}</TimeText>
        </Header>

        <Divider />

        <CalendarContainer ref={calendarRef}>
          <WeekDays>
            {weekDays.map((day, index) => (
              <WeekDay key={index} $isSunday={index === 0}>
                {day}
              </WeekDay>
            ))}
          </WeekDays>
          <CalendarGrid>
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} />
              }
              const dayOfWeek = getDayOfWeek(day)
              const isSunday = dayOfWeek === 0
              const isHighlighted = day === 28 // 결혼식 날짜
              
              return (
                <CalendarDay
                  key={day}
                  $isSunday={isSunday}
                  $isHighlighted={isHighlighted}
                >
                  {day}
                </CalendarDay>
              )
            })}
          </CalendarGrid>
        </CalendarContainer>

        <Divider />

        <CountdownContainer ref={countdownRef}>
          <CountdownBox>
            <CountdownNumber>{timeLeft.days}</CountdownNumber>
            <CountdownLabel>DAYS</CountdownLabel>
          </CountdownBox>
          <Colon>:</Colon>
          <CountdownBox>
            <CountdownNumber>{timeLeft.hours}</CountdownNumber>
            <CountdownLabel>HOUR</CountdownLabel>
          </CountdownBox>
          <Colon>:</Colon>
          <CountdownBox>
            <CountdownNumber>{timeLeft.minutes}</CountdownNumber>
            <CountdownLabel>MIN</CountdownLabel>
          </CountdownBox>
          <Colon>:</Colon>
          <CountdownBox>
            <CountdownNumber>{timeLeft.seconds}</CountdownNumber>
            <CountdownLabel>SEC</CountdownLabel>
          </CountdownBox>
        </CountdownContainer>

        <Message ref={messageRef}>
          {groomName} <HighlightedNumber>♥</HighlightedNumber> {brideName}의 결혼식이{' '}
          <HighlightedNumber>{timeLeft.totalDays + 1}</HighlightedNumber>일 남았습니다.
        </Message>
      </Container>
    </Section>
  )
}

