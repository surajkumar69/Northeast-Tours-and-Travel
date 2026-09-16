import Link from 'next/link';
import { LogOut, Home, Image as ImageIcon, Map, MapPin, Package, Settings, Users, MessageSquare } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'super_secret_key_123_456_789_012_345_678_901_234_567_890'
);

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  
  if (!token) {
    redirect('/admin/login');
  }

  let userEmail = 'Admin';
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    userEmail = payload.email as string || 'Admin';
  } catch (error) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-950 text-stone-300 flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="h-16 flex items-center px-6 bg-black">
          <span className="font-playfair text-xl text-gold-400 font-bold">Majestic Admin</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 space-y-1 px-3">
          <NavItem href="/admin" icon={<Home size={20} />} label="Dashboard" />
          <NavItem href="/admin/bookings" icon={<Users size={20} />} label="Bookings" />
          <NavItem href="/admin/enquiries" icon={<MessageSquare size={20} />} label="Enquiries" />
          
          <div className="pt-4 pb-2 px-3 text-xs font-semibold uppercase tracking-widest text-stone-500">Content</div>
          <NavItem href="/admin/hero-slides" icon={<ImageIcon size={20} />} label="Hero Slides" />
          <NavItem href="/admin/destinations" icon={<MapPin size={20} />} label="Destinations" />
          <NavItem href="/admin/packages" icon={<Package size={20} />} label="Tour Packages" />
          <NavItem href="/admin/taxis" icon={<Map size={20} />} label="Taxis" />
          <NavItem href="/admin/tempos" icon={<Map size={20} />} label="Tempo Travellers" />
          <NavItem href="/admin/homepage-gallery" icon={<ImageIcon size={20} />} label="Homepage Gallery" />
          <NavItem href="/admin/experiences" icon={<MapPin size={20} />} label="Experiences" />
          
          <div className="pt-4 pb-2 px-3 text-xs font-semibold uppercase tracking-widest text-stone-500">System</div>
          <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 bg-black/50 border-t border-white/5">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-sm truncate">{userEmail}</span>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button className="flex items-center w-full px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-md transition-colors">
              <LogOut size={18} className="mr-3" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen bg-stone-100">
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center px-3 py-2.5 text-sm rounded-md hover:bg-white/10 hover:text-white transition-colors">
      <span className="mr-3 text-stone-400">{icon}</span>
      {label}
    </Link>
  );
}
