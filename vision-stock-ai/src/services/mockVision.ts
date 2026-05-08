export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Detection {
  id: string;
  product: string;
  confidence: number;
  count: number;
  bbox: BoundingBox;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const productNames = [
  "Coca Cola 500ml", "Pepsi 500ml", "Sprite 500ml",
  "Lay's Classic", "Doritos Nacho", "Pringles Original",
  "Advil 200mg", "Tylenol Extra", "Bayer Aspirin"
];

export async function detectProducts(imageUrl?: string): Promise<Detection[]> {
  // Suppress unused variable warning while keeping it for mock implementation
  if (imageUrl) { /* intentionally empty */ }

  // Simulate AI inference delay
  await delay(2500 + Math.random() * 1000);

  const numDetections = Math.floor(Math.random() * 5) + 3; // 3 to 7 detections
  const detections: Detection[] = [];

  for (let i = 0; i < numDetections; i++) {
    const product = productNames[Math.floor(Math.random() * productNames.length)];
    const confidence = 0.85 + Math.random() * 0.14; // 0.85 to 0.99

    // Generate random but reasonable bounding boxes (percentages to adapt to any image size)
    const width = 10 + Math.random() * 15;
    const height = 15 + Math.random() * 20;
    const x = Math.random() * (100 - width);
    const y = Math.random() * (100 - height);

    detections.push({
      id: Math.random().toString(36).substring(7),
      product,
      confidence: Number(confidence.toFixed(2)),
      count: Math.floor(Math.random() * 10) + 1,
      bbox: {
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
        width: Number(width.toFixed(1)),
        height: Number(height.toFixed(1))
      }
    });
  }

  return detections;
}
