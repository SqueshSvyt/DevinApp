export type ContainerType = 'physical' | 'virtual';
export type ContainerPurpose = 'development' | 'research' | 'production';
export type ContainerStatus = 'created' | 'active' | 'maintenance' | 'inactive';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Location {
  city: string;
  country: string;
  address?: string;
}

export interface SeedType {
  id: string;
  name: string;
  variety?: string;
  supplier?: string;
  batch_id?: string;
}

export interface ContainerSettings {
  shadow_service_enabled: boolean;
  copied_environment_from?: string;
  robotics_simulation_enabled?: boolean;
  ecosystem?: Record<string, any>;
}

export interface ContainerEnvironment {
  air_temperature?: number;
  humidity?: number;
  co2?: number;
  nursery_station?: {
    water_temperature: number;
    ec: number;
    ph: number;
    water_hours: number;
    light_hours: number;
  };
  cultivation_area?: {
    water_temperature: number;
    ec: number;
    ph: number;
    water_hours: number;
    light_hours: number;
  };
}

export interface ContainerInventory {
  tray_ids: string[];
  panel_ids: string[];
}

export interface ContainerMetrics {
  yield_kg?: number;
  space_utilization_percentage?: number;
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  timestamp: Date;
}

export interface Container {
  id: string;
  name: string;
  type: ContainerType;
  tenant: string;
  purpose: ContainerPurpose;
  seed_types: SeedType[];
  location?: Location;
  notes?: string;
  settings: ContainerSettings;
  environment: ContainerEnvironment;
  inventory: ContainerInventory;
  metrics: ContainerMetrics;
  status: ContainerStatus;
  created: Date;
  modified: Date;
  has_alert: boolean;
}

export interface ContainerFilters {
  search: string;
  type: string;
  tenant: string;
  purpose: string;
  status: string;
  hasAlerts: boolean;
}

export interface ContainerListResponse {
  containers: Container[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface PerformanceMetrics {
  physical: {
    count: number;
    avg_yield: number;
    total_yield: number;
    avg_utilization: number;
    yield_data: number[];
    utilization_data: number[];
  };
  virtual: {
    count: number;
    avg_yield: number;
    total_yield: number;
    avg_utilization: number;
    yield_data: number[];
    utilization_data: number[];
  };
}

export interface ContainerCreateData {
  name: string;
  type: ContainerType;
  tenant: string;
  purpose: ContainerPurpose;
  seed_types: SeedType[];
  location?: Location;
  notes?: string;
  settings: ContainerSettings;
  environment: ContainerEnvironment;
}

export interface ContainerUpdateData {
  tenant?: string;
  purpose?: ContainerPurpose;
  seed_types?: SeedType[];
  location?: Location;
  notes?: string;
  settings?: ContainerSettings;
  environment?: ContainerEnvironment;
  status?: ContainerStatus;
}
