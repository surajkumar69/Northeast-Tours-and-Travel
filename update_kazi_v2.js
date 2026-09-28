const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.destination.updateMany({
    where: { slug: 'kaziranga-national-park' },
    data: { heroImage: '/images/destinations/user_kaziranga_v2.jpg' }
  });
  await prisma.tourPackage.updateMany({
    where: { slug: 'kaziranga-wildlife-safari' },
    data: { coverImage: '/images/destinations/user_kaziranga_v2.jpg' }
  });
  console.log('Kaziranga v2 DB updated.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
