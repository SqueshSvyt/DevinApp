Container Management Dashboard Page

The Container Management Dashboard is a centralized dashboard that enables users to monitor, manage, and analyze the performance of Physical and Virtual Containers used in vertical farming operations. The panel supports search, filtering, analytics, container tracking, and real-time status monitoring.


Label: Displayed as "Container Management Dashboard" in header

Triggered automatically as the default landing page upon app launch or navigation.


It contains the following components: 1. Search & Filter Section 2. Performance Overview Section 3. Container List Section 4. Create Container Panel 5. Edit Container Panel


1.1 Search & Filter Section Label: Not displayed


1.1.1 Search Bar

Enables keyword-based search across multiple container attributes, including:

Name, Tenant, Type, Purpose, Location, and Status.


1.1.2 Filter Options

· Type: Filter containers by type (All Types or a specific type)

· Tenant: Filter by tenant association (All Tenants or a specific tenant)

· Purpose: Filter based on operational intent (All Purposes or a specific purpose)

· Status: Filter by current container status (All Statuses or a specific status)

· Has Alerts: Toggle to show only containers with active alerts (All or Alerts Only)

· Clear Filters Button: Resets all filter selections and search input to their default state.

1.2 Performance Overview Section

This section displays analytics for containers currently visible under the active Search & Filter criteria.

Label: Not displayed

Layout: Two cards representing the two main categories of containers:

· Physical Containers

· Virtual Containers


1.2.1 Card Metrics

YIELD

· Average Yield: Calculated average yield within the selected time range (e.g., AVG 63KG)

· Total Yield: Cumulative yield for the selected time range (e.g., TOTAL 81KG)

· Visualization: Green bar chart showing yield distribution

SPACE UTILIZATION

· Average Utilization**: Average space usage across containers (e.g., AVG 80%)

· Visualization: Blue bar chart showing space utilization trends

Shared Elements (for both metrics):

· Highlight: The current day (in daily views) or current month (in broader views) is visually distinguished

· Tooltip: On hover, shows the exact value and corresponding date

· Container Count Badge: Shows the total number of containers in the respective category (e.g., Physical: 4, Virtual: 5)

Time Range Options: Supports multiple intervals for performance views. Future dates or months appear as unfulfilled and are displayed using gray bars.

· Week (default): Daily breakdown from Monday to Sunday

· Month: Daily breakdown from the 1st to the last day

· Quarter: Monthly breakdown across the current quarter

· Year: Monthly breakdown from January to December


1.2.2 Dynamic Behavior

· Interactive Filtering: Clicking a Physical or Virtual container card applies a type-specific filter to the 1.3 Container List Section and highlights the selected card. Clicking again toggles it off.

· Empty State Handling: If no containers match the current criteria, a placeholder message appears: "No information available. Please adjust the search or filter criteria."



1.3 Container List Section

A paginated, sortable data table that displays container records dynamically based on the current Search & Filter criteria.

Label: Displayed as "Container List"


1.3.1 Create Container Action:

A "Create Container" button is positioned at the top right of the table header.

· Action: Opens a slide-in form panel from the right side of the screen.

· Function: Allows creation of both Physical and Virtual containers with configurable metadata.

1.3.2 Table

The table is structured with the following columns:

· Type: Icon-based indicator (Physical or Virtual)

· Name: Container name

· Tenant: Associated tenant

· Purpose: Operational intent (e.g., Development, Research, Production)

· Location: City and Country (for physical containers only)

· Status:

o Created (gray)

o Active (green)

o Maintenance (orange)

o Inactive (light gray)

· Created: Date of creation (YYYY-MM-DD)

· Modified: Date of last update (YYYY-MM-DD)

· Alerts: Red alert icon if the container has active issues

o Tooltip: Shows a short description of the alert(s)

· Actions (ellipsis menu):

o View – Navigates to the full Container Page

o Edit – Opens the Edit Container panel

o Shutdown – Deactivates the container (with confirmation and optional validation)


1.3.3 Pagination Controls

· Adjustable page size: - 10 (default), 25, 50 items

· Navigation: first, previous, next, last

· Current page indicator with total count

· Filters retain pagination state during changes



1.4 Create Container Panel

The Create Container functionality provides a comprehensive interface for creating new containers with appropriate validation and dynamic field behavior.

Label: Displayed as "Create Container"

Triggered by the Create Container action in Container List, opening a slide-in panel from the right.

Initial State:

· All form fields are empty except for Container Type (defaults to "Physical")

· No validation errors are shown

· Submit button is enabled


1.4.1 Layout

Organized into three sections:

1. Container Information

o Container Name (required, text input)

o Tenant (required, dropdown)

o Container Type (button group: Physical/Virtual)

o Purpose (required, dropdown)

o Seed Types (required, multi-select autocomplete)

o Location (required if Physical, text input)

o Notes (optional, multiline input)

2. Container Settings

o Enable Shadow Service (toggle)

o Copy Environment from Container (Virtual only, dropdown)

o Run Robotics Simulation (Virtual only, toggle)

3. Ecosystem Settings

o Connect to other systems (checkbox)

o If checked, show:

§ FA Environment (Alpha/Prod toggle)

§ PYA Environment (Dev/Test/Stage toggle)

§ AWS Environment (Dev/Prod toggle)

§ MBAI Environment (disabled: Prod only)

1.4.2 Dynamic Behavior

Container Type Toggle

· Physical: Shows and requires the Location field; hides Virtual-specific settings

· Virtual: Hides the Location field; reveals Virtual-only fields (Copy Environment, Run Robotics Simulation)

System Integration

· Ecosystem settings are displayed only when “Connect to other systems” is checked

· Environment options are auto-selected based on selected Purpose:

o Development → preselects dev environments

o Research / Production → preselects prod environments

· Submit button label changes to “Create and Connect”


4.3 Validation & Submission

· Container Name must be unique across all containers

o If a duplicate is detected, the system suggests an available alternative (e.g., appending a number)

· Validation is triggered on form submission only (not real-time)

· Errors are displayed inline, beneath each affected field

On Submission:

1. User clicks Submit

2. If validation fails:

o Inline error messages are shown

o Focus moves to the first invalid field

3. If validation succeeds:

o Form data is submitted to the backend

o The panel closes

o A new container is added to the list

o If the backend returns an error, a failure notification is shown

1.5 Edit Container Panel

The Edit Container Panel allows users to modify the metadata and settings of an existing container, with the exception of the Container Name, which is immutable once the container has been created.

Label: Displayed as "Edit Container"

Triggered by the Edit action in the container list, which opens a slide-in panel from the right Initial State: The form layout mirrors the 1.4 Create Container Panel, with all fields pre-populated with the container’s current data

Non-editable Field:

· Container Name (displayed as read-only)

· If the container has already been connected to the ecosystem, the Connect to other systems checkbox is pre-checked and cannot be modified

Dynamic Behavior · Validation and dynamic logic follow the same rules as the 1.4 Create Container Panel,

· On successful submission, changes are saved and reflected in the Container List

· On failure, an error message is shown to the user

2 Container Page

The Container Page provides a comprehensive view of an individual container, enabling users to monitor status, review key data, and manage associated resources such as inventory, environmental conditions (via an embedded external system), and connected or provisioned devices.

Label: Displays the container name in the header

Triggered by the View action from the Container List on the Container Management Dashboard

Layout:

· Header:

o Breadcrumb navigation (with link back to the Container Management Dashboard)

o Container Name, Container Type (with icon), Tenant Name, and Location (for Physical containers only)

o Tab navigation bar: § 2.1 Overview Tab § 2.2 Environment & Recipes Tab § 2.3 Inventory Tab § 2.4 Devices Tab

· Body: Dynamically displays content based on the selected tab.

2.1 Overview Tab

The Overview Tab provides a high-level summary of the container, including live metrics, crop status, metadata, and historical activity.

Label: Displayed as "Overview"

Triggered by:

· Navigating to the Container Page via the View action

· Switching from another tab

· Reloading the Container Page

Layout · Dashboard Section · Crops Section · Container Info & Settings Section · Recent Activity Section


2.1.1 Dashboard Section

This section displays real-time metrics and time-based analytics.

Label: Not displayed

Metrics:

· Air Temperature (current)

· Humidity (current)

· CO₂ (current)

· Yield (mirrors Performance Overview section)

· Space Utilization (mirrors Performance Overview section), broken down by:

o Nursery Station

o Cultivation Area

2.1.2 Crops Section

Displays a table summarizing crop details grouped by seed types.

Label: Not displayed

Table Columns:

· Seed Type

· Nursery Station (crop count)

· Cultivation Area (crop count)

· Last Seeding Date

· Last Transplanting Date

· Last Harvesting Date

· Average Age

· Overdue (crop count)


2.1.3 Container Info & Settings Section

This section presents container metadata and configuration details, with optional editing capabilities.

Label: Info & Settings Layout: Matches the 1.5 Edit Container Panel

Behavior:

· Defaults to view mode

o If the container is connected to an ecosystem, show quick links to related systems

· Users can toggle to edit mode

o Changes can be applied via Save or Save and Connect (if the ecosystem connection is enabled during editing)

2.1.4 Recent Activity Section

The Recent Activity Section provides a chronological log of container-related events, system updates, and user actions for tracking and auditing purposes.

Label: Recent Activity

Content & Behavior:

· Displays activity in a vertical timeline format

· Each activity entry includes:

o Timestamp

o Action type (e.g., Edited Settings, Connected to Ecosystem, Crop Added, Device Removed)

o Actor (user or system)

o Short description of the event

· Most recent activity appears at the top

· Supports infinite scroll to load historical records
