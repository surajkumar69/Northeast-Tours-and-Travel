const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateVehicles() {
  // Update Vitara Brezza
  await prisma.taxiVehicle.update({
    where: { slug: 'vitara-brezza' },
    data: {
      type: 'Compact Hill SUV',
      model: 'Maruti Suzuki Vitara Brezza',
      seatingCapacity: '5',
      luggageCapacity: '2–3 Bags',
      pricePerDay: '4000',
      shortDescription: 'Sturdy 5-seater compact SUV built for rugged hill curves, steep inclines, and swift sightseeing trips.',
      description: 'Sturdy 5-seater compact SUV built for rugged hill curves, steep inclines, and swift sightseeing trips.',
      features: '5 Seater Capacity, High Ground Clearance, Chilling Air Conditioning, Comfortable Suspension, Petrol Engine',
      mainImage: '/images/ai-generated/brezza_driving_ai.jpg'
    }
  });
  console.log('Updated Vitara Brezza');

  // Update Innova Crysta
  const innova = await prisma.taxiVehicle.findFirst({
    where: { name: { contains: 'Innova Crysta' } }
  });

  if (innova) {
    // Update main image
    await prisma.taxiVehicle.update({
      where: { id: innova.id },
      data: {
        mainImage: '/images/ai-generated/innova_front_ai.jpg'
      }
    });

    // Delete existing gallery images for Innova
    await prisma.taxiImage.deleteMany({
      where: { taxiId: innova.id }
    });

    // Add new gallery images
    const images = [
      '/images/ai-generated/innova_front_ai.jpg',
      '/images/ai-generated/innova_side_ai.jpg',
      '/images/ai-generated/innova_rear_ai.jpg',
      '/images/ai-generated/innova_interior_ai.jpg'
    ];

    for (let i = 0; i < images.length; i++) {
      await prisma.taxiImage.create({
        data: {
          url: images[i],
          sortOrder: i,
          taxiId: innova.id,
          altText: `Toyota Innova Crysta View ${i + 1}`
        }
      });
    }
    console.log('Updated Innova Crysta and Gallery');
  }
}

updateVehicles()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
