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
  causalLink: string; // "Both sides agree this is rooted in..."
  israeli: Narrative;
  palestinian: Narrative;
}

export interface ConflictMeta {
  id: string;
  title: string;
  subtitle: string;
  dateRange: string;
  description: string;
  israeliContributors: number;
  palestinianContributors: number;
  independentReviewers: number;
  sideA: {
    label: string;
    adjective: string;
  };
  sideB: {
    label: string;
    adjective: string;
  };
}
