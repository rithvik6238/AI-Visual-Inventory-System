import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const shelves = await prisma.shelf.findMany({
      include: {
        products: true,
        alerts: {
          where: { status: 'UNRESOLVED' }
        }
      }
    });

    return NextResponse.json({ success: true, data: shelves });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch inventory' }, { status: 500 });
  }
}
