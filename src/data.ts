import { PrebuiltSolution, PhaseInfo, SystemItem, TestimonialItem, ValueItem } from './types';

export const PREBUILT_SOLUTIONS: PrebuiltSolution[] = [
  {
    id: 'lead-response',
    title: 'Intelligent Lead Capture & Automated Response',
    description: 'Accelerate your pipeline. Instantly qualify and route inbound leads, booking high-value meetings on your calendar 24/7 without manual intervention.',
    features: [
      'Eliminates response lag with real-time replies under 60 seconds',
      'Automates prospect qualification using custom business parameters',
      'Secures high-value sales pipelines from drop-offs and drop-outs'
    ],
    specs: {
      language: 'Revenue Operations',
      throughput: 'Real-Time Triage',
      efficiency: 'Zero Pipeline Friction'
    }
  },
  {
    id: 'ai-receptionist',
    title: 'Autonomous Voice Operations & Scheduling',
    description: 'Ensure 100% customer coverage. Answer complex inquiries, schedule high-intent consultations, and route critical escalations 24/7.',
    features: [
      'Provides instant resolution to inbound inquiries 24/7',
      'Coordinates with calendars to schedule meetings automatically',
      'Intelligently flags and routes escalations to key personnel'
    ],
    specs: {
      language: 'Voice Operations',
      throughput: 'Multi-Line Routing',
      efficiency: 'Instant Escalation Triage'
    }
  },
  {
    id: 'customer-support',
    title: 'Autonomous Customer Support & Ticketing Systems',
    description: 'Optimize operational efficiency. Instantly resolve routine inquiries, allowing support teams to focus on critical, complex client needs.',
    features: [
      'Resolves repetitive inquiries with high accuracy in seconds',
      'Orchestrates seamless hands-off to live support for complex issues',
      'Maintains client satisfaction levels with 24/7 availability'
    ],
    specs: {
      language: 'CX Systems',
      throughput: 'Instant Resolutions',
      efficiency: '70%+ Automated Resolution'
    }
  }
];

export const PHASES: PhaseInfo[] = [
  {
    phase: 1,
    navTitle: 'Discover & Diagnose',
    title: 'Discover & Diagnose',
    subtitle: 'STEP 01 • OPERATIONAL DISCOVERY',
    tagline: 'Understand fast, automate second.',
    description: '',
    image: '',
    points: [
      'We learn how your business actually works: goals, constraints, handoffs, and what a successful workflow looks like.',
      'We map your technology stack and identify where your data lives, including CRMs, inboxes, spreadsheets, internal tools, and other business systems.',
      'We audit your existing processes to uncover real bottlenecks and determine what should—and should not—be automated.'
    ],
    metric: null
  },
  {
    phase: 2,
    navTitle: 'Design, Build & Validate',
    title: 'Design, Build & Validate',
    subtitle: 'STEP 02 • SOLUTION DESIGN',
    tagline: 'Custom solutions, tested before launch.',
    description: '',
    image: '',
    points: [
      'We prioritize the highest-impact opportunities and determine where AI provides meaningful value.',
      'We design and build AI systems tailored to your business instead of relying on generic automations.',
      'We test the complete system using real-world scenarios, validate outputs, and refine every workflow before deployment.'
    ],
    metric: null
  },
  {
    phase: 3,
    navTitle: 'Launch, Monitor & Optimize',
    title: 'Launch, Monitor & Optimize',
    subtitle: 'STEP 03 • IMPLEMENTATION & OPTIMIZATION',
    tagline: 'Continuous improvement, not a one-off project.',
    description: '',
    image: '',
    points: [
      'We launch your automation with clear success metrics, monitoring, and operational safeguards.',
      'We continuously monitor system performance, gather feedback from your team, and quickly resolve any issues.',
      'We regularly improve prompts, workflows, logic, and AI models so your automation evolves alongside your business.'
    ],
    metric: null
  }
];

export const SYSTEM_ITEMS: SystemItem[] = [
  {
    id: 'sys-support',
    name: 'Autonomous Customer Support Engine',
    category: 'Customer Experience',
    description: 'Delivers immediate, high-accuracy customer service by resolving standard inquiries instantly, maintaining seamless escalations to live support for complex scenarios.',
    details: [
      'Enterprise guardrails and policy constraints ensure fully compliant, accurate messaging',
      'Natively integrates with Zendesk, Intercom, Salesforce, and proprietary helpdesks',
      'Intelligently parses sentiment to route high-value accounts directly to support leads'
    ],
    inputs: ['Inbound emails', 'Live chat requests', 'Customer interaction history'],
    outputs: ['Instant contextual resolution', 'Enriched customer profiles', 'Real-time escalation alerts'],
    metricLabel: 'Average Response Delay',
    metricValue: '99% reduction'
  },
  {
    id: 'sys-content',
    name: 'Automated Knowledge Amplification Engine',
    category: 'Marketing Operations',
    description: 'Transforms unstructured media assets (podcasts, keynotes, webinars) into structured multi-channel campaigns (newsletters, executive articles, social highlights) instantly.',
    details: [
      'Extracts key insights and structural themes directly from raw audio transcripts',
      'Formats production-ready material customized for channel-specific audiences',
      'Synthesizes and mirrors your exact corporate voice, vocabulary, and brand style'
    ],
    inputs: ['Raw webinar or event media', 'Executive interview recordings', 'Briefing papers'],
    outputs: ['Weekly newsletter publications', 'Polished editorial articles', 'Cohesive social summaries'],
    metricLabel: 'Content Velocity Increase',
    metricValue: '4.5x faster'
  },
  {
    id: 'sys-crm',
    name: 'Revenue Operations CRM Automation',
    category: 'Revenue Operations',
    description: 'Eliminates administrative data friction. Automatically parses call notes and emails to register, catalog, and synchronize stakeholder details directly into your CRM.',
    details: [
      'Identifies and extracts exact commitments, deliverables, and next-step actions from meetings',
      'Maintains complete dataset consistency across fragmented systems without manual entry',
      'Leverages deduplication logic to preserve CRM record integrity and database hygiene'
    ],
    inputs: ['Client meeting transcripts', 'Inbound email negotiations', 'Sales pipeline call records'],
    outputs: ['Synchronized CRM accounts', 'Automated meeting deliverables', 'Updated pipeline statuses'],
    metricLabel: 'Manual Data Entry Time',
    metricValue: '95% eliminated'
  },
  {
    id: 'sys-outreach',
    name: 'Intelligent B2B Pipeline Accelerator',
    category: 'Sales Development',
    description: 'Pinpoints high-value corporate targets and synthesizes hyper-personalized outreach strategies based on real-time market milestones and corporate triggers.',
    details: [
      'Cross-references professional profiles to target key executive decision-makers',
      'Crafts contextual outbound messaging aligned to recent target company milestones',
      'Automates meeting bookings instantly upon detecting positive response intent'
    ],
    inputs: ['Target account parameters', 'Market trigger events', 'Value proposition briefs'],
    outputs: ['Qualified prospect accounts', 'Contextual outreach drafts', 'Booked pipeline meetings'],
    metricLabel: 'Outbound Reply Rate',
    metricValue: '2.8x improvement'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'nick',
    quote: 'Rofiqul and the Bilvo Ai team engineered an automated onboarding framework that cut our setup time in half. They are exceptional systems partners who fundamentally understand enterprise efficiency.',
    author: 'Nick Sonnenberg',
    role: 'CEO, Author of "Come Up for Air"',
    company: 'Leverage',
    avatarBlur: 'bg-brand-blue/30',
    improvement: '50% reduction in setup time'
  },
  {
    id: 'erich',
    quote: 'Our custom content automation transformed monthly recordings into a highly engaging, continuous editorial presence. Audience reach surged without expanding our marketing staff.',
    author: 'Erich Rohn',
    role: 'Operations Director',
    company: 'Core Media Group',
    avatarBlur: 'bg-brand-purple/30',
    improvement: '140% growth in audience engagement'
  },
  {
    id: 'jim',
    quote: 'Automating CRM administrative work instantly cleared our sales pipeline visibility gaps. The operational return on investment was realized in less than 30 days.',
    author: 'Jim Hankins',
    role: 'VP of Strategic Systems',
    company: 'Enterprise Allied',
    avatarBlur: 'bg-brand-cyan/30',
    improvement: 'Full ROI in under 30 days'
  }
];

export const VALUES: ValueItem[] = [
  {
    id: 'det-excellence',
    title: 'Enterprise-Grade Reliability',
    description: 'Our automated systems operate with consistent precision 24/7. We establish robust policy guardrails, comprehensive testing suite protocols, and secure fail-safes so you can trust your core processes.'
  },
  {
    id: 'clean-int',
    title: 'Frictionless Software Integration',
    description: 'No need to migrate platforms or deal with disruptive software changes. We interface directly with your existing technology stack, ensuring real-time data synchronization with zero data leaks.'
  },
  {
    id: 'yield',
    title: 'Custom Operational Tailoring',
    description: 'We design bespoke automation architectures that conform precisely to your proprietary workflows, directly eliminating structural bottlenecks to maximize team productivity.'
  },
  {
    id: 'human',
    title: 'Intuitive Command & Control',
    description: 'Empower your operators. We deliver streamlined control panels and clear analytics dashboards, making it effortless for your team to govern and adjust workflows without writing code.'
  }
];
