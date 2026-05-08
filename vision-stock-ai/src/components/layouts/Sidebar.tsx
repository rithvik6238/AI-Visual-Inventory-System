import Link from 'next/link';
import { LayoutDashboard, Scan, Bell, Box, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/scan', icon: Scan, label: 'AI Scan' },
    { href: '/alerts', icon: Bell, label: 'Anomalies' },
    { href: '#', icon: Box, label: 'Inventory' },
    { href: '#', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 h-screen border-r border-border/10 bg-card/40 backdrop-blur-xl flex flex-col p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Scan className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg tracking-wider font-mono">VISION<span className="text-primary">RACK</span></span>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                active
                  ? 'bg-primary/20 text-primary border border-primary/30 glow-border'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 rounded-xl bg-gradient-to-tr from-primary/10 to-transparent border border-primary/20">
        <p className="text-xs text-muted-foreground mb-1">System Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium text-green-400">AI Engine Online</span>
        </div>
      </div>
    </div>
  );
}
