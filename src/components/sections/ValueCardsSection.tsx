import { getLocationText } from "@/config/site"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { 
  MapPin, Users, DollarSign, Sparkles, Award, Target, 
  Zap, Globe, TrendingUp, Heart, Shield, Clock,
  MessageSquare, Palette, Rocket, Settings, Wrench,
  type LucideIcon
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  mappin: MapPin, pin: MapPin,
  users: Users, people: Users,
  dollar: DollarSign, money: DollarSign,
  sparkles: Sparkles, sparkle: Sparkles,
  award: Award, badge: Award,
  target: Target, zap: Zap, globe: Globe,
  trending: TrendingUp, heart: Heart, shield: Shield, clock: Clock,
  message: MessageSquare, chat: MessageSquare,
  palette: Palette, design: Palette,
  rocket: Rocket, launch: Rocket,
  settings: Settings, tools: Wrench, wrench: Wrench,
}

const brandColors = ["bg-brand-primary", "bg-brand-secondary", "bg-brand-tertiary", "bg-brand-quaternary"]

interface ValueCard {
  icon?: string
  title: string
  description: string
  image?: string
}

interface ValueCardsSectionProps {
  badge?: string
  title?: string
  description?: string
  cards: ValueCard[]
  variant?: "cards" | "minimal" | "overlay" | "marquee"
}

export function ValueCardsSection({ badge, title, description, cards, variant = "cards" }: ValueCardsSectionProps) {
  const processedTitle = title ? getLocationText(title) : undefined
  const processedDescription = description ? getLocationText(description) : undefined
  const processedBadge = badge ? getLocationText(badge) : undefined
  const count = cards.length

  const getIcon = (iconName?: string) => iconMap[iconName?.toLowerCase() || ""] || Award

  const getGridCols = () => {
    if (count <= 2) return count === 1 ? "md:grid-cols-1 max-w-2xl mx-auto" : "md:grid-cols-2 max-w-4xl mx-auto"
    if (count <= 4) return count === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"
    if (count <= 6) return "md:grid-cols-2 lg:grid-cols-3"
    return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  }

  const Header = () => {
    if (!processedTitle && !processedBadge) return null
    return (
      <AnimateOnScroll animation="fade-up">
        <div className="text-center mb-12">
          {processedBadge && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
              {processedBadge}
            </span>
          )}
          {processedTitle && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{processedTitle}</h2>
          )}
          {processedDescription && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">{processedDescription}</p>
          )}
        </div>
      </AnimateOnScroll>
    )
  }

  // CARDS VARIANT
  if (variant === "cards") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Header />
          <div className={`grid gap-6 ${getGridCols()}`}>
            {cards.map((card, i) => {
              const Icon = getIcon(card.icon)
              return (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className="group h-full bg-white rounded-2xl overflow-hidden shadow-lg md:hover:shadow-xl md:transition-shadow md:duration-300 border border-gray-100">
                    {card.image && (
                      <div className="h-48 overflow-hidden">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover md:group-hover:scale-105 md:transition-transform md:duration-500" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 md:group-hover:bg-brand-primary md:group-hover:scale-110 md:transition-all md:duration-300">
                        <Icon className="w-6 h-6 text-brand-primary md:group-hover:text-white md:transition-colors md:duration-300" />
                      </div>
                      <h3 className="text-lg font-bold mb-3 md:group-hover:text-brand-primary md:transition-colors md:duration-300">
                        {getLocationText(card.title)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors" dangerouslySetInnerHTML={{ __html: getLocationText(card.description) }} />
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

  // MINIMAL VARIANT
  if (variant === "minimal") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Header />
          <div className={`grid gap-8 ${getGridCols()}`}>
            {cards.map((card, i) => {
              const Icon = getIcon(card.icon)
              return (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className="group text-center">
                    <div className={`w-16 h-16 rounded-2xl ${brandColors[i % 4]} flex items-center justify-center mx-auto mb-5 md:group-hover:scale-110 md:group-hover:rotate-3 md:transition-all md:duration-500 md:ease-out shadow-lg md:group-hover:shadow-xl`}>
                      <Icon className="w-8 h-8 text-white md:group-hover:scale-110 md:transition-transform md:duration-500 md:ease-out" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{getLocationText(card.title)}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors" dangerouslySetInnerHTML={{ __html: getLocationText(card.description) }} />
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // OVERLAY VARIANT
  if (variant === "overlay") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Header />
          <div className={`grid gap-6 ${getGridCols()}`}>
            {cards.map((card, i) => {
              const Icon = getIcon(card.icon)
              return (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                    {card.image ? (
                      <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-110 md:transition-transform md:duration-700 md:ease-out" />
                    ) : (
                      <div className="absolute inset-0 bg-brand-primary" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 md:group-hover:from-brand-primary/90 md:group-hover:via-brand-primary/60 md:transition-all md:duration-500 md:ease-out" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 md:group-hover:bg-brand-primary md:group-hover:scale-110 md:transition-all md:duration-500 md:ease-out">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{getLocationText(card.title)}</h3>
                      <div className="overflow-hidden max-h-[4.5rem] md:group-hover:max-h-80 md:transition-[max-height] md:duration-700 md:ease-in-out">
                        <p className="text-white/80 text-sm leading-relaxed [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white [&_a]:transition-colors" dangerouslySetInnerHTML={{ __html: getLocationText(card.description) }} />
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

  // MARQUEE VARIANT
  const MarqueeCard = ({ card }: { card: ValueCard }) => {
    const Icon = getIcon(card.icon)
    return (
      <div className="marquee-card flex-shrink-0 w-80 mx-3 py-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 md:hover:shadow-2xl md:hover:-translate-y-3 md:transition-all md:duration-300">
          {card.image && (
            <div className="h-44 overflow-hidden relative">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover md:hover:scale-105 md:transition-transform md:duration-500" />
              <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Icon className="w-5 h-5 text-brand-primary" />
              </div>
            </div>
          )}
          <div className="p-5">
            {!card.image && (
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-brand-primary" />
              </div>
            )}
            <h3 className="text-lg font-bold mb-2 md:hover:text-brand-primary md:transition-colors md:duration-300">{getLocationText(card.title)}</h3>
            <div className="desc-container overflow-hidden md:transition-[max-height] md:duration-500 md:ease-in-out">
              <p className="text-muted-foreground text-sm leading-relaxed [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors" dangerouslySetInnerHTML={{ __html: getLocationText(card.description) }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4"><Header /></div>
      <AnimateOnScroll animation="fade-up">
        <div className="relative marquee-container">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex marquee-track">
            {[...cards, ...cards, ...cards, ...cards].map((card, i) => <MarqueeCard key={i} card={card} />)}
          </div>
        </div>
      </AnimateOnScroll>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee ${count * 8}s linear infinite; width: fit-content; }
        .marquee-container:hover .marquee-track { animation-play-state: paused; }
        .desc-container { max-height: 4.5rem; }
        .marquee-card:hover .desc-container { max-height: 20rem; }
      `}</style>
    </section>
  )
}
