
export interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
  type: "info" | "questions" | "howItWorks" | "auth" | "ready";
  questions?: {
    question: string;
    options: string[];
  }[];
  plans?: {
    name: string;
    price: string;
    interval: string;
    features: string[];
    recommended?: boolean;
    discount?: string;
  }[];
}
