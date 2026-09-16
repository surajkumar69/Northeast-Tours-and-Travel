const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.taxiVehicle.findMany().then(res => {
  res.forEach(t => console.log(t.name, t.mainImage));
}).finally(() => prisma.$disconnect());
