const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePackage() {
  const pkg = await prisma.tourPackage.findFirst({
    where: { title: 'Kaziranga National Park' }
  });

  if (pkg) {
    await prisma.tourPackage.update({
      where: { id: pkg.id },
      data: { coverImage: '/images/ai-generated/kaziranga_package_rhino.jpg' }
    });
    console.log('Updated package successfully.');
  } else {
    console.log('Package not found.');
  }
}

updatePackage().finally(() => prisma.$disconnect());
