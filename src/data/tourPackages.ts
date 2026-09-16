
export type DayPlan = {
  day: number;
  title: string;
  activities: string[];
};

export type TourPackage = {
  id: string;
  slug: string;
  title: string;
  duration: string;
  destination: string;
  category: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  price: string;
  priceLabel: string;
  highlights: string[];
  itinerary: DayPlan[];
  inclusions: string[];
  exclusions: string[];
  importantNotes: string[];
  bookingInfo: {
    phone: string;
    email: string;
    whatsappMessage: (pkgName: string, duration: string) => string;
  };
};

const defaultInclusions = [
  'Accommodations According to the Package',
  'Complimentary breakfast',
  'Meals: Dinner (As per Request)',
  'Transportation As Per Itinerary',
  'All Sightseeing As Per Itinerary',
  'Toll Tax, Parking, Road Tax & Fuel Charges',
  'Driver fooding and lodging'
];

const defaultExclusions = [
  'Airfare / Train Fare',
  'Entry fees for tourist places',
  'Any Drinks, Laundry, Camera fees etc',
  'Travel Insurance',
  'Any guide fees and tips',
  'Personal expenses',
  'Anything not mentioned in the inclusion'
];

const defaultNotes = [
  'Booking Receipt: We will send a booking receipt/confirmation upon receiving your booking request.',
  'Payment Confirmation: Any booking is confirmed by depositing an advance payment @ 30% amount of the Total Cost of the Package.',
  'Balance Payment has to be made in full advance before 10 days of the tour date.',
  'Cancellation: More than 45 days before Arrival 10% of the Total package cost.',
  'Check weather forecasts before traveling and respect local culture and Traditions.'
];

const defaultBookingInfo = {
  phone: '+917640076969',
  email: 'thedivinetravel01@gmail.com',
  whatsappMessage: (pkgName: string, duration: string) => 
    `Hello, I am interested in booking the ${pkgName} (${duration}) package. Please provide more details.`
};

export const tourPackages: TourPackage[] = [
  {
    id: 'pkg-1',
    slug: 'shillong-cherrapunji-5n-6d',
    title: 'Meghalaya With Kamakhya Temple',
    duration: '5 Days / 4 Nights',
    destination: 'Meghalaya & Assam',
    category: 'Assam & Meghalaya',
    shortDescription: 'Explore the serene hills of Meghalaya and seek blessings at the sacred Kamakhya Temple.',
    description: 'Experience the perfect blend of spirituality and nature. Begin your journey with the divine Kamakhya Temple in Assam, followed by an immersive exploration of Meghalaya’s living root bridges, crystal-clear rivers, and breathtaking waterfalls.',
    coverImage: '/images/meghalaya_waterfall_1789460321208.jpg',
    gallery: [
      '/images/meghalaya_waterfall_1789460321208.jpg',
      '/images/meghalaya_root_bridge_1789460307682.jpg',
      '/images/meghalaya_dawki_river_1789460337488.jpg',
      '/images/assam_temple_1789460276376.jpg'
    ],
    price: '₹11,000/-',
    priceLabel: 'per person',
    highlights: ['Darshan at Kamakhya Temple', 'Umiam Lake Viewpoint', 'Cherrapunjee Waterfalls', 'Dawki River Boating', 'Mawlynnong Cleanest Village'],
    itinerary: [
      { day: 1, title: 'Arrival in Guwahati & Kamakhya Temple', activities: ['Arrive at Guwahati Airport/Railway Station.', 'Visit the sacred Kamakhya Temple.', 'Proceed to Shillong, the Scotland of the East.', 'Stop at Umiam Lake for breathtaking sunset views.'] },
      { day: 2, title: 'Shillong to Cherrapunjee Sightseeing', activities: ['Drive to Cherrapunjee, known for its heavy rainfall.', 'Visit Nohkalikai Falls and Seven Sisters Falls.', 'Explore Mawsmai Cave and Awrah Cave.', 'Overnight stay in Cherrapunjee.'] },
      { day: 3, title: 'Double Decker Root Bridge Trek', activities: ['Early morning trek to the Double Decker Living Root Bridge in Nongriat.', 'Experience the natural bio-engineering of the Khasi tribes.', 'Relax by the natural pools.', 'Return to hotel for rest.'] },
      { day: 4, title: 'Dawki and Mawlynnong Village', activities: ['Proceed to Dawki near the Bangladesh border.', 'Enjoy a boat ride on the crystal-clear Umngot River.', 'Visit Mawlynnong, Asia’s cleanest village.', 'Return to Shillong for overnight stay.'] },
      { day: 5, title: 'Departure from Guwahati', activities: ['Morning local sightseeing in Shillong.', 'Drive back to Guwahati.', 'Drop-off at Airport/Railway station for onward journey.'] }
    ],
    inclusions: defaultInclusions,
    exclusions: defaultExclusions,
    importantNotes: defaultNotes,
    bookingInfo: defaultBookingInfo
  },
  {
    id: 'pkg-2',
    slug: 'tawang-tour-5n-6d',
    title: 'Arunachal Pradesh Adventure & Tawang Trip',
    duration: '7 Days / 6 Nights',
    destination: 'Arunachal Pradesh',
    category: 'Arunachal Pradesh',
    shortDescription: 'Journey through the dawn-lit mountains to the ancient Tawang Monastery and pristine Sela Pass.',
    description: 'A thrilling high-altitude adventure into the heart of Arunachal Pradesh. Cross the snow-covered Sela Pass, witness the grandeur of the Tawang Monastery, and immerse yourself in the rich Buddhist culture of the Himalayas.',
    coverImage: '/images/arunachal_monastery_1789460394921.jpg',
    gallery: [
      '/images/arunachal_monastery_1789460394921.jpg',
      '/images/arunachal_sela_pass_1789460408512.jpg',
      "https://images.unsplash.com/photo-1626714486519-7d848773eb9d?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626714486519-7d848773eb9d?q=80&w=2670&auto=format&fit=crop"
    ],
    price: 'Price on Request',
    priceLabel: 'custom pricing',
    highlights: ['Cross Sela Pass at 13,700 ft', 'Visit Tawang Monastery', 'Nuranang Waterfall', 'Bum La Pass', 'Dirang Valley'],
    itinerary: [
      { day: 1, title: 'Guwahati to Bhalukpong', activities: ['Pickup from Guwahati.', 'Scenic drive to Bhalukpong at the border of Assam and Arunachal.', 'Evening at leisure by the Kameng River.'] },
      { day: 2, title: 'Bhalukpong to Dirang', activities: ['Drive through the winding mountain roads.', 'Visit the Tipi Orchidarium.', 'Arrive in the picturesque Dirang Valley.', 'Visit Dirang Dzong and local monasteries.'] },
      { day: 3, title: 'Dirang to Tawang via Sela Pass', activities: ['Early departure for Tawang.', 'Cross the spectacular Sela Pass and Sela Lake.', 'Stop at the Jaswant Garh War Memorial.', 'Visit Nuranang Falls before arriving in Tawang.'] },
      { day: 4, title: 'Tawang Local Sightseeing', activities: ['Visit the majestic Tawang Monastery (Gaden Namgyal Lhatse).', 'Explore the Urgelling Monastery, birthplace of the 6th Dalai Lama.', 'Visit the Tawang War Memorial and enjoy the evening light show.'] },
      { day: 5, title: 'Bum La Pass & PTSO Lake (Optional)', activities: ['Excursion to Bum La Pass at the Indo-China border (requires special permit).', 'Visit the beautiful Pangateng Tso (PTSO) Lake and Madhuri Lake.', 'Return to Tawang.'] },
      { day: 6, title: 'Tawang to Bomdila', activities: ['Descend from Tawang.', 'Arrive in Bomdila and visit the Bomdila Monastery.', 'Enjoy panoramic views of the Himalayan ranges.'] },
      { day: 7, title: 'Bomdila to Guwahati', activities: ['Morning departure for Guwahati.', 'Drop-off at Guwahati Airport/Railway station.'] }
    ],
    inclusions: defaultInclusions,
    exclusions: defaultExclusions,
    importantNotes: defaultNotes,
    bookingInfo: defaultBookingInfo
  },
  {
    id: 'pkg-3',
    slug: 'kaziranga-wildlife-safari',
    title: 'Kaziranga Wildlife Explorer',
    duration: '3 Days / 2 Nights',
    destination: 'Assam',
    category: 'Assam',
    shortDescription: 'Spot the majestic one-horned rhinoceros and diverse wildlife in this UNESCO World Heritage site.',
    description: 'An unforgettable wildlife safari experience in the world-renowned Kaziranga National Park. Enjoy thrilling elephant and jeep safaris while spotting rhinos, tigers, wild water buffaloes, and exotic bird species.',
    coverImage: '/images/ai-generated/kaziranga_rhino_ai.jpg',
    gallery: [
      '/images/ai-generated/kaziranga_rhino_ai.jpg',
      '/images/assam_majuli_river_1789460244378.jpg',
      '/images/assam_tea_estate_1789460102115.jpg',
      '/images/assam_culture_1789460260883.jpg'
    ],
    price: '₹12,500/-',
    priceLabel: 'for 2 persons',
    highlights: ['Elephant Safari in Central Range', 'Jeep Safari in Western Range', 'Kaziranga Orchid Park', 'Assam Tea Garden Visit'],
    itinerary: [
      { day: 1, title: 'Guwahati to Kaziranga', activities: ['Pickup from Guwahati Airport/Station.', 'Scenic drive to Kaziranga National Park (approx 4.5 hours).', 'Check-in to your resort/hotel.', 'Evening visit to the Kaziranga Orchid and Biodiversity Park.'] },
      { day: 2, title: 'Kaziranga Safaris', activities: ['Early morning Elephant Safari in the Central (Kohora) range.', 'Return to hotel for breakfast.', 'Afternoon Jeep Safari in the Western (Bagori) range.', 'Explore the nearby lush green Assam tea estates.'] },
      { day: 3, title: 'Departure', activities: ['Morning breakfast at the resort.', 'Drive back to Guwahati.', 'Drop-off at Airport/Station.'] }
    ],
    inclusions: defaultInclusions,
    exclusions: defaultExclusions,
    importantNotes: defaultNotes,
    bookingInfo: defaultBookingInfo
  }
];
