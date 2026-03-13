import { SolarConfig, INVERTER_OPTIONS, BATTERY_OPTIONS, PANEL_OPTIONS, CABLE_OPTIONS } from '@/types/solar';
import { layout } from "@/lib/diagramLayout";

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

  const showBatteries = config.systemType !== 'on-grid';
  const showGrid = config.systemType !== 'off-grid';

  const systemLabel =
    config.systemType === 'off-grid'
      ? 'AISLADO (OFF-GRID)'
      : config.systemType === 'on-grid'
      ? 'CONECTADO A RED (ON-GRID)'
      : 'HIBRIDO';

  return (
    <div className="diagram-container blueprint-grid w-full h-full overflow-auto p-4 flex flex-col">

      <svg viewBox="0 0 900 580" className="w-full flex-1">

        {/* PANEL GROUP */}

        <g transform={`translate(${layout.column1},${layout.rowPanels})`}>

          <SolarPanelGroup panelCount={4} />

          <text x="100" y="95" className="fill-black" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
            PANELES SOLARES
          </text>

          <text x="100" y="108" className="fill-black" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">
            {panel ? `${panel.watts}W ${panel.brand}` : ''}
          </text>

        </g>

        {/* PANEL → COMBINER */}

        <line
          x1={layout.column1 + 100}
          y1={layout.rowPanels + 100}
          x2={layout.column1 + 100}
          y2={layout.rowCombiner}
          stroke="hsl(0,80%,55%)"
          strokeWidth="2"
        />

        <line
          x1={layout.column1 + 110}
          y1={layout.rowPanels + 100}
          x2={layout.column1 + 110}
          y2={layout.rowCombiner}
          stroke="hsl(220,80%,55%)"
          strokeWidth="2"
        />

        {cableDcPanel && (
          <g>
            <rect
              x={layout.column1 + 120}
              y={layout.rowPanels + 105}
              width="90"
              height="20"
              rx="3"
              fill="hsl(220,38%,16%)"
            />

            <text
              x={layout.column1 + 165}
              y={layout.rowPanels + 118}
              fontSize="7"
              fontFamily="JetBrains Mono"
              fill="hsl(42,100%,50%)"
              textAnchor="middle"
            >
              DC {cableDcPanel.section}
            </text>
          </g>
        )}

        {/* COMBINER BOX */}

        <g transform={`translate(${layout.column1 - 40},${layout.rowCombiner})`}>

          <rect width="160" height="80" rx="4"
            fill="hsl(220,38%,16%)"
            stroke="hsl(200,50%,35%)"
            strokeWidth="1.5"
          />

          <text x="80" y="18" fontSize="10" fontFamily="JetBrains Mono"
            fill="hsl(210,20%,90%)"
            textAnchor="middle"
            fontWeight="bold"
          >
            CAJA COMBINADORA DC
          </text>

          <text x="20" y="40" fontSize="8" fill="hsl(210,20%,75%)">FUSIBLES DC</text>
          <text x="20" y="55" fontSize="8" fill="hsl(210,20%,75%)">SECCIONADOR DC</text>
          <text x="20" y="70" fontSize="8" fill="hsl(210,20%,75%)">SPD</text>

        </g>

        {/* COMBINER → INVERSOR */}

        <line
          x1={layout.column1 + 120}
          y1={layout.rowCombiner + 40}
          x2={layout.column2}
          y2={layout.rowCombiner + 40}
          stroke="hsl(0,80%,55%)"
          strokeWidth="2"
        />

        <line
          x1={layout.column1 + 120}
          y1={layout.rowCombiner + 50}
          x2={layout.column2}
          y2={layout.rowCombiner + 50}
          stroke="hsl(220,80%,55%)"
          strokeWidth="2"
        />

        {/* INVERSOR */}

        <g transform={`translate(${layout.column2},${layout.rowBatteries})`}>

          <rect width="220" height="120" rx="6"
            fill="hsl(220,42%,14%)"
            stroke="hsl(200,50%,35%)"
            strokeWidth="2"
          />

          <text x="110" y="22"
            fontSize="11"
            fontFamily="JetBrains Mono"
            fill="hsl(210,20%,90%)"
            textAnchor="middle"
            fontWeight="bold"
          >
            INVERSOR {systemLabel}
          </text>

          <text x="110" y="38"
            fontSize="10"
            fontFamily="JetBrains Mono"
            fill="hsl(42,100%,50%)"
            textAnchor="middle"
          >
            {inverter ? `${inverter.voltage}V / ${inverter.power}W` : ''}
          </text>

        </g>

        {/* INVERSOR → TABLERO AC */}

        <line
          x1={layout.column2 + 220}
          y1={layout.rowBatteries + 60}
          x2={layout.column3}
          y2={layout.rowBatteries + 60}
          stroke="hsl(42,100%,50%)"
          strokeWidth="2.5"
        />

        {cableAc && (
          <text
            x={layout.column2 + 250}
            y={layout.rowBatteries + 75}
            fontSize="7"
            fill="hsl(42,100%,50%)"
            fontFamily="JetBrains Mono"
          >
            AC {cableAc.section}
          </text>
        )}

        {/* TABLERO AC */}

        <g transform={`translate(${layout.column3},${layout.rowBatteries})`}>

          <rect width="180" height="110"
            rx="4"
            fill="hsl(220,38%,16%)"
            stroke="hsl(200,50%,35%)"
          />

          <text x="90" y="18"
            fontSize="10"
            fill="hsl(210,20%,90%)"
            fontFamily="JetBrains Mono"
            textAnchor="middle"
            fontWeight="bold"
          >
            TABLERO DE DIST. AC
          </text>

          <text x="20" y="40" fontSize="8" fill="hsl(210,20%,75%)">INTERRUPTOR PRINCIPAL</text>
          <text x="20" y="55" fontSize="8" fill="hsl(210,20%,75%)">DIFERENCIAL</text>
          <text x="20" y="70" fontSize="8" fill="hsl(210,20%,75%)">CARGAS AC</text>

        </g>

        {/* BANCO DE BATERIAS */}

        {showBatteries && battery && (

          <g transform={`translate(${layout.column1},${layout.rowBatteries})`}>

            <rect width="200" height="90"
              rx="4"
              fill="hsl(220,38%,16%)"
              stroke="hsl(200,50%,35%)"
            />

            <text x="100" y="18"
              fontSize="10"
              fontFamily="JetBrains Mono"
              fill="hsl(210,20%,90%)"
              textAnchor="middle"
              fontWeight="bold"
            >
              BANCO DE BATERIAS
            </text>

            <text x="100" y="34"
              fontSize="9"
              fill="hsl(42,100%,50%)"
              textAnchor="middle"
            >
              {battery.voltage}V / {(battery.capacityWh/1000).toFixed(1)} kWh
            </text>

          </g>

        )}

        {/* PUESTA A TIERRA */}

        <g transform="translate(450,460)">

          <rect width="160" height="60"
            rx="4"
            fill="hsl(220,38%,16%)"
            stroke="hsl(50,90%,55%)"
            strokeDasharray="4 2"
          />

          <text x="80" y="18"
            fontSize="10"
            fontFamily="JetBrains Mono"
            fill="hsl(50,90%,55%)"
            textAnchor="middle"
          >
            PUESTA A TIERRA
          </text>

        </g>

      </svg>
    </div>
  );
};

const SolarPanelGroup = ({ panelCount }: { panelCount: number }) => {

  const width = 22;
  const gap = 3;

  return (
    <g>

      {Array.from({ length: panelCount }).map((_, i) => (

        <rect
          key={i}
          x={i * (width + gap)}
          y="10"
          width={width}
          height="65"
          fill="hsl(220,50%,25%)"
          stroke="hsl(200,50%,35%)"
        />

      ))}

    </g>
  );
};

export default SolarDiagram;