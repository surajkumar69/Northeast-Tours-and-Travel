"use client";

import { deleteHeroSlide, toggleHeroSlideStatus } from "@/lib/actions/hero-slides";
import Link from "next/link";
import { Edit, Trash2, Power } from "lucide-react";
import { useTransition } from "react";

export function SlideActions({ id, isActive }: { id: string; isActive: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end space-x-3">
      <button
        onClick={() => startTransition(() => toggleHeroSlideStatus(id, !isActive))}
        disabled={isPending}
        title={isActive ? "Disable" : "Enable"}
        className={`${isActive ? "text-green-600 hover:text-green-800" : "text-stone-400 hover:text-stone-600"} transition-colors disabled:opacity-50`}
      >
        <Power size={18} />
      </button>
      <Link
        href={`/admin/hero-slides/${id}/edit`}
        className="text-blue-600 hover:text-blue-800 transition-colors"
        title="Edit"
      >
        <Edit size={18} />
      </Link>
      <button
        onClick={() => {
          if (confirm("Are you sure you want to delete this slide?")) {
            startTransition(() => deleteHeroSlide(id));
          }
        }}
        disabled={isPending}
        title="Delete"
        className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
