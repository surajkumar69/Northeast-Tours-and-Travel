"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTourPackage(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    duration: formData.get("duration") as string,
    price: formData.get("price") as string,
    priceLabel: formData.get("priceLabel") as string,
    startingPoint: formData.get("startingPoint") as string,
    shortDescription: formData.get("shortDescription") as string,
    description: formData.get("description") as string,
    coverImage: formData.get("coverImage") as string,
    destinationId: formData.get("destinationId") as string || null,
    hotels: formData.get("hotels") as string,
    transportation: formData.get("transportation") as string,
    isActive: formData.get("isActive") === "on",
    sortOrder: parseInt((formData.get("sortOrder") as string) || "0"),
  };

  const newPackage = await prisma.tourPackage.create({ data });

  revalidatePath("/");
  revalidatePath("/packages");
  revalidatePath("/admin/tours");
  redirect(`/admin/tours/${newPackage.id}/edit`);
}

export async function updateTourPackage(id: string, formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    duration: formData.get("duration") as string,
    price: formData.get("price") as string,
    priceLabel: formData.get("priceLabel") as string,
    startingPoint: formData.get("startingPoint") as string,
    shortDescription: formData.get("shortDescription") as string,
    description: formData.get("description") as string,
    coverImage: formData.get("coverImage") as string,
    destinationId: formData.get("destinationId") as string || null,
    hotels: formData.get("hotels") as string,
    transportation: formData.get("transportation") as string,
    isActive: formData.get("isActive") === "on",
    sortOrder: parseInt((formData.get("sortOrder") as string) || "0"),
  };

  await prisma.tourPackage.update({ where: { id }, data });

  revalidatePath("/");
  revalidatePath("/packages");
  revalidatePath(`/packages/${data.slug}`);
  revalidatePath("/admin/tours");
  redirect("/admin/tours");
}

export async function deleteTourPackage(id: string) {
  await prisma.tourPackage.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/packages");
  revalidatePath("/admin/tours");
}

export async function togglePackageStatus(id: string, isActive: boolean) {
  await prisma.tourPackage.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/");
  revalidatePath("/packages");
  revalidatePath("/admin/tours");
}
