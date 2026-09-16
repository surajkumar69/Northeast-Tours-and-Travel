"use client";

import { deleteExperience, toggleExperienceStatus } from "@/lib/actions/experiences";
import Link from "next/link";
import { Edit, Trash2, Power } from "lucide-react";
import { useTransition } from "react";

export function ExperienceActions({ id, isActive }: { id: string; isActive: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end space-x-3">
      <button onClick={() => startTransition(() => toggleExperienceStatus(id, !isActive))} disabled={isPending} className="text-stone-400 hover:text-stone-600">
        <Power size={18} className={isActive ? "text-green-600" : ""} />
      </button>
      <Link href={`/admin/experiences/${id}/edit`} className="text-blue-600 hover:text-blue-800">
        <Edit size={18} />
      </Link>
      <button
        onClick={() => { if (confirm("Delete this experience?")) startTransition(() => deleteExperience(id)); }}
        disabled={isPending}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
