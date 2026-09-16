import { ExperienceForm } from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Add Experience</h1>
        <p className="text-stone-500 mt-1">Create a new experience.</p>
      </div>

      <ExperienceForm />
    </div>
  );
}
