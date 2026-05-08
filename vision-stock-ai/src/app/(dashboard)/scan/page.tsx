"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ScanLine, BrainCircuit, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BoundingBox { x: number; y: number; width: number; height: number; }
interface Detection { id: string; product: string; confidence: number; count: number; bbox: BoundingBox; }

type ScanState = "IDLE" | "UPLOADING" | "ANALYZING" | "DETECTING" | "COMPLETE";

export default function ScanPage() {
  const [image, setImage] = useState<string | null>(null);
  const [state, setState] = useState<ScanState>("IDLE");
  const [detections, setDetections] = useState<Detection[]>([]);
  const [processingText, setProcessingText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show selected image locally immediately for UX
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);

    setState("UPLOADING");
    setProcessingText("Establishing neural link...");

    try {
      // 1. Upload file
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();

      if (uploadData.success) {
        setState("ANALYZING");
        setProcessingText("Analyzing spatial coordinates...");

        // 2. Simulate phased AI delays for dramatic effect
        setTimeout(() => setProcessingText("Running VisionRack YOLOv9 inference..."), 1000);
        setTimeout(() => setState("DETECTING"), 2500);

        // 3. Get mock detections
        const scanRes = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: uploadData.imageUrl, shelfId: "shelf-1" })
        });

        const scanData = await scanRes.json();

        if (scanData.success) {
          // Reveal boxes progressively
          setProcessingText("Optimizing confidence thresholds...");
          await new Promise(r => setTimeout(r, 1000));

          setState("COMPLETE");

          // Progressive rendering of boxes
          scanData.detections.forEach((det: Detection, idx: number) => {
            setTimeout(() => {
              setDetections(prev => [...prev, det]);
            }, idx * 400); // Staggered reveal
          });
        }
      }
    } catch (error) {
      console.error(error);
      setState("IDLE");
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">

        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold font-mono text-glow">Spatial Scanner</h1>
            <p className="text-muted-foreground mt-1">Upload shelf imagery for real-time AI inference.</p>
          </div>

          {state !== "IDLE" && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card/60 border border-white/10 font-mono text-sm">
              {state === "COMPLETE" ? (
                <><CheckCircle2 className="w-4 h-4 text-green-400" /> <span className="text-green-400">Analysis Complete</span></>
              ) : (
                <><Activity className="w-4 h-4 text-primary animate-pulse" /> <span className="text-primary">{processingText}</span></>
              )}
            </div>
          )}
        </div>

        <Card className="relative overflow-hidden glass border-white/10 rounded-2xl aspect-[16/9] flex items-center justify-center bg-black/40 shadow-2xl">

          {!image && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto relative group cursor-pointer hover:bg-primary/20 transition-all glow-border" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-medium">Initialize Scan</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">Upload a high-resolution image of the target shelf region.</p>
            </div>
          )}

          {image && (
            <div className="relative w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="Shelf scan" className="w-full h-full object-cover opacity-80" />

              {/* Scanning Laser Animation */}
              {(state === "ANALYZING" || state === "DETECTING") && (
                <>
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                  <div className="absolute left-0 w-full h-1 bg-primary shadow-[0_0_15px_#0ea5e9] animate-scan-line z-20" />
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 z-10" />
                </>
              )}

              {/* Bounding Boxes */}
              <AnimatePresence>
                {detections.map((det) => (
                  <motion.div
                    key={det.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute border-2 border-primary bg-primary/10 backdrop-blur-[1px] shadow-[0_0_15px_rgba(14,165,233,0.5)] z-30"
                    style={{
                      left: `${det.bbox.x}%`,
                      top: `${det.bbox.y}%`,
                      width: `${det.bbox.width}%`,
                      height: `${det.bbox.height}%`,
                    }}
                  >
                    <div className="absolute -top-7 left-[-2px] bg-primary text-primary-foreground text-xs font-bold px-2 py-1 flex items-center gap-2 whitespace-nowrap">
                      <span>{det.product}</span>
                      <span className="font-mono bg-black/20 px-1 rounded">{(det.confidence * 100).toFixed(0)}%</span>
                    </div>
                    {/* Targeting corners */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
        </Card>

        {state === "COMPLETE" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Detected Objects</p>
                <p className="text-2xl font-bold font-mono">{detections.length}</p>
              </div>
              <ScanLine className="w-8 h-8 text-cyan-400 opacity-50" />
            </div>
            <div className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mean Confidence</p>
                <p className="text-2xl font-bold font-mono">
                  {detections.length ? ((detections.reduce((acc, d) => acc + d.confidence, 0) / detections.length) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <BrainCircuit className="w-8 h-8 text-primary opacity-50" />
            </div>
            <div className="flex items-center justify-end">
               <Button onClick={() => { setImage(null); setState("IDLE"); setDetections([]); }} className="glow-border bg-primary/20 hover:bg-primary/30 text-primary">
                 Initialize New Scan
               </Button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
