'use client'

import { saveTour } from '@/app/admin/(dashboard)/tours/actions'
import { useState } from 'react'
import { ImageUpload } from '@/components/ui/ImageUpload'

export function TourForm({ tour = null }: { tour?: any }) {
  const [loading, setLoading] = useState(false)
  const [mainImage, setMainImage] = useState(tour?.main_image || '')

  return (
    <form 
      action={async (formData) => {
        setLoading(true)
        try {
          await saveTour(formData, tour?.id)
        } catch (err) {
          console.error(err)
          alert('Failed to save tour')
          setLoading(false)
        }
      }}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {tour ? 'Edit Tour' : 'Create New Tour'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the information below to {tour ? 'update this' : 'create a new'} tour package.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Tour Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  defaultValue={tour?.title}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug (URL-friendly)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  defaultValue={tour?.slug}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="duration_days" className="block text-sm font-medium text-gray-700">
                Days
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="duration_days"
                  id="duration_days"
                  required
                  defaultValue={tour?.duration_days}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="duration_nights" className="block text-sm font-medium text-gray-700">
                Nights
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="duration_nights"
                  id="duration_nights"
                  required
                  defaultValue={tour?.duration_nights}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="starting_price" className="block text-sm font-medium text-gray-700">
                Starting Price (₹)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="starting_price"
                  id="starting_price"
                  required
                  defaultValue={tour?.starting_price}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <div className="mt-1">
                <textarea
                  id="short_description"
                  name="short_description"
                  rows={3}
                  defaultValue={tour?.short_description}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Image
              </label>
              <input type="hidden" name="main_image" value={mainImage} />
              <ImageUpload
                bucket="images"
                folder="tours"
                value={mainImage}
                onChange={setMainImage}
              />
            </div>

            <div className="sm:col-span-6">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="is_published"
                    name="is_published"
                    type="checkbox"
                    defaultChecked={tour?.is_published}
                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="is_published" className="font-medium text-gray-700">
                    Publish Tour
                  </label>
                  <p className="text-gray-500">Make this tour visible on the public website.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            {loading ? 'Saving...' : 'Save Tour'}
          </button>
        </div>
      </div>
    </form>
  )
}
