"use client";

import { useState } from "react";
import { createHeroSlide, updateHeroSlide } from "@/lib/actions/hero-slides";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Slide = {
  id?: string;
  title: string;
  location: string;
  description: string | null;
  image: string;
  ctaText: string | null;
  ctaLink: string | null;
  sortOrder: number;
  isActive: boolean;
};

export function SlideForm({ initialData }: { initialData?: Slide }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImagePreview(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      alert("An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Ensure image is in formData
    formData.set("image", imagePreview);

    try {
      if (initialData?.id) {
        await updateHeroSlide(initialData.id, formData);
      } else {
        await createHeroSlide(formData);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred saving the slide.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 space-y-6">
      
      <div className="space-y-4 border-b border-stone-200 pb-6">
        <h3 className="text-lg font-semibold text-stone-800">Media</h3>
        
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Hero Image</label>
          <div className="flex items-start space-x-6">
            <div className="relative h-40 w-64 bg-stone-100 rounded-md overflow-hidden border border-stone-300 flex items-center justify-center">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              ) : (
                <span className="text-stone-400 text-sm">No image</span>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100"
              />
              <p className="text-xs text-stone-500">
                Or provide an image URL directly:
              </p>
              <input 
                type="text" 
                value={imagePreview}
                onChange={(e) => setImagePreview(e.target.value)}
                placeholder="https://..."
                className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-b border-stone-200 pb-6">
        <h3 className="text-lg font-semibold text-stone-800">Content</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
            <input type="text" name="title" defaultValue={initialData?.title} required className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
            <p className="text-xs text-stone-500 mt-1">Main large text. E.g. "Kaziranga\nWildlife Safari"</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Location / Category</label>
            <input type="text" name="location" defaultValue={initialData?.location} required className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
            <p className="text-xs text-stone-500 mt-1">E.g. "Assam" or "Wildlife"</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
            <textarea name="description" defaultValue={initialData?.description || ""} rows={3} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500"></textarea>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-b border-stone-200 pb-6">
        <h3 className="text-lg font-semibold text-stone-800">Call to Action</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Button Text</label>
            <input type="text" name="ctaText" defaultValue={initialData?.ctaText || ""} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Button Link</label>
            <input type="text" name="ctaLink" defaultValue={initialData?.ctaLink || ""} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pb-6">
        <h3 className="text-lg font-semibold text-stone-800">Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Sort Order</label>
            <input type="number" name="sortOrder" defaultValue={initialData?.sortOrder ?? 0} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
            <p className="text-xs text-stone-500 mt-1">Lower numbers appear first (e.g. 0, 1, 2)</p>
          </div>
          <div className="flex items-center h-full pt-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="isActive" defaultChecked={initialData?.isActive ?? true} className="w-5 h-5 text-gold-600 focus:ring-gold-500 border-stone-300 rounded" />
              <span className="text-sm font-medium text-stone-700">Publish immediately</span>
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-3">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-stone-300 rounded-md text-stone-700 hover:bg-stone-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading || uploading || !imagePreview} className="px-6 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-500 transition-colors disabled:opacity-50">
          {loading ? "Saving..." : "Save Slide"}
        </button>
      </div>
    </form>
  );
}
