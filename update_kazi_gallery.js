const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateKazirangaGallery() {
  const pkg = await prisma.tourPackage.findFirst({
    where: { slug: { contains: 'kaziranga' } }
  });

  if (pkg) {
    await prisma.packageImage.deleteMany({
      where: { packageId: pkg.id }
    });
    
    await prisma.packageImage.create({
      data: {
        url: '/images/ai-generated/kaziranga_rhino_premium.jpg',
        altText: 'Kaziranga National Park Rhinoceros',
        sortOrder: 0,
        packageId: pkg.id
      }
    });
    console.log(`Updated gallery for ${pkg.title}`);
  }
}

updateKazirangaGallery().finally(() => prisma.$disconnect());
