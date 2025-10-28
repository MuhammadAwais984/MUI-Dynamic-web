import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.dashboardStats.createMany({
    data: [
      { name: 'sales', current_value: 5000, previous_value: 4000 },
      { name: 'expense', current_value: 2000, previous_value: 1800 },
      { name: 'budget', current_value: 8000, previous_value: 7500 },
    ],
  });

  console.log('Data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
