import { db } from "@/lib/db";

export interface ScenarioInfo {
  id: string;
  name: string;
  label: string;
  score: number | null;
}

export async function listScenarios(): Promise<ScenarioInfo[]> {
  if (!db) return [];
  const orgs = await db.organization.findMany({
    include: {
      scores: {
        where: { period: "2024-Q4" },
        take: 1,
      },
    },
  });

  return orgs.map((org) => ({
    id: org.id,
    name: org.name,
    label: (org.scores[0]?.overall ?? 0) >= 70 ? "healthy" : "poor",
    score: org.scores[0]?.overall ?? null,
  }));
}

export async function getScenarioData(organizationId: string) {
  if (!db) return null;
  const org = await db.organization.findUnique({
    where: { id: organizationId },
    include: {
      departments: {
        include: {
          employees: {
            include: {
              actions: true,
            },
          },
        },
      },
      scores: { orderBy: { period: "asc" } },
    },
  });

  if (!org) return null;

  const metrics = await db.eSGMetric.findMany({
    where: { organizationId },
    orderBy: { period: "asc" },
  });

  const evidenceCount = await db.evidenceRecord.count();

  const allActions = org.departments.flatMap((d) => d.employees.flatMap((e) => e.actions));
  const totalActions = allActions.length;
  const totalXP = allActions.reduce((sum, a) => sum + a.xpAwarded, 0);

  return {
    organization: { id: org.id, name: org.name, industry: org.industry },
    departments: org.departments.map((d) => ({
      name: d.name,
      employeeCount: d.employees.length,
      actionCount: d.employees.reduce((sum, e) => sum + e.actions.length, 0),
    })),
    scores: org.scores,
    metrics,
    stats: {
      totalEmployees: org.departments.reduce((sum, d) => sum + d.employees.length, 0),
      totalActions,
      totalXP,
      evidenceCount,
    },
  };
}
