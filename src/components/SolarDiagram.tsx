import { SolarConfig, INVERTER_OPTIONS, BATTERY_OPTIONS, PANEL_OPTIONS } from '@/types/solar';

interface SolarDiagramProps {
  config: SolarConfig;
}

const SolarDiagram = ({ config }: SolarDiagramProps) => {
  const inverter = INVERTER_OPTIONS.find(i => i.id === config.inverterId);
  const battery = BATTERY_OPTIONS.find(b => b.id === config.batteryId);
  const panel = PANEL_OPTIONS.find(p => p.id === config.panelId);
  const showBatteries = config.systemType !== 'on-grid';
  const showGrid = config.systemType !== 'off-grid';

  const systemLabel = config.systemType === 'off-grid' ? 'AISLADO (OFF-GRID)' : config.systemType === 'on-grid' ? 'CONECTADO A RED (ON-GRID)' : 'HIBRIDO';
  const titleText = `DIAGRAMA UNIFILAR — SISTEMA SOLAR ${systemLabel}`;

  return (
    <div id="solar-diagram-export" className="diagram-container blueprint-grid w-full h-full overflow-auto p-4 flex flex-col">
      <h3 className="text-center font-mono text-sm tracking-widest text-foreground mb-4 border-b border-diagram-border pb-2">
        {titleText}
      </h3>
      <svg
        viewBox="0 0 900 550"
        className="w-full flex-1"
        style={{ minHeight: 400 }}
      >
        {/* Solar Panels */}
        <g transform="translate(50, 30)">
          <SolarPanelGroup panelCount={4} />
          <text x="100" y="95" className="fill-foreground" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
            PANELES SOLARES
          </text>
          <text x="100" y="108" className="fill-foreground" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">
            {panel ? `${panel.watts}W ${panel.brand}` : ''}
          </text>
        </g>

        {/* DC Lines from panels to combiner box */}
        <line x1="150" y1="140" x2="150" y2="170" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
        <line x1="160" y1="140" x2="160" y2="170" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />

        {/* DC Combiner Box */}
        <g transform="translate(80, 170)">
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
        <line x1="240" y1="210" x2="350" y2="210" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
        <line x1="240" y1="220" x2="350" y2="220" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
        {/* Arrow markers */}
        <polygon points="348,206 356,210 348,214" fill="hsl(0, 80%, 55%)" />
        <polygon points="348,216 356,220 348,224" fill="hsl(220, 80%, 55%)" />

        {/* Inverter */}
        <g transform="translate(350, 150)">
          <rect x="0" y="0" width="220" height="120" rx="6" fill="hsl(220, 42%, 14%)" stroke="hsl(200, 50%, 35%)" strokeWidth="2" />
          <text x="110" y="22" fontSize="11" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">
            {systemLabel} INVERTER
          </text>
          <text x="110" y="38" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
            {inverter ? `${inverter.voltage}V / ${inverter.power}W` : ''}
          </text>
          {/* Inner blocks */}
          <rect x="20" y="50" width="180" height="22" rx="3" fill="hsl(220, 30%, 20%)" stroke="hsl(215, 25%, 25%)" />
          <text x="110" y="65" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">MPPT CHARGE CONTROLLER</text>
          <rect x="20" y="78" width="85" height="18" rx="3" fill="hsl(220, 30%, 20%)" stroke="hsl(215, 25%, 25%)" />
          <text x="62" y="90" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">
            {inverter ? `${inverter.voltage}V BATTERY INPUT` : 'BATTERY INPUT'}
          </text>
          <rect x="115" y="78" width="85" height="18" rx="3" fill="hsl(220, 30%, 20%)" stroke="hsl(215, 25%, 25%)" />
          <text x="157" y="90" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">AC OUTPUT 230V~</text>
        </g>

        {/* AC output line to distribution panel */}
        <line x1="570" y1="240" x2="650" y2="240" stroke="hsl(42, 100%, 50%)" strokeWidth="2.5" />
        <polygon points="648,236 656,240 648,244" fill="hsl(42, 100%, 50%)" />

        {showGrid && (
          <>
            {/* Grid connection line */}
            <line x1="570" y1="160" x2="850" y2="160" stroke="hsl(0, 80%, 55%)" strokeWidth="3" />
            <text x="710" y="152" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(0, 80%, 55%)" textAnchor="middle">RED ELECTRICA</text>
          </>
        )}

        {/* AC Distribution Panel */}
        <g transform="translate(650, 195)">
          <rect x="0" y="0" width="180" height="110" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1.5" />
          <text x="90" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">AC DISTRIBUTION PANEL</text>
          <g transform="translate(15, 28)">
            <rect x="0" y="0" width="12" height="12" rx="2" fill="hsl(200, 70%, 45%)" />
            <text x="2" y="10" fontSize="8" fill="hsl(220, 40%, 10%)" fontFamily="JetBrains Mono" fontWeight="bold">I</text>
            <text x="18" y="10" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">MAIN BREAKER</text>
          </g>
          <g transform="translate(15, 48)">
            <rect x="0" y="0" width="12" height="12" rx="2" fill="hsl(42, 100%, 50%)" />
            <text x="2" y="10" fontSize="8" fill="hsl(220, 40%, 10%)" fontFamily="JetBrains Mono" fontWeight="bold">!</text>
            <text x="18" y="10" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">RCD / SURGE PROTECTOR</text>
          </g>
          <g transform="translate(15, 68)">
            <rect x="0" y="0" width="12" height="12" rx="6" fill="hsl(200, 70%, 45%)" />
            <text x="6" y="9" fontSize="7" fill="hsl(220, 40%, 10%)" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">+</text>
            <text x="18" y="10" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">AC LOADS</text>
          </g>
          <text x="90" y="100" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(215, 15%, 55%)" textAnchor="middle">Household Circuits</text>
        </g>

        {showBatteries && battery && (
          <>
            {/* DC lines from inverter to batteries */}
            <line x1="390" y1="270" x2="390" y2="340" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
            <line x1="400" y1="270" x2="400" y2="340" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
            <polygon points="386,338 390,348 394,338" fill="hsl(0, 80%, 55%)" />
            <polygon points="396,338 400,348 404,338" fill="hsl(220, 80%, 55%)" />

            {/* DC Breaker */}
            <g transform="translate(340, 320)">
              <rect x="0" y="0" width="110" height="25" rx="3" fill="hsl(220, 38%, 16%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1" />
              <text x="55" y="16" fontSize="8" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)" textAnchor="middle">DC BREAKER</text>
            </g>

            {/* Battery Bank */}
            <g transform="translate(100, 340)">
              <rect x="0" y="0" width="200" height="90" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1.5" />
              <text x="100" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 90%)" textAnchor="middle" fontWeight="bold">BATTERY BANK</text>
              <text x="100" y="34" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(42, 100%, 50%)" textAnchor="middle">
                {battery.voltage}V / {(battery.capacityWh / 1000).toFixed(1)} kWh
              </text>
              {/* Battery icons */}
              {Array.from({ length: Math.min(4, 4) }).map((_, i) => (
                <g key={i} transform={`translate(${20 + i * 28}, 44)`}>
                  <rect x="0" y="0" width="22" height="32" rx="2" fill="hsl(220, 30%, 20%)" stroke="hsl(200, 50%, 35%)" strokeWidth="1" />
                  <rect x="6" y="-3" width="10" height="4" rx="1" fill="hsl(200, 50%, 35%)" />
                </g>
              ))}
              <text x="100" y="86" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(215, 15%, 55%)" textAnchor="middle">
                {battery.chemistry} — {battery.brand} — SKU: {battery.sku}
              </text>
            </g>

            {/* Lines from battery bank to DC breaker */}
            <line x1="300" y1="385" x2="350" y2="385" stroke="hsl(220, 80%, 55%)" strokeWidth="2" />
            <line x1="300" y1="375" x2="350" y2="375" stroke="hsl(0, 80%, 55%)" strokeWidth="2" />
          </>
        )}

        {/* Grounding */}
        <g transform="translate(450, 430)">
          <rect x="0" y="0" width="160" height="60" rx="4" fill="hsl(220, 38%, 16%)" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="80" y="18" fontSize="10" fontFamily="JetBrains Mono" fill="hsl(50, 90%, 55%)" textAnchor="middle" fontWeight="bold">GROUNDING</text>
          <g transform="translate(15, 26)">
            <text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ GROUND BUS</text>
          </g>
          <g transform="translate(15, 40)">
            <text x="0" y="8" fontSize="7" fontFamily="JetBrains Mono" fill="hsl(210, 20%, 75%)">+ EARTH ROD</text>
          </g>
        </g>

        {/* Ground line */}
        <line x1="460" y1="270" x2="460" y2="430" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="6 3" />
        <line x1="460" y1="430" x2="450" y2="430" stroke="hsl(50, 90%, 55%)" strokeWidth="1.5" strokeDasharray="6 3" />
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
      {/* Support structure */}
      <line x1={startX + 10} y1="75" x2={startX + 10} y2="85" stroke="hsl(215, 15%, 45%)" strokeWidth="2" />
      <line x1={startX + totalWidth - 10} y1="75" x2={startX + totalWidth - 10} y2="85" stroke="hsl(215, 15%, 45%)" strokeWidth="2" />
      <line x1={startX} y1="85" x2={startX + totalWidth} y2="85" stroke="hsl(215, 15%, 45%)" strokeWidth="2" />

      {Array.from({ length: displayCount }).map((_, i) => (
        <g key={i} transform={`translate(${startX + i * (panelWidth + gap)}, 10)`}>
          <rect x="0" y="0" width={panelWidth} height="65" rx="1"
            fill="hsl(220, 50%, 25%)" stroke="hsl(200, 50%, 35%)" strokeWidth="0.8" />
          {/* Grid lines */}
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
