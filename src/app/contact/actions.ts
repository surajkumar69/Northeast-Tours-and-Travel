'use server'

export async function submitEnquiry(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  if (!name || !phone || !message) {
    return { error: 'Name, phone, and message are required.' }
  }

  // Simulate network delay for static frontend mode
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return { success: true }
}
