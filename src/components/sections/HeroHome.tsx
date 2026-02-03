import { Button } from "@/components/ui/button"
import { getLocationText } from "@/config/site"

interface HeroHomeProps {
  badge?: string
  title: string
  subtitle: string
  buttonText?: string
  buttonHref?: string
  image: string
}

export function HeroHome({ badge, title, subtitle, buttonText = "Talk to Our Team", buttonHref = "/contact", image }: HeroHomeProps) {
  const processedTitle = getLocationText(title)
  const processedSubtitle = getLocationText(subtitle)
  const processedBadge = badge ? getLocationText(badge) : undefined

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-brand-primary">
        {/* Mobile: gradient background only, Desktop: image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt="Hero background showcasing our services" 
            className="hidden md:block w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
            sizes="90vw"
          />
          {/* Mobile gradient fallback */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-secondary/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 px-6 md:px-12 lg:px-16 py-8 md:py-12">
          <div className="max-w-2xl">
            {processedBadge && (
              <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 text-xs md:text-sm font-medium text-white bg-brand-primary/30 rounded-full">
                {processedBadge}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">{processedTitle}</h1>
            <p className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8">{processedSubtitle}</p>
            <Button size="lg" className="bg-brand-primary hover:opacity-90 text-white h-11 md:h-12 px-6 md:px-8 rounded-lg md:rounded-xl" asChild>
              <a href={buttonHref}>{buttonText}</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
