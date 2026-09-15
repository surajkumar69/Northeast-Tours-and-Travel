'use client'

import { Header } from '@/components/ui/Header'
import { submitEnquiry } from './actions'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    const res = await submitEnquiry(formData)
    
    if (res.error) {
      setErrorMessage(res.error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header variant="dark" />
      
      <main className="flex-1 pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <h1 className="font-playfair text-5xl md:text-6xl text-stone-900 mb-8">Get in Touch</h1>
          <p className="text-stone-600 text-lg mb-12 max-w-md font-light">
            Plan your next journey with us. Fill out the form and our travel experts will get back to you shortly to design your perfect itinerary.
          </p>
          
          <div className="space-y-6 text-stone-800">
            <div>
              <h3 className="font-medium tracking-widest text-sm uppercase mb-1">Email</h3>
              <p className="font-light text-stone-600">hello@northeasttours.com</p>
            </div>
            <div>
              <h3 className="font-medium tracking-widest text-sm uppercase mb-1">Phone</h3>
              <p className="font-light text-stone-600">+91 98765 43210</p>
            </div>
            <div>
              <h3 className="font-medium tracking-widest text-sm uppercase mb-1">Office</h3>
              <p className="font-light text-stone-600">Shillong, Meghalaya, India</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white p-8 md:p-12 shadow-sm border border-stone-100">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <h3 className="font-playfair text-3xl mb-4 text-stone-900">Thank You</h3>
              <p className="text-stone-600 font-light mb-8">Your enquiry has been received. We will contact you soon.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-sm tracking-widest uppercase font-medium text-stone-900 border-b border-stone-900 pb-1"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
              <h3 className="font-playfair text-2xl mb-6 text-stone-900">Send us a message</h3>
              
              {status === 'error' && (
                <div className="bg-red-50 text-red-800 p-4 text-sm">{errorMessage}</div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium tracking-widest uppercase text-stone-500 mb-2">Name *</label>
                  <input type="text" id="name" name="name" required className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium tracking-widest uppercase text-stone-500 mb-2">Phone *</label>
                  <input type="tel" id="phone" name="phone" required className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-medium tracking-widest uppercase text-stone-500 mb-2">Email Address</label>
                <input type="email" id="email" name="email" className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium tracking-widest uppercase text-stone-500 mb-2">Subject</label>
                <input type="text" id="subject" name="subject" className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent" />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium tracking-widest uppercase text-stone-500 mb-2">Message *</label>
                <textarea id="message" name="message" rows={4} required className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-stone-900 text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-stone-800 transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending...' : (
                  <>Send Message <ArrowRight className="ml-2 w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
