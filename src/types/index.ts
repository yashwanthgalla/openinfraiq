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

export type MetricRating = 'Strong' | 'Adequate' | 'Attention Needed' | 'High Risk';

export interface CoreSustainabilityMetricItem {
  id: string;
  order: number; // 1 to 9
  name: string; // e.g., 'Maintainer Concentration'
  category: 'Maintainership' | 'Development Activity' | 'Release Continuity' | 'Issue & PR Velocity' | 'Community Health';
  whatItMeasures: string; // verbatim from capstone requirement
  rawValue: string; // e.g., '36.4%'
  rawNumericValue: number;
  rawUnit: string;
  normalizedScore: number; // 0 - 100
  weight: number; // e.g. 0.12 (12%)
  weightedScore: number; // normalizedScore * weight
  rating: MetricRating;
  benchmark: string;
  formula: string;
  evidence: string;
  scope: string;
  iconName: string;
}

export interface SupportingRepositoryData {
  stars: number;
  forks: number;
  watchers: number;
  repositoryAgeDays: number;
  repositoryAgeFormatted: string;
  totalContributors: number;
  openIssues: number;
  repositoryLanguage: string;
  license: string;
  spdxId: string;
  lastActivityDate: string;
  lastActivityDaysAgo: number;
  commitHistorySampleCount: number;
  releaseHistoryCount: number;
  isArchived: boolean;
  defaultBranch: string;
  ownerType: 'Organization' | 'User';
}

export interface PopularityMetricsData {
  stars: number;
  forks: number;
  watchers: number;
  popularityScore: number; // 0 - 100 benchmarked
  popularityTier: 'Massive Visibility' | 'High Recognition' | 'Moderate Visibility' | 'Niche / Emerging';
  divergenceAnalysis: string;
}

export interface ScoringBreakdownData {
  compositeScore: number; // 0 - 100
  totalWeightsPercent: number; // 100%
  formulaString: string;
  methodologyNotes: string[];
  dimensionWeights: {
    dimension: string;
    order: number;
    weightPercent: number;
    metricScore: number;
    pointsContributed: number;
  }[];
  thresholds: {
    status: 'High Continuity' | 'Moderate Continuity' | 'Continuity at Risk' | 'Stalled / Dormant';
    range: string;
    description: string;
  }[];
}

export interface MLContinuityModelData {
  predictedStatus: 'High Continuity' | 'Moderate Continuity' | 'Continuity at Risk' | 'Stalled / Dormant';
  confidenceScore: number; // e.g. 88%
  algorithm: string; // 'Ensemble Random Forest & Gradient Boosted Tree'
  featureImportance: {
    feature: string;
    importance: number;
    weight: number;
    direction: 'positive' | 'negative';
  }[];
  reviewIIPresentationSnippet: string;
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

  // The 9 Core Sustainability Metrics
  coreMetrics: CoreSustainabilityMetricItem[];

  // Supporting Repository Data (Stars, Forks, Watchers, Age, etc.)
  supportingData: SupportingRepositoryData;

  // Popularity vs Sustainability Distinction
  popularityMetrics: PopularityMetricsData;

  // Transparent Scoring Formulation
  scoringBreakdown: ScoringBreakdownData;

  // ML Maintenance Continuity Predictor
  mlContinuityModel: MLContinuityModelData;

  // Legacy analysis fields for backward compatibility
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

  // Google Gemini Qualitative Intelligence Layer
  aiInsights?: AIInsights;
  internalRepositoryId?: number;
  analysisId?: number;
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
  role?: string;
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

// ============================================================================
// Google Gemini AI Intelligence Layer Types
// ============================================================================

export interface AIInsights {
  executiveSummary: string;
  architecturalAssessment: string;
  riskAnalysis: string;
  adoptionVerdict: string;
  recommendations: string[];
  communitySentiment: string;
  keyRisks: string[];
  strengths: string[];
  confidenceScore?: number;
  modelName?: string;
  generatedAt?: string;
  isAiAvailable?: boolean;
}

export interface AIRequirement {
  description: string;
  title?: string;
}

export interface AIRequirementResponse {
  projectType: string;
  category: string;
  cloudProviders: string[];
  requiredTechnologies: string[];
  preferredTechnologies: string[];
  requiredFeatures: string[];
  monitoringRequirements: string[];
  networkingRequirements: string[];
  securityRequirements: string[];
  databaseRequirements: string[];
  deploymentRequirements: string[];
  maintenancePreferences?: string[];
  complexity: string;
  keywords: string[];
  rawQuery?: string;
  summaryText?: string;
}

export type RequirementStatus = 'MATCHED' | 'PARTIALLY_MATCHED' | 'MISSING' | 'UNKNOWN';

export interface AIMatchRequirementItem {
  requirement: string;
  status: RequirementStatus;
  confidence?: number;
  evidence?: string;
}

export interface AIRepositoryMatch {
  repositoryId?: number;
  owner: string;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  primaryLanguage: string;
  starsCount: number;
  forksCount: number;
  daysSinceLastPush: number;
  matchScore: number;
  domainRelevanceScore?: number;
  cloudRelevanceScore: number;
  relevanceLabel?: string;
  sustainabilityScore: number;
  finalRankingScore: number;
  category: string;
  requirements: AIMatchRequirementItem[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  summary: string;
}

export interface SavedAISearchItem {
  id: number | string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  structuredRequirements?: AIRequirementResponse;
}
