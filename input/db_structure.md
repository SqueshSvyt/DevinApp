# Vertical Farming Database Structure

This document describes the database schema used for the vertical farming system. The database is a PostgreSQL database that tracks containers, crops, locations, and various metrics for a hydroponic farming operation.

## Tables Overview

### 1. `containers`
Tracks physical or virtual growing containers in the system.

| Column | Type | Description |
|--------|------|-------------|
| id | character varying | Primary key |
| type | character varying | Container type (physical/virtual) |
| name | character varying | Container name |
| tenant | character varying | Owner/tenant of the container |
| purpose | character varying | Purpose (production/research/development) |
| location_id | uuid | Reference to locations table |
| status | character varying | Current status (active/maintenance) |
| seed_types | json | Array of seed types supported |
| created | timestamp | Creation timestamp |
| modified | timestamp | Last modification timestamp |
| has_alert | boolean | Whether container has active alerts |
| notes | character varying | Additional notes |
| shadow_service_enabled | boolean | Shadow service status |
| ecosystem_connected | boolean | Ecosystem connection status |

### 2. `crops`
Individual crop records being grown in containers.

| Column | Type | Description |
|--------|------|-------------|
| id | character varying | Primary key |
| container_id | character varying | Reference to containers table |
| seed_type | character varying | Type of seed/plant |
| seed_date | timestamp | Date seeds were planted |
| transplanting_date_planned | timestamp | Planned transplant date |
| harvesting_date_planned | timestamp | Planned harvest date |
| transplanted_date | timestamp | Actual transplant date |
| harvesting_date | timestamp | Actual harvest date |
| age | integer | Current age in days |
| status | character varying | Current status (growing/ready_for_harvest/harvested/overdue) |
| overdue_days | integer | Days past planned harvest date |
| location_id | integer | Reference to crop_locations table |

### 3. `crop_locations`
Tracks the physical location of each crop within containers.

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| type | character varying | Location type (panel/tray) |
| tray_id | character varying | Reference to trays table (if in tray) |
| panel_id | character varying | Reference to panels table (if on panel) |
| row | integer | Row position |
| column | integer | Column position |
| channel | integer | Channel number (if applicable) |
| position | integer | Sequential position number |

### 4. `crop_metrics`
Daily measurements and monitoring data for each crop.

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| crop_id | character varying | Reference to crops table |
| recorded_at | timestamp | Measurement timestamp |
| height_cm | double precision | Plant height in cm |
| leaf_count | integer | Number of leaves |
| stem_diameter_mm | double precision | Stem diameter in mm |
| leaf_area_cm2 | double precision | Leaf area in cm² |
| biomass_g | double precision | Estimated biomass in grams |
| health_score | double precision | Overall health score (0-100) |
| disease_detected | boolean | Disease detection flag |
| pest_detected | boolean | Pest detection flag |
| stress_level | double precision | Plant stress level |
| temperature_c | double precision | Temperature in °C |
| humidity_percent | double precision | Humidity percentage |
| light_intensity_umol | double precision | Light intensity (μmol) |
| ph_level | double precision | pH level |
| ec_level | double precision | Electrical conductivity level |
| nitrogen_ppm | double precision | Nitrogen level (ppm) |
| phosphorus_ppm | double precision | Phosphorus level (ppm) |
| potassium_ppm | double precision | Potassium level (ppm) |
| calcium_ppm | double precision | Calcium level (ppm) |
| magnesium_ppm | double precision | Magnesium level (ppm) |

### 5. `crop_statistics`
Aggregated statistics and predictions for each crop.

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| crop_id | character varying | Reference to crops table |
| avg_daily_growth_rate | double precision | Average growth rate per day |
| max_recorded_height | double precision | Maximum height recorded |
| total_leaf_count | integer | Total number of leaves |
| growth_stage | character varying | Current growth stage |
| predicted_yield_g | double precision | Predicted yield in grams |
| predicted_harvest_date | timestamp | Predicted optimal harvest date |
| yield_quality_score | double precision | Predicted yield quality (0-100) |
| survival_rate | double precision | Survival rate percentage |
| resource_efficiency | double precision | Resource utilization efficiency |
| time_to_harvest_days | integer | Estimated days until harvest |
| temperature_tolerance | double precision | Temperature tolerance score |
| humidity_tolerance | double precision | Humidity tolerance score |
| light_efficiency | double precision | Light utilization efficiency |
| disease_resistance | double precision | Disease resistance score |
| pest_resistance | double precision | Pest resistance score |
| overall_health_trend | character varying | Health trend description |
| variety | character varying | Specific plant variety |
| genetic_traits | json | Genetic traits data |
| cultivation_method | character varying | Cultivation method used |
| fertilizer_program | character varying | Fertilizer program used |
| irrigation_schedule | character varying | Irrigation schedule used |
| nutritional_content | json | Nutritional content data |
| taste_profile | json | Taste characteristics data |
| appearance_score | double precision | Visual quality score |
| shelf_life_days | integer | Estimated shelf life in days |
| cultivation_notes | text | Notes on cultivation |
| harvest_notes | text | Notes on harvesting |
| special_observations | text | Special observations |

### 6. `inventory_metrics`
Daily inventory and environmental metrics for containers.

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| container_id | character varying | Reference to containers table |
| date | date | Measurement date |
| nursery_station_utilization | integer | Nursery utilization percentage |
| cultivation_area_utilization | integer | Growing area utilization percentage |
| air_temperature | double precision | Average air temperature |
| humidity | integer | Average humidity percentage |
| co2_level | integer | CO₂ level (ppm) |
| yield_kg | double precision | Daily yield in kg |

### 7. `locations`
Physical locations where containers are placed.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| city | character varying(100) | City name |
| country | character varying(100) | Country name |
| address | character varying | Full address |

### 8. `panels`
Vertical growing panels used in containers.

| Column | Type | Description |
|--------|------|-------------|
| id | character varying | Primary key |
| rfid_tag | character varying | RFID tag identifier |
| utilization_percentage | integer | Utilization percentage |
| crop_count | integer | Number of crops on panel |
| is_empty | boolean | Whether panel is empty |
| provisioned_at | timestamp | Provisioning timestamp |
| container_id | character varying | Reference to containers table |

### 9. `panel_locations`
Physical locations of panels within containers.

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| wall | character varying | Wall designation (North/South/East/West) |
| slot_number | integer | Slot number on wall |
| panel_id | character varying | Reference to panels table |

### 10. `trays`
Horizontal growing trays used in containers.

| Column | Type | Description |
|--------|------|-------------|
| id | character varying | Primary key |
| rfid_tag | character varying | RFID tag identifier |
| utilization_percentage | integer | Utilization percentage |
| crop_count | integer | Number of crops in tray |
| is_empty | boolean | Whether tray is empty |
| provisioned_at | timestamp | Provisioning timestamp |
| container_id | character varying | Reference to containers table |

### 11. `tray_locations`
Physical locations of trays within containers.

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| shelf | character varying | Shelf designation (upper/middle/lower) |
| slot_number | integer | Slot number on shelf |
| tray_id | character varying | Reference to trays table |

## Entity Relationships

1. A **container** is placed at a physical **location**
2. A **container** can have multiple **panels** and **trays**
3. **Panels** and **trays** have specific **locations** within a container
4. A **crop** is planted in a **container** at a specific **crop_location**
5. A **crop_location** can refer to either a **panel** or **tray** position
6. Each **crop** has daily **crop_metrics** measurements
7. Each **crop** has aggregated **crop_statistics**
8. Each **container** has daily **inventory_metrics**

## Indices

The database includes indices on primary keys, foreign keys, and commonly filtered fields like container status, crop status, and dates to optimize query performance.

## Data Types

- Various seed types: lettuce (butterhead, romaine, iceberg), kale (curly, dinosaur), spinach, herbs (basil, cilantro, parsley), tomatoes (cherry, beefsteak)
- Crop statuses: germinating, growing, ready_for_harvest, harvested, overdue
- Container statuses: active, maintenance
- Container types: physical, virtual
- Container purposes: production, research, development, propagation