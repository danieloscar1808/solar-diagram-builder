import { InverterOption, BatteryOption, PanelOption, CableOption, ChargerOption, BreakerOption, BATTERY_OPTIONS, PANEL_OPTIONS, CABLE_OPTIONS, CHARGER_OPTIONS, BREAKER_OPTIONS } from '@/types/solar';

const VOLTAGE_RANGES: Record<number, [number, number]> = {
  12: [12, 13],
  24: [24, 26],
  48: [48, 52],
};

const STANDARD_BREAKER_AMPS = [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 150, 200];
const STANDARD_CABLE_SECTIONS = [
  { section: '4mm²', maxAmps: 30 },
  { section: '6mm²', maxAmps: 40 },
  { section: '10mm²', maxAmps: 60 },
  { section: '16mm²', maxAmps: 80 },
  { section: '25mm²', maxAmps: 120 },
  { section: '35mm²', maxAmps: 150 },
  { section: '50mm²', maxAmps: 200 },
];

export interface RecommendedBreaker {
  amps: number;
  type: 'dc' | 'ac';
  label: string;
}

export interface RecommendedCable {
  section: string;
  type: 'dc' | 'ac' | 'tierra';
  label: string;
}

export function getRecommendedBreaker(inverter: InverterOption | undefined, type: 'dc' | 'ac'): RecommendedBreaker | null {
  if (!inverter) return null;
  const current = type === 'dc'
    ? (inverter.voltage > 0 ? inverter.power / inverter.voltage : 0)
    : inverter.power / 220;
  const idealAmps = current * 1.25;
  const amps = STANDARD_BREAKER_AMPS.find(a => a >= idealAmps) || STANDARD_BREAKER_AMPS[STANDARD_BREAKER_AMPS.length - 1];
  const label = `Breaker ${type.toUpperCase()} ${amps}A (recomendado)`;
  return { amps, type, label };
}

export function getRecommendedCable(inverter: InverterOption | undefined, type: 'dc' | 'ac' | 'tierra'): RecommendedCable | null {
  if (!inverter) return null;
  const current = type === 'dc'
    ? (inverter.voltage > 0 ? inverter.power / inverter.voltage : 0)
    : type === 'ac'
    ? inverter.power / 220
    : inverter.power / 220 * 0.5;
  const idealAmps = current * 1.25;
  const match = STANDARD_CABLE_SECTIONS.find(c => c.maxAmps >= idealAmps) || STANDARD_CABLE_SECTIONS[STANDARD_CABLE_SECTIONS.length - 1];
  const label = `Cable ${type.toUpperCase()} ${match.section} (recomendado)`;
  return { section: match.section, type, label };
}

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

  const currentDc = inverter.voltage > 0 ? inverter.power / inverter.voltage : 0;
  const currentAc = inverter.power / 220;

  if (type === 'dc') {
    return cables.filter(c => c.maxAmps >= currentDc * 0.8);
  }
  if (type === 'ac') {
    return cables.filter(c => c.maxAmps >= currentAc * 0.8);
  }
  if (inverter.power <= 3000) return cables;
  if (inverter.power <= 8000) return cables.filter(c => c.section !== '4mm²');
  return cables.filter(c => c.section === '10mm²');
}

export function getCompatibleChargers(inverter: InverterOption | undefined): ChargerOption[] {
  if (!inverter) return CHARGER_OPTIONS;
  if (inverter.type === 'on-grid') return [];
  if (inverter.hasCharger) return [];
  
  const range = VOLTAGE_RANGES[inverter.voltage];
  if (!range) return CHARGER_OPTIONS;
  
  return CHARGER_OPTIONS.filter(c => {
    if (c.voltage === 12 && (inverter.voltage === 12 || inverter.voltage === 24)) return true;
    if (c.voltage === 48 && inverter.voltage === 48) return true;
    return false;
  });
}

export function needsExternalCharger(inverter: InverterOption | undefined): boolean {
  if (!inverter) return false;
  if (inverter.type === 'on-grid') return false;
  return !inverter.hasCharger;
}

export function getCompatibleBreakers(inverter: InverterOption | undefined, type: 'dc' | 'ac'): BreakerOption[] {
  const breakers = BREAKER_OPTIONS.filter(b => b.type === type);
  if (!inverter) return breakers;

  if (type === 'dc') {
    const currentDc = inverter.voltage > 0 ? inverter.power / inverter.voltage : 0;
    const minAmps = Math.max(10, currentDc * 0.3);
    return breakers.filter(b => b.amps >= minAmps * 0.5 && b.amps <= currentDc * 2.5);
  }
  
  // AC
  const currentAc = inverter.power / 220;
  return breakers.filter(b => b.amps >= currentAc * 0.6 && b.amps <= currentAc * 2.5);
}
