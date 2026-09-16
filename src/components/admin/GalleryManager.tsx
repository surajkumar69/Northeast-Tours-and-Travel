"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, GripVertical, Save, Plus } from "lucide-react";
import { addGalleryImage, deleteGalleryImage, updateImageDetails, reorderImages } from "@/lib/actions/gallery";

type GalleryImage = {
  id: string;
  url: string;
  altText: string | null;
  sortOrder: number;
};

type EntityType = 'destination' | 'package' | 'taxi' | 'tempo' | 'homepage' | 'experience';

interface GalleryManagerProps {
  entityType: EntityType;
  entityId: string;
  initialImages: GalleryImage[];
}

export function GalleryManager({ entityType, entityId, initialImages }: GalleryManagerProps) {
  const [images, setImages] = useState<GalleryImage[]>(
    [...initialImages].sort((a, b) => a.sortOrder - b.sortOrder)
  );
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        
        if (data.url) {
          const newImg = await addGalleryImage(entityType, entityId, data.url, file.name.split('.')[0]);
          setImages(prev => [...prev, newImg as GalleryImage]);
        }
      } catch (err) {
        console.error("Upload failed for", file.name);
      }
    }
    setUploading(false);
    // Reset file input
    e.target.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this image from the gallery?")) return;
    
    setImages(prev => prev.filter(img => img.id !== id));
    await deleteGalleryImage(entityType, id);
  };

  const handleAltTextChange = (id: string, newAlt: string) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, altText: newAlt } : img));
  };

  const saveAltText = async (id: string, altText: string) => {
    await updateImageDetails(entityType, id, { altText });
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index - 1];
    newImages[index - 1] = temp;
    
    // Update sortOrder locally
    const updated = newImages.map((img, i) => ({ ...img, sortOrder: i }));
    setImages(updated);
    
    // Persist
    await reorderImages(entityType, updated.map(u => ({ id: u.id, sortOrder: u.sortOrder })));
  };

  const moveDown = async (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index + 1];
    newImages[index + 1] = temp;
    
    // Update sortOrder locally
    const updated = newImages.map((img, i) => ({ ...img, sortOrder: i }));
    setImages(updated);
    
    // Persist
    await reorderImages(entityType, updated.map(u => ({ id: u.id, sortOrder: u.sortOrder })));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-stone-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-stone-800">Photo Gallery</h3>
          <p className="text-sm text-stone-500">Manage all images for this specific section.</p>
        </div>
        <div>
          <label className="cursor-pointer bg-gold-600 hover:bg-gold-500 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center">
            <Plus size={18} className="mr-2" />
            {uploading ? "Uploading..." : "Add Photos"}
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-lg border-2 border-dashed border-stone-300">
          <p className="text-stone-500">No images in this gallery yet.</p>
          <p className="text-xs text-stone-400 mt-1">Click "Add Photos" to upload.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {images.map((img, index) => (
            <div key={img.id} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200 group transition-all hover:bg-white hover:shadow-sm">
              <div className="flex flex-col gap-1 items-center justify-center text-stone-400">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="hover:text-gold-600 disabled:opacity-30">▲</button>
                <GripVertical size={16} />
                <button onClick={() => moveDown(index)} disabled={index === images.length - 1} className="hover:text-gold-600 disabled:opacity-30">▼</button>
              </div>
              
              <div className="relative w-24 h-16 rounded-md overflow-hidden bg-stone-200 flex-shrink-0">
                <Image src={img.url} alt={img.altText || "Gallery Image"} fill className="object-cover" />
              </div>
              
              <div className="flex-1">
                <input 
                  type="text" 
                  value={img.altText || ""}
                  onChange={(e) => handleAltTextChange(img.id, e.target.value)}
                  onBlur={(e) => saveAltText(img.id, e.target.value)}
                  placeholder="Alt text (for SEO)"
                  className="w-full text-sm border-0 border-b border-stone-300 bg-transparent focus:ring-0 focus:border-gold-500 px-0 py-1"
                />
              </div>

              <button 
                onClick={() => handleDelete(img.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Delete Image"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
