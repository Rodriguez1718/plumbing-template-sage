import { getLocationText } from "@/config/site"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface HeroPageProps {
  badge?: string
  title: string
  description?: string
  image?: string
  imageAlt?: string
  ctaText?: string
  ctaHref?: string
}

export function HeroPage({ badge, title, description, image, imageAlt = "Hero image", ctaText, ctaHref = "/contact" }: HeroPageProps) {
  const processedTitle = getLocationText(title)
  const processedDescription = description ? getLocationText(description) : undefined
  const processedBadge = badge ? getLocationText(badge) : undefined

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="relative min-h-[50vh] md:min-h-[50vh] flex items-center rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
        {image ? (
          <div className="absolute inset-0 z-0">
            <img 
              src={image} 
              alt={imageAlt} 
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-brand-primary" />
        )}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-8 md:py-12">
          <AnimateOnScroll animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              {processedBadge && (
                <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 text-xs md:text-sm font-medium text-white rounded-full bg-white/20">
                  {processedBadge}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6 text-balance">{processedTitle}</h1>
              {processedDescription && (
                <p className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 text-balance">{processedDescription}</p>
              )}
              {ctaText && (
                <Button size="lg" className="bg-brand-primary hover:opacity-90 text-white h-11 md:h-12 px-6 md:px-8 rounded-lg md:rounded-xl" asChild>
                  <a href={ctaHref}>
                    {ctaText}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
