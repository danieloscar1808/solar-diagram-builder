import { SolarConfig, SystemType, INVERTER_OPTIONS, ACCESSORIES, BATTERY_OPTIONS, PANEL_OPTIONS, CABLE_OPTIONS, CHARGER_OPTIONS, BREAKER_OPTIONS } from '@/types/solar';
import { getCompatibleBatteries, getCompatiblePanels, getCompatibleCables, getCompatibleChargers, getCompatibleBreakers, needsExternalCharger, getRecommendedBreaker, getRecommendedCable } from '@/lib/compatibility';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, AlertTriangle, Cable, Shield, Zap } from 'lucide-react';
import { useState, useMemo } from 'react';
import PriceTag from '@/components/PriceTag';
import { formatArs } from '@/types/solar';

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
  const [showProtections, setShowProtections] = useState(true);

  const filteredInverters = INVERTER_OPTIONS.filter(i => i.type === config.systemType);
  const selectedInverter = INVERTER_OPTIONS.find(i => i.id === config.inverterId);
  const selectedBattery = BATTERY_OPTIONS.find(b => b.id === config.batteryId);
  const selectedPanel = PANEL_OPTIONS.find(p => p.id === config.panelId);
  const selectedCharger = CHARGER_OPTIONS.find(c => c.id === config.chargerId);
  const selectedCableDcPanel = CABLE_OPTIONS.find(c => c.id === config.cableDcPanelId);
  const selectedCableDcBattery = CABLE_OPTIONS.find(c => c.id === config.cableDcBatteryId);
  const selectedCableDcPanelCharger = CABLE_OPTIONS.find(c => c.id === config.cableDcPanelChargerId);
  const selectedCableDcChargerBattery = CABLE_OPTIONS.find(c => c.id === config.cableDcChargerBatteryId);
  const selectedCableAc = CABLE_OPTIONS.find(c => c.id === config.cableAcId);
  const selectedCableTierra = CABLE_OPTIONS.find(c => c.id === config.cableTierraId);
  const selectedBreakerDcPanel = BREAKER_OPTIONS.find(b => b.id === config.breakerDcPanelId);
  const selectedBreakerDcBattery = BREAKER_OPTIONS.find(b => b.id === config.breakerDcBatteryId);
  const selectedBreakerAc = BREAKER_OPTIONS.find(b => b.id === config.breakerAcId);
  const selectedBreakerDcPanelCharger = BREAKER_OPTIONS.find(b => b.id === config.breakerDcPanelChargerId);
  const selectedBreakerDcChargerBattery = BREAKER_OPTIONS.find(b => b.id === config.breakerDcChargerBatteryId);
  const showBatteries = config.systemType !== 'on-grid';
  const showCharger = needsExternalCharger(selectedInverter);
  const qtyOf = (k: string) => config.quantities?.[k] ?? 1;
  const setQty = (k: string, n: number) =>
    onChange({ ...config, quantities: { ...(config.quantities ?? {}), [k]: Math.max(0, Math.floor(n) || 0) } });

  const compatibleBatteries = useMemo(() => getCompatibleBatteries(selectedInverter), [selectedInverter]);
  const compatiblePanels = useMemo(() => getCompatiblePanels(selectedInverter), [selectedInverter]);
  const compatibleDcCables = useMemo(() => getCompatibleCables(selectedInverter, 'dc'), [selectedInverter]);
  const compatibleAcCables = useMemo(() => getCompatibleCables(selectedInverter, 'ac'), [selectedInverter]);
  const compatibleTierraCables = useMemo(() => getCompatibleCables(selectedInverter, 'tierra'), [selectedInverter]);
  const compatibleChargers = useMemo(() => getCompatibleChargers(selectedInverter), [selectedInverter]);
  const compatibleDcBreakers = useMemo(() => getCompatibleBreakers(selectedInverter, 'dc'), [selectedInverter]);
  const compatibleAcBreakers = useMemo(() => getCompatibleBreakers(selectedInverter, 'ac'), [selectedInverter]);

  const recommendedDcBreaker = useMemo(() => getRecommendedBreaker(selectedInverter, 'dc'), [selectedInverter]);
  const recommendedAcBreaker = useMemo(() => getRecommendedBreaker(selectedInverter, 'ac'), [selectedInverter]);
  const recommendedDcCable = useMemo(() => getRecommendedCable(selectedInverter, 'dc'), [selectedInverter]);
  const recommendedAcCable = useMemo(() => getRecommendedCable(selectedInverter, 'ac'), [selectedInverter]);
  const recommendedTierraCable = useMemo(() => getRecommendedCable(selectedInverter, 'tierra'), [selectedInverter]);

  const handleSystemTypeChange = (value: SystemType) => {
    const firstInverter = INVERTER_OPTIONS.find(i => i.type === value);
    const inv = firstInverter;
    const dcCables = getCompatibleCables(inv, 'dc');
    const acCables = getCompatibleCables(inv, 'ac');
    const tierraCables = getCompatibleCables(inv, 'tierra');
    const chargers = getCompatibleChargers(inv);
    const dcBreakers = getCompatibleBreakers(inv, 'dc');
    const acBreakers = getCompatibleBreakers(inv, 'ac');
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
      chargerId: chargers[0]?.id || '',
      cableDcPanelChargerId: dcCables[0]?.id || '',
      cableDcChargerBatteryId: dcCables[0]?.id || '',
      breakerDcPanelId: dcBreakers[0]?.id || '',
      breakerDcBatteryId: dcBreakers[0]?.id || '',
      breakerAcId: acBreakers[0]?.id || '',
      breakerDcPanelChargerId: dcBreakers[0]?.id || '',
      breakerDcChargerBatteryId: dcBreakers[0]?.id || '',
    });
  };

  const handleInverterChange = (inverterId: string) => {
    const inv = INVERTER_OPTIONS.find(i => i.id === inverterId);
    const newBatteries = getCompatibleBatteries(inv);
    const newPanels = getCompatiblePanels(inv);
    const newDcCables = getCompatibleCables(inv, 'dc');
    const newAcCables = getCompatibleCables(inv, 'ac');
    const newTierraCables = getCompatibleCables(inv, 'tierra');
    const newChargers = getCompatibleChargers(inv);
    const newDcBreakers = getCompatibleBreakers(inv, 'dc');
    const newAcBreakers = getCompatibleBreakers(inv, 'ac');

    const batteryStillValid = newBatteries.some(b => b.id === config.batteryId);
    const panelStillValid = newPanels.some(p => p.id === config.panelId);
    const dcPanelStillValid = newDcCables.some(c => c.id === config.cableDcPanelId);
    const dcBatStillValid = newDcCables.some(c => c.id === config.cableDcBatteryId);
    const acStillValid = newAcCables.some(c => c.id === config.cableAcId);
    const tierraStillValid = newTierraCables.some(c => c.id === config.cableTierraId);
    const chargerStillValid = newChargers.some(c => c.id === config.chargerId);
    const bkDcPanelValid = newDcBreakers.some(b => b.id === config.breakerDcPanelId);
    const bkDcBatValid = newDcBreakers.some(b => b.id === config.breakerDcBatteryId);
    const bkAcValid = newAcBreakers.some(b => b.id === config.breakerAcId);
    const bkDcPanelChargerValid = newDcBreakers.some(b => b.id === config.breakerDcPanelChargerId);
    const bkDcChargerBatValid = newDcBreakers.some(b => b.id === config.breakerDcChargerBatteryId);

    onChange({
      ...config,
      inverterId,
      batteryId: batteryStillValid ? config.batteryId : (newBatteries[0]?.id || ''),
      panelId: panelStillValid ? config.panelId : (newPanels[0]?.id || ''),
      cableDcPanelId: dcPanelStillValid ? config.cableDcPanelId : (newDcCables[0]?.id || ''),
      cableDcBatteryId: dcBatStillValid ? config.cableDcBatteryId : (newDcCables[0]?.id || ''),
      cableAcId: acStillValid ? config.cableAcId : (newAcCables[0]?.id || ''),
      cableTierraId: tierraStillValid ? config.cableTierraId : (newTierraCables[0]?.id || ''),
      chargerId: chargerStillValid ? config.chargerId : (newChargers[0]?.id || ''),
      cableDcPanelChargerId: dcPanelStillValid ? config.cableDcPanelChargerId : (newDcCables[0]?.id || ''),
      cableDcChargerBatteryId: dcBatStillValid ? config.cableDcChargerBatteryId : (newDcCables[0]?.id || ''),
      breakerDcPanelId: bkDcPanelValid ? config.breakerDcPanelId : (newDcBreakers[0]?.id || ''),
      breakerDcBatteryId: bkDcBatValid ? config.breakerDcBatteryId : (newDcBreakers[0]?.id || ''),
      breakerAcId: bkAcValid ? config.breakerAcId : (newAcBreakers[0]?.id || ''),
      breakerDcPanelChargerId: bkDcPanelChargerValid ? config.breakerDcPanelChargerId : (newDcBreakers[0]?.id || ''),
      breakerDcChargerBatteryId: bkDcChargerBatValid ? config.breakerDcChargerBatteryId : (newDcBreakers[0]?.id || ''),
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-card rounded-lg border border-border h-full overflow-y-auto">
      <h2 className="text-lg font-semibold tracking-wide">Configurar Sistema</h2>

      {/* Tipo de Sistema */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted-foreground">Tipo de Sistema</label>
        <Select value={config.systemType} onValueChange={handleSystemTypeChange}>
          <SelectTrigger className="w-full h-12 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SYSTEM_TYPES.map(t => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Inversor */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted-foreground">Inversor</label>
        <Select value={config.inverterId} onValueChange={handleInverterChange}>
          <SelectTrigger className="w-full h-12 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            {filteredInverters.map(i => (
              <SelectItem key={i.id} value={i.id}>
                <span className="flex flex-col">
                  <span>{i.label}{i.hasCharger ? ' (Inv/Cargador)' : ''}</span>
                  <span className="text-xs text-muted-foreground">{i.brand} — SKU: {i.sku}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedInverter && <PriceTag price={selectedInverter.priceArs} url={selectedInverter.productUrl} qty={qtyOf('selectedInverter')} onQtyChange={n => setQty('selectedInverter', n)} unit={'selectedInverter'.startsWith('selectedCable') ? 'm' : 'u'} />}
      </div>

      {/* Cargador de Baterías (solo si el inversor no tiene cargador integrado) */}
      {showCharger && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Cargador de Baterías
            <span className="text-xs text-accent-foreground bg-accent px-2 py-0.5 rounded">
              Regulador externo
            </span>
          </label>
          {compatibleChargers.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-destructive p-2 bg-destructive/10 rounded">
              <AlertTriangle className="w-4 h-4" />
              No hay cargadores compatibles
            </div>
          ) : (
            <Select value={config.chargerId} onValueChange={v => onChange({ ...config, chargerId: v })}>
              <SelectTrigger className="w-full h-12 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {compatibleChargers.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="flex flex-col">
                      <span>{c.label}</span>
                      <span className="text-xs text-muted-foreground">{c.brand} — {c.technology} {c.maxAmps}A — SKU: {c.sku}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {selectedCharger && <PriceTag price={selectedCharger.priceArs} url={selectedCharger.productUrl} qty={qtyOf('selectedCharger')} onQtyChange={n => setQty('selectedCharger', n)} unit={'selectedCharger'.startsWith('selectedCable') ? 'm' : 'u'} />}
        </div>
      )}

      {/* Banco de Baterías */}
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
              <SelectTrigger className="w-full h-12 text-sm"><SelectValue /></SelectTrigger>
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
          {selectedBattery && <PriceTag price={selectedBattery.priceArs} url={selectedBattery.productUrl} qty={qtyOf('selectedBattery')} onQtyChange={n => setQty('selectedBattery', n)} unit={'selectedBattery'.startsWith('selectedCable') ? 'm' : 'u'} />}
        </div>
      )}

      {/* Paneles Solares */}
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
            <SelectTrigger className="w-full h-12 text-sm"><SelectValue /></SelectTrigger>
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
        {selectedPanel && <PriceTag price={selectedPanel.priceArs} url={selectedPanel.productUrl} qty={qtyOf('selectedPanel')} onQtyChange={n => setQty('selectedPanel', n)} unit={'selectedPanel'.startsWith('selectedCable') ? 'm' : 'u'} />}
      </div>

      {/* Protecciones */}
      <button
        onClick={() => setShowProtections(!showProtections)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
      >
        {showProtections ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <Shield className="w-4 h-4" />
        Protecciones
      </button>
      {showProtections && (
        <div className="flex flex-col gap-4 pl-2 border-l-2 border-border">
          {/* Breaker DC Paneles */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted-foreground">
              {config.systemType === 'on-grid' ? 'Breaker DC' : 'Breaker DC Paneles'}
            </label>
            {compatibleDcBreakers.length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-destructive font-semibold p-2 bg-destructive/10 rounded border border-destructive/30">
                <AlertTriangle className="w-3 h-3" />
                {recommendedDcBreaker ? `${recommendedDcBreaker.label} — No disponible en Enertik` : 'Sin breakers compatibles'}
              </div>
            ) : (
              <Select value={config.breakerDcPanelId} onValueChange={v => onChange({ ...config, breakerDcPanelId: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {compatibleDcBreakers.map(b => (
                    <SelectItem key={b.id} value={b.id}>
                      <span className="flex flex-col">
                        <span>{b.label}</span>
                        <span className="text-xs text-muted-foreground">{b.description} — SKU: {b.sku}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
              {selectedBreakerDcPanel && <PriceTag price={selectedBreakerDcPanel.priceArs} url={selectedBreakerDcPanel.productUrl} qty={qtyOf('selectedBreakerDcPanel')} onQtyChange={n => setQty('selectedBreakerDcPanel', n)} unit={'selectedBreakerDcPanel'.startsWith('selectedCable') ? 'm' : 'u'} />}
          </div>

          {/* Breaker DC Baterías (off-grid y hybrid, sin cargador externo) */}
          {showBatteries && !showCharger && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground">Breaker DC Baterías</label>
            {compatibleDcBreakers.length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-destructive font-semibold p-2 bg-destructive/10 rounded border border-destructive/30">
                <AlertTriangle className="w-3 h-3" />
                {recommendedDcBreaker ? `${recommendedDcBreaker.label} — No disponible en Enertik` : 'Sin breakers compatibles'}
              </div>
              ) : (
                <Select value={config.breakerDcBatteryId} onValueChange={v => onChange({ ...config, breakerDcBatteryId: v })}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {compatibleDcBreakers.map(b => (
                      <SelectItem key={b.id} value={b.id}>
                        <span className="flex flex-col">
                          <span>{b.label}</span>
                          <span className="text-xs text-muted-foreground">{b.description} — SKU: {b.sku}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
                {selectedBreakerDcBattery && <PriceTag price={selectedBreakerDcBattery.priceArs} url={selectedBreakerDcBattery.productUrl} qty={qtyOf('selectedBreakerDcBattery')} onQtyChange={n => setQty('selectedBreakerDcBattery', n)} unit={'selectedBreakerDcBattery'.startsWith('selectedCable') ? 'm' : 'u'} />}
            </div>
          )}

          {/* Breakers para cargador externo */}
          {showCharger && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">Breaker DC: Paneles → Cargador</label>
                {compatibleDcBreakers.length === 0 ? (
                  <div className="flex items-center gap-2 text-xs text-destructive font-semibold p-2 bg-destructive/10 rounded border border-destructive/30">
                    <AlertTriangle className="w-3 h-3" />
                    {recommendedDcBreaker ? `${recommendedDcBreaker.label} — No disponible en Enertik` : 'Sin breakers compatibles'}
                  </div>
                ) : (
                  <Select value={config.breakerDcPanelChargerId} onValueChange={v => onChange({ ...config, breakerDcPanelChargerId: v })}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {compatibleDcBreakers.map(b => (
                        <SelectItem key={b.id} value={b.id}>
                          <span className="flex flex-col">
                            <span>{b.label}</span>
                            <span className="text-xs text-muted-foreground">{b.description} — SKU: {b.sku}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                  {selectedBreakerDcPanelCharger && <PriceTag price={selectedBreakerDcPanelCharger.priceArs} url={selectedBreakerDcPanelCharger.productUrl} qty={qtyOf('selectedBreakerDcPanelCharger')} onQtyChange={n => setQty('selectedBreakerDcPanelCharger', n)} unit={'selectedBreakerDcPanelCharger'.startsWith('selectedCable') ? 'm' : 'u'} />}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">Breaker DC: Cargador/Regulador → Baterías</label>
                {compatibleDcBreakers.length === 0 ? (
                  <div className="flex items-center gap-2 text-xs text-destructive font-semibold p-2 bg-destructive/10 rounded border border-destructive/30">
                    <AlertTriangle className="w-3 h-3" />
                    {recommendedDcBreaker ? `${recommendedDcBreaker.label} — No disponible en Enertik` : 'Sin breakers compatibles'}
                  </div>
                ) : (
                  <Select value={config.breakerDcChargerBatteryId} onValueChange={v => onChange({ ...config, breakerDcChargerBatteryId: v })}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {compatibleDcBreakers.map(b => (
                        <SelectItem key={b.id} value={b.id}>
                          <span className="flex flex-col">
                            <span>{b.label}</span>
                            <span className="text-xs text-muted-foreground">{b.description} — SKU: {b.sku}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                  {selectedBreakerDcChargerBattery && <PriceTag price={selectedBreakerDcChargerBattery.priceArs} url={selectedBreakerDcChargerBattery.productUrl} qty={qtyOf('selectedBreakerDcChargerBattery')} onQtyChange={n => setQty('selectedBreakerDcChargerBattery', n)} unit={'selectedBreakerDcChargerBattery'.startsWith('selectedCable') ? 'm' : 'u'} />}
              </div>
            </>
          )}

          {/* Breaker AC */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted-foreground">
              {config.systemType === 'hybrid' ? 'Breaker AC Salida' : 'Breaker AC'}
            </label>
            {compatibleAcBreakers.length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-destructive font-semibold p-2 bg-destructive/10 rounded border border-destructive/30">
                <AlertTriangle className="w-3 h-3" />
                {recommendedAcBreaker ? `${recommendedAcBreaker.label} — No disponible en Enertik` : 'Sin breakers compatibles'}
              </div>
            ) : (
              <Select value={config.breakerAcId} onValueChange={v => onChange({ ...config, breakerAcId: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {compatibleAcBreakers.map(b => (
                    <SelectItem key={b.id} value={b.id}>
                      <span className="flex flex-col">
                        <span>{b.label}</span>
                        <span className="text-xs text-muted-foreground">{b.description} — SKU: {b.sku}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
              {selectedBreakerAc && <PriceTag price={selectedBreakerAc.priceArs} url={selectedBreakerAc.productUrl} qty={qtyOf('selectedBreakerAc')} onQtyChange={n => setQty('selectedBreakerAc', n)} unit={'selectedBreakerAc'.startsWith('selectedCable') ? 'm' : 'u'} />}
          </div>
        </div>
      )}

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
          {/* Cables para cargador externo */}
          {showCharger ? (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">Cable DC: Paneles → Cargador/Regulador</label>
                <Select value={config.cableDcPanelChargerId} onValueChange={v => onChange({ ...config, cableDcPanelChargerId: v })}>
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
                {selectedCableDcPanelCharger && <PriceTag price={selectedCableDcPanelCharger.priceArs} url={selectedCableDcPanelCharger.productUrl} qty={qtyOf('selectedCableDcPanelCharger')} onQtyChange={n => setQty('selectedCableDcPanelCharger', n)} unit={'selectedCableDcPanelCharger'.startsWith('selectedCable') ? 'm' : 'u'} />}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">Cable DC: Cargador/Regulador → Baterías</label>
                <Select value={config.cableDcChargerBatteryId} onValueChange={v => onChange({ ...config, cableDcChargerBatteryId: v })}>
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
                {selectedCableDcChargerBattery && <PriceTag price={selectedCableDcChargerBattery.priceArs} url={selectedCableDcChargerBattery.productUrl} qty={qtyOf('selectedCableDcChargerBattery')} onQtyChange={n => setQty('selectedCableDcChargerBattery', n)} unit={'selectedCableDcChargerBattery'.startsWith('selectedCable') ? 'm' : 'u'} />}
              </div>
            </>
          ) : (
            <>
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
                {selectedCableDcPanel && <PriceTag price={selectedCableDcPanel.priceArs} url={selectedCableDcPanel.productUrl} qty={qtyOf('selectedCableDcPanel')} onQtyChange={n => setQty('selectedCableDcPanel', n)} unit={'selectedCableDcPanel'.startsWith('selectedCable') ? 'm' : 'u'} />}
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
                  {selectedCableDcBattery && <PriceTag price={selectedCableDcBattery.priceArs} url={selectedCableDcBattery.productUrl} qty={qtyOf('selectedCableDcBattery')} onQtyChange={n => setQty('selectedCableDcBattery', n)} unit={'selectedCableDcBattery'.startsWith('selectedCable') ? 'm' : 'u'} />}
                </div>
              )}
            </>
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
            {selectedCableAc && <PriceTag price={selectedCableAc.priceArs} url={selectedCableAc.productUrl} qty={qtyOf('selectedCableAc')} onQtyChange={n => setQty('selectedCableAc', n)} unit={'selectedCableAc'.startsWith('selectedCable') ? 'm' : 'u'} />}
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
            {selectedCableTierra && <PriceTag price={selectedCableTierra.priceArs} url={selectedCableTierra.productUrl} qty={qtyOf('selectedCableTierra')} onQtyChange={n => setQty('selectedCableTierra', n)} unit={'selectedCableTierra'.startsWith('selectedCable') ? 'm' : 'u'} />}
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

      {(() => {
        const entries: [string, { priceArs?: number } | undefined][] = [
          ['selectedInverter', selectedInverter], ['selectedPanel', selectedPanel],
          ['selectedBattery', showBatteries ? selectedBattery : undefined],
          ['selectedCharger', showCharger ? selectedCharger : undefined],
          ['selectedBreakerAc', selectedBreakerAc],
          showCharger ? ['selectedBreakerDcPanelCharger', selectedBreakerDcPanelCharger] : ['selectedBreakerDcPanel', selectedBreakerDcPanel],
          showCharger ? ['selectedBreakerDcChargerBattery', selectedBreakerDcChargerBattery] : ['selectedBreakerDcBattery', showBatteries ? selectedBreakerDcBattery : undefined],
          showCharger ? ['selectedCableDcPanelCharger', selectedCableDcPanelCharger] : ['selectedCableDcPanel', selectedCableDcPanel],
          showCharger ? ['selectedCableDcChargerBattery', selectedCableDcChargerBattery] : ['selectedCableDcBattery', showBatteries ? selectedCableDcBattery : undefined],
          ['selectedCableAc', selectedCableAc], ['selectedCableTierra', selectedCableTierra],
        ];
        const items = entries.filter(([, o]) => o && qtyOf(entries.find(e => e[1] === o)![0]) > 0).map(([k, o]) => ({ ...o!, qty: qtyOf(k) }));
        const total = items.reduce((s, i) => s + (i.priceArs ?? 0) * i.qty, 0);
        const pending = items.filter(i => i.priceArs === undefined).length;
        return (
          <div className="mt-2 p-3 rounded border border-success/40 bg-success/10 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-foreground">TOTAL ESTIMADO</span>
              <span className="text-sm font-mono font-bold text-success">{formatArs(total)}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">
              Precio Enertik por cantidad (cables por metro).{pending > 0 ? ` ${pending} item(s) a consultar no incluidos.` : ''}
            </span>
          </div>
        );
      })()}
      <Button className="mt-auto font-semibold tracking-wide">
        GENERAR DIAGRAMA
      </Button>
    </div>
  );
};

export default ConfigPanel;
