import { PrismaClient } from '@prisma/client'
import { tourPackages } from '../src/data/tourPackages'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with initial tour packages...')

  for (const pkg of tourPackages) {
    const createdPkg = await prisma.tourPackage.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: {
        slug: pkg.slug,
        title: pkg.title,
        duration: pkg.duration,
        price: pkg.price,
        priceLabel: pkg.priceLabel,
        shortDescription: pkg.shortDescription,
        description: pkg.description,
        coverImage: pkg.coverImage,
        images: {
          create: pkg.gallery.map(url => ({ url }))
        },
        highlights: {
          create: pkg.highlights.map(text => ({ text }))
        },
        inclusions: {
          create: pkg.inclusions.map(text => ({ text }))
        },
        exclusions: {
          create: pkg.exclusions.map(text => ({ text }))
        },
        itinerary: {
          create: pkg.itinerary.map(day => ({
            day: day.day,
            title: day.title,
            description: day.activities.join(' ')
          }))
        }
      }
    })
    console.log(`Created package: ${createdPkg.title}`)
  }

  // Seed some destinations
  const destinations = [
    { slug: 'meghalaya', name: 'Meghalaya', state: 'Meghalaya', shortDescription: 'Abode of clouds', description: 'Discover mist-covered mountains and living root bridges.', coverImage: '/images/meghalaya_waterfall_1789460321208.jpg' },
    { slug: 'assam', name: 'Assam', state: 'Assam', shortDescription: 'Land of Red River and Blue Hills', description: 'Home to Kaziranga and vast tea estates.', coverImage: '/images/assam_tea_estate_1789460102115.jpg' },
    { slug: 'arunachal', name: 'Arunachal Pradesh', state: 'Arunachal Pradesh', shortDescription: 'Land of the Dawn-Lit Mountains', description: 'Explore ancient monasteries and pristine passes.', coverImage: '/images/arunachal_monastery_1789460394921.jpg' },
  ]

  for (const dest of destinations) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: {},
      create: dest
    })
    console.log(`Created destination: ${dest.name}`)
  }

  

}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
