const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePackagePrices() {
  await prisma.tourPackage.update({
    where: { slug: 'tawang-tour-5n-6d' },
    data: {
      price: '₹45,000',
      priceLabel: 'for 2 persons'
    }
  });
  console.log('Updated Tawang Package');

  await prisma.tourPackage.update({
    where: { slug: 'shillong-cherrapunji-5n-6d' },
    data: {
      price: '₹36,000',
      priceLabel: 'for 2 persons'
    }
  });
  console.log('Updated Shillong Package');
}

updatePackagePrices().finally(() => prisma.$disconnect());
