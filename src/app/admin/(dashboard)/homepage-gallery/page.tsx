import prisma from "@/lib/prisma";
import { GalleryManager } from "@/components/admin/GalleryManager";

export default async function HomepageGalleryPage() {
  const images = await prisma.homepageGalleryImage.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Homepage Gallery</h1>
        <p className="text-stone-500 mt-1">Manage the standalone photo gallery shown on the homepage.</p>
      </div>

      {/* ISOLATED GALLERY MANAGEMENT */}
      <GalleryManager 
        entityType="homepage" 
        entityId="homepage" 
        initialImages={images} 
      />
    </div>
  );
}
