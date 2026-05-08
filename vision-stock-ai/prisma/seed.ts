import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.scan.deleteMany()
  await prisma.alert.deleteMany()
  await prisma.product.deleteMany()
  await prisma.shelf.deleteMany()

  // Create Shelves
  const shelfA = await prisma.shelf.create({
    data: {
      name: 'Aisle 1 - Beverages',
      location: 'Zone A',
      status: 'OK',
    },
  })

  const shelfB = await prisma.shelf.create({
    data: {
      name: 'Aisle 2 - Snacks',
      location: 'Zone B',
      status: 'LOW_STOCK',
    },
  })

  const shelfC = await prisma.shelf.create({
    data: {
      name: 'Aisle 3 - Pharmacy',
      location: 'Zone C',
      status: 'MISPLACED',
    },
  })

  // Create Products
  await prisma.product.createMany({
    data: [
      { shelfId: shelfA.id, name: 'Coca Cola 500ml', sku: 'BEV-001', count: 18, capacity: 20, confidence: 0.98 },
      { shelfId: shelfA.id, name: 'Pepsi 500ml', sku: 'BEV-002', count: 15, capacity: 20, confidence: 0.97 },
      { shelfId: shelfA.id, name: 'Sprite 500ml', sku: 'BEV-003', count: 20, capacity: 20, confidence: 0.99 },

      { shelfId: shelfB.id, name: 'Lay\'s Classic', sku: 'SNK-001', count: 3, capacity: 15, confidence: 0.95 },
      { shelfId: shelfB.id, name: 'Doritos Nacho', sku: 'SNK-002', count: 14, capacity: 15, confidence: 0.96 },

      { shelfId: shelfC.id, name: 'Advil 200mg', sku: 'PHR-001', count: 25, capacity: 30, confidence: 0.92 },
      { shelfId: shelfC.id, name: 'Tylenol Extra', sku: 'PHR-002', count: 12, capacity: 30, confidence: 0.88 },
    ]
  })

  // Create Alerts
  await prisma.alert.createMany({
    data: [
      {
        shelfId: shelfB.id,
        type: 'LOW_STOCK',
        message: 'Lay\'s Classic is below 20% capacity (3/15).',
        severity: 'HIGH',
      },
      {
        shelfId: shelfC.id,
        type: 'MISPLACED_ITEM',
        message: 'Unrecognized item detected in pharmacy section.',
        severity: 'MEDIUM',
      }
    ]
  })

  console.log('Database seeded with futuristic inventory data!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
