const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addBrezza() {
  const exists = await prisma.taxiVehicle.findUnique({ where: { slug: 'vitara-brezza' } });
  if (!exists) {
    await prisma.taxiVehicle.create({
      data: {
        slug: 'vitara-brezza',
        name: 'Vitara Brezza',
        type: 'Compact SUV',
        model: 'Vitara Brezza',
        seatingCapacity: '4+1',
        acAvailable: true,
        mainImage: '/images/ai-generated/vitara_brezza_ai.jpg',
        isActive: true
      }
    });
    console.log('Added Vitara Brezza.');
  } else {
    console.log('Vitara Brezza already exists.');
  }
}

addBrezza().finally(() => prisma.$disconnect());
