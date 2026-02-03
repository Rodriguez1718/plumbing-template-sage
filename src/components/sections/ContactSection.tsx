import * as React from "react"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Send, Sparkles } from "lucide-react"

interface ContactInfo {
  phone?: string
  phoneFormatted?: string
  email?: string
  location?: string
}

interface ContactSectionProps {
  title?: string
  description?: string
  secondaryDescription?: string
  contactInfo?: ContactInfo
  submitText?: string
  variant?: "default" | "split" | "card"
}

export function ContactSection({
  title = "Contact Us",
  description = "Ready to take your marketing to the next level? We'd love to hear from you.",
  secondaryDescription = "Fill out the form and we'll get back to you within 24 hours.",
  contactInfo = {
    phone: "+17206056959",
    phoneFormatted: "(720) 605-6959",
    email: "info@Denvermarketing.com",
    location: "Denver, Colorado"
  },
  submitText = "SUBMIT FORM",
  variant = "default"
}: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    // Handle actual form submission here
  }

  if (variant === "split") {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Left side - Info */}
            <div className="bg-brand-primary p-10 md:p-14 lg:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <AnimateOnScroll animation="fade-right">
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/10 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    Let's Connect
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                  <p className="text-white/80 mb-4">{description}</p>
                  <p className="text-white/60 mb-10">{secondaryDescription}</p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <div className="space-y-6">
                    {contactInfo.phoneFormatted && (
                      <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center md:group-hover:bg-white/20 md:transition-colors">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Phone</p>
                          <p className="text-base font-semibold">{contactInfo.phoneFormatted}</p>
                        </div>
                      </a>
                    )}
                    
                    {contactInfo.email && (
                      <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center md:group-hover:bg-white/20 md:transition-colors">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Email</p>
                          <p className="text-base font-semibold">{contactInfo.email}</p>
                        </div>
                      </a>
                    )}
                    
                    {contactInfo.location && (
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Location</p>
                          <p className="text-base font-semibold">{contactInfo.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </AnimateOnScroll>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="bg-white p-10 md:p-14 lg:p-16">
              <AnimateOnScroll animation="fade-left">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all bg-gray-50/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all bg-gray-50/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="(555) 555-5555"
                      required
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all bg-gray-50/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={4}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all bg-gray-50/50 resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-primary hover:opacity-90 text-white font-semibold"
                  >
                    {isSubmitting ? "Sending..." : submitText}
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === "card") {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>
          </AnimateOnScroll>

          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {contactInfo.phoneFormatted && (
                    <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 p-4 rounded-2xl bg-brand-primary/5 hover:bg-brand-primary/10 md:transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="font-semibold group-hover:text-brand-primary md:transition-colors">{contactInfo.phoneFormatted}</p>
                      </div>
                    </a>
                  )}
                  
                  {contactInfo.email && (
                    <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-brand-primary/5 hover:bg-brand-primary/10 md:transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-semibold text-sm group-hover:text-brand-primary md:transition-colors">{contactInfo.email}</p>
                      </div>
                    </a>
                  )}
                  
                  {contactInfo.location && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-primary/5">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-semibold">{contactInfo.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="(555) 555-5555"
                      required
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={4}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-brand-primary hover:opacity-90 text-white font-semibold"
                  >
                    {isSubmitting ? "Sending..." : submitText}
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Info */}
          <AnimateOnScroll animation="fade-right">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
              <p className="text-lg text-muted-foreground mb-4">{description}</p>
              <p className="text-muted-foreground mb-10">{secondaryDescription}</p>
              
              <div className="space-y-5">
                {contactInfo.phoneFormatted && (
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center md:group-hover:bg-brand-primary md:group-hover:scale-105 md:transition-all">
                      <Phone className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-base font-semibold md:group-hover:text-brand-primary md:transition-colors">{contactInfo.phoneFormatted}</p>
                    </div>
                  </a>
                )}
                
                {contactInfo.email && (
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center md:group-hover:bg-brand-primary md:group-hover:scale-105 md:transition-all">
                      <Mail className="w-6 h-6 text-brand-primary md:group-hover:text-white md:transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-base font-semibold md:group-hover:text-brand-primary md:transition-colors">{contactInfo.email}</p>
                    </div>
                  </a>
                )}
                
                {contactInfo.location && (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-base font-semibold">{contactInfo.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right - Form */}
          <AnimateOnScroll animation="fade-left">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="### ### ####"
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-primary focus:ring-0 outline-none transition-all resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary hover:opacity-90 text-white font-semibold shadow-lg shadow-brand-primary/25"
                >
                  {isSubmitting ? "Sending..." : submitText}
                </Button>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
