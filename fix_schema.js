const fs = require('fs');
let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

schema = schema.replace(
  /model HeroSlide \{[\s\S]*?\}/,
  `model HeroSlide {
  id          String   @id @default(uuid())
  title       String
  location    String
  description String?
  image       String
  ctaText     String?
  ctaLink     String?
  sortOrder   Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}`
);

fs.writeFileSync('prisma/schema.prisma', schema);
console.log('Updated HeroSlide schema');
