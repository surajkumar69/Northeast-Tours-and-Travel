const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  console.log('Tempos:');
  console.log(await prisma.tempoTraveller.findMany({select: {id:true, name:true, pricePerDay:true}}));
}
main().finally(() => prisma.$disconnect());
