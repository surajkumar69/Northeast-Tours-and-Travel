const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateKazirangaPackage() {
  const pkg = await prisma.tourPackage.findFirst({
    where: { slug: { contains: 'kaziranga' } }
  });

  if (pkg) {
    await prisma.tourPackage.update({
      where: { id: pkg.id },
      data: { coverImage: '/images/ai-generated/kaziranga_rhino_premium.jpg' }
    });
    console.log(`Updated cover image for ${pkg.title}`);
  } else {
    console.log('Kaziranga package not found in DB');
  }
}

updateKazirangaPackage().finally(() => prisma.$disconnect());
