import { Image as ImageIcon } from 'lucide-react'

interface PremiumImagePlaceholderProps {
  title: string
  className?: string
}

export function PremiumImagePlaceholder({ title, className = '' }: PremiumImagePlaceholderProps) {
  return (
    <div className={`flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-6 text-center ${className}`}>
      <ImageIcon className="w-12 h-12 mb-4 opacity-50" strokeWidth={1} />
      <h3 className="font-playfair text-xl text-stone-800 mb-2">{title}</h3>
      <p className="text-xs tracking-widest uppercase font-medium">Image Coming Soon</p>
      <div className="w-12 h-px bg-stone-300 mt-4" />
    </div>
  )
}
