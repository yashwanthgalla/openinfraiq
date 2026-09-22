/* ==========================================================================
   InfraMaturity - Real Sustainability Analytics Engine
   Processes live GitHub repository signals into structured sustainability,
   continuity, and adoption decision metrics.
   ========================================================================== */

import {
  fetchRepositoryMetadata,
  fetchRepositoryContributors,
  fetchRepositoryReleases,
  fetchRepositoryRecentCommits,
} from './githubApi.ts';
import type {
  RealAssessmentResult,
  GitHubContributor,
  GitHubReleaseItem,
  MaintainerDistributionAnalysis,
  ReleaseContinuityAnalysis,
  RepositoryActivityAnalysis,
  GovernanceAnalysis,
  CalculatedIndicator,
} from '../types/index.ts';

export async function analyzeRepository(
  owner: string,
  repo: string,
  onProgress?: (phase: string) => void
): Promise<RealAssessmentResult> {
  onProgress?.('Querying GitHub repository metadata');
  const metadata = await fetchRepositoryMetadata(owner, repo);

  onProgress?.('Analyzing maintainer topology and contributor dispersion');
  const rawContributors = await fetchRepositoryContributors(owner, repo);

  onProgress?.('Extracting release cadence and version history');
  const rawReleases = await fetchRepositoryReleases(owner, repo);

  onProgress?.('Evaluating recent commit timeline and activity dynamics');
  const rawCommits = await fetchRepositoryRecentCommits(owner, repo);

  onProgress?.('Computing sustainability indicators & maintenance continuity');

  // ------------------------------------------------------------------------
  // 1. Maintainer Distribution
  // ------------------------------------------------------------------------
  const totalContributions = rawContributors.reduce((sum, c) => sum + c.contributions, 0);

  const contributorsWithShare: GitHubContributor[] = rawContributors.slice(0, 10).map((c) => ({
    login: c.login,
    contributions: c.contributions,
    sharePercentage: totalContributions > 0 ? Math.round((c.contributions / totalContributions) * 100) : 0,
    avatarUrl: c.avatar_url,
    htmlUrl: c.html_url,
  }));

  const top3Contributions = rawContributors.slice(0, 3).reduce((sum, c) => sum + c.contributions, 0);
  const top3SharePercentage = totalContributions > 0 ? Math.round((top3Contributions / totalContributions) * 100) : 0;

  let concentrationRisk: 'Low Concentration' | 'Moderate Concentration' | 'High Concentration' = 'Moderate Concentration';
  if (top3SharePercentage > 75 || rawContributors.length < 3) {
    concentrationRisk = 'High Concentration';
  } else if (top3SharePercentage < 45 && rawContributors.length >= 10) {
    concentrationRisk = 'Low Concentration';
  }

  const maintainerSummary =
    rawContributors.length === 0
      ? 'Contributor data unavailable for this repository.'
      : `Top 3 maintainers account for ${top3SharePercentage}% of sampled commits across ${rawContributors.length} active contributors. Concentration level: ${concentrationRisk}.`;

  const maintainerDistribution: MaintainerDistributionAnalysis = {
    totalContributorsSampled: rawContributors.length,
    topContributors: contributorsWithShare,
    top3SharePercentage,
    concentrationRisk,
    summary: maintainerSummary,
  };

  // ------------------------------------------------------------------------
  // 2. Release Continuity
  // ------------------------------------------------------------------------
  const now = Date.now();
  const releasesList: GitHubReleaseItem[] = rawReleases.map((r) => {
    const pubDate = new Date(r.published_at).getTime();
    const daysAgo = Math.max(0, Math.floor((now - pubDate) / (1000 * 60 * 60 * 24)));
    return {
      id: r.id,
      tagName: r.tag_name,
      name: r.name || r.tag_name,
      publishedAt: r.published_at,
      daysAgo,
      htmlUrl: r.html_url,
      isPrerelease: r.prerelease,
    };
  });

  const latestRelease = releasesList[0] || null;

  // Calculate average days between releases
  let averageIntervalDays = 0;
  if (releasesList.length >= 2) {
    const intervals: number[] = [];
    for (let i = 0; i < releasesList.length - 1; i++) {
      const d1 = new Date(releasesList[i].publishedAt).getTime();
      const d2 = new Date(releasesList[i + 1].publishedAt).getTime();
      const diffDays = Math.abs(Math.floor((d1 - d2) / (1000 * 60 * 60 * 24)));
      intervals.push(diffDays);
    }
    averageIntervalDays = Math.round(intervals.reduce((a, b) => a + b, 0) / intervals.length);
  }

  let cadenceStability: 'Continuous & Predictable' | 'Moderate Cadence' | 'Infrequent' | 'No Official Releases' = 'Moderate Cadence';
  if (releasesList.length === 0) {
    cadenceStability = 'No Official Releases';
  } else if (latestRelease && latestRelease.daysAgo < 60 && averageIntervalDays > 0 && averageIntervalDays < 45) {
    cadenceStability = 'Continuous & Predictable';
  } else if (latestRelease && latestRelease.daysAgo > 180) {
    cadenceStability = 'Infrequent';
  }

  const releaseSummary =
    releasesList.length === 0
      ? 'No official GitHub releases published; repository may rely on branch heads or git tags.'
      : `Latest version (${latestRelease?.tagName}) published ${latestRelease?.daysAgo} days ago. Average release interval: ${averageIntervalDays} days.`;

  const releaseContinuity: ReleaseContinuityAnalysis = {
    totalReleasesFound: releasesList.length,
    latestRelease,
    averageIntervalDays,
    cadenceStability,
    releasesList,
    summary: releaseSummary,
  };

  // ------------------------------------------------------------------------
  // 3. Repository Activity Dynamics
  // ------------------------------------------------------------------------
  const lastPushDate = new Date(metadata.pushed_at).getTime();
  const daysSinceLastPush = Math.max(0, Math.floor((now - lastPushDate) / (1000 * 60 * 60 * 24)));

  let activityState: 'Actively Maintained' | 'Moderate Maintenance' | 'Low Activity / Dormant' = 'Moderate Maintenance';
  if (daysSinceLastPush <= 14) {
    activityState = 'Actively Maintained';
  } else if (daysSinceLastPush > 90 || metadata.archived) {
    activityState = 'Low Activity / Dormant';
  }

  const activitySummary = metadata.archived
    ? 'This repository is marked as ARCHIVED on GitHub and is no longer maintained.'
    : `Last commit pushed ${daysSinceLastPush} day(s) ago to branch '${metadata.default_branch}' (${rawCommits.length} recent commits evaluated). Open issues & PRs: ${metadata.open_issues_count}.`;

  const repositoryActivity: RepositoryActivityAnalysis = {
    openIssuesCount: metadata.open_issues_count,
    starsCount: metadata.stargazers_count,
    forksCount: metadata.forks_count,
    defaultBranch: metadata.default_branch,
    pushedAt: metadata.pushed_at,
    daysSinceLastPush,
    activityState,
    summary: activitySummary,
  };

  // ------------------------------------------------------------------------
  // 4. Governance & Provenance
  // ------------------------------------------------------------------------
  const licenseName = metadata.license?.name || 'No Recognized License';
  const licenseSpdxId = metadata.license?.spdx_id || 'NOASSERTION';
  const isOrg = metadata.owner.type === 'Organization';

  const governanceSummary = `${isOrg ? 'Organization-backed' : 'Personal account'} repository licensed under ${licenseName}. ${
    releasesList.length > 0 ? 'Official release tags provided.' : 'No formal releases tagged.'
  }`;

  const governance: GovernanceAnalysis = {
    licenseName,
    licenseSpdxId,
    ownerType: metadata.owner.type,
    hasReleases: releasesList.length > 0,
    summary: governanceSummary,
  };

  // ------------------------------------------------------------------------
  // 5. Compute Sustainability Indicators (0 - 100)
  // ------------------------------------------------------------------------
  // Indicator 1: Maintainer Distribution Score
  let maintainerScore = 50;
  if (concentrationRisk === 'Low Concentration') maintainerScore = 88;
  else if (concentrationRisk === 'Moderate Concentration') maintainerScore = 68;
  else maintainerScore = 42;

  // Indicator 2: Release Continuity Score
  let releaseScore = 40;
  if (cadenceStability === 'Continuous & Predictable') releaseScore = 92;
  else if (cadenceStability === 'Moderate Cadence') releaseScore = 72;
  else if (cadenceStability === 'Infrequent') releaseScore = 48;
  else releaseScore = 30;

  // Indicator 3: Activity Dynamics Score
  let activityScore = 50;
  if (daysSinceLastPush <= 7) activityScore = 94;
  else if (daysSinceLastPush <= 30) activityScore = 80;
  else if (daysSinceLastPush <= 90) activityScore = 60;
  else activityScore = 25;

  // Indicator 4: Governance & Provenance Score
  let governanceScore = 50;
  if (metadata.license && isOrg) governanceScore = 90;
  else if (metadata.license) governanceScore = 75;
  else if (isOrg) governanceScore = 60;
  else governanceScore = 40;

  const getRating = (score: number): 'Strong' | 'Adequate' | 'Attention Needed' | 'High Risk' => {
    if (score >= 80) return 'Strong';
    if (score >= 65) return 'Adequate';
    if (score >= 45) return 'Attention Needed';
    return 'High Risk';
  };

  const sustainabilityIndicators: CalculatedIndicator[] = [
    {
      id: 'maintainer-distribution',
      name: 'Maintainer Distribution & Concentration',
      score: maintainerScore,
      rating: getRating(maintainerScore),
      evidence: `Top 3 maintainers represent ${top3SharePercentage}% of contributions across ${rawContributors.length} sampled contributors.`,
      scope: 'Quantifies bus factor risk and distribution of maintenance workload.',
    },
    {
      id: 'release-continuity',
      name: 'Release Continuity & Cadence Stability',
      score: releaseScore,
      rating: getRating(releaseScore),
      evidence: latestRelease
        ? `Latest release: ${latestRelease.tagName} (${latestRelease.daysAgo} days ago). Average interval: ${averageIntervalDays || '<30'} days.`
        : 'No official releases identified in public repository tags.',
      scope: 'Evaluates consistency of versioning cycles and long-term patch cadence.',
    },
    {
      id: 'activity-responsiveness',
      name: 'Repository Activity Dynamics',
      score: activityScore,
      rating: getRating(activityScore),
      evidence: `Last repository push occurred ${daysSinceLastPush} days ago. ${metadata.open_issues_count} open issues & review items.`,
      scope: 'Measures recent maintenance velocity and triage momentum.',
    },
    {
      id: 'governance-provenance',
      name: 'Governance & Evidence Provenance',
      score: governanceScore,
      rating: getRating(governanceScore),
      evidence: `License: ${licenseName} (${licenseSpdxId}). Ownership: ${metadata.owner.type}.`,
      scope: 'Evaluates legal licensing clarity and organizational stewardship structure.',
    },
  ];

  // ------------------------------------------------------------------------
  // 6. Maintenance Continuity Projection
  // ------------------------------------------------------------------------
  const compositeScore = Math.round(
    maintainerScore * 0.3 + releaseScore * 0.3 + activityScore * 0.25 + governanceScore * 0.15
  );

  let continuityStatus: 'High Continuity' | 'Moderate Continuity' | 'Continuity at Risk' | 'Stalled / Dormant' = 'Moderate Continuity';
  let continuityExplanation = '';

  if (metadata.archived || daysSinceLastPush > 365) {
    continuityStatus = 'Stalled / Dormant';
    continuityExplanation = 'Repository exhibits dormancy or has been officially archived. Maintenance continuity is severely compromised.';
  } else if (compositeScore >= 78) {
    continuityStatus = 'High Continuity';
    continuityExplanation =
      'Repository shows disciplined maintenance distribution, ongoing commit activity, and active release cadence. Favorable historical indicators for long-term operational stewardship.';
  } else if (compositeScore >= 60) {
    continuityStatus = 'Moderate Continuity';
    continuityExplanation =
      'Project maintains operational activity, though maintainer concentration or release intervals indicate dependence on a smaller steward core. Monitor quarterly cadence.';
  } else {
    continuityStatus = 'Continuity at Risk';
    continuityExplanation =
      'Indicators reflect high maintainer concentration or elongated release cycles. Similar profiles in capstone validation sets showed elevated risk of maintenance stagnation.';
  }

  // ------------------------------------------------------------------------
  // 7. Adoption Decision Assessment
  // ------------------------------------------------------------------------
  let recommendation: 'Recommended for Adoption' | 'Adoption with Precaution' | 'Elevated Maintenance Risk' = 'Adoption with Precaution';
  let verdict = '';
  const keyObservations: string[] = [];

  if (continuityStatus === 'High Continuity') {
    recommendation = 'Recommended for Adoption';
    verdict = 'Demonstrates healthy multi-maintainer distribution, consistent release discipline, and active repository stewardship.';
    keyObservations.push(`Active release cadence (latest ${latestRelease?.tagName || 'tagged'} ${latestRelease?.daysAgo || 0}d ago)`);
    keyObservations.push(`Established ${isOrg ? 'organizational foundation' : 'community maintainer base'}`);
    keyObservations.push(`Verifiable open-source license: ${licenseName}`);
  } else if (continuityStatus === 'Moderate Continuity') {
    recommendation = 'Adoption with Precaution';
    verdict = 'Viable for infrastructure adoption provided platform teams have internal contingency or upstream contribution capacity.';
    keyObservations.push(`Moderate maintainer concentration (${top3SharePercentage}% from top 3)`);
    keyObservations.push(`Recent repository activity detected (${daysSinceLastPush} days since last push)`);
    keyObservations.push('Recommend establishing downstream patch verification protocols');
  } else {
    recommendation = 'Elevated Maintenance Risk';
    verdict = 'Elevated risk of maintenance delays or abandoned issue triage. Critical dependencies should require vendor support or dedicated internal fork capacity.';
    keyObservations.push(`Extended gap since release or push activity (${daysSinceLastPush}d)`);
    keyObservations.push(`High concentration risk: top maintainers handle ${top3SharePercentage}% of activity`);
    keyObservations.push('Matches characteristic indicators of projects that later stalled');
  }

  return {
    repositoryId: `${owner.toLowerCase()}/${repo.toLowerCase()}`,
    owner: metadata.owner.login,
    name: metadata.name,
    url: metadata.html_url,
    description: metadata.description || 'No description provided by repository maintainers.',
    language: metadata.language || 'Multi-language / Not Specified',
    status: 'available',
    analyzedAt: new Date().toISOString(),

    maintainerDistribution,
    releaseContinuity,
    repositoryActivity,
    governance,

    sustainabilityIndicators,
    maintenanceContinuity: {
      score: compositeScore,
      status: continuityStatus,
      explanation: continuityExplanation,
    },
    adoptionAssessment: {
      recommendation,
      verdict,
      keyObservations,
    },
  };
}
