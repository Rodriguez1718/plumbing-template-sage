import { Button } from "@/components/ui/button"
import { getLocationText, siteConfig } from "@/config/site"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { ArrowRight, Phone, Mail, Sparkles, MessageCircle } from "lucide-react"

interface CTASectionProps {
  badge?: string
  title: string
  description: string
  buttonText?: string
  buttonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  variant?: "bold" | "split" | "card" | "banner"
}

export function CTASection({
  badge,
  title,
  description,
  buttonText = "Get Started",
  buttonHref = "/contact",
  secondaryButtonText,
  secondaryButtonHref,
  variant = "bold",
}: CTASectionProps) {
  const processedTitle = getLocationText(title)
  const processedDescription = getLocationText(description)
  const processedBadge = badge ? getLocationText(badge) : undefined

  // Bold variant - full-width with strong presence
  if (variant === "bold") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-up">
            <div className="relative rounded-3xl bg-brand-primary p-10 md:p-16 lg:p-20 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 text-center">
                {processedBadge && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-white bg-white/10 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    {processedBadge}
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight text-balance">
                  {processedTitle}
                </h2>
                <p className="text-lg text-white/80 mb-10 text-balance">
                  {processedDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-brand-secondary hover:bg-brand-secondary/90 text-white" asChild>
                    <a href={buttonHref}>
                      {buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                  {secondaryButtonText && secondaryButtonHref && (
                    <Button size="lg" variant="outline" className="border-2 border-white/30 !text-white !bg-transparent hover:!bg-white/10" asChild>
                      <a href={secondaryButtonHref}>{secondaryButtonText}</a>
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

  // Split variant - asymmetric modern layout
  if (variant === "split") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Left content - takes 3 cols */}
              <div className="lg:col-span-3 bg-brand-primary p-10 md:p-14 lg:p-16">
                <div className="max-w-xl">
                  {processedBadge && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-wider uppercase text-brand-primary bg-white rounded-full">
                      {processedBadge}
                    </span>
                  )}
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                    {processedTitle}
                  </h2>
                  <p className="text-lg text-white/75 mb-8 text-balance">
                    {processedDescription}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="bg-white text-brand-primary hover:bg-white/90" asChild>
                      <a href={buttonHref}>
                        {buttonText}
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </Button>
                    {secondaryButtonText && secondaryButtonHref && (
                      <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white" asChild>
                        <a href={secondaryButtonHref}>{secondaryButtonText}</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right contact cards - takes 2 cols */}
              <div className="lg:col-span-2 bg-brand-secondary p-10 md:p-14 lg:p-16 flex flex-col justify-center gap-6">
                <p className="text-sm font-semibold tracking-wider uppercase text-white/60 mb-2">Contact Us Directly</p>
                
                <a href={`tel:${siteConfig.contact.phone}`} className="group flex items-center gap-5 p-5 rounded-2xl bg-white/10 hover:bg-white/20 md:transition-all md:duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center md:group-hover:scale-110 md:transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Call Us</p>
                    <p className="text-base font-semibold text-white">{siteConfig.contact.phoneFormatted}</p>
                  </div>
                </a>
                
                <a href={`mailto:${siteConfig.contact.email}`} className="group flex items-center gap-5 p-5 rounded-2xl bg-white/10 hover:bg-white/20 md:transition-all md:duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center md:group-hover:scale-110 md:transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Email Us</p>
                    <p className="text-base font-semibold text-white">{siteConfig.contact.email}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Card variant - elevated floating card with glow
  if (variant === "card") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-brand-primary/20 rounded-[40px] blur-3xl scale-95" />
            
            <div className="relative bg-white rounded-3xl p-10 md:p-14 lg:p-20 shadow-xl border border-gray-100">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-brand-primary/20 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-brand-secondary/20 rounded-br-3xl" />
              
              <div className="relative text-center">
                {processedBadge && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
                    <MessageCircle className="w-4 h-4" />
                    {processedBadge}
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
                  {processedTitle}
                </h2>
                <p 
                  className="text-lg text-muted-foreground mb-10 text-balance [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: processedDescription }}
                />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-brand-primary hover:opacity-90 text-white shadow-lg shadow-brand-primary/25" asChild>
                    <a href={buttonHref}>
                      {buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                  {secondaryButtonText && secondaryButtonHref && (
                    <Button size="lg" variant="outline" className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
                      <a href={secondaryButtonHref}>{secondaryButtonText}</a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Banner variant - sleek horizontal with accent line
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="relative bg-brand-primary rounded-2xl overflow-hidden">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-quaternary" />
          
          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-balance">
                  {processedTitle}
                </h2>
                <p 
                  className="text-lg text-white/75 text-balance"
                  dangerouslySetInnerHTML={{ __html: processedDescription }}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button size="lg" className="bg-white text-brand-primary hover:bg-white/90 shadow-lg" asChild>
                  <a href={buttonHref}>
                    {buttonText}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                {secondaryButtonText && secondaryButtonHref && (
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
                    <a href={secondaryButtonHref}>{secondaryButtonText}</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
