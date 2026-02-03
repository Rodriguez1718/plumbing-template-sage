import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, ChevronDown, Play, type LucideIcon } from "lucide-react"
import { mainNavItems, indoorBillboardsMenu, solutionsMenu } from "@/config/navigation"
import { siteConfig } from "@/config/site"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [featuredItem, setFeaturedItem] = React.useState(0)

  // Select a random featured item when component mounts
  React.useEffect(() => {
    if (solutionsMenu.featured && solutionsMenu.featured.length > 0) {
      setFeaturedItem(Math.floor(Math.random() * solutionsMenu.featured.length))
    }
  }, [])

  // Change featured item when menu is hovered
  const handleMenuHover = () => {
    if (solutionsMenu.featured && solutionsMenu.featured.length > 0) {
      setFeaturedItem(Math.floor(Math.random() * solutionsMenu.featured.length))
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img 
            src={siteConfig.logo.src} 
            alt={siteConfig.logo.alt} 
            className="hidden md:block h-8 w-8 object-contain"
            width={32}
            height={32}
            decoding="async"
          />
          <span className="md:hidden font-bold text-base text-brand-primary">{siteConfig.business.name}</span>
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex" delayDuration={0}>
          <NavigationMenuList>
            {/* Main nav items */}
            {mainNavItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {/* Indoor Billboards Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{indoorBillboardsMenu.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-4">
                  {indoorBillboardsMenu.items.map((item) => (
                    <ListItem key={item.href} title={item.title} href={item.href} icon={item.icon} compact>
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Solutions Mega Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className="cursor-pointer" 
                onClick={() => window.location.href = solutionsMenu.href || '/solutions'}
                onMouseEnter={handleMenuHover}
              >
                {solutionsMenu.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[850px] grid-cols-[1fr_1fr_250px] gap-4 p-6">
                  <div className="space-y-4">
                    {solutionsMenu.sections.slice(0, 2).map((section) => (
                      <div key={section.label}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{section.label}</h4>
                        <ul className="mt-2 space-y-2">
                          {section.items.map((item) => (
                            <ListItem key={item.href} title={item.title} href={item.href} icon={item.icon} compact>
                              {item.description}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {solutionsMenu.sections.slice(2).map((section) => (
                      <div key={section.label}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{section.label}</h4>
                        <ul className="mt-2 space-y-2">
                          {section.items.map((item) => (
                            <ListItem key={item.href} title={item.title} href={item.href} icon={item.icon} compact>
                              {item.description}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {solutionsMenu.featured && solutionsMenu.featured.length > 0 && (
                    <div className="border-l pl-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Featured</h4>
                      <a href={solutionsMenu.featured[featuredItem].href} className="block space-y-2 group">
                        <div className="aspect-video rounded-lg bg-muted overflow-hidden relative">
                          {solutionsMenu.featured[featuredItem].image ? (
                            <img 
                              src={solutionsMenu.featured[featuredItem].image} 
                              alt={solutionsMenu.featured[featuredItem].title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className={cn(
                              "w-full h-full flex items-center justify-center bg-gradient-to-br",
                              solutionsMenu.featured[featuredItem].bgColor || "from-red-500 to-red-600"
                            )}>
                              <Play className="size-10 text-white" strokeWidth={1.5} />
                            </div>
                          )}
                        </div>
                        <h5 className="font-medium text-sm group-hover:text-brand-primary transition-colors">{solutionsMenu.featured[featuredItem].title}</h5>
                        <p className="text-xs text-muted-foreground line-clamp-2">{solutionsMenu.featured[featuredItem].description}</p>
                        <span className="text-xs text-brand-primary font-medium">Learn More →</span>
                      </a>
                    </div>
                  )}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <Button className="hidden lg:inline-flex bg-brand-primary hover:opacity-90 text-white" asChild>
          <a href="/contact">Contact Us</a>
        </Button>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] overflow-y-auto">
            <SheetHeader className="border-b pb-4">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 mt-6 px-2">
              {mainNavItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  className="text-base font-medium py-3 px-4 rounded-lg hover:bg-accent transition-colors" 
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </a>
              ))}
              
              <div className="border-t my-2" />
              
              <MobileAccordion title={indoorBillboardsMenu.title}>
                <div className="space-y-1 mt-2">
                  {indoorBillboardsMenu.items.map((item) => (
                    <a 
                      key={item.href} 
                      href={item.href} 
                      className="block py-2.5 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" 
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title={solutionsMenu.title}>
                <div className="space-y-4 mt-2">
                  {solutionsMenu.sections.map((section) => (
                    <div key={section.label}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-1.5">{section.label}</p>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <a 
                            key={item.href} 
                            href={item.href} 
                            className="block py-2.5 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" 
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileAccordion>

              <div className="border-t my-4" />

              <Button className="bg-brand-primary hover:opacity-90 text-white w-full py-6 text-base font-semibold" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  )
}

function MobileAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title} menu`}
        className="flex items-center justify-between w-full text-base font-medium py-3 px-4 rounded-lg hover:bg-accent transition-colors"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      {isOpen && <div className="mt-1">{children}</div>}
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: LucideIcon; compact?: boolean }
>(({ className, title, children, icon: Icon, compact, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            compact ? "py-2.5 px-2" : "p-3.5",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-2.5">
            {Icon && <Icon className={cn("shrink-0 text-brand-primary mt-0.5", compact ? "size-4" : "size-5")} strokeWidth={1.5} />}
            <div>
              <div className={cn("font-medium leading-none", compact ? "text-xs" : "text-sm")}>{title}</div>
              <p className={cn("text-muted-foreground leading-snug", compact ? "text-[11px] line-clamp-1 mt-0.5" : "text-xs line-clamp-2 mt-1.5")}>
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
