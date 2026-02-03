import * as React from "react"
import { cn } from "@/lib/utils"

type Animation = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade" | "zoom"

interface AnimateOnScrollProps {
  children: React.ReactNode
  animation?: Animation
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function AnimateOnScroll({ children, animation = "fade-up", delay = 0, duration = 600, className, once = true }: AnimateOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // On mobile, set visible immediately
      if (mobile) setIsVisible(true)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  React.useEffect(() => {
    // Skip observer on mobile
    if (isMobile) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) observer.unobserve(ref.current)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [once, isMobile])

  const transforms: Record<Animation, string> = {
    "fade-up": "translateY(30px)",
    "fade-down": "translateY(-30px)",
    "fade-left": "translateX(30px)",
    "fade-right": "translateX(-30px)",
    "zoom": "scale(0.95)",
    "fade": "none",
  }

  // On mobile, no animation - just show content immediately
  const style: React.CSSProperties = isMobile ? {} : {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : transforms[animation],
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  }

  return <div ref={ref} className={cn(className)} style={style}>{children}</div>
}
