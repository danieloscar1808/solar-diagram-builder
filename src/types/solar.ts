export type SystemType = 'off-grid' | 'on-grid' | 'hybrid';

export interface InverterOption {
  id: string;
  sku: string;
  label: string;
  brand: string;
  voltage: number;
  power: number;
  type: SystemType;
}

export interface BatteryOption {
  id: string;
  sku: string;
  label: string;
  brand: string;
  voltage: number;
  capacityAh: number;
  capacityWh: number;
  chemistry: string;
}

export interface PanelOption {
  id: string;
  sku: string;
  label: string;
  brand: string;
  watts: number;
  technology: string;
}

export interface SolarConfig {
  systemType: SystemType;
  inverterId: string;
  batteryId: string;
  panelId: string;
}

export const INVERTER_OPTIONS: InverterOption[] = [
  // OFF-GRID - Enertik PWM
  { id: 'ivp-1k-12', sku: 'IVP-1K-12', label: 'Inversor PWM 12V 1000W', brand: 'Enertik', voltage: 12, power: 1000, type: 'off-grid' },
  { id: 'ivp-2k-24', sku: 'IVP-2K-24', label: 'Inversor PWM 24V 2000W', brand: 'Enertik', voltage: 24, power: 2000, type: 'off-grid' },
  { id: 'ivp-3k-24', sku: 'IVP-3K-24', label: 'Inversor PWM 24V 3000W', brand: 'Enertik', voltage: 24, power: 3000, type: 'off-grid' },
  { id: 'ivp-5k-48', sku: 'IVP-5K-48', label: 'Inversor PWM 48V 5000W', brand: 'Enertik', voltage: 48, power: 5000, type: 'off-grid' },
  // OFF-GRID - Enertik MPPT
  { id: 'ivm-1k-12', sku: 'IVM-1K-12', label: 'Inversor MPPT 12V 1000W', brand: 'Enertik', voltage: 12, power: 1000, type: 'off-grid' },
  { id: 'ivm-2k-24', sku: 'IVM-2K-24', label: 'Inversor MPPT 24V 2000W', brand: 'Enertik', voltage: 24, power: 2000, type: 'off-grid' },
  { id: 'ivm-3k-24', sku: 'IVM-3K-24', label: 'Inversor MPPT 24V 3000W', brand: 'Enertik', voltage: 24, power: 3000, type: 'off-grid' },
  { id: 'ivm-5k-48', sku: 'IVM-5K-48', label: 'Inversor MPPT 48V 5000W', brand: 'Enertik', voltage: 48, power: 5000, type: 'off-grid' },
  { id: 'ivmdp-5k-48', sku: 'IVMDP-5K-48', label: 'Inversor MPPT 48V 5000W (100A)', brand: 'Enertik', voltage: 48, power: 5000, type: 'off-grid' },
  // OFF-GRID - Enertik Alta Potencia
  { id: 'imx-7.2k-48p', sku: 'IMX-7.2K-48P', label: 'Inversor 48V 7200W', brand: 'Enertik', voltage: 48, power: 7200, type: 'off-grid' },
  { id: 'imx-8k-48p', sku: 'IMX-8K-48P', label: 'Inversor 48V 8000W', brand: 'Enertik', voltage: 48, power: 8000, type: 'off-grid' },
  { id: 'imxd-8k-48p', sku: 'IMXD-8K-48P', label: 'Inversor MPPT 48V 8000W', brand: 'Enertik', voltage: 48, power: 8000, type: 'off-grid' },
  { id: 'imxe-11k-48p', sku: 'IMXE-11K-48P', label: 'Inversor 48V 11000W', brand: 'Enertik', voltage: 48, power: 11000, type: 'off-grid' },
  // ON-GRID - Growatt (vendido por Enertik)
  { id: 'mic-1500', sku: 'MIC 1500TL-X', label: 'Growatt MIC 1500W', brand: 'Growatt', voltage: 220, power: 1500, type: 'on-grid' },
  { id: 'mic-2000', sku: 'MIC 2000TL-X', label: 'Growatt MIC 2000W', brand: 'Growatt', voltage: 220, power: 2000, type: 'on-grid' },
  { id: 'mic-2500', sku: 'MIC 2500TL-X', label: 'Growatt MIC 2500W', brand: 'Growatt', voltage: 220, power: 2500, type: 'on-grid' },
  { id: 'min-3000', sku: 'MIN 3000TL-X', label: 'Growatt MIN 3000W', brand: 'Growatt', voltage: 220, power: 3000, type: 'on-grid' },
  { id: 'min-3600', sku: 'MIN 3600TL-X', label: 'Growatt MIN 3600W', brand: 'Growatt', voltage: 220, power: 3600, type: 'on-grid' },
  { id: 'min-4200', sku: 'MIN 4200TL-X', label: 'Growatt MIN 4200W', brand: 'Growatt', voltage: 220, power: 4200, type: 'on-grid' },
  // HIBRIDO - Enertik
  { id: 'hgi-1k-12', sku: 'HGI-1K-12', label: 'Hibrido 12V 1000W', brand: 'Enertik', voltage: 12, power: 1000, type: 'hybrid' },
  { id: 'hgi-10k-48', sku: 'HGI-10K-48', label: 'Hibrido 48V 10000W', brand: 'Enertik', voltage: 48, power: 10000, type: 'hybrid' },
  { id: 'hgwpe-12k-48', sku: 'HGWPE-12K-48PTD', label: 'Hibrido Trifasico 48V 12000W', brand: 'Enertik', voltage: 48, power: 12000, type: 'hybrid' },
  { id: 'hgwpt-15k-48', sku: 'HGWPT-15K-48PT', label: 'Hibrido Trifasico 48V 15000W', brand: 'Enertik', voltage: 48, power: 15000, type: 'hybrid' },
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
