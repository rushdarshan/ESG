import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ── Types ───────────────────────────────────────────────────────

export interface ReportMetrics {
  organizationName: string;
  period: string;
  generatedAt: string;
  environmental: {
    totalEmissions: number;
    scope1: number;
    scope2: number;
    scope3: number;
    breakdown: Record<string, number>;
  };
  social: {
    totalActions: number;
    totalXP: number;
    topContributors: Array<{ name: string; carbonSaved: number }>;
    departmentRankings: Array<{ name: string; totalSaved: number }>;
  };
  governance: {
    evidenceCount: number;
    chainValid: boolean;
    complianceScore: number;
  };
  compliance: {
    griScore: number;
    csrdScore: number;
    gaps: string[];
    recommendations: string[];
  };
}

// ── Styles ──────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderColor: "#059669",
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#059669",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    marginTop: 20,
    borderBottom: 1,
    borderColor: "#e5e7eb",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: "40%",
    fontSize: 10,
    color: "#6b7280",
  },
  value: {
    width: "60%",
    fontSize: 10,
    fontWeight: "bold",
  },
  metricCard: {
    border: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 3,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
  },
  metricUnit: {
    fontSize: 9,
    color: "#9ca3af",
  },
  barContainer: {
    height: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    marginTop: 5,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    backgroundColor: "#059669",
    borderRadius: 4,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 10,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    color: "#059669",
  },
  listItemText: {
    flex: 1,
    fontSize: 9,
    color: "#374151",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: 1,
    borderColor: "#e5e7eb",
    paddingTop: 10,
    fontSize: 8,
    color: "#9ca3af",
    textAlign: "center",
  },
  scopeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    paddingLeft: 10,
  },
  complianceGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  complianceCard: {
    width: "30%",
    border: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  complianceScore: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 3,
  },
  complianceLabel: {
    fontSize: 8,
    color: "#6b7280",
  },
});

// ── Component ───────────────────────────────────────────────────

function ScoreColor({ score }: { score: number }) {
  const color = score >= 70 ? "#059669" : score >= 40 ? "#d97706" : "#dc2626";
  return (
    <Text style={[styles.complianceScore, { color }]}>
      {score}%
    </Text>
  );
}

export function ESGReport({ data }: { data: ReportMetrics }) {
  const { environmental, social, governance, compliance } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>ESG Performance Report</Text>
          <Text style={styles.subtitle}>
            {data.organizationName} — {data.period}
          </Text>
          <Text style={styles.subtitle}>
            Generated: {data.generatedAt}
          </Text>
        </View>

        {/* Executive Summary */}
        <View>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={{ fontSize: 10, color: "#374151", lineHeight: 1.6 }}>
            This report provides a comprehensive overview of {data.organizationName}&apos;s
            environmental, social, and governance performance for {data.period}.
            Total GHG emissions were {environmental.totalEmissions.toFixed(1)} tCO2e
            across Scope 1 ({environmental.scope1.toFixed(1)}), Scope 2 ({environmental.scope2.toFixed(1)}),
            and Scope 3 ({environmental.scope3.toFixed(1)}). The organization logged
            {social.totalActions} sustainability actions generating {social.totalXP} XP
            across all departments.
          </Text>
        </View>

        {/* ESG Scores */}
        <View>
          <Text style={styles.sectionTitle}>ESG Compliance Scores</Text>
          <View style={styles.complianceGrid}>
            <View style={styles.complianceCard}>
              <ScoreColor score={compliance.griScore} />
              <Text style={styles.complianceLabel}>GRI Standards</Text>
            </View>
            <View style={styles.complianceCard}>
              <ScoreColor score={compliance.csrdScore} />
              <Text style={styles.complianceLabel}>CSRD / ESRS</Text>
            </View>
            <View style={styles.complianceCard}>
              <ScoreColor score={governance.complianceScore} />
              <Text style={styles.complianceLabel}>Evidence Chain</Text>
            </View>
          </View>
        </View>

        {/* Environmental Section */}
        <View>
          <Text style={styles.sectionTitle}>Environmental Performance</Text>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total GHG Emissions</Text>
            <Text style={styles.metricValue}>
              {environmental.totalEmissions.toFixed(1)}{" "}
              <Text style={styles.metricUnit}>tCO2e</Text>
            </Text>
          </View>

          <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 8 }}>
            Scope Breakdown
          </Text>
          <View style={styles.scopeRow}>
            <Text style={styles.label}>Scope 1 (Direct)</Text>
            <Text style={styles.value}>{environmental.scope1.toFixed(1)} tCO2e</Text>
          </View>
          <View style={styles.scopeRow}>
            <Text style={styles.label}>Scope 2 (Energy Indirect)</Text>
            <Text style={styles.value}>{environmental.scope2.toFixed(1)} tCO2e</Text>
          </View>
          <View style={styles.scopeRow}>
            <Text style={styles.label}>Scope 3 (Other Indirect)</Text>
            <Text style={styles.value}>{environmental.scope3.toFixed(1)} tCO2e</Text>
          </View>

          {Object.keys(environmental.breakdown).length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 8 }}>
                Category Breakdown
              </Text>
              {Object.entries(environmental.breakdown).map(([category, value]) => (
                <View style={styles.scopeRow} key={category}>
                  <Text style={styles.label}>{category}</Text>
                  <Text style={styles.value}>{value.toFixed(1)} kgCO2e</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Social Section */}
        <View>
          <Text style={styles.sectionTitle}>Social Performance</Text>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Employee Sustainability Actions</Text>
            <Text style={styles.metricValue}>{social.totalActions}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total XP Earned</Text>
            <Text style={styles.metricValue}>
              {social.totalXP}{" "}
              <Text style={styles.metricUnit}>XP</Text>
            </Text>
          </View>

          {social.topContributors.length > 0 && (
            <View>
              <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 8 }}>
                Top Contributors
              </Text>
              {social.topContributors.map((contributor, i) => (
                <View style={styles.listItem} key={i}>
                  <Text style={styles.bullet}>{`${i + 1}.`}</Text>
                  <Text style={styles.listItemText}>
                    {contributor.name} — {contributor.carbonSaved.toFixed(1)} kg CO2e saved
                  </Text>
                </View>
              ))}
            </View>
          )}

          {social.departmentRankings.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 8 }}>
                Department Rankings
              </Text>
              {social.departmentRankings.map((dept, i) => (
                <View style={styles.listItem} key={i}>
                  <Text style={styles.bullet}>{`${i + 1}.`}</Text>
                  <Text style={styles.listItemText}>
                    {dept.name} — {dept.totalSaved.toFixed(1)} kg CO2e
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Governance Section */}
        <View>
          <Text style={styles.sectionTitle}>Governance & Evidence</Text>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Evidence Records</Text>
            <Text style={styles.metricValue}>{governance.evidenceCount}</Text>
          </View>

          <View style={styles.scopeRow}>
            <Text style={styles.label}>Hash Chain Status</Text>
            <Text style={[styles.value, { color: governance.chainValid ? "#059669" : "#dc2626" }]}>
              {governance.chainValid ? "Valid" : "BROKEN"}
            </Text>
          </View>
        </View>

        {/* Recommendations */}
        {compliance.recommendations.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            {compliance.recommendations.map((rec, i) => (
              <View style={styles.listItem} key={i}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemText}>{rec}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Compliance Gaps */}
        {compliance.gaps.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Compliance Gaps</Text>
            {compliance.gaps.map((gap, i) => (
              <View style={styles.listItem} key={i}>
                <Text style={[styles.bullet, { color: "#dc2626" }]}>!</Text>
                <Text style={styles.listItemText}>{gap}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          EcoSphere ESG Platform — {data.organizationName} — Confidential
        </Text>
      </Page>
    </Document>
  );
}
