import * as React from "react"
import { getLocationText } from "@/config/site"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { ChevronDown, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  badge?: string
  title?: string
  description?: string
  faqs: FAQ[]
  variant?: "accordion" | "cards" | "minimal"
}

export function FAQSection({
  badge,
  title = "Frequently Asked Questions",
  description,
  faqs,
  variant = "accordion",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)
  const processedTitle = getLocationText(title)
  const processedDescription = description ? getLocationText(description) : undefined
  const processedBadge = badge ? getLocationText(badge) : undefined

  // Accordion variant - classic expandable with smooth animations
  if (variant === "accordion") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <AnimateOnScroll animation="fade-up">
              <div className="text-center mb-12">
                {processedBadge && (
                  <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
                    {processedBadge}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                  {processedTitle}
                </h2>
                {processedDescription && (
                  <p className="text-lg text-muted-foreground text-balance">
                    {processedDescription}
                  </p>
                )}
              </div>
            </AnimateOnScroll>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <AnimateOnScroll key={index} animation="fade-up" delay={index * 100}>
                    <div
                      className={cn(
                        "rounded-2xl border-2 md:transition-all md:duration-300",
                        isOpen ? "border-brand-primary bg-brand-primary/5" : "border-gray-100 bg-white hover:border-gray-200"
                      )}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? 'Collapse' : 'Expand'} answer to: ${getLocationText(faq.question)}`}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="font-semibold text-lg pr-4">{getLocationText(faq.question)}</span>
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 md:transition-all md:duration-300",
                          isOpen ? "bg-brand-primary text-white rotate-180" : "bg-gray-100 text-gray-600"
                        )}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>
                      <div className={cn(
                        "overflow-hidden md:transition-all md:duration-300",
                        isOpen ? "max-h-96" : "max-h-0"
                      )}>
                        <p 
                          className="px-6 pb-6 text-base text-muted-foreground leading-relaxed [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary [&_a]:transition-colors"
                          dangerouslySetInnerHTML={{ __html: getLocationText(faq.answer) }}
                        />
                      </div>
                    </div>
                  </AnimateOnScroll>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Cards variant - grid of expandable cards
  if (variant === "cards") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-12">
              {processedBadge && (
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
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

          {/* FAQ Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <AnimateOnScroll key={index} animation="fade-up" delay={index * 100}>
                  <div
                    className={cn(
                      "group rounded-2xl p-6 md:transition-all md:duration-300 cursor-pointer h-full",
                      isOpen 
                        ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20" 
                        : "bg-gray-50 hover:bg-gray-100"
                    )}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className={cn(
                        "font-semibold text-lg",
                        isOpen ? "text-white" : "text-gray-900"
                      )}>
                        {getLocationText(faq.question)}
                      </h3>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 md:transition-all",
                        isOpen ? "bg-white/20" : "bg-white"
                      )}>
                        {isOpen ? (
                          <Minus className={cn("w-4 h-4", isOpen ? "text-white" : "text-brand-primary")} />
                        ) : (
                          <Plus className="w-4 h-4 text-brand-primary" />
                        )}
                      </div>
                    </div>
                    <div className={cn(
                      "overflow-hidden md:transition-all md:duration-300",
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <p 
                        className={cn(
                          "text-base leading-relaxed",
                          isOpen ? "text-white/85" : "text-muted-foreground"
                        )}
                        dangerouslySetInnerHTML={{ __html: getLocationText(faq.answer) }}
                      />
                    </div>
                    {!isOpen && (
                      <p 
                        className="text-base text-muted-foreground mt-2 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: getLocationText(faq.answer) }}
                      />
                    )}
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Minimal variant - clean two-column layout
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - Header (sticky) */}
          <AnimateOnScroll animation="fade-right" className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            {processedBadge && (
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full">
                {processedBadge}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              {processedTitle}
            </h2>
            {processedDescription && (
              <p className="text-lg text-muted-foreground text-balance">
                {processedDescription}
              </p>
            )}
            <div className="hidden lg:block mt-8 pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-2">Still have questions?</p>
              <a href="/contact" className="inline-flex items-center text-brand-primary font-medium hover:underline">
                Contact our team
                <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
              </a>
            </div>
          </AnimateOnScroll>

          {/* Right - FAQ Items */}
          <div className="lg:col-span-3 space-y-0 divide-y divide-gray-100">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <AnimateOnScroll key={index} animation="fade-left" delay={index * 100}>
                  <div className="py-6 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? 'Collapse' : 'Expand'} answer to: ${getLocationText(faq.question)}`}
                      className="w-full flex items-start justify-between text-left group"
                    >
                      <span className={cn(
                        "font-semibold text-lg pr-8 md:transition-colors",
                        isOpen ? "text-brand-primary" : "text-gray-900 group-hover:text-brand-primary"
                      )}>
                        {getLocationText(faq.question)}
                      </span>
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 md:transition-all",
                        isOpen ? "border-brand-primary bg-brand-primary" : "border-gray-300 group-hover:border-brand-primary"
                      )}>
                        {isOpen ? (
                          <Minus className="w-3 h-3 text-white" />
                        ) : (
                          <Plus className={cn("w-3 h-3 md:transition-colors", "text-gray-400 group-hover:text-brand-primary")} />
                        )}
                      </div>
                    </button>
                    <div className={cn(
                      "overflow-hidden md:transition-all md:duration-300",
                      isOpen ? "max-h-96 mt-4" : "max-h-0"
                    )}>
                      <p 
                        className="text-base text-muted-foreground leading-relaxed pr-14"
                        dangerouslySetInnerHTML={{ __html: getLocationText(faq.answer) }}
                      />
                    </div>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
