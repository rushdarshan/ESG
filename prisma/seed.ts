import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.evidenceRecord.deleteMany();
  await prisma.employeeAction.deleteMany();
  await prisma.eSGMetric.deleteMany();
  await prisma.eSGScore.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();
  await prisma.location.deleteMany();
  await prisma.organization.deleteMany();

  // Create organization
  const org = await prisma.organization.create({
    data: {
      name: "GreenForge Industries",
      industry: "Manufacturing",
    },
  });

  // Create departments
  const ops = await prisma.department.create({
    data: { name: "Operations", organizationId: org.id },
  });
  const hr = await prisma.department.create({
    data: { name: "Human Resources", organizationId: org.id },
  });
  const finance = await prisma.department.create({
    data: { name: "Finance", organizationId: org.id },
  });

  // Create demo employees
  await prisma.employee.createMany({
    data: [
      {
        name: "Alex Rivera",
        email: "alex@greenforge.com",
        role: "sustainability_manager",
        departmentId: ops.id,
        organizationId: org.id,
      },
      {
        name: "Sam Chen",
        email: "sam@greenforge.com",
        role: "employee",
        departmentId: hr.id,
        organizationId: org.id,
      },
      {
        name: "Jordan Patel",
        email: "jordan@greenforge.com",
        role: "cfo",
        departmentId: finance.id,
        organizationId: org.id,
      },
    ],
  });

  // Create locations
  await prisma.location.createMany({
    data: [
      { name: "HQ — Portland, OR", type: "office", organizationId: org.id },
      {
        name: "Plant A — Salem, OR",
        type: "manufacturing",
        organizationId: org.id,
      },
    ],
  });

  // Seed baseline ESG scores
  await prisma.eSGScore.create({
    data: {
      organizationId: org.id,
      overall: 82,
      environmental: 78,
      social: 85,
      governance: 83,
      period: "2024-Q4",
    },
  });

  // Seed some baseline metrics
  await prisma.eSGMetric.createMany({
    data: [
      {
        organizationId: org.id,
        scope: 1,
        value: 45.2,
        unit: "tCO2e",
        confidence: 0.95,
        category: "fuel",
        description: "Fleet diesel consumption",
        period: "2024-Q4",
      },
      {
        organizationId: org.id,
        scope: 2,
        value: 120.5,
        unit: "tCO2e",
        confidence: 0.92,
        category: "electricity",
        description: "Grid electricity — HQ + Plant A",
        period: "2024-Q4",
      },
      {
        organizationId: org.id,
        scope: 3,
        value: 88.3,
        unit: "tCO2e",
        confidence: 0.78,
        category: "travel",
        description: "Business travel — flights + ground",
        period: "2024-Q4",
      },
    ],
  });

  console.log("✅ Seed complete:");
  console.log(`   Organization: ${org.name} (${org.id})`);
  console.log(`   Departments:  Operations, HR, Finance`);
  console.log(`   Employees:    Alex (sustainability_manager), Sam (employee), Jordan (cfo)`);
  console.log(`   Locations:    HQ Portland, Plant A Salem`);
  console.log(`   ESG Score:    82 overall (E:78 / S:85 / G:83)`);
  console.log(`   Metrics:      3 baseline (Scope 1/2/3)`);
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
