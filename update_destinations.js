const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.destination.updateMany({
    where: { slug: 'assam' },
    data: {
      heroImage: '/images/destinations/user_assam.jpg'
    }
  });
  await prisma.destination.updateMany({
    where: { slug: 'kaziranga-national-park' },
    data: {
      heroImage: '/images/destinations/user_kaziranga.jpg'
    }
  });
  console.log('Destinations updated in DB.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
