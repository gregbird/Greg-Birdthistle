# Dulra - Ecological Data Management Platform

Dulra is a comprehensive ecological data management platform designed for environmental professionals, ecologists, and conservation managers to plan, execute, and monitor ecological projects and assessments. Built with modern workflow management principles, Dulra ensures reproducible, high-quality ecological assessments through structured workflows and automated quality control.

## Getting Started

**Prerequisites:** Node.js 16+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env` to your Gemini API key (for AI features)

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Platform Architecture

Dulra uses a dual-user system designed for organizational workflows:

### User Roles

**Parent (Admin) Users:**
- Full system access and oversight
- Project management and assignment
- Team coordination
- Workflow monitoring
- Quality control and review
- System settings and configuration

**Child (Field) Users:**
- Focused task view
- Assigned assessments and projects
- Guided workflow execution
- Field data collection
- Progress tracking
- Quality validation

Switch between roles using the sidebar toggle to experience both perspectives.

## Core Workflow Management System

Dulra implements a scientific workflow management system based on peer-reviewed ecological data science best practices. Every ecological assessment follows a structured 15-step workflow across three phases.

### The Standard Assessment Workflow

#### Phase 1: Desk Research (Steps 1-5)
Gather and analyze existing data before fieldwork:

1. **Review Historical Data**: Examine existing site records and previous assessments
2. **GIS Mapping Analysis**: Conduct spatial analysis of site boundaries and habitat types
3. **Data Mine Search**: Search NPWS, EPA, and other databases for relevant data
4. **Climate Data Review**: Analyze climate data and trends for the site
5. **Desk Research Report**: Compile findings from the desk research phase

#### Phase 2: Field Research (Steps 6-10)
Collect primary data through on-site surveys:

6. **Plan Field Survey**: Design survey route and methodology based on desk research
7. **Conduct Habitat Survey**: Assess on-site habitat conditions
8. **Species Recording**: Document species observations and abundances
9. **Impact Calculation**: Calculate ecological impacts based on field data
10. **Photo Documentation**: Organize and annotate field photographs

#### Phase 3: Reporting (Steps 11-15)
Generate and finalize comprehensive assessment reports:

11. **Data Quality Check**: Validate all collected data for completeness and accuracy
12. **Statistical Analysis**: Perform statistical analysis on habitat and species data
13. **Generate Assessment Report**: Create comprehensive report with findings
14. **Peer Review**: Internal review of the assessment report
15. **Final Report**: Finalize report incorporating review feedback

### Key Workflow Features

**Dependency Tracking:**
- Each step tracks its dependencies
- System automatically identifies which steps can be started
- Blocked steps are clearly indicated
- No risk of skipping required steps

**Progress Monitoring:**
- Real-time progress tracking at step, phase, and workflow levels
- Visual workflow diagrams show relationships between steps
- Color-coded status indicators (completed, in progress, blocked, needs review)
- Progress percentages for overall and per-phase completion

**Quality Control:**
- Automated data validation at each step
- Required data format checks
- Range validation for quantitative data
- Species name standardization
- GPS coordinate format validation

**Version Control:**
- Complete version history for all assessments
- Track changes with timestamps and authors
- Data source versioning for reproducibility
- One-click version restoration
- Full audit trail

## Main Navigation Sections

### 1. Dashboard

**For Child (Field) Users:**
- My Assigned Tasks with workflow visualization
- Overall progress statistics
- Next actions ready to start
- Quick access to workflow steps
- Assessment phase indicators

**For Parent (Admin) Users:**
- System-wide statistics and charts
- All assessments across all sites
- Team member assignments
- Quality metrics
- Project status overview
- Workflow progress monitoring

### 2. Projects

**Admin View Features:**
- Grid view of all projects (25+ projects)
- Project status badges (Pending, Not Started, In Progress, Completed, Overdue)
- Team member assignments visible
- Current workflow phase displayed
- Phase-by-phase progress breakdown
- **Click any project** to view complete workflow details
- Filter by project status
- Due date tracking

**Workflow Details Include:**
- All 15 workflow steps
- Dependency chains
- Step completion status
- Phase progress percentages
- Assigned team members
- Timeline information

### 3. Surveys

**Start a New Survey:**
Choose from compliant survey templates:

- **EcIA (Ecological Impact Assessment)**: Comprehensive impact assessment for development projects
- **ECoW (Ecological Clerk of Works)**: On-site monitoring and compliance reporting
- **AA (Appropriate Assessment)**: Natura 2000 sites screening and assessment
- **NIS (Naturalis)**: Nature Impact Statement for planning applications

**Features:**
- Template-based survey creation
- Custom template editing
- Project linking
- Field data collection optimized for tablets
- GPS coordinate capture
- Photo upload and documentation

### 4. Tools

#### GIS Mapping
Interactive mapping for spatial analysis:
- Load NPWS datasets (SACs, SPAs, NHAs)
- Display EPA pollution data
- Upload custom spatial data (GeoJSON, KML, GPX, Shapefile)
- Toggle layer visibility
- Interactive map controls
- Site boundary visualization

#### Data Mine
AI-powered ecological data search:
- Search by site codes, coordinates, or boundaries
- Filter by ecological context (habitats, species, designations)
- Search for pressures, threats, and conservation data
- AI-generated summaries
- Data gap analysis
- Document retrieval from multiple databases

#### Impact Calculation
Quantitative biodiversity assessment:
- Structure & Functions Assessment Tool
- Habitat condition scoring
- Biodiversity impact calculations
- Loss/gain metrics
- Conservation status evaluation
- Automated scoring based on criteria

#### Reporting
AI-assisted report generation:
- Select project data for inclusion
- Natural language refinement prompts
- Automated report structuring
- Export formatted reports
- Template-based generation
- Data integration from all workflow steps

#### Data Validation
Automated quality control:
- Species name validation
- GPS coordinate format checking
- Population count range validation
- Habitat area validation
- Survey date format verification
- Real-time error and warning reporting
- Best practices guidance

#### Version History
Track assessment evolution:
- Complete version timeline
- Change tracking with authors
- Data source version tracking
- One-click restoration
- Metadata for each version
- Compare versions

### 5. Team Management

**For Admin Users:**
- View all team members
- See action counts per member
- Assign assessments to team members
- Track workload distribution
- Monitor team progress
- Share access with third parties

### 6. Actions & Tasks

**Action Management:**
- Create action items linked to projects
- Assign to team members
- Set priorities and deadlines
- Organize by categories
- Track completion status
- View action details

**Task Categories:**
- Conservation actions
- Mitigation measures
- Monitoring requirements
- Management recommendations
- Follow-up activities

### 7. Assessment Details

View comprehensive assessment information:
- Site details and location
- Habitat assessments with condition scores
- Species assessments
- Conservation objectives
- Management issues
- Assessment status
- Linked actions and recommendations

### 8. Audit Trail

**For Admin Users:**
Complete activity history:
- All system changes tracked
- User attribution
- Timestamps
- Change types (Project, Assessment, Action, GIS, Data)
- Detailed change descriptions
- Searchable and filterable

### 9. Settings

Configure platform preferences:
- User role switching (Parent/Child)
- Notification preferences
- Data export options
- Integration settings
- Tutorial access

## Workflow Management Features

### For Field Users (Child Role)

**My Assigned Tasks Dashboard:**
- See all assigned assessments
- View workflow progress for each assignment
- Identify next available steps
- Understand blocked steps and dependencies
- Track due dates
- Access quick links to tools

**Onboarding Tutorial:**
First-time users receive a comprehensive 10-step tutorial covering:
1. Welcome and platform overview
2. Assessment workflow structure
3. Desk research phase details
4. Field research phase details
5. Reporting phase details
6. Data quality and validation
7. Understanding dependencies
8. Collaboration features
9. Best practices
10. Getting help

**Workflow Visualization:**
- Phase progress indicators
- Step-by-step breakdown
- Dependency visualization
- Next step recommendations
- Blocked step identification
- Status legend

**Start Next Step:**
- Automatic navigation to required tool
- Step marked as "in progress"
- Context-aware tool selection
- Seamless workflow progression

### For Admin Users (Parent Role)

**Project Monitoring:**
- View all projects in grid or table format
- See workflow progress for each project
- Click workflow icon to view detailed steps
- Monitor team assignments
- Track due dates and deadlines
- Identify bottlenecks

**Dashboard Workflow Access:**
- Workflow column in assessments table
- GitBranch icon with progress percentage
- Click icon to open workflow modal
- Full workflow visualization without leaving dashboard

**Quality Oversight:**
- Review validation results
- Monitor data quality across projects
- Check for error patterns
- Review peer feedback
- Track version history

## Key Workflows

### Starting a New Assessment (Admin)

1. Navigate to Dashboard or Projects
2. Create new assessment/project
3. Assign to team member
4. Set due date
5. Team member receives assignment
6. Onboarding tutorial appears (first time)
7. Team member views workflow
8. System highlights first available step

### Executing an Assessment (Field User)

1. View "My Assigned Tasks"
2. Click "View Workflow" on assignment
3. Review all 15 steps and dependencies
4. Click "Start Next Step" for first available step
5. System navigates to appropriate tool (e.g., GIS Mapping)
6. Complete the step's requirements
7. Run data validation if applicable
8. Step automatically marked as complete
9. Return to workflow view
10. System unlocks dependent steps
11. Repeat for next available step

### Desk Research Phase

1. **Review Historical Data**: Check existing records
2. **GIS Mapping**: Navigate to Tools > GIS Mapping
   - Load NPWS datasets
   - Upload site boundary
   - Analyze habitat types
   - Export maps
3. **Data Mine**: Navigate to Tools > Data Mine
   - Provide site identifier
   - Specify ecological context
   - Run search
   - Review AI summary
   - Save relevant documents
4. **Climate Data**: Gather climate information
5. **Compile Report**: Summarize desk research findings

### Field Research Phase

1. **Plan Survey**: Based on desk research findings
   - Review GIS maps
   - Identify survey points
   - Prepare equipment
2. **Field Survey**: Navigate to Surveys > Field Survey
   - Record site details
   - Document weather conditions
   - Use mobile-optimized interface
3. **Habitat Survey**: Document habitat conditions
   - Record habitat types
   - Assess condition scores
   - Note management issues
4. **Species Recording**: Log species observations
   - Record species names
   - Document abundances
   - Note locations
5. **Impact Calculation**: Navigate to Tools > Impact Calculation
   - Run Structure & Functions assessment
   - Calculate impact scores
   - Generate biodiversity metrics
6. **Photos**: Upload and organize field photos

### Reporting Phase

1. **Data Validation**: Navigate to Data Validation
   - Click "Run Validation"
   - Review errors and warnings
   - Fix any validation issues
   - Confirm all data passes checks
2. **Statistical Analysis**: Analyze collected data
3. **Generate Report**: Navigate to Tools > Reporting
   - Select project data
   - Use AI assistance
   - Refine with prompts
   - Export formatted report
4. **Peer Review**: Submit for internal review
5. **Final Report**: Incorporate feedback and finalize

### Monitoring Progress (Admin)

**From Projects View:**
1. Navigate to Projects
2. See all projects with workflow indicators
3. Note phase badges (Desk/Field/Reporting)
4. Check progress percentages
5. Click any project card
6. View complete workflow in modal
7. See which steps are completed
8. Identify blockers or delays

**From Dashboard:**
1. View assessments table
2. Check workflow column
3. Note progress percentages
4. Click GitBranch icon for detailed view
5. Review step-by-step progress
6. Identify next actions needed

## Data Quality & Validation

### Automated Validation Rules

**Species Data:**
- Species name required
- Standardized taxonomy
- Valid conservation status

**Spatial Data:**
- GPS coordinates in decimal degree format
- Valid coordinate ranges
- Proper site boundary formats

**Quantitative Data:**
- Population counts: 0-1,000,000 range
- Habitat area: positive values only
- Percentage values: 0-100 range

**Temporal Data:**
- Survey dates in ISO format (YYYY-MM-DD)
- Valid date ranges
- Chronological consistency

### Quality Check Workflow

1. Complete data entry for a step
2. Navigate to Data Validation
3. Click "Run Validation"
4. System checks all validation rules
5. Review results:
   - ✅ Green: All checks passed
   - ❌ Red: Errors found (must fix)
   - ⚠️ Yellow: Warnings (suggestions)
6. Fix any errors
7. Re-run validation
8. Proceed to next step when clean

## Version Control & Reproducibility

### Version History Features

**Automatic Versioning:**
- Every change creates a new version
- Version number increments
- Timestamp and author recorded
- List of changes documented
- Complete data snapshot saved

**Data Source Tracking:**
- NPWS database version
- EPA data version
- Climate data version
- GIS layer versions
- All external sources tracked

**Version Restoration:**
- Browse version timeline
- Compare versions
- View changes between versions
- One-click restore to previous version
- Creates new version (doesn't overwrite)

### Reproducibility

The system ensures complete reproducibility by tracking:
- Exact data sources used
- Version of each data source
- All methodology steps
- Who performed each step
- When each step was completed
- All changes made
- Complete audit trail

This allows you to:
- Recreate any previous analysis
- Verify results
- Respond to queries
- Update assessments when data sources change
- Maintain quality standards

## Collaboration Features

### Team Workflow

**Assignment Process:**
1. Admin creates assessment
2. Admin assigns to team member
3. Team member receives assignment
4. Assignment appears in "My Assigned Tasks"
5. Team member executes workflow
6. Admin monitors progress
7. Admin reviews completed work

**Communication:**
- Action assignments with descriptions
- Assessment notes and comments
- Audit trail for transparency
- Version history for tracking changes

### Peer Review

Built into workflow as Step 14:
- Submit completed assessment for review
- Reviewer examines all steps
- Feedback provided
- Revisions made if needed
- Final approval given

## Advanced Features

### Batch Processing

Process multiple assessments:
- Queue multiple sites
- Track progress across items
- Handle errors gracefully
- Aggregate results

### Custom Templates

Create organization-specific templates:
- Navigate to Surveys
- Click "Edit Custom Template"
- Design survey structure
- Define data fields
- Save for team use

### Third-Party Integration

Share access with external collaborators:
- Navigate to Team Management
- Add third-party access
- Set permissions
- Share project URLs
- Manage access

## Tips for Best Results

### Planning Phase
- Always start with desk research
- Review GIS maps before field visits
- Run Data Mine searches thoroughly
- Document all data sources
- Check for data gaps early

### Field Phase
- Plan survey routes carefully
- Use mobile-optimized interfaces on tablets
- Record GPS coordinates accurately
- Take comprehensive photos
- Note weather and conditions
- Validate data in the field when possible

### Reporting Phase
- Run validation checks before reporting
- Use AI assistance for efficiency
- Include all relevant data
- Add contextual analysis
- Request peer review
- Incorporate feedback thoroughly

### Quality Assurance
- Validate data at each phase
- Fix errors immediately
- Follow standardized naming
- Use consistent methodologies
- Document assumptions
- Maintain clear notes

### Team Coordination
- Assign clear responsibilities
- Set realistic due dates
- Monitor progress regularly
- Communicate proactively
- Share findings promptly
- Review work collaboratively

## System Requirements

- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **Internet**: Active connection required
- **Mobile**: Responsive design works on tablets and phones
- **Screen**: 1024px minimum width recommended for desktop use

## Data Storage

- All data stored locally in browser
- Automatic save functionality
- Version history maintained
- Export capabilities available
- Future: Supabase database integration planned

## Support & Training

### Built-in Help
- Onboarding tutorial for new users
- Tooltips on icons and buttons
- In-context help text
- Example workflows
- Best practice guidelines

### Documentation
- README (this file)
- WORKFLOW_IMPROVEMENTS.md - Technical workflow details
- QUICK_START_GUIDE.md - User guide
- ADMIN_WORKFLOW_INTEGRATION.md - Admin features guide

### Getting Help
1. Review onboarding tutorial (Settings > View Tutorial)
2. Check documentation files
3. Hover over icons for tooltips
4. Review example assessments
5. Contact your administrator
6. Join training workshops

## Future Enhancements

Planned features include:
- Supabase database integration
- Real-time collaboration
- Automated notifications
- Custom workflow templates
- Advanced reporting templates
- Mobile app for offline field use
- Integration with external databases
- Automated data import
- Enhanced AI capabilities
- Public stakeholder portals

## Technical Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **Maps**: Leaflet (for GIS features)
- **Charts**: Chart.js
- **Build**: Vite
- **Future Database**: Supabase (PostgreSQL)

## Contributing

This platform is under active development. For questions, feature requests, or issues, contact your platform administrator.

## License

Proprietary - All rights reserved

## Acknowledgments

Workflow management system based on peer-reviewed research:
- "Improving ecological data science with workflow management software" (Methods in Ecology and Evolution, 2023)

Built for ecological professionals by professionals who understand the challenges of ecological data management, field research, and environmental compliance.

---

**Version**: 1.0
**Last Updated**: November 2025
**Platform**: Dulra Ecological Data Management System
