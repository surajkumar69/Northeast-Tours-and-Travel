const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  console.log('Taxis:', await prisma.taxiVehicle.findMany());
  console.log('Tempos:', await prisma.tempoTraveller.findMany());
}
main().catch(console.error).finally(() => prisma.$disconnect());
