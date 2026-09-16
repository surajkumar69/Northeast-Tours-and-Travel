"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createHeroSlide(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as string,
    ctaText: formData.get("ctaText") as string,
    ctaLink: formData.get("ctaLink") as string,
    sortOrder: parseInt((formData.get("sortOrder") as string) || "0"),
    isActive: formData.get("isActive") === "on",
  };

  await prisma.heroSlide.create({ data });

  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
  redirect("/admin/hero-slides");
}

export async function updateHeroSlide(id: string, formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as string,
    ctaText: formData.get("ctaText") as string,
    ctaLink: formData.get("ctaLink") as string,
    sortOrder: parseInt((formData.get("sortOrder") as string) || "0"),
    isActive: formData.get("isActive") === "on",
  };

  await prisma.heroSlide.update({ where: { id }, data });

  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
  redirect("/admin/hero-slides");
}

export async function deleteHeroSlide(id: string) {
  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
}

export async function toggleHeroSlideStatus(id: string, isActive: boolean) {
  await prisma.heroSlide.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
}
