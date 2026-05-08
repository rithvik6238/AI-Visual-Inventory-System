import Link from 'next/link';
import { Scan, ArrowRight, BrainCircuit, Box, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="z-10 text-center max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center animate-pulse-glow">
            <Scan className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-3xl tracking-widest font-mono text-glow">VISION<span className="text-primary">RACK</span></span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Enterprise AI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">
            Inventory Intelligence
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Transform your physical shelves into real-time digital assets. VisionRack uses advanced spatial computing and AI detection to eliminate manual counting forever.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/scan">
            <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full glow-border">
              Initialize AI Scanner <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg glass border-white/10 hover:bg-white/5 rounded-full">
              View Command Center
            </Button>
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="glass p-6 rounded-2xl border border-white/5">
            <BrainCircuit className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Neural Detection</h3>
            <p className="text-muted-foreground text-sm">Millisecond inference engine identifies hundreds of SKUs simultaneously with 99.4% accuracy.</p>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5">
            <Activity className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Realtime Sync</h3>
            <p className="text-muted-foreground text-sm">Live data streams directly to your command center, ensuring zero inventory latency.</p>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5">
            <Box className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Spatial Analytics</h3>
            <p className="text-muted-foreground text-sm">Generate visual heatmaps and pinpoint exact spatial coordinates of out-of-stock items.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
