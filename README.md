# Dulra - Ecological Management Platform

Dulra is a comprehensive ecological management platform designed for environmental professionals, ecologists, and conservation managers to plan, execute, and monitor ecological projects and assessments.

## Getting Started

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env` to your Gemini API key
3. Run the app:
   `npm run dev`

## Platform Overview

Dulra provides an integrated suite of tools for ecological management across the entire project lifecycle.

### Main Navigation Sections

#### 1. Dashboard
Your central hub displaying:
- Active projects overview
- Pending tasks requiring attention
- Recent surveys and assessments
- Quick access to all major features

#### 2. Projects
Manage your ecological projects:
- Create new projects with details (name, location, dates, phase)
- Track project progress and status
- View project timeline and milestones
- Access project-specific data and reports

#### 3. Surveys
Conduct field surveys and assessments:
- **Field Survey**: Desktop surveys for preliminary assessments
- **Mobile Survey**: Field-ready surveys for on-site data collection
- Link surveys to specific projects
- Record species observations, habitat conditions, and environmental data

#### 4. Assessments
Perform ecological impact assessments:
- Create Appropriate Assessments (AA)
- Conduct Ecological Impact Assessments (EcIA)
- Document findings and recommendations
- Generate assessment reports

#### 5. Actions
Track conservation and management actions:
- Create action items linked to projects
- Assign tasks to team members
- Set priorities and deadlines
- Monitor action completion status

#### 6. Tools
Access specialized ecological management tools:

**GIS Mapping**
- Load and visualize environmental datasets
- View NPWS datasets (Natural Heritage Areas, SACs, SPAs)
- Display EPA pollution data (Nitrogen & Phosphorus)
- Upload your own spatial data (GeoJSON, KML, GPX, SHP)
- Toggle layer visibility
- Interactive map controls

**Data Mine**
- Search for ecological data using site "digital fingerprints"
- Filter by site codes, coordinates, or boundaries
- Specify ecological context (habitats, species, designations)
- Search for pressures, threats, and conservation data
- Get AI-generated summaries and data gap analysis

**Impact Calculation**
- Calculate biodiversity impact scores
- Assess habitat loss and gain
- Quantify ecological impacts for planning applications
- Generate biodiversity metrics

**Reporting**
- AI-assisted report generation
- Select project data for reports
- Refine reports with natural language prompts
- Export formatted reports

**Visualisation**
- Configure public-facing project visualizations
- Set up project information and metrics
- Generate shareable project URLs
- Display project impacts and achievements

**Team Management**
- Manage team members and roles
- Assign actions to team members
- Track workload distribution
- Share access with third parties

#### 7. Editors
Access rich text editors for:
- Project documentation
- Survey notes and observations
- Assessment reports
- Action descriptions

#### 8. Settings
Configure platform settings:
- User preferences
- Notification settings
- Data export options
- Integration settings

## Key Features

### Field Survey Workflow
1. Navigate to Surveys > Field Survey
2. Select associated project
3. Fill in survey details (date, location, weather)
4. Record species and habitat observations
5. Upload photos and additional files
6. Submit survey for review

### Assessment Workflow
1. Navigate to Assessments
2. Create new assessment (AA or EcIA)
3. Link to relevant project
4. Document baseline conditions
5. Assess potential impacts
6. Provide mitigation recommendations
7. Generate final assessment report

### GIS Mapping Workflow
1. Navigate to Tools > GIS Mapping
2. Select datasets to display (predefined or upload your own)
3. Click "Load Map" to visualize
4. Use Layer Control to toggle visibility
5. Use map controls to zoom and navigate

### Data Mining Workflow
1. Navigate to Tools > Data Mine
2. Provide site identifier (boundary file, code, or coordinates)
3. Specify ecological context and designations
4. Set search parameters and filters
5. Run data mine to get results
6. Review AI-generated summary and documents

## Tips for Best Results

- Always link surveys and assessments to projects for better organization
- Use the GIS Mapping tool to understand site context before field surveys
- Run Data Mine searches to gather background information before assessments
- Regularly update action items to track project progress
- Use the AI Reporting tool to save time on report writing
- Assign team members to actions for clear accountability

## Support

For questions or issues, refer to the in-app help sections or contact your platform administrator.
