const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.tourPackage.updateMany({
    where: { slug: 'kaziranga-wildlife-safari' },
    data: {
      coverImage: '/images/destinations/user_kaziranga.jpg'
    }
  });
  console.log('Package updated in DB.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
