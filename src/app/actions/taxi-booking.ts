'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitTaxiBooking(formData: FormData) {
  try {
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const travellers = formData.get('travellers') as string;
    const travelDate = formData.get('travelDate') as string;
    const returnDate = formData.get('returnDate') as string;
    const pickup = formData.get('pickup') as string;
    const drop = formData.get('drop') as string;
    const tripType = formData.get('tripType') as string;
    const days = formData.get('days') as string;
    const specialReqInput = formData.get('specialReq') as string;
    const vehicleId = formData.get('vehicleId') as string;

    if (!fullName || !phone || !email || !travelDate || !vehicleId) {
      return { success: false, message: 'Missing required fields.' };
    }

    const formattedReq = `
Trip Type: ${tripType || 'N/A'}
Pickup: ${pickup}
Drop: ${drop}
Days: ${days || 'N/A'}
Notes: ${specialReqInput || 'None'}
    `.trim();

    await prisma.booking.create({
      data: {
        fullName,
        phone,
        email,
        travelDate,
        returnDate: returnDate || null,
        adults: parseInt(travellers) || 1,
        children: 0,
        specialReq: formattedReq,
        taxiId: vehicleId,
        status: 'PENDING'
      }
    });

    revalidatePath('/admin/bookings');

    return { success: true };
  } catch (error) {
    console.error('Taxi booking submission error:', error);
    return { success: false, message: 'Failed to submit booking.' };
  }
}
