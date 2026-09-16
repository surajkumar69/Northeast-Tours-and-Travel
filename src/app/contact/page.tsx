import { Header } from "@/components/ui/Header";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-stone-200">
      <Header variant="light" />
      
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="font-playfair text-4xl md:text-5xl text-gold-400 mb-6">Get in Touch</h1>
          <p className="text-stone-300 text-lg mb-12">Whether you're ready to book your next journey or simply seeking inspiration, our travel experts are here to help.</p>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <Phone className="w-6 h-6 text-gold-500 mr-4 shrink-0" />
              <div>
                <h3 className="text-white font-medium mb-1 tracking-widest uppercase text-sm">Call or WhatsApp</h3>
                <p className="text-stone-400">+91 87874 88801</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-gold-500 mr-4 shrink-0" />
              <div>
                <h3 className="text-white font-medium mb-1 tracking-widest uppercase text-sm">Email Us</h3>
                <p className="text-stone-400">thedivinetravel01@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-gold-500 mr-4 shrink-0" />
              <div>
                <h3 className="text-white font-medium mb-1 tracking-widest uppercase text-sm">Visit Us</h3>
                <p className="text-stone-400 leading-relaxed">
                  A2, Ground Floor, Royal Residency, SOS Village Road, Opp. Terminal-2, Lokpriya Gopinath Bordoloi International Airport, Guwahati-781015, Assam.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-stone-800 bg-stone-900 p-8 rounded-sm">
          <h3 className="font-playfair text-2xl text-white mb-6">Send an Enquiry</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
            <input type="email" placeholder="Email Address" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
            <input type="tel" placeholder="Phone Number" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
            <textarea placeholder="How can we help you?" rows={4} className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
            
            <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-white font-medium tracking-widest uppercase py-4 transition-colors mt-4">
              Submit Enquiry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
