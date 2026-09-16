const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const taxis = [
  {
    slug: 'swift-dzire',
    name: 'Swift Dzire / Toyota Etios',
    type: 'Sedan',
    model: 'Maruti Suzuki Dzire / Toyota Etios',
    seatingCapacity: '4',
    acAvailable: true,
    luggageCapacity: '2 Large Bags',
    shortDescription: 'Comfortable sedan for couples or small families.',
    description: 'Perfect for small groups of up to 4 people. A budget-friendly yet comfortable option for sightseeing and inter-city transfers in Northeast India.',
    features: 'AC,Comfortable Seating,Music System,Well-Maintained',
    facilities: 'First Aid Kit, Water Bottles, Mobile Charger',
    pricePerDay: '3500',
    pricePerKm: '15',
    outstationRate: '4000',
    airportTransfer: '1200',
    mainImage: '/images/swift_dzire_main.jpg',
    galleryImages: []
  },
  {
    slug: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    type: 'MUV',
    model: 'Maruti Suzuki Ertiga',
    seatingCapacity: '6',
    acAvailable: true,
    luggageCapacity: '3 Medium Bags',
    shortDescription: 'Ideal MUV for groups of 4-6 members.',
    description: 'An affordable MUV that offers great mileage and seating capacity for up to 6 members. Excellent for family tours across Meghalaya and Assam.',
    features: 'AC,Reclining Seats,Ample Legroom,Music System',
    facilities: 'First Aid Kit, Roof Carrier (Optional), Mobile Charger',
    pricePerDay: '4500',
    pricePerKm: '18',
    outstationRate: '5000',
    airportTransfer: '1500',
    mainImage: '/images/ertiga_main.jpg',
    galleryImages: []
  },
  {
    slug: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    type: 'Premium SUV',
    model: 'Toyota Innova Crysta',
    seatingCapacity: '6',
    acAvailable: true,
    luggageCapacity: '4 Large Bags',
    shortDescription: 'Premium SUV offering unmatched comfort and safety.',
    description: 'The Toyota Innova Crysta is the gold standard for luxury travel in the hills. Features plush captain seats, powerful engine, and superior suspension.',
    features: 'Premium AC,Captain Seats,Superior Suspension,Luxury Interiors',
    facilities: 'Reading Lamps, USB Charging, First Aid Kit, Extra Legroom',
    pricePerDay: '6500',
    pricePerKm: '22',
    outstationRate: '7500',
    airportTransfer: '2500',
    mainImage: '/images/book_taxi_ai.jpg',
    galleryImages: []
  }
];

async function main() {
  console.log('Seeding Taxis...');
  await prisma.taxiVehicle.deleteMany(); // Clear old ones

  for (const t of taxis) {
    const created = await prisma.taxiVehicle.create({
      data: {
        slug: t.slug,
        name: t.name,
        type: t.type,
        model: t.model,
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
        airportTransfer: t.airportTransfer,
        mainImage: t.mainImage,
        gallery: {
          create: t.galleryImages.map(url => ({ url }))
        }
      }
    });
    console.log(`Created Taxi: ${created.name}`);
  }
  console.log('Done Taxis!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
