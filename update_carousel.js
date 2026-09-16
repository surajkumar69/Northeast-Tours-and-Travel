const fs = require('fs');
let content = fs.readFileSync('src/components/ui/HeroCarousel.tsx', 'utf8');

content = content.replace(
  'cardName: string;\n};',
  'cardName: string;\n  cardImage?: string;\n};'
);

content = content.replace(
  'cardLabel: "NAGALAND",\n    cardName: "KOHIMA",',
  'cardLabel: "NAGALAND",\n    cardName: "KOHIMA",\n    cardImage: "https://images.unsplash.com/photo-1605649487212-4d567c9d1df5?q=80&w=800&auto=format&fit=crop",'
);

content = content.replace(
  'cardLabel: "SIKKIM",\n    cardName: "GANGTOK",',
  'cardLabel: "SIKKIM",\n    cardName: "GANGTOK",\n    cardImage: "https://images.unsplash.com/photo-1626644081600-47b744a56c70?q=80&w=800&auto=format&fit=crop",'
);

content = content.replace(
  '<Image src={slide.image} alt={slide.cardName}',
  '<Image src={slide.cardImage || slide.image} alt={slide.cardName}'
);

fs.writeFileSync('src/components/ui/HeroCarousel.tsx', content);
