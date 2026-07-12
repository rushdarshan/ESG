import { PrismaClient } from "@prisma/client";
import { HEALTHY_SCENARIO } from "../src/data/demo/greenforge-healthy/data";
import { POOR_SCENARIO } from "../src/data/demo/greenforge-poor/data";
import { computeHash, serializeContent } from "../src/lib/evidence/crypto";

const prisma = new PrismaClient();

type Scenario = typeof HEALTHY_SCENARIO;

async function seedScenario(scenario: Scenario, label: string) {
  console.log(`\n🌱 Seeding ${label} scenario...`);

  // Create organization
  const org = await prisma.organization.create({
    data: {
      name: scenario.organization.name,
      industry: scenario.organization.industry,
    },
  });
  console.log(`   Organization: ${org.name} (${org.id})`);

  // Create departments
  const deptMap = new Map<string, string>();
  for (const deptName of scenario.departments) {
    const dept = await prisma.department.create({
      data: { name: deptName, organizationId: org.id },
    });
    deptMap.set(deptName, dept.id);
  }
  console.log(`   Departments: ${scenario.departments.join(", ")}`);

  // Create employees
  const empMap = new Map<string, string>();
  for (const emp of scenario.employees) {
    const departmentId = deptMap.get(emp.department)!;
    const employee = await prisma.employee.create({
      data: {
        name: emp.name,
        email: emp.email,
        role: emp.role,
        departmentId,
        organizationId: org.id,
      },
    });
    empMap.set(emp.email, employee.id);
  }
  console.log(`   Employees: ${scenario.employees.length}`);

  // Create locations
  for (const loc of scenario.locations) {
    await prisma.location.create({
      data: { name: loc.name, type: loc.type, organizationId: org.id },
    });
  }
  console.log(`   Locations: ${scenario.locations.length}`);

  // Create ESG scores
  for (const score of scenario.esgScores) {
    await prisma.eSGScore.create({
      data: {
        organizationId: org.id,
        overall: score.overall,
        environmental: score.environmental,
        social: score.social,
        governance: score.governance,
        period: score.period,
      },
    });
  }
  console.log(`   ESG Scores: ${scenario.esgScores.length} periods`);

  // Create metrics
  let prevHash: string | null = null;
  const metricRecords = [];
  for (const metric of scenario.metrics) {
    const m = await prisma.eSGMetric.create({
      data: {
        organizationId: org.id,
        scope: metric.scope,
        value: metric.value,
        unit: metric.unit,
        confidence: metric.confidence,
        category: metric.category,
        description: metric.description,
        period: metric.period,
      },
    });
    metricRecords.push(m);

    // Create evidence record for each metric (hash chain)
    const content = serializeContent({
      metricId: m.id,
      category: metric.category,
      scope: metric.scope,
      value: metric.value,
      unit: metric.unit,
      period: metric.period,
      description: metric.description,
    });
    const contentHash = computeHash(content, prevHash);
    prevHash = (await prisma.evidenceRecord.create({
      data: {
        contentHash,
        previousHash: prevHash,
        source: "upload",
        sourceId: m.id,
        metricId: m.id,
        content,
      },
    })).contentHash;
  }
  console.log(`   Metrics: ${scenario.metrics.length} + evidence chain`);

  // Create employee actions
  let actionPrevHash = prevHash;
  for (const action of scenario.actions) {
    const employeeId = empMap.get(action.employee);
    if (!employeeId) continue;

    const employee = await prisma.employee.findUnique({ where: { id: employeeId }, include: { department: true } });
    if (!employee) continue;

    const a = await prisma.employeeAction.create({
      data: {
        actionType: action.actionType,
        carbonSaved: action.carbonSaved,
        xpAwarded: action.xpAwarded,
        confidence: action.confidence,
        evidenceType: action.evidenceType,
        employeeId,
        departmentId: employee.departmentId,
        status: action.status,
        notes: action.notes,
      },
    });

    // Create evidence record for action (hash chain continues)
    const content = serializeContent({
      actionId: a.id,
      actionType: action.actionType,
      employeeId,
      carbonSaved: action.carbonSaved,
      xpAwarded: action.xpAwarded,
      confidence: action.confidence,
      evidenceType: action.evidenceType,
    });
    const contentHash = computeHash(content, actionPrevHash);
    await prisma.evidenceRecord.create({
      data: {
        contentHash,
        previousHash: actionPrevHash,
        source: "action",
        sourceId: a.id,
        actionId: a.id,
        content,
      },
    });
    actionPrevHash = contentHash;
  }
  console.log(`   Actions: ${scenario.actions.length} + evidence chain`);

  return org;
}

async function main() {
  console.log("🚀 EcoSphere Demo Data Pack — U12");
  console.log("═══════════════════════════════════");

  // Clean existing data
  console.log("\n🧹 Cleaning existing data...");
  await prisma.evidenceRecord.deleteMany();
  await prisma.employeeAction.deleteMany();
  await prisma.eSGMetric.deleteMany();
  await prisma.eSGScore.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();
  await prisma.location.deleteMany();
  await prisma.organization.deleteMany();

  // Seed healthy scenario
  const healthyOrg = await seedScenario(HEALTHY_SCENARIO, "Healthy (Score ~82)");

  // Seed poor scenario
  const poorOrg = await seedScenario(POOR_SCENARIO, "Poor (Score ~41)");

  // Summary
  const healthyScore = await prisma.eSGScore.findFirst({
    where: { organizationId: healthyOrg.id, period: "2024-Q4" },
  });
  const poorScore = await prisma.eSGScore.findFirst({
    where: { organizationId: poorOrg.id, period: "2024-Q4" },
  });

  console.log("\n═══════════════════════════════════");
  console.log("✅ Seed complete!");
  console.log("\n📊 Scenario Summary:");
  console.log("┌─────────────────────────────────────────────────────────────┐");
  console.log(`│ Healthy: ${healthyOrg.name} — Score ${healthyScore?.overall ?? "?"} (E:${healthyScore?.environmental ?? "?"} / S:${healthyScore?.social ?? "?"} / G:${healthyScore?.governance ?? "?"}) │`);
  console.log(`│ Poor:    ${poorOrg.name} — Score ${poorScore?.overall ?? "?"} (E:${poorScore?.environmental ?? "?"} / S:${poorScore?.social ?? "?"} / G:${poorScore?.governance ?? "?"})     │`);
  console.log("└─────────────────────────────────────────────────────────────┘");
  console.log("\n🔗 IDs (for API testing):");
  console.log(`   Healthy org: ${healthyOrg.id}`);
  console.log(`   Poor org:    ${poorOrg.id}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
