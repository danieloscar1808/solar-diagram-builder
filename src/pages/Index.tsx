import { useState } from 'react';
import { SolarConfig } from '@/types/solar';
import ConfigPanel from '@/components/ConfigPanel';
import SolarDiagram from '@/components/SolarDiagram';
import DiagramActions from '@/components/DiagramActions';
import { Sun } from 'lucide-react';

const DEFAULT_CONFIG: SolarConfig = {
  systemType: 'off-grid',
  inverterId: 'inv-2',
  batteryId: 'bat-3',
  panelId: 'pan-4',
};

const Index = () => {
  const [config, setConfig] = useState<SolarConfig>(DEFAULT_CONFIG);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <Sun className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight">SOLAR DIAGRAM</span>
            <span className="text-muted-foreground text-sm font-mono">GENERATOR</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <aside className="w-72 shrink-0 border-r border-border overflow-y-auto">
          <ConfigPanel config={config} onChange={setConfig} />
        </aside>

        {/* Diagram area */}
        <main className="flex-1 p-4 overflow-auto relative">
          <SolarDiagram config={config} />
          {/* Action buttons */}
          <div className="absolute top-6 right-6">
            <DiagramActions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
