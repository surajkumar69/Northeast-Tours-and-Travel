const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const pkg = await prisma.tourPackage.findFirst({ where: { slug: { contains: 'kaziranga' } }, include: { images: true } });
  console.log(pkg.images);
}
main().finally(() => prisma.$disconnect());
