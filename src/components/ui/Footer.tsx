import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 py-20 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="text-2xl font-playfair tracking-wider font-bold text-white block">
            NORTHEAST TOURS
          </Link>
          <p className="font-light text-sm leading-relaxed text-stone-400">
            Premium, curated travel experiences across Northeast India. Discover landscapes, cultures, and breathtaking journeys thoughtfully planned just for you.
          </p>
          <div className="flex space-x-4 text-xs tracking-widest font-medium uppercase">
            <a href="#" className="text-stone-500 hover:text-white transition-colors">FB</a>
            <a href="#" className="text-stone-500 hover:text-white transition-colors">IG</a>
            <a href="#" className="text-stone-500 hover:text-white transition-colors">X</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-medium tracking-widest text-sm uppercase mb-6">Explore</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><Link href="/packages" className="hover:text-white transition-colors">Tours & Packages</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
            <li><Link href="/taxis" className="hover:text-white transition-colors">Taxi Booking</Link></li>
            <li><Link href="/tempo-traveller" className="hover:text-white transition-colors">Tempo Travellers</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-medium tracking-widest text-sm uppercase mb-6">Support</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Booking Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium tracking-widest text-sm uppercase mb-6">Get in Touch</h4>
          <ul className="space-y-4 text-sm font-light">
            <li className="flex items-start">
              <Phone size={16} className="mr-3 mt-1 text-stone-500 shrink-0" />
              <span>+91-7640076969</span>
            </li>
            <li className="flex items-start">
              <Mail size={16} className="mr-3 mt-1 text-stone-500 shrink-0" />
              <span>thedivinetravel01@gmail.com</span>
            </li>
            <li className="flex items-start">
              <MapPin size={16} className="mr-3 mt-1 text-stone-500 shrink-0" />
              <span className="leading-relaxed">A2, Ground Floor, Royal Residency, SOS Village Road, Opp. Terminal-2, Lokpriya Gopinath Bordoloi International Airport, Guwahati-781015, Assam.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Popular Routes (SEO) */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-12 border-t border-stone-900">
        <h4 className="text-white font-medium tracking-widest text-sm uppercase mb-6">Popular Routes</h4>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-light text-stone-500">
          <Link href="/routes/guwahati-to-shillong-taxi" className="hover:text-gold-500 transition-colors">Guwahati to Shillong</Link>
          <Link href="/routes/guwahati-to-cherrapunji-taxi" className="hover:text-gold-500 transition-colors">Guwahati to Cherrapunji</Link>
          <Link href="/routes/guwahati-to-kaziranga-taxi" className="hover:text-gold-500 transition-colors">Guwahati to Kaziranga</Link>
          <Link href="/routes/guwahati-to-tawang-taxi" className="hover:text-gold-500 transition-colors">Guwahati to Tawang</Link>
          <Link href="/routes/shillong-to-cherrapunji" className="hover:text-gold-500 transition-colors">Shillong to Cherrapunji</Link>
          <Link href="/routes" className="hover:text-white transition-colors underline underline-offset-4">View All Routes &rarr;</Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-stone-900 text-center text-xs font-light text-stone-600">
        &copy; {new Date().getFullYear()} Northeast Tours & Travel. All rights reserved.
      </div>
    </footer>
  );
}
