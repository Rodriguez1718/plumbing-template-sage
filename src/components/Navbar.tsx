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
      <a href={item.href} className="text-sm font-medium hover:text-accent transition-colors duration-200">
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
      <div className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors duration-200 cursor-pointer">
        <a href={item.href}>{item.title}</a>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <>
          <div className="absolute top-full left-0 right-0 h-2" />
          <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] rounded-lg shadow-2xl border border-white/10 py-2 min-w-[200px]">
            {item.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:text-accent hover:bg-white/5 transition-all duration-200"
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
    <div className="fixed left-0 right-0 bg-[#0a0a0a] shadow-2xl border-t border-white/10 z-[50]" style={{ top: '120px' }}>
      <div className="w-full px-12 py-10">
        <div className="grid grid-cols-6 gap-x-8 gap-y-6 max-w-[1600px] mx-auto">
          {item.categories.map((category) => (
            <div key={category.title} className="min-w-0">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-accent/30">
                <span className="text-accent flex-shrink-0">
                  {iconMap[category.icon] || <Settings className="h-5 w-5" />}
                </span>
                <h3 className="text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap">
                  {category.href ? (
                    <a href={category.href} className="hover:text-accent transition-colors duration-200">
                      {category.title}
                    </a>
                  ) : (
                    category.title
                  )}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((service) => (
                  <li key={service.href}>
                    <a
                      href={service.href}
                      className="text-sm text-white/70 hover:text-accent hover:bg-white/5 hover:pl-2 transition-all duration-200 block leading-snug py-1.5 rounded"
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
      <div className="flex items-center gap-1 text-sm font-semibold text-white hover:text-accent transition-all duration-200 px-4 h-full cursor-pointer group">
        <a href={item.href}>
          {item.title}
        </a>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <div className={`absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-t transition-all duration-300 ${isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
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
      <div className="hidden lg:block bg-[#2a2a2a] text-white/90 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              {quickActions.map((action) => (
                <a 
                  key={action.href} 
                  href={action.href}
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
                >
                  {action.icon === "settings" ? (
                    <Settings className="h-3.5 w-3.5" />
                  ) : (
                    <DollarSign className="h-3.5 w-3.5" />
                  )}
                  <span className="font-medium">{action.title}</span>
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
      <div className={`bg-[#0a0a0a] border-b border-white/10 transition-all duration-300 ${scrolled ? 'shadow-2xl shadow-black/50' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src={siteConfig.logo?.src} 
                  alt={siteConfig.logo?.alt || "Logo"} 
                  className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  width={48}
                  height={48}
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-white group-hover:text-accent transition-colors duration-200">
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
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href={`tel:${siteConfig.contact?.phone}`} 
                className="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-accent to-highlight flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 group-hover:scale-105 transition-all duration-200">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider font-medium">24/7 Emergency</p>
                  <span className="font-bold text-lg text-white group-hover:text-accent transition-colors duration-200">
                    {siteConfig.contact?.phoneFormatted}
                  </span>
                </div>
              </a>
              <Button 
                className="rounded-none bg-gradient-to-r from-accent to-highlight hover:from-highlight hover:to-accent text-white font-bold px-8 py-6 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-200"
                asChild
              >
                <a href="/contact">GET A QUOTE</a>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Open menu"
                  className="text-white hover:bg-white/10 hover:text-accent"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] overflow-y-auto p-0 bg-[#0a0a0a] border-l border-white/10">
                <SheetHeader className="border-b border-white/10 p-4">
                  <SheetTitle className="text-left text-white">Menu</SheetTitle>
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
    <div className="flex flex-col bg-[#0a0a0a]">
      {/* Phone CTA */}
      <div className="bg-gradient-to-r from-accent to-highlight p-4">
        <a 
          href={`tel:${siteConfig.contact?.phone}`}
          className="flex items-center justify-center gap-2 text-white"
        >
          <Phone className="h-5 w-5" />
          <span className="font-bold text-lg">{siteConfig.contact?.phoneFormatted}</span>
        </a>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 p-4 bg-[#1a1a1a] border-b border-white/10">
        {quickActions.map((action) => (
          <a 
            key={action.href}
            href={action.href}
            className="flex items-center gap-2 p-3 bg-[#2a2a2a] rounded-lg hover:bg-white/5 transition-colors duration-200"
            onClick={onClose}
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              {action.icon === "settings" ? (
                <Settings className="h-4 w-4 text-white" />
              ) : (
                <DollarSign className="h-4 w-4 text-white" />
              )}
            </div>
            <span className="text-sm font-medium text-white">{action.title}</span>
          </a>
        ))}
      </div>

      {/* Top Nav Links */}
      <div className="p-4 border-b border-white/10">
        {topNavItems.map((item) => (
          <div key={item.href} className="border-b border-white/5 last:border-b-0">
            {item.children ? (
              <>
                <button
                  onClick={() => setExpandedTop(expandedTop === item.href ? null : item.href)}
                  className="flex items-center justify-between w-full py-3 text-left"
                >
                  <span className="font-semibold text-white">{item.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/60 transition-transform ${expandedTop === item.href ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedTop === item.href && (
                  <div className="pb-3 pl-4">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-sm text-white/70 hover:text-accent"
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
                className="block py-3 font-semibold text-white hover:text-accent"
                onClick={onClose}
              >
                {item.title}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="p-4">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Services</p>
        {mainNavItems.map((service) => (
          <div key={service.href} className="border-b border-white/5 last:border-b-0">
            <button
              onClick={() => setExpandedService(expandedService === service.href ? null : service.href)}
              className="flex items-center justify-between w-full py-3 text-left"
            >
              <span className="font-medium text-white">{service.title}</span>
              <ChevronDown 
                className={`h-4 w-4 text-white/60 transition-transform ${
                  expandedService === service.href ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {expandedService === service.href && (
              <div className="pb-3 pl-2">
                {service.categories.map((category) => (
                  <div key={category.title} className="mb-2">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                      className="flex items-center gap-2 w-full py-2 text-left"
                    >
                      <span className="text-accent">{iconMap[category.icon]}</span>
                      <span className="text-sm font-semibold text-accent">{category.title}</span>
                      <ChevronDown 
                        className={`h-3 w-3 text-white/60 ml-auto transition-transform ${
                          expandedCategory === category.title ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {expandedCategory === category.title && (
                      <div className="pl-6 pb-2">
                        {category.href && (
                          <a
                            href={category.href}
                            className="block py-1.5 text-sm font-semibold text-highlight hover:text-accent"
                            onClick={onClose}
                          >
                            View All {category.title} →
                          </a>
                        )}
                        {category.items.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="block py-1.5 text-sm text-white/70 hover:text-accent"
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
      <div className="p-4">
        <Button 
          className="w-full bg-gradient-to-r from-accent to-highlight hover:from-highlight hover:to-accent text-white font-bold py-6 rounded-lg shadow-lg shadow-accent/30 text-base"
          asChild
        >
          <a href="/contact" onClick={onClose}>GET A QUOTE</a>
        </Button>
      </div>
    </div>
  )
}
