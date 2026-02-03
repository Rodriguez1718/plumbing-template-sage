import * as React from "react"
import { Button } from "@/components/ui/button"
import { getLocationText } from "@/config/site"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { 
  Check,
  MapPin,
  Clock,
  Target,
  Zap,
  Globe,
  Palette,
  TrendingUp,
  Megaphone,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  type LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  check: Check,
  mappin: MapPin,
  clock: Clock,
  target: Target,
  zap: Zap,
  globe: Globe,
  palette: Palette,
  trending: TrendingUp,
  megaphone: Megaphone,
  google: Search,
}

interface Feature {
  text: string
  icon?: string
}

interface Slide {
  title: string
  description: string
}

interface ContentSectionProps {
  badge?: string
  title?: string
  description?: string
  secondaryDescription?: string
  slides?: Slide[]
  features?: (string | Feature)[]
  buttonText?: string
  buttonHref?: string
  image: string
  imageAlt?: string
  imagePosition?: "left" | "right"
  variant?: "simple" | "card" | "dark" | "gradient" | "minimal"
}

export function ContentSection({
  badge,
  title = "",
  description = "",
  secondaryDescription,
  slides,
  features,
  buttonText,
  buttonHref,
  image,
  imageAlt = "Marketing services illustration",
  imagePosition = "right",
  variant = "simple",
}: ContentSectionProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  
  const processedTitle = getLocationText(title)
  const processedDescription = getLocationText(description)
  const processedSecondaryDescription = secondaryDescription ? getLocationText(secondaryDescription) : undefined
  const processedBadge = badge ? getLocationText(badge) : undefined
  
  const hasSlides = slides && slides.length > 0
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % (slides?.length || 1))
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + (slides?.length || 1)) % (slides?.length || 1))

  const renderFeatures = (isDark = false) => {
    if (!features || features.length === 0) return null
    const colors = ["bg-brand-secondary", "bg-brand-tertiary", "bg-brand-quaternary", "bg-brand-primary"]
    
    return (
      <div className="grid grid-cols-2 gap-3 mb-6">
        {features.map((feature, index) => {
          const isObject = typeof feature === 'object'
          const featureText = isObject ? feature.text : feature
          const iconName = isObject && feature.icon ? feature.icon : 'check'
          const Icon = iconMap[iconName] || Check
          
          return (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full ${isDark ? 'bg-white/20' : colors[index % colors.length]} flex items-center justify-center shrink-0`}>
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <span 
                className={cn("text-sm font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors", isDark ? "text-white/90" : "text-gray-700")}
                dangerouslySetInnerHTML={{ __html: getLocationText(featureText) }}
              />
            </div>
          )
        })}
      </div>
    )
  }

  const renderSliderNav = (isDark = false) => {
    if (!hasSlides) return null
    return (
      <div className="flex items-center gap-4 mt-8">
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center md:transition-all md:duration-300 md:hover:scale-105",
              isDark 
                ? "bg-white/10 hover:bg-white/20 text-white" 
                : "bg-gray-100 hover:bg-brand-primary hover:text-white text-gray-600"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center md:transition-all md:duration-300 md:hover:scale-105",
              isDark 
                ? "bg-white/10 hover:bg-white/20 text-white" 
                : "bg-gray-100 hover:bg-brand-primary hover:text-white text-gray-600"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2">
          {slides?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-2 rounded-full md:transition-all md:duration-300",
                index === currentSlide 
                  ? isDark ? "bg-white w-8" : "bg-brand-primary w-8"
                  : isDark ? "bg-white/30 w-2 hover:bg-white/50" : "bg-gray-300 w-2 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    )
  }

  // MINIMAL VARIANT - Clean, modern, lots of whitespace
  if (variant === "minimal") {
    return (
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className={cn(
            "grid md:grid-cols-2 gap-16 lg:gap-24 items-center",
            imagePosition === "left" && "md:[&>*:first-child]:order-2"
          )}>
            <AnimateOnScroll animation={imagePosition === "left" ? "fade-left" : "fade-right"}>
              <div className="space-y-8">
                {processedBadge && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-primary bg-brand-primary/5 rounded-full border border-brand-primary/10">
                    <Sparkles className="w-4 h-4" />
                    {processedBadge}
                  </span>
                )}
                
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-balance">{processedTitle}</h2>
                
                <p 
                  className="text-lg text-muted-foreground leading-relaxed [&_a]:font-semibold [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-primary/80 [&_a]:transition-colors" 
                  dangerouslySetInnerHTML={{ __html: processedDescription }} 
                />
                
                {processedSecondaryDescription && (
                  <p className="text-muted-foreground">{processedSecondaryDescription}</p>
                )}
                
                {renderFeatures()}
                
                {buttonText && buttonHref && (
                  <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white group" asChild>
                    <a href={buttonHref}>
                      {buttonText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                )}
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation={imagePosition === "left" ? "fade-right" : "fade-left"}>
              <div className="relative hidden md:block">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 via-brand-secondary/10 to-transparent rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img src={image} alt={imageAlt} className="w-full aspect-[4/3] object-cover" width={665} height={499} loading="lazy" decoding="async" sizes="50vw" />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    )
  }

  // GRADIENT VARIANT - Modern gradient background
  if (variant === "gradient") {
    return (
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-brand-primary/5" />
        <div className="container mx-auto px-4 relative">
          <div className={cn(
            "grid md:grid-cols-2 gap-12 lg:gap-20 items-center",
            imagePosition === "left" && "md:[&>*:first-child]:order-2"
          )}>
            <AnimateOnScroll animation="fade-up">
              <div>
                {processedBadge && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full shadow-lg shadow-brand-primary/25">
                    {processedBadge}
                  </div>
                )}
                
                {hasSlides ? (
                  <>
                    <div className="relative min-h-[220px]">
                      {slides?.map((slide, index) => (
                        <div
                          key={index}
                          className={cn(
                            "md:transition-all md:duration-500",
                            index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                          )}
                        >
                          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            {getLocationText(slide.title)}
                          </h2>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {getLocationText(slide.description)}
                          </p>
                        </div>
                      ))}
                    </div>
                    {renderSliderNav()}
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {processedTitle}
                    </h2>
                    <p 
                      className="text-lg text-muted-foreground leading-relaxed mb-6 [&_a]:font-semibold [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-4" 
                      dangerouslySetInnerHTML={{ __html: processedDescription }} 
                    />
                    {processedSecondaryDescription && (
                      <p className="text-muted-foreground mb-8">{processedSecondaryDescription}</p>
                    )}
                    {renderFeatures()}
                  </>
                )}
                
                {buttonText && buttonHref && (
                  <Button size="lg" className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white shadow-lg shadow-brand-primary/25 group" asChild>
                    <a href={buttonHref}>
                      {buttonText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                )}
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="relative hidden md:block">
                <div className="absolute -inset-6 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 rounded-[2rem] blur-3xl opacity-50" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/50">
                  <img src={image} alt={imageAlt} className="w-full aspect-[4/3] object-cover" width={665} height={499} loading="lazy" decoding="async" sizes="50vw" />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    )
  }

  // SIMPLE VARIANT - Clean two-column
  if (variant === "simple") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className={cn(
            "grid md:grid-cols-2 gap-12 lg:gap-20 items-center",
            imagePosition === "left" && "md:[&>*:first-child]:order-2"
          )}>
            <AnimateOnScroll animation={imagePosition === "left" ? "fade-left" : "fade-right"} delay={150}>
              <div>
                {processedBadge && (
                  <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
                    {processedBadge}
                  </span>
                )}
                
                {hasSlides ? (
                  <>
                    <div className="relative min-h-[200px]">
                      {slides?.map((slide, index) => (
                        <div
                          key={index}
                          className={cn(
                            "md:transition-all md:duration-500",
                            index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                          )}
                        >
                          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                            {getLocationText(slide.title)}
                          </h2>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {getLocationText(slide.description)}
                          </p>
                        </div>
                      ))}
                    </div>
                    {renderSliderNav()}
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{processedTitle}</h2>
                    <p 
                      className="text-lg text-muted-foreground leading-relaxed mb-6 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-primary [&_a]:transition-colors" 
                      dangerouslySetInnerHTML={{ __html: processedDescription }} 
                    />
                    {processedSecondaryDescription && (
                      <p className="text-muted-foreground mb-8">{processedSecondaryDescription}</p>
                    )}
                  </>
                )}
                
                {renderFeatures()}
                
                {buttonText && buttonHref && (
                  <Button size="lg" className="bg-brand-primary hover:opacity-90 text-white group" asChild>
                    <a href={buttonHref}>
                      {buttonText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                )}
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation={imagePosition === "left" ? "fade-right" : "fade-left"}>
              <div className="relative group hidden md:block">
                <div className="absolute -inset-4 bg-brand-primary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                  <img src={image} alt={imageAlt} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" width={665} height={499} loading="lazy" decoding="async" sizes="50vw" />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    )
  }

  // CARD VARIANT - Overlapping card design
  if (variant === "card") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-up">
            <div className="relative">
              <div className={cn("hidden md:block md:w-3/5", imagePosition === "right" ? "md:ml-auto" : "")}>
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <img src={image} alt={imageAlt} className="w-full aspect-[16/10] object-cover" width={665} height={416} loading="lazy" decoding="async" sizes="60vw" />
                </div>
              </div>
              
              <div className={cn(
                "md:absolute md:top-1/2 md:-translate-y-1/2 md:w-[55%] mt-6 md:mt-0",
                imagePosition === "right" ? "md:left-0" : "md:right-0"
              )}>
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100/50 backdrop-blur-sm">
                  {processedBadge && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
                      <Sparkles className="w-4 h-4" />
                      {processedBadge}
                    </span>
                  )}
                  
                  {hasSlides ? (
                    <>
                      <div className="relative min-h-[180px]">
                        {slides?.map((slide, index) => (
                          <div
                            key={index}
                            className={cn(
                              "transition-all duration-500",
                              index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                            )}
                          >
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                              {getLocationText(slide.title)}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                              {getLocationText(slide.description)}
                            </p>
                          </div>
                        ))}
                      </div>
                      {renderSliderNav()}
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">{processedTitle}</h2>
                      <p 
                        className="text-muted-foreground leading-relaxed mb-6 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-primary [&_a]:transition-colors" 
                        dangerouslySetInnerHTML={{ __html: processedDescription }} 
                      />
                      {processedSecondaryDescription && (
                        <p className="text-muted-foreground mb-6">{processedSecondaryDescription}</p>
                      )}
                      {renderFeatures()}
                    </>
                  )}
                  
                  {buttonText && buttonHref && (
                    <Button size="lg" className="bg-brand-primary hover:opacity-90 text-white group" asChild>
                      <a href={buttonHref}>
                        {buttonText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    )
  }

  // DARK VARIANT - Full-width dark background
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-up">
          <div className="rounded-[2rem] overflow-hidden bg-brand-primary relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-3xl" />
            
            <div className="grid md:grid-cols-2 relative">
              <div className={cn(
                "p-10 md:p-14 lg:p-20 flex flex-col justify-center relative z-10",
                imagePosition === "left" ? "order-2" : "order-1"
              )}>
                {processedBadge && (
                  <span className="inline-flex items-center gap-2 w-fit px-4 py-2 mb-6 text-sm font-medium text-brand-primary bg-white rounded-full shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    {processedBadge}
                  </span>
                )}
                
                {hasSlides ? (
                  <>
                    <div className="relative min-h-[220px]">
                      {slides?.map((slide, index) => (
                        <div
                          key={index}
                          className={cn(
                            "md:transition-all md:duration-500",
                            index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                          )}
                        >
                          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-balance leading-tight">
                            {getLocationText(slide.title)}
                          </h2>
                          <p className="text-lg text-white/80 leading-relaxed">
                            {getLocationText(slide.description)}
                          </p>
                        </div>
                      ))}
                    </div>
                    {renderSliderNav(true)}
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-balance leading-tight">{processedTitle}</h2>
                    <p 
                      className="text-lg text-white/80 leading-relaxed mb-6 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-white [&_a]:transition-colors" 
                      dangerouslySetInnerHTML={{ __html: processedDescription }} 
                    />
                    {processedSecondaryDescription && (
                      <p className="text-white/60 mb-8">{processedSecondaryDescription}</p>
                    )}
                  </>
                )}
                
                {renderFeatures(true)}
                
                {buttonText && buttonHref && (
                  <Button size="lg" className="w-fit bg-white text-brand-primary hover:bg-white/90 shadow-xl group" asChild>
                    <a href={buttonHref}>
                      {buttonText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                )}
              </div>
              
              <div className={cn(
                "relative hidden md:block md:min-h-[550px]",
                imagePosition === "left" ? "order-1" : "order-2"
              )}>
                <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" width={665} height={550} loading="lazy" decoding="async" sizes="50vw" />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-brand-primary/50 to-transparent",
                  imagePosition === "left" ? "bg-gradient-to-l" : ""
                )} />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
