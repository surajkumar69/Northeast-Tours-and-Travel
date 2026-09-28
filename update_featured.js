const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.tourPackage.updateMany({
    where: { slug: 'kaziranga-national-park' },
    data: {
      coverImage: '/images/destinations/user_kaziranga_v2.jpg'
    }
  });
  console.log('Updated kaziranga-national-park package in DB');
}
main().catch(console.error).finally(() => prisma.$disconnect());
