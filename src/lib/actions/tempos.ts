"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTempoTraveller(data: any) {
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  const created = await prisma.tempoTraveller.create({
    data: {
      slug,
      name: data.name,
      type: data.type,
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
      mainImage: data.mainImage || "/images/standard_tempo_ai.jpg",
      isActive: data.isActive === 'true' || data.isActive === true
    }
  });

  revalidatePath("/admin/tempos");
  revalidatePath("/tempo-traveller");
  return created;
}

export async function updateTempoTraveller(id: string, data: any) {
  const updated = await prisma.tempoTraveller.update({
    where: { id },
    data: {
      name: data.name,
      type: data.type,
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

  revalidatePath("/admin/tempos");
  revalidatePath("/tempo-traveller");
  revalidatePath(`/tempo-traveller/${updated.slug}`);
  return updated;
}
