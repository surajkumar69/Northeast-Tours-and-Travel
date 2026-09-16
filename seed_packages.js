const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding Shillong-Cherrapunji Tour...");
  
  const shillongPackage = await prisma.tourPackage.upsert({
    where: { slug: 'shillong-cherrapunji-5n-6d' },
    update: {},
    create: {
      slug: 'shillong-cherrapunji-5n-6d',
      title: 'Shillong–Cherrapunji Tour',
      duration: '5 Nights / 6 Days',
      price: '₹ 18,500',
      priceLabel: 'per person',
      startingPoint: 'Guwahati',
      shortDescription: 'Explore the Scotland of the East. Visit the beautiful rolling hills of Shillong and the majestic waterfalls of Cherrapunji.',
      description: 'Immerse yourself in the breathtaking beauty of Meghalaya. From the pristine lakes of Shillong to the dramatic living root bridges and cascading waterfalls of Cherrapunji, this 6-day itinerary is designed to give you a complete premium tour of the Abode of Clouds.',
      coverImage: '/images/ai-generated/shillong_cover_1789536703141.jpg',
      hotels: 'Premium 4-Star / Boutique',
      transportation: 'Maruti Suzuki Ertiga / Innova Crysta',
      isActive: true,
      sortOrder: 1,
    }
  });

  // Add gallery images
  await prisma.packageImage.deleteMany({ where: { packageId: shillongPackage.id } });
  await prisma.packageImage.createMany({
    data: [
      { packageId: shillongPackage.id, url: '/images/ai-generated/shillong_cover_1789536703141.jpg', altText: 'Shillong misty mountains' },
      { packageId: shillongPackage.id, url: '/images/ai-generated/shillong_gallery_1_1789536715356.jpg', altText: 'Cherrapunji waterfall' },
      { packageId: shillongPackage.id, url: '/images/ai-generated/shillong_gallery_2_1789536727916.jpg', altText: 'Winding mountain road Meghalaya' }
    ]
  });

  console.log("Adding Tawang Tour Package...");
  
  const tawangPackage = await prisma.tourPackage.upsert({
    where: { slug: 'tawang-tour-5n-6d' },
    update: {},
    create: {
      slug: 'tawang-tour-5n-6d',
      title: 'Tawang Tour Package',
      duration: '5 Nights / 6 Days',
      price: '₹ 22,000',
      priceLabel: 'per person',
      startingPoint: 'Guwahati',
      shortDescription: 'Discover the hidden valleys of Arunachal Pradesh. Experience snow-capped Himalayan peaks and ancient monasteries in Tawang.',
      description: 'Journey through the rugged Himalayan landscapes of Arunachal Pradesh. Visit the world-famous Tawang Monastery, cross the Sela Pass at 13,700 feet, and witness pristine alpine lakes and valleys. A truly premium Himalayan adventure.',
      coverImage: '/images/ai-generated/himalayan_landscape_2_1789535426416.jpg',
      hotels: 'Premium 3-Star / Luxury Tents',
      transportation: 'Toyota Innova Crysta / Mahindra Scorpio',
      isActive: true,
      sortOrder: 2,
    }
  });

  // Add gallery images
  await prisma.packageImage.deleteMany({ where: { packageId: tawangPackage.id } });
  await prisma.packageImage.createMany({
    data: [
      { packageId: tawangPackage.id, url: '/images/ai-generated/himalayan_landscape_2_1789535426416.jpg', altText: 'Tawang Monastery' },
      { packageId: tawangPackage.id, url: '/images/ai-generated/himalayan_landscape_3_1789535445439.jpg', altText: 'Snow covered Himalayan mountains' },
      { packageId: tawangPackage.id, url: '/images/ai-generated/himalayan_landscape_1_1789535411893.jpg', altText: 'Sela Pass road' }
    ]
  });

  console.log("Packages added successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
