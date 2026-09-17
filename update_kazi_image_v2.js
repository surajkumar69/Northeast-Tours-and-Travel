const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateKazirangaImageV2() {
  const pkg = await prisma.tourPackage.findFirst({
    where: { slug: { contains: 'kaziranga' } }
  });

  if (pkg) {
    // Update main cover image
    await prisma.tourPackage.update({
      where: { id: pkg.id },
      data: { coverImage: '/images/ai-generated/kaziranga_rhino_v2.jpg' }
    });
    
    // Clear and update the gallery to match
    await prisma.packageImage.deleteMany({
      where: { packageId: pkg.id }
    });
    
    await prisma.packageImage.create({
      data: {
        url: '/images/ai-generated/kaziranga_rhino_v2.jpg',
        altText: 'Kaziranga National Park Rhinoceros at Golden Hour',
        sortOrder: 0,
        packageId: pkg.id
      }
    });
    console.log(`Updated cover image and gallery to v2 for ${pkg.title}`);
  }
}

updateKazirangaImageV2().finally(() => prisma.$disconnect());
