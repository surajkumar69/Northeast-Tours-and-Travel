const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update Taxis
  const dzire = await prisma.taxiVehicle.findFirst({ where: { name: { contains: 'Dzire' } } });
  if (dzire) await prisma.taxiVehicle.update({ where: { id: dzire.id }, data: { pricePerDay: '₹3,500 onwards' } });

  const brezza = await prisma.taxiVehicle.findFirst({ where: { name: { contains: 'Brezza' } } });
  if (brezza) await prisma.taxiVehicle.update({ where: { id: brezza.id }, data: { pricePerDay: '₹4,000 onwards' } });

  const ertiga = await prisma.taxiVehicle.findFirst({ where: { name: { contains: 'Ertiga' } } });
  if (ertiga) await prisma.taxiVehicle.update({ where: { id: ertiga.id }, data: { pricePerDay: '₹4,500 onwards' } });

  const innova = await prisma.taxiVehicle.findFirst({ where: { name: { contains: 'Innova' } } });
  if (innova) await prisma.taxiVehicle.update({ where: { id: innova.id }, data: { pricePerDay: '₹5,500 onwards' } });

  // Update Tempos
  const tempo13 = await prisma.tempoTraveller.findFirst({ where: { name: { contains: '13/17 Seater Tempo' } } });
  if (tempo13) await prisma.tempoTraveller.update({ where: { id: tempo13.id }, data: { pricePerDay: '₹7,500 onwards' } });

  const tempo25 = await prisma.tempoTraveller.findFirst({ where: { name: { contains: '25 Seater Tempo' } } });
  if (tempo25) await prisma.tempoTraveller.update({ where: { id: tempo25.id }, data: { pricePerDay: '₹9,500 onwards' } });

  const urbania13 = await prisma.tempoTraveller.findFirst({ where: { name: { contains: '12/16 Seater Urbania' } } });
  if (urbania13) await prisma.tempoTraveller.update({ where: { id: urbania13.id }, data: { pricePerDay: '₹11,000 onwards' } });

  console.log('Database updated successfully with exact strings');
}

main().catch(console.error).finally(() => prisma.$disconnect());
