const routesList = [
  // Guwahati Routes
  { from: 'Guwahati', to: 'Shillong', type: 'Taxi' },
  { from: 'Guwahati', to: 'Shillong', type: 'Cab' },
  { from: 'Guwahati', to: 'Cherrapunji', type: 'Taxi' },
  { from: 'Guwahati', to: 'Cherrapunji', type: 'Cab' },
  { from: 'Guwahati', to: 'Kaziranga', type: 'Taxi' },
  { from: 'Guwahati', to: 'Kaziranga', type: 'Cab' },
  { from: 'Guwahati', to: 'Tawang', type: 'Taxi' },
  { from: 'Guwahati', to: 'Tawang', type: 'Cab' },
  { from: 'Guwahati', to: 'Bomdila', type: 'Taxi' },
  { from: 'Guwahati', to: 'Dirang', type: 'Taxi' },
  { from: 'Guwahati', to: 'Tezpur', type: 'Taxi' },
  { from: 'Guwahati Airport', to: 'Shillong', type: 'Taxi' },
  { from: 'Guwahati Airport', to: 'Cherrapunji', type: 'Taxi' },
  { from: 'Guwahati Airport', to: 'Anywhere', type: 'Taxi Service', slugOverride: 'guwahati-airport-taxi-service', nameOverride: 'Guwahati Airport Taxi Service' },
  
  // Shillong Routes
  { from: 'Shillong', to: 'Guwahati', type: 'Taxi' },
  { from: 'Shillong', to: 'Guwahati Airport', type: 'Taxi' },
  { from: 'Shillong', to: 'Cherrapunji', type: 'Taxi' },
  { from: 'Shillong', to: 'Kaziranga', type: 'Taxi' },
  { from: 'Shillong', to: 'Tawang', type: 'Taxi' },

  // Cherrapunji Routes
  { from: 'Guwahati', to: 'Cherrapunji', type: 'Route', slugOverride: 'guwahati-to-cherrapunji', nameOverride: 'Guwahati to Cherrapunji' },
  { from: 'Shillong', to: 'Cherrapunji', type: 'Route', slugOverride: 'shillong-to-cherrapunji', nameOverride: 'Shillong to Cherrapunji' },
  { from: 'Cherrapunji', to: 'Guwahati', type: 'Taxi' },
  { from: 'Cherrapunji', to: 'Shillong', type: 'Taxi' },
];

const fs = require('fs');
const path = require('path');

const fileContent = `export interface RoutePageData {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  intro: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  faqs: { q: string; a: string }[];
}

export const routePages: RoutePageData[] = [
${routesList.map(r => {
  const slug = r.slugOverride || `${r.from.toLowerCase().replace(/ /g, '-')}-to-${r.to.toLowerCase().replace(/ /g, '-')}-${r.type.toLowerCase()}`;
  const name = r.nameOverride || `${r.from} to ${r.to} ${r.type}`;
  
  let distance = 'Varies';
  let duration = 'Varies';
  
  // Approximate mappings
  if (name.includes('Shillong') && name.includes('Guwahati')) { distance = '100 km'; duration = '2.5 to 3 Hours'; }
  else if (name.includes('Cherrapunji') && name.includes('Guwahati')) { distance = '150 km'; duration = '4.5 Hours'; }
  else if (name.includes('Kaziranga') && name.includes('Guwahati')) { distance = '190 km'; duration = '4 Hours'; }
  else if (name.includes('Tawang') && name.includes('Guwahati')) { distance = '450 km'; duration = '12 to 14 Hours'; }
  else if (name.includes('Bomdila') && name.includes('Guwahati')) { distance = '270 km'; duration = '8 Hours'; }
  else if (name.includes('Dirang') && name.includes('Guwahati')) { distance = '310 km'; duration = '9 Hours'; }
  else if (name.includes('Tezpur') && name.includes('Guwahati')) { distance = '180 km'; duration = '3.5 Hours'; }
  else if (name.includes('Cherrapunji') && name.includes('Shillong')) { distance = '54 km'; duration = '1.5 Hours'; }
  else if (name.includes('Kaziranga') && name.includes('Shillong')) { distance = '250 km'; duration = '5.5 Hours'; }
  else if (name.includes('Tawang') && name.includes('Shillong')) { distance = '500 km'; duration = '14 Hours'; }

  return `  {
    slug: '${slug}',
    title: '${name} | Majestic Northeast Tours and Travel',
    h1: 'Premium ${name} Service',
    metaDescription: 'Book a premium ${name} with Majestic Northeast Tours and Travel. Enjoy a comfortable journey covering ${distance} in approx ${duration}. Best fares and well-maintained fleet.',
    intro: 'Welcome to our premium ${name} booking page. Whether you are traveling for business, leisure, or a family vacation, we provide comfortable, reliable, and safe transportation. Our experienced drivers know the terrain perfectly, ensuring you enjoy the stunning views safely.',
    from: '${r.from}',
    to: '${r.to}',
    distance: '${distance}',
    duration: '${duration}',
    faqs: [
      {
        q: 'How long does it take from ${r.from} to ${r.to}?',
        a: 'The journey typically takes around ${duration}, depending on traffic and road conditions.'
      },
      {
        q: 'What vehicles are available for this route?',
        a: 'We offer a wide range of premium vehicles including Swift Dzire, Vitara Brezza, Ertiga, Innova Crysta, and 13 to 25 Seater Tempo Travellers.'
      },
      {
        q: 'How do I book a ${name}?',
        a: 'You can easily book by clicking the Book Now button, calling us directly, or sending a message on WhatsApp.'
      }
    ]
  },`;
}).join('\n')}
];
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'routePages.ts'), fileContent);
console.log('src/data/routePages.ts generated.');
