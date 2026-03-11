import { SolarConfig, SystemType, INVERTER_OPTIONS, BATTERY_OPTIONS, PANEL_OPTIONS, ACCESSORIES } from '@/types/solar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ConfigPanelProps {
  config: SolarConfig;
  onChange: (config: SolarConfig) => void;
}

const SYSTEM_TYPES: { value: SystemType; label: string }[] = [
  { value: 'off-grid', label: 'OFF-GRID' },
  { value: 'on-grid', label: 'ON-GRID' },
  { value: 'hybrid', label: 'HIBRIDO' },
];

const ConfigPanel = ({ config, onChange }: ConfigPanelProps) => {
  const [showAccessories, setShowAccessories] = useState(false);

  const filteredInverters = INVERTER_OPTIONS.filter(i => i.type === config.systemType);
  const showBatteries = config.systemType !== 'on-grid';

  const handleSystemTypeChange = (value: SystemType) => {
    const firstInverter = INVERTER_OPTIONS.find(i => i.type === value);
    onChange({
      ...config,
      systemType: value,
      inverterId: firstInverter?.id || '',
      batteryId: value === 'on-grid' ? '' : config.batteryId,
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-card rounded-lg border border-border h-full">
      <h2 className="text-lg font-semibold tracking-wide">Configurar Sistema</h2>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted-foreground">Tipo de Sistema</label>
        <Select value={config.systemType} onValueChange={handleSystemTypeChange}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {SYSTEM_TYPES.map(t => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted-foreground">Inversor</label>
        <Select value={config.inverterId} onValueChange={v => onChange({ ...config, inverterId: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {filteredInverters.map(i => (
              <SelectItem key={i.id} value={i.id}>
                <span className="flex flex-col">
                  <span>{i.label}</span>
                  <span className="text-xs text-muted-foreground">{i.brand} — SKU: {i.sku}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showBatteries && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted-foreground">Banco de Baterias</label>
          <Select value={config.batteryId} onValueChange={v => onChange({ ...config, batteryId: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {BATTERY_OPTIONS.map(b => (
                <SelectItem key={b.id} value={b.id}>
                  <span className="flex flex-col">
                    <span>{b.label}</span>
                    <span className="text-xs text-muted-foreground">{b.brand} — SKU: {b.sku}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted-foreground">Paneles Solares</label>
        <Select value={config.panelId} onValueChange={v => onChange({ ...config, panelId: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {PANEL_OPTIONS.map(p => (
              <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        onClick={() => setShowAccessories(!showAccessories)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
      >
        {showAccessories ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        Accesorios
      </button>
      {showAccessories && (
        <ul className="flex flex-col gap-1 pl-4 text-sm text-muted-foreground">
          {ACCESSORIES.map(a => (
            <li key={a} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              {a}
            </li>
          ))}
        </ul>
      )}

      <Button className="mt-auto font-semibold tracking-wide">
        GENERAR DIAGRAMA
      </Button>
    </div>
  );
};

export default ConfigPanel;
