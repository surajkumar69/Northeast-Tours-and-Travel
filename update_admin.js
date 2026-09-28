const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.adminUser.updateMany({
    where: { email: 'thedivinetravel01@gmail.com' },
    data: {
      email: 'majestcnortheasttour@gmail.com'
    }
  });
  console.log('AdminUser updated in DB');
}
main().catch(console.error).finally(() => prisma.$disconnect());
