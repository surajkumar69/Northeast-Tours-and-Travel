'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteTour(id: string) {
  const supabase = await createClient()
  await supabase.from('tours').delete().eq('id', id)
  revalidatePath('/admin/tours')
}

export async function saveTour(formData: FormData, id?: string) {
  const supabase = await createClient()
  
  const payload = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    duration_days: parseInt(formData.get('duration_days') as string),
    duration_nights: parseInt(formData.get('duration_nights') as string),
    starting_price: parseFloat(formData.get('starting_price') as string),
    short_description: formData.get('short_description') as string,
    main_image: formData.get('main_image') as string,
    is_published: formData.get('is_published') === 'on',
    // ... we'll add other fields like inclusions, exclusions, itinerary later
  }

  if (id) {
    const { error } = await supabase.from('tours').update(payload).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('tours').insert(payload)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/tours')
  redirect('/admin/tours')
}
