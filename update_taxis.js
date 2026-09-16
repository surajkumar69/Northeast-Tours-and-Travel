const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateTaxis() {
  await prisma.taxiVehicle.update({
    where: { slug: 'innova-crysta' },
    data: {
      mainImage: '/images/book_taxi_ai.jpg'
    }
  });

  await prisma.taxiVehicle.update({
    where: { slug: 'swift-dzire' },
    data: {
      mainImage: '/images/ai-generated/ertiga_taxi_2_1789535616752.jpg'
    }
  });
  console.log("Updated taxi images.");
}

updateTaxis().catch(console.error).finally(() => prisma.$disconnect());
