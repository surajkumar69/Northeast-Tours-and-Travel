const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.tempoTraveller.updateMany({
    where: { slug: 'urbania-12-16' },
    data: {
      name: '12/16 Seater Urbania',
      pricePerDay: '₹11,000 onwards',
      seatingCapacity: '12-16',
      mainImage: '/images/ai-generated/fleet/urbania_fleet_scenic.jpg'
    }
  });
  console.log('Urbania updated.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
