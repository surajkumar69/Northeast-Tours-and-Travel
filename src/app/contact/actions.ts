'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitEnquiry(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!name || !phone || !message) {
    return { error: 'Name, phone, and message are required.' }
  }

  const { error } = await supabase.from('enquiries').insert({
    name,
    email,
    phone,
    subject,
    message,
    status: 'new',
  })

  if (error) {
    return { error: 'Failed to submit enquiry. Please try again.' }
  }

  return { success: true }
}
