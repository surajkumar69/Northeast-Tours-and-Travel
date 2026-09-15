import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Plus, Edit } from 'lucide-react'

export default async function TemposPage() {
  const supabase = await createClient()
  const { data: tempos } = await supabase.from('tempo_vehicles').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Tempo Travellers</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage Force Urbania, Tempo Travellers, and Force Aarya vehicles.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/tempos/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Vehicle
          </Link>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg bg-white">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Vehicle</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Capacity</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price/Day</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tempos?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-sm text-gray-500">
                        No tempo travellers found.
                      </td>
                    </tr>
                  ) : (
                    tempos?.map((tempo) => (
                      <tr key={tempo.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{tempo.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{tempo.seating_capacity} Seater</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{tempo.price_per_day}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${tempo.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {tempo.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link href={`/admin/tempos/${tempo.id}/edit`} className="text-gray-600 hover:text-gray-900">
                            <Edit className="h-5 w-5" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
