export type SeoPage = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  type: 'tour' | 'taxi' | 'tempo' | 'urbania';
  intro: string;
  content: string;
  links: { text: string; url: string }[];
};

export const seoPages: SeoPage[] = [
  {
    slug: 'tour-package-shillong',
    title: 'Tour Package for Shillong | Majestic Northeast Tours',
    metaDescription: 'Find the perfect tour package for Shillong. Explore living root bridges, waterfalls, and scenic landscapes with our custom itineraries.',
    h1: 'Tour Package for Shillong',
    type: 'tour',
    intro: 'Looking for the perfect "tour package for Shillong"? Explore the Scotland of the East with our thoughtfully curated itineraries.',
    content: 'Shillong, the capital of Meghalaya, offers breathtaking landscapes, crystal clear lakes, and mesmerizing waterfalls. Our customized tour packages for Shillong cover all major attractions including Umiam Lake, Elephant Falls, Laitlum Canyons, and excursions to Cherrapunjee and Dawki.',
    links: [
      { text: 'Meghalaya With Kamakhya Temple', url: '/packages/shillong-cherrapunji-5n-6d' },
      { text: 'Guwahati to Shillong Taxi', url: '/routes/guwahati-to-shillong-taxi' }
    ]
  },
  {
    slug: 'tour-package-tawang',
    title: 'Tour Package for Tawang | Majestic Northeast Tours',
    metaDescription: 'Book an unforgettable tour package for Tawang. Experience the snow-capped mountains, ancient monasteries, and Sela Pass.',
    h1: 'Tour Package for Tawang',
    type: 'tour',
    intro: 'Searching for a reliable "tour package for Tawang"? Discover the pristine beauty of Arunachal Pradesh with our expertly crafted tours.',
    content: 'A journey to Tawang is an adventure through high-altitude passes and serene valleys. Our tour package for Tawang ensures a comfortable journey through Bhalukpong, Dirang, and Bomdila, reaching the majestic Tawang Monastery and crossing the snow-clad Sela Pass at 13,700 ft.',
    links: [
      { text: 'Arunachal Pradesh Adventure & Tawang Trip', url: '/packages/tawang-tour-5n-6d' }
    ]
  },
  {
    slug: 'tour-package-kaziranga',
    title: 'Tour Package for Kaziranga | Majestic Northeast Tours',
    metaDescription: 'Experience wildlife like never before with a tour package for Kaziranga. Spot one-horned rhinos on elephant and jeep safaris.',
    h1: 'Tour Package for Kaziranga',
    type: 'tour',
    intro: 'Book your "tour package for Kaziranga" to explore the UNESCO World Heritage Site and spot the majestic one-horned rhinoceros.',
    content: 'Kaziranga National Park is a haven for wildlife enthusiasts. Our Kaziranga tour packages include thrilling jeep safaris and early morning elephant safaris, comfortable stays in premium resorts, and visits to nearby attractions like the Orchid Park and sprawling tea estates.',
    links: [
      { text: 'Kaziranga Wildlife Explorer', url: '/packages/kaziranga-wildlife-safari' }
    ]
  },
  {
    slug: 'taxi-for-shillong',
    title: 'Taxi for Shillong | Book Cabs from Guwahati | Majestic Northeast',
    metaDescription: 'Need a reliable taxi for Shillong? We provide comfortable, well-maintained cabs for Guwahati to Shillong and local sightseeing.',
    h1: 'Taxi for Shillong',
    type: 'taxi',
    intro: 'If you are looking for a comfortable "taxi for Shillong", you have come to the right place. We offer premium cab services for your mountain journey.',
    content: 'Booking a taxi for Shillong is the best way to travel comfortably from Guwahati Airport or Railway Station. Our fleet includes Swift Dzire, Innova, and SUVs, driven by experienced locals who know the winding hill roads perfectly. Enjoy a safe and scenic drive.',
    links: [
      { text: 'View our Fleet', url: '/taxis' },
      { text: 'Guwahati to Shillong Cab Options', url: '/routes/guwahati-to-shillong-cab' }
    ]
  },
  {
    slug: 'cab-for-shillong',
    title: 'Cab for Shillong | Comfortable Rides | Majestic Northeast',
    metaDescription: 'Looking to hire a cab for Shillong? Get affordable rates, experienced drivers, and well-maintained vehicles for your trip.',
    h1: 'Cab for Shillong',
    type: 'taxi',
    intro: 'Reserve a "cab for Shillong" to ensure a hassle-free and comfortable travel experience in Meghalaya.',
    content: 'Whether you need an airport transfer or a dedicated vehicle for your entire Meghalaya tour, hiring a cab for Shillong with us guarantees reliability. Our transparent pricing and professional drivers make your journey to the Scotland of the East smooth and memorable.',
    links: [
      { text: 'Guwahati to Shillong Taxi', url: '/routes/guwahati-to-shillong-taxi' },
      { text: 'Explore our Fleet', url: '/taxis' }
    ]
  },
  {
    slug: 'best-taxi-service-northeast',
    title: 'Search: "Best taxi service for Northeast" | Majestic Tours',
    metaDescription: 'Searching for the best taxi service for Northeast India? We provide highly-rated, reliable transport across Assam, Meghalaya, and Arunachal.',
    h1: 'Looking for the "Best taxi service for Northeast"?',
    type: 'taxi',
    intro: 'Many travelers search for the "best taxi service for Northeast" India. At Majestic Northeast Tours, we strive to earn that title with every ride.',
    content: 'Travelers frequently ask us if we are the best taxi service for Northeast India. While we let our customers decide, we pride ourselves on offering exceptionally well-maintained vehicles, courteous local drivers, and 24/7 support across Assam, Meghalaya, Arunachal Pradesh, and beyond.',
    links: [
      { text: 'View All Routes', url: '/routes' },
      { text: 'Browse our Fleet', url: '/taxis' }
    ]
  },
  {
    slug: 'best-taxi-service-shillong',
    title: 'Search: "Best taxi service for Shillong" | Majestic Tours',
    metaDescription: 'Searching for the best taxi service for Shillong? Experience reliable, safe, and comfortable rides with our expert local drivers.',
    h1: 'Finding the "Best taxi service for Shillong"',
    type: 'taxi',
    intro: 'If your search history includes "best taxi service for Shillong", you value safety, reliability, and local expertise. We deliver exactly that.',
    content: 'Navigating the winding roads of Meghalaya requires skill. When travelers look for the best taxi service for Shillong, they are looking for drivers who prioritize safety without compromising on the experience. Our dedicated Shillong fleet is ready to provide you with a premium travel experience.',
    links: [
      { text: 'Guwahati to Shillong Cabs', url: '/routes/guwahati-to-shillong-cab' }
    ]
  },
  {
    slug: 'best-taxi-service-tawang',
    title: 'Search: "Best taxi service for Tawang" | Majestic Tours',
    metaDescription: 'Searching for the best taxi service for Tawang? Travel safely through high-altitude passes with our experienced mountain drivers.',
    h1: 'Looking for the "Best taxi service for Tawang"?',
    type: 'taxi',
    intro: 'A journey to Arunachal Pradesh is demanding. That is why so many search for the "best taxi service for Tawang" to ensure a safe trip over Sela Pass.',
    content: 'The road to Tawang is beautiful but challenging. When looking for the best taxi service for Tawang, you need powerful SUVs (like Innova or Sumo) and drivers accustomed to high-altitude, icy conditions. We provide robust vehicles and highly experienced drivers for your Arunachal adventure.',
    links: [
      { text: 'Arunachal Tour Packages', url: '/packages' }
    ]
  },
  {
    slug: 'tempo-traveller-for-shillong',
    title: 'Tempo Traveller for Shillong | Group Tours | Majestic Northeast',
    metaDescription: 'Hire a Tempo Traveller for Shillong for group trips. We offer 13 to 25 seater AC Tempo Travellers for comfortable group travel in Meghalaya.',
    h1: 'Tempo Traveller for Shillong',
    type: 'tempo',
    intro: 'Traveling in a group? Book a "Tempo Traveller for Shillong" to ensure everyone travels together comfortably.',
    content: 'A Tempo Traveller for Shillong is the ideal choice for family vacations, corporate trips, or friend groups. Our fleet includes well-maintained 13-seater to 25-seater luxury Tempo Travellers with ample luggage space and push-back seats, making the hill journey enjoyable for everyone.',
    links: [
      { text: '13/17 Seater Tempo Traveller', url: '/tempo-traveller/tempo-traveller-13-17' },
      { text: '25 Seater Tempo Traveller', url: '/tempo-traveller/tempo-traveller-25' }
    ]
  },
  {
    slug: 'tempo-traveller-for-guwahati',
    title: 'Tempo Traveller for Guwahati | Local & Outstation Rentals',
    metaDescription: 'Book a Tempo Traveller for Guwahati local sightseeing, airport transfers, or outstation tours across Northeast India.',
    h1: 'Tempo Traveller for Guwahati',
    type: 'tempo',
    intro: 'Need a "Tempo Traveller for Guwahati"? We provide spacious and reliable transport for groups starting their journey in Assam.',
    content: 'Guwahati is the gateway to the Northeast. Hiring a Tempo Traveller for Guwahati is perfect for local sightseeing (like Kamakhya Temple and river cruises), airport pickups, and starting your multi-day outstation tours to Meghalaya or Kaziranga. Enjoy AC comfort and professional service.',
    links: [
      { text: 'Explore our Tempo Travellers', url: '/tempo-traveller' }
    ]
  },
  {
    slug: 'tempo-traveller-for-kaziranga',
    title: 'Tempo Traveller for Kaziranga | Group Wildlife Tours',
    metaDescription: 'Hire a Tempo Traveller for Kaziranga National Park. Travel comfortably from Guwahati to Kaziranga with your entire group.',
    h1: 'Tempo Traveller for Kaziranga',
    type: 'tempo',
    intro: 'Planning a wildlife trip with friends or family? A "Tempo Traveller for Kaziranga" is the best way to travel together.',
    content: 'The 4.5-hour drive from Guwahati to the national park is scenic and smooth. When you book a Tempo Traveller for Kaziranga, your group can relax, enjoy the lush Assam landscapes, and arrive fresh for your wildlife safaris. We offer both standard and luxury configurations.',
    links: [
      { text: 'Kaziranga Tour Package', url: '/packages/kaziranga-wildlife-safari' },
      { text: 'Tempo Traveller Fleet', url: '/tempo-traveller' }
    ]
  },
  {
    slug: 'tempo-traveller-for-tawang',
    title: 'Tempo Traveller for Tawang | Group Tours in Arunachal',
    metaDescription: 'Book a reliable Tempo Traveller for Tawang. We provide powerful, well-maintained vehicles suitable for high-altitude group travel.',
    h1: 'Tempo Traveller for Tawang',
    type: 'tempo',
    intro: 'Looking for a reliable "Tempo Traveller for Tawang"? High-altitude group travel requires robust vehicles and expert driving.',
    content: 'Not all vehicles can handle the steep inclines and high passes of Arunachal Pradesh. Our Tempo Traveller for Tawang services utilize powerful, well-maintained vehicles driven by experts accustomed to the Sela Pass route. Travel safely with your group through the Himalayas.',
    links: [
      { text: 'Tawang Tour Packages', url: '/packages' }
    ]
  },
  {
    slug: 'urbania-for-shillong',
    title: 'Urbania for Shillong | Luxury Van Rental | Majestic Tours',
    metaDescription: 'Experience premium travel with a Force Urbania for Shillong. Luxury push-back seats and superior suspension for the ultimate comfort.',
    h1: 'Urbania for Shillong',
    type: 'urbania',
    intro: 'Upgrade your travel experience. Hire an "Urbania for Shillong" for premium comfort, extra legroom, and luxury features.',
    content: 'The Force Urbania is revolutionizing group travel. Booking an Urbania for Shillong guarantees a smooth ride over the hills thanks to its advanced suspension. With aircraft-like luxury seating, standing headroom, and panoramic windows, it is the ultimate way to experience Meghalaya.',
    links: [
      { text: '12/16 Seater Urbania', url: '/tempo-traveller/urbania-12-16' }
    ]
  },
  {
    slug: 'urbania-for-kaziranga',
    title: 'Urbania for Kaziranga | Luxury Travel | Majestic Tours',
    metaDescription: 'Book a Force Urbania for Kaziranga. Travel from Guwahati to the national park in unmatched luxury and comfort.',
    h1: 'Urbania for Kaziranga',
    type: 'urbania',
    intro: 'Travel to the wild in ultimate luxury. An "Urbania for Kaziranga" offers a premium, relaxed journey for your safari group.',
    content: 'Make the journey as memorable as the destination. Hiring an Urbania for Kaziranga ensures your group travels from Guwahati in spacious, air-conditioned luxury. The large windows provide excellent views of the Assam countryside and tea gardens along the way.',
    links: [
      { text: '12/16 Seater Urbania', url: '/tempo-traveller/urbania-12-16' },
      { text: 'Kaziranga Packages', url: '/packages/kaziranga-wildlife-safari' }
    ]
  },
  {
    slug: 'urbania-for-tawang',
    title: 'Urbania for Tawang | Premium Mountain Travel | Majestic Tours',
    metaDescription: 'Hire a Force Urbania for Tawang. Experience the rugged beauty of Arunachal Pradesh from the comfort of a luxury van.',
    h1: 'Urbania for Tawang',
    type: 'urbania',
    intro: 'Looking for luxury on the rugged mountain roads? An "Urbania for Tawang" provides the comfort you need for a long Himalayan journey.',
    content: 'The multi-day journey to Tawang involves long hours on winding mountain roads. Booking an Urbania for Tawang transforms this challenging drive into a comfortable, enjoyable experience. The powerful engine handles the steep gradients while passengers relax in luxury push-back seats.',
    links: [
      { text: '12/16 Seater Urbania', url: '/tempo-traveller/urbania-12-16' }
    ]
  },
  {
    slug: 'urbania-for-guwahati',
    title: 'Urbania for Guwahati | Premium Van Rental | Majestic Tours',
    metaDescription: 'Book a luxury Force Urbania for Guwahati airport transfers, corporate events, and premium local sightseeing.',
    h1: 'Urbania for Guwahati',
    type: 'urbania',
    intro: 'Need premium group transport in the city? Hire an "Urbania for Guwahati" for VIP travel, corporate groups, and luxury sightseeing.',
    content: 'Whether you need VIP airport transfers, transport for a corporate event, or a comfortable vehicle for local city tours, an Urbania for Guwahati is the premier choice. Enjoy unmatched passenger comfort, advanced safety features, and a sophisticated travel experience in Assam’s capital.',
    links: [
      { text: 'View Urbania Details', url: '/tempo-traveller/urbania-12-16' }
    ]
  }
];
