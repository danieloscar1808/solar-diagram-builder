import { SolarConfig, SystemType, INVERTER_OPTIONS, ACCESSORIES } from '@/types/solar';
import { getCompatibleBatteries, getCompatiblePanels, getCompatibleCables } from '@/lib/compatibility';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, AlertTriangle, Cable } from 'lucide-react';
import { useState, useMemo } from 'react';

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
  const [showCables, setShowCables] = useState(true);

  const filteredInverters = INVERTER_OPTIONS.filter(i => i.type === config.systemType);
  const selectedInverter = INVERTER_OPTIONS.find(i => i.id === config.inverterId);
  const showBatteries = config.systemType !== 'on-grid';

  const compatibleBatteries = useMemo(
    () => getCompatibleBatteries(selectedInverter),
    [selectedInverter]
  );

  const compatiblePanels = useMemo(
    () => getCompatiblePanels(selectedInverter),
    [selectedInverter]
  );

  const compatibleDcCables = useMemo(
    () => getCompatibleCables(selectedInverter, 'dc'),
    [selectedInverter]
  );

  const compatibleAcCables = useMemo(
    () => getCompatibleCables(selectedInverter, 'ac'),
    [selectedInverter]
  );

  const compatibleTierraCables = useMemo(
    () => getCompatibleCables(selectedInverter, 'tierra'),
    [selectedInverter]
  );

  const handleSystemTypeChange = (value: SystemType) => {
    const firstInverter = INVERTER_OPTIONS.find(i => i.type === value);
    const inv = firstInverter;
    const dcCables = getCompatibleCables(inv, 'dc');
    const acCables = getCompatibleCables(inv, 'ac');
    const tierraCables = getCompatibleCables(inv, 'tierra');
    onChange({
      ...config,
      systemType: value,
      inverterId: firstInverter?.id || '',
      batteryId: value === 'on-grid' ? '' : '',
      panelId: '',
      cableDcPanelId: dcCables[0]?.id || '',
      cableDcBatteryId: dcCables[0]?.id || '',
      cableAcId: acCables[0]?.id || '',
      cableTierraId: tierraCables[0]?.id || '',
    });
  };

  const handleInverterChange = (inverterId: string) => {
    const inv = INVERTER_OPTIONS.find(i => i.id === inverterId);
    const newBatteries = getCompatibleBatteries(inv);
    const newPanels = getCompatiblePanels(inv);
    const newDcCables = getCompatibleCables(inv, 'dc');
    const newAcCables = getCompatibleCables(inv, 'ac');
    const newTierraCables = getCompatibleCables(inv, 'tierra');

    const batteryStillValid = newBatteries.some(b => b.id === config.batteryId);
    const panelStillValid = newPanels.some(p => p.id === config.panelId);
    const dcPanelStillValid = newDcCables.some(c => c.id === config.cableDcPanelId);
    const dcBatStillValid = newDcCables.some(c => c.id === config.cableDcBatteryId);
    const acStillValid = newAcCables.some(c => c.id === config.cableAcId);
    const tierraStillValid = newTierraCables.some(c => c.id === config.cableTierraId);

    onChange({
      ...config,
      inverterId,
      batteryId: batteryStillValid ? config.batteryId : (newBatteries[0]?.id || ''),
      panelId: panelStillValid ? config.panelId : (newPanels[0]?.id || ''),
      cableDcPanelId: dcPanelStillValid ? config.cableDcPanelId : (newDcCables[0]?.id || ''),
      cableDcBatteryId: dcBatStillValid ? config.cableDcBatteryId : (newDcCables[0]?.id || ''),
      cableAcId: acStillValid ? config.cableAcId : (newAcCables[0]?.id || ''),
      cableTierraId: tierraStillValid ? config.cableTierraId : (newTierraCables[0]?.id || ''),
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-card rounded-lg border border-border h-full overflow-y-auto">
      <h2 className="text-lg font-semibold tracking-wide">Configurar Sistema</h2>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted-foreground">Tipo de Sistema</label>
        <Select value={config.systemType} onValueChange={handleSystemTypeChange}>
          <SelectTrigger className="w-full h-12 text-sm">
          <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SYSTEM_TYPES.map(t => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted-foreground">Inversor</label>
        <Select value={config.inverterId} onValueChange={handleInverterChange}>
          <SelectTrigger className="w-full h-12 text-sm">
          <SelectValue />
          </SelectTrigger>
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
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            Banco de Baterías
            {selectedInverter && (
              <span className="text-xs text-accent-foreground bg-accent px-2 py-0.5 rounded">
                Compatible: {selectedInverter.voltage}V
              </span>
            )}
          </label>
          {compatibleBatteries.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-destructive p-2 bg-destructive/10 rounded">
              <AlertTriangle className="w-4 h-4" />
              No hay baterías compatibles con este inversor
            </div>
          ) : (
            <Select value={config.batteryId} onValueChange={v => onChange({ ...config, batteryId: v })}>
              <SelectTrigger className="w-full h-12 text-sm">
              <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {compatibleBatteries.map(b => (
                  <SelectItem key={b.id} value={b.id}>
                    <span className="flex flex-col">
                      <span>{b.label}</span>
                      <span className="text-xs text-muted-foreground">{b.brand} — {b.voltage}V {b.capacityWh}Wh — SKU: {b.sku}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          Paneles Solares
          {selectedInverter && (
            <span className="text-xs text-accent-foreground bg-accent px-2 py-0.5 rounded">
              {selectedInverter.power}W inversor
            </span>
          )}
        </label>
        {compatiblePanels.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-destructive p-2 bg-destructive/10 rounded">
            <AlertTriangle className="w-4 h-4" />
            No hay paneles compatibles con este inversor
          </div>
        ) : (
          <Select value={config.panelId} onValueChange={v => onChange({ ...config, panelId: v })}>
            <SelectTrigger className="w-full h-12 text-sm">
            <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {compatiblePanels.map(p => (
                <SelectItem key={p.id} value={p.id}>
                  <span className="flex flex-col">
                    <span>{p.label}</span>
                    <span className="text-xs text-muted-foreground">{p.brand} — {p.watts}W {p.technology} — SKU: {p.sku}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Cableado */}
      <button
        onClick={() => setShowCables(!showCables)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
      >
        {showCables ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <Cable className="w-4 h-4" />
        Cableado
      </button>
      {showCables && (
        <div className="flex flex-col gap-4 pl-2 border-l-2 border-border">
          {/* Cable DC Panel-Inversor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted-foreground">Cable DC: Paneles → Inversor</label>
            <Select value={config.cableDcPanelId} onValueChange={v => onChange({ ...config, cableDcPanelId: v })}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {compatibleDcCables.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="flex flex-col">
                      <span>{c.label}</span>
                      <span className="text-xs text-muted-foreground">{c.description}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cable DC Inversor-Batería */}
          {showBatteries && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground">Cable DC: Inversor → Baterías</label>
              <Select value={config.cableDcBatteryId} onValueChange={v => onChange({ ...config, cableDcBatteryId: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {compatibleDcCables.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      <span className="flex flex-col">
                        <span>{c.label}</span>
                        <span className="text-xs text-muted-foreground">{c.description}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Cable AC */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted-foreground">Cable AC: Inversor → Tablero</label>
            <Select value={config.cableAcId} onValueChange={v => onChange({ ...config, cableAcId: v })}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {compatibleAcCables.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="flex flex-col">
                      <span>{c.label}</span>
                      <span className="text-xs text-muted-foreground">{c.description}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cable Tierra */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted-foreground">Cable Tierra</label>
            <Select value={config.cableTierraId} onValueChange={v => onChange({ ...config, cableTierraId: v })}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {compatibleTierraCables.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="flex flex-col">
                      <span>{c.label}</span>
                      <span className="text-xs text-muted-foreground">{c.description}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

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
