import { siteConfig } from "@/config/site"
import { Facebook } from "lucide-react"

// X (Twitter) icon component since lucide doesn't have the new X logo
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
    { title: "RESIDENTIAL PLUMBING SERVICES", href: "/residential-plumbing" },
    { title: "COMMERCIAL PLUMBING SERVICES", href: "/commercial" },
    { title: "SPECIALTY PLUMBING SERVICES", href: "/specialty" },
    { title: "MAINTENANCE SERVICES", href: "/maintenance" },
  ]

  return (
    <div className="relative">
      {/* Massive Brutalist Header */}
      <div className="w-full bg-white overflow-hidden select-none pointer-events-none pt-10 mb-[-1.5vw]">
        <h2 className="text-[18vw] font-black leading-[0.8] uppercase tracking-tighter text-black text-center whitespace-nowrap">
          Plumbing
        </h2>
      </div>

      <footer className="bg-primary text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {/* Brand/About Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-sm font-black tracking-[0.3em] uppercase flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-accent"></span>
                  Strategic Overview
                </h3>
                <p className="text-sm font-medium text-white/50 leading-relaxed tracking-tight">
                  Engineering high-performance plumbing infrastructure for residential and commercial assets. Precision repairs, leak detection, and advanced system maintenance.
                </p>
              </div>

              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all group">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all group">
                  <XIcon className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-8">
              <h3 className="text-sm font-black tracking-[0.3em] uppercase flex items-center gap-3">
                <span className="w-1.5 h-6 bg-accent"></span>
                Core Navigation
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-accent hover:translate-x-2 transition-all inline-block">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-8">
              <h3 className="text-sm font-black tracking-[0.3em] uppercase flex items-center gap-3">
                <span className="w-1.5 h-6 bg-accent"></span>
                Specialized Units
              </h3>
              <ul className="space-y-3">
                {servicesOffer.map((service) => (
                  <li key={service.href}>
                    <a href={service.href} className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-accent hover:translate-x-2 transition-all inline-block">
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate Info */}
            <div className="space-y-8">
              <h3 className="text-sm font-black tracking-[0.3em] uppercase flex items-center gap-3">
                <span className="w-1.5 h-6 bg-accent"></span>
                Asset Information
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="block text-[10px] font-black text-accent uppercase tracking-widest leading-none">Command Center</span>
                  <p className="text-sm font-bold uppercase tracking-tight text-white/70">
                    {siteConfig.location.address}<br />
                    {siteConfig.location.city}, {siteConfig.location.state}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="block text-[10px] font-black text-accent uppercase tracking-widest leading-none">Emergency Direct</span>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-2xl font-black uppercase tracking-tighter hover:text-accent transition-colors">
                    {siteConfig.contact.phoneFormatted}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sharp Bottom Divider */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-8">
              <a href="/privacy-policy" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Terms of Engagement</a>
              <a href="/sitemap" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Digital Sitemap</a>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-accent/20"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                © {currentYear} {siteConfig.business.name.toUpperCase()} SYSTEM INFRASTRUCTURE
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Corner Element */}
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none translate-x-1/2 translate-y-1/2">
          <div className="w-full h-full border-[20px] border-accent"></div>
        </div>
      </footer>
    </div>
  );
}
