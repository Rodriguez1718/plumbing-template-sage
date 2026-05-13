import * as React from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Menu, ChevronDown, Phone, Settings, DollarSign,
  Utensils, Bath, Droplet, Waves, Flame, Pipette,
  Building, Zap, Shield, Search, AlertCircle, Filter,
  Leaf, ClipboardList
} from "lucide-react"
import { topNavItems, mainNavItems, quickActions, type MegaMenuItem, type ServiceCategory } from "@/config/navigation"
import { siteConfig } from "@/config/site"

const iconMap: Record<string, React.ReactNode> = {
  utensils: <Utensils className="h-4 w-4" />,
  bath: <Bath className="h-4 w-4" />,
  droplet: <Droplet className="h-4 w-4" />,
  waves: <Waves className="h-4 w-4" />,
  flame: <Flame className="h-4 w-4" />,
  pipette: <Pipette className="h-4 w-4" />,
  building: <Building className="h-4 w-4" />,
  zap: <Zap className="h-4 w-4" />,
  shield: <Shield className="h-4 w-4" />,
  search: <Search className="h-4 w-4" />,
  alert: <AlertCircle className="h-4 w-4" />,
  filter: <Filter className="h-4 w-4" />,
  leaf: <Leaf className="h-4 w-4" />,
  clipboard: <ClipboardList className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
}

function TopNavDropdown({ item }: { item: typeof topNavItems[0] }) {
  const [isOpen, setIsOpen] = React.useState(false)

  if (!item.children) {
    return (
      <a href={item.href} className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors duration-200">
        {item.title}
      </a>
    )
  }

  return (
    <div
      className="relative z-[70]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors duration-200 cursor-pointer">
        <a href={item.href}>{item.title}</a>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <>
          <div className="absolute top-full left-0 right-0 h-2" />
          <div className="absolute top-full right-0 mt-0 bg-brand-primary border-2 border-white py-0 min-w-[220px] shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
            {item.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className="block px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-accent hover:text-white transition-all duration-0 border-b border-white/10 last:border-b-0"
              >
                {child.title}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}


function MegaMenu({ item, isOpen }: { item: MegaMenuItem; isOpen: boolean }) {
  if (!isOpen) return null

  return (
    <div className="fixed left-0 right-0 bg-brand-primary border-y-2 border-white/20 z-[50]" style={{ top: '120px' }}>
      <div className="w-full px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-10 max-w-[1600px] mx-auto">
          {item.categories.map((category) => (
            <div key={category.title} className="min-w-0">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-accent">
                <span className="text-accent flex-shrink-0">
                  {iconMap[category.icon] || <Settings className="h-5 w-5" />}
                </span>
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] truncate">
                  {category.href ? (
                    <a href={category.href} className="hover:text-accent transition-colors duration-200">
                      {category.title}
                    </a>
                  ) : (
                    category.title
                  )}
                </h3>
              </div>
              <ul className="space-y-1">
                {category.items.map((service) => (
                  <li key={service.href}>
                    <a
                      href={service.href}
                      className="text-[11px] font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-accent px-2 py-1.5 transition-all duration-0 block leading-tight break-words"
                      title={service.title}
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-accent/5 h-12 border-t border-white/10 flex items-center px-12">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">TECHNICAL SPECIFICATIONS & SERVICE MODULES</p>
      </div>
    </div>
  )
}

function ServiceNavItem({ item }: { item: MegaMenuItem }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-1 text-[13px] font-black uppercase tracking-[0.15em] text-white hover:text-accent transition-all duration-200 px-6 h-full cursor-pointer group">
        <a href={item.href}>
          {item.title}
        </a>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-accent transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      {isOpen && <MegaMenu item={item} isOpen={isOpen} />}
    </div>
  )
}


export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar - Dark Gray */}
      <div className="hidden lg:block bg-brand-secondary text-white/90 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-8">
              {quickActions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-0"
                >
                  <div className="text-accent">
                    {action.icon === "settings" ? (
                      <Settings className="h-3 w-3" />
                    ) : (
                      <DollarSign className="h-3 w-3" />
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{action.title}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-6">
              {topNavItems.map((item) => (
                <TopNavDropdown key={item.href} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar - Black */}
      <div className={`bg-brand-primary border-b border-white/10 transition-all duration-300 ${scrolled ? 'shadow-2xl shadow-black/50' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 md:gap-4 group flex-shrink-0">
              <div className="relative p-1 border-2 border-white/10 group-hover:border-accent transition-colors duration-300 flex-shrink-0">
                <img
                  src={siteConfig.logo?.src}
                  alt={siteConfig.logo?.alt || "Logo"}
                  className="h-10 w-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 flex-shrink-0"
                  width={40}
                  height={40}
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <div className="hidden sm:block flex-shrink-0">
                <span className="font-black text-lg md:text-xl lg:text-2xl text-white uppercase tracking-tighter group-hover:text-accent transition-colors duration-200 whitespace-nowrap">
                  {siteConfig.business?.name}
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center h-full gap-1">
              {mainNavItems.map((item) => (
                <ServiceNavItem key={item.href} item={item} />
              ))}
            </nav>

            {/* Phone + CTA */}
            <div className="hidden lg:flex items-center gap-0 border-l border-white/10 h-full">
              <a
                href={`tel:${siteConfig.contact?.phone}`}
                className="group flex items-center gap-4 px-8 h-full hover:bg-white/5 transition-all duration-0"
              >
                <div className="w-10 h-10 bg-accent flex items-center justify-center group-hover:bg-white transition-colors duration-0">
                  <Phone className="h-5 w-5 text-white group-hover:text-black" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black leading-none mb-1">SYSTEM STATUS: ACTIVE</p>
                  <span className="font-black text-xl text-white group-hover:text-accent transition-colors duration-0 whitespace-nowrap tracking-tight">
                    {siteConfig.contact?.phoneFormatted}
                  </span>
                </div>
              </a>
              <Button
                className="rounded-none bg-accent hover:bg-white text-white hover:text-black font-black px-10 h-full transition-all duration-0 border-l border-white/10"
                asChild
              >
                <a href="/contact" className="flex items-center justify-center h-full text-sm tracking-[0.2em]">INITIATE QUOTE</a>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="text-white hover:bg-accent hover:text-white rounded-none border border-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] overflow-y-auto p-0 bg-brand-primary border-l-4 border-accent">
                <SheetHeader className="border-b-2 border-white/10 p-6 bg-brand-secondary">
                  <SheetTitle className="text-left text-white uppercase font-black tracking-[0.3em] text-sm">NAVIGATION_MODULE</SheetTitle>
                </SheetHeader>
                <MobileNav onClose={() => setIsOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}


function MobileNav({ onClose }: { onClose: () => void }) {
  const [expandedService, setExpandedService] = React.useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null)
  const [expandedTop, setExpandedTop] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col bg-brand-primary">
      {/* Phone CTA */}
      <div className="bg-accent p-6">
        <a
          href={`tel:${siteConfig.contact?.phone}`}
          className="flex items-center justify-between gap-4 text-white group"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">EMERGENCY_UPLINK</span>
            <span className="font-black text-2xl tracking-tighter">{siteConfig.contact?.phoneFormatted}</span>
          </div>
          <Phone className="h-8 w-8 group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-0 border-b-2 border-white/10">
        {quickActions.map((action) => (
          <a
            key={action.href}
            href={action.href}
            className="flex flex-col gap-2 p-6 bg-brand-secondary hover:bg-accent group transition-colors duration-0 border-r border-white/10 last:border-r-0"
            onClick={onClose}
          >
            <div className="w-10 h-10 bg-brand-primary flex items-center justify-center group-hover:bg-white transition-colors">
              {action.icon === "settings" ? (
                <Settings className="h-5 w-5 text-accent group-hover:text-black" />
              ) : (
                <DollarSign className="h-5 w-5 text-accent group-hover:text-black" />
              )}
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{action.title}</span>
          </a>
        ))}
      </div>

      {/* Top Nav Links */}
      <div className="p-0 border-b-2 border-white/10">
        {topNavItems.map((item) => (
          <div key={item.href} className="border-b border-white/5 last:border-b-0">
            {item.children ? (
              <>
                <button
                  onClick={() => setExpandedTop(expandedTop === item.href ? null : item.href)}
                  className="flex items-center justify-between w-full p-6 text-left hover:bg-white/5"
                >
                  <span className="text-xs font-black text-white uppercase tracking-[0.2em]">{item.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-accent transition-transform ${expandedTop === item.href ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedTop === item.href && (
                  <div className="bg-brand-secondary/50 border-y border-white/10">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block px-8 py-4 text-[10px] font-bold text-white/60 uppercase tracking-widest hover:text-accent border-b border-white/5 last:border-b-0"
                        onClick={onClose}
                      >
                        {child.title}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a
                href={item.href}
                className="block p-6 text-xs font-black text-white uppercase tracking-[0.2em] hover:bg-white/5"
                onClick={onClose}
              >
                {item.title}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="p-0">
        <div className="bg-brand-secondary px-6 py-2 border-b border-white/10">
          <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">SERVICE_MATRIX</p>
        </div>
        {mainNavItems.map((service) => (
          <div key={service.href} className="border-b border-white/10 last:border-b-0">
            <button
              onClick={() => setExpandedService(expandedService === service.href ? null : service.href)}
              className="flex items-center justify-between w-full p-6 text-left hover:bg-white/5"
            >
              <span className="text-sm font-black text-white uppercase tracking-widest">{service.title}</span>
              <ChevronDown
                className={`h-5 w-5 text-accent transition-transform ${expandedService === service.href ? 'rotate-180' : ''
                  }`}
              />
            </button>
            {expandedService === service.href && (
              <div className="bg-brand-secondary/30">
                {service.categories.map((category) => (
                  <div key={category.title} className="border-b border-white/5 last:border-b-0">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                      className="flex items-center gap-4 w-full px-8 py-4 text-left hover:bg-white/5"
                    >
                      <span className="text-accent">{iconMap[category.icon]}</span>
                      <span className="text-xs font-black text-white uppercase tracking-wider">{category.title}</span>
                      <ChevronDown
                        className={`h-3 w-3 text-accent ml-auto transition-transform ${expandedCategory === category.title ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    {expandedCategory === category.title && (
                      <div className="bg-brand-primary/50 px-12 py-4 space-y-4">
                        {category.href && (
                          <a
                            href={category.href}
                            className="block text-[10px] font-black text-accent uppercase tracking-[0.2em] border-b border-accent/20 pb-2 mb-2"
                            onClick={onClose}
                          >
                            ACCESS FULL CATEGORY →
                          </a>
                        )}
                        {category.items.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="block text-[11px] font-bold text-white/50 uppercase tracking-widest hover:text-white"
                            onClick={onClose}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-6 bg-brand-secondary border-t-2 border-white/10">
        <Button
          className="w-full bg-white hover:bg-accent text-black hover:text-white font-black py-8 rounded-none border-2 border-white transition-all duration-0 text-base uppercase tracking-[0.2em]"
          asChild
        >
          <a href="/contact" onClick={onClose}>INITIATE QUOTE</a>
        </Button>
      </div>
    </div>
  )
}
