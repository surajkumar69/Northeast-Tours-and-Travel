"use client";

import { useState } from "react";
import { createExperience, updateExperience } from "@/lib/actions/experiences";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ExperienceForm({ experience }: { experience?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(experience?.coverImage || "");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImagePreview(data.url);
      else alert(data.error || "Upload failed");
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
    formData.set("coverImage", imagePreview);

    try {
      if (experience?.id) {
        await updateExperience(experience.id, formData);
      } else {
        await createExperience(formData);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred saving the experience.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 space-y-6">
      
      <div className="space-y-4 border-b border-stone-200 pb-6">
        <h3 className="text-lg font-semibold text-stone-800">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
            <input type="text" name="title" defaultValue={experience?.title} required className="w-full border border-stone-300 rounded-md px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">URL Slug</label>
            <input type="text" name="slug" defaultValue={experience?.slug} required className="w-full border border-stone-300 rounded-md px-4 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
            <input type="text" name="category" defaultValue={experience?.category || ""} placeholder="e.g. Wildlife, Culture, Adventure" className="w-full border border-stone-300 rounded-md px-4 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-stone-700 mb-1">Short Description</label>
            <textarea name="shortDescription" defaultValue={experience?.shortDescription || ""} rows={2} className="w-full border border-stone-300 rounded-md px-4 py-2"></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-stone-700 mb-1">Full Description</label>
            <textarea name="fullDescription" defaultValue={experience?.fullDescription || ""} rows={4} className="w-full border border-stone-300 rounded-md px-4 py-2"></textarea>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-b border-stone-200 pb-6">
        <h3 className="text-lg font-semibold text-stone-800">Cover Image</h3>
        <div className="flex items-start space-x-6">
          <div className="relative h-40 w-64 bg-stone-100 rounded-md overflow-hidden border border-stone-300 flex items-center justify-center">
            {imagePreview ? (
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            ) : (
              <span className="text-stone-400 text-sm">No cover image</span>
            )}
          </div>
          <div className="flex-1 space-y-3">
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700" />
            <input type="text" value={imagePreview} onChange={(e) => setImagePreview(e.target.value)} placeholder="Or paste image URL" className="w-full border border-stone-300 rounded-md px-4 py-2 text-sm" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pb-6">
        <h3 className="text-lg font-semibold text-stone-800">Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Sort Order</label>
            <input type="number" name="sortOrder" defaultValue={experience?.sortOrder ?? 0} className="w-full border border-stone-300 rounded-md px-4 py-2" />
          </div>
          <div className="flex items-center h-full pt-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="isActive" defaultChecked={experience?.isActive ?? true} className="w-5 h-5 text-gold-600 rounded border-stone-300" />
              <span className="text-sm font-medium text-stone-700">Publish immediately</span>
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-3">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-stone-300 rounded-md text-stone-700">Cancel</button>
        <button type="submit" disabled={loading || uploading || !imagePreview} className="px-6 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-500 disabled:opacity-50">
          {loading ? "Saving..." : "Save Experience"}
        </button>
      </div>
    </form>
  );
}
