import prisma from "@/lib/prisma";
import { TourForm } from "@/components/admin/TourForm";

export default async function NewTourPackagePage() {
  const destinations = await prisma.destination.findMany();

  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Add Tour Package</h1>
        <p className="text-stone-500 mt-1">Create a new tour package.</p>
      </div>

      <TourForm destinations={destinations} />
    </div>
  );
}
