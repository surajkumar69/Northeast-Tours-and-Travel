const fs = require('fs');

let schema = fs.readFileSync('prisma/schema.prisma', 'utf-8');

const newTaxiModel = `
model TaxiVehicle {
  id               String   @id @default(uuid())
  slug             String   @unique
  name             String
  type             String
  model            String
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
  airportTransfer  String?
  
  mainImage        String
  gallery          TaxiImage[]
  
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  bookings         Booking[]
}

model TaxiImage {
  id          String      @id @default(uuid())
  url         String
  taxiId      String
  taxi        TaxiVehicle @relation(fields: [taxiId], references: [id], onDelete: Cascade)
}
`;

schema = schema.replace(/model TaxiVehicle \{[\s\S]*?\}/, newTaxiModel.trim());
fs.writeFileSync('prisma/schema.prisma', schema);
console.log('Updated schema.prisma with TaxiVehicle');
