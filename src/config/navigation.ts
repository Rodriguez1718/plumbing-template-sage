export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

export interface ServiceCategory {
  title: string
  icon: string
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
  { title: "Contact Us", href: "/quote" },
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
    href: "/residential",
    categories: [
      {
        title: "Kitchen Plumbing",
        icon: "utensils",
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
        items: [
          { title: "Toilet Repair and Replacement", href: "/residential/bathroom/toilet" },
          { title: "Shower and Tub Installation/Repair", href: "/residential/bathroom/shower-tub" },
          { title: "Sink and Faucet Installation/Repair", href: "/residential/bathroom/sink-faucet" },
        ]
      },
      {
        title: "Leak",
        icon: "droplet",
        items: [
          { title: "Water Leak Detection", href: "/residential/leak/detection" },
          { title: "Slab Leak Repair", href: "/residential/leak/slab" },
          { title: "Sewer Odor Investigation", href: "/residential/leak/odor" },
        ]
      },
      {
        title: "Drain",
        icon: "waves",
        items: [
          { title: "Drain Cleaning", href: "/residential/drain/cleaning" },
          { title: "Sewer Line Repair and Replacement", href: "/residential/drain/sewer-line" },
        ]
      },
      {
        title: "Water Heaters",
        icon: "flame",
        items: [
          { title: "Standard Water Heater Repair and Replacement", href: "/residential/water-heaters/standard" },
          { title: "Tankless Water Heater Installation and Maintenance", href: "/residential/water-heaters/tankless" },
        ]
      },
      {
        title: "Piping",
        icon: "pipette",
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
        items: [
          { title: "Design and Installation for New Construction", href: "/commercial/building/new-construction" },
          { title: "Plumbing Fixture Installation", href: "/commercial/building/fixtures" },
        ]
      },
      {
        title: "Commercial Water Heaters",
        icon: "flame",
        items: [
          { title: "High-Capacity Water Heater Installation", href: "/commercial/water-heaters/high-capacity" },
          { title: "Tankless Water Heater Systems", href: "/commercial/water-heaters/tankless" },
        ]
      },
      {
        title: "Drain and Sewer Services",
        icon: "waves",
        items: [
          { title: "Sewer Camera Inspections", href: "/commercial/drain/camera" },
          { title: "Commercial Drain Cleaning", href: "/commercial/drain/cleaning" },
        ]
      },
      {
        title: "Specialty Piping",
        icon: "pipette",
        items: [
          { title: "Grease Trap Installation", href: "/commercial/piping/grease-trap" },
          { title: "Industrial Pipe Installation and Repair", href: "/commercial/piping/industrial" },
        ]
      },
      {
        title: "Gas Plumbing",
        icon: "zap",
        items: [
          { title: "Gas Line Installation and Repair", href: "/commercial/gas/installation" },
          { title: "Gas Leak Detection", href: "/commercial/gas/leak-detection" },
        ]
      },
      {
        title: "Backflow Prevention",
        icon: "shield",
        items: [
          { title: "Backflow Testing and Certification", href: "/commercial/backflow/testing" },
          { title: "Installation and Repair of Backflow Prevention Devices", href: "/commercial/backflow/installation" },
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
        items: [
          { title: "Infrared Camera Leak Detection", href: "/specialty/leak/infrared" },
          { title: "Hydrostatic Pressure Testing", href: "/specialty/leak/pressure-testing" },
        ]
      },
      {
        title: "Hydro Jetting",
        icon: "zap",
        items: [
          { title: "High-Pressure Drain Cleaning for Tough Clogs", href: "/specialty/hydro-jetting" },
        ]
      },
      {
        title: "Sewer Line Services",
        icon: "pipette",
        items: [
          { title: "Trenchless Sewer Repair", href: "/specialty/sewer/trenchless" },
          { title: "Pipe Bursting and Lining", href: "/specialty/sewer/pipe-bursting" },
        ]
      },
      {
        title: "Emergency Plumbing",
        icon: "alert",
        items: [
          { title: "24/7 Emergency Leak and Repair Services", href: "/specialty/emergency/leak-repair" },
          { title: "Burst Pipe Response", href: "/specialty/emergency/burst-pipe" },
        ]
      },
      {
        title: "Water Filtration",
        icon: "filter",
        items: [
          { title: "Whole-House Water Filtration Systems", href: "/specialty/filtration/whole-house" },
          { title: "Water Softener Installation", href: "/specialty/filtration/softener" },
        ]
      },
      {
        title: "Green Plumbing Solutions",
        icon: "leaf",
        items: [
          { title: "Water Conservation Retrofits", href: "/specialty/green/conservation" },
          { title: "Solar Water Heater Installation", href: "/specialty/green/solar" },
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
        items: [
          { title: "Regular Plumbing Inspections", href: "/maintenance/preventative/inspections" },
          { title: "Water Heater Flushing and Maintenance", href: "/maintenance/preventative/water-heater" },
        ]
      },
      {
        title: "Drain and Sewer Maintenance",
        icon: "waves",
        items: [
          { title: "Routine Drain Cleaning", href: "/maintenance/drain/cleaning" },
          { title: "Scheduled Sewer Inspections", href: "/maintenance/drain/inspections" },
        ]
      },
      {
        title: "Leak Prevention",
        icon: "droplet",
        items: [
          { title: "Valve and Seal Checks", href: "/maintenance/leak/valve-seal" },
          { title: "Pressure Testing for Pipes", href: "/maintenance/leak/pressure-testing" },
        ]
      },
      {
        title: "Gas System Maintenance",
        icon: "zap",
        items: [
          { title: "Annual Testing for Gas Appliances", href: "/maintenance/gas/testing" },
          { title: "Gas Line Inspection", href: "/maintenance/gas/inspection" },
        ]
      },
      {
        title: "Appliance Maintenance",
        icon: "settings",
        items: [
          { title: "Garbage Disposal Cleaning", href: "/maintenance/appliance/disposal" },
          { title: "Dishwasher Plumbing Checks", href: "/maintenance/appliance/dishwasher" },
        ]
      },
    ]
  },
]
