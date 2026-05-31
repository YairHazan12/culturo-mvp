export type Role = "employee" | "admin";

export type Team =
  | "sales"
  | "partnerships"
  | "procurement"
  | "operations"
  | "executive"
  | "hr";

export type Country =
  | "us"
  | "ca"
  | "uk"
  | "de"
  | "fr"
  | "au"
  | "other";

export type Market = "CN" | "JP" | "KR" | "IN" | "AE" | "DE" | "BR";

export type Purpose =
  | "negotiation"
  | "first-meeting"
  | "supplier"
  | "partnership";

export type Experience = "beginner" | "intermediate" | "advanced";

export type RiskLevel = "low" | "moderate" | "elevated" | "high";

export type CultureStatus = "active" | "coming-soon";

export type Skill =
  | "trust-building"
  | "indirect-communication"
  | "negotiation-signals"
  | "hierarchy"
  | "saving-face"
  | "meeting-etiquette"
  | "follow-up-strategy";

export interface OnboardingAnswers {
  country: Country | null;
  market: Market | null;
  team: Team | null;
  purpose: Purpose | null;
  experience: Experience | null;
}

export interface PlaybookModule {
  slug: string;
  title: string;
  minutes: number;
  skill: Skill;
  image: string;
  imageAlt: string;
  situation: string;
  whatGoesWrong: string;
  meaningInChina: string;
  whatToSayInstead: string;
  dos: string[];
  donts: string[];
  quiz: {
    q: string;
    options: string[];
    correctIndex: number;
    why: string;
  }[];
  practiceScenarioId: string;
}

export interface Scenario {
  id: string;
  title: string;
  industry: string;
  difficulty: "Entry" | "Intermediate" | "Advanced";
  image: string;
  imageAlt: string;
  setup: string;
  partnerLine: string;
  context: string;
  options: {
    id: string;
    text: string;
    score: number;
    risk: RiskLevel;
    feedback: string;
  }[];
  bestResponse: string;
  bestResponseRationale: string;
  followUp: string;
  relatedModuleSlug: string;
  skill: Skill;
}

export interface Culture {
  code: string;
  name: string;
  flag: string;
  status: CultureStatus;
  tagline: string;
}

export interface ConceptCard {
  icon: string;
  title: string;
  body: string;
}

export interface ConceptModule {
  slug: string;
  title: string;
  subtitle: string;
  minutes: number;
  emoji: string;
  image: string;
  imageAlt: string;
  accent: "red" | "gold" | "navy";
  bigIdea: string;
  cards: ConceptCard[];
  mistakes: string[];
  tips: string[];
  takeaways: string[];
  scenario: {
    prompt: string;
    partnerLine: string;
    choices: { text: string; good: boolean; feedback: string }[];
  };
}

export interface SimStep {
  id: string;
  partnerLine: string;
  context: string;
  choices: {
    text: string;
    trust: number; // delta to trust score
    deal: number; // delta to deal score
    reply: string; // counterpart's reaction
    note: string; // coaching note
  }[];
}

export interface InteractiveScenario {
  id: string;
  title: string;
  industry: string;
  setup: string;
  steps: SimStep[];
  outcomes: {
    min: number; // min combined score for this outcome
    label: string;
    outcome: string;
    impact: string;
    cultural: string;
  }[];
}
