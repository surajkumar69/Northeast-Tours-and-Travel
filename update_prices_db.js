const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.tourPackage.updateMany({
    where: { slug: 'shillong-cherrapunji-5n-6d' },
    data: {
      price: '₹32,000/-',
      startingPoint: 'EX-GUWAHATI'
    }
  });
  await prisma.tourPackage.updateMany({
    where: { slug: 'kaziranga-national-park' },
    data: {
      price: '₹19,000/-',
      startingPoint: 'EX-GUWAHATI'
    }
  });
  await prisma.tourPackage.updateMany({
    where: { slug: 'kaziranga-wildlife-safari' },
    data: {
      price: '₹19,000/-',
      startingPoint: 'EX-GUWAHATI'
    }
  });
  console.log('Prices and startingPoint updated in DB');
}
main().catch(console.error).finally(() => prisma.$disconnect());
