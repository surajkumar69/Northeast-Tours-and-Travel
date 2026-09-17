'use client';

import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function StickyBottomBar() {
  const router = useRouter();

  const handleBookNow = () => {
    const form = document.getElementById('booking-form');
    if (form) {
      // Scroll to existing form on the specific package/vehicle page
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Navigate to general contact/booking page if no form on current page
      router.push('/contact');
    }
  };

  const whatsappMessage = "Hello Majestic Northeast Tours and Travel, I would like to enquire about your tour packages and vehicle services.";
  const whatsappUrl = `https://wa.me/917640076969?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg px-0 md:px-6">
      <div className="bg-stone-900/95 backdrop-blur-md border-t md:border border-stone-800 shadow-2xl md:rounded-2xl flex items-center justify-between safe-area-bottom overflow-hidden">
        <a 
          href="tel:+917640076969" 
          className="flex-1 flex flex-col items-center justify-center py-3 text-white hover:bg-stone-800/50 transition-colors border-r border-stone-800"
        >
          <Phone className="w-5 h-5 mb-1 text-gold-400" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Call Now</span>
        </a>

        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 text-white hover:bg-stone-800/50 transition-colors border-r border-stone-800"
        >
          <MessageCircle className="w-5 h-5 mb-1 text-green-500" />
          <span className="text-[10px] uppercase tracking-widest font-medium">WhatsApp</span>
        </a>

        <button 
          onClick={handleBookNow}
          className="flex-1 flex flex-col items-center justify-center py-3 text-white hover:bg-stone-800/50 transition-colors"
        >
          <CalendarCheck className="w-5 h-5 mb-1 text-gold-400" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Book Now</span>
        </button>
      </div>
    </div>
  );
}
