import {
  Handshake,
  MapPin,
  Monitor,
  Globe,
  CircleDot,
  Share2,
  Palette,
  Megaphone,
  DollarSign,
  Tv,
  Target,
  Music,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  title: string
  href: string
  description?: string
  icon?: LucideIcon
}

export interface NavDropdown {
  title: string
  items: NavItem[]
}

export interface NavMegaMenu {
  title: string
  href?: string
  sections: {
    label: string
    items: NavItem[]
  }[]
  featured?: {
    title: string
    description: string
    href: string
    image?: string
    bgColor?: string
  }[]
}

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
]

export const indoorBillboardsMenu: NavDropdown = {
  title: "Indoor Billboards",
  items: [
    {
      title: "Become a Venue Partner",
      description: "Join our network of premium venues to reach engaged...",
      icon: Handshake,
      href: "/venue-partner",
    },
    {
      title: "Locations",
      description: "Our network of indoor digital billboards is located within reta...",
      icon: MapPin,
      href: "/locations",
    },
    {
      title: "Screen Advertising",
      description: "Advertise on screens in your local community to reach your...",
      icon: Monitor,
      href: "/screen-advertising",
    },
  ],
}

export const solutionsMenu: NavMegaMenu = {
  title: "Solutions",
  href: "/solutions",
  sections: [
    {
      label: "Foundational",
      items: [
        { title: "Website Design", description: "Custom website design & development to achieve your unique goals and...", icon: Globe, href: "/website-design" },
        { title: "Google Business Profile", description: "Optimize your local presence and get found by customers searching for your...", icon: CircleDot, href: "/google-business" },
        { title: "Social Media Management", description: "Build and engage your audience across all major social platforms.", icon: Share2, href: "/social-media-management" },
        { title: "Design Services", description: "Professional design services to elevate your brand identity.", icon: Palette, href: "/design-services" },
      ],
    },
    {
      label: "Lead Gen",
      items: [
        { title: "Social Media Advertising", description: "Professional social media advertising services to drive targeted traffic and...", icon: Megaphone, href: "/social-media-advertising" },
        { title: "Pay Per Click", description: "Professional pay-per-click advertising services to drive targeted traffic and...", icon: DollarSign, href: "/ppc" },
      ],
    },
    {
      label: "Branding & Awareness",
      items: [
        { title: "Connected TV (OTT Ads)", description: "Reach audiences on streaming platforms with targeted TV advertising.", icon: Tv, href: "/connected-tv" },
        { title: "Display (Geofencing)", description: "Location-based display advertising that targets customers where they are.", icon: Target, href: "/geofencing" },
        { title: "Streaming Audio Advertising", description: "Reach engaged listeners with targeted streaming audio ads on popular music...", icon: Music, href: "/streaming-audio" },
      ],
    },
  ],
  featured: [
    {
      title: "Connected TV (OTT Ads)",
      description: "Reach audiences on streaming platforms with targeted TV advertising.",
      href: "/connected-tv",
      image: "https://3l4xnbxrrw.ucarecd.net/057102fa-b507-4b7e-b69d-80abe641c8fb/-/preview/1000x666/",
    },
    {
      title: "Social Media Advertising",
      description: "Professional social media advertising services to drive targeted traffic and conversions.",
      href: "/social-media-advertising",
      image: "https://ucarecdn.com/b5a0f032-b4d1-4b0e-9f36-50c87332fd6e/-/preview/1000x792/",
    },
    {
      title: "Website Design",
      description: "Custom website design & development to achieve your unique goals and objectives.",
      href: "/website-design",
      image: "https://3l4xnbxrrw.ucarecd.net/d139b768-c61f-49c7-a728-5241de36e6b2/-/preview/1000x666/",
    },
    {
      title: "Geofencing",
      description: "Location-based display advertising that targets customers where they are.",
      href: "/geofencing",
      image: "https://ucarecdn.com/91c1aa02-bee4-487c-8027-48cdfb4fe71f/-/preview/1000x666/",
    },
    {
      title: "Streaming Audio Advertising",
      description: "Reach engaged listeners with targeted streaming audio ads on popular music platforms.",
      href: "/streaming-audio",
      image: "https://ucarecdn.com/8574765c-cb9e-4a6d-9e56-c66c00d4d68d/-/preview/700x441/",
    },
  ],
}
