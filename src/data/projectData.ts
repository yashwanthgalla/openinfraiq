
import type { WorkflowStep, AssessmentDimension } from '../types/index.ts';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 'STAGE 01',
    number: '01',
    title: 'Repository Ingestion & Telemetry Harvesting',
    description: 'Real-time telemetry extraction from public GitHub repositories via verified backend APIs.',
    detail: 'Harvests commit timelines, pull request review latency, issue closure velocity, release cadences, and maintainer distribution topologies.',
  },
  {
    step: 'STAGE 02',
    number: '02',
    title: 'Deterministic 9 Core Sustainability Metrics',
    description: 'Empirical calculation of 9 fundamental maintenance health indicators benchmarked against industry standards.',
    detail: 'Evaluates Bus Factor, Release Cadence Stability, Commit Velocity, Maintainer Active Ratio, Issue Latency, PR Turnaround, Governance Health, Dependency Freshness, and Popularity Divergence.',
  },
  {
    step: 'STAGE 03',
    number: '03',
    title: 'ML Predictive Continuity Modeling',
    description: 'Supervised machine learning ensemble predicting 12-month maintenance continuity trajectories.',
    detail: 'Calibrated against historical open-source projects that previously stalled or transitioned, providing empirical confidence intervals.',
  },
  {
    step: 'STAGE 04',
    number: '04',
    title: 'Google Gemini 3.5 Flash AI Architectural Reasoning',
    description: 'Deep qualitative analysis powered by Google Gemini (gemini-3.5-flash).',
    detail: 'Performs semantic architectural evaluation, cloud-native readiness analysis, community sentiment triage, and zero-hallucination adoption verdicts.',
  },
  {
    step: 'STAGE 05',
    number: '05',
    title: 'Adoption Decision Dossier & CSV Audit Export',
    description: 'Actionable intelligence synthesis with complete telemetry audit download.',
    detail: 'Delivers a transparent scoring breakdown, divergence matrix distinguishing vanity stars from operational health, and single-click CSV export for technical review committees.',
  },
];

export const GEMINI_AI_CONFIG = {
  brandName: 'Google Gemini',
  role: 'Cognitive Reasoning Engine & Qualitative Intelligence',
  primaryModel: 'gemini-3.5-flash',
  backupModel: 'gemini-2.5-flash',
  description:
    'Google Gemini powers OpenInfraIQ as our core qualitative intelligence engine, bridging the gap between raw quantitative repository telemetry and strategic architectural adoption decisions.',
  highlights: [
    {
      title: 'Architectural Pattern & Cloud-Native Assessment',
      detail:
        'Analyzes project dependencies, IaC structure, Kubernetes integration, and multi-cloud resilience without fabricating unevidenced technologies.',
    },
    {
      title: 'Natural Language Project Requirement Matching',
      detail:
        'Deconstructs unstructured engineering problem statements into structured technology vectors (cloud providers, compliance, languages, complexity) to recommend ideal candidate repositories.',
    },
    {
      title: 'Community Sentiment & Burnout Detection',
      detail:
        'Triages recent issue threads, maintainer responses, and PR discourse to detect early signs of maintainer fatigue or community fragmentation.',
    },
    {
      title: 'Evidence-Bounded Zero-Hallucination Guardrails',
      detail:
        'Strictly binds all qualitative reasoning to deterministic GitHub signals, ensuring every conclusion is auditable and grounded in empirical data.',
    },
  ],
  capabilities: [
    'Sub-second inference with Google DeepMind state-of-the-art Flash architectures',
    'Massive context window handling extensive commit logs and release manifests',
    'Structured JSON schema enforcement ensuring deterministic integration with Spring Boot',
    'Multi-dimensional scoring calibration (Match % + Sustainability % + Tech Fit %)',
  ],
};

export const AI_AMBASSADOR_GEMINI = GEMINI_AI_CONFIG;

export const WHY_SUSTAINABILITY_MATTERS = [
  {
    index: '01',
    title: 'Popularity signals',
    summary:
      'Stars and activity can provide useful context, but they are not sufficient by themselves to establish maintenance sustainability.',
    explanation:
      'A repository with tens of thousands of stars may rely entirely on an overburdened solo maintainer or lack predictable release discipline when critical security vulnerabilities emerge.',
  },
  {
    index: '02',
    title: 'Maintainer distribution',
    summary:
      'Understanding how maintenance responsibility is distributed is part of the project’s reference analysis.',
    explanation:
      'Evaluating concentration of review, commit, and release responsibilities helps identify structural maintenance vulnerabilities before infrastructure adoption.',
  },
  {
    index: '03',
    title: 'Release continuity',
    summary:
      'Release history provides evidence that can be characterized as part of the reproducible reference.',
    explanation:
      'Consistent patch frequency, long-term support windows, and predictable major releases offer stronger operational assurance than transient spikes in commit activity.',
  },
  {
    index: '04',
    title: 'Evidence-based adoption',
    summary:
      'The intended result is to support infrastructure adoption decisions using sustainability indicators independent of popularity.',
    explanation:
      'Engineering teams need reproducible, traceable indicators when deciding whether an emerging component can be safely anchored into production architecture.',
  },
];

export const SUSTAINABILITY_DIMENSIONS: AssessmentDimension[] = [
  {
    id: 'maintainer-distribution',
    name: 'Maintainer Distribution & Concentration',
    shortDescription: 'Evaluation of review and commit dispersion across maintainer groups',
    scope:
      'Quantifies maintenance concentration across core maintainers versus transient contributors, assessing structural bus factor risk.',
    statusPlaceholder: 'Awaiting maintainer topology characterization',
  },
  {
    id: 'release-continuity',
    name: 'Release Continuity & Cadence Stability',
    shortDescription: 'Longitudinal analysis of version releases, security patches, and cycles',
    scope:
      'Tracks cadence stability over rolling multi-year windows to differentiate continuous release discipline from sporadic bursts.',
    statusPlaceholder: 'Awaiting release history baseline analysis',
  },
  {
    id: 'activity-responsiveness',
    name: 'Repository Activity Dynamics',
    shortDescription: 'Turnaround latency on issue triage, pull review, and patch cycles',
    scope:
      'Evaluates whether maintainers actively sustain triage latency across quarters or if maintenance backlog is expanding.',
    statusPlaceholder: 'Awaiting activity dynamics characterization',
  },
  {
    id: 'governance-provenance',
    name: 'Governance & Evidence Provenance',
    shortDescription: 'Assessment of organizational diversity and versioned evidence trails',
    scope:
      'Considers organizational sponsorship diversity, foundation governance, and reproducible build artifact provenance.',
    statusPlaceholder: 'Awaiting governance and provenance verification',
  },
];

export const RESEARCH_METHODOLOGY = {
  problemStatement:
    'Infrastructure adoption decisions can rely heavily on signals such as stars and release cadence, while those signals alone may not establish whether a project will remain maintained when a security or operational issue occurs.',
  validationPhilosophy:
    'The evaluation framework is designed around validation against repositories that later stalled. Historical backtesting against known abandoned or transitioned open-source infrastructure projects ensures indicators reflect genuine continuity risk rather than transient slowdowns.',
  evidencePrinciples: [
    {
      title: 'Evidence Provenance',
      description: 'Every observation must originate from verifiable, public repository historical data.',
    },
    {
      title: 'Versioned Project Inputs',
      description: 'Assessments are bounded to explicit commit snapshots and release points.',
    },
    {
      title: 'Reproducible Analysis',
      description: 'Independent reviewers can reproduce identical characterizations from public artifacts.',
    },
    {
      title: 'Condition-Wise Evaluation',
      description: 'Accounts for organizational sponsorship, project age, and infrastructure domain tier.',
    },
  ],
};
