"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type EntityType = 'destination' | 'package' | 'taxi' | 'tempo' | 'homepage' | 'experience';

export async function addGalleryImage(entityType: EntityType, entityId: string, url: string, altText: string = "") {
  let newImage;
  const data = { url, altText, sortOrder: 999 };

  switch (entityType) {
    case 'destination':
      newImage = await prisma.destinationImage.create({ data: { ...data, destinationId: entityId } });
      break;
    case 'package':
      newImage = await prisma.packageImage.create({ data: { ...data, packageId: entityId } });
      break;
    case 'taxi':
      newImage = await prisma.taxiImage.create({ data: { ...data, taxiId: entityId } });
      break;
    case 'tempo':
      newImage = await prisma.tempoImage.create({ data: { ...data, tempoId: entityId } });
      break;
    case 'experience':
      newImage = await prisma.experienceImage.create({ data: { ...data, experienceId: entityId } });
      break;
    case 'homepage':
      newImage = await prisma.homepageGalleryImage.create({ data });
      break;
  }
  
  revalidatePath('/');
  return newImage;
}

export async function deleteGalleryImage(entityType: EntityType, imageId: string) {
  switch (entityType) {
    case 'destination': await prisma.destinationImage.delete({ where: { id: imageId } }); break;
    case 'package': await prisma.packageImage.delete({ where: { id: imageId } }); break;
    case 'taxi': await prisma.taxiImage.delete({ where: { id: imageId } }); break;
    case 'tempo': await prisma.tempoImage.delete({ where: { id: imageId } }); break;
    case 'experience': await prisma.experienceImage.delete({ where: { id: imageId } }); break;
    case 'homepage': await prisma.homepageGalleryImage.delete({ where: { id: imageId } }); break;
  }
  revalidatePath('/');
}

export async function updateImageDetails(entityType: EntityType, imageId: string, data: { altText?: string, sortOrder?: number }) {
  switch (entityType) {
    case 'destination': await prisma.destinationImage.update({ where: { id: imageId }, data }); break;
    case 'package': await prisma.packageImage.update({ where: { id: imageId }, data }); break;
    case 'taxi': await prisma.taxiImage.update({ where: { id: imageId }, data }); break;
    case 'tempo': await prisma.tempoImage.update({ where: { id: imageId }, data }); break;
    case 'experience': await prisma.experienceImage.update({ where: { id: imageId }, data }); break;
    case 'homepage': await prisma.homepageGalleryImage.update({ where: { id: imageId }, data }); break;
  }
  revalidatePath('/');
}

export async function reorderImages(entityType: EntityType, items: { id: string, sortOrder: number }[]) {
  // Execute updates sequentially or in a transaction. 
  // We'll use a loop for simplicity across generic types.
  for (const item of items) {
    switch (entityType) {
      case 'destination': await prisma.destinationImage.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } }); break;
      case 'package': await prisma.packageImage.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } }); break;
      case 'taxi': await prisma.taxiImage.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } }); break;
      case 'tempo': await prisma.tempoImage.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } }); break;
      case 'experience': await prisma.experienceImage.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } }); break;
      case 'homepage': await prisma.homepageGalleryImage.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } }); break;
    }
  }
  revalidatePath('/');
}
