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

export interface CableOption {
  id: string;
  label: string;
  section: string; // mm²
  type: 'dc' | 'ac' | 'tierra';
  maxAmps: number;
  description: string;
}

export interface SolarConfig {
  systemType: SystemType;
  inverterId: string;
  batteryId: string;
  panelId: string;
  cableDcPanelId: string;
  cableDcBatteryId: string;
  cableAcId: string;
  cableTierraId: string;
}

export const CABLE_OPTIONS: CableOption[] = [
  // Cables DC - Panel a Inversor
  { id: 'dc-4mm', label: 'Cable Solar DC 4mm²', section: '4mm²', type: 'dc', maxAmps: 30, description: 'Hasta 1000W — 30A máx.' },
  { id: 'dc-6mm', label: 'Cable Solar DC 6mm²', section: '6mm²', type: 'dc', maxAmps: 40, description: 'Hasta 2000W — 40A máx.' },
  { id: 'dc-10mm', label: 'Cable Solar DC 10mm²', section: '10mm²', type: 'dc', maxAmps: 60, description: 'Hasta 5000W — 60A máx.' },
  { id: 'dc-16mm', label: 'Cable Solar DC 16mm²', section: '16mm²', type: 'dc', maxAmps: 80, description: 'Hasta 8000W — 80A máx.' },
  { id: 'dc-25mm', label: 'Cable Solar DC 25mm²', section: '25mm²', type: 'dc', maxAmps: 120, description: 'Hasta 12000W — 120A máx.' },
  { id: 'dc-35mm', label: 'Cable Solar DC 35mm²', section: '35mm²', type: 'dc', maxAmps: 150, description: 'Hasta 15000W — 150A máx.' },
  // Cables AC
  { id: 'ac-2.5mm', label: 'Cable AC 2.5mm²', section: '2.5mm²', type: 'ac', maxAmps: 20, description: 'Hasta 4400W — 20A máx.' },
  { id: 'ac-4mm', label: 'Cable AC 4mm²', section: '4mm²', type: 'ac', maxAmps: 32, description: 'Hasta 7000W — 32A máx.' },
  { id: 'ac-6mm', label: 'Cable AC 6mm²', section: '6mm²', type: 'ac', maxAmps: 40, description: 'Hasta 8800W — 40A máx.' },
  { id: 'ac-10mm', label: 'Cable AC 10mm²', section: '10mm²', type: 'ac', maxAmps: 63, description: 'Hasta 13860W — 63A máx.' },
  // Cable de Tierra
  { id: 'tierra-4mm', label: 'Cable Tierra 4mm²', section: '4mm²', type: 'tierra', maxAmps: 30, description: 'Verde/Amarillo — Sistemas hasta 3kW' },
  { id: 'tierra-6mm', label: 'Cable Tierra 6mm²', section: '6mm²', type: 'tierra', maxAmps: 40, description: 'Verde/Amarillo — Sistemas hasta 8kW' },
  { id: 'tierra-10mm', label: 'Cable Tierra 10mm²', section: '10mm²', type: 'tierra', maxAmps: 60, description: 'Verde/Amarillo — Sistemas hasta 15kW' },
];

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
  // Pylontech
  { id: 'rt12100g31', sku: 'RT12100G31', label: 'Pylontech 12.8V 1280Wh', brand: 'Pylontech', voltage: 12.8, capacityAh: 100, capacityWh: 1280, chemistry: 'LiFePO4' },
  { id: 'up2500', sku: 'UP2500', label: 'Pylontech 24V 2840Wh', brand: 'Pylontech', voltage: 24, capacityAh: 118, capacityWh: 2840, chemistry: 'LiFePO4' },
  { id: 'us3000c', sku: 'US3000C', label: 'Pylontech 48V 3552Wh', brand: 'Pylontech', voltage: 48, capacityAh: 74, capacityWh: 3552, chemistry: 'LiFePO4' },
  { id: 'up5000', sku: 'UP5000', label: 'Pylontech 48V 4800Wh', brand: 'Pylontech', voltage: 48, capacityAh: 100, capacityWh: 4800, chemistry: 'LiFePO4' },
  { id: 'us5000', sku: 'US5000', label: 'Pylontech 48V 4800Wh (US5000)', brand: 'Pylontech', voltage: 48, capacityAh: 100, capacityWh: 4800, chemistry: 'LiFePO4' },
  { id: 'uf5000', sku: 'UF5000', label: 'Pylontech 51.2V 5120Wh', brand: 'Pylontech', voltage: 51.2, capacityAh: 100, capacityWh: 5120, chemistry: 'LiFePO4' },
  // Dyness
  { id: 'ar12', sku: 'AR1.2', label: 'Dyness AR1.2 12.8V 1280Wh IP65', brand: 'Dyness', voltage: 12.8, capacityAh: 100, capacityWh: 1280, chemistry: 'LiFePO4' },
  { id: 'b3', sku: 'B3', label: 'Dyness B3 48V 3600Wh', brand: 'Dyness', voltage: 48, capacityAh: 75, capacityWh: 3600, chemistry: 'LiFePO4' },
  { id: 'bx51100', sku: 'BX51100', label: 'Dyness BX51100 51.2V 5120Wh', brand: 'Dyness', voltage: 51.2, capacityAh: 100, capacityWh: 5120, chemistry: 'LiFePO4' },
  { id: 'powerbox-g2', sku: 'Powerbox G2', label: 'Dyness Powerbox G2 51.2V 10240Wh IP65', brand: 'Dyness', voltage: 51.2, capacityAh: 200, capacityWh: 10240, chemistry: 'LiFePO4' },
  { id: 'powerbrick', sku: 'PowerBrick', label: 'Dyness Powerbrick 51.2V 14366Wh', brand: 'Dyness', voltage: 51.2, capacityAh: 280, capacityWh: 14366, chemistry: 'LiFePO4' },
  // Ritar
  { id: 'ritar-12-100', sku: 'LFP12.8V100AH G2', label: 'Ritar 12.8V 100Ah (1.28kWh)', brand: 'Ritar', voltage: 12.8, capacityAh: 100, capacityWh: 1280, chemistry: 'LiFePO4' },
  { id: 'ritar-12-200', sku: 'LFP12.8V200AH G2', label: 'Ritar 12.8V 200Ah (2.56kWh)', brand: 'Ritar', voltage: 12.8, capacityAh: 200, capacityWh: 2560, chemistry: 'LiFePO4' },
  { id: 'ritar-25-100', sku: 'LFP25.6V100AH G2', label: 'Ritar 25.6V 100Ah (2.56kWh)', brand: 'Ritar', voltage: 25.6, capacityAh: 100, capacityWh: 2560, chemistry: 'LiFePO4' },
  { id: 'ritar-48-100', sku: 'R-LFP48V100Ah', label: 'Ritar 48V 100Ah (4.8kWh)', brand: 'Ritar', voltage: 48, capacityAh: 100, capacityWh: 4800, chemistry: 'LiFePO4' },
  // GoodWe
  { id: 'lynx-a-g3', sku: 'LX A5.0-30', label: 'GoodWe Lynx A G3 51.2V 5kWh', brand: 'GoodWe', voltage: 51.2, capacityAh: 100, capacityWh: 5000, chemistry: 'LiFePO4' },
  { id: 'lynx-u-g3', sku: 'LX U5.0-30', label: 'GoodWe Lynx U G3 51.2V 5kWh IP65', brand: 'GoodWe', voltage: 51.2, capacityAh: 100, capacityWh: 5000, chemistry: 'LiFePO4' },
];

export const PANEL_OPTIONS: PanelOption[] = [
  // Enertik - Potencias chicas/medianas
  { id: 'ps-10m', sku: 'PS-10M', label: 'Monocristalino 10W', brand: 'Enertik', watts: 10, technology: 'Mono' },
  { id: 'ps-30', sku: 'PS-30', label: 'Policristalino 30W', brand: 'Enertik', watts: 30, technology: 'Poli' },
  { id: 'ps-30m', sku: 'PS-30M', label: 'Monocristalino 30W', brand: 'Enertik', watts: 30, technology: 'Mono' },
  { id: 'ps-50', sku: 'PS-50', label: 'Policristalino 50W', brand: 'Enertik', watts: 50, technology: 'Poli' },
  { id: 'ps-50m', sku: 'PS-50M', label: 'Monocristalino 50W', brand: 'Enertik', watts: 50, technology: 'Mono' },
  { id: 'ps-90', sku: 'PS-90', label: 'Policristalino 90W', brand: 'Enertik', watts: 90, technology: 'Poli' },
  { id: 'ps-100m', sku: 'PS-100M', label: 'Monocristalino 100W', brand: 'Enertik', watts: 100, technology: 'Mono' },
  { id: 'ps-120', sku: 'PS-120', label: 'Policristalino 120W', brand: 'Enertik', watts: 120, technology: 'Poli' },
  { id: 'ps-170m', sku: 'PS-170M', label: 'Monocristalino 170W', brand: 'Enertik', watts: 170, technology: 'Mono' },
  { id: 'ps-210m', sku: 'PS-210M', label: 'Monocristalino 210W', brand: 'Enertik', watts: 210, technology: 'Mono' },
  { id: 'ps-370m', sku: 'PS-370M', label: 'Monocristalino 370W', brand: 'Enertik', watts: 370, technology: 'Mono' },
  // Amerisolar
  { id: 'as-440w', sku: 'AS-7M108N-BHC-440W', label: 'N-TOPCON 440W', brand: 'Amerisolar', watts: 440, technology: 'N-TOPCon' },
  { id: 'as-500w', sku: 'AS-7M132-HC-500W', label: 'Monocristalino 500W', brand: 'Amerisolar', watts: 500, technology: 'Mono' },
  // Trina Solar
  { id: 'trina-450', sku: 'TSM-450NEG9R.28', label: 'Vertex+ N-Type TOPCon 450W', brand: 'Trina Solar', watts: 450, technology: 'N-TOPCon' },
  // Hanersun
  { id: 'hanersun-500', sku: 'HN21RN-54HT500W', label: 'N-TOPCon Bifacial 500W', brand: 'Hanersun', watts: 500, technology: 'N-TOPCon Bifacial' },
];

export const ACCESSORIES = [
  'Conectores MC4',
  'Cable Solar 6mm',
  'Fusibles DC',
  'Breaker AC',
  'Protector de Sobretensiones',
  'Barra de Tierra',
];
