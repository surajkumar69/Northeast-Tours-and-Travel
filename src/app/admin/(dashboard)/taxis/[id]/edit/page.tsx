import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { TaxiForm } from "@/components/admin/TaxiForm";

export default async function EditTaxiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const entity = await prisma.taxiVehicle.findUnique({
    where: { id: id },
    include: { gallery: { orderBy: { sortOrder: 'asc' } } }
  });

  if (!entity) {
    notFound();
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Edit Taxi</h1>
        <p className="text-stone-500 mt-1">Manage details and photos for {entity.name}.</p>
      </div>

      <TaxiForm taxi={entity} />

      <div className="pt-8 border-t border-stone-200 mt-12">
        <h3 className="text-xl font-bold text-stone-900 mb-6">Gallery Images</h3>
        <GalleryManager 
          entityType="taxi" 
          entityId={entity.id} 
          initialImages={entity.gallery} 
        />
      </div>
    </div>
  );
}
