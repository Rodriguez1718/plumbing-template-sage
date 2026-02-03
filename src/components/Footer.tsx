import * as React from "react"
import { siteConfig } from "@/config/site"
import { solutionsMenu, indoorBillboardsMenu } from "@/config/navigation"
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FooterProps {
  variant?: "classic" | "centered" | "minimal"
}

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
}

function SolutionsAccordion() {
  const [openSection, setOpenSection] = React.useState<string | null>(null)

  return (
    <div className="space-y-2">
      {solutionsMenu.sections.map((section) => (
        <div key={section.label}>
          <button
            onClick={() => setOpenSection(openSection === section.label ? null : section.label)}
            aria-expanded={openSection === section.label}
            aria-label={`${openSection === section.label ? 'Collapse' : 'Expand'} ${section.label} section`}
            className="flex items-center justify-between w-full py-2 text-sm text-white/70 hover:text-white transition-colors border border-white/20 rounded-lg px-4"
          >
            <span className="uppercase tracking-wider text-xs font-medium">{section.label}</span>
            <ChevronDown className={cn(
              "w-5 h-5 transition-transform duration-200",
              openSection === section.label && "rotate-180"
            )} />
          </button>
          <div className={cn(
            "overflow-hidden transition-all duration-300",
            openSection === section.label ? "max-h-64 mt-2" : "max-h-0"
          )}>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Footer({ variant = "classic" }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const socialLinks = Object.entries(siteConfig.social).filter(([_, url]) => url)

  // Classic variant - like the reference image
  if (variant === "classic") {
    return (
      <footer className="bg-brand-primary text-white">
        <div className="container mx-auto px-4">
          {/* Top Section - Logo and Social */}
          <div className="py-12 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 border-b border-white/10">
            <div className="max-w-md">
              <a href="/" className="inline-block mb-6">
                <span className="md:hidden text-xl font-bold text-white">{siteConfig.business.name}</span>
                <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="hidden md:block h-12 w-12 object-contain brightness-0 invert" width={48} height={48} loading="lazy" decoding="async" />
              </a>
              <p className="text-white/60 text-sm leading-relaxed">
                Your trusted partner for comprehensive digital marketing solutions—from custom website design and SEO to indoor billboard advertising and targeted campaigns that deliver real results.
              </p>
            </div>
            
            <div className="lg:text-right">
              {socialLinks.length > 0 && (
                <>
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-4">Connect With Us</p>
                  <div className="flex lg:justify-end gap-3">
                    {socialLinks.map(([platform, url]) => {
                      const Icon = socialIcons[platform as keyof typeof socialIcons]
                      if (!Icon) return null
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Middle Section - Links */}
          <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Solutions with Accordion */}
            <div>
              <a href="/solutions" className="flex items-center gap-1 text-white font-semibold mb-6 hover:text-white/80 transition-colors">
                SOLUTIONS <ChevronRight className="w-4 h-4" />
              </a>
              <SolutionsAccordion />
            </div>

            {/* Indoor Billboards */}
            <div>
              <p className="text-white font-semibold mb-6 uppercase tracking-wider text-sm" role="heading" aria-level={2}>Indoor Billboards</p>
              <ul className="space-y-3">
                {indoorBillboardsMenu.items.map((item, i) => (
                  <li key={i}>
                    <a href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-white font-semibold mb-6 uppercase tracking-wider text-sm" role="heading" aria-level={2}>Company</p>
              <ul className="space-y-3">
                {companyLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white font-semibold mb-6 uppercase tracking-wider text-sm" role="heading" aria-level={2}>Contact Us</p>
              <ul className="space-y-3 text-sm text-white/60">
                <li>{siteConfig.location.city}</li>
                <li>{siteConfig.contact.phoneFormatted}</li>
                <li>{siteConfig.contact.email}</li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-white/50">
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <span>|</span>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
            <p className="text-sm text-white/50">
              Made by <a href="#" className="underline hover:text-white">{siteConfig.business.name}</a> · All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  // Centered variant - everything centered with stacked sections
  if (variant === "centered") {
    return (
      <footer className="bg-brand-primary text-white">
        <div className="container mx-auto px-4">
          {/* Logo centered */}
          <div className="py-12 text-center border-b border-white/10">
            <a href="/" className="inline-block mb-4">
              <span className="md:hidden text-xl font-bold text-white">{siteConfig.business.name}</span>
              <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="hidden md:block h-12 w-12 object-contain brightness-0 invert mx-auto" width={48} height={48} loading="lazy" decoding="async" />
            </a>
            <p className="text-white/60 text-sm max-w-lg mx-auto">
              {siteConfig.business.description} in {siteConfig.location.city}, {siteConfig.location.state}.
            </p>
          </div>

          {/* Links in horizontal rows */}
          <div className="py-10 space-y-8">
            {/* Main Links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              <a href="/about" className="text-sm text-white/70 hover:text-white transition-colors">About</a>
              <a href="/solutions" className="text-sm text-white/70 hover:text-white transition-colors">Solutions</a>
              <a href="/screen-advertising" className="text-sm text-white/70 hover:text-white transition-colors">Screen Advertising</a>
              <a href="/venue-partner" className="text-sm text-white/70 hover:text-white transition-colors">Venue Partner</a>
              <a href="/locations" className="text-sm text-white/70 hover:text-white transition-colors">Locations</a>
              <a href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/50">
              <span>{siteConfig.contact.phoneFormatted}</span>
              <span>·</span>
              <span>{siteConfig.contact.email}</span>
              <span>·</span>
              <span>{siteConfig.location.city}, {siteConfig.location.state}</span>
            </div>

            {/* Social */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center gap-4">
                {socialLinks.map(([platform, url]) => {
                  const Icon = socialIcons[platform as keyof typeof socialIcons]
                  if (!Icon) return null
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-brand-primary transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="py-6 border-t border-white/10 text-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/40">
              <span>© {currentYear} {siteConfig.business.name}</span>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // Minimal variant - compact single section
  return (
    <footer className="bg-brand-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <a href="/">
            <span className="md:hidden text-base font-bold text-white">{siteConfig.business.name}</span>
            <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="hidden md:block h-8 w-8 object-contain brightness-0 invert" width={32} height={32} loading="lazy" decoding="async" />
          </a>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <span className="hidden md:inline text-white/30">|</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          </div>

          <p className="text-sm text-white/40">© {currentYear} {siteConfig.business.name}</p>
        </div>
      </div>
    </footer>
  )
}
