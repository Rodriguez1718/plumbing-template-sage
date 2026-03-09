export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

export interface ServiceCategory {
  title: string
  icon: string
  href?: string
  items: { title: string; href: string }[]
}

export interface MegaMenuItem {
  title: string
  href: string
  categories: ServiceCategory[]
}

// Top bar navigation (dark blue bar)
export const topNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { 
    title: "About Us", 
    href: "/about",
    children: [
      { title: "Specials and Offers", href: "/specials-and-offers" },
      { title: "Reviews", href: "/reviews" },
    ]
  },
  { title: "Contact Us", href: "/contact" },
  { title: "Careers", href: "/careers" },
  { 
    title: "Service Areas", 
    href: "/service-areas",
    children: [
      { title: "Santa Monica", href: "/santa-monica" },
      { title: "Pasadena", href: "/pasadena" },
      { title: "Glendale", href: "/glendale" },
    ]
  },
]

// Quick action items (middle section)
export const quickActions = [
  { title: "Maintenance Plan", href: "/maintenance-plan", icon: "settings" },
  { title: "Financing", href: "/financing", icon: "dollar" },
]

// Main service navigation with mega menu categories
export const mainNavItems: MegaMenuItem[] = [
  {
    title: "Residential Plumbing",
    href: "/residential-plumbing",
    categories: [
      {
        title: "Kitchen Plumbing",
        icon: "utensils",
        href: "/residential/kitchen",
        items: [
          { title: "Faucet & Sink Installation/Repair", href: "/residential/kitchen/faucet-sink" },
          { title: "Garbage Disposal Repair and Replacement", href: "/residential/kitchen/garbage-disposal" },
          { title: "Dishwasher Hookups", href: "/residential/kitchen/dishwasher" },
          { title: "Kitchen Remodel Plumbing", href: "/residential/kitchen/remodel" },
        ]
      },
      {
        title: "Bathroom",
        icon: "bath",
        href: "/residential/bathroom",
        items: [
          { title: "Toilet Repair and Replacement", href: "/residential/bathroom/toilet" },
          { title: "Shower and Tub Installation/Repair", href: "/residential/bathroom/shower-tub" },
          { title: "Sink and Faucet Installation/Repair", href: "/residential/bathroom/sink-faucet" },
        ]
      },
      {
        title: "Leak",
        icon: "droplet",
        href: "/residential/leak",
        items: [
          { title: "Water Leak Detection", href: "/residential/leak/detection" },
          { title: "Slab Leak Repair", href: "/residential/leak/slab" },
          { title: "Sewer Odor Investigation", href: "/residential/leak/odor" },
        ]
      },
      {
        title: "Drain",
        icon: "waves",
        href: "/residential/drain",
        items: [
          { title: "Drain Cleaning", href: "/residential/drain/cleaning" },
          { title: "Sewer Line Repair and Replacement", href: "/residential/drain/sewer-line" },
        ]
      },
      {
        title: "Water Heaters",
        icon: "flame",
        href: "/residential/water-heaters",
        items: [
          { title: "Standard Water Heater Repair and Replacement", href: "/residential/water-heaters/standard" },
          { title: "Tankless Water Heater Installation and Maintenance", href: "/residential/water-heaters/tankless" },
        ]
      },
      {
        title: "Piping",
        icon: "pipette",
        href: "/residential/piping",
        items: [
          { title: "Copper and PEX Re-Piping", href: "/residential/piping/repiping" },
          { title: "Water Line Repair/Replacement", href: "/residential/piping/water-line" },
        ]
      },
    ]
  },
  {
    title: "Commercial Plumbing",
    href: "/commercial",
    categories: [
      {
        title: "Building Plumbing Systems",
        icon: "building",
        href: "/commercial/building-plumbing",
        items: [
          { title: "Design and Installation for New Construction", href: "/commercial/building-plumbing/new-construction" },
          { title: "Plumbing Fixture Installation", href: "/commercial/building-plumbing/fixture-installation" },
        ]
      },
      {
        title: "Commercial Water Heaters",
        icon: "flame",
        href: "/commercial/water-heaters",
        items: [
          { title: "High-Capacity Water Heater Installation", href: "/commercial/water-heaters/high-capacity" },
          { title: "Tankless Water Heater Systems", href: "/commercial/water-heaters/tankless" },
        ]
      },
      {
        title: "Drain and Sewer Services",
        icon: "waves",
        href: "/commercial/drain-sewer",
        items: [
          { title: "Sewer Camera Inspections", href: "/commercial/drain-sewer/camera-inspections" },
          { title: "Commercial Drain Cleaning", href: "/commercial/drain-sewer/drain-cleaning" },
        ]
      },
      {
        title: "Specialty Piping",
        icon: "pipette",
        href: "/commercial/specialty-piping",
        items: [
          { title: "Grease Trap Installation", href: "/commercial/specialty-piping/grease-trap" },
          { title: "Industrial Pipe Installation and Repair", href: "/commercial/specialty-piping/industrial-pipe" },
        ]
      },
      {
        title: "Gas Plumbing",
        icon: "zap",
        href: "/commercial/gas-plumbing",
        items: [
          { title: "Gas Line Installation and Repair", href: "/commercial/gas-plumbing/gas-line" },
          { title: "Gas Leak Detection", href: "/commercial/gas-plumbing/leak-detection" },
        ]
      },
      {
        title: "Backflow Prevention",
        icon: "shield",
        href: "/commercial/backflow-prevention",
        items: [
          { title: "Backflow Testing and Certification", href: "/commercial/backflow-prevention/testing-certification" },
          { title: "Installation and Repair of Backflow Prevention Devices", href: "/commercial/backflow-prevention/device-installation" },
        ]
      },
    ]
  },
  {
    title: "Specialty Plumbing",
    href: "/specialty",
    categories: [
      {
        title: "Advanced Leak Detection",
        icon: "search",
        href: "/specialty/advanced-leak-detection",
        items: [
          { title: "Infrared Camera Leak Detection", href: "/specialty/advanced-leak-detection/infrared-camera" },
          { title: "Hydrostatic Pressure Testing", href: "/specialty/advanced-leak-detection/hydrostatic-pressure-testing" },
        ]
      },
      {
        title: "Hydro Jetting",
        icon: "zap",
        href: "/specialty/hydro-jetting",
        items: [
          { title: "High-Pressure Drain Cleaning for Tough Clogs", href: "/specialty/hydro-jetting/high-pressure-drain-cleaning" },
        ]
      },
      {
        title: "Sewer Line Services",
        icon: "pipette",
        href: "/specialty/sewer-line-services",
        items: [
          { title: "Trenchless Sewer Repair", href: "/specialty/sewer-line-services/trenchless-sewer-repair" },
          { title: "Pipe Bursting and Lining", href: "/specialty/sewer-line-services/pipe-bursting-lining" },
        ]
      },
      {
        title: "Emergency Plumbing",
        icon: "alert",
        href: "/specialty/emergency-plumbing",
        items: [
          { title: "24/7 Emergency Leak and Repair Services", href: "/specialty/emergency-plumbing/emergency-leak-repair" },
          { title: "Burst Pipe Response", href: "/specialty/emergency-plumbing/burst-pipe-response" },
        ]
      },
      {
        title: "Water Filtration",
        icon: "filter",
        href: "/specialty/water-filtration",
        items: [
          { title: "Whole-House Water Filtration Systems", href: "/specialty/water-filtration/whole-house-filtration" },
          { title: "Water Softener Installation", href: "/specialty/water-filtration/water-softener" },
        ]
      },
      {
        title: "Green Plumbing Solutions",
        icon: "leaf",
        href: "/specialty/green-plumbing",
        items: [
          { title: "Water Conservation Retrofits", href: "/specialty/green-plumbing/water-conservation-retrofits" },
          { title: "Solar Water Heater Installation", href: "/specialty/green-plumbing/solar-water-heater" },
        ]
      },
    ]
  },
  {
    title: "Maintenance Services",
    href: "/maintenance",
    categories: [
      {
        title: "Preventative Maintenance",
        icon: "clipboard",
        href: "/maintenance/preventative",
        items: [
          { title: "Regular Plumbing Inspections", href: "/maintenance/preventative/plumbing-inspections" },
          { title: "Water Heater Flushing and Maintenance", href: "/maintenance/preventative/water-heater-flushing" },
        ]
      },
      {
        title: "Drain and Sewer Maintenance",
        icon: "waves",
        href: "/maintenance/drain-sewer",
        items: [
          { title: "Routine Drain Cleaning", href: "/maintenance/drain-sewer/routine-drain-cleaning" },
          { title: "Scheduled Sewer Inspections", href: "/maintenance/drain-sewer/sewer-inspections" },
        ]
      },
      {
        title: "Leak Prevention",
        icon: "droplet",
        href: "/maintenance/leak-prevention",
        items: [
          { title: "Valve and Seal Checks", href: "/maintenance/leak-prevention/valve-seal-checks" },
          { title: "Pressure Testing for Pipes", href: "/maintenance/leak-prevention/pressure-testing" },
        ]
      },
      {
        title: "Gas System Maintenance",
        icon: "zap",
        href: "/maintenance/gas-system",
        items: [
          { title: "Annual Testing for Gas Appliances", href: "/maintenance/gas-system/annual-gas-testing" },
          { title: "Gas Line Inspection", href: "/maintenance/gas-system/gas-line-inspection" },
        ]
      },
      {
        title: "Appliance Maintenance",
        icon: "settings",
        href: "/maintenance/appliance",
        items: [
          { title: "Garbage Disposal Cleaning", href: "/maintenance/appliance/garbage-disposal-cleaning" },
          { title: "Dishwasher Plumbing Checks", href: "/maintenance/appliance/dishwasher-plumbing-checks" },
        ]
      },
    ]
  },
]
