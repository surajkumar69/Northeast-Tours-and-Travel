import prisma from "@/lib/prisma";
import { AnimatedHomepage } from "@/components/home/AnimatedHomepage";

export default async function HomePage() {
  // Hardcode the specifically requested destinations for the homepage
  const destinations = [
    {
      id: 'dest-1',
      name: 'Arunachal Pradesh',
      shortDescription: 'Discover the mystical Himalayan mountains, Tawang monastery, and winding mountain roads.',
      coverImage: '/images/ai-generated/himalayan_landscape_2_1789535426416.jpg',
      slug: 'arunachal'
    },
    {
      id: 'dest-2',
      name: 'Meghalaya',
      shortDescription: 'Explore the Abode of Clouds, Cherrapunji waterfalls, green hills, and misty landscapes.',
      coverImage: '/images/ai-generated/shillong_gallery_1_1789536715356.jpg',
      slug: 'meghalaya'
    },
    {
      id: 'dest-3',
      name: 'Kaziranga National Park',
      shortDescription: 'Witness the one-horned rhinoceros in Kaziranga and lush tea grasslands.',
      coverImage: '/images/ai-generated/kaziranga_rhino_ai.jpg',
      slug: 'kaziranga-national-park'
    },
    {
      id: 'dest-4',
      name: 'Sikkim',
      shortDescription: 'Experience pristine Himalayan landscapes, mountain valleys, and ancient monasteries.',
      coverImage: '/images/ai-generated/himalayan_landscape_3_1789535445439.jpg',
      slug: 'sikkim'
    },
    {
      id: 'dest-5',
      name: 'Nagaland',
      shortDescription: 'Immerse in authentic tribal culture, traditional architecture, and festive atmosphere.',
      coverImage: '/images/ai-generated/tribal_culture_2_1789535556947.jpg',
      slug: 'nagaland'
    },
    {
      id: 'dest-6',
      name: 'Mizoram & Beyond',
      shortDescription: 'Beautiful natural landscapes, rolling hills, and unique local culture.',
      coverImage: '/images/ai-generated/himalayan_landscape_4_1789535524609.jpg',
      slug: 'mizoram'
    }
  ];

  // Fetch featured tour packages
  const packages = await prisma.tourPackage.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    take: 3
  });

  // Fetch fleet (taxis)
  const taxis = await prisma.taxiVehicle.findMany({
    take: 3
  });

  // Culture images from our existing AI-generated culture section
  const cultureImages = [
    "/images/ai-generated/tribal_culture_1_1789535543398.jpg",
    "/images/ai-generated/tribal_culture_2_1789535556947.jpg",
    "/images/ai-generated/tribal_culture_3_1789535569703.jpg",
    "/images/ai-generated/tribal_culture_4_1789535587225.jpg"
  ];

  return (
    <AnimatedHomepage 
      destinations={destinations}
      packages={packages}
      taxis={taxis}
      cultureImages={cultureImages}
    />
  );
}
