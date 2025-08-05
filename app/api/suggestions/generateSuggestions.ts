// /app/api/suggestions/generateSuggestions.ts

export type Suggestion = {
  label: string;
  impact: "High" | "Medium" | "Low";
  seoBoost: string;
};

export type AuditData = {
  pageSpeed?: number;
  metaDescriptions?: { missing: number };
  coreWebVitals?: { score: number };
  titles?: { weakCount: number };
  schema?: { missing: boolean };
};

// Centralized thresholds for logic
const thresholds = {
  pageSpeed: 80,
  coreWebVitals: 90,
};

// Centralized SEO boost values
const seoBoosts = {
  pageSpeed: "+15%",
  metaDescriptions: "+8%",
  coreWebVitals: "+12%",
  titles: "+6%",
  schema: "+5%",
};

export function generateSuggestions(data: AuditData): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // 1. Fix Page Speed
  if (typeof data.pageSpeed === "number" && data.pageSpeed < thresholds.pageSpeed) {
    suggestions.push({
      label: "Fix Page Speed",
      impact: "High",
      seoBoost: seoBoosts.pageSpeed,
    });
  }

  // 2. Add Meta Descriptions
  if (!data.metaDescriptions || data.metaDescriptions.missing > 0) {
    suggestions.push({
      label: "Add Meta Descriptions",
      impact: "Medium",
      seoBoost: seoBoosts.metaDescriptions,
    });
  }

  // 3. Improve Core Web Vitals
  if (!data.coreWebVitals || data.coreWebVitals.score < thresholds.coreWebVitals) {
    suggestions.push({
      label: "Improve Core Web Vitals",
      impact: "High",
      seoBoost: seoBoosts.coreWebVitals,
    });
  }

  // 4. Write Better Titles
  if (!data.titles || data.titles.weakCount > 0) {
    suggestions.push({
      label: "Write Better Titles",
      impact: "Medium",
      seoBoost: seoBoosts.titles,
    });
  }

  // 5. Add Schema Markup
  if (!data.schema || data.schema.missing) {
    suggestions.push({
      label: "Add Schema Markup",
      impact: "Low",
      seoBoost: seoBoosts.schema,
    });
  }

  return suggestions;
}
