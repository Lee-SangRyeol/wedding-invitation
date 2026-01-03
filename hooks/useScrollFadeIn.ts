import { useEffect, useRef } from 'react'

/**
 * 가벼운 페이드인 훅
 * - CSS 클래스를 자동으로 추가하여 리렌더링 최소화
 * - GPU 가속 속성(transform, opacity)만 사용
 */
export function useScrollFadeIn(options: { threshold?: number; rootMargin?: string; delay?: number } = {}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // 초기 클래스 추가
    element.classList.add('fade-in-element')

    // delay가 있으면 transition-delay 적용
    if (options.delay) {
      element.style.transitionDelay = `${options.delay}ms`
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('fade-in-visible')
          // 한 번만 트리거하도록 unobserve
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options.threshold, options.rootMargin, options.delay])

  return elementRef
}

