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

**Admin Users:**
- Full system access and oversight
- Project management and assignment
- Team coordination
- Workflow monitoring
- Quality control and review
- System settings and configuration
- Audit trail access
- Report approval

**Assessor Users:**
- Focused task view
- Assigned assessments and projects
- Guided workflow execution
- Field data collection
- Progress tracking
- Quality validation
- Data entry and analysis

Switch between roles using the sidebar toggle to experience both perspectives.

## Core Workflow Management System

Dulra implements a scientific workflow management system based on peer-reviewed ecological data science best practices. Every ecological assessment follows a structured 16-step workflow across three phases.

### The Standard Assessment Workflow

#### Phase 1: Desk Research (Steps 1-5)
Gather and analyze existing data before fieldwork:

1. **Review Historical Data**: Examine existing site records and previous assessments
2. **GIS Mapping Analysis**: Conduct spatial analysis of site boundaries and habitat types
3. **Data Mine Search**: Search NPWS, EPA, and other databases for relevant data
4. **Climate Data Review**: Analyze climate data and trends for the site
5. **Desk Research Report**: Compile findings from the desk research phase

#### Phase 2: Field Research (Steps 6-11)
Collect primary data through on-site surveys:

6. **Plan Field Survey**: Design survey route and methodology based on desk research
7. **Conduct Habitat Survey**: Assess on-site habitat conditions
8. **Species Recording**: Document species observations and abundances
9. **Impact Calculation**: Calculate ecological impacts based on field data
10. **Article 17 Assessment**: Complete 4-parameter EU Habitats Directive assessment *(NEW)*
11. **Photo Documentation**: Organize and annotate field photographs

#### Phase 3: Reporting (Steps 12-16)
Generate and finalize comprehensive assessment reports:

12. **Data Quality Check**: Validate all collected data for completeness and accuracy
13. **Statistical Analysis**: Perform statistical analysis on habitat and species data
14. **Generate Assessment Report**: Create comprehensive report with findings
15. **Peer Review**: Internal review of the assessment report
16. **Final Report**: Finalize report incorporating review feedback

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

**For Assessor Users:**
- My Assigned Tasks with workflow visualization
- Overall progress statistics
- Next actions ready to start
- Quick access to workflow steps
- Assessment phase indicators

**For Admin Users:**
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
- All 16 workflow steps
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
- **NIS (Natura Impact Statement)**: Detailed assessment for planning applications
- **PEA (Preliminary Ecological Appraisal)**: Phase 1 habitat survey
- **Bat Survey**: Roost assessments, emergence surveys, activity transects
- **Bird Survey**: Breeding bird surveys, wintering bird counts
- **Habitat & Botanical Survey**: Vegetation mapping, Annex I habitat assessment
- **Invasive Species Survey**: Non-native species identification and mapping

**Features:**
- Template-based survey creation
- Custom template editing
- Project linking
- Field data collection optimized for tablets
- GPS coordinate capture
- Photo upload and documentation

### 4. Tools

#### Desk Research Tools

##### GIS Mapping
Interactive mapping for spatial analysis:
- Load NPWS datasets (SACs, SPAs, NHAs)
- Display EPA pollution data
- Upload custom spatial data (GeoJSON, KML, GPX, Shapefile)
- Toggle layer visibility
- Interactive map controls
- Site boundary visualization

##### Data Mine
AI-powered ecological data search with Article 17 context:
- Search by site codes, coordinates, or boundaries
- Filter by ecological context (habitats, species, designations)
- Search for pressures, threats, and conservation data
- AI-generated summaries with conservation status
- Article 17 status indicators (Favourable/Unfavourable-Inadequate/Unfavourable-Bad)
- Data gap analysis
- Document retrieval from multiple databases
- Historical trend analysis

#### Field Research Tools

##### Field Survey
Mobile-optimized field data collection:
- Quick site capture forms
- Weather conditions logging
- Habitat type recording
- Species observations
- GPS coordinate capture
- Photo documentation
- Offline capability
- Send survey link to mobile device via SMS

##### Impact Calculation
Quantitative biodiversity assessment:
- Structure & Functions Assessment Tool
- Habitat condition scoring (based on Article 17 methodology)
- Criteria pass/fail evaluation
- Area in poor condition calculations
- Conservation status determination
- Automated scoring based on criteria
- Results aligned with Article 17 reporting

##### Article 17 Assessment *(NEW)*
EU Habitats Directive 4-parameter assessment:
- **Range Assessment**: Geographic distribution evaluation
- **Area Assessment**: Surface area covered by habitat
- **Structure & Functions**: Quality and condition assessment
- **Future Prospects**: Long-term viability analysis
- Biogeographical region selection (9 terrestrial + 5 marine)
- Reporting period tracking (2007-2012, 2013-2018, 2019-2024)
- Official EU evaluation matrix implementation
- Overall conservation status calculation
- Pressure and threat identification
- Trend analysis (short-term and long-term)
- Favourable reference values
- Send to mobile device for field assessment
- Color-coded status indicators
- Compliance with official methodology

**Article 17 Key Features:**
- Automatic overall status calculation using evaluation matrix
- Real-time validation against criteria
- Parameter-specific guidance and thresholds
- Integration with Impact Calculation results
- Mobile field assessment capability
- Historical period comparison (backcasting)
- Target 1 contribution tracking

#### Reporting Tools

##### Intelligent Reporting *(NEW)*
AI-powered interactive report builder:
- **AI Chat Assistant**: Conversational interface guides report creation
- **Multi-Source Data Integration**: Automatically pulls from all 5 tools
  - GIS Mapping data (boundaries, coordinates, habitat maps)
  - Data Mine results (SAC/SPA designations, conservation objectives)
  - Field Survey data (dates, conditions, species records)
  - Impact Calculation results (conservation status, failed criteria)
  - Article 17 Assessment data (4-parameter status, trends)
- **Data Source Selection**: Choose which data to include in report
- **Section-by-Section Generation**: AI asks questions and generates content
- **User Comments**: Add professional opinion and expertise to each section
- **8 Report Types Supported**:
  1. Natura Impact Assessment (NIS)
  2. AA Screening Report
  3. Preliminary Ecological Appraisal (PEA)
  4. Ecological Impact Assessment (EcIA)
  5. Article 17 Report
  6. Habitat Assessment Report
  7. Species Survey Report
  8. Habitat Management Plan
- **Smart Content Generation**: AI combines data with user input
- **Professional Formatting**: Standard ecological report structure
- **Export Functionality**: Download complete reports

**Intelligent Reporting Workflow:**
1. Select project
2. Choose report type
3. Review available data sources (5 tools)
4. Select data to include
5. AI asks questions for each section
6. AI generates professional content
7. Add your comments and opinions
8. Review and export

##### Visualisation
Public-facing project visualization:
- Project timeline and milestones
- Impact metrics and statistics
- Habitat distribution maps
- Conservation success stories
- Funding sources and partners
- Achievement badges
- Shareable public URLs

#### Quality Control Tools

##### Data Validation
Automated quality control:
- Species name validation
- GPS coordinate format checking
- Population count range validation
- Habitat area validation
- Survey date format verification
- Article 17 parameter validation
- Real-time error and warning reporting
- Best practices guidance

##### Version History
Track assessment evolution:
- Complete version timeline
- Change tracking with authors
- Data source version tracking
- One-click restoration
- Metadata for each version
- Compare versions
- Audit trail integration

### 5. Team Management

**For Admin Users:**
- View all team members (23 team members)
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
- Article 17 parameters
- Linked actions and recommendations

### 8. Audit Trail

**For Admin Users:**
Complete activity history:
- All system changes tracked
- User attribution
- Timestamps
- Change types (Project, Assessment, Action, GIS, Data, Article 17)
- Detailed change descriptions
- Searchable and filterable
- Export audit logs

### 9. Settings

Configure platform preferences:
- User role switching (Admin/Assessor)
- Notification preferences
- Data export options
- Integration settings
- Tutorial access

## Article 17 Assessment Guide

### What is Article 17?

Article 17 of the EU Habitats Directive requires Member States to report every 6 years on the conservation status of habitats and species. The methodology uses four parameters to assess status:

1. **Range** - Is the habitat's geographic distribution adequate and stable?
2. **Area** - Is there sufficient surface area of the habitat?
3. **Structure & Functions** - Is the habitat in good condition?
4. **Future Prospects** - Will the habitat remain viable long-term?

### Using the Article 17 Tool

**Step 1: Set Context**
- Select habitat type (e.g., 2130 Fixed coastal dunes)
- Choose biogeographical region (e.g., Atlantic)
- Confirm reporting period (default: 2019-2024)

**Step 2: Assess Each Parameter**

*Range:*
- Enter current range (km²)
- Enter favourable reference range
- Select conservation status (Favourable/Unfavourable-Inadequate/Unfavourable-Bad/Unknown)
- Choose trend (Increasing/Stable/Decreasing/Unknown)

*Area:*
- Enter current area (ha)
- Enter favourable reference area
- Select conservation status
- Choose trend

*Structure & Functions:*
- Enter % area in good condition
- Enter % area in poor condition
- Select conservation status
- Choose trend (Improving/Stable/Deteriorating/Unknown)

*Future Prospects:*
- Select main pressures/threats (10 common pressures)
- Indicate if pressures are significant (Yes/No)
- Select conservation status

**Step 3: Review Overall Status**
- System automatically calculates using official evaluation matrix
- View parameter summary with color codes
- Review evaluation matrix rules
- Add assessment notes

**Step 4: Mobile Field Option**
- Click "Send to Mobile" button
- Enter phone number
- Receive SMS with assessment link
- Complete assessment on tablet in field

### Evaluation Matrix Logic

The overall conservation status follows official EU rules:
- **Favourable**: All 4 parameters green OR 3 green + 1 unknown
- **Unfavourable-Inadequate**: One or more amber but no red
- **Unfavourable-Bad**: One or more red
- **Unknown**: Two or more unknown combined with green, or all unknown

## Intelligent Reporting Guide

### Creating a Report with AI

**Step 1: Start New Report**
- Navigate to Tools > Intelligent Reporting
- AI greets you and asks which project

**Step 2: Select Project**
- Choose from project list
- System loads all available data for that project

**Step 3: Choose Report Type**
- AI presents 8 report types
- Select by number or name (e.g., "Natura Impact Assessment")

**Step 4: Review Data Sources**
- AI shows 5 available data sources:
  - GIS Mapping (boundaries, coordinates, habitat distribution)
  - Data Mine (SAC/SPA info, conservation objectives)
  - Field Survey (survey dates, weather, species records)
  - Impact Calculation (conservation status, condition scores)
  - Article 17 Assessment (4-parameter data, overall status)
- Choose "yes" to review or "no" to include all

**Step 5: Select Data (if reviewing)**
- Checkbox list appears
- Check boxes for data you want
- See last updated dates
- Click "Confirm Selection"

**Step 6: Answer AI Questions**
- AI asks questions for each section
- Answer in natural language
- AI generates professional content using your answers + selected data

**Example for Introduction:**
```
AI: "What is the purpose of this assessment?"
You: "To assess impacts of proposed housing development on Rossbehy SAC"

AI: "Who commissioned the work?"
You: "Kerry County Council for planning application KCC/2025/0123"

AI: [Generates professional introduction paragraph]
```

**Step 7: Add Your Comments**
- Each section has "Your Comments & Opinion" box
- Add your professional analysis
- Include field observations
- State confidence levels
- Make recommendations

**Example Comment:**
```
"In my professional opinion as a senior ecologist with 15 years
coastal habitat experience, the 33.6% poor condition identified
in the Impact Calculation is primarily due to unmanaged recreational
pressure. The Article 17 assessment correctly identifies this as
Unfavourable-Inadequate. I recommend immediate boardwalk installation
to prevent further degradation."
```

**Step 8: Review & Export**
- Preview complete report on left panel
- See all AI-generated content + your comments
- Click "Export Report" to download

### Report Sections Generated

Standard sections for most reports:
1. **Introduction** - Purpose, commissioners, requirements
2. **Methodology** - Survey methods, dates, limitations
3. **Baseline Conditions** - Habitats, species, designations (uses GIS + Data Mine + Field Survey data)
4. **Impact Assessment** - Conservation status, Article 17 results (uses Impact Calc + Article 17 data)
5. **Mitigation Measures** - Recommendations, timing, monitoring
6. **Conclusions** - Summary, professional opinion

Each section shows:
- AI-generated content based on your data
- Data source badges (which tools were used)
- Your comments and professional opinion
- Option to regenerate with more guidance

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

### Executing an Assessment (Assessor User)

1. View "My Assigned Tasks"
2. Click "View Workflow" on assignment
3. Review all 16 steps and dependencies
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
   - Review AI summary with Article 17 status
   - Save relevant documents
4. **Climate Data**: Gather climate information
5. **Compile Report**: Summarize desk research findings

### Field Research Phase

1. **Plan Survey**: Based on desk research findings
   - Review GIS maps
   - Identify survey points
   - Prepare equipment
2. **Field Survey**: Navigate to Field Research > Field Survey
   - Record site details
   - Document weather conditions
   - Use mobile-optimized interface
   - Send to phone for field use
3. **Habitat Survey**: Document habitat conditions
   - Record habitat types
   - Assess condition scores
   - Note management issues
4. **Species Recording**: Log species observations
   - Record species names
   - Document abundances
   - Note locations
5. **Impact Calculation**: Navigate to Field Research > Impact Calculation
   - Run Structure & Functions assessment
   - Calculate impact scores
   - Generate condition percentages
6. **Article 17 Assessment**: Navigate to Field Research > Article 17 Assessment *(NEW)*
   - Select habitat code and biogeographical region
   - Complete 4-parameter assessment
   - Review overall status calculation
   - Add assessment notes
   - Optional: Send to mobile for field completion
7. **Photos**: Upload and organize field photos

### Reporting Phase

1. **Data Validation**: Navigate to Data Validation
   - Click "Run Validation"
   - Review errors and warnings
   - Fix any validation issues
   - Confirm all data passes checks
2. **Statistical Analysis**: Analyze collected data
3. **Generate Report**: Navigate to Tools > Intelligent Reporting *(NEW)*
   - Select project
   - Choose report type
   - Review and select data sources
   - Answer AI questions for each section
   - Add your professional comments
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
6. View complete 16-step workflow in modal
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
- Article 17 reference values: positive numbers

**Temporal Data:**
- Survey dates in ISO format (YYYY-MM-DD)
- Valid date ranges
- Chronological consistency
- Reporting period validity

**Article 17 Specific:**
- All 4 parameters must be assessed
- Reference values must be justified
- Status selections required
- Trend assessments evidence-based

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
- Article 17 assessment versions

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
- Article 17 parameter decisions

This allows you to:
- Recreate any previous analysis
- Verify results
- Respond to queries
- Update assessments when data sources change
- Maintain quality standards
- Support statutory reporting

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
- Report review and feedback

### Peer Review

Built into workflow as Step 15:
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

### Mobile Field Assessment

Send surveys and assessments to mobile devices:
- Field Survey mobile link
- Article 17 Assessment SMS
- Optimized for tablet use
- GPS capture capability
- Photo documentation
- Offline data entry support

## Tips for Best Results

### Planning Phase
- Always start with desk research
- Review GIS maps before field visits
- Run Data Mine searches thoroughly
- Document all data sources
- Check for data gaps early
- Review historical Article 17 reports

### Field Phase
- Plan survey routes carefully
- Use mobile-optimized interfaces on tablets
- Record GPS coordinates accurately
- Take comprehensive photos
- Note weather and conditions
- Validate data in the field when possible
- Complete Article 17 parameters on-site

### Article 17 Assessment
- Use official reference values where available
- Base trends on 12+ year data periods
- Document evidence for status determinations
- Identify all significant pressures
- Follow evaluation matrix strictly
- Cross-check with Impact Calculation results
- Add detailed assessment notes

### Reporting Phase
- Run validation checks before reporting
- Select relevant data sources
- Answer AI questions thoroughly
- Add professional opinion to all sections
- Include field observations and context
- Reference specific data points
- Request peer review
- Incorporate feedback thoroughly

### Quality Assurance
- Validate data at each phase
- Fix errors immediately
- Follow standardized naming
- Use consistent methodologies
- Document assumptions
- Maintain clear notes
- Verify Article 17 compliance

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
- Article 17 methodology guidance

### Documentation
- README.md (this file)
- WORKFLOW_IMPROVEMENTS.md - Technical workflow details
- QUICK_START_GUIDE.md - User guide
- ADMIN_WORKFLOW_INTEGRATION.md - Admin features guide
- ARTICLE_17_IMPLEMENTATION.md - Article 17 detailed guide
- INTELLIGENT_REPORTING_GUIDE.md - Report builder guide

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
- PDF report export with formatting
- Word document generation
- Article 17 XML export for official submission
- Target 1 contribution tracking
- Backcasting support for historical comparison

## Technical Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **Maps**: Leaflet (for GIS features)
- **Charts**: Chart.js
- **Build**: Vite
- **Future Database**: Supabase (PostgreSQL)

## Recent Updates (November 2025)

### Version 2.0 - Major Feature Release

**Article 17 Assessment (NEW)**
- Full 4-parameter EU Habitats Directive assessment tool
- Biogeographical region selection (9 terrestrial + 5 marine)
- Reporting period tracking (2007-2012, 2013-2018, 2019-2024)
- Official evaluation matrix implementation
- Automatic overall status calculation
- Mobile field assessment capability
- Integrated into 16-step workflow

**Intelligent Reporting (NEW)**
- AI-powered interactive report builder
- Conversational chatbot interface
- Multi-source data integration (5 tools)
- Data source selection and confirmation
- Section-by-section generation
- User comment integration for professional opinion
- 8 professional report types
- Export functionality

**Role Terminology Update**
- "Parent/Child" replaced with "Admin/Assessor"
- More professional and descriptive terminology
- Updated throughout entire platform

**Workflow Enhancement**
- Expanded from 15 to 16 steps
- Added Article 17 Assessment as step 10
- Enhanced field research phase
- Improved dependency tracking

**Data Mine Enhancement**
- Article 17 context added to results
- Conservation status indicators
- Color-coded status display
- Historical trend data

**Impact Calculation Update**
- Aligned with Article 17 methodology
- Enhanced criteria evaluation
- Improved conservation status determination

## Contributing

This platform is under active development. For questions, feature requests, or issues, contact your platform administrator.

## License

Proprietary - All rights reserved

## Acknowledgments

**Workflow management** based on peer-reviewed research:
- "Improving ecological data science with workflow management software" (Methods in Ecology and Evolution, 2023)

**Article 17 methodology** based on official EU documentation:
- "Article 17 biogeographical assessments - Methodology of assessments under Article 17 of the EU habitats directive 2013-2018" (European Environment Agency / European Topic Centre on Biological Diversity)

Built for ecological professionals by professionals who understand the challenges of ecological data management, field research, environmental compliance, and statutory reporting.

---

**Version**: 2.0
**Last Updated**: November 2025
**Platform**: Dulra Ecological Data Management System
