const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateTaxis() {
  const taxis = await prisma.taxiVehicle.findMany();
  console.log('Current taxis:', taxis.map(t => ({ id: t.id, name: t.name })));

  const dzire = taxis.find(t => t.name.includes('Dzire'));
  if (dzire) {
    await prisma.taxiVehicle.update({
      where: { id: dzire.id },
      data: { 
        name: 'Swift Dzire',
        slug: 'swift-dzire' 
      }
    });
    console.log('Updated Swift Dzire.');
  }
}

updateTaxis().finally(() => prisma.$disconnect());
