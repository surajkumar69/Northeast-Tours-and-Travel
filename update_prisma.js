const fs = require('fs');

let schema = fs.readFileSync('prisma/schema.prisma', 'utf-8');

const newTempoModel = `
model TempoTraveller {
  id               String   @id @default(uuid())
  slug             String   @unique
  name             String
  type             String
  seatingCapacity  String
  acAvailable      Boolean  @default(true)
  luggageCapacity  String?
  shortDescription String?
  description      String?
  features         String?
  facilities       String?
  
  pricePerDay      String?
  pricePerKm       String?
  outstationRate   String?
  localPackageRate String?
  airportTransfer  String?
  
  mainImage        String
  gallery          TempoImage[]
  
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  bookings         Booking[]
}

model TempoImage {
  id          String      @id @default(uuid())
  url         String
  tempoId     String
  tempo       TempoTraveller @relation(fields: [tempoId], references: [id], onDelete: Cascade)
}
`;

schema = schema.replace(/model TempoTraveller \{[\s\S]*?\}/, newTempoModel.trim());

fs.writeFileSync('prisma/schema.prisma', schema);
console.log('Updated schema.prisma');
