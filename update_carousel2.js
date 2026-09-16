const fs = require('fs');
let content = fs.readFileSync('src/components/ui/HeroCarousel.tsx', 'utf8');

content = content.replace(
  'cardLabel: "MEGHALAYA",\n    cardName: "CHERRAPUNJI",',
  'cardLabel: "MEGHALAYA",\n    cardName: "CHERRAPUNJI",\n    cardImage: "/images/meghalaya_hills_1789460353512.jpg",'
);

content = content.replace(
  'cardLabel: "ASSAM",\n    cardName: "KAZIRANGA",',
  'cardLabel: "ASSAM",\n    cardName: "KAZIRANGA",\n    cardImage: "/images/assam_tea_estate_1789460102115.jpg",'
);

content = content.replace(
  'cardLabel: "ARUNACHAL PRADESH",\n    cardName: "TAWANG",',
  'cardLabel: "ARUNACHAL PRADESH",\n    cardName: "TAWANG",\n    cardImage: "/images/arunachal_sela_pass_1789460408512.jpg",'
);

fs.writeFileSync('src/components/ui/HeroCarousel.tsx', content);
