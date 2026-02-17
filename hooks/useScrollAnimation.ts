'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

export function useCountUp(
  end: number,
  duration: number = 2000,
  start: number = 0
) {
  const [count, setCount] = useState(start)
  const [shouldStart, setShouldStart] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldStart(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * (end - start) + start))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [shouldStart, end, start, duration])

  return { count, ref }
}
