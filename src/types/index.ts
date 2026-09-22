/* ==========================================================================
   InfraMaturity - TypeScript Domain Models & Interfaces
   Supports live GitHub API integration, real sustainability analysis,
   and Firebase authentication models.
   ========================================================================== */

export type AssessmentStatus =
  | 'not_assessed'
  | 'analyzing'
  | 'available'
  | 'insufficient_evidence'
  | 'unavailable'
  | 'needs_review';

export interface GitHubContributor {
  login: string;
  contributions: number;
  sharePercentage: number;
  avatarUrl: string;
  htmlUrl: string;
}

export interface GitHubReleaseItem {
  id: number;
  tagName: string;
  name: string;
  publishedAt: string;
  daysAgo: number;
  htmlUrl: string;
  isPrerelease: boolean;
}

export interface MaintainerDistributionAnalysis {
  totalContributorsSampled: number;
  topContributors: GitHubContributor[];
  top3SharePercentage: number;
  concentrationRisk: 'Low Concentration' | 'Moderate Concentration' | 'High Concentration';
  summary: string;
}

export interface ReleaseContinuityAnalysis {
  totalReleasesFound: number;
  latestRelease: GitHubReleaseItem | null;
  averageIntervalDays: number;
  cadenceStability: 'Continuous & Predictable' | 'Moderate Cadence' | 'Infrequent' | 'No Official Releases';
  releasesList: GitHubReleaseItem[];
  summary: string;
}

export interface RepositoryActivityAnalysis {
  openIssuesCount: number;
  starsCount: number;
  forksCount: number;
  defaultBranch: string;
  pushedAt: string;
  daysSinceLastPush: number;
  activityState: 'Actively Maintained' | 'Moderate Maintenance' | 'Low Activity / Dormant';
  summary: string;
}

export interface GovernanceAnalysis {
  licenseName: string;
  licenseSpdxId: string;
  ownerType: 'Organization' | 'User';
  hasReleases: boolean;
  summary: string;
}

export interface CalculatedIndicator {
  id: string;
  name: string;
  score: number; // 0 - 100
  rating: 'Strong' | 'Adequate' | 'Attention Needed' | 'High Risk';
  evidence: string;
  scope: string;
}

export interface RealAssessmentResult {
  repositoryId: string;
  owner: string;
  name: string;
  url: string;
  description: string;
  language: string;
  status: AssessmentStatus;
  analyzedAt: string;

  maintainerDistribution: MaintainerDistributionAnalysis;
  releaseContinuity: ReleaseContinuityAnalysis;
  repositoryActivity: RepositoryActivityAnalysis;
  governance: GovernanceAnalysis;

  sustainabilityIndicators: CalculatedIndicator[];
  maintenanceContinuity: {
    score: number;
    status: 'High Continuity' | 'Moderate Continuity' | 'Continuity at Risk' | 'Stalled / Dormant';
    explanation: string;
  };
  adoptionAssessment: {
    recommendation: 'Recommended for Adoption' | 'Adoption with Precaution' | 'Elevated Maintenance Risk';
    verdict: string;
    keyObservations: string[];
  };
}

export interface Repository {
  id: string;
  owner: string;
  name: string;
  url: string;
  description?: string;
  language?: string;
  searchedAt: string;
  lastViewedAt?: string;
}

export interface Assessment {
  repositoryId: string;
  status: AssessmentStatus;
  analyzedAt?: string;
  data?: RealAssessmentResult;
  notes?: string;
}

export interface User {
  id: string;
  uid?: string; // Firebase UID compatibility
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  organization?: string;
  role?: string;
  createdAt: string;
}

export interface UserProfileUpdate {
  name: string;
  email: string;
  username?: string;
  organization?: string;
}

export interface RepositoryHistoryItem {
  id: string;
  repositoryUrl: string;
  owner: string;
  repositoryName: string;
  searchedAt: string;
  lastViewedAt?: string;
  status: AssessmentStatus;
  language?: string;
  description?: string;
  assessmentData?: RealAssessmentResult;
}

export interface SavedRepositoryItem {
  id: string;
  repositoryUrl: string;
  owner: string;
  repositoryName: string;
  savedAt: string;
  lastAssessmentDate?: string;
  status: AssessmentStatus;
  language?: string;
  description?: string;
}

export interface WorkflowStep {
  step: string;
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface AssessmentDimension {
  id: string;
  name: string;
  shortDescription: string;
  scope: string;
  statusPlaceholder: string;
}
