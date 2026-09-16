const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tempos = [
  {
    slug: 'force-urbania-13-seater',
    name: 'Force Urbania 13 Seater',
    type: 'Force Urbania',
    seatingCapacity: '13',
    acAvailable: true,
    luggageCapacity: 'Medium',
    shortDescription: 'Luxury travel for up to 13 passengers with advanced comfort.',
    description: 'Experience the pinnacle of group travel luxury with the all-new Force Urbania. Features premium seating, advanced suspension, and panoramic windows.',
    features: 'Premium Reclining Seats,Advanced Air Suspension,Individual AC Vents,Panoramic Windows',
    facilities: 'Music System, Reading Lights, USB Charging',
    pricePerDay: '8500',
    pricePerKm: '30',
    outstationRate: '9000',
    localPackageRate: '4000',
    airportTransfer: '2500',
    mainImage: '/images/tempos/urbania_13_front_1789519972160.jpg',
    galleryImages: [
      '/images/tempos/urbania_13_side_1789519985479.jpg',
      '/images/tempos/urbania_13_interior_1789519998262.jpg',
      '/images/tempos/urbania_13_dashboard_1789520012189.jpg'
    ]
  },
  {
    slug: 'force-urbania-16-seater',
    name: 'Force Urbania 16 Seater',
    type: 'Force Urbania',
    seatingCapacity: '16',
    acAvailable: true,
    luggageCapacity: 'Large',
    shortDescription: 'The extended luxury van for groups up to 16.',
    description: 'The extended version of the premium Force Urbania, perfect for larger groups demanding the highest standards of comfort and safety.',
    features: 'Premium Reclining Seats,Advanced Air Suspension,Individual AC Vents,Extra Luggage Space',
    facilities: 'Music System, Reading Lights, USB Charging, LED TV',
    pricePerDay: '9500',
    pricePerKm: '32',
    outstationRate: '10000',
    localPackageRate: '4500',
    airportTransfer: '3000',
    mainImage: '/images/tempos/urbania_16_front_1789520031263.jpg',
    galleryImages: [
      '/images/tempos/urbania_16_side_1789520041888.jpg',
      '/images/tempos/urbania_16_interior_1789520052623.jpg',
      '/images/tempos/urbania_16_passenger_1789520065393.jpg'
    ]
  },
  {
    slug: 'tempo-traveller-13-seater',
    name: 'Tempo Traveller 13 Seater',
    type: 'Tempo Traveller',
    seatingCapacity: '13',
    acAvailable: true,
    luggageCapacity: 'Medium',
    shortDescription: 'Reliable and comfortable travel for standard groups.',
    description: 'A highly reliable and comfortable option for group tours. Features pushback seats and excellent visibility for sightseeing.',
    features: 'Pushback Seats,Air Conditioned,Entertainment System,Ample Legroom',
    facilities: 'Music System, Mobile Charging, First Aid',
    pricePerDay: '6500',
    pricePerKm: '24',
    outstationRate: '7000',
    localPackageRate: '3500',
    airportTransfer: '2000',
    mainImage: '/images/tempos/tempo_13_front_1789520086955.jpg',
    galleryImages: [
      '/images/tempos/tempo_13_side_1789520099884.jpg',
      '/images/tempos/tempo_13_interior_1789520114220.jpg',
      '/images/tempos/tempo_13_passenger_1789520124898.jpg'
    ]
  },
  {
    slug: 'tempo-traveller-17-seater',
    name: 'Tempo Traveller 17 Seater',
    type: 'Tempo Traveller',
    seatingCapacity: '17',
    acAvailable: true,
    luggageCapacity: 'Large',
    shortDescription: 'Ideal for medium to large groups with great comfort.',
    description: 'Ideal for medium to large groups. A perfect balance of space, comfort, and maneuverability on the winding roads of the Northeast.',
    features: 'Pushback Seats,Air Conditioned,Entertainment System,Overhead Luggage',
    facilities: 'Music System, Reading Lights, USB Charging',
    pricePerDay: '7500',
    pricePerKm: '26',
    outstationRate: '8000',
    localPackageRate: '4000',
    airportTransfer: '2500',
    mainImage: '/images/luxury_tempo_ai.jpg',
    galleryImages: []
  },
  {
    slug: 'tempo-traveller-25-seater',
    name: 'Tempo Traveller 25 Seater',
    type: 'Tempo Traveller',
    seatingCapacity: '25',
    acAvailable: true,
    luggageCapacity: 'Extra Large',
    shortDescription: 'The ultimate solution for large group tours.',
    description: 'The ultimate solution for large group tours, corporate trips, or extended family vacations. Maximum space and comfort.',
    features: 'High Back Seats,Air Conditioned,Large Luggage Boot,PA System',
    facilities: 'Music System, Guide Mic, First Aid',
    pricePerDay: '9500',
    pricePerKm: '30',
    outstationRate: '10000',
    localPackageRate: '5500',
    airportTransfer: '3500',
    mainImage: '/images/standard_tempo_ai.jpg',
    galleryImages: []
  }
];

async function main() {
  console.log('Seeding Tempos...');
  await prisma.tempoTraveller.deleteMany(); // Clear old ones

  for (const t of tempos) {
    const created = await prisma.tempoTraveller.create({
      data: {
        slug: t.slug,
        name: t.name,
        type: t.type,
        seatingCapacity: t.seatingCapacity,
        acAvailable: t.acAvailable,
        luggageCapacity: t.luggageCapacity,
        shortDescription: t.shortDescription,
        description: t.description,
        features: t.features,
        facilities: t.facilities,
        pricePerDay: t.pricePerDay,
        pricePerKm: t.pricePerKm,
        outstationRate: t.outstationRate,
        localPackageRate: t.localPackageRate,
        airportTransfer: t.airportTransfer,
        mainImage: t.mainImage,
        gallery: {
          create: t.galleryImages.map(url => ({ url }))
        }
      }
    });
    console.log(`Created: ${created.name}`);
  }
  console.log('Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
