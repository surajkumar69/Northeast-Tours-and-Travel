const fs = require('fs');

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

// 1. DestinationImage
schema = schema.replace(
  /model DestinationImage \{[\s\S]*?\}/,
  `model DestinationImage {
  id            String       @id @default(uuid())
  url           String
  altText       String?
  sortOrder     Int          @default(0)
  destinationId String
  destination   Destination  @relation(fields: [destinationId], references: [id], onDelete: Cascade)
}`
);

// 2. PackageImage
schema = schema.replace(
  /model PackageImage \{[\s\S]*?\}/,
  `model PackageImage {
  id          String      @id @default(uuid())
  url         String
  altText     String?
  sortOrder   Int         @default(0)
  packageId   String
  package     TourPackage @relation(fields: [packageId], references: [id], onDelete: Cascade)
}`
);

// 3. TaxiImage
schema = schema.replace(
  /model TaxiImage \{[\s\S]*?\}/,
  `model TaxiImage {
  id          String      @id @default(uuid())
  url         String
  altText     String?
  sortOrder   Int         @default(0)
  taxiId      String
  taxi        TaxiVehicle @relation(fields: [taxiId], references: [id], onDelete: Cascade)
}`
);

// 4. TempoImage
schema = schema.replace(
  /model TempoImage \{[\s\S]*?\}/,
  `model TempoImage {
  id          String      @id @default(uuid())
  url         String
  altText     String?
  sortOrder   Int         @default(0)
  tempoId     String
  tempo       TempoTraveller @relation(fields: [tempoId], references: [id], onDelete: Cascade)
}`
);

// 5. Replace GalleryImage with HomepageGalleryImage
schema = schema.replace(
  /model GalleryImage \{[\s\S]*?\}/,
  `model HomepageGalleryImage {
  id           String   @id @default(uuid())
  url          String
  altText      String?
  isActive     Boolean  @default(true)
  sortOrder    Int      @default(0)
  createdAt    DateTime @default(now())
}`
);

// 6. Update Experience model and add ExperienceImage
schema = schema.replace(
  /model Experience \{[\s\S]*?\}/,
  `model Experience {
  id           String   @id @default(uuid())
  name         String
  description  String?
  image        String
  isActive     Boolean  @default(true)
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  gallery      ExperienceImage[]
}

model ExperienceImage {
  id           String      @id @default(uuid())
  url          String
  altText      String?
  sortOrder    Int         @default(0)
  experienceId String
  experience   Experience  @relation(fields: [experienceId], references: [id], onDelete: Cascade)
}`
);

fs.writeFileSync('prisma/schema.prisma', schema);
console.log('Schema updated successfully.');
