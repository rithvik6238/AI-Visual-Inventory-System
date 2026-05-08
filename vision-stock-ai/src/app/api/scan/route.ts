import { NextResponse } from 'next/server';
import { detectProducts } from '@/services/mockVision';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { imageUrl, shelfId } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ success: false, error: 'Missing imageUrl' }, { status: 400 });
    }

    // Run Mock AI Vision
    const detections = await detectProducts(imageUrl);

    // Save scan to DB (optional, if we want to keep history)
    if (shelfId) {
      try {
        await prisma.scan.create({
          data: {
            shelfId,
            imageUrl,
            detections: JSON.stringify(detections)
          }
        });
      } catch(e) {
        console.warn("Could not save scan to DB, shelf might not exist", e);
      }
    }

    return NextResponse.json({
      success: true,
      detections
    });
  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json({ success: false, error: 'Scan failed' }, { status: 500 });
  }
}
