import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { TourForm } from "@/components/admin/TourForm";

export default async function EditTourPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const entity = await prisma.tourPackage.findUnique({
    where: { id: id },
    include: { images: { orderBy: { sortOrder: 'asc' } } }
  });

  if (!entity) {
    notFound();
  }

  const destinations = await prisma.destination.findMany();

  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Edit Tour Package</h1>
        <p className="text-stone-500 mt-1">Manage details and photos for {entity.title}.</p>
      </div>

      <TourForm tour={entity} destinations={destinations} />

      {/* ISOLATED GALLERY MANAGEMENT */}
      <GalleryManager 
        entityType="package" 
        entityId={entity.id} 
        initialImages={entity.images} 
      />
    </div>
  );
}
