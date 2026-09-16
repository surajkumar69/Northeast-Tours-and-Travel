"use client";

import { useState } from "react";
import { createTaxiVehicle, updateTaxiVehicle } from "@/lib/actions/taxis";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function TaxiForm({ taxi }: { taxi?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(taxi?.mainImage || "");
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
    const data = {
      name: formData.get("name"),
      type: formData.get("type"),
      model: formData.get("model") || formData.get("type"),
      seatingCapacity: formData.get("seatingCapacity"),
      acAvailable: formData.get("acAvailable") === "true",
      luggageCapacity: formData.get("luggageCapacity"),
      shortDescription: formData.get("shortDescription"),
      description: formData.get("description"),
      features: formData.get("features"),
      facilities: formData.get("facilities"),
      pricePerDay: formData.get("pricePerDay"),
      pricePerKm: formData.get("pricePerKm"),
      outstationRate: formData.get("outstationRate"),
      localPackageRate: formData.get("localPackageRate"),
      airportTransfer: formData.get("airportTransfer"),
      mainImage: imagePreview,
      isActive: formData.get("isActive") === "true"
    };

    try {
      if (taxi?.id) {
        await updateTaxiVehicle(taxi.id, data);
      } else {
        await createTaxiVehicle(data);
      }
      router.push("/admin/taxis");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Vehicle Name</label>
          <input required name="name" defaultValue={taxi?.name} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. Toyota Innova Crysta" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Vehicle Type</label>
          <select required name="type" defaultValue={taxi?.type || "SUV"} className="w-full p-3 border border-stone-300 rounded-md">
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury SUV">Luxury SUV</option>
            <option value="Compact SUV">Compact SUV</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Vehicle Model (e.g. Maruti Suzuki)</label>
          <input required name="model" defaultValue={taxi?.model} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. Maruti Suzuki Swift Dzire" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Seating Capacity</label>
          <input required name="seatingCapacity" defaultValue={taxi?.seatingCapacity} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. 6+1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">AC Available</label>
          <select name="acAvailable" defaultValue={taxi ? (taxi.acAvailable ? "true" : "false") : "true"} className="w-full p-3 border border-stone-300 rounded-md">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Status (Active/Inactive)</label>
          <select name="isActive" defaultValue={taxi ? (taxi.isActive ? "true" : "false") : "true"} className="w-full p-3 border border-stone-300 rounded-md">
            <option value="true">Active (Visible)</option>
            <option value="false">Inactive (Hidden)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Luggage Capacity</label>
          <input name="luggageCapacity" defaultValue={taxi?.luggageCapacity} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. 4 Bags" />
        </div>
      </div>

      <hr className="border-stone-100" />
      <h3 className="text-lg font-bold text-stone-800">Descriptions</h3>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Short Description (for cards)</label>
        <textarea name="shortDescription" defaultValue={taxi?.shortDescription} rows={2} className="w-full p-3 border border-stone-300 rounded-md" placeholder="Brief summary of the taxi..."></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Full Description (for details page)</label>
        <textarea name="description" defaultValue={taxi?.description} rows={5} className="w-full p-3 border border-stone-300 rounded-md" placeholder="Detailed description..."></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Features (comma separated)</label>
        <input name="features" defaultValue={taxi?.features} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. Comfortable Seats, Music System, Clean Interior" />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Facilities / Amenities (comma separated)</label>
        <input name="facilities" defaultValue={taxi?.facilities} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. Air Conditioning, Charging Ports, Water Bottles" />
      </div>

      <hr className="border-stone-100" />
      <h3 className="text-lg font-bold text-stone-800">Pricing Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Price Per Day</label>
          <input name="pricePerDay" defaultValue={taxi?.pricePerDay} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. 3500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Price Per Km</label>
          <input name="pricePerKm" defaultValue={taxi?.pricePerKm} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. 15" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Outstation Rate</label>
          <input name="outstationRate" defaultValue={taxi?.outstationRate} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. 4000/day" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Local Package Rate</label>
          <input name="localPackageRate" defaultValue={taxi?.localPackageRate} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. 2500 (8hr/80km)" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Airport Transfer</label>
          <input name="airportTransfer" defaultValue={taxi?.airportTransfer} className="w-full p-3 border border-stone-300 rounded-md" placeholder="e.g. 1200" />
        </div>
      </div>

      <hr className="border-stone-100" />
      <h3 className="text-lg font-bold text-stone-800">Main Image</h3>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Upload Cover Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100" />
        {uploading && <p className="text-sm text-blue-600 mb-4">Uploading...</p>}
        {imagePreview && (
          <div className="relative w-64 h-40 rounded-lg overflow-hidden border border-stone-200">
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
          </div>
        )}
      </div>

      <div className="pt-6">
        <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50">
          {loading ? "Saving..." : taxi?.id ? "Update Taxi" : "Create Taxi"}
        </button>
      </div>
    </form>
  );
}
