import { SolarConfig, INVERTER_OPTIONS, BATTERY_OPTIONS, PANEL_OPTIONS, CABLE_OPTIONS, CHARGER_OPTIONS, BREAKER_OPTIONS } from '@/types/solar';
import { needsExternalCharger } from '@/lib/compatibility';

interface SolarDiagramProps {
  config: SolarConfig;
}

const SolarDiagram = ({ config }: SolarDiagramProps) => {
  const inverter = INVERTER_OPTIONS.find(i => i.id === config.inverterId);
  const battery = BATTERY_OPTIONS.find(b => b.id === config.batteryId);
  const panel = PANEL_OPTIONS.find(p => p.id === config.panelId);
  const cableDcPanel = CABLE_OPTIONS.find(c => c.id === config.cableDcPanelId);
  const cableDcBattery = CABLE_OPTIONS.find(c => c.id === config.cableDcBatteryId);
  const cableAc = CABLE_OPTIONS.find(c => c.id === config.cableAcId);
  const cableTierra = CABLE_OPTIONS.find(c => c.id === config.cableTierraId);
  const charger = CHARGER_OPTIONS.find(c => c.id === config.chargerId);
  const cableDcPanelCharger = CABLE_OPTIONS.find(c => c.id === config.cableDcPanelChargerId);
  const cableDcChargerBattery = CABLE_OPTIONS.find(c => c.id === config.cableDcChargerBatteryId);
  const breakerDcPanel = BREAKER_OPTIONS.find(b => b.id === config.breakerDcPanelId);
  const breakerDcBattery = BREAKER_OPTIONS.find(b => b.id === config.breakerDcBatteryId);
  const breakerAc = BREAKER_OPTIONS.find(b => b.id === config.breakerAcId);

  const showBatteries = config.systemType !== 'on-grid';
  const showGrid = config.systemType !== 'off-grid';
  const showCharger = needsExternalCharger(inverter);

  const systemLabel = config.systemType === 'off-grid' ? 'AISLADO (OFF-GRID)' : config.systemType === 'on-grid' ? 'CONECTADO A RED (ON-GRID)' : 'HIBRIDO';
  const titleText = `DIAGRAMA UNIFILAR — SISTEMA SOLAR ${systemLabel}`;

  // Adjust viewBox height based on whether charger is shown
  const svgHeight = showCharger ? 680 : 580;

  return (
    <div id="solar-diagram-export" className="diagram-container blueprint-grid w-full h-full overflow-auto p-4 flex flex-col">
      <h3 className="text-center font-mono text-sm tracking-widest text-foreground mb-4 border-b border-diagram-border pb-2">
        {titleText}
      </h3>
      <svg
        viewBox={`0 0 900 ${svgHeight}`}
        className="w-full flex-1"
        style={{ minHeight: showCharger ? 520 : 420 }}
      >
        {/* Solar Panels */}
        <g transform="translate(50, 30)">
          <SolarPanelGroup panelCount={4} />
          <text x="100" y="95" className="fill-black" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
            PANELES SOLARES
          </text>
          <text x="100" y="108" className="fill-black" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">
            {panel ? `${panel.watts}W ${panel.brand}` : ''}
          </text>
        </g>

        {/* DC Lines from panels down */}
        <line x1="150" y1="140" x2="150" y2="170" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
        <line x1="160" y1="140" x2="160" y2="170" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />

        {/* Breaker DC Paneles - between panels and next component */}
        {breakerDcPanel && (
          <g transform="translate(90, 155)">
            <rect x="0" y="0" width="130" height="22" rx="3" fill="hsl(220, 38%, 16%)" stroke="hsl(42, 100%, 50%)" strokeWidth="1" />
            <text x="65" y="15" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
              {config.systemType === 'on-grid' ? 'BREAKER DC' : 'BREAKER DC PANELES'} {breakerDcPanel.amps}A
            </text>
          </g>
        )}

        {/* Cable label: Panel → next */}
        {(showCharger ? cableDcPanelCharger : cableDcPanel) && (
          <g>
            <rect x="170" y="140" width="90" height="20" rx="3" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(200, 50%, 35%)" strokeWidth="0.5" />
            <text x="215" y="153" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
              DC {(showCharger ? cableDcPanelCharger : cableDcPanel)?.section}
            </text>
          </g>
        )}

        {showCharger ? (
          <>
            {/* Charger/Regulator box */}
            <g transform="translate(80, 185)">
              <rect x="0" y="0" width="160" height="70" rx="4" fill="hsl(160, 40%, 18%)" stroke="hsl(160, 60%, 40%)" strokeWidth="1.5" />
              <text x="80" y="18" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(160, 80%, 70%)" textAnchor="middle" fontWeight="bold">
                CARGADOR DE BATERIAS
              </text>
              <text x="80" y="32" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(160, 60%, 55%)" textAnchor="middle">
                Regulador de Carga
              </text>
              {charger && (
                <>
                  <text x="80" y="46" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                    {charger.technology} {charger.maxAmps}A
                  </text>
                  <text x="80" y="60" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(215, 15%, 55%)" textAnchor="middle">
                    {charger.brand} — SKU: {charger.sku}
                  </text>
                </>
              )}
            </g>

            {/* Lines from charger to batteries */}
            <line x1="150" y1="255" x2="150" y2="290" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
            <line x1="160" y1="255" x2="160" y2="290" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
            {cableDcChargerBattery && (
              <g>
                <rect x="170" y="260" width="110" height="20" rx="3" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(160, 60%, 40%)" strokeWidth="0.5" />
                <text x="225" y="273" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                  DC REG→BAT {cableDcChargerBattery.section}
                </text>
              </g>
            )}

            {/* Battery bank when charger present */}
            {showBatteries && battery && (
              <>
                {/* Breaker DC Baterías */}
                {breakerDcBattery && (
                  <g transform="translate(90, 290)">
                    <rect x="0" y="0" width="130" height="22" rx="3" fill="hsl(220, 38%, 16%)" stroke="hsl(42, 100%, 50%)" strokeWidth="1" />
                    <text x="65" y="15" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                      BREAKER DC BAT {breakerDcBattery.amps}A
                    </text>
                  </g>
                )}

                <g transform="translate(50, 320)">
                  <rect x="0" y="0" width="200" height="90" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1.5" />
                  <text x="100" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">BANCO DE BATERIAS</text>
                  <text x="100" y="34" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                    {battery.voltage}V / {(battery.capacityWh / 1000).toFixed(1)} kWh
                  </text>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <g key={i} transform={`translate(${20 + i * 28}, 44)`}>
                      <rect x="0" y="0" width="22" height="32" rx="2" fill="hsl(220, 30%, 20%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1" />
                      <rect x="6" y="-3" width="10" height="4" rx="1" fill="hsl(200, 50%, 35%)" />
                    </g>
                  ))}
                  <text x="100" y="86" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(215, 15%, 55%)" textAnchor="middle">
                    {battery.chemistry} — {battery.brand} — SKU: {battery.sku}
                  </text>
                </g>

                {/* Lines from batteries to inverter */}
                <line x1="250" y1="365" x2="350" y2="365" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
                <line x1="250" y1="375" x2="350" y2="375" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
                <polygon points="348,361 356,365 348,369" fill="hsl(0, 80%, 55%)" />
                {cableDcBattery && (
                  <g>
                    <rect x="265" y="348" width="72" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(200, 50%, 35%)" strokeWidth="0.5" />
                    <text x="301" y="358" fontSize="6.5" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                      DC BAT {cableDcBattery.section}
                    </text>
                  </g>
                )}
              </>
            )}

            {/* Inverter positioned lower when charger present */}
            <g transform="translate(350, 310)">
              <rect x="0" y="0" width="220" height="120" rx="6" fill="hsl(220, 42%, 14%)" stroke="hsl(200, 50%, 35%)" strokeWidth="2" />
              <text x="110" y="22" fontSize="11" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">
                INVERSOR {systemLabel}
              </text>
              <text x="110" y="38" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                {inverter ? `${inverter.voltage}V / ${inverter.power}W` : ''}
              </text>
              <rect x="20" y="50" width="180" height="22" rx="3" fill="hsl(220, 30%, 20%)" stroke="hsl(215, 25%, 25%)" />
              <text x="110" y="65" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">SIN CARGADOR INTEGRADO</text>
              <rect x="20" y="78" width="85" height="18" rx="3" fill="hsl(220, 30%, 20%)" stroke="hsl(215, 25%, 25%)" />
              <text x="62" y="90" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">
                ENTRADA BAT. {inverter?.voltage}V
              </text>
              <rect x="115" y="78" width="85" height="18" rx="3" fill="hsl(220, 30%, 20%)" stroke="hsl(215, 25%, 25%)" />
              <text x="157" y="90" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">SALIDA AC 220V~</text>
            </g>

            {/* Breaker AC */}
            {breakerAc && (
              <g transform="translate(575, 355)">
                <rect x="0" y="0" width="80" height="22" rx="3" fill="hsl(220, 38%, 16%)" stroke="hsl(42, 100%, 50%)" strokeWidth="1" />
                <text x="40" y="15" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                  BK AC {breakerAc.amps}A
                </text>
              </g>
            )}

            {/* AC output line */}
            <line x1="570" y1="400" x2="650" y2="400" stroke="hsl(42, 100%, 50%)" strokeWidth="2.5" />
            <polygon points="648,396 656,400 648,404" fill="hsl(42, 100%, 50%)" />
            {cableAc && (
              <g>
                <rect x="582" y="405" width="72" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(42, 100%, 50%)" strokeWidth="0.5" />
                <text x="618" y="415" fontSize="6.5" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                  AC {cableAc.section}
                </text>
              </g>
            )}

            {/* AC Distribution Panel */}
            <g transform="translate(650, 355)">
              <rect x="0" y="0" width="180" height="110" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1.5" />
              <text x="90" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">TABLERO DE DIST. AC</text>
              <g transform="translate(15, 28)">
                <rect x="0" y="0" width="12" height="12" rx="2" fill="hsl(200, 70%, 45%)" />
                <text x="2" y="10" fontSize="8" fill="hsl(220, 40%, 10%)" fontFamily="JetBrains Mono" fontWeight="bold">I</text>
                <text x="18" y="10" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">INTERRUPTOR PRINCIPAL</text>
              </g>
              <g transform="translate(15, 48)">
                <rect x="0" y="0" width="12" height="12" rx="2" fill="hsl(42, 100%, 50%)" />
                <text x="2" y="10" fontSize="8" fill="hsl(220, 40%, 10%)" fontFamily="JetBrains Mono" fontWeight="bold">!</text>
                <text x="18" y="10" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">DIFERENCIAL / PROTECTOR</text>
              </g>
              <g transform="translate(15, 68)">
                <rect x="0" y="0" width="12" height="12" rx="6" fill="hsl(200, 70%, 45%)" />
                <text x="6" y="9" fontSize="7" fill="hsl(220, 40%, 10%)" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">+</text>
                <text x="18" y="10" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">CARGAS AC</text>
              </g>
              <text x="90" y="100" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(215, 15%, 55%)" textAnchor="middle">Circuitos del Hogar</text>
            </g>

            {/* Ground */}
            <g transform="translate(450, svgHeight < 680 ? 460 : 560)">
              <rect x="0" y="0" width="160" height="60" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="80" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(50, 90%, 55%)" textAnchor="middle" fontWeight="bold">PUESTA A TIERRA</text>
              <g transform="translate(15, 26)"><text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ BARRA DE TIERRA</text></g>
              <g transform="translate(15, 40)"><text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ JABALINA</text></g>
            </g>
            <line x1="460" y1="430" x2="460" y2="560" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="6 3" />
            <line x1="460" y1="560" x2="450" y2="560" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="6 3" />
            {cableTierra && (
              <g>
                <rect x="465" y="510" width="80" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(50, 90%, 55%)" strokeWidth="0.5" />
                <text x="505" y="520" fontSize="6.5" fontFamily="JetBrains Mono" fill="hsl(50, 90%, 55%)" textAnchor="middle">
                  TIERRA {cableTierra.section}
                </text>
              </g>
            )}

            {showGrid && (
              <>
                <line x1="570" y1="320" x2="850" y2="320" stroke="hsl(0, 80%, 55%)" strokeWidth="3" />
                <text x="710" y="312" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(0, 80%, 55%)" textAnchor="middle">RED ELECTRICA</text>
              </>
            )}
          </>
        ) : (
          <>
            {/* Standard layout without external charger */}
            {/* DC Combiner Box */}
            <g transform="translate(80, 180)">
              <rect x="0" y="0" width="160" height="80" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1.5" />
              <text x="80" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">CAJA COMBINADORA DC</text>
              <g transform="translate(15, 28)">
                <rect x="0" y="0" width="8" height="8" fill="hsl(0, 80%, 55%)" rx="1" />
                <text x="14" y="8" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">FUSIBLES DC</text>
              </g>
              <g transform="translate(15, 42)">
                <rect x="0" y="0" width="8" height="8" fill="hsl(0, 80%, 55%)" rx="1" />
                <text x="14" y="8" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">SECCIONADOR DC</text>
              </g>
              <g transform="translate(15, 56)">
                <rect x="0" y="0" width="8" height="8" fill="hsl(42, 100%, 50%)" rx="1" />
                <text x="14" y="8" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">PROTECTOR SOBRETENSIONES</text>
              </g>
            </g>

            {/* DC Lines from combiner to inverter */}
            <line x1="240" y1="220" x2="350" y2="220" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
            <line x1="240" y1="230" x2="350" y2="230" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
            <polygon points="348,216 356,220 348,224" fill="hsl(0, 80%, 55%)" />
            <polygon points="348,226 356,230 348,234" fill="hsl(220, 80%, 55%)" />
            {cableDcPanel && (
              <g>
                <rect x="260" y="203" width="72" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(200, 50%, 35%)" strokeWidth="0.5" />
                <text x="296" y="213" fontSize="6.5" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                  DC {cableDcPanel.section}
                </text>
              </g>
            )}

            {/* Inverter */}
            <g transform="translate(350, 160)">
              <rect x="0" y="0" width="220" height="120" rx="6" fill="hsl(220, 42%, 14%)" stroke="hsl(200, 50%, 35%)" strokeWidth="2" />
              <text x="110" y="22" fontSize="11" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">
                {inverter?.hasCharger ? 'INVERSOR/CARGADOR' : 'INVERSOR'} {systemLabel}
              </text>
              <text x="110" y="38" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                {inverter ? `${inverter.voltage}V / ${inverter.power}W` : ''}
              </text>
              <rect x="20" y="50" width="180" height="22" rx="3" fill="hsl(220, 30%, 20%)" stroke="hsl(215, 25%, 25%)" />
              <text x="110" y="65" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">
                {inverter?.hasCharger ? 'CONTROLADOR DE CARGA INTEGRADO' : 'CONTROLADOR DE CARGA MPPT'}
              </text>
              <rect x="20" y="78" width="85" height="18" rx="3" fill="hsl(220, 30%, 20%)" stroke="hsl(215, 25%, 25%)" />
              <text x="62" y="90" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">
                {inverter ? `ENTRADA BAT. ${inverter.voltage}V` : 'ENTRADA BATERIA'}
              </text>
              <rect x="115" y="78" width="85" height="18" rx="3" fill="hsl(220, 30%, 20%)" stroke="hsl(215, 25%, 25%)" />
              <text x="157" y="90" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">SALIDA AC 220V~</text>
            </g>

            {/* Breaker AC */}
            {breakerAc && (
              <g transform="translate(575, 195)">
                <rect x="0" y="0" width="80" height="22" rx="3" fill="hsl(220, 38%, 16%)" stroke="hsl(42, 100%, 50%)" strokeWidth="1" />
                <text x="40" y="15" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                  BK AC {breakerAc.amps}A
                </text>
              </g>
            )}

            {/* AC output line to distribution panel */}
            <line x1="570" y1="250" x2="650" y2="250" stroke="hsl(42, 100%, 50%)" strokeWidth="2.5" />
            <polygon points="648,246 656,250 648,254" fill="hsl(42, 100%, 50%)" />
            {cableAc && (
              <g>
                <rect x="582" y="255" width="72" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(42, 100%, 50%)" strokeWidth="0.5" />
                <text x="618" y="265" fontSize="6.5" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                  AC {cableAc.section}
                </text>
              </g>
            )}

            {showGrid && (
              <>
                <line x1="570" y1="170" x2="850" y2="170" stroke="hsl(0, 80%, 55%)" strokeWidth="3" />
                <text x="710" y="162" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(0, 80%, 55%)" textAnchor="middle">RED ELECTRICA</text>
              </>
            )}

            {/* AC Distribution Panel */}
            <g transform="translate(650, 205)">
              <rect x="0" y="0" width="180" height="110" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1.5" />
              <text x="90" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">TABLERO DE DIST. AC</text>
              <g transform="translate(15, 28)">
                <rect x="0" y="0" width="12" height="12" rx="2" fill="hsl(200, 70%, 45%)" />
                <text x="2" y="10" fontSize="8" fill="hsl(220, 40%, 10%)" fontFamily="JetBrains Mono" fontWeight="bold">I</text>
                <text x="18" y="10" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">INTERRUPTOR PRINCIPAL</text>
              </g>
              <g transform="translate(15, 48)">
                <rect x="0" y="0" width="12" height="12" rx="2" fill="hsl(42, 100%, 50%)" />
                <text x="2" y="10" fontSize="8" fill="hsl(220, 40%, 10%)" fontFamily="JetBrains Mono" fontWeight="bold">!</text>
                <text x="18" y="10" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">DIFERENCIAL / PROTECTOR</text>
              </g>
              <g transform="translate(15, 68)">
                <rect x="0" y="0" width="12" height="12" rx="6" fill="hsl(200, 70%, 45%)" />
                <text x="6" y="9" fontSize="7" fill="hsl(220, 40%, 10%)" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">+</text>
                <text x="18" y="10" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">CARGAS AC</text>
              </g>
              <text x="90" y="100" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(215, 15%, 55%)" textAnchor="middle">Circuitos del Hogar</text>
            </g>

            {showBatteries && battery && (
              <>
                {/* DC lines from inverter to batteries */}
                <line x1="390" y1="280" x2="390" y2="340" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
                <line x1="400" y1="280" x2="400" y2="340" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
                <polygon points="386,338 390,348 394,338" fill="hsl(0, 80%, 55%)" />
                <polygon points="396,338 400,348 404,338" fill="hsl(220, 80%, 55%)" />
                {cableDcBattery && (
                  <g>
                    <rect x="408" y="295" width="82" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(200, 50%, 35%)" strokeWidth="0.5" />
                    <text x="449" y="305" fontSize="6.5" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                      DC BAT {cableDcBattery.section}
                    </text>
                  </g>
                )}

                {/* Breaker DC Baterías */}
                {breakerDcBattery && (
                  <g transform="translate(340, 330)">
                    <rect x="0" y="0" width="110" height="22" rx="3" fill="hsl(220, 38%, 16%)" stroke="hsl(42, 100%, 50%)" strokeWidth="1" />
                    <text x="55" y="15" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                      BK DC BAT {breakerDcBattery.amps}A
                    </text>
                  </g>
                )}

                {/* Battery Bank */}
                <g transform="translate(100, 350)">
                  <rect x="0" y="0" width="200" height="90" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1.5" />
                  <text x="100" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">BANCO DE BATERIAS</text>
                  <text x="100" y="34" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                    {battery.voltage}V / {(battery.capacityWh / 1000).toFixed(1)} kWh
                  </text>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <g key={i} transform={`translate(${20 + i * 28}, 44)`}>
                      <rect x="0" y="0" width="22" height="32" rx="2" fill="hsl(220, 30%, 20%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1" />
                      <rect x="6" y="-3" width="10" height="4" rx="1" fill="hsl(200, 50%, 35%)" />
                    </g>
                  ))}
                  <text x="100" y="86" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(215, 15%, 55%)" textAnchor="middle">
                    {battery.chemistry} — {battery.brand} — SKU: {battery.sku}
                  </text>
                </g>

                <line x1="300" y1="395" x2="350" y2="395" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
                <line x1="300" y1="385" x2="350" y2="385" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
              </>
            )}

            {/* Grounding */}
            <g transform="translate(450, 470)">
              <rect x="0" y="0" width="160" height="60" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="80" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(50, 90%, 55%)" textAnchor="middle" fontWeight="bold">PUESTA A TIERRA</text>
              <g transform="translate(15, 26)"><text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ BARRA DE TIERRA</text></g>
              <g transform="translate(15, 40)"><text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ JABALINA</text></g>
            </g>

            <line x1="460" y1="280" x2="460" y2="470" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="6 3" />
            <line x1="460" y1="470" x2="450" y2="470" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="6 3" />
            {cableTierra && (
              <g>
                <rect x="465" y="420" width="80" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(50, 90%, 55%)" strokeWidth="0.5" />
                <text x="505" y="430" fontSize="6.5" fontFamily="JetBrains Mono" fill="hsl(50, 90%, 55%)" textAnchor="middle">
                  TIERRA {cableTierra.section}
                </text>
              </g>
            )}
          </>
        )}
      </svg>
    </div>
  );
};

const SolarPanelGroup = ({ panelCount }: { panelCount: number }) => {
  const displayCount = Math.min(panelCount, 8);
  const panelWidth = 22;
  const gap = 3;
  const totalWidth = displayCount * (panelWidth + gap);
  const startX = (200 - totalWidth) / 2;

  return (
    <g>
      <line x1={startX + 10} y1="75" x2={startX + 10} y2="85" stroke="hsl(215, 15%, 45%)" strokeWidth="2" />
      <line x1={startX + totalWidth - 10} y1="75" x2={startX + totalWidth - 10} y2="85" stroke="hsl(215, 15%, 45%)" strokeWidth="2" />
      <line x1={startX} y1="85" x2={startX + totalWidth} y2="85" stroke="hsl(215, 15%, 45%)" strokeWidth="2" />

      {Array.from({ length: displayCount }).map((_, i) => (
        <g key={i} transform={`translate(${startX + i * (panelWidth + gap)}, 10)`}>
          <rect x="0" y="0" width={panelWidth} height="65" rx="1"
            fill="hsl(220, 50%, 25%)" stroke="hsl(200, 50%, 35%)" strokeWidth="0.8" />
          <line x1="0" y1="16" x2={panelWidth} y2="16" stroke="hsl(200, 40%, 30%)" strokeWidth="0.4" />
          <line x1="0" y1="32" x2={panelWidth} y2="32" stroke="hsl(200, 40%, 30%)" strokeWidth="0.4" />
          <line x1="0" y1="48" x2={panelWidth} y2="48" stroke="hsl(200, 40%, 30%)" strokeWidth="0.4" />
          <line x1={panelWidth / 2} y1="0" x2={panelWidth / 2} y2="65" stroke="hsl(200, 40%, 30%)" strokeWidth="0.4" />
        </g>
      ))}
    </g>
  );
};

export default SolarDiagram;
