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
      <a href={item.href} className="text-sm font-medium text-white hover:opacity-80 transition-opacity">
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
      <button className="flex items-center gap-1 text-sm font-medium text-white hover:opacity-80 transition-opacity py-2">
        {item.title}
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          {/* Invisible bridge to prevent dropdown from closing */}
          <div className="absolute top-full left-0 right-0 h-2" />
          <div className="absolute top-full right-0 mt-2 bg-brand-secondary rounded-lg shadow-xl py-3 min-w-[220px] border-2 border-white/20">
            {item.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className="block px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
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
    <div className="fixed left-0 right-0 bg-white shadow-2xl border-t-2 border-gray-200 z-[50]" style={{ top: '165px' }}>
      <div className="w-full px-12 py-10">
        <div className="grid grid-cols-6 gap-x-8 gap-y-6 max-w-[1600px] mx-auto">
          {item.categories.map((category) => (
            <div key={category.title} className="min-w-0">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-brand-secondary">
                <span className="text-brand-secondary flex-shrink-0">
                  {iconMap[category.icon] || <Settings className="h-5 w-5" />}
                </span>
                <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wide whitespace-nowrap">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((service) => (
                  <li key={service.href}>
                    <a
                      href={service.href}
                      className="text-sm text-gray-700 hover:text-accent hover:bg-brand-tertiary hover:pl-2 transition-all duration-200 block leading-snug py-1 rounded"
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
      <div className="flex items-center gap-1 text-sm font-semibold text-white hover:bg-white/10 transition-colors px-4 h-full">
        <a href={item.href} className="hover:underline">
          {item.title}
        </a>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && <MegaMenu item={item} isOpen={isOpen} />}
    </div>
  )
}


export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar - Dark Blue */}
      <div className="bg-brand-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex h-9 items-center justify-end gap-6">
            {topNavItems.map((item) => (
              <TopNavDropdown key={item.href} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section - White with Logo, Quick Actions, Phone */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <img 
                src={siteConfig.logo.src} 
                alt={siteConfig.logo.alt} 
                className="h-14 w-14 object-contain"
                width={56}
                height={56}
                decoding="async"
              />
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-brand-secondary">{siteConfig.business.name}</span>
              </div>
            </a>

            {/* Quick Actions - Desktop */}
            <div className="hidden lg:flex items-center gap-12">
              {quickActions.map((action) => (
                <a 
                  key={action.href} 
                  href={action.href}
                  className="flex items-center gap-3 text-gray-700 hover:text-brand-secondary transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center">
                    {action.icon === "settings" ? (
                      <Settings className="h-5 w-5 text-white" />
                    ) : (
                      <DollarSign className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <span className="font-semibold text-brand-secondary">{action.title}</span>
                </a>
              ))}
            </div>

            {/* Phone Number - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center">
                <span className="text-white text-xs font-bold">24/7</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Call Us Now</p>
                <a href={`tel:${siteConfig.contact.phone}`} className="font-bold text-lg text-brand-primary">
                  {siteConfig.contact.phoneFormatted}
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] overflow-y-auto p-0">
                <SheetHeader className="border-b p-4">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <MobileNav onClose={() => setIsOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar - Blue */}
      <div className="hidden lg:block bg-brand-secondary relative z-[60]">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center justify-between">
            <nav className="flex items-center h-full -mx-2">
              {mainNavItems.map((item) => (
                <ServiceNavItem key={item.href} item={item} />
              ))}
            </nav>
            <Button 
              className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 rounded-full ml-4"
              asChild
            >
              <a href="/quote">GET A QUOTE</a>
            </Button>
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
    <div className="flex flex-col">
      {/* Phone CTA */}
      <div className="bg-brand-primary p-4">
        <a 
          href={`tel:${siteConfig.contact.phone}`}
          className="flex items-center justify-center gap-2 text-white"
        >
          <Phone className="h-5 w-5" />
          <span className="font-bold text-lg">{siteConfig.contact.phoneFormatted}</span>
        </a>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50">
        {quickActions.map((action) => (
          <a 
            key={action.href}
            href={action.href}
            className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm"
            onClick={onClose}
          >
            <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center">
              {action.icon === "settings" ? (
                <Settings className="h-4 w-4 text-white" />
              ) : (
                <DollarSign className="h-4 w-4 text-white" />
              )}
            </div>
            <span className="text-sm font-medium text-gray-700">{action.title}</span>
          </a>
        ))}
      </div>

      {/* Main Services */}
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Services</p>
        {mainNavItems.map((service) => (
          <div key={service.href} className="border-b last:border-b-0">
            <button
              onClick={() => setExpandedService(expandedService === service.href ? null : service.href)}
              className="flex items-center justify-between w-full py-3 text-left"
            >
              <span className="font-medium text-gray-800">{service.title}</span>
              <ChevronDown 
                className={`h-4 w-4 text-gray-400 transition-transform ${
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
                      <span className="text-brand-secondary">{iconMap[category.icon]}</span>
                      <span className="text-sm font-semibold text-brand-secondary">{category.title}</span>
                      <ChevronDown 
                        className={`h-3 w-3 text-gray-400 ml-auto transition-transform ${
                          expandedCategory === category.title ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {expandedCategory === category.title && (
                      <div className="pl-6 pb-2">
                        {category.items.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="block py-1.5 text-sm text-gray-600 hover:text-brand-secondary"
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

      {/* Top Nav Items */}
      <div className="p-4 bg-gray-50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">More</p>
        {topNavItems.map((item) => (
          <div key={item.href} className="border-b border-gray-200 last:border-b-0">
            {item.children ? (
              <>
                <button
                  onClick={() => setExpandedTop(expandedTop === item.href ? null : item.href)}
                  className="flex items-center justify-between w-full py-3 text-left"
                >
                  <span className="text-sm text-gray-700">{item.title}</span>
                  <ChevronDown 
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      expandedTop === item.href ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {expandedTop === item.href && (
                  <div className="pb-3 pl-4">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-sm text-gray-500 hover:text-brand-secondary"
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
                className="block py-3 text-sm text-gray-700"
                onClick={onClose}
              >
                {item.title}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="p-4">
        <Button 
          className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 rounded-full text-base"
          asChild
        >
          <a href="/quote" onClick={onClose}>GET A QUOTE</a>
        </Button>
      </div>
    </div>
  )
}
