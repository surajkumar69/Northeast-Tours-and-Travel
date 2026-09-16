const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
Promise.all([
  prisma.taxiVehicle.findMany(),
  prisma.heroSlide.findMany(),
  prisma.experience.findMany()
]).then(res => {
  console.log("Taxis:", res[0].map(t => t.name));
  console.log("Hero Slides:", res[1].map(h => h.title));
  console.log("Experiences:", res[2].map(e => e.title));
}).finally(() => prisma.$disconnect());
