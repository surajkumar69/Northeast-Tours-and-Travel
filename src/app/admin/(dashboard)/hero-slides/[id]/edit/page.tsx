import prisma from "@/lib/prisma";
import { SlideForm } from "../../SlideForm";
import { notFound } from "next/navigation";

export default async function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const slide = await prisma.heroSlide.findUnique({
    where: { id }
  });

  if (!slide) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Edit Hero Slide</h1>
        <p className="text-stone-500 mt-1">Update the slide for the homepage carousel</p>
      </div>

      <SlideForm initialData={slide} />
    </div>
  );
}
