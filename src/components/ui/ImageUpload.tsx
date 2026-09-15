'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { UploadCloud, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  bucket: string
  folder: string
  value?: string
  onChange: (url: string) => void
}

export function ImageUpload({ bucket, folder, value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true)
      const file = e.target.files?.[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath)
      onChange(publicUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image!')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="w-full">
      {value ? (
        <div className="relative h-64 w-full overflow-hidden rounded-lg border border-gray-300">
          <Image src={value} alt="Uploaded image" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="mb-3 h-8 w-8 animate-spin text-gray-500" />
            ) : (
              <UploadCloud className="mb-3 h-8 w-8 text-gray-500" />
            )}
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or WEBP (MAX. 800x400px)</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
        </label>
      )}
    </div>
  )
}
