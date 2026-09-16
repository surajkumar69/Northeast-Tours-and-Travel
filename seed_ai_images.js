const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Himalayan Landscapes
  console.log("Setting up Himalayan Landscapes...");
  const himalayan = await prisma.experience.upsert({
    where: { slug: 'himalayan-landscapes' },
    update: {
      title: 'Himalayan Landscapes',
      coverImage: '/images/ai-generated/himalayan_landscape_1_1789535411893.jpg',
      category: 'Nature & Scenery',
      fullDescription: 'Discover the breathtaking beauty of the Himalayan mountains, from snow-capped peaks in Arunachal Pradesh to lush green valleys in Sikkim. Experience the serene environment, misty roads, and cascading waterfalls that make Northeast India a true paradise for nature lovers.',
    },
    create: {
      slug: 'himalayan-landscapes',
      title: 'Himalayan Landscapes',
      coverImage: '/images/ai-generated/himalayan_landscape_1_1789535411893.jpg',
      category: 'Nature & Scenery',
      fullDescription: 'Discover the breathtaking beauty of the Himalayan mountains, from snow-capped peaks in Arunachal Pradesh to lush green valleys in Sikkim. Experience the serene environment, misty roads, and cascading waterfalls that make Northeast India a true paradise for nature lovers.',
    }
  });

  // Delete old gallery if re-running
  await prisma.experienceImage.deleteMany({ where: { experienceId: himalayan.id } });

  await prisma.experienceImage.createMany({
    data: [
      { experienceId: himalayan.id, url: '/images/ai-generated/himalayan_landscape_1_1789535411893.jpg', altText: 'Snow-covered Himalayan mountain valley at sunrise', sortOrder: 1 },
      { experienceId: himalayan.id, url: '/images/ai-generated/himalayan_landscape_2_1789535426416.jpg', altText: 'Tawang style mountain monastery in Arunachal Pradesh', sortOrder: 2 },
      { experienceId: himalayan.id, url: '/images/ai-generated/himalayan_landscape_3_1789535445439.jpg', altText: 'Sikkim mountain valleys at sunset', sortOrder: 3 },
      { experienceId: himalayan.id, url: '/images/ai-generated/himalayan_landscape_4_1789535524609.jpg', altText: 'Majestic Himalayan waterfall in a lush green valley', sortOrder: 4 },
    ]
  });

  // 2. Tribal Culture & Heritage
  console.log("Setting up Tribal Culture & Heritage...");
  const tribal = await prisma.experience.upsert({
    where: { slug: 'tribal-culture-heritage' },
    update: {
      title: 'Tribal Culture & Heritage',
      coverImage: '/images/ai-generated/tribal_culture_2_1789535556947.jpg',
      category: 'Culture & Heritage',
      fullDescription: 'Immerse yourself in the rich tapestry of Northeast India\'s indigenous tribal culture. Witness traditional village life, intricate local handicrafts, colorful cultural festivals, and authentic local markets. Respectful, authentic, and beautifully preserved heritage.',
    },
    create: {
      slug: 'tribal-culture-heritage',
      title: 'Tribal Culture & Heritage',
      coverImage: '/images/ai-generated/tribal_culture_2_1789535556947.jpg',
      category: 'Culture & Heritage',
      fullDescription: 'Immerse yourself in the rich tapestry of Northeast India\'s indigenous tribal culture. Witness traditional village life, intricate local handicrafts, colorful cultural festivals, and authentic local markets. Respectful, authentic, and beautifully preserved heritage.',
    }
  });

  await prisma.experienceImage.deleteMany({ where: { experienceId: tribal.id } });

  await prisma.experienceImage.createMany({
    data: [
      { experienceId: tribal.id, url: '/images/ai-generated/tribal_culture_1_1789535543398.jpg', altText: 'Traditional village life with local handicraft weaving', sortOrder: 1 },
      { experienceId: tribal.id, url: '/images/ai-generated/tribal_culture_2_1789535556947.jpg', altText: 'Cultural festival featuring indigenous architecture', sortOrder: 2 },
      { experienceId: tribal.id, url: '/images/ai-generated/tribal_culture_3_1789535569703.jpg', altText: 'Traditional local market in a tribal village', sortOrder: 3 },
      { experienceId: tribal.id, url: '/images/ai-generated/tribal_culture_4_1789535587225.jpg', altText: 'Indigenous tribal musicians with traditional instruments', sortOrder: 4 },
    ]
  });

  // 3. Maruti Suzuki Ertiga
  console.log("Setting up Maruti Suzuki Ertiga...");
  const ertiga = await prisma.taxiVehicle.findUnique({ where: { slug: 'ertiga' } });
  if (ertiga) {
    await prisma.taxiVehicle.update({
      where: { slug: 'ertiga' },
      data: {
        mainImage: '/images/ai-generated/ertiga_taxi_1_1789535603090.jpg'
      }
    });

    await prisma.taxiImage.deleteMany({ where: { taxiId: ertiga.id } });

    await prisma.taxiImage.createMany({
      data: [
        { taxiId: ertiga.id, url: '/images/ai-generated/ertiga_taxi_1_1789535603090.jpg', altText: 'Ertiga parked on a scenic misty mountain road', sortOrder: 1 },
        { taxiId: ertiga.id, url: '/images/ai-generated/ertiga_taxi_2_1789535616752.jpg', altText: 'Ertiga tourist taxi parked near a majestic waterfall', sortOrder: 2 },
      ]
    });
  }

  console.log("Database seeded successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
