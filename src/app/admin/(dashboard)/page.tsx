import prisma from "@/lib/prisma";
import Link from "next/link";
import { Users, MapPin, Package, MessageSquare, Car, Image as ImageIcon } from "lucide-react";

export default async function AdminDashboard() {
  const [
    bookingCount,
    enquiryCount,
    destinationCount,
    packageCount,
    taxiCount,
    tempoCount
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.enquiry.count(),
    prisma.destination.count(),
    prisma.tourPackage.count(),
    prisma.taxiVehicle.count(),
    prisma.tempoTraveller.count()
  ]);

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { package: true, taxi: true, tempo: true }
  });

  const recentEnquiries = await prisma.enquiry.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Dashboard Overview</h1>
        <p className="text-stone-500 mt-1">Welcome to Majestic Northeast Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard title="Total Bookings" value={bookingCount} icon={<Users className="w-6 h-6" />} href="/admin/bookings" color="bg-blue-500" />
        <StatCard title="New Enquiries" value={enquiryCount} icon={<MessageSquare className="w-6 h-6" />} href="/admin/enquiries" color="bg-green-500" />
        <StatCard title="Destinations" value={destinationCount} icon={<MapPin className="w-6 h-6" />} href="/admin/destinations" color="bg-purple-500" />
        <StatCard title="Tour Packages" value={packageCount} icon={<Package className="w-6 h-6" />} href="/admin/packages" color="bg-gold-500" />
        <StatCard title="Taxi Fleet" value={taxiCount} icon={<Car className="w-6 h-6" />} href="/admin/taxis" color="bg-orange-500" />
        <StatCard title="Tempo Fleet" value={tempoCount} icon={<Car className="w-6 h-6" />} href="/admin/tempos" color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-stone-800">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm text-gold-600 hover:text-gold-700 font-medium">View All</Link>
          </div>
          <div className="space-y-4">
            {recentBookings.length === 0 ? (
              <p className="text-stone-500 text-sm">No bookings yet.</p>
            ) : (
              recentBookings.map(booking => (
                <div key={booking.id} className="flex justify-between items-center p-4 bg-stone-50 rounded-lg border border-stone-100">
                  <div>
                    <p className="font-semibold text-stone-800">{booking.fullName}</p>
                    <p className="text-xs text-stone-500">{booking.email} • {new Date(booking.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs font-medium text-stone-600 mt-1">
                      {booking.package?.title || booking.taxi?.name || booking.tempo?.name || 'General Booking'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                    booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-stone-800">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-gold-600 hover:text-gold-700 font-medium">View All</Link>
          </div>
          <div className="space-y-4">
            {recentEnquiries.length === 0 ? (
              <p className="text-stone-500 text-sm">No enquiries yet.</p>
            ) : (
              recentEnquiries.map(enq => (
                <div key={enq.id} className="flex justify-between items-center p-4 bg-stone-50 rounded-lg border border-stone-100">
                  <div>
                    <p className="font-semibold text-stone-800">{enq.fullName}</p>
                    <p className="text-xs text-stone-500">{enq.email} • {new Date(enq.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-stone-600 mt-1 truncate max-w-[200px]">{enq.message}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    enq.status === 'READ' ? 'bg-blue-100 text-blue-700' : 
                    enq.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {enq.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, href, color }: any) {
  return (
    <Link href={href} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center hover:shadow-md transition-shadow">
      <div className={`p-4 rounded-lg text-white ${color} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-stone-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-stone-800">{value}</p>
      </div>
    </Link>
  );
}
