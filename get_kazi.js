const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const pkg = await prisma.tourPackage.findFirst({ where: { slug: { contains: 'kaziranga' } } });
  console.log(pkg);
}
main().finally(() => prisma.$disconnect());
