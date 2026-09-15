import { TourForm } from '@/components/admin/TourForm'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditTourPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  const { data: tour } = await supabase.from('tours').select('*').eq('id', params.id).single()

  if (!tour) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <TourForm tour={tour} />
    </div>
  )
}
