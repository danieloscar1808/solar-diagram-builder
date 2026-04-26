import { useState, useEffect } from 'react';
import { SolarConfig } from '@/types/solar';
import ConfigPanel from '@/components/ConfigPanel';
import SolarDiagram from '@/components/SolarDiagram';
import DiagramActions from '@/components/DiagramActions';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sun, ChevronRight, FileText, Save, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'solar-diagram-config';

const DEFAULT_CONFIG: SolarConfig = {
  systemType: 'off-grid',
  inverterId: 'ivp-1k-12',
  batteryId: 'rt12100g31',
  panelId: 'ps-100m',
  cableDcPanelId: 'dc-4mm',
  cableDcBatteryId: 'dc-4mm',
  cableAcId: 'ac-2.5mm',
  cableTierraId: 'tierra-4mm',
  chargerId: '',
  cableDcPanelChargerId: '',
  cableDcChargerBatteryId: '',
  breakerDcPanelId: 'bk-dc-10',
  breakerDcBatteryId: 'bk-dc-10',
  breakerAcId: 'bk-ac-10',
  breakerDcPanelChargerId: 'bk-dc-10',
  breakerDcChargerBatteryId: 'bk-dc-10',
};

const loadSavedConfig = (): SolarConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
};

const Index = () => {
  const [config, setConfig] = useState<SolarConfig>(() => loadSavedConfig());
  const [activeTab, setActiveTab] = useState('inicio');
  const [hasSaved, setHasSaved] = useState<boolean>(() => !!localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    if (hasSaved) {
      toast.success('Configuración restaurada', { description: 'Se cargó tu última configuración guardada.' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      setHasSaved(true);
      toast.success('Configuración guardada', { description: 'Se restaurará automáticamente al volver a abrir la app.' });
    } catch {
      toast.error('No se pudo guardar la configuración');
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(DEFAULT_CONFIG);
    setHasSaved(false);
    toast.message('Configuración restablecida', { description: 'Se eliminó la configuración guardada.' });
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
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
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSave}
            size="sm"
            className="gap-2 font-mono text-xs tracking-wide bg-green-600 hover:bg-green-700 text-white border-0"
          >
            <Save className="w-4 h-4" />
            GUARDAR PROYECTO
          </Button>
          {hasSaved && (
            <Button
              onClick={handleReset}
              size="sm"
              variant="outline"
              className="gap-2 font-mono text-xs tracking-wide"
              title="Borrar configuración guardada"
            >
              <RotateCcw className="w-4 h-4" />
              RESTABLECER
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 shrink-0 border-r border-border overflow-y-auto">
          <ConfigPanel config={config} onChange={setConfig} />
        </aside>

        <main className="flex-1 flex flex-col overflow-auto relative">
          <div className="flex-1 p-4">
            <SolarDiagram config={config} />
          </div>
          <div className="absolute top-6 right-6">
            <DiagramActions />
          </div>
          <div className="flex justify-center pb-2">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wide text-muted-foreground hover:text-foreground border border-border rounded transition-colors">
              <FileText className="w-4 h-4" />
              VER DOCUMENTACION
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>

      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;
