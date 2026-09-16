const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin', 10);
  
  const user = await prisma.adminUser.upsert({
    where: { email: 'admin@majestictours.com' },
    update: {
      passwordHash
    },
    create: {
      email: 'admin@majestictours.com',
      passwordHash,
      name: 'Super Admin',
      role: 'ADMIN'
    }
  });

  console.log('Admin user seeded:', user.email);

  // Also seed SiteSettings if empty
  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    await prisma.siteSettings.create({
      data: {
        companyName: "Majestic Northeast Tours and Travel",
        tagline: "The Soul of Incredible Northeast",
        phone: "+918787488801",
        whatsapp: "+918787488801",
        email: "thedivinetravel01@gmail.com"
      }
    });
    console.log('SiteSettings seeded');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
