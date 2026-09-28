const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const dest = await prisma.destination.findUnique({where: {slug: 'kaziranga-national-park'}});
  console.log(dest);
}
main().catch(console.error).finally(() => prisma.$disconnect());
