const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.destination.findMany().then(res => console.log(res.map(d => ({ name: d.name, slug: d.slug, coverImage: d.coverImage })))).finally(() => prisma.$disconnect());
