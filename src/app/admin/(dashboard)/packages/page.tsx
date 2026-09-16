import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { deleteTourPackage } from "@/lib/actions/packages";
import { PackageActions } from "./PackageActions"; // Client component for actions

export default async function PackagesPage() {
  const packages = await prisma.tourPackage.findMany({
    orderBy: { sortOrder: "asc" },
    include: { destination: true }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Tour Packages</h1>
          <p className="text-stone-500 mt-1">Manage all tour packages.</p>
        </div>
        <Link href="/admin/packages/new" className="bg-gold-600 hover:bg-gold-500 text-white font-medium py-2 px-4 rounded-md flex items-center">
          <Plus size={20} className="mr-2" /> Add Package
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Package</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Duration & Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-stone-200">
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-stone-100 flex-shrink-0">
                      {pkg.coverImage && <Image src={pkg.coverImage} alt={pkg.title} fill className="object-cover" />}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-stone-900">{pkg.title}</div>
                      <div className="text-sm text-stone-500">{pkg.destination?.name || "No destination"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">
                  {pkg.duration}<br/>
                  <span className="font-semibold text-stone-700">₹{pkg.price} {pkg.priceLabel}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'}`}>
                    {pkg.isActive ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <PackageActions id={pkg.id} isActive={pkg.isActive} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
