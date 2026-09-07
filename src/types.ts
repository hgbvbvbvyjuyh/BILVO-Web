export type TabType = 'home' | 'how-we-work' | 'live-demos' | 'testimonials' | 'why-bilvo';

export interface PrebuiltSolution {
  id: string;
  title: string;
  description: string;
  features: string[];
  specs: {
    language: string;
    throughput: string;
    efficiency: string;
  };
}

export interface PhaseInfo {
  phase: number;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  points: string[];
  metric?: {
    label: string;
    value: string;
  } | null;
  navTitle?: string;
}

export interface SystemItem {
  id: string;
  name: string;
  category: string;
  description: string;
  details: string[];
  inputs: string[];
  outputs: string[];
  metricLabel: string;
  metricValue: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarBlur: string;
  improvement: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
}

export interface ConsultationRequest {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyWebsite: string;
  role: string;
  companySize: string;
  annualRevenue: string;
  projectBudget: string;
  howCanWeHelp: string;
  aiGoals: string[];
  additionalNotes: string;
  // Backward compatibility
  name?: string;
  company?: string;
  needs?: string[];
  additionalInfo?: string;
  preferredDate?: string;
  preferredTime?: string;
}

// Interactive Simulation Types
export type TriggerType = 'webhook' | 'email' | 'transcript' | 'webhook_stripe';

export interface WorkflowTrigger {
  id: TriggerType;
  label: string;
  icon: string;
  description: string;
}

export type ActionType = 'ai_categorization' | 'crm_update' | 'email_draft' | 'calendar_schedule' | 'human_review';

export interface WorkflowAction {
  id: ActionType;
  label: string;
  description: string;
  status: 'idle' | 'processing' | 'completed' | 'failed';
}

export interface SimulationResult {
  stepsLog: string[];
  hoursSavedAnnually: number;
  costReductionPercent: number;
  throughputGain: string;
}
