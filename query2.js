const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const taxis = await prisma.taxiVehicle.findMany({where: {isActive: true}});
  const tempos = await prisma.tempoTraveller.findMany({where: {isActive: true}});
  const fleet = [...taxis, ...tempos];
  fleet.forEach((v, i) => console.log(i + 1, v.name));
}
main().catch(console.error).finally(() => prisma.$disconnect());
