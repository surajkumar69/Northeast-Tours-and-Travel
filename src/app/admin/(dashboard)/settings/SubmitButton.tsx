"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-gold-600 hover:bg-gold-500 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? "Saving..." : "Save Settings"}
    </button>
  );
}
