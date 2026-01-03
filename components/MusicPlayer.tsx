'use client'

import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

const MusicControlButton = styled.button<{ $isPlaying: boolean }>`
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: background-color 0.2s, transform 0.2s;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 768px) {
    top: 1.5rem;
    left: 1.5rem;
    width: 3.5rem;
    height: 3.5rem;
  }
`

const PlayIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: #89757a;
`

const PauseIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: #89757a;
`

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // 배경음악 초기화 및 자동재생
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.5 // 볼륨 50%로 설정
      
      // 자동 재생 시도
      const playAudio = async () => {
        try {
          await audio.play()
          setIsPlaying(true)
        } catch (err) {
          console.log('오디오 자동재생 실패 (사용자 인터랙션 필요):', err)
          // 자동재생이 실패하면 사용자 인터랙션 대기
          const playOnInteraction = () => {
            audio.play().then(() => {
              setIsPlaying(true)
            }).catch(() => {})
          }
          document.addEventListener('click', playOnInteraction, { once: true })
          document.addEventListener('touchstart', playOnInteraction, { once: true })
        }
      }

      // 오디오 재생 상태 추적
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)

      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)

      // 페이지 로드 후 재생 시도
      playAudio()

      return () => {
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
      }
    }
  }, [])

  // 재생/일시정지 토글
  const togglePlayPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (audio.paused) {
        audio.play().catch(err => {
          console.log('오디오 재생 실패:', err)
        })
      } else {
        audio.pause()
      }
    }
  }

  return (
    <>
      <MusicControlButton onClick={togglePlayPause} $isPlaying={isPlaying} aria-label={isPlaying ? '일시정지' : '재생'}>
        {isPlaying ? (
          <PauseIcon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </PauseIcon>
        ) : (
          <PlayIcon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z"/>
          </PlayIcon>
        )}
      </MusicControlButton>
      <audio
        ref={audioRef}
        src="/mp3/mp3.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
    </>
  )
}

