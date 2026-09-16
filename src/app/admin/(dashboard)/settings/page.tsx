import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findFirst() || {
    id: 'new',
    companyName: '',
    tagline: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    facebookUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    twitterUrl: ''
  };

  async function updateSettings(formData: FormData) {
    "use server";
    
    const data = {
      companyName: formData.get('companyName') as string,
      tagline: formData.get('tagline') as string,
      phone: formData.get('phone') as string,
      whatsapp: formData.get('whatsapp') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      facebookUrl: formData.get('facebookUrl') as string,
      instagramUrl: formData.get('instagramUrl') as string,
      youtubeUrl: formData.get('youtubeUrl') as string,
      twitterUrl: formData.get('twitterUrl') as string,
    };

    const count = await prisma.siteSettings.count();
    
    if (count === 0) {
      await prisma.siteSettings.create({ data });
    } else {
      const first = await prisma.siteSettings.findFirst();
      await prisma.siteSettings.update({
        where: { id: first!.id },
        data
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/settings');
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Site Settings</h1>
        <p className="text-stone-500 mt-1">Manage global contact information and social links</p>
      </div>

      <form action={updateSettings} className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">Branding</h3>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Company Name</label>
              <input type="text" name="companyName" defaultValue={settings.companyName} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Tagline</label>
              <input type="text" name="tagline" defaultValue={settings.tagline} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
            </div>
          </div>

          <div className="space-y-4 md:col-span-2 mt-4">
            <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                <input type="text" name="phone" defaultValue={settings.phone} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">WhatsApp Number</label>
                <input type="text" name="whatsapp" defaultValue={settings.whatsapp} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                <input type="email" name="email" defaultValue={settings.email} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Physical Address</label>
                <textarea name="address" defaultValue={settings.address || ''} rows={3} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500"></textarea>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2 mt-4">
            <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Facebook URL</label>
                <input type="url" name="facebookUrl" defaultValue={settings.facebookUrl || ''} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Instagram URL</label>
                <input type="url" name="instagramUrl" defaultValue={settings.instagramUrl || ''} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">YouTube URL</label>
                <input type="url" name="youtubeUrl" defaultValue={settings.youtubeUrl || ''} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Twitter/X URL</label>
                <input type="url" name="twitterUrl" defaultValue={settings.twitterUrl || ''} className="w-full border border-stone-300 rounded-md px-4 py-2 focus:ring-gold-500 focus:border-gold-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

// Client component for the submit button to show loading state
import { SubmitButton } from './SubmitButton';
