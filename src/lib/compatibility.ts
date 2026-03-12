import { InverterOption, BatteryOption, PanelOption, BATTERY_OPTIONS, PANEL_OPTIONS } from '@/types/solar';

/**
 * Reglas de compatibilidad basadas en los documentos técnicos de Enertik:
 * 
 * 1. Inversor-Batería: El voltaje nominal debe coincidir
 *    - Inversor 12V → Baterías 12-12.8V
 *    - Inversor 24V → Baterías 24-25.6V
 *    - Inversor 48V → Baterías 48-51.2V
 * 
 * 2. Inversor-Panel: Todos los paneles son compatibles con inversores MPPT,
 *    pero para PWM (off-grid pequeños) se recomienda voltaje adecuado.
 *    Paneles de baja potencia (≤210W) para inversores ≤3kW,
 *    paneles de alta potencia para inversores más grandes.
 */

const VOLTAGE_RANGES: Record<number, [number, number]> = {
  12: [12, 13],
  24: [24, 26],
  48: [48, 52],
};

export function getCompatibleBatteries(inverter: InverterOption | undefined): BatteryOption[] {
  if (!inverter) return BATTERY_OPTIONS;
  
  // On-grid no usa baterías
  if (inverter.type === 'on-grid') return [];

  const range = VOLTAGE_RANGES[inverter.voltage];
  if (!range) return BATTERY_OPTIONS;

  return BATTERY_OPTIONS.filter(b => b.voltage >= range[0] && b.voltage <= range[1]);
}

export function getCompatiblePanels(inverter: InverterOption | undefined): PanelOption[] {
  if (!inverter) return PANEL_OPTIONS;

  // Para inversores de baja potencia (≤1000W), paneles hasta 210W son ideales
  // Para inversores de media potencia (≤3000W), paneles hasta 370W
  // Para inversores de alta potencia (>3000W), paneles de alta potencia (≥370W) recomendados
  // Pero no restringimos completamente, solo ordenamos por relevancia

  // On-grid y híbridos grandes necesitan paneles de alta potencia
  if (inverter.type === 'on-grid' || inverter.power >= 5000) {
    return PANEL_OPTIONS.filter(p => p.watts >= 370);
  }

  // Inversores pequeños (≤1000W): paneles chicos/medianos
  if (inverter.power <= 1000) {
    return PANEL_OPTIONS.filter(p => p.watts <= 210);
  }

  // Inversores medianos (1001-3000W): paneles medianos
  if (inverter.power <= 3000) {
    return PANEL_OPTIONS.filter(p => p.watts >= 50 && p.watts <= 500);
  }

  // Inversores 3001-4999W: paneles medianos/grandes
  return PANEL_OPTIONS.filter(p => p.watts >= 170);
}
