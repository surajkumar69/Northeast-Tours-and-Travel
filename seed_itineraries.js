const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const shillongItinerary = [
  { day: 1, title: 'Arrival in Guwahati & Transfer to Shillong', description: 'Arrive at Guwahati Airport/Railway Station. En route to Shillong, stop at the beautiful Umiam Lake (Barapani) for breathtaking views. Check into your premium hotel in Shillong and relax for the evening.' },
  { day: 2, title: 'Shillong Local Sightseeing', description: 'After breakfast, explore Shillong locally. Visit Ward’s Lake, Don Bosco Museum, Elephant Falls, and Shillong Peak for a panoramic view of the city. Spend your evening exploring the vibrant Police Bazaar.' },
  { day: 3, title: 'Shillong to Cherrapunji', description: 'Head to Cherrapunji, famous for its rainfall. Visit the majestic Nohkalikai Falls, Seven Sisters Falls, and Mawsmai Cave. Check into your Cherrapunji resort and enjoy the pristine natural surroundings.' },
  { day: 4, title: 'Double Decker Root Bridge & Local Exploration', description: 'Embark on an adventure to the incredible Double Decker Living Root Bridge in Nongriat (or opt for a relaxed day exploring local scenic spots). Experience the rich bio-engineering of the Khasi tribes.' },
  { day: 5, title: 'Dawki & Mawlynnong Village', description: 'Proceed to Dawki near the Bangladesh border and enjoy a boat ride on the crystal-clear Umngot River. Visit Mawlynnong, famously known as Asia’s cleanest village, before heading back to Shillong.' },
  { day: 6, title: 'Departure from Guwahati', description: 'Enjoy your final morning breakfast in Shillong. Drive back to Guwahati and transfer to the Airport or Railway Station for your onward journey with unforgettable memories.' }
];

const tawangItinerary = [
  { day: 1, title: 'Guwahati to Bhalukpong / Dirang', description: 'Pickup from Guwahati and embark on a scenic drive towards the hills of Arunachal Pradesh. Check into your hotel in Dirang or Bhalukpong for an overnight stay.' },
  { day: 2, title: 'Dirang Sightseeing & Acclimatization', description: 'Explore the picturesque Dirang Valley. Visit the Dirang Dzong, local monasteries, and hot water springs. Enjoy the beautiful landscapes as you acclimatize to the altitude.' },
  { day: 3, title: 'Dirang to Tawang via Sela Pass', description: 'Early departure for Tawang. Cross the spectacular Sela Pass (13,700 ft) and Sela Lake. Stop at the Jaswant Garh War Memorial and witness the stunning Nuranang Falls before arriving in Tawang.' },
  { day: 4, title: 'Tawang Local Sightseeing', description: 'Visit the majestic Tawang Monastery (Gaden Namgyal Lhatse), one of the largest in the world. Explore the Urgelling Monastery and visit the Tawang War Memorial, followed by an evening light show.' },
  { day: 5, title: 'Bum La Pass & PTSO Lake (Optional)', description: 'Take an excursion to Bum La Pass at the Indo-China border (subject to special permits and weather). Visit the beautiful Pangateng Tso (PTSO) Lake and Madhuri Lake. Return to Tawang.' },
  { day: 6, title: 'Tawang to Bomdila / Return Journey', description: 'Begin your descent from Tawang. Arrive in Bomdila, visit the Bomdila Monastery, and enjoy panoramic views of the Himalayan ranges before preparing for your final journey back to Guwahati.' }
];

const defaultInclusions = [
  'Accommodation in Premium/3-Star Hotels',
  'Daily Breakfast and Dinner',
  'Private AC Vehicle for sightseeing and transfers',
  'Driver allowance, toll, parking, and state taxes',
  'Airport/Railway Station Pickup and Drop'
];

const defaultExclusions = [
  'Airfare / Train Tickets',
  'Entry fees to monuments and parks',
  'Lunch and personal expenses (laundry, tips, etc.)',
  'Permit fees for Bum La Pass (if applicable)',
  'Any activities not mentioned in inclusions'
];

const defaultHighlights = [
  'Comfortable Private Transportation',
  'Expert Local Guides (on request)',
  'Premium Accommodation',
  'Customizable Sightseeing'
];

async function seedPackages() {
  const shillong = await prisma.tourPackage.findUnique({ where: { slug: 'shillong-cherrapunji-5n-6d' }});
  if (shillong) {
    // Delete existing to prevent duplicates
    await prisma.itineraryDay.deleteMany({ where: { packageId: shillong.id }});
    await prisma.packageInclusion.deleteMany({ where: { packageId: shillong.id }});
    await prisma.packageExclusion.deleteMany({ where: { packageId: shillong.id }});
    await prisma.packageHighlight.deleteMany({ where: { packageId: shillong.id }});

    for (const item of shillongItinerary) {
      await prisma.itineraryDay.create({ data: { ...item, packageId: shillong.id }});
    }
    for (const item of defaultInclusions) {
      await prisma.packageInclusion.create({ data: { text: item, packageId: shillong.id }});
    }
    for (const item of defaultExclusions) {
      await prisma.packageExclusion.create({ data: { text: item, packageId: shillong.id }});
    }
    for (const item of defaultHighlights) {
      await prisma.packageHighlight.create({ data: { text: item, packageId: shillong.id }});
    }
    console.log('Shillong itinerary seeded.');
  }

  const tawang = await prisma.tourPackage.findUnique({ where: { slug: 'tawang-tour-5n-6d' }});
  if (tawang) {
    await prisma.itineraryDay.deleteMany({ where: { packageId: tawang.id }});
    await prisma.packageInclusion.deleteMany({ where: { packageId: tawang.id }});
    await prisma.packageExclusion.deleteMany({ where: { packageId: tawang.id }});
    await prisma.packageHighlight.deleteMany({ where: { packageId: tawang.id }});

    for (const item of tawangItinerary) {
      await prisma.itineraryDay.create({ data: { ...item, packageId: tawang.id }});
    }
    for (const item of defaultInclusions) {
      await prisma.packageInclusion.create({ data: { text: item, packageId: tawang.id }});
    }
    for (const item of defaultExclusions) {
      await prisma.packageExclusion.create({ data: { text: item, packageId: tawang.id }});
    }
    for (const item of defaultHighlights) {
      await prisma.packageHighlight.create({ data: { text: item, packageId: tawang.id }});
    }
    console.log('Tawang itinerary seeded.');
  }
}

seedPackages()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
