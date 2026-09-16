import { TaxiForm } from "@/components/admin/TaxiForm";

export default function NewTaxiVehiclePage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Add Taxi</h1>
        <p className="text-stone-500 mt-1">Add a new Taxi/Cab to your fleet.</p>
      </div>

      <TaxiForm />
    </div>
  );
}
