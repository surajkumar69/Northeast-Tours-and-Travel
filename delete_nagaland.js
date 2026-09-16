const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.destination.deleteMany({
    where: {
      name: {
        contains: 'Nagaland'
      }
    }
  });
  console.log('Deleted Nagaland from DB');
}
main().catch(console.error).finally(() => prisma.$disconnect());
