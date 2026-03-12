import { InverterOption, BatteryOption, PanelOption, CableOption, BATTERY_OPTIONS, PANEL_OPTIONS, CABLE_OPTIONS } from '@/types/solar';

/**
 * Reglas de compatibilidad basadas en los documentos técnicos de Enertik
 */

const VOLTAGE_RANGES: Record<number, [number, number]> = {
  12: [12, 13],
  24: [24, 26],
  48: [48, 52],
};

export function getCompatibleBatteries(inverter: InverterOption | undefined): BatteryOption[] {
  if (!inverter) return BATTERY_OPTIONS;
  if (inverter.type === 'on-grid') return [];
  const range = VOLTAGE_RANGES[inverter.voltage];
  if (!range) return BATTERY_OPTIONS;
  return BATTERY_OPTIONS.filter(b => b.voltage >= range[0] && b.voltage <= range[1]);
}

export function getCompatiblePanels(inverter: InverterOption | undefined): PanelOption[] {
  if (!inverter) return PANEL_OPTIONS;
  if (inverter.type === 'on-grid' || inverter.power >= 5000) {
    return PANEL_OPTIONS.filter(p => p.watts >= 370);
  }
  if (inverter.power <= 1000) {
    return PANEL_OPTIONS.filter(p => p.watts <= 210);
  }
  if (inverter.power <= 3000) {
    return PANEL_OPTIONS.filter(p => p.watts >= 50 && p.watts <= 500);
  }
  return PANEL_OPTIONS.filter(p => p.watts >= 170);
}

export function getCompatibleCables(inverter: InverterOption | undefined, type: 'dc' | 'ac' | 'tierra'): CableOption[] {
  const cables = CABLE_OPTIONS.filter(c => c.type === type);
  if (!inverter) return cables;

  // Filtrar por capacidad de corriente adecuada al inversor
  const currentDc = inverter.voltage > 0 ? inverter.power / inverter.voltage : 0;
  const currentAc = inverter.power / 220;

  if (type === 'dc') {
    return cables.filter(c => c.maxAmps >= currentDc * 0.8);
  }
  if (type === 'ac') {
    return cables.filter(c => c.maxAmps >= currentAc * 0.8);
  }
  // Tierra: basado en potencia general
  if (inverter.power <= 3000) return cables;
  if (inverter.power <= 8000) return cables.filter(c => c.section !== '4mm²');
  return cables.filter(c => c.section === '10mm²');
}
