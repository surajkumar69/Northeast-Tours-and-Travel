const fs = require('fs');
const path = require('path');

const entities = [
  {
    name: 'destinations',
    model: 'destination',
    idField: 'id',
    include: 'images',
    entityType: 'destination',
    title: 'Destination'
  },
  {
    name: 'packages',
    model: 'tourPackage',
    idField: 'id',
    include: 'images',
    entityType: 'package',
    title: 'Tour Package'
  },
  {
    name: 'taxis',
    model: 'taxiVehicle',
    idField: 'id',
    include: 'gallery',
    entityType: 'taxi',
    title: 'Taxi'
  },
  {
    name: 'tempos',
    model: 'tempoTraveller',
    idField: 'id',
    include: 'gallery',
    entityType: 'tempo',
    title: 'Tempo Traveller'
  },
  {
    name: 'experiences',
    model: 'experience',
    idField: 'id',
    include: 'gallery',
    entityType: 'experience',
    title: 'Experience'
  }
];

entities.forEach(ent => {
  const dirPath = path.join('src', 'app', 'admin', '(dashboard)', ent.name, '[id]', 'edit');
  fs.mkdirSync(dirPath, { recursive: true });

  const content = `import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { GalleryManager } from "@/components/admin/GalleryManager";

export default async function Edit${ent.title.replace(/\s+/g, '')}Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const entity = await prisma.${ent.model}.findUnique({
    where: { ${ent.idField}: id },
    include: { ${ent.include}: { orderBy: { sortOrder: 'asc' } } }
  });

  if (!entity) {
    notFound();
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Edit ${ent.title}</h1>
        <p className="text-stone-500 mt-1">Manage details and photos for {entity.name || entity.title || 'this item'}.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
        <p className="text-stone-500 text-sm mb-4">
          [Main Content Form goes here - Currently showing Gallery Management below]
        </p>
      </div>

      {/* ISOLATED GALLERY MANAGEMENT */}
      <GalleryManager 
        entityType="${ent.entityType}" 
        entityId={entity.id} 
        initialImages={entity.${ent.include}} 
      />
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

// Homepage Gallery
const homepageDir = path.join('src', 'app', 'admin', '(dashboard)', 'homepage-gallery');
fs.mkdirSync(homepageDir, { recursive: true });
const homepageContent = `import prisma from "@/lib/prisma";
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
`;
fs.writeFileSync(path.join(homepageDir, 'page.tsx'), homepageContent);

console.log('Successfully generated isolated gallery pages!');
