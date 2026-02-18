SITE.TS FILE --

// ===========================================
// SITE CONFIGURATION
// Update this file with client information
// All components will automatically use these values
// ===========================================

export const siteConfig = {
  // Business Information
  business: {
    name: "Dealer Template",
    fullName: "ABC Company Heating and Cooling",
    tagline: "Heating and Cooling",
    description: "Professional HVAC Services",
  },

  // Location
  location: {
    city: "New York",
    state: "SC",
    address: "3648 Rorance Road",
    fullAddress: "3648 Rorance Road, New York, SC 29170",
  },

  // Contact
  contact: {
    email: "dealer@domain.com",
    phone: "0123456789",
    phoneFormatted: "012-345-6789",
  },

  // Brand Colors (used in CSS variables)
  colors: {
    primary: "#000001",      // Most dominant - text, headers
    secondary: "#674188",    // Semi dominant - buttons, highlights, accent
    tertiary: "#ece9f9",     // Subtle accent - muted backgrounds
    quaternary: "#faf9fe",   // Subtle accent - page background
    accent: "#2264ac",       // Secondary accent - darkish blue
  },

  // Logo
  logo: {
    src: "/images/dealer-logo-96.webp",
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
export function getLocationText(text: string): string {
  return text
    .replaceAll("{city}", siteConfig.location.city)
    .replaceAll("{state}", siteConfig.location.state)
    .replaceAll("{business}", siteConfig.business.name)
    .replaceAll("{fullName}", siteConfig.business.fullName)
}

// Process an array of strings through getLocationText
export function processLocationArray(arr: string[]): string[] {
  return arr.map(getLocationText)
}


MDX FILE --

---
title: "AC Repair"
description: "Fast, reliable AC repairs to restore comfort and efficiency in your home. Expert AC repair services in {city}."
---

import HeroPage from "@/components/sections/HeroPage.astro"
import PlaceholderContentSection from "@/components/sections/PlaceholderContentSection.astro"
import PromoTilesSection from "@/components/sections/PromoTilesSection.astro"
import FAQSection from "@/components/sections/FAQSection.astro"
import FinancingPlansSection from "@/components/sections/FinancingPlansSection.astro"
import ServiceAreaSection from "@/components/sections/ServiceAreaSection.astro"
import CTAStrip from "@/components/sections/CTAStrip.astro"

<HeroPage
  title="AC Repair"
  subtitle="Fast, reliable AC repairs for your home."
  buttonText="SCHEDULE SERVICE"
  buttonHref="/contact"
  backgroundImage="https://aonecoolingsolution.in/wp-content/uploads/2025/02/split-ac-service-Sfastservices.jpg"
  image="/images/bg2.jpg"
  imageAlt="AC repair technician"
/>

<PlaceholderContentSection
  title="TO BE DETERMINED"
  subtitle="BASED ON THE CLIENT DISCOVERY CONVERSATION"
/>

<PromoTilesSection
  tiles={[
    {
      type: "maintenance",
      title: "{business}\nMAINTENANCE PLAN",
      priceLabel: ["STARTING AS LOW AS", "$14.33", "PER MONTH"],
      buttonText: "BOOK NOW",
      bgImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
    },
    {
      type: "financing",
      headline: ["NO INTEREST", "NO PAYMENTS", "UNTIL 2026"],
      subtext: "*WITH APPROVED FINANCING",
      buttonText: "LEARN MORE",
      buttonHref: "/financing",
      bgImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"
    },
    {
      type: "emergency",
      discount: "$95",
      subheadline: ["FURNACE", "TUNE-UP"],
      buttonText: "BOOK NOW",
      bgImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80"
    }
  ]}
/>

<FAQSection
  title="Frequently Asked Questions about AC Repair in {city}"
  faqs={[
    {
      question: "How much does AC repair typically cost?",
      answer: "AC repair costs vary depending on the issue, but most repairs range from $150 to $600. We provide upfront pricing before any work begins."
    },
    {
      question: "How do I know if my AC can be repaired or needs replacement?",
      answer: "If your system is over 10-15 years old, requires frequent repairs, or uses R-22 refrigerant, replacement may be more cost-effective. Our technicians will assess your unit and provide honest recommendations."
    },
    {
      question: "How long does an AC repair take?",
      answer: "Most AC repairs are completed within 1-2 hours. More complex issues may take longer, but we'll keep you informed throughout the process."
    }
  ]}
/>

<FinancingPlansSection
  title="Related Services"
  variant="services"
  items={[
    { title: "AC Tune-Up / Maintenance", href: "/air-conditioning/ac-tune-up-maintenance", image: "https://ucarecdn.com/904d12f4-36c2-4c11-99c9-c22ebbc905fe/-/preview/600x400/" },
    { title: "Thermostats", href: "/air-conditioning/thermostats", image: "https://ucarecdn.com/b2b720dc-bf04-4366-a627-124001e3746e/-/preview/600x400/" },
    { title: "Heating Services", href: "/heating", image: "https://ucarecdn.com/075a53c5-b442-4211-bd8d-baf6977b3f87/-/preview/600x400/" },
    { title: "Emergency HVAC Services", href: "/emergency", image: "https://ucarecdn.com/f0f1f6f3-d381-4c74-8d86-0a5cb24648f0/-/preview/600x400/" }
  ]}
/>

<ServiceAreaSection
  title="Service Areas for HVAC Services in {city}"
  description="We proudly serve homes and businesses across all {city} boroughs, providing expert HVAC services wherever you need us."
  areas={["Manhattan", "Queens", "Brooklyn", "The Bronx", "Staten Island"]}

  buttonText="SERVICE AREAS"
  buttonHref="/service-areas"
/>

<CTAStrip
  buttonText="SCHEDULE NOW!"
  buttonHref="/contact"
  phoneLabel="CALL OR TEXT FOR GREAT SERVICE"
  features={[
    { icon: "siren", text: "24/7 Emergency Services" },
    { icon: "award", text: "Experienced and Certified Technicians" }
  ]}
/>

COMPONENT/ASTRO FILE --

---
import { getLocationText } from "@/config/site"

interface FAQItem {
  question: string;
  answer?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  badge?: string;
  faqs: FAQItem[];
}

const { title: rawTitle, subtitle: rawSubtitle, badge = "FAQ", faqs: rawFaqs } = Astro.props;

const title = getLocationText(rawTitle);
const subtitle = rawSubtitle ? getLocationText(rawSubtitle) : undefined;
const faqs = rawFaqs.map(faq => ({
  ...faq,
  question: getLocationText(faq.question),
  answer: faq.answer ? getLocationText(faq.answer) : undefined,
}));
---

<section class="faq-section py-20 md:py-28">
  <div class="container mx-auto px-4">

    <!-- Header -->
    <div class="text-center mb-14" data-animate="fade-up">
      <div class="faq-badge-row">
        <span class="faq-accent-line"></span>
        <span class="faq-badge">{badge}</span>
        <span class="faq-accent-line"></span>
      </div>
      <h2 class="faq-title">{title}</h2>
      {subtitle && <p class="faq-subtitle">{subtitle}</p>}
    </div>

    <!-- Two-column layout: left decorative, right accordion -->
    <div class="faq-layout">

      <!-- Left: decorative panel -->
      <div class="faq-side" data-animate="fade-up">
        <div class="faq-side-card">
          <div class="faq-side-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3 class="faq-side-heading">Have Questions?</h3>
          <p class="faq-side-text">
            We're here to help. If you don't find your answer below, reach out to our team directly.
          </p>
          <a href="/contact" class="faq-side-btn">
            Contact Us
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <!-- Decorative circle -->
          <div class="faq-side-circle" aria-hidden="true"></div>
        </div>
      </div>

      <!-- Right: accordion -->
      <div class="faq-list" data-animate-stagger>
        {faqs.map((faq, index) => (
          <div class="faq-item">
            <button
              class="faq-trigger"
              aria-expanded="false"
              aria-controls={`faq-panel-${index}`}
              id={`faq-btn-${index}`}
            >
              <span class="faq-number">{String(index + 1).padStart(2, '0')}</span>
              <span class="faq-question">{faq.question}</span>
              <span class="faq-chevron">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </span>
            </button>
            {faq.answer && (
              <div
                class="faq-panel"
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-btn-${index}`}
              >
                <div class="faq-answer">{faq.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<script>
  function initFAQ() {
    document.querySelectorAll<HTMLElement>('.faq-item').forEach((item) => {
      const trigger = item.querySelector<HTMLButtonElement>('.faq-trigger');
      const panel = item.querySelector<HTMLElement>('.faq-panel');
      if (!trigger || !panel) return;
      if (trigger.dataset.init === 'true') return;
      trigger.dataset.init = 'true';

      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Close all others
        document.querySelectorAll<HTMLElement>('.faq-item').forEach((other) => {
          const otherTrigger = other.querySelector<HTMLButtonElement>('.faq-trigger');
          const otherPanel = other.querySelector<HTMLElement>('.faq-panel');
          if (otherTrigger && otherPanel && other !== item) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            other.classList.remove('is-open');
            otherPanel.style.maxHeight = '0';
          }
        });

        // Toggle current
        if (isOpen) {
          trigger.setAttribute('aria-expanded', 'false');
          item.classList.remove('is-open');
          panel.style.maxHeight = '0';
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          item.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  initFAQ();
  document.addEventListener('astro:page-load', initFAQ);
</script>

<style>
  .faq-section {
    background: var(--background);
  }

  /* Header */
  .faq-badge-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .faq-accent-line {
    width: 2.5rem;
    height: 3px;
    border-radius: 2px;
    background: var(--brand-secondary);
  }
  .faq-badge {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--brand-secondary);
  }
  .faq-title {
    color: var(--foreground);
    line-height: 1.15;
    margin-bottom: 0.75rem;
  }
  .faq-subtitle {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--muted-foreground);
    max-width: 40rem;
    margin: 0 auto;
  }

  /* Layout */
  .faq-layout {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    max-width: 72rem;
    margin: 0 auto;
    align-items: start;
  }

  /* Side card */
  .faq-side-card {
    position: relative;
    overflow: hidden;
    background: linear-gradient(160deg, var(--brand-secondary) 0%, color-mix(in srgb, var(--brand-secondary) 60%, black) 100%);
    border-radius: 1.5rem;
    padding: 2.5rem 2rem;
    color: #fff;
    box-shadow: 0 12px 40px color-mix(in srgb, var(--brand-secondary) 25%, transparent);
  }
  .faq-side-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  .faq-side-heading {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }
  .faq-side-text {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 2rem;
  }
  .faq-side-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #fff;
    color: var(--brand-secondary);
    padding: 0.75rem 1.75rem;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.95rem;
    text-decoration: none;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
  .faq-side-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  }
  .faq-side-btn svg {
    transition: transform 0.3s;
  }
  .faq-side-btn:hover svg {
    transform: translateX(4px);
  }
  .faq-side-circle {
    position: absolute;
    bottom: -2rem;
    right: -2rem;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* Accordion list */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .faq-item {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 1rem;
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .faq-item:hover {
    border-color: color-mix(in srgb, var(--brand-secondary) 40%, transparent);
  }
  .faq-item.is-open {
    border-color: var(--brand-secondary);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--brand-secondary) 8%, transparent);
  }

  .faq-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s;
  }
  .faq-trigger:hover {
    background: color-mix(in srgb, var(--brand-tertiary) 40%, transparent);
  }

  .faq-number {
    font-family: 'CraftGothic Extended', 'CraftGothic', system-ui, sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: var(--brand-secondary);
    flex-shrink: 0;
    width: 2rem;
  }

  .faq-question {
    flex: 1;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--foreground);
    line-height: 1.35;
  }

  .faq-chevron {
    flex-shrink: 0;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--brand-secondary) 10%, transparent);
    color: var(--brand-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s, background 0.3s, color 0.3s;
  }
  .faq-item.is-open .faq-chevron {
    background: var(--brand-secondary);
    color: #fff;
    transform: rotate(45deg);
  }

  /* Panel */
  .faq-panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .faq-answer {
    padding: 0 1.5rem 1.5rem 4.5rem;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--muted-foreground);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .faq-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .faq-side-card {
      text-align: center;
    }
    .faq-side-icon {
      margin: 0 auto 1.5rem;
    }
    .faq-answer {
      padding-left: 1.5rem;
    }
  }
</style>
