import { InverterOption, BatteryOption, PanelOption, CableOption, ChargerOption, BreakerOption, BATTERY_OPTIONS, PANEL_OPTIONS, CABLE_OPTIONS, CHARGER_OPTIONS, BREAKER_OPTIONS } from '@/types/solar';

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
  // On-grid no usa cargador externo
  if (inverter.type === 'on-grid') return [];
  // Si el inversor ya tiene cargador integrado, no se necesita externo
  if (inverter.hasCharger) return [];
  
  // Filtrar por voltaje compatible
  const range = VOLTAGE_RANGES[inverter.voltage];
  if (!range) return CHARGER_OPTIONS;
  
  return CHARGER_OPTIONS.filter(c => {
    // Los reguladores 12/24V son compatibles con sistemas 12V y 24V
    if (c.voltage === 12 && (inverter.voltage === 12 || inverter.voltage === 24)) return true;
    // Los reguladores 48V son compatibles con sistemas 48V
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
    // Breaker debe soportar al menos la corriente nominal
    return breakers.filter(b => b.amps >= currentDc * 0.8 && b.amps <= currentDc * 2);
  }
  
  // AC
  const currentAc = inverter.power / 220;
  return breakers.filter(b => b.amps >= currentAc * 0.8 && b.amps <= currentAc * 2);
}
