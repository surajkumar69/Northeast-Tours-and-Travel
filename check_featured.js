const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const pkgs = await prisma.tourPackage.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' }, take: 3 });
  console.log(pkgs.map(p => ({ title: p.title, coverImage: p.coverImage, slug: p.slug })));
}
main().catch(console.error).finally(() => prisma.$disconnect());
