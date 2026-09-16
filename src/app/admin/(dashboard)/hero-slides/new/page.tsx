import { SlideForm } from "../SlideForm";

export default function NewHeroSlidePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Add Hero Slide</h1>
        <p className="text-stone-500 mt-1">Create a new slide for the homepage carousel</p>
      </div>

      <SlideForm />
    </div>
  );
}
