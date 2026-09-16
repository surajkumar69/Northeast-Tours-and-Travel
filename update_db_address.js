const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDBAddress() {
  const settings = await prisma.siteSettings.findFirst();
  if (settings) {
    await prisma.siteSettings.update({
      where: { id: settings.id },
      data: {
        address: "A2, Ground Floor, Royal Residency, SOS Village Road, Opp. Terminal-2, Lokpriya Gopinath Bordoloi International Airport, Guwahati-781015, Assam."
      }
    });
    console.log("Updated SiteSettings address in DB.");
  }
}

updateDBAddress().finally(() => prisma.$disconnect());
