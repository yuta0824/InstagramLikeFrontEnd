import { useEffect, useRef } from 'react'

interface UseIntersectionObserverOptions {
  onIntersect: () => void
  enabled: boolean
}

export const useIntersectionObserver = ({ onIntersect, enabled }: UseIntersectionObserverOptions) => {
  const ref = useRef<HTMLDivElement>(null)
  const onIntersectRef = useRef(onIntersect)

  useEffect(() => {
    onIntersectRef.current = onIntersect
  })

  useEffect(() => {
    if (!enabled || !ref.current) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          onIntersectRef.current()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [enabled])

  return ref
}
