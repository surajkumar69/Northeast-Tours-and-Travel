import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default async function TemposAdminPage() {
  const tempos = await prisma.tempoTraveller.findMany({ orderBy: { createdAt: 'desc' } })

  async function deleteTempo(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    if (id) {
      await prisma.tempoTraveller.delete({ where: { id } })
      revalidatePath('/admin/tempos')
    }
  }

  return (
    <div className="p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Tempo Travellers Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage Force Urbania, Tempo Travellers, and their specifications, images, and pricing.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/tempos/new"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New Vehicle
          </Link>
        </div>
      </div>
      
      <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Vehicle Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Capacity</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price / Day</th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tempos.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-gray-500">No vehicles found.</td>
              </tr>
            ) : (
              tempos.map((tempo) => (
                <tr key={tempo.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{tempo.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{tempo.type}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{tempo.seatingCapacity} Seater</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{tempo.pricePerDay || 'N/A'}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex justify-end gap-3">
                    <Link href={`/admin/tempos/${tempo.id}/edit`} className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-5 w-5" />
                    </Link>
                    <form action={deleteTempo}>
                      <input type="hidden" name="id" value={tempo.id} />
                      <button type="submit" className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
