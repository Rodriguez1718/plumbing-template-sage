import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getLocationText } from "@/config/site"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { Monitor, Share2, Globe, Target, Tv, Megaphone, DollarSign, Palette, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  monitor: Monitor, share: Share2, globe: Globe, target: Target,
  tv: Tv, megaphone: Megaphone, dollar: DollarSign, palette: Palette,
}

interface Feature { icon?: string; title: string; description: string }

interface FeaturesSectionProps {
  badge?: string
  title: string
  description?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  variant?: "default" | "numbered"
}

export function FeaturesSection({ badge, title, description, features, columns = 4, variant = "default" }: FeaturesSectionProps) {
  const processedTitle = getLocationText(title)
  const processedDescription = description ? getLocationText(description) : undefined
  const processedBadge = badge ? getLocationText(badge) : undefined

  const gridCols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }

  // NUMBERED VARIANT - timeline-style with step numbers
  if (variant === "numbered") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center max-w-4xl mx-auto mb-16">
              {processedBadge && (
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
                  {processedBadge}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{processedTitle}</h2>
              {processedDescription && <p className="text-lg text-muted-foreground [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors" dangerouslySetInnerHTML={{ __html: processedDescription }} />}
            </div>
          </AnimateOnScroll>
          <div className={`grid gap-8 ${gridCols[columns]}`}>
            {features.map((feature, i) => {
              const Icon = feature.icon ? iconMap[feature.icon] : null
              return (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className="group relative">
                    <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 md:hover:shadow-xl md:hover:-translate-y-1 md:transition-all md:duration-300">
                      {/* Step number badge */}
                      <div className="absolute -top-4 -left-2 w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg md:group-hover:scale-110 md:transition-transform md:duration-300">
                        <span className="text-white font-bold text-lg">{i + 1}</span>
                      </div>
                      <div className="pt-4">
                        {Icon && (
                          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 md:group-hover:bg-brand-primary/10 md:transition-colors md:duration-300">
                            <Icon className="w-6 h-6 text-brand-primary" />
                          </div>
                        )}
                        <h3 className="text-lg font-bold mb-2 md:group-hover:text-brand-primary md:transition-colors md:duration-300">
                          {getLocationText(feature.title)}
                        </h3>
                        <p 
                          className="text-sm text-muted-foreground leading-relaxed [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors"
                          dangerouslySetInnerHTML={{ __html: getLocationText(feature.description) }}
                        />
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // DEFAULT VARIANT
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-3xl mb-12">
            {processedBadge && (
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
                {processedBadge}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{processedTitle}</h2>
            {processedDescription && <p className="text-lg text-muted-foreground [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors" dangerouslySetInnerHTML={{ __html: processedDescription }} />}
          </div>
        </AnimateOnScroll>
        <div className={`grid gap-6 ${gridCols[columns]}`}>
          {features.map((feature, i) => {
            const Icon = feature.icon ? iconMap[feature.icon] : null
            return (
              <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                <Card className="border-0 shadow-none bg-brand-secondary/10 h-full">
                  <CardHeader>
                    {Icon && (
                      <div className="w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>
                    )}
                    <CardTitle className="text-lg">{getLocationText(feature.title)}</CardTitle>
                    <CardDescription className="text-sm [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors" dangerouslySetInnerHTML={{ __html: getLocationText(feature.description) }} />
                  </CardHeader>
                </Card>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
