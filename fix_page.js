const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

if (!code.includes('import prisma from "@/lib/prisma"')) {
  code = code.replace(
    'import { HeroCarousel } from "@/components/ui/HeroCarousel";',
    'import { HeroCarousel } from "@/components/ui/HeroCarousel";\nimport prisma from "@/lib/prisma";'
  );
}

if (!code.includes('const heroSlides = await prisma.heroSlide.findMany')) {
  code = code.replace(
    'export default async function Home() {',
    'export default async function Home() {\n  const heroSlides = await prisma.heroSlide.findMany({\n    where: { isActive: true },\n    orderBy: { sortOrder: \'asc\' }\n  });'
  );
}

code = code.replace(
  '<HeroCarousel />',
  '<HeroCarousel slides={heroSlides} />'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('Updated page.tsx');
