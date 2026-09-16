const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateVehicleImages() {
  // Update Vitara Brezza
  await prisma.taxiVehicle.update({
    where: { slug: 'vitara-brezza' },
    data: { mainImage: '/images/uploaded_brezza.jpg' }
  });
  console.log('Updated Vitara Brezza image');

  // Update Innova Crysta
  const innova = await prisma.taxiVehicle.findFirst({
    where: { name: { contains: 'Innova Crysta' } }
  });

  if (innova) {
    await prisma.taxiVehicle.update({
      where: { id: innova.id },
      data: { mainImage: '/images/uploaded_innova.jpg' }
    });

    // Update the first gallery image for Innova
    const firstGalleryImage = await prisma.taxiImage.findFirst({
      where: { taxiId: innova.id, sortOrder: 0 }
    });

    if (firstGalleryImage) {
      await prisma.taxiImage.update({
        where: { id: firstGalleryImage.id },
        data: { url: '/images/uploaded_innova.jpg' }
      });
    }
    console.log('Updated Innova Crysta image');
  }
}

updateVehicleImages()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
