'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Map, 
  MapPin, 
  CarFront, 
  Bus, 
  Image as ImageIcon,
  MessageSquare,
  CalendarCheck,
  Mail,
  Settings,
  LogOut
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Tours & Packages', href: '/admin/tours', icon: Map },
  { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { name: 'Taxi Booking', href: '/admin/taxis', icon: CarFront },
  { name: 'Tempo Travellers', href: '/admin/tempos', icon: Bus },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { name: 'Enquiries', href: '/admin/enquiries', icon: Mail },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-xl font-bold tracking-tight text-white">Admin Panel</h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                )}
              >
                <item.icon
                  className={classNames(
                    isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                    'mr-3 h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleSignOut}
            className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-300" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
