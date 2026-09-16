const fs = require('fs');
let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

// Replace TourPackage model
schema = schema.replace(
  /model TourPackage \{[\s\S]*?bookings         Booking\[\]\n\}/,
  `model TourPackage {
  id               String        @id @default(uuid())
  slug             String        @unique
  title            String
  duration         String
  price            String
  priceLabel       String
  startingPoint    String?
  shortDescription String
  description      String?
  coverImage       String?
  hotels           String?
  transportation   String?
  isActive         Boolean       @default(true)
  sortOrder        Int           @default(0)
  
  destinationId    String?
  destination      Destination?  @relation(fields: [destinationId], references: [id])
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
  
  images           PackageImage[]
  itinerary        ItineraryDay[]
  highlights       PackageHighlight[]
  inclusions       PackageInclusion[]
  exclusions       PackageExclusion[]
  bookings         Booking[]
}`
);

// Replace Experience model
schema = schema.replace(
  /model Experience \{[\s\S]*?gallery      ExperienceImage\[\]\n\}/,
  `model Experience {
  id               String   @id @default(uuid())
  slug             String   @unique
  title            String
  category         String?
  shortDescription String?
  fullDescription  String?
  coverImage       String
  isActive         Boolean  @default(true)
  sortOrder        Int      @default(0)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  gallery          ExperienceImage[]
}`
);

fs.writeFileSync('prisma/schema.prisma', schema);
console.log('Schema updated successfully for TourPackage and Experience.');
