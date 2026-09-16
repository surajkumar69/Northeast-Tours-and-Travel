import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { TempoForm } from "@/components/admin/TempoForm";

export default async function EditTempoTravellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const entity = await prisma.tempoTraveller.findUnique({
    where: { id: id },
    include: { gallery: { orderBy: { sortOrder: 'asc' } } }
  });

  if (!entity) {
    notFound();
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Edit Vehicle</h1>
        <p className="text-stone-500 mt-1">Manage details and photos for {entity.name}.</p>
      </div>

      <TempoForm tempo={entity} />

      <div className="pt-8 border-t border-stone-200 mt-12">
        <h3 className="text-xl font-bold text-stone-900 mb-6">Gallery Images</h3>
        <GalleryManager 
          entityType="tempo" 
          entityId={entity.id} 
          initialImages={entity.gallery} 
        />
      </div>
    </div>
  );
}
