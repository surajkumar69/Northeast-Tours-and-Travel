import { TempoForm } from "@/components/admin/TempoForm";

export default function NewTempoTravellerPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Add Vehicle</h1>
        <p className="text-stone-500 mt-1">Add a new Force Urbania or Tempo Traveller to your fleet.</p>
      </div>

      <TempoForm />
    </div>
  );
}
