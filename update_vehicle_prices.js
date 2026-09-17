const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update Taxis
  const dzire = await prisma.taxiVehicle.findFirst({ where: { name: { contains: 'Dzire' } } });
  if (dzire) await prisma.taxiVehicle.update({ where: { id: dzire.id }, data: { name: 'Swift Dzire', pricePerDay: '3,500 onwards' } });

  const brezza = await prisma.taxiVehicle.findFirst({ where: { name: { contains: 'Brezza' } } });
  if (brezza) await prisma.taxiVehicle.update({ where: { id: brezza.id }, data: { name: 'Vitara Brezza', pricePerDay: '4,000 onwards' } });

  const ertiga = await prisma.taxiVehicle.findFirst({ where: { name: { contains: 'Ertiga' } } });
  if (ertiga) await prisma.taxiVehicle.update({ where: { id: ertiga.id }, data: { name: 'Ertiga', pricePerDay: '4,500 onwards' } });

  const innova = await prisma.taxiVehicle.findFirst({ where: { name: { contains: 'Innova' } } });
  if (innova) await prisma.taxiVehicle.update({ where: { id: innova.id }, data: { name: 'Innova Crysta', pricePerDay: '5,500 onwards' } });

  // Update Tempos
  const tempo13 = await prisma.tempoTraveller.findFirst({ where: { name: { contains: 'Tempo Traveller 13' } } });
  if (tempo13) await prisma.tempoTraveller.update({ where: { id: tempo13.id }, data: { name: '13/17 Seater Tempo Traveller', pricePerDay: '7,500 onwards' } });

  const tempo25 = await prisma.tempoTraveller.findFirst({ where: { name: { contains: 'Tempo Traveller 25' } } });
  if (tempo25) await prisma.tempoTraveller.update({ where: { id: tempo25.id }, data: { name: '25 Seater Tempo Traveller', pricePerDay: '9,500 onwards' } });

  const urbania13 = await prisma.tempoTraveller.findFirst({ where: { name: { contains: 'Force Urbania 13' } } });
  if (urbania13) await prisma.tempoTraveller.update({ where: { id: urbania13.id }, data: { name: '12/16 Seater Urbania', pricePerDay: '11,000 onwards' } });

  // Deactivate redundant ones
  const tempo17 = await prisma.tempoTraveller.findFirst({ where: { name: { contains: 'Tempo Traveller 17' } } });
  if (tempo17) await prisma.tempoTraveller.update({ where: { id: tempo17.id }, data: { isActive: false } });

  const urbania16 = await prisma.tempoTraveller.findFirst({ where: { name: { contains: 'Force Urbania 16' } } });
  if (urbania16) await prisma.tempoTraveller.update({ where: { id: urbania16.id }, data: { isActive: false } });

  console.log('Database updated successfully');
}

main().catch(console.error).finally(() => prisma.$disconnect());
