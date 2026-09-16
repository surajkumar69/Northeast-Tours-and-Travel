import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { GalleryManager } from "@/components/admin/GalleryManager";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const entity = await prisma.experience.findUnique({
    where: { id: id },
    include: { gallery: { orderBy: { sortOrder: 'asc' } } }
  });

  if (!entity) {
    notFound();
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Edit Experience</h1>
        <p className="text-stone-500 mt-1">Manage details and photos for {((entity as any).name || (entity as any).title || 'this item')}.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
        <p className="text-stone-500 text-sm mb-4">
          [Main Content Form goes here - Currently showing Gallery Management below]
        </p>
      </div>

      {/* ISOLATED GALLERY MANAGEMENT */}
      <GalleryManager 
        entityType="experience" 
        entityId={entity.id} 
        initialImages={entity.gallery} 
      />
    </div>
  );
}
