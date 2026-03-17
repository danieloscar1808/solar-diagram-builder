import { SolarConfig, INVERTER_OPTIONS, BATTERY_OPTIONS, PANEL_OPTIONS, CABLE_OPTIONS, CHARGER_OPTIONS, BREAKER_OPTIONS } from '@/types/solar';
import { needsExternalCharger, getCompatibleBreakers, getCompatibleCables, getRecommendedBreaker, getRecommendedCable } from '@/lib/compatibility';

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
  const breakerDcPanelCharger = BREAKER_OPTIONS.find(b => b.id === config.breakerDcPanelChargerId);
  const breakerDcChargerBattery = BREAKER_OPTIONS.find(b => b.id === config.breakerDcChargerBatteryId);

  const showBatteries = config.systemType !== 'on-grid';
  const showGrid = config.systemType !== 'off-grid';
  const showCharger = needsExternalCharger(inverter);

  // Check if items are from Enertik catalog or need recommendations
  const dcBreakersAvailable = getCompatibleBreakers(inverter, 'dc');
  const acBreakersAvailable = getCompatibleBreakers(inverter, 'ac');
  const dcCablesAvailable = getCompatibleCables(inverter, 'dc');
  const acCablesAvailable = getCompatibleCables(inverter, 'ac');
  const tierraCablesAvailable = getCompatibleCables(inverter, 'tierra');

  const recDcBreaker = dcBreakersAvailable.length === 0 ? getRecommendedBreaker(inverter, 'dc') : null;
  const recAcBreaker = acBreakersAvailable.length === 0 ? getRecommendedBreaker(inverter, 'ac') : null;
  const recDcCable = dcCablesAvailable.length === 0 ? getRecommendedCable(inverter, 'dc') : null;
  const recAcCable = acCablesAvailable.length === 0 ? getRecommendedCable(inverter, 'ac') : null;
  const recTierraCable = tierraCablesAvailable.length === 0 ? getRecommendedCable(inverter, 'tierra') : null;

  // Effective display values for breakers
  const effBreakerDcPanelAmps = breakerDcPanel?.amps ?? recDcBreaker?.amps;
  const effBreakerDcBatteryAmps = breakerDcBattery?.amps ?? recDcBreaker?.amps;
  const effBreakerAcAmps = breakerAc?.amps ?? recAcBreaker?.amps;
  const effBreakerDcPanelChargerAmps = breakerDcPanelCharger?.amps ?? recDcBreaker?.amps;
  const effBreakerDcChargerBatteryAmps = breakerDcChargerBattery?.amps ?? recDcBreaker?.amps;

  // Effective display values for cables
  const effCableDcPanelSection = cableDcPanel?.section ?? recDcCable?.section;
  const effCableDcBatterySection = cableDcBattery?.section ?? recDcCable?.section;
  const effCableAcSection = cableAc?.section ?? recAcCable?.section;
  const effCableTierraSection = cableTierra?.section ?? recTierraCable?.section;
  const effCableDcPanelChargerSection = cableDcPanelCharger?.section ?? recDcCable?.section;
  const effCableDcChargerBatterySection = cableDcChargerBattery?.section ?? recDcCable?.section;

  // Colors: red for recommended (not in Enertik), gold for available
  const RED = "hsl(0, 80%, 55%)";
  const GOLD = "hsl(42, 100%, 50%)";
  const bkDcPanelColor = breakerDcPanel ? GOLD : RED;
  const bkDcBatColor = breakerDcBattery ? GOLD : RED;
  const bkAcColor = breakerAc ? GOLD : RED;
  const bkDcPanelChargerColor = breakerDcPanelCharger ? GOLD : RED;
  const bkDcChargerBatColor = breakerDcChargerBattery ? GOLD : RED;
  const cableDcPanelColor = cableDcPanel ? GOLD : RED;
  const cableDcBatColor = cableDcBattery ? GOLD : RED;
  const cableAcColor = cableAc ? GOLD : RED;
  const cableTierraColor = cableTierra ? "hsl(50, 90%, 55%)" : RED;
  const cableDcPanelChargerColor = cableDcPanelCharger ? GOLD : RED;
  const cableDcChargerBatColor = cableDcChargerBattery ? GOLD : RED;

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
        <g transform="translate(300, 10)">
          <SolarPanelGroup panelCount={4} />
          <text x="100" y="95" className="fill-black" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
            PANELES SOLARES
          </text>
          <text x="100" y="108" className="fill-black" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">
            {panel ? `${panel.watts}W ${panel.brand}` : ''}
          </text>
        </g>

        {/* DC Lines from panels down */}
        <line x1="150" y1="50" x2="150" y2="218" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
        <line x1="150" y1="50" x2="340" y2="50" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
        <polygon points="146,211 150,219 154,211" fill="hsl(0, 80%, 55%)" />
        <line x1="165" y1="65" x2="165" y2="218" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
        <line x1="165" y1="65" x2="340" y2="65" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
        <polygon points="161,211 165,219 169,211" fill="hsl(220, 80%, 55%)" />
        
        

        {/* Breaker DC Paneles - between panels and next component */}
        {!showCharger && effBreakerDcPanelAmps && (
          <g transform="translate(90, 170)">
            <rect x="9" y="0" width="110" height="24" rx="3" fill="hsl(220, 38%, 16%)" stroke={bkDcPanelColor} strokeWidth="1" />
            <text x="65" y="15" fontSize="7.5" fontFamily="JetBrains Mono" fill={bkDcPanelColor} textAnchor="middle">
              {config.systemType === 'on-grid' ? 'BREAKER DC' : 'BREAKER DC PANELES'} {effBreakerDcPanelAmps}A{!breakerDcPanel ? ' *' : ''}
            </text>
          </g>
        )}
        {/* Breaker DC Paneles-Cargador (when external charger) */}
        {showCharger && effBreakerDcPanelChargerAmps && (
          <g transform="translate(250, 28)">
            <rect x="0" y="0" width="140" height="22" rx="3" fill="hsl(220, 38%, 16%)" stroke={bkDcPanelChargerColor} strokeWidth="1" />
            <text x="70" y="15" fontSize="7" fontFamily="JetBrains Mono" fill={bkDcPanelChargerColor} textAnchor="middle">
              BK DC PAN→CARG {effBreakerDcPanelChargerAmps}A{!breakerDcPanelCharger ? ' *' : ''}
            </text>
          </g>
        )}

        {/* Cable label: Panel → next */}
        {(showCharger ? (effCableDcPanelChargerSection) : (effCableDcPanelSection)) && (
          <g>
            <rect x="250" y="70" width="90" height="15" rx="3" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(200, 50%, 35%)" strokeWidth="0.5" />
            <text x="295" y="80" fontSize="7.5" fontFamily="JetBrains Mono" fill={showCharger ? cableDcPanelChargerColor : cableDcPanelColor} textAnchor="middle">
              DC PANELES {showCharger ? effCableDcPanelChargerSection : effCableDcPanelSection}{(showCharger ? !cableDcPanelCharger : !cableDcPanel) ? ' *' : ''}
            </text>
          </g>
        )}

        {showCharger ? (
          <>
            {/* Charger/Regulator box */}
            <g transform="translate(75, 80)">
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

            {/* Breaker DC Cargador-Baterías */}
            {effBreakerDcChargerBatteryAmps && (
              <g transform="translate(80, 155)">
                <rect x="0" y="0" width="150" height="22" rx="3" fill="hsl(220, 38%, 16%)" stroke={bkDcChargerBatColor} strokeWidth="1" />
                <text x="75" y="15" fontSize="7" fontFamily="JetBrains Mono" fill={bkDcChargerBatColor} textAnchor="middle">
                  BK DC CARG→BAT {effBreakerDcChargerBatteryAmps}A{!breakerDcChargerBattery ? ' *' : ''}
                </text>
              </g>
            )}

            {/* Lines from charger to batteries */}
            {effCableDcChargerBatterySection && (
              <g>
                <rect x="180" y="182" width="110" height="20" rx="3" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(160, 60%, 40%)" strokeWidth="0.5" />
                <text x="235" y="194" fontSize="7" fontFamily="JetBrains Mono" fill={cableDcChargerBatColor} textAnchor="middle">
                  DC REG→BAT {effCableDcChargerBatterySection}{!cableDcChargerBattery ? ' *' : ''}
                </text>
              </g>
            )}

            {/* Battery bank when charger present */}
            {showBatteries && battery && (
              <>
                {/* Breaker DC Baterías */}
                 {effBreakerDcBatteryAmps && (
                  <g transform="translate(250, 410)">
                    <rect x="0" y="0" width="130" height="22" rx="3" fill="hsl(220, 38%, 16%)" stroke={bkDcBatColor} strokeWidth="1" />
                    <text x="65" y="15" fontSize="7.5" fontFamily="JetBrains Mono" fill={bkDcBatColor} textAnchor="middle">
                      BREAKER DC BAT {effBreakerDcBatteryAmps}A{!breakerDcBattery ? ' *' : ''}
                    </text>
                  </g>
                )}

                <g transform="translate(70, 350)">
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
                <line x1="390" y1="280" x2="390" y2="385" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
                <line x1="400" y1="280" x2="400" y2="395" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
                <polygon points="386,288 390,280 394,288" fill="hsl(0, 80%, 55%)" />
                <polygon points="396,288 400,280 404,288" fill="hsl(220, 80%, 55%)" />
                <line x1="400" y1="395" x2="270" y2="395" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
                <polygon points="278,391 270,395 278,399" fill="hsl(220, 80%, 55%)" />
                <line x1="390" y1="385" x2="270" y2="385" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
                <polygon points="278,381 270,385 278,389" fill="hsl(0, 80%, 55%)" />

                <line x1="150" y1="218" x2="150" y2="350" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
                <line x1="165" y1="218" x2="165" y2="350" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
                
                {effCableDcBatterySection && (
                  <g>
                    <rect x="300" y="400" width="72" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(200, 50%, 35%)" strokeWidth="0.5" />
                    <text x="336" y="409" fontSize="7.5" fontFamily="JetBrains Mono" fill={cableDcBatColor} textAnchor="middle">
                      DC BAT {effCableDcBatterySection}{!cableDcBattery ? ' *' : ''}
                    </text>
                  </g>
                )}
              </>
            )}

            {/* Inverter positioned lower when charger present */}
            <g transform="translate(350, 160)">
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

            {/* Lineas 220V de inversor sin cargador a tablero AC del domicilio */}
            <line x1="570" y1="250" x2="700" y2="250" stroke="hsl(209, 77%, 73%)" strokeWidth="2.5" />
            <polygon points="692,246 700,250 692,254" fill="hsl(209, 77%, 73%)" />
            <line x1="570" y1="235" x2="700" y2="235" stroke="hsla(22, 70%, 60%, 0.77)" strokeWidth="2.5" />
            <polygon points="692,231 700,235 692,239" fill="hsla(22, 70%, 60%, 0.77)" />

            {/* Breaker AC */}
            {effBreakerAcAmps && (
              <g transform="translate(595, 230)">
                <rect x="0" y="0" width="80" height="25" rx="3" fill="hsl(220, 38%, 16%)" stroke={bkAcColor} strokeWidth="1" />
                <text x="40" y="15" fontSize="7.5" fontFamily="JetBrains Mono" fill={bkAcColor} textAnchor="middle">
                  BK AC {effBreakerAcAmps}A{!breakerAc ? ' *' : ''}
                </text>
              </g>
            )}
                                   
            {effCableAcSection && (
              <g>
                <rect x="600" y="270" width="72" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke={cableAcColor} strokeWidth="0.5" />
                <text x="635" y="280" fontSize="7.5" fontFamily="JetBrains Mono" fill={cableAcColor} textAnchor="middle">
                  AC {effCableAcSection}{!cableAc ? ' *' : ''}
                </text>
              </g>
            )}

            {/* AC Distribution Panel */}
            <g transform="translate(700, 200)">
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
            <g transform="translate(600, 400)">
              <rect x="0" y="0" width="160" height="60" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="80" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(50, 90%, 55%)" textAnchor="middle" fontWeight="bold">PUESTA A TIERRA</text>
              <g transform="translate(15, 26)"><text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ BARRA DE TIERRA</text></g>
              <g transform="translate(15, 40)"><text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ JABALINA</text></g>
            </g>

            {/* Línea verde base */}
            <line
            x1="500"
            y1="280"
            x2="500"
            y2="430"
            stroke="hsl(120, 60%, 40%)"
            strokeWidth="5"
              />

            {/* Rayado amarillo */}
            <line
            x1="500"
            y1="280"
            x2="500"
            y2="430"
            stroke="hsl(50, 95%, 55%)"
            strokeWidth="2"
            strokeDasharray="6 6"
            />
            {/* Línea verde base */}
            <line
            x1="500"
            y1="430"
            x2="600"
            y2="430"
            stroke="hsl(120, 60%, 40%)"
            strokeWidth="5"
              />
            {/* Rayado amarillo */}
            <line
            x1="500"
            y1="430"
            x2="600"
            y2="430"
            stroke="hsl(50, 95%, 55%)"
            strokeWidth="2"
            strokeDasharray="6 6"
            />
            {effCableTierraSection && (
              <g>
                <rect x="510" y="410" width="80" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke={cableTierraColor} strokeWidth="0.5" />
                <text x="550" y="420" fontSize="7.5" fontFamily="JetBrains Mono" fill={cableTierraColor} textAnchor="middle">
                  TIERRA {effCableTierraSection}{!cableTierra ? ' *' : ''}
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
            <g transform="translate(80, 220)">
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
            <line x1="240" y1="250" x2="328" y2="250" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
            <polygon points="320,246 328,250 320,254" fill="hsl(0, 80%, 55%)" />
            <line x1="240" y1="238" x2="328" y2="238" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
            <polygon points="320,234 328,238 320,242" fill="hsl(220, 80%, 55%)" />
            
            {effCableDcPanelSection && (
              <g>
                <rect x="247" y="260" width="72" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(200, 50%, 35%)" strokeWidth="0.5" />
                <text x="283" y="270" fontSize="7.5" fontFamily="JetBrains Mono" fill={cableDcPanelColor} textAnchor="middle">
                  DC {effCableDcPanelSection}{!cableDcPanel ? ' *' : ''}
                </text>
              </g>
            )}

            {/* Inverter */}
            <g transform="translate(350, 160)">
              <rect x="-20" y="0" width="260" height="120" rx="6" fill="hsl(220, 42%, 14%)" stroke="hsl(200, 50%, 35%)" strokeWidth="2" />
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

            {/* AC output line to distribution panel */}
            <line x1="590" y1="250" x2="700" y2="250" stroke="hsl(209, 77%, 73%)" strokeWidth="2.5" />
            <polygon points="692,246 700,250 692,254" fill="hsl(209, 77%, 73%)" />
            <line x1="590" y1="235" x2="700" y2="235" stroke="hsla(22, 70%, 60%, 0.77)" strokeWidth="2.5" />
            <polygon points="692,231 700,235 692,239" fill="hsla(22, 70%, 60%, 0.77)" />
            {effCableAcSection && (
              <g>
                <rect x="605" y="260" width="72" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke={cableAcColor} strokeWidth="0.5" />
                <text x="640" y="270" fontSize="7.5" fontFamily="JetBrains Mono" fill={cableAcColor} textAnchor="middle">
                  AC {effCableAcSection}{!cableAc ? ' *' : ''}
                </text>
              </g>
            )}

            {/* Breaker AC */}
            {effBreakerAcAmps && (
              <g transform="translate(600, 231)">
                <rect x="0" y="0" width="80" height="25" rx="3" fill="hsl(220, 38%, 16%)" stroke={bkAcColor} strokeWidth="1" />
                <text x="40" y="15" fontSize="7.5" fontFamily="JetBrains Mono" fill={bkAcColor} textAnchor="middle">
                  BK AC {effBreakerAcAmps}A{!breakerAc ? ' *' : ''}
                </text>
              </g>
            )}

            

            {showGrid && (
              <>
                <line x1="590" y1="170" x2="850" y2="170" stroke="hsl(22, 70%, 60%, 0.77)" strokeWidth="3" />
                <polygon points="598,166 590,170 598,174" fill="hsl(22, 70%, 60%, 0.77)" />
                <line x1="590" y1="185" x2="850" y2="185" stroke="hsl(209, 77%, 73%)" strokeWidth="3" />
                <polygon points="598,181 590,185 598,189" fill="hsl(209, 77%, 73%)" />
                <text x="710" y="162" fontSize="15" fontFamily="JetBrains Mono" fill="hsl(0, 80%, 55%)" textAnchor="middle">RED ELECTRICA</text>
              </>
            )}

            {/* AC Distribution Panel */}
            <g transform="translate(700, 200)">
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
                <line x1="390" y1="280" x2="390" y2="385" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
                <line x1="400" y1="280" x2="400" y2="395" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
                <polygon points="386,288 390,280 394,288" fill="hsl(0, 80%, 55%)" />
                <polygon points="396,288 400,280 404,288" fill="hsl(133, 80%, 55%)" />

                <line x1="400" y1="395" x2="270" y2="395" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
                <polygon points="278,391 270,395 278,399" fill="hsl(220, 80%, 55%)" />
                <line x1="390" y1="385" x2="270" y2="385" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
                <polygon points="278,381 270,385 278,389" fill="hsl(0, 80%, 55%)" />

                {effCableDcBatterySection && (
                  <g>
                    <rect x="300" y="400" width="82" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke="hsl(200, 50%, 35%)" strokeWidth="0.5" />
                    <text x="340" y="410" fontSize="7.5" fontFamily="JetBrains Mono" fill={cableDcBatColor} textAnchor="middle">
                      DC BAT {effCableDcBatterySection}{!cableDcBattery ? ' *' : ''}
                    </text>
                  </g>
                )}

                {/* Breaker DC Baterías */}
                {effBreakerDcBatteryAmps && (
                  <g transform="translate(340, 330)">
                    <rect x="3" y="0" width="100" height="24" rx="3" fill="hsl(220, 38%, 16%)" stroke={bkDcBatColor} strokeWidth="1" />
                    <text x="55" y="15" fontSize="7.5" fontFamily="JetBrains Mono" fill={bkDcBatColor} textAnchor="middle">
                      BK DC BAT {effBreakerDcBatteryAmps}A{!breakerDcBattery ? ' *' : ''}
                    </text>
                  </g>
                )}

                {/* Battery Bank */}
                <g transform="translate(70, 350)">
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

               

              </>
            )}

            {/* Grounding */}
            <g transform="translate(600, 400)">
              <rect x="0" y="0" width="160" height="60" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="80" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(50, 90%, 55%)" textAnchor="middle" fontWeight="bold">PUESTA A TIERRA</text>
              <g transform="translate(15, 26)"><text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ BARRA DE TIERRA</text></g>
              <g transform="translate(15, 40)"><text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ JABALINA</text></g>
            </g>

            {/* Línea verde base */}
            <line
            x1="500"
            y1="280"
            x2="500"
            y2="430"
            stroke="hsl(120, 60%, 40%)"
            strokeWidth="5"
              />

            {/* Rayado amarillo */}
            <line
            x1="500"
            y1="280"
            x2="500"
            y2="430"
            stroke="hsl(50, 95%, 55%)"
            strokeWidth="2"
            strokeDasharray="6 6"
            />
            {/* Línea verde base */}
            <line
            x1="500"
            y1="430"
            x2="600"
            y2="430"
            stroke="hsl(120, 60%, 40%)"
            strokeWidth="5"
              />
            {/* Rayado amarillo */}
            <line
            x1="500"
            y1="430"
            x2="600"
            y2="430"
            stroke="hsl(50, 95%, 55%)"
            strokeWidth="2"
            strokeDasharray="6 6"
            />
            {effCableTierraSection && (
              <g>
                <rect x="510" y="410" width="80" height="14" rx="2" fill="hsl(220, 38%, 16%)" fillOpacity="0.9" stroke={cableTierraColor} strokeWidth="0.5" />
                <text x="550" y="420" fontSize="6.5" fontFamily="JetBrains Mono" fill={cableTierraColor} textAnchor="middle">
                  TIERRA {effCableTierraSection}{!cableTierra ? ' *' : ''}
                </text>
              </g>
            )}
          </>
        )}
        {/* Legend for recommended items */}
        <text x="10" y={svgHeight - 10} fontSize="8" fontFamily="JetBrains Mono" fill="hsl(0, 80%, 55%)">
          * Valor recomendado — No disponible en Enertik, conseguir en otro distribuidor
        </text>
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