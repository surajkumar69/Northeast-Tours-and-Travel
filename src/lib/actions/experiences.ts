"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExperience(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    category: formData.get("category") as string,
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: formData.get("fullDescription") as string,
    coverImage: formData.get("coverImage") as string,
    isActive: formData.get("isActive") === "on",
    sortOrder: parseInt((formData.get("sortOrder") as string) || "0"),
  };

  const newExp = await prisma.experience.create({ data });

  revalidatePath("/");
  revalidatePath("/experiences");
  revalidatePath("/admin/experiences");
  redirect(`/admin/experiences/${newExp.id}/edit`);
}

export async function updateExperience(id: string, formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    category: formData.get("category") as string,
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: formData.get("fullDescription") as string,
    coverImage: formData.get("coverImage") as string,
    isActive: formData.get("isActive") === "on",
    sortOrder: parseInt((formData.get("sortOrder") as string) || "0"),
  };

  await prisma.experience.update({ where: { id }, data });

  revalidatePath("/");
  revalidatePath("/experiences");
  revalidatePath(`/experiences/${data.slug}`);
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/experiences");
  revalidatePath("/admin/experiences");
}

export async function toggleExperienceStatus(id: string, isActive: boolean) {
  await prisma.experience.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/");
  revalidatePath("/experiences");
  revalidatePath("/admin/experiences");
}
