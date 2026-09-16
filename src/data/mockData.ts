export type Tour = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  price_display: string;
  main_image: string | null;
  gallery_images: (string | null)[];
  location: string;
  duration?: string;
  origin?: string;
  inclusions?: string[];
};

export const MOCK_TOURS: Tour[] = [
  {
    id: '1',
    slug: 'meghalaya',
    title: 'Meghalaya',
    short_description: 'Discover the living root bridges, crystal clear rivers, and the highest rainfall in the world in the Abode of Clouds.',
    price_display: 'Price on Request',
    main_image: '/images/tempos/urbania_13_front_1789519972160.jpg',
    gallery_images: [
      '/images/tempos/urbania_13_front_1789519972160.jpg',
      '/images/tempos/urbania_13_side_1789519985479.jpg',
      '/images/tempos/urbania_13_interior_1789519998262.jpg',
      '/images/tempos/urbania_13_dashboard_1789520012189.jpg'
    ],
    location: 'Meghalaya'
  },
  {
    id: '2',
    slug: 'assam-meghalaya',
    title: 'Assam & Meghalaya',
    short_description: 'Experience the perfect blend of Assam\'s tea gardens and Brahmaputra river with Meghalaya\'s mesmerizing waterfalls.',
    price_display: 'Price on Request',
    main_image: '/images/tempos/urbania_16_front_1789520031263.jpg',
    gallery_images: [
      '/images/tempos/urbania_16_front_1789520031263.jpg',
      '/images/tempos/urbania_16_side_1789520041888.jpg',
      '/images/tempos/urbania_16_interior_1789520052623.jpg',
      '/images/tempos/urbania_16_passenger_1789520065393.jpg'
    ],
    location: 'Assam & Meghalaya'
  },
  {
    id: '3',
    slug: 'meghalaya-arunachal-pradesh',
    title: 'Meghalaya & Arunachal Pradesh',
    short_description: 'Journey from the wettest place on earth to the land of dawn-lit mountains and ancient monasteries.',
    price_display: '₹22,500 per person',
    main_image: '/images/tempos/tempo_13_front_1789520086955.jpg',
    gallery_images: [
      '/images/tempos/tempo_13_front_1789520086955.jpg',
      '/images/tempos/tempo_13_side_1789520099884.jpg',
      '/images/tempos/tempo_13_interior_1789520114220.jpg',
      '/images/tempos/tempo_13_passenger_1789520124898.jpg'
    ],
    location: 'Meghalaya & Arunachal Pradesh'
  },
  {
    id: '4',
    slug: 'arunachal-pradesh',
    title: 'Arunachal Pradesh',
    short_description: 'Explore ancient monasteries, high altitude passes, and pristine glacial lakes in the easternmost part of India.',
    price_display: 'Price on Request',
    main_image: '/images/arunachal_monastery_1789460394921.jpg',
    gallery_images: [
      '/images/arunachal_monastery_1789460394921.jpg',
      '/images/arunachal_sela_pass_1789460408512.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/3e/Tawang_Monastery_view.jpg',
      '/images/arunachal_monastery_1789460394921.jpg'
    ],
    location: 'Arunachal Pradesh'
  },
  {
    id: '5',
    slug: 'kaziranga-national-park',
    title: 'Kaziranga National Park',
    short_description: 'Spot the majestic one-horned rhinoceros and diverse wildlife in this UNESCO World Heritage site.',
    price_display: 'Package starting from ₹25000/- (2person)',
    main_image: 'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?q=80&w=2670&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?q=80&w=2670&auto=format&fit=crop',
      '/images/kaziranga_national_park.jpg',
      '/images/assam_majuli_river_1789460244378.jpg',
      '/images/assam_tea_estate_1789460102115.jpg'
    ],
    location: 'Kaziranga National Park',
    duration: '2 night 3 days',
    origin: 'Ex-Guwahati',
    inclusions: ['Sedan transfer', 'Elephant safari', 'Jeep safari', 'Hotel']
  }
];

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  vehicle_type: string;
  seating_capacity: string | number;
  description: string;
  features?: string[];
  price_display: string;
  main_image: string | null;
  gallery_images: (string | null)[];
};

export const MOCK_TAXIS: Vehicle[] = [
  {
    id: '1',
    slug: 'swift-dzire',
    name: 'Maruti Suzuki Swift Dzire',
    vehicle_type: 'Sedan',
    seating_capacity: 4,
    description: 'A comfortable and economical choice for small families or couples. Perfect for smooth city transfers and standard highway routes.',
    price_display: 'From ₹2250 / day',
    main_image: '/images/swift_dzire_main.jpg',
    gallery_images: [
      '/images/swift_dzire_main.jpg',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    slug: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    vehicle_type: 'MUV',
    seating_capacity: 6,
    description: 'An excellent choice for medium-sized groups. Offers great legroom and a smooth ride over the challenging terrains of the Northeast.',
    price_display: 'Price on Request',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    slug: 'vitara-brezza',
    name: 'Maruti Suzuki Vitara Brezza',
    vehicle_type: 'Compact SUV',
    seating_capacity: 4,
    description: 'A robust compact SUV that handles rough terrain with ease while maintaining excellent passenger comfort and safety.',
    price_display: 'Price on Request',
    main_image: 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=2670&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376712349-f90b1fa6f722?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553440569-bfc53b1299fd?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c350?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '4',
    slug: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    vehicle_type: 'Premium MUV',
    seating_capacity: 6,
    description: 'The absolute standard for premium hill travel. Experience unmatched luxury, safety, and captain seat comfort on your journey.',
    price_display: 'Price on Request',
    main_image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=2672&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=2672&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582006764539-723901a1d948?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560028723-5e7630739c9f?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=2670&auto=format&fit=crop'
    ]
  }
];

export const MOCK_TEMPOS: Vehicle[] = [
  {
    id: '1',
    slug: 'force-urbania-13',
    name: 'Force Urbania 13 Seater',
    vehicle_type: 'Luxury Minibus',
    seating_capacity: '13 Seater',
    description: 'Experience the pinnacle of group travel luxury with the all-new Force Urbania. Features premium seating, advanced suspension, and panoramic windows.',
    features: ['Premium Reclining Seats', 'Advanced Air Suspension', 'Individual AC Vents', 'Panoramic Windows'],
    price_display: 'Price on Request',
    main_image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2671&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520106212299-d99c443e4568?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2671&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    slug: 'force-urbania-16',
    name: 'Force Urbania 16 Seater',
    vehicle_type: 'Luxury Minibus',
    seating_capacity: '16 Seater',
    description: 'The extended version of the premium Force Urbania, perfect for larger groups demanding the highest standards of comfort and safety.',
    features: ['Premium Reclining Seats', 'Advanced Air Suspension', 'Individual AC Vents', 'Extra Luggage Space'],
    price_display: 'Price on Request',
    main_image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2671&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520106212299-d99c443e4568?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2671&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    slug: 'tempo-traveller-13',
    name: 'Tempo Traveller 13 Seater',
    vehicle_type: 'Minibus',
    seating_capacity: '13 Seater',
    description: 'A highly reliable and comfortable option for group tours. Features pushback seats and excellent visibility for sightseeing.',
    features: ['Pushback Seats', 'Air Conditioned', 'Entertainment System', 'Ample Legroom'],
    price_display: 'Price on Request',
    main_image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2669&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2669&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555627237-7f5511b8df79?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563720360216-95fddb732fb2?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494028698538-2cd52a400b17?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '4',
    slug: 'tempo-traveller-17',
    name: 'Tempo Traveller 17 Seater',
    vehicle_type: 'Minibus',
    seating_capacity: '17 Seater',
    description: 'Ideal for medium to large groups. A perfect balance of space, comfort, and maneuverability on the winding roads of the Northeast.',
    features: ['Pushback Seats', 'Air Conditioned', 'Entertainment System', 'Overhead Luggage'],
    price_display: 'Price on Request',
    main_image: 'https://images.unsplash.com/photo-1555627237-7f5511b8df79?q=80&w=2670&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1555627237-7f5511b8df79?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2669&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563720360216-95fddb732fb2?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494028698538-2cd52a400b17?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '5',
    slug: 'tempo-traveller-25',
    name: 'Tempo Traveller 25 Seater',
    vehicle_type: 'Large Minibus',
    seating_capacity: '25 Seater',
    description: 'The ultimate solution for large group tours, corporate trips, or extended family vacations. Maximum space and comfort.',
    features: ['High Back Seats', 'Air Conditioned', 'Large Luggage Boot', 'PA System'],
    price_display: 'Price on Request',
    main_image: 'https://images.unsplash.com/photo-1563720360216-95fddb732fb2?q=80&w=2670&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1563720360216-95fddb732fb2?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494028698538-2cd52a400b17?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2669&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555627237-7f5511b8df79?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '6',
    slug: 'force-aarya-16',
    name: 'Force Aarya 16 Seater',
    vehicle_type: 'Luxury Minibus',
    seating_capacity: '16 Seater',
    description: 'A modern, robust, and incredibly comfortable minibus designed specifically to provide a premium tourist experience.',
    features: ['Premium Interiors', 'Climate Control', 'Reclining Seats', 'Reading Lights'],
    price_display: 'Price on Request',
    main_image: 'https://images.unsplash.com/photo-1494028698538-2cd52a400b17?q=80&w=2670&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1494028698538-2cd52a400b17?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563720360216-95fddb732fb2?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2669&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555627237-7f5511b8df79?q=80&w=2670&auto=format&fit=crop'
    ]
  }
];
