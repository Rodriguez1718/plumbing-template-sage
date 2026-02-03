// ===========================================
// SITE CONFIGURATION
// Update this file with client information
// All components will automatically use these values
// ===========================================

export const siteConfig = {
  // Business Information
  business: {
    name: "Dealer Template",
    fullName: "John Doe",
    tagline: "Premium Marketing Solutions",
    description: "Local Advertising and Digital Marketing Pros",
  },

  // Location
  location: {
    city: "Denver",
    state: "Colorado",
    address: "123 Main Street",
    fullAddress: "123 Main St, Denver, CO 80202",
  },

  // Contact
  contact: {
    email: "hello@acmeinc.com",
    phone: "3035551234",
    phoneFormatted: "(303) 555-1234",
  },

  // Brand Colors (used in CSS variables)
  colors: {
    primary: "#110133",      // Most dominant - buttons, headers, main accents
    secondary: "#00918E",    // Semi dominant - secondary buttons, highlights
    tertiary: "#4DD599",     // Subtle accent
    quaternary: "#FFDC34",   // Subtle accent
  },

  // Logo
  logo: {
    src: "https://ntv-template-1.vercel.app/logo/dealer-logo.avif",
    alt: "Acme Inc. Logo",
  },

  // Social Media (optional)
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },

  // SEO
  seo: {
    siteName: "Acme Inc.",
    defaultTitle: "Acme Inc. | Digital Marketing in Denver",
    defaultDescription: "Denver's trusted digital marketing agency. Indoor billboard ads, web design, PPC, social media & Connected TV. Free consultation!",
    keywords: "digital marketing Denver, local advertising Denver, indoor billboard advertising, website design Denver, PPC advertising, social media management, Connected TV advertising, OTT ads, geofencing, local SEO Denver",
    siteUrl: "https://acmeinc.com", // Update with actual domain
    ogImage: "https://acmeinc.com/og-image.jpg", // Update with actual OG image
    twitterHandle: "@acmeinc",
  },

  // Template Info
  template: {
    id: "8",
    name: "Progressive Section Layout",
  },
}

// Helper to get location-aware text
export function getLocationText(text: string) {
  return text
    .replaceAll("{city}", siteConfig.location.city)
    .replaceAll("{state}", siteConfig.location.state)
    .replaceAll("{business}", siteConfig.business.name)
}
