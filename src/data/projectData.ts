
import type { WorkflowStep, AssessmentDimension } from '../types/index.ts';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 'STEP 01',
    number: '01',
    title: 'Select repository',
    description: 'The user enters or selects a public infrastructure repository address.',
    detail: 'Input public cloud infrastructure repositories for evaluation against reproducible evidence criteria.',
  },
  {
    step: 'STEP 02',
    number: '02',
    title: 'Analyze repository',
    description: 'The system evaluates public repository activity and relevant project evidence.',
    detail: 'Examines verifiable repository timelines, commit sequences, and project lifecycle markers.',
  },
  {
    step: 'STEP 03',
    number: '03',
    title: 'Characterize maintenance',
    description: 'The workflow considers maintainer distribution and release history.',
    detail: 'Analyzes distribution of maintenance workload rather than aggregate contributor counts.',
  },
  {
    step: 'STEP 04',
    number: '04',
    title: 'Evaluate sustainability',
    description: 'Sustainability indicators are evaluated independently of popularity signals.',
    detail: 'Separates public adoption/star volume from operational continuity and governance longevity.',
  },
  {
    step: 'STEP 05',
    number: '05',
    title: 'Support adoption decision',
    description: 'The integrated system predicts maintenance continuity for infrastructure adoption decisions.',
    detail: 'Provides traceable evidence for technical evaluation committees and platform engineering teams.',
  },
];

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
