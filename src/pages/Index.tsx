import { useState } from 'react';
import { SolarConfig } from '@/types/solar';
import ConfigPanel from '@/components/ConfigPanel';
import SolarDiagram from '@/components/SolarDiagram';
import DiagramActions from '@/components/DiagramActions';
import BottomNav from '@/components/BottomNav';
import { Sun, ChevronRight, FileText } from 'lucide-react';

const DEFAULT_CONFIG: SolarConfig = {
  systemType: 'off-grid',
  inverterId: 'ivp-1k-12',
  batteryId: 'rt12100g31',
  panelId: 'ps-100m',
};

const Index = () => {
  const [config, setConfig] = useState<SolarConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState('inicio');

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
        <main className="flex-1 flex flex-col overflow-auto relative">
          <div className="flex-1 p-4">
            <SolarDiagram config={config} />
          </div>
          {/* Action buttons */}
          <div className="absolute top-6 right-6">
            <DiagramActions />
          </div>
          {/* Ver Documentacion */}
          <div className="flex justify-center pb-2">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wide text-muted-foreground hover:text-foreground border border-border rounded transition-colors">
              <FileText className="w-4 h-4" />
              VER DOCUMENTACION
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>

      {/* Bottom navigation */}
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;
