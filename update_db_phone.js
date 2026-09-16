const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDbPhone() {
  const settings = await prisma.siteSettings.findFirst();
  if (settings) {
    await prisma.siteSettings.update({
      where: { id: settings.id },
      data: {
        phone: '+917640076969',
        whatsapp: '+917640076969'
      }
    });
    console.log('Updated SiteSettings phone to 7640076969');
  }
}

updateDbPhone().finally(() => prisma.$disconnect());
