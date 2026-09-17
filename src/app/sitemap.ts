import { MetadataRoute } from 'next'
import { routePages } from '@/data/routePages'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://majesticnortheast.com' // Replace with actual domain when live

  const destinations = await prisma.destination.findMany({ select: { slug: true } })
  const packages = await prisma.tourPackage.findMany({ select: { slug: true } })
  const taxis = await prisma.taxiVehicle.findMany({ select: { slug: true } })
  const tempos = await prisma.tempoTraveller.findMany({ select: { slug: true } })

  const routesMap = routePages.map((route) => ({
    url: `${baseUrl}/routes/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  const destinationsMap = destinations.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const packagesMap = packages.map((p) => ({
    url: `${baseUrl}/packages/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const taxisMap = taxis.map((t) => ({
    url: `${baseUrl}/taxis/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const temposMap = tempos.map((t) => ({
    url: `${baseUrl}/tempo-traveller/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/taxis`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tempo-traveller`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/routes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...routesMap,
    ...destinationsMap,
    ...packagesMap,
    ...taxisMap,
    ...temposMap
  ]
}
