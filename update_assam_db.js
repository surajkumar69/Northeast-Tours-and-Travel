const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateAssamDestination() {
  const dest = await prisma.destination.findFirst({
    where: { slug: 'assam' }
  });

  if (dest) {
    await prisma.destination.update({
      where: { id: dest.id },
      data: { heroImage: '/images/ai-generated/assam_kamakhya.jpg' }
    });
    console.log(`Updated heroImage for Assam destination`);
  } else {
    console.log('Assam destination not found in DB');
  }
}

updateAssamDestination().finally(() => prisma.$disconnect());
