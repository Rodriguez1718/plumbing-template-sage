import { siteConfig } from "@/config/site"
import { Facebook } from "lucide-react"

// X (Twitter) icon component since lucide doesn't have the new X logo
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { title: "HOME", href: "/" },
    { title: "ABOUT US", href: "/about" },
    { title: "SPECIALS", href: "/specials-and-offers" },
    { title: "MAINTENANCE PLAN", href: "/maintenance-plan" },
    { title: "FINANCING", href: "/financing" },
    { title: "REVIEWS", href: "/reviews" },
    { title: "CAREERS", href: "/careers" },
    { title: "SERVICES AREAS", href: "/service-areas" },
    { title: "CONTACT US", href: "/contact" },
  ]

  const servicesOffer = [
    { title: "RESIDENTIAL PLUMBING SERVICES", href: "/residential" },
    { title: "COMMERCIAL PLUMBING SERVICES", href: "/commercial" },
    { title: "SPECIALTY PLUMBING SERVICES", href: "/specialty" },
    { title: "MAINTENANCE SERVICES", href: "/maintenance" },
  ]

  return (
    <footer className="bg-brand-primary text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#A3032B] rounded-full"></span>
              ABOUT US
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              We specialize in residential and commercial plumbing solutions. From repairs and maintenance to advanced leak detection and installations, our team is here to keep your plumbing running smoothly. Contact us today!
            </p>
            <div className="flex gap-2">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </a>
              )}
              {/* Default social icons if none configured */}
              {!siteConfig.social.facebook && !siteConfig.social.twitter && (
                <>
                  <a
                    href="#"
                    className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#A3032B] rounded-full"></span>
              QUICK LINKS
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Offer Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#A3032B] rounded-full"></span>
              SERVICES OFFER
            </h3>
            <ul className="space-y-2">
              {servicesOffer.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#A3032B] rounded-full"></span>
              CONTACT INFORMATION
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-white/70">
                PHONE:  {siteConfig.contact.phoneFormatted}
              </li>
              <li className="text-sm text-white/70">
                EMAIL:  {siteConfig.contact.email.toUpperCase()}
              </li>
              <li className="text-sm text-white/70">
                ADDRESS:  {siteConfig.location.city.toUpperCase()}, {siteConfig.location.state.toUpperCase()}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-white/50 text-center">
            © Copyright {currentYear} {siteConfig.business.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
