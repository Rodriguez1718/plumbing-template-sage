import { getLocationText } from "@/config/site"
import { MapPin, ArrowRight, ExternalLink } from "lucide-react"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"

interface Location {
  name: string
  href: string
  description?: string
}

interface LocationsSectionProps {
  badge?: string
  title: string
  description?: string
  locations?: Location[]
  mapCenter?: { lat: number; lng: number }
  mapUrl?: string
  variant?: "overlay" | "split" | "cards" | "full" | "half"
}

export function LocationsSection({
  badge,
  title,
  description,
  locations = [],
  mapCenter = { lat: 39.7392, lng: -104.9903 }, // Denver default
  mapUrl: customMapUrl,
  variant = "overlay",
}: LocationsSectionProps) {
  const processedTitle = getLocationText(title)
  const processedDescription = description ? getLocationText(description) : undefined
  const processedBadge = badge ? getLocationText(badge) : undefined

  // Use custom mapUrl if provided, otherwise generate from coordinates
  const mapUrl = customMapUrl || `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d196281.12937236!2d${mapCenter.lng}!3d${mapCenter.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus`

  // Full variant - simple centered map with header
  if (variant === "full") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{processedTitle}</h2>
              {processedDescription && (
                <p 
                  className="text-lg text-muted-foreground max-w-3xl mx-auto [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors" 
                  dangerouslySetInnerHTML={{ __html: processedDescription }} 
                />
              )}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={150}>
            <div className="rounded-3xl overflow-hidden h-[500px] shadow-xl">
              <iframe
                src={mapUrl}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    )
  }

  // Half variant - side by side without badge, simpler layout
  if (variant === "half") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <AnimateOnScroll animation="fade-right">
              <div className="bg-brand-primary rounded-3xl p-8 md:p-12 lg:p-14 flex flex-col h-full">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                  {processedTitle}
                </h2>
                {processedDescription && (
                  <p 
                    className="text-lg text-white/80 mb-8 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white [&_a]:transition-colors" 
                    dangerouslySetInnerHTML={{ __html: processedDescription }} 
                  />
                )}
                {locations.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    {locations.map((location, index) => (
                      <a
                        key={index}
                        href={location.href}
                        className="group p-4 rounded-2xl bg-white/10 hover:bg-white/20 md:transition-all md:duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-brand-secondary/50 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-white">{location.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-white/60 md:group-hover:text-white md:transition-colors">
                          View location
                          <ArrowRight className="w-4 h-4 ml-1 md:group-hover:translate-x-1 md:transition-transform" />
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={150}>
              <div className="rounded-3xl overflow-hidden min-h-[400px] lg:min-h-full shadow-2xl h-full">
                <iframe
                  src={mapUrl}
                  className="w-full h-full"
                  style={{ border: 0, minHeight: '100%' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    )
  }

  // Overlay variant - content overlays the map (on desktop) or half layout (on mobile)
  if (variant === "overlay") {
    return (
      <>
        {/* Mobile: Half variant */}
        <section className="py-16 md:hidden">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 items-stretch">
              <AnimateOnScroll animation="fade-up">
                <div className="bg-brand-primary rounded-3xl p-8 flex flex-col h-full">
                  {processedBadge && (
                    <span className="inline-flex items-center gap-2 w-fit px-4 py-1.5 mb-6 text-sm font-medium text-white bg-white/20 rounded-full">
                      <MapPin className="w-4 h-4" />
                      {processedBadge}
                    </span>
                  )}
                  <h2 className="text-3xl font-bold text-white mb-4 text-balance">
                    {processedTitle}
                  </h2>
                  {processedDescription && (
                    <p className="text-lg text-white/80 mb-8">
                      {processedDescription}
                    </p>
                  )}
                  {locations.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-auto">
                      {locations.map((location, index) => (
                        <a
                          key={index}
                          href={location.href}
                          className="group p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-brand-secondary/50 flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-white text-sm">{location.name}</span>
                          </div>
                          <div className="flex items-center text-sm text-white/60 group-hover:text-white transition-colors">
                            View location
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={150}>
                <div className="rounded-3xl overflow-hidden min-h-[400px] shadow-2xl h-full">
                  <iframe
                    src={mapUrl}
                    className="w-full h-full"
                    style={{ border: 0, minHeight: '100%' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Desktop: Overlay variant */}
        <section className="hidden md:block py-16 md:py-24">
          <div className="container mx-auto px-4">
            <AnimateOnScroll animation="fade-up">
              <div className="relative rounded-3xl overflow-hidden min-h-[700px]">
                {/* Map Background */}
                <div className="absolute inset-0">
                  <iframe
                    src={mapUrl}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Service Area Map"
                  />
                </div>

                {/* Content - positioned to not block map */}
                <div className="absolute inset-0 p-6 md:p-10 lg:p-12 flex items-center pointer-events-none">
                  <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 max-w-md pointer-events-auto shadow-2xl">
                    {processedBadge && (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-white bg-white/20 rounded-full">
                        <MapPin className="w-4 h-4" />
                        {processedBadge}
                      </span>
                    )}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                      {processedTitle}
                    </h2>
                    {processedDescription && (
                      <p className="text-white/80 mb-6 text-balance">
                        {processedDescription}
                      </p>
                    )}

                    {/* Location Links */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Featured Locations</p>
                      {locations.map((location, index) => (
                        <a
                          key={index}
                          href={location.href}
                          className="group flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 md:transition-all md:duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-brand-secondary flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <span className="font-semibold text-white text-sm">{location.name}</span>
                              {location.description && (
                                <p className="text-xs text-white/60">{location.description}</p>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/60 md:group-hover:text-white md:group-hover:translate-x-1 md:transition-all" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </>
    )
  }

  // Split variant - side by side layout
  if (variant === "split") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Content Side */}
            <AnimateOnScroll animation="fade-right">
              <div className="bg-brand-primary rounded-3xl p-8 md:p-12 lg:p-14 flex flex-col h-full">
                {processedBadge && (
                  <span className="inline-flex items-center gap-2 w-fit px-4 py-1.5 mb-6 text-sm font-medium text-brand-primary bg-white rounded-full">
                    <MapPin className="w-4 h-4" />
                    {processedBadge}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                  {processedTitle}
                </h2>
                {processedDescription && (
                  <p className="text-lg text-white/80 mb-8 text-balance">
                    {processedDescription}
                  </p>
                )}

                {/* Location Grid */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  {locations.map((location, index) => (
                    <a
                      key={index}
                      href={location.href}
                      className="group p-4 rounded-2xl bg-white/10 hover:bg-white/20 md:transition-all md:duration-300"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-brand-secondary/50 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-white">{location.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-white/60 md:group-hover:text-white md:transition-colors">
                        View location
                        <ArrowRight className="w-4 h-4 ml-1 md:group-hover:translate-x-1 md:transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Map Side */}
            <AnimateOnScroll animation="fade-left" delay={150}>
              <div className="rounded-3xl overflow-hidden min-h-[400px] lg:min-h-full shadow-2xl h-full">
                <iframe
                  src={mapUrl}
                  className="w-full h-full"
                  style={{ border: 0, minHeight: '100%' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Service Area Map"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    )
  }

  // Cards variant - map with floating location cards
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-12">
            {processedBadge && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
                <MapPin className="w-4 h-4" />
                {processedBadge}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              {processedTitle}
            </h2>
            {processedDescription && (
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                {processedDescription}
              </p>
            )}
          </div>
        </AnimateOnScroll>

        {/* Map with Cards */}
        <AnimateOnScroll animation="fade-up" delay={150}>
          <div className="relative">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden h-[500px] shadow-xl">
              <iframe
                src={mapUrl}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Service Area Map"
              />
            </div>

            {/* Floating Cards - pointer-events-none so map is interactive */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide justify-center">
                {locations.map((location, index) => (
                  <a
                    key={index}
                    href={location.href}
                    className="group pointer-events-auto flex-shrink-0 snap-start bg-white rounded-2xl p-5 shadow-xl md:hover:shadow-2xl md:transition-all md:duration-300 min-w-[200px] border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center md:group-hover:bg-brand-primary md:group-hover:scale-110 md:transition-all">
                        <MapPin className="w-5 h-5 text-brand-primary md:group-hover:text-white md:transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{location.name}</h3>
                        {location.description && (
                          <p className="text-xs text-muted-foreground">{location.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-brand-primary font-medium">
                      Explore area
                      <ExternalLink className="w-4 h-4 ml-2 md:group-hover:translate-x-1 md:transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
