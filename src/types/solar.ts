export type SystemType = 'off-grid' | 'on-grid' | 'hybrid';

export interface InverterOption {
  id: string;
  sku: string;
  label: string;
  brand: string;
  voltage: number;
  power: number;
  type: SystemType;
  hasCharger: boolean; // inversor/cargador integrado
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
  section: string;
  type: 'dc' | 'ac' | 'tierra';
  maxAmps: number;
  description: string;
}

export interface ChargerOption {
  id: string;
  sku: string;
  label: string;
  brand: string;
  voltage: number;
  maxAmps: number;
  power: number;
  technology: 'PWM' | 'MPPT';
}

export interface BreakerOption {
  id: string;
  sku: string;
  label: string;
  brand: string;
  type: 'dc' | 'ac';
  amps: number;
  voltage: number;
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
  chargerId: string;
  cableDcPanelChargerId: string;
  cableDcChargerBatteryId: string;
  breakerDcPanelId: string;
  breakerDcBatteryId: string;
  breakerAcId: string;
}

export const CABLE_OPTIONS: CableOption[] = [
  // Cables DC
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

export const CHARGER_OPTIONS: ChargerOption[] = [
  // Reguladores/Cargadores PWM Enertik
  { id: 'rc-pwm-10', sku: 'RC-PWM-10A', label: 'Regulador PWM 12/24V 10A', brand: 'Enertik', voltage: 12, maxAmps: 10, power: 240, technology: 'PWM' },
  { id: 'rc-pwm-20', sku: 'RC-PWM-20A', label: 'Regulador PWM 12/24V 20A', brand: 'Enertik', voltage: 12, maxAmps: 20, power: 480, technology: 'PWM' },
  { id: 'rc-pwm-30', sku: 'RC-PWM-30A', label: 'Regulador PWM 12/24V 30A', brand: 'Enertik', voltage: 12, maxAmps: 30, power: 720, technology: 'PWM' },
  { id: 'rc-pwm-40', sku: 'RC-PWM-40A', label: 'Regulador PWM 12/24V 40A', brand: 'Enertik', voltage: 12, maxAmps: 40, power: 960, technology: 'PWM' },
  { id: 'rc-pwm-60', sku: 'RC-PWM-60A', label: 'Regulador PWM 12/24V 60A', brand: 'Enertik', voltage: 12, maxAmps: 60, power: 1440, technology: 'PWM' },
  // Reguladores/Cargadores MPPT Enertik
  { id: 'rc-mppt-20', sku: 'RC-MPPT-20A', label: 'Regulador MPPT 12/24V 20A', brand: 'Enertik', voltage: 12, maxAmps: 20, power: 520, technology: 'MPPT' },
  { id: 'rc-mppt-30', sku: 'RC-MPPT-30A', label: 'Regulador MPPT 12/24V 30A', brand: 'Enertik', voltage: 12, maxAmps: 30, power: 780, technology: 'MPPT' },
  { id: 'rc-mppt-40', sku: 'RC-MPPT-40A', label: 'Regulador MPPT 12/24V 40A', brand: 'Enertik', voltage: 12, maxAmps: 40, power: 1040, technology: 'MPPT' },
  { id: 'rc-mppt-60', sku: 'RC-MPPT-60A', label: 'Regulador MPPT 48V 60A', brand: 'Enertik', voltage: 48, maxAmps: 60, power: 3000, technology: 'MPPT' },
  { id: 'rc-mppt-80', sku: 'RC-MPPT-80A', label: 'Regulador MPPT 48V 80A', brand: 'Enertik', voltage: 48, maxAmps: 80, power: 4000, technology: 'MPPT' },
  { id: 'rc-mppt-100', sku: 'RC-MPPT-100A', label: 'Regulador MPPT 48V 100A', brand: 'Enertik', voltage: 48, maxAmps: 100, power: 5000, technology: 'MPPT' },
];

export const BREAKER_OPTIONS: BreakerOption[] = [
  // Breakers DC
  { id: 'bk-dc-10', sku: 'BK-DC-10A', label: 'Breaker DC 10A 500V', brand: 'Enertik', type: 'dc', amps: 10, voltage: 500, description: 'Sistemas hasta 500W' },
  { id: 'bk-dc-16', sku: 'BK-DC-16A', label: 'Breaker DC 16A 500V', brand: 'Enertik', type: 'dc', amps: 16, voltage: 500, description: 'Sistemas hasta 800W' },
  { id: 'bk-dc-20', sku: 'BK-DC-20A', label: 'Breaker DC 20A 500V', brand: 'Enertik', type: 'dc', amps: 20, voltage: 500, description: 'Sistemas hasta 1000W' },
  { id: 'bk-dc-25', sku: 'BK-DC-25A', label: 'Breaker DC 25A 500V', brand: 'Enertik', type: 'dc', amps: 25, voltage: 500, description: 'Sistemas hasta 1500W' },
  { id: 'bk-dc-32', sku: 'BK-DC-32A', label: 'Breaker DC 32A 500V', brand: 'Enertik', type: 'dc', amps: 32, voltage: 500, description: 'Sistemas hasta 2000W' },
  { id: 'bk-dc-40', sku: 'BK-DC-40A', label: 'Breaker DC 40A 600V', brand: 'Enertik', type: 'dc', amps: 40, voltage: 600, description: 'Sistemas hasta 3000W' },
  { id: 'bk-dc-50', sku: 'BK-DC-50A', label: 'Breaker DC 50A 600V', brand: 'Enertik', type: 'dc', amps: 50, voltage: 600, description: 'Sistemas hasta 5000W' },
  { id: 'bk-dc-63', sku: 'BK-DC-63A', label: 'Breaker DC 63A 800V', brand: 'Enertik', type: 'dc', amps: 63, voltage: 800, description: 'Sistemas hasta 8000W' },
  { id: 'bk-dc-80', sku: 'BK-DC-80A', label: 'Breaker DC 80A 800V', brand: 'Enertik', type: 'dc', amps: 80, voltage: 800, description: 'Sistemas hasta 12000W' },
  { id: 'bk-dc-100', sku: 'BK-DC-100A', label: 'Breaker DC 100A 1000V', brand: 'Enertik', type: 'dc', amps: 100, voltage: 1000, description: 'Sistemas hasta 15000W' },
  // Breakers AC
  { id: 'bk-ac-10', sku: 'BK-AC-10A', label: 'Breaker AC 10A 230V', brand: 'Enertik', type: 'ac', amps: 10, voltage: 230, description: 'Sistemas hasta 2200W' },
  { id: 'bk-ac-16', sku: 'BK-AC-16A', label: 'Breaker AC 16A 230V', brand: 'Enertik', type: 'ac', amps: 16, voltage: 230, description: 'Sistemas hasta 3500W' },
  { id: 'bk-ac-20', sku: 'BK-AC-20A', label: 'Breaker AC 20A 230V', brand: 'Enertik', type: 'ac', amps: 20, voltage: 230, description: 'Sistemas hasta 4400W' },
  { id: 'bk-ac-25', sku: 'BK-AC-25A', label: 'Breaker AC 25A 230V', brand: 'Enertik', type: 'ac', amps: 25, voltage: 230, description: 'Sistemas hasta 5500W' },
  { id: 'bk-ac-32', sku: 'BK-AC-32A', label: 'Breaker AC 32A 230V', brand: 'Enertik', type: 'ac', amps: 32, voltage: 230, description: 'Sistemas hasta 7000W' },
  { id: 'bk-ac-40', sku: 'BK-AC-40A', label: 'Breaker AC 40A 230V', brand: 'Enertik', type: 'ac', amps: 40, voltage: 230, description: 'Sistemas hasta 9200W' },
  { id: 'bk-ac-50', sku: 'BK-AC-50A', label: 'Breaker AC 50A 230V', brand: 'Enertik', type: 'ac', amps: 50, voltage: 230, description: 'Sistemas hasta 11500W' },
  { id: 'bk-ac-63', sku: 'BK-AC-63A', label: 'Breaker AC 63A 230V', brand: 'Enertik', type: 'ac', amps: 63, voltage: 230, description: 'Sistemas hasta 14500W' },
];

export const INVERTER_OPTIONS: InverterOption[] = [
  // OFF-GRID - Enertik PWM (tienen cargador integrado)
  { id: 'ivp-1k-12', sku: 'IVP-1K-12', label: 'Inversor PWM 12V 1000W', brand: 'Enertik', voltage: 12, power: 1000, type: 'off-grid', hasCharger: true },
  { id: 'ivp-2k-24', sku: 'IVP-2K-24', label: 'Inversor PWM 24V 2000W', brand: 'Enertik', voltage: 24, power: 2000, type: 'off-grid', hasCharger: true },
  { id: 'ivp-3k-24', sku: 'IVP-3K-24', label: 'Inversor PWM 24V 3000W', brand: 'Enertik', voltage: 24, power: 3000, type: 'off-grid', hasCharger: true },
  { id: 'ivp-5k-48', sku: 'IVP-5K-48', label: 'Inversor PWM 48V 5000W', brand: 'Enertik', voltage: 48, power: 5000, type: 'off-grid', hasCharger: true },
  // OFF-GRID - Enertik MPPT (tienen cargador integrado)
  { id: 'ivm-1k-12', sku: 'IVM-1K-12', label: 'Inversor MPPT 12V 1000W', brand: 'Enertik', voltage: 12, power: 1000, type: 'off-grid', hasCharger: true },
  { id: 'ivm-2k-24', sku: 'IVM-2K-24', label: 'Inversor MPPT 24V 2000W', brand: 'Enertik', voltage: 24, power: 2000, type: 'off-grid', hasCharger: true },
  { id: 'ivm-3k-24', sku: 'IVM-3K-24', label: 'Inversor MPPT 24V 3000W', brand: 'Enertik', voltage: 24, power: 3000, type: 'off-grid', hasCharger: true },
  { id: 'ivm-5k-48', sku: 'IVM-5K-48', label: 'Inversor MPPT 48V 5000W', brand: 'Enertik', voltage: 48, power: 5000, type: 'off-grid', hasCharger: true },
  { id: 'ivmdp-5k-48', sku: 'IVMDP-5K-48', label: 'Inversor MPPT 48V 5000W (100A)', brand: 'Enertik', voltage: 48, power: 5000, type: 'off-grid', hasCharger: true },
  // OFF-GRID - Enertik Alta Potencia (NO tienen cargador integrado - necesitan regulador externo)
  { id: 'imx-7.2k-48p', sku: 'IMX-7.2K-48P', label: 'Inversor 48V 7200W', brand: 'Enertik', voltage: 48, power: 7200, type: 'off-grid', hasCharger: false },
  { id: 'imx-8k-48p', sku: 'IMX-8K-48P', label: 'Inversor 48V 8000W', brand: 'Enertik', voltage: 48, power: 8000, type: 'off-grid', hasCharger: false },
  { id: 'imxd-8k-48p', sku: 'IMXD-8K-48P', label: 'Inversor MPPT 48V 8000W', brand: 'Enertik', voltage: 48, power: 8000, type: 'off-grid', hasCharger: true },
  { id: 'imxe-11k-48p', sku: 'IMXE-11K-48P', label: 'Inversor 48V 11000W', brand: 'Enertik', voltage: 48, power: 11000, type: 'off-grid', hasCharger: false },
  // ON-GRID - Growatt (no usan baterías ni cargador)
  { id: 'mic-1500', sku: 'MIC 1500TL-X', label: 'Growatt MIC 1500W', brand: 'Growatt', voltage: 220, power: 1500, type: 'on-grid', hasCharger: false },
  { id: 'mic-2000', sku: 'MIC 2000TL-X', label: 'Growatt MIC 2000W', brand: 'Growatt', voltage: 220, power: 2000, type: 'on-grid', hasCharger: false },
  { id: 'mic-2500', sku: 'MIC 2500TL-X', label: 'Growatt MIC 2500W', brand: 'Growatt', voltage: 220, power: 2500, type: 'on-grid', hasCharger: false },
  { id: 'min-3000', sku: 'MIN 3000TL-X', label: 'Growatt MIN 3000W', brand: 'Growatt', voltage: 220, power: 3000, type: 'on-grid', hasCharger: false },
  { id: 'min-3600', sku: 'MIN 3600TL-X', label: 'Growatt MIN 3600W', brand: 'Growatt', voltage: 220, power: 3600, type: 'on-grid', hasCharger: false },
  { id: 'min-4200', sku: 'MIN 4200TL-X', label: 'Growatt MIN 4200W', brand: 'Growatt', voltage: 220, power: 4200, type: 'on-grid', hasCharger: false },
  // HIBRIDO - Enertik (tienen cargador integrado)
  { id: 'hgi-1k-12', sku: 'HGI-1K-12', label: 'Hibrido 12V 1000W', brand: 'Enertik', voltage: 12, power: 1000, type: 'hybrid', hasCharger: true },
  { id: 'hgi-10k-48', sku: 'HGI-10K-48', label: 'Hibrido 48V 10000W', brand: 'Enertik', voltage: 48, power: 10000, type: 'hybrid', hasCharger: true },
  { id: 'hgwpe-12k-48', sku: 'HGWPE-12K-48PTD', label: 'Hibrido Trifasico 48V 12000W', brand: 'Enertik', voltage: 48, power: 12000, type: 'hybrid', hasCharger: true },
  { id: 'hgwpt-15k-48', sku: 'HGWPT-15K-48PT', label: 'Hibrido Trifasico 48V 15000W', brand: 'Enertik', voltage: 48, power: 15000, type: 'hybrid', hasCharger: true },
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
  { id: 'as-440w', sku: 'AS-7M108N-BHC-440W', label: 'N-TOPCON 440W', brand: 'Amerisolar', watts: 440, technology: 'N-TOPCon' },
  { id: 'as-500w', sku: 'AS-7M132-HC-500W', label: 'Monocristalino 500W', brand: 'Amerisolar', watts: 500, technology: 'Mono' },
  { id: 'trina-450', sku: 'TSM-450NEG9R.28', label: 'Vertex+ N-Type TOPCon 450W', brand: 'Trina Solar', watts: 450, technology: 'N-TOPCon' },
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
