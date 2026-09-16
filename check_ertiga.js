const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.taxiVehicle.findFirst({
  where: { name: 'Maruti Suzuki Ertiga' },
  include: { gallery: true }
}).then(res => {
  console.log(res);
}).finally(() => prisma.$disconnect());
