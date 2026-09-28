const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.siteSettings.updateMany({
    where: { email: 'majestcnortheasttour@gmail.com' },
    data: { email: 'majesticnortheasttour@gmail.com' }
  });
  
  await prisma.adminUser.updateMany({
    where: { email: 'majestcnortheasttour@gmail.com' },
    data: { email: 'majesticnortheasttour@gmail.com' }
  });
  
  console.log('Database emails updated.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
