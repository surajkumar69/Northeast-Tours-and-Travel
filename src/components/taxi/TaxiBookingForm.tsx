'use client';

import { useState } from 'react';
import { submitTaxiBooking } from '@/app/actions/taxi-booking';
import { Loader2 } from 'lucide-react';

export function TaxiBookingForm({ vehicleId, vehicleName }: { vehicleId: string, vehicleName: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    formData.append('vehicleId', vehicleId);
    
    try {
      const res = await submitTaxiBooking(formData);
      if (res.success) {
        setStatus('success');
        e.currentTarget.reset();
      } else {
        setStatus('error');
        setErrorMessage(res.message || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to submit booking request. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-stone-900 border border-gold-500/30 p-8 text-center rounded-sm">
        <h3 className="text-2xl font-playfair text-gold-400 mb-4">Request Received</h3>
        <p className="text-stone-300">Thank you for your booking enquiry for the {vehicleName}. Our team will contact you shortly to confirm availability.</p>
        <button onClick={() => setStatus('idle')} className="mt-8 text-sm uppercase tracking-widest text-gold-500 hover:text-white transition-colors">
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-900 border border-stone-800 p-6 md:p-10 rounded-sm">
      <h3 className="text-2xl font-playfair text-white mb-6">Book {vehicleName}</h3>
      
      {status === 'error' && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-sm mb-6 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Full Name *</label>
            <input required type="text" name="fullName" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Phone Number *</label>
            <input required type="tel" name="phone" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Email Address *</label>
            <input required type="email" name="email" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Total Travellers *</label>
            <input required type="number" min="1" name="travellers" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Travel Date *</label>
            <input required type="date" name="travelDate" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Return Date</label>
            <input type="date" name="returnDate" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Pickup Location *</label>
            <input required type="text" name="pickup" placeholder="e.g., Guwahati Airport" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Drop Location *</label>
            <input required type="text" name="drop" placeholder="e.g., Shillong" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Trip Type</label>
            <select name="tripType" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors appearance-none">
              <option value="Round Trip">Round Trip</option>
              <option value="One Way Drop">One Way Drop</option>
              <option value="Local Sightseeing">Local Sightseeing</option>
              <option value="Multi-day Tour Package">Multi-day Tour Package</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Number of Days</label>
            <input type="number" min="1" name="days" placeholder="e.g., 5" className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Special Requirements</label>
          <textarea name="specialReq" rows={4} className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 text-white px-4 py-3 rounded-sm outline-none transition-colors resize-none"></textarea>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-gold-500 hover:bg-gold-400 text-stone-950 font-bold uppercase tracking-widest text-sm py-4 rounded-sm transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request to Book'}
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <a href={`https://wa.me/918787488801?text=Hello, I want to book the ${vehicleName}.`} target="_blank" rel="noopener noreferrer" className="w-full bg-stone-800 hover:bg-stone-700 text-white font-medium uppercase tracking-widest text-xs py-3 rounded-sm transition-colors text-center">
              WhatsApp
            </a>
            <a href="tel:+918787488801" className="w-full bg-stone-800 hover:bg-stone-700 text-white font-medium uppercase tracking-widest text-xs py-3 rounded-sm transition-colors text-center">
              Call Now
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
