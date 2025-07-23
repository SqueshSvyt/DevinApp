# Vertical Farming System Development Prompt

## Project Overview

Develop a full-stack application for a vertical farming management system with:
1. PostgreSQL database backend following the structure in `./input/db_structure.md` 
2. API server implementation based on data models in `./input/datamodels.md`
3. Frontend interface matching the designs in `./input/images/209-5275.png` and `./input/images/374-3786.png`
4. Strict adherence to development rules in `./input/rules.md`
5. Implementation of all functionalities in `./input/specifications.md`

## Part 1: Backend Development

### Database Implementation
**Important:** The database has already been created and populated using `./database/load_database_dump.sh`. You do not need to recreate the schema, only connect to the existing database.

1. Use the following database credentials to connect to the existing database:
 ```
   DB_NAME="${POSTGRES_DB:-demo}"
   DB_USER="${POSTGRES_USER:-postgres}"
   DB_PASSWORD="${POSTGRES_PASSWORD:-password}"
   DB_HOST="${POSTGRES_SERVER:-localhost}"
   ```  
2. The existing database already contains the following tables with proper relationships:
   - containers
   - crops
   - crop_locations
   - crop_metrics
   - crop_statistics
   - inventory_metrics
   - locations
   - panels
   - panel_locations
   - trays
   - tray_locations
3. Appropriate indexes and constraints are already configured as specified in `./input/db_structure.md`

### API Development
1. Implement backend using Python Flask framework
2. Create models based on TypeScript definitions in `./input/datamodels.md`
3. Develop RESTful API endpoints for all entities:
   - Container management (CRUD operations)
   - Crop management and tracking
   - Metrics collection and analysis
   - Equipment (panels/trays) management
   - Location management
4. Implement data validation based on types in `./input/datamodels.md`
5. Follow backend performance and security requirements from `./input/rules.md` section 6.2 and 7.2

### Integration Services
1. Create service abstractions for all backend operations
2. Implement error handling with proper HTTP status codes
3. Set up environment configuration for development/production
4. Add structured logging for API requests/responses
5. Configure database connection using the credentials specified above

## Part 2: Frontend Development

### Component Structure
1. Follow the feature-based architecture in `./input/rules.md` section 1.1
2. Organize components with proper file structure:
   - index.ts (barrel exports)
   - ComponentName.tsx (main component)
   - styles.ts (styled components)
   - types.ts (TypeScript interfaces)

### Container Management Dashboard
1. Implement the dashboard shown in `./input/images/209-5275.png` with:
   - Search & Filter section with all filter options
   - Performance Overview section with Physical/Virtual container metrics
   - Container List section with all columns and actions
   - Create Container panel with dynamic fields
   - Edit Container panel with pre-populated data

2. Ensure all interactive behaviors work:
   - Filtering and search
   - Tab selection for time ranges (Week/Month/Quarter/Year)
   - Container card selection
   - Pagination controls
   - Actions menu functionality

### Container Detail Page
1. Implement the detail page shown in `./input/images/374-3786.png` with:
   - Tab navigation (Overview, Environment & Recipes, Inventory, Devices)
   - Container metrics display
   - Crops table with all columns
   - Container Information & Settings section

2. Add dynamic behaviors:
   - Tab switching
   - Metrics visualization
   - Edit mode for settings
   - Pagination for crops table

### Technical Requirements
1. Use React with TypeScript as specified in `./input/rules.md` section 1.2
2. Style with styled-components and follow design fidelity rules in section 1.4
3. Implement all responsive behaviors
4. Use Chart.js for data visualization
5. Follow component memoization and performance optimization guidelines in section 6.1

## Development Guidelines

### Code Quality
1. Enforce naming conventions from `./input/rules.md` section 1.3
2. Follow React and TypeScript best practices
3. Avoid using `any` type
4. Use ES6+ syntax throughout
5. Ensure ESLint validation passes

### Security Practices
1. Implement input validation for all user inputs
2. Add XSS and CSRF prevention
3. Use secure authentication methods
4. Follow all security guidelines in `./input/rules.md` section 7

### Testing & Documentation
1. Add JSDoc comments for all components and functions
2. Implement comprehensive test coverage
3. Document API endpoints with examples
4. Include setup and troubleshooting instructions

## Deployment Configuration
1. Ensure proper CORS configuration
2. Set up environment variables
3. Configure build process
4. Implement error handling and logging for production

The final application should perfectly match the designs in the provided images while following all technical requirements and specifications in the documentation files.