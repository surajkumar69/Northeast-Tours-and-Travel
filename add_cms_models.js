const fs = require('fs');

const schemaAdditions = `
model AdminUser {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  name         String?
  role         String   @default("ADMIN")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model SiteSettings {
  id           String   @id @default(uuid())
  companyName  String   @default("Majestic Northeast Tours and Travel")
  tagline      String   @default("The Soul of Incredible Northeast")
  phone        String   @default("+918787488801")
  whatsapp     String   @default("+918787488801")
  email        String   @default("thedivinetravel01@gmail.com")
  address      String?
  facebookUrl  String?
  instagramUrl String?
  youtubeUrl   String?
  twitterUrl   String?
  updatedAt    DateTime @updatedAt
}

model HeroSlide {
  id           String   @id @default(uuid())
  location     String
  title        String
  description  String
  image        String
  cardImage    String?
  link         String
  cardLabel    String
  cardName     String
  isActive     Boolean  @default(true)
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Experience {
  id           String   @id @default(uuid())
  name         String
  description  String?
  image        String
  isActive     Boolean  @default(true)
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Testimonial {
  id           String   @id @default(uuid())
  customerName String
  location     String?
  rating       Int      @default(5)
  review       String
  travelDate   String?
  image        String?
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model GalleryImage {
  id           String   @id @default(uuid())
  url          String
  title        String?
  category     String   @default("General") // e.g. Meghalaya, Wildlife, Hotels
  isActive     Boolean  @default(true)
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
}

model Hotel {
  id           String   @id @default(uuid())
  name         String
  destination  String
  category     String   @default("Standard") // Standard, Deluxe, Premium
  description  String?
  address      String?
  contact      String?
  images       String?  // comma separated or JSON string
  amenities    String?  // comma separated
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model HomepageSection {
  id           String   @id @default(uuid())
  sectionKey   String   @unique // e.g. "hero", "explore", "packages", "experiences"
  title        String?
  subtitle     String?
  description  String?
  isActive     Boolean  @default(true)
  displayOrder Int      @default(0)
  updatedAt    DateTime @updatedAt
}
`;

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

if (!schema.includes('model AdminUser')) {
  schema += '\n' + schemaAdditions;
  fs.writeFileSync('prisma/schema.prisma', schema);
  console.log('Added new models to Prisma schema.');
} else {
  console.log('Models already exist in schema.');
}
