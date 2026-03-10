export type SystemType = 'off-grid' | 'on-grid' | 'hybrid';

export interface InverterOption {
  id: string;
  label: string;
  voltage: number;
  power: number;
  type: SystemType;
}

export interface BatteryOption {
  id: string;
  label: string;
  voltage: number;
  capacity: number;
  count: number;
  chemistry: string;
}

export interface PanelOption {
  id: string;
  label: string;
  totalKwp: number;
  panelCount: number;
  panelWatts: number;
}

export interface SolarConfig {
  systemType: SystemType;
  inverterId: string;
  batteryId: string;
  panelId: string;
}

export const INVERTER_OPTIONS: InverterOption[] = [
  { id: 'inv-1', label: '24 V / 1500 W', voltage: 24, power: 1500, type: 'off-grid' },
  { id: 'inv-2', label: '48 V / 3000 W', voltage: 48, power: 3000, type: 'off-grid' },
  { id: 'inv-3', label: '48 V / 5000 W', voltage: 48, power: 5000, type: 'off-grid' },
  { id: 'inv-4', label: '48 V / 8000 W', voltage: 48, power: 8000, type: 'off-grid' },
  { id: 'inv-5', label: '220V / 3000 W', voltage: 220, power: 3000, type: 'on-grid' },
  { id: 'inv-6', label: '220V / 5000 W', voltage: 220, power: 5000, type: 'on-grid' },
  { id: 'inv-7', label: '48 V / 5000 W Hibrido', voltage: 48, power: 5000, type: 'hybrid' },
  { id: 'inv-8', label: '48 V / 8000 W Hibrido', voltage: 48, power: 8000, type: 'hybrid' },
];

export const BATTERY_OPTIONS: BatteryOption[] = [
  { id: 'bat-1', label: '24 V / 5 kWh', voltage: 24, capacity: 5, count: 2, chemistry: 'Litio' },
  { id: 'bat-2', label: '48 V / 10 kWh', voltage: 48, capacity: 10, count: 2, chemistry: 'Litio' },
  { id: 'bat-3', label: '48 V / 20 kWh', voltage: 48, capacity: 20, count: 4, chemistry: 'Litio' },
  { id: 'bat-4', label: '48 V / 30 kWh', voltage: 48, capacity: 30, count: 6, chemistry: 'Litio' },
];

export const PANEL_OPTIONS: PanelOption[] = [
  { id: 'pan-1', label: '2.0 kWp (aprox.)', totalKwp: 2.0, panelCount: 4, panelWatts: 500 },
  { id: 'pan-2', label: '3.5 kWp (aprox.)', totalKwp: 3.5, panelCount: 7, panelWatts: 500 },
  { id: 'pan-3', label: '5.0 kWp (aprox.)', totalKwp: 5.0, panelCount: 10, panelWatts: 500 },
  { id: 'pan-4', label: '6.5 kWp (aprox.)', totalKwp: 6.5, panelCount: 13, panelWatts: 500 },
  { id: 'pan-5', label: '10 kWp (aprox.)', totalKwp: 10, panelCount: 20, panelWatts: 500 },
];

export const ACCESSORIES = [
  'Conectores MC4',
  'Cable Solar 6mm',
  'Fusibles DC',
  'Breaker AC',
  'Protector de Sobretensiones',
  'Barra de Tierra',
];
