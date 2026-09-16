const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.tourPackage.findMany().then(res => console.log(res.map(p => ({ id: p.id, title: p.title, coverImage: p.coverImage })))).finally(() => prisma.$disconnect());
