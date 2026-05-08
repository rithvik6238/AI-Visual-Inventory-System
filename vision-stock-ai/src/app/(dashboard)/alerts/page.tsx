"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, ScanLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AlertsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-mono tracking-tight text-glow">Anomaly Detection</h1>
          <p className="text-muted-foreground mt-1">AI-flagged inventory issues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { type: 'LOW_STOCK', msg: "Lay's Classic below 20% capacity.", shelf: "Aisle 2 - Snacks", severity: "HIGH" },
          { type: 'MISPLACED_ITEM', msg: "Unrecognized item detected.", shelf: "Aisle 3 - Pharmacy", severity: "MEDIUM" },
          { type: 'OUT_OF_STOCK', msg: "Diet Coke 500ml fully depleted.", shelf: "Aisle 1 - Beverages", severity: "HIGH" },
        ].map((alert, i) => (
          <Card key={i} className={`glass ${alert.severity === 'HIGH' ? 'border-red-500/30' : 'border-yellow-500/30'}`}>
            <CardContent className="p-6 flex items-start gap-4">
              <div className={`p-3 rounded-full ${alert.severity === 'HIGH' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                {alert.severity === 'HIGH' ? <AlertTriangle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{alert.msg}</h3>
                  <Badge variant={alert.severity === 'HIGH' ? 'destructive' : 'secondary'} className="font-mono">
                    {alert.severity}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><ScanLine className="w-4 h-4" /> {alert.shelf}</span>
                  <span>•</span>
                  <span>Detected 14 mins ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
