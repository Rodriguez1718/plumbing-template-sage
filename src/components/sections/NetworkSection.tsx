import { getLocationText } from "@/config/site"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { useState } from "react"

interface Brand {
  name: string
  logo: string
}

interface NetworkGroup {
  title: string
  brands: Brand[]
  itemsPerView?: number
}

interface NetworkSectionProps {
  badge?: string
  title?: string
  description?: string
  networks: NetworkGroup[]
}

export function NetworkSection({ badge, title, description, networks }: NetworkSectionProps) {
  const processedTitle = title ? getLocationText(title) : undefined
  const processedDescription = description ? getLocationText(description) : undefined
  const processedBadge = badge ? getLocationText(badge) : undefined

  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
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
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                {processedDescription}
              </p>
            )}
          </div>
        </AnimateOnScroll>

        {/* Tabs */}
        <AnimateOnScroll animation="fade-up" delay={100}>
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {networks.map((network, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? "bg-brand-primary text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {network.title}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Network Grids */}
        {networks.map((network, networkIndex) => (
          <div
            key={networkIndex}
            className={`transition-all duration-500 ${
              activeTab === networkIndex
                ? "opacity-100 max-h-[2000px]"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div
                className={`grid gap-6 ${
                  network.itemsPerView === 3
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {network.brands.map((brand, brandIndex) => (
                  <div
                    key={brandIndex}
                    className="bg-white rounded-xl p-6 flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-video"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        ))}
      </div>
    </section>
  )
}
