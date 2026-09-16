const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDzireGallery() {
  const vehicle = await prisma.taxiVehicle.findFirst({
    where: { name: { contains: 'Swift Dzire' } }
  });

  if (vehicle) {
    await prisma.taxiImage.create({
      data: {
        url: '/images/swift_dzire_uploaded.jpg',
        altText: 'Swift Dzire',
        sortOrder: 0,
        taxiId: vehicle.id
      }
    });
    console.log('Added to gallery');
  }
}

updateDzireGallery().finally(() => prisma.$disconnect());
