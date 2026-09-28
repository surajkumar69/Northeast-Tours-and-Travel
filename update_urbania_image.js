const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.tempoTraveller.updateMany({
    where: { slug: 'urbania-12-16' },
    data: {
      mainImage: '/images/ai-generated/fleet/user_uploaded_urbania.jpg'
    }
  });
  console.log('Urbania image updated.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
