import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SlideActions } from "./SlideActions";
import Image from "next/image";

export default async function HeroSlidesPage() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Hero Slides</h1>
          <p className="text-stone-500 mt-1">Manage the homepage cinematic carousel</p>
        </div>
        <Link 
          href="/admin/hero-slides/new"
          className="bg-gold-600 hover:bg-gold-500 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" /> Add Slide
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Slide</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-stone-200">
            {slides.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-stone-500">
                  No hero slides found. Add one to get started.
                </td>
              </tr>
            ) : (
              slides.map((slide) => (
                <tr key={slide.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-16 w-24 rounded-md overflow-hidden bg-stone-100">
                      <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-stone-900">{slide.title}</div>
                    <div className="text-sm text-stone-500">{slide.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                    {slide.sortOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      slide.isActive ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'
                    }`}>
                      {slide.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <SlideActions id={slide.id} isActive={slide.isActive} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
