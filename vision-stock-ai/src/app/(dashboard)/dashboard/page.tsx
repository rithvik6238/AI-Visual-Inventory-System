"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, Package, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock chart data
const initialData = [
  { time: '08:00', accuracy: 98, detections: 120 },
  { time: '10:00', accuracy: 96, detections: 240 },
  { time: '12:00', accuracy: 99, detections: 350 },
  { time: '14:00', accuracy: 95, detections: 280 },
  { time: '16:00', accuracy: 97, detections: 310 },
  { time: '18:00', accuracy: 98, detections: 190 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    scannedItems: 1420,
    anomalies: 3,
    avgConfidence: 97.4,
    activeShelves: 12
  });

  const [chartData, setChartData] = useState(initialData);

  // Simulate realtime updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        scannedItems: prev.scannedItems + Math.floor(Math.random() * 5),
        avgConfidence: Number((97 + Math.random() * 2).toFixed(1)),
        anomalies: Math.random() > 0.8 ? prev.anomalies + 1 : prev.anomalies
      }));

      // Slightly shift chart
      if (Math.random() > 0.5) {
        setChartData(prev => {
          const newData = [...prev];
          newData[newData.length - 1].detections += Math.floor(Math.random() * 10 - 5);
          return newData;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-mono tracking-tight text-glow">Global Command Center</h1>
          <p className="text-muted-foreground mt-1">Real-time AI inventory intelligence.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Activity className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">Live Data Feed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass border-white/5 bg-card/40 hover:bg-card/60 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items Scanned</CardTitle>
            <Package className="w-4 h-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.scannedItems.toLocaleString()}</div>
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
              <Activity className="w-3 h-3" /> +12% from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-400">Active Anomalies</CardTitle>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-red-400">{stats.anomalies}</div>
            <p className="text-xs text-red-400/80 mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="glass border-white/5 bg-card/40 hover:bg-card/60 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Confidence</CardTitle>
            <Activity className="w-4 h-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-cyan-400">{stats.avgConfidence}%</div>
            <p className="text-xs text-muted-foreground mt-1">Model: VisionRack-v2.4</p>
          </CardContent>
        </Card>

        <Card className="glass border-white/5 bg-card/40 hover:bg-card/60 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monitored Shelves</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.activeShelves}</div>
            <p className="text-xs text-muted-foreground mt-1">Across 3 zones</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 glass bg-card/40 border-white/5">
          <CardHeader>
            <CardTitle>AI Detection Volume</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#0ea5e9' }}
                />
                <Line
                  type="monotone"
                  dataKey="detections"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#fff', stroke: '#0ea5e9', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass bg-card/40 border-white/5">
          <CardHeader>
            <CardTitle>Recent Anomalies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 animate-pulse" />
                <div>
                  <p className="text-sm font-medium">Low Stock: Aisle 2</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Lay&apos;s Classic below 20% capacity.</p>
                  <p className="text-xs text-red-400 mt-2 font-mono">Confidence: 96% • 2m ago</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
