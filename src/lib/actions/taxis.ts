"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTaxiVehicle(data: any) {
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  const created = await prisma.taxiVehicle.create({
    data: {
      slug,
      name: data.name,
      type: data.type,
      model: data.model || data.type,
      seatingCapacity: data.seatingCapacity,
      acAvailable: data.acAvailable === 'true' || data.acAvailable === true,
      luggageCapacity: data.luggageCapacity,
      shortDescription: data.shortDescription,
      description: data.description,
      features: data.features,
      facilities: data.facilities,
      pricePerDay: data.pricePerDay,
      pricePerKm: data.pricePerKm,
      outstationRate: data.outstationRate,
      localPackageRate: data.localPackageRate,
      airportTransfer: data.airportTransfer,
      mainImage: data.mainImage || "/images/book_taxi_ai.jpg",
      isActive: data.isActive === 'true' || data.isActive === true
    }
  });

  revalidatePath("/admin/taxis");
  revalidatePath("/taxis");
  return created;
}

export async function updateTaxiVehicle(id: string, data: any) {
  const updated = await prisma.taxiVehicle.update({
    where: { id },
    data: {
      name: data.name,
      type: data.type,
      model: data.model || data.type,
      seatingCapacity: data.seatingCapacity,
      acAvailable: data.acAvailable === 'true' || data.acAvailable === true,
      luggageCapacity: data.luggageCapacity,
      shortDescription: data.shortDescription,
      description: data.description,
      features: data.features,
      facilities: data.facilities,
      pricePerDay: data.pricePerDay,
      pricePerKm: data.pricePerKm,
      outstationRate: data.outstationRate,
      localPackageRate: data.localPackageRate,
      airportTransfer: data.airportTransfer,
      mainImage: data.mainImage,
      isActive: data.isActive === 'true' || data.isActive === true
    }
  });

  revalidatePath("/admin/taxis");
  revalidatePath("/taxis");
  revalidatePath(`/taxis/${updated.slug}`);
  return updated;
}
