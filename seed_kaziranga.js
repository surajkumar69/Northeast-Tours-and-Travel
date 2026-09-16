const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Deleting all existing TourPackages...');
  await prisma.tourPackage.deleteMany({});
  console.log('Deleted existing TourPackages.');

  console.log('Ensuring Assam destination exists...');
  let assam = await prisma.destination.findUnique({ where: { slug: 'assam' } });
  if (!assam) {
    assam = await prisma.destination.create({
      data: {
        name: 'Assam',
        slug: 'assam',
        state: 'Assam',
        shortDescription: 'The land of one-horned rhinos, rolling tea gardens, and the mighty Brahmaputra river.'
      }
    });
  }

  console.log('Creating Kaziranga National Park Package...');
  
  const package = await prisma.tourPackage.create({
    data: {
      title: 'Kaziranga National Park',
      slug: 'kaziranga-national-park',
      duration: '2 Nights / 3 Days',
      price: '₹25,000/-',
      priceLabel: 'for 2 Persons',
      startingPoint: 'Ex-Guwahati',
      shortDescription: 'Explore the wildlife of Kaziranga National Park with Elephant and Jeep safaris.',
      heroImage: '/images/kaziranga_national_park.jpg',
      destinationId: assam.id,
      inclusions: {
        create: [
          { text: 'Sedan Transfer' },
          { text: 'Elephant Safari' },
          { text: 'Jeep Safari' },
          { text: 'Hotel' }
        ]
      },
      images: {
        create: [
          { url: '/images/kaziranga_national_park.jpg' },
          { url: 'https://images.unsplash.com/photo-1626714486519-7d848773eb9d?q=80&w=2670&auto=format&fit=crop' } // Rhino placeholder
        ]
      }
    }
  });

  console.log('Kaziranga package created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
