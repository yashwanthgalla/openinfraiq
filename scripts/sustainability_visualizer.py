"""
=============================================================================
RepoGuard Capstone: Open-Source Infrastructure Sustainability Analysis
Review-II Automated Graph & Chart Generation Script
=============================================================================
This script produces 4 high-resolution (300 DPI) publication-ready figures
for your Review-II presentation slides, project report, and research paper:
    1. radar_sustainability_9metrics.png  (9-Dimension Spider/Radar Chart)
    2. maintainer_concentration_donut.png (Commit Share & Bus Factor Donut)
    3. popularity_vs_sustainability.png   (Popularity vs Sustainability Contrast)
    4. ml_feature_importance.png          (Feature Weights for ML Continuity Model)

Requirements:
    pip install matplotlib seaborn pandas numpy
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

# Configure aesthetic engineering typography & palette
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial', 'Helvetica']
plt.rcParams['figure.autolayout'] = True
plt.rcParams['axes.edgecolor'] = '#D7DEE8'
plt.rcParams['axes.linewidth'] = 1.2

# ---------------------------------------------------------------------------
# DEFAULT REFERENCE REPOSITORY DATA (e.g., kubernetes/kubernetes or etcd-io/etcd)
# ---------------------------------------------------------------------------
REPO_NAME = "kubernetes/kubernetes"
COMPOSITE_SCORE = 88
CONTINUITY_STATUS = "High Continuity"

# The 9 Core Sustainability Metrics (Non-popularity features)
METRICS = [
    "Maintainer Concentration",
    "Active Maintainers",
    "Bus Factor",
    "Commit Frequency",
    "Release Frequency",
    "Release Continuity",
    "Issue Resolution Time",
    "PR Merge Time",
    "Contributor Growth"
]

SCORES = [86, 95, 90, 96, 92, 95, 82, 85, 92]
WEIGHTS = [12, 10, 14, 12, 10, 12, 10, 10, 10]
BENCHMARK_HEALTHY = [75] * len(SCORES)

# Supporting Raw Repository Data
STARS = 112500
FORKS = 40200
WATCHERS = 3400
POPULARITY_SCORE = 98
TOP3_SHARE = 31.4
BUS_FACTOR = 7

# Palette
NAVY_PRIMARY = "#0B1220"
NAVY_SECONDARY = "#1E293B"
AMBER_ACCENT = "#F59E0B"
AMBER_DARK = "#B45309"
SUCCESS_GREEN = "#15803D"
SLATE_GRAY = "#64748B"


def plot_sustainability_radar():
    """Figure 1: 9-Axis Spider / Radar Chart comparing Repository vs Healthy Benchmark."""
    num_vars = len(METRICS)
    angles = np.linspace(0, 2 * np.pi, num_vars, endpoint=False).tolist()

    scores_loop = SCORES + [SCORES[0]]
    benchmark_loop = BENCHMARK_HEALTHY + [BENCHMARK_HEALTHY[0]]
    angles_loop = angles + [angles[0]]

    fig, ax = plt.subplots(figsize=(9, 9), subplot_kw=dict(polar=True), facecolor="white")
    ax.set_theta_offset(np.pi / 2)
    ax.set_theta_direction(-1)

    plt.xticks(angles, METRICS, color=NAVY_PRIMARY, size=10, weight='semibold')
    ax.set_rlabel_position(0)
    plt.yticks([25, 50, 75, 100], ["25", "50", "75", "100"], color=SLATE_GRAY, size=8)
    plt.ylim(0, 100)

    # Plot Target Benchmark
    ax.plot(angles_loop, benchmark_loop, linewidth=1.5, linestyle='--', color=SLATE_GRAY, label='Healthy Threshold (75+)')
    ax.fill(angles_loop, benchmark_loop, color=SLATE_GRAY, alpha=0.08)

    # Plot Repo Scores
    ax.plot(angles_loop, scores_loop, linewidth=2.5, linestyle='solid', color=AMBER_ACCENT, label=f'{REPO_NAME} ({COMPOSITE_SCORE}/100)')
    ax.fill(angles_loop, scores_loop, color=AMBER_ACCENT, alpha=0.25)

    ax.scatter(angles, SCORES, color=AMBER_DARK, s=60, zorder=5)

    plt.title(f"RepoGuard 9-Metric Sustainability Signature\\n{REPO_NAME} [Status: {CONTINUITY_STATUS}]",
              size=14, weight='bold', color=NAVY_PRIMARY, pad=30)
    plt.legend(loc='upper right', bbox_to_anchor=(1.25, 1.1), frameon=True)

    output_path = "radar_sustainability_9metrics.png"
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"[✓] Saved radar chart to {output_path}")


def plot_maintainer_donut():
    """Figure 2: Maintainer Concentration Donut Chart & Bus Factor."""
    top3 = min(100, max(0, TOP3_SHARE))
    remaining = max(0, 100 - top3)

    shares = [top3, remaining]
    labels = [f"Top 3 Maintainers ({top3:.1f}%)", f"Remaining Community ({remaining:.1f}%)"]
    colors = [AMBER_ACCENT, "#38BDF8"]
    explode = (0.05, 0)

    fig, ax = plt.subplots(figsize=(7, 7), facecolor="white")
    ax.pie(
        shares,
        explode=explode,
        labels=labels,
        autopct='%1.1f%%',
        pctdistance=0.8,
        startangle=140,
        colors=colors,
        textprops=dict(color=NAVY_PRIMARY, size=11, weight='semibold'),
        wedgeprops=dict(width=0.4, edgecolor='white', linewidth=2)
    )

    # Central Hole Callout for Bus Factor
    ax.text(0, 0.08, f"Bus Factor: {BUS_FACTOR}", ha='center', va='center', fontsize=16, weight='bold', color=NAVY_PRIMARY)
    ax.text(0, -0.10, f"Top-3 Share: {top3:.0f}%", ha='center', va='center', fontsize=11, color=SLATE_GRAY)

    plt.title(f"Maintainer Topology & Concentration Risk\\n{REPO_NAME}", size=13, weight='bold', color=NAVY_PRIMARY, pad=20)

    output_path = "maintainer_concentration_donut.png"
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"[✓] Saved maintainer donut chart to {output_path}")


def plot_popularity_vs_sustainability():
    """Figure 3: Popularity vs. Sustainability Dimension Comparison."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 6), facecolor="white")

    # Subplot A: Popularity (Raw vanity metrics)
    pop_categories = ['Stars', 'Forks', 'Watchers']
    pop_values = [STARS, FORKS, WATCHERS]

    bars1 = ax1.bar(pop_categories, pop_values, color=['#FBBF24', '#60A5FA', '#34D399'], edgecolor=NAVY_PRIMARY, linewidth=1.2, width=0.5)
    ax1.set_yscale('log')
    ax1.set_title("Popularity Signals (Public Attention)\\nStars + Forks + Watchers", fontsize=11, weight='bold', color=NAVY_PRIMARY)
    ax1.set_ylabel("Count (Logarithmic Scale)", fontsize=9, color=SLATE_GRAY)
    for bar in bars1:
        yval = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width()/2.0, yval * 1.15, f"{int(yval):,}", ha='center', va='bottom', fontsize=9, weight='bold')

    # Subplot B: Sustainability Features (Scores 0 - 100)
    y_pos = np.arange(len(METRICS))
    colors_sust = [SUCCESS_GREEN if s >= 80 else AMBER_ACCENT if s >= 60 else "#EF4444" for s in SCORES]

    bars2 = ax2.barh(y_pos, SCORES, color=colors_sust, edgecolor=NAVY_PRIMARY, linewidth=1, height=0.6)
    ax2.axvline(75, color=SLATE_GRAY, linestyle='--', linewidth=1.2, label='Sustainability Baseline (75)')
    ax2.set_yticks(y_pos)
    ax2.set_yticklabels(METRICS, fontsize=8.5, weight='semibold', color=NAVY_PRIMARY)
    ax2.invert_yaxis()
    ax2.set_xlim(0, 100)
    ax2.set_title("9 Core Sustainability Metrics (Health Features)\\nUsed for Machine Learning Continuity Prediction", fontsize=11, weight='bold', color=NAVY_PRIMARY)
    ax2.set_xlabel("Normalized Score (0 - 100)", fontsize=9, color=SLATE_GRAY)
    ax2.legend(loc='lower right', fontsize=8)

    for bar, score in zip(bars2, SCORES):
        ax2.text(bar.get_width() + 1.5, bar.get_y() + bar.get_height()/2.0, f"{score}", ha='left', va='center', fontsize=8, weight='bold')

    plt.suptitle(f"Research Contribution: Popularity vs. Sustainability Distinction ({REPO_NAME})", fontsize=13, weight='bold', color=NAVY_PRIMARY)

    output_path = "popularity_vs_sustainability.png"
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"[✓] Saved popularity vs sustainability comparison to {output_path}")


def plot_ml_feature_weights():
    """Figure 4: Machine Learning Model Feature Importance & Weights."""
    df = pd.DataFrame({
        'Feature': METRICS,
        'Weight_Percent': WEIGHTS,
        'Actual_Score': SCORES
    }).sort_values('Weight_Percent', ascending=True)

    fig, ax = plt.subplots(figsize=(10, 5), facecolor="white")
    bars = ax.barh(df['Feature'], df['Weight_Percent'], color=NAVY_SECONDARY, edgecolor=AMBER_ACCENT, linewidth=1.5, height=0.55)

    ax.set_xlabel("Model Feature Weight in Maintenance Continuity Prediction (%)", fontsize=10, weight='semibold', color=NAVY_PRIMARY)
    ax.set_title(f"ML Feature Importance Distribution\\nEnsemble Maintenance Continuity Classifier: Composite = {COMPOSITE_SCORE}/100", fontsize=12, weight='bold', color=NAVY_PRIMARY)
    ax.set_xlim(0, max(WEIGHTS) + 5)

    for bar, weight in zip(bars, df['Weight_Percent']):
        ax.text(bar.get_width() + 0.3, bar.get_y() + bar.get_height()/2.0, f"{weight}% weight", ha='left', va='center', fontsize=9, weight='bold', color=AMBER_DARK)

    output_path = "ml_feature_importance.png"
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"[✓] Saved ML feature importance chart to {output_path}")


if __name__ == "__main__":
    print(f"Generating RepoGuard sustainability visualizations for: {REPO_NAME}...")
    plot_sustainability_radar()
    plot_maintainer_donut()
    plot_popularity_vs_sustainability()
    plot_ml_feature_weights()
    print("[✓] All 4 publication-quality charts successfully generated!")
