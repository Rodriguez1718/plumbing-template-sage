// ===========================================
// SITE CONFIGURATION
// Data is loaded from src/data/settings/site.json
// Edit the JSON file to update site configuration
// All components will automatically use these values
// ===========================================

import siteData from "../data/settings/site.json"

export const siteConfig = siteData

// Helper to get location-aware text
export function getLocationText(text: string): string {
  if (!text) return ""
  return text
    .replaceAll("{city}", siteConfig.location?.city ?? "")
    .replaceAll("{state}", siteConfig.location?.state ?? "")
    .replaceAll("{business}", siteConfig.business?.name ?? "")
    .replaceAll("{fullName}", siteConfig.business?.fullName ?? "")
    .replaceAll("{phone}", siteConfig.contact?.phoneFormatted ?? "")
    .replaceAll("{phoneRaw}", siteConfig.contact?.phone ?? "")
    .replaceAll("{email}", siteConfig.contact?.email ?? "")
    .replaceAll("{address}", siteConfig.location?.fullAddress ?? "")
}

// Process an array of strings through getLocationText
export function processLocationArray(arr: string[]): string[] {
  return arr.map(getLocationText)
}
