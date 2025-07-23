// Domain Model for Vertical Farming Container Control Panel


// Enums

container_type: 'physical' | 'virtual';

container_purpose: 'development' | 'research' | 'production';

container_status: 'created' | 'active' | 'maintenance' | 'inactive';

alert_severity: 'low' | 'medium' | 'high' | 'critical';

device_status: 'running' | 'idle' | 'issue' | 'offline';


// 1. Container

container: {

id: string,

name: string, // unique

type: container_type,

tenant_id: string,

purpose: container_purpose,

seed_types: seed_type[],

location?: {

city: string,

country: string,

address?: string,

},

notes?: string,

settings: container_settings,

environment: container_environment,

inventory: {

tray_ids: string[],

panel_ids: string[],

},

metrics: {

yield_kg: number,

space_utilization_percentage: number

}

status: container_status,

created_at: Date,

updated_at: Date,

alerts: alert[],

}


container_settings: {

shadow_service_enabled: boolean,

copied_environment_from?: string,

robotics_simulation_enabled?: boolean,

ecosystem?: {

fa_environment?: fa_environment,

pya_environment?: pya_environment,

aws_environment?: aws_environment,

mbai_environment?: mbai_environment,

fh_environment?: fh_environment,

}

}


container_environment: {

air_temperature: number,

humidity: number,

co2: number,

nursery_station: {

water_temperature: number,

ec: number,

ph: number,

water_hours: number,

light_hours: number

},

cultivation_area: {

water_temperature: number,

ec: number,

ph: number,

water_hours: number,

light_hours: number

},

}


container_snapshot: {

id: string,

container_id: string,

timestamp: Date,

type: container_type,

status: container_status,

tenant_id: string,

purpose: container_purpose,

seed_types: seed_type[],

location?: {

city: string,

country: string,

address?: string,

},

settings: container_settings,

environment: container_environment,

inventory: {

tray_ids: string[],

panel_ids: string[],

},

metrics: {

yield_kg: number,

space_utilization_percentage: number

}

}


seed_type: {

id: string,

name: string,

variety?: string,

supplier?: string,

batch_id?: string,

}


activity_log: {

id: string,

container_id: string,

timestamp: Date,

action_type: string,

actor_type: actor_type,

actor_id: string,

description: string,

}


// 2. Tenant

tenant: {

id: string,

name: string,

}
