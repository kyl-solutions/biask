export interface AgreedFact {
  text: string;
  status: "agreed" | "disputed";
}

export interface ContextBlock {
  text: string;
}

export interface Provenance {
  writtenBy: string;
  reviewedBy: string;
  reviewCount: number;
  revisions: number;
  lastUpdated: string;
}

export interface Narrative {
  title: string;
  body: string;
  context: ContextBlock;
  sources: string;
  provenance: Provenance;
}

export interface Beat {
  id: string;
  year: number;
  title: string;
  agreedFacts: AgreedFact[];
  bridgeStatement: string;
  causalLink: string;
  sideA: Narrative;
  sideB: Narrative;
}

export interface ConflictTheme {
  sideA: { bg: string; accent: string; prov: string };
  sideB: { bg: string; accent: string; prov: string };
}

export interface ConflictMeta {
  id: string;
  title: string;
  subtitle: string;
  dateRange: string;
  description: string;
  sideAContributors: number;
  sideBContributors: number;
  independentReviewers: number;
  sideA: {
    label: string;
    adjective: string;
  };
  sideB: {
    label: string;
    adjective: string;
  };
  theme: ConflictTheme;
}
