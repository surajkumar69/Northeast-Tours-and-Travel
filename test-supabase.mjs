import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lamxgllzehswrirykgqx.supabase.co'
const supabaseKey = 'sb_publishable_CwwxV2z1KH6Y2T4GXoCMSw_hfITJRGc'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing Enquiry Insert...')
  const { data, error } = await supabase.from('enquiries').insert([
    {
      name: 'Test User',
      phone: '1234567890',
      email: 'test@example.com',
      message: 'This is a test enquiry'
    }
  ]).select()

  if (error) {
    console.error('Error inserting enquiry:', error)
  } else {
    console.log('Successfully inserted enquiry:', data)
  }
}

testConnection()
