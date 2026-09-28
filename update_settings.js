const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.siteSettings.updateMany({
    data: {
      email: 'majestcnortheasttour@gmail.com'
    }
  });
  console.log('SiteSettings updated in DB');
}
main().catch(console.error).finally(() => prisma.$disconnect());
