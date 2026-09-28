const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Deactivate ALL vehicles first
  await prisma.taxiVehicle.updateMany({ data: { isActive: false } });
  await prisma.tempoTraveller.updateMany({ data: { isActive: false } });

  console.log('Deactivated all vehicles.');

  // 2. Reactivate and update specific vehicles

  // Swift Dzire
  await prisma.taxiVehicle.upsert({
    where: { slug: 'swift-dzire' },
    update: { 
      isActive: true, 
      name: 'Swift Dzire', 
      shortDescription: 'Comfortable sedan for small families and couples.',
      mainImage: '/images/ai-generated/fleet/fleet_swift_dzire_1790610827259.jpg' 
    },
    create: {
      slug: 'swift-dzire',
      name: 'Swift Dzire',
      type: 'Sedan',
      model: 'Maruti Suzuki',
      seatingCapacity: '4+1',
      shortDescription: 'Comfortable sedan for small families and couples.',
      mainImage: '/images/ai-generated/fleet/fleet_swift_dzire_1790610827259.jpg',
      pricePerDay: '₹3,500 onwards'
    }
  });

  // Vitara Brezza
  await prisma.taxiVehicle.upsert({
    where: { slug: 'vitara-brezza' },
    update: { 
      isActive: true, 
      name: 'Vitara Brezza',
      shortDescription: 'Compact SUV suitable for rugged mountain terrains.',
      mainImage: '/images/ai-generated/fleet/fleet_vitara_brezza_1790610848811.jpg' 
    },
    create: {
      slug: 'vitara-brezza',
      name: 'Vitara Brezza',
      type: 'SUV',
      model: 'Maruti Suzuki',
      seatingCapacity: '4+1',
      shortDescription: 'Compact SUV suitable for rugged mountain terrains.',
      mainImage: '/images/ai-generated/fleet/fleet_vitara_brezza_1790610848811.jpg',
      pricePerDay: '₹4,000 onwards'
    }
  });

  // Ertiga
  await prisma.taxiVehicle.upsert({
    where: { slug: 'ertiga' },
    update: { 
      isActive: true, 
      name: 'Ertiga',
      shortDescription: 'Spacious MUV ideal for families.',
      mainImage: '/images/ai-generated/fleet/fleet_ertiga_1790610878945.jpg' 
    },
    create: {
      slug: 'ertiga',
      name: 'Ertiga',
      type: 'MUV',
      model: 'Maruti Suzuki',
      seatingCapacity: '6+1',
      shortDescription: 'Spacious MUV ideal for families.',
      mainImage: '/images/ai-generated/fleet/fleet_ertiga_1790610878945.jpg',
      pricePerDay: '₹4,500 onwards'
    }
  });

  // 13/17 Seater Tempo Traveller
  await prisma.tempoTraveller.upsert({
    where: { slug: 'tempo-traveller-13-17' },
    update: { 
      isActive: true, 
      name: '13/17 Seater Tempo Traveller',
      shortDescription: 'Comfortable group travel across Northeast India.',
      mainImage: '/images/ai-generated/fleet/fleet_tempo_13_1790610927005.jpg' 
    },
    create: {
      slug: 'tempo-traveller-13-17',
      name: '13/17 Seater Tempo Traveller',
      type: 'Mini Bus',
      seatingCapacity: '13-17',
      shortDescription: 'Comfortable group travel across Northeast India.',
      mainImage: '/images/ai-generated/fleet/fleet_tempo_13_1790610927005.jpg',
      pricePerDay: '₹7,500 onwards'
    }
  });

  // 25 Seater Tempo Traveller
  await prisma.tempoTraveller.upsert({
    where: { slug: 'tempo-traveller-25' },
    update: { 
      isActive: true, 
      name: '25 Seater Tempo Traveller',
      shortDescription: 'Large group travel vehicle.',
      mainImage: '/images/ai-generated/fleet/fleet_tempo_25_1790611009123.jpg' 
    },
    create: {
      slug: 'tempo-traveller-25',
      name: '25 Seater Tempo Traveller',
      type: 'Mini Bus',
      seatingCapacity: '25',
      shortDescription: 'Large group travel vehicle.',
      mainImage: '/images/ai-generated/fleet/fleet_tempo_25_1790611009123.jpg',
      pricePerDay: '₹9,500 onwards'
    }
  });

  // 12/16 Seater Urbania
  await prisma.tempoTraveller.upsert({
    where: { slug: 'urbania-12-16' },
    update: { 
      isActive: true, 
      name: '12/16 Seater Urbania',
      shortDescription: 'Modern, high-end travel experience for groups.',
      mainImage: '/images/ai-generated/fleet/fleet_urbania_1790611032421.jpg' 
    },
    create: {
      slug: 'urbania-12-16',
      name: '12/16 Seater Urbania',
      type: 'Mini Bus',
      seatingCapacity: '12-16',
      shortDescription: 'Modern, high-end travel experience for groups.',
      mainImage: '/images/ai-generated/fleet/fleet_urbania_1790611032421.jpg',
      pricePerDay: '₹11,000 onwards'
    }
  });

  console.log('Vehicles updated successfully.');

  // Remove "Premium" from any active vehicle descriptions/names just in case
  const activeTaxis = await prisma.taxiVehicle.findMany({ where: { isActive: true } });
  for (const taxi of activeTaxis) {
    if (taxi.shortDescription?.includes('Premium') || taxi.description?.includes('Premium') || taxi.name?.includes('Premium')) {
      await prisma.taxiVehicle.update({
        where: { id: taxi.id },
        data: {
          name: taxi.name.replace(/Premium /gi, '').replace(/Premium/gi, ''),
          shortDescription: taxi.shortDescription?.replace(/Premium /gi, '')?.replace(/Premium/gi, ''),
          description: taxi.description?.replace(/Premium /gi, '')?.replace(/Premium/gi, '')
        }
      });
    }
  }

  const activeTempos = await prisma.tempoTraveller.findMany({ where: { isActive: true } });
  for (const tempo of activeTempos) {
    if (tempo.shortDescription?.includes('Premium') || tempo.description?.includes('Premium') || tempo.name?.includes('Premium')) {
      await prisma.tempoTraveller.update({
        where: { id: tempo.id },
        data: {
          name: tempo.name.replace(/Premium /gi, '').replace(/Premium/gi, ''),
          shortDescription: tempo.shortDescription?.replace(/Premium /gi, '')?.replace(/Premium/gi, ''),
          description: tempo.description?.replace(/Premium /gi, '')?.replace(/Premium/gi, '')
        }
      });
    }
  }

  console.log('Premium keyword removed from vehicle descriptions.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
