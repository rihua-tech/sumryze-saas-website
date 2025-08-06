type Suggestion = {
  label: string;
  impact: string | null;
  seoBoost: string; // ✅ removed null
  display: string;
  color: string;
};

type AuditData = {
  pageSpeed?: number;
  coreWebVitals?: { score?: number };
  metaDescriptions?: { missing?: boolean };
  schema?: { missing?: boolean };
  titles?: { weakCount?: number };
};

export function generateSuggestions(data: AuditData): Suggestion[] {
  const isSlow = (data.pageSpeed ?? 100) < 70;
  const isCoreWebBad = (data.coreWebVitals?.score ?? 100) < 80;
  const metaMissing = data.metaDescriptions?.missing ?? false;
  const schemaMissing = data.schema?.missing ?? false;
  const weakTitles = (data.titles?.weakCount ?? 0) > 0;

  const suggestions: Suggestion[] = [
    {
      label: "Fix Page Speed",
      impact: isSlow ? "High" : null,
      seoBoost: isSlow ? "+15%" : "0%",
      display: isSlow ? "Needs Fix" : "Looks Good",
      color: isSlow ? "red" : "green",
    },
    {
      label: "Add Meta Descriptions",
      impact: metaMissing ? "Medium" : null,
      seoBoost: metaMissing ? "+8%" : "0%",
      display: metaMissing ? "Needs Fix" : "Looks Good",
      color: metaMissing ? "yellow" : "green",
    },
    {
      label: "Add Schema Markup",
      impact: schemaMissing ? "Low" : null,
      seoBoost: schemaMissing ? "+5%" : "0%",
      display: schemaMissing ? "Needs Fix" : "Looks Good",
      color: schemaMissing ? "blue" : "green",
    },
    {
      label: "Improve Core Web Vitals",
      impact: isCoreWebBad ? "High" : null,
      seoBoost: isCoreWebBad ? "+12%" : "0%",
      display: isCoreWebBad ? "Needs Fix" : "Looks Good",
      color: isCoreWebBad ? "red" : "green",
    },
    {
      label: "Write Better Titles",
      impact: weakTitles ? "Low" : null,
      seoBoost: weakTitles ? "+5%" : "0%",
      display: weakTitles ? "Needs Fix" : "Looks Good",
      color: weakTitles ? "blue" : "green",
    },
  ];

  return suggestions.sort((a, b) => {
    const boost = (s: Suggestion) => parseInt(s.seoBoost.replace("+", "").replace("%", "")) || 0;
    return boost(b) - boost(a);
  });
}
