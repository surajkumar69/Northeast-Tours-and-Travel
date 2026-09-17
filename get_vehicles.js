const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  console.log('Taxis:');
  console.log(await prisma.taxiVehicle.findMany({select: {id:true, name:true, pricePerDay:true}}));
  console.log('Tempos:');
  console.log(await prisma.tempoVehicle.findMany({select: {id:true, name:true, pricePerDay:true}}));
}
main().finally(() => prisma.$disconnect());
