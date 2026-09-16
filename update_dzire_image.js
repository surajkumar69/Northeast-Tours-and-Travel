const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDzireImage() {
  const vehicle = await prisma.taxiVehicle.findFirst({
    where: { name: { contains: 'Swift Dzire' } }
  });

  if (vehicle) {
    await prisma.taxiVehicle.update({
      where: { id: vehicle.id },
      data: { mainImage: '/images/swift_dzire_uploaded.jpg' }
    });
    console.log(`Updated image for ${vehicle.name}`);
    
    // Also add to gallery if gallery exists
    await prisma.taxiGallery.create({
      data: {
        url: '/images/swift_dzire_uploaded.jpg',
        altText: 'Swift Dzire',
        sortOrder: 0,
        vehicleId: vehicle.id
      }
    });
    console.log('Added to gallery');
  } else {
    console.log('Swift Dzire not found in DB');
  }
}

updateDzireImage().finally(() => prisma.$disconnect());
