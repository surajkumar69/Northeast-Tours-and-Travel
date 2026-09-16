import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { ExperienceActions } from "./ExperienceActions";

export default async function ExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { sortOrder: "asc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Experiences</h1>
          <p className="text-stone-500 mt-1">Manage activities and experiences.</p>
        </div>
        <Link href="/admin/experiences/new" className="bg-gold-600 hover:bg-gold-500 text-white font-medium py-2 px-4 rounded-md flex items-center">
          <Plus size={20} className="mr-2" /> Add Experience
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-stone-200">
            {experiences.map((exp) => (
              <tr key={exp.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-stone-100 flex-shrink-0">
                      {exp.coverImage && <Image src={exp.coverImage} alt={exp.title} fill className="object-cover" />}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-stone-900">{exp.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">
                  {exp.category || "General"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${exp.isActive ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'}`}>
                    {exp.isActive ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ExperienceActions id={exp.id} isActive={exp.isActive} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
