import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // We can fetch stats here later
  const { count: toursCount } = await supabase.from('tours').select('*', { count: 'exact', head: true })
  const { count: enquiriesCount } = await supabase.from('enquiries').select('*', { count: 'exact', head: true })

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stat Cards */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Tours</dt>
                  <dd className="text-lg font-medium text-gray-900">{toursCount || 0}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Enquiries</dt>
                  <dd className="text-lg font-medium text-gray-900">{enquiriesCount || 0}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
