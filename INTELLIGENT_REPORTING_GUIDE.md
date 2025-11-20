# Intelligent Reporting Guide

## Overview

The Intelligent Reporting feature is an AI-powered report builder that guides users through creating professional ecological reports by asking questions, gathering data from all platform tools, and incorporating user expertise and opinions.

## Key Features

### 1. **AI Chat Assistant**
- Interactive conversational interface
- Guides users step-by-step through report creation
- Asks relevant questions for each report section
- Provides real-time feedback and suggestions
- Natural language understanding

### 2. **Multi-Source Data Integration**
The system automatically loads data from all completed assessments:

**Available Data Sources:**
- **GIS Mapping Data**
  - Site boundaries and coordinates
  - Habitat distribution maps
  - Spatial analysis results

- **Data Mine Results**
  - SAC/SPA designations
  - Qualifying interests
  - Conservation objectives
  - Historical data

- **Field Survey Data**
  - Survey dates and conditions
  - Habitat classifications
  - Species records
  - Field observations

- **Impact Calculation Results**
  - Conservation status assessments
  - Failed criteria counts
  - Area affected calculations
  - Structure & Functions analysis

- **Article 17 Assessment**
  - 4-parameter assessments (Range, Area, Structure, Future Prospects)
  - Biogeographical context
  - Overall conservation status
  - Trend analysis

### 3. **Data Source Selection**
- Review all available data sources
- Select which data to include in report
- See last updated dates for each source
- Preview data content before selection
- Option to include all or choose selectively

### 4. **User Comments & Opinions**
Each report section includes:
- AI-generated content based on data
- Text area for user's professional comments
- Space for expert opinion and interpretation
- Additional context and modifications
- Professional judgment incorporation

### 5. **Report Types Supported**

1. **Natura Impact Assessment (NIS)**
   - Comprehensive assessment for Natura 2000 sites
   - Includes all 4 AA stages
   - Conservation objectives evaluation

2. **AA Screening Report**
   - Stage 1 Appropriate Assessment
   - Likely significant effects determination
   - Screening matrix

3. **Preliminary Ecological Appraisal (PEA)**
   - Phase 1 habitat survey report
   - Baseline conditions assessment
   - Constraint identification

4. **Ecological Impact Assessment (EcIA)**
   - CIEEM methodology
   - Impact significance evaluation
   - Mitigation hierarchy application

5. **Article 17 Report**
   - EU Habitats Directive reporting
   - 4-parameter assessment documentation
   - Biogeographical analysis

6. **Habitat Assessment Report**
   - Detailed habitat condition assessment
   - Structure & Functions evaluation
   - Management recommendations

7. **Species Survey Report**
   - Protected species findings
   - Population assessments
   - Impact evaluation

8. **Habitat Management Plan**
   - Conservation objectives
   - Management prescriptions
   - Monitoring requirements

### 6. **Intelligent Content Generation**

The AI generates content by:
- Analyzing selected data sources
- Understanding report type requirements
- Incorporating user responses to questions
- Following professional standards
- Using ecological terminology correctly
- Structuring content logically

### 7. **Section-by-Section Workflow**

**Standard Report Sections:**
1. Introduction
2. Methodology
3. Baseline Conditions
4. Impact Assessment
5. Mitigation Measures
6. Conclusions

**For Each Section, the AI:**
- Asks relevant questions
- Generates draft content
- Shows data sources used
- Allows user comments
- Enables regeneration
- Tracks completion status

## User Journey

### Step 1: Project Selection
```
AI: "Which project would you like to create a report for?"
→ User selects from project list
→ System loads all available data for that project
```

### Step 2: Report Type Selection
```
AI: "What type of report would you like to create?"
→ Shows 8 report types with descriptions
→ User selects report type
→ System configures appropriate sections
```

### Step 3: Data Source Review
```
AI: "Would you like to review and select which data sources to include?"
→ User can review 5 data source types
→ Shows last updated dates
→ User selects relevant sources
→ System confirms selection
```

### Step 4: Section Generation
For each section, the AI:

**Introduction Section:**
```
AI Questions:
- What is the purpose of this assessment?
- Who commissioned the work?
- Are there any specific requirements?

User Response:
[User types their answer]

AI Generates:
[Draft introduction content using data + user input]

User Adds:
[Comments, opinion, modifications in text area]
```

**Methodology Section:**
```
AI Questions:
- What survey methods did you use?
- When were the surveys conducted?
- Were there any limitations?

[Same generation + comment flow]
```

**Continues for all sections...**

### Step 5: Review & Export
- Preview complete report
- Review all sections
- Add final comments
- Export as document

## Interface Components

### Left Panel: Report Preview
- **Header:** Report title and metadata
- **Sections:** Each section displayed as card
  - Section title
  - AI-generated content
  - Data sources used badges
  - User comments text area
  - Regenerate button
- **Progress:** Sections completed counter
- **Styling:** Professional document layout

### Right Panel: AI Chat
- **Header:** AI Assistant branding
- **Chat History:**
  - AI messages (white bubbles, bot icon)
  - User messages (orange bubbles, right-aligned)
  - Typing indicator (animated dots)
- **Quick Actions:** Project selection buttons
- **Data Selector:** Checkbox list when needed
- **Message Input:** Text field + send button

### Top Bar
- **Title:** "Intelligent Report Builder"
- **Project Info:** Selected project name
- **Report Type Badge:** Current report type
- **Export Button:** Download completed report

## Data Flow

```
1. User selects project
   ↓
2. System loads all data sources
   ↓
3. User selects report type
   ↓
4. AI asks about data inclusion
   ↓
5. User reviews/selects data sources
   ↓
6. For each section:
   - AI asks questions
   - User provides context
   - AI generates content using:
     * Selected data sources
     * User responses
     * Report type template
   - User adds comments/opinion
   ↓
7. Report complete
   ↓
8. User exports document
```

## Technical Implementation

### Data Source Structure
```typescript
interface DataSource {
    id: string;              // Unique identifier
    name: string;            // Display name
    type: 'gis' | 'datamine' | 'field_survey' | 'impact_calc' | 'article17';
    icon: string;            // Lucide icon name
    data: any;              // Actual data object
    selected: boolean;       // Inclusion flag
    lastUpdated: string;    // ISO date string
}
```

### Report Section Structure
```typescript
interface ReportSection {
    id: string;              // Section identifier
    title: string;           // Section heading
    content: string;         // AI-generated text
    aiGenerated: boolean;    // AI flag
    userComments: string;    // User's additions
    dataSources: string[];   // IDs of sources used
}
```

### Conversation Flow
```typescript
type ConversationStage =
    | 'greeting'           // Initial welcome
    | 'project_selection'  // Choose project
    | 'report_type'        // Choose report type
    | 'data_selection'     // Select data sources
    | 'section_generation' // Generate sections
    | 'review';            // Final review
```

## Content Generation Logic

### Template-Based Generation

Each report type has section templates that incorporate:

**Data Points:**
- GIS boundaries and coordinates
- Designated site names and codes
- Qualifying interests lists
- Survey dates and conditions
- Habitat extent measurements
- Conservation status assessments
- Impact calculation results
- Article 17 parameter values

**User Context:**
- Responses to AI questions
- Purpose of assessment
- Project commissioners
- Specific requirements
- Survey methodology details
- Limitations encountered
- Professional observations

**Combined Output:**
Professionally formatted paragraphs that:
- Flow naturally
- Use correct terminology
- Cite data sources
- Incorporate user input
- Follow report standards
- Maintain consistency

## Usage Examples

### Example 1: Creating an NIS Report

**Step 1:** Select "Lough Ennell SAC" project
```
AI: "Great! I've loaded data for Lough Ennell SAC. What type of report?"
```

**Step 2:** Choose "Natura Impact Assessment"
```
User: "1" or "Natura Impact Assessment"
AI: "I've found 5 data sources. Review them?"
```

**Step 3:** Review data (select all except GIS)
```
User clicks: Data Mine, Field Survey, Impact Calc, Article 17
AI: "Using 4 sources. Let's start with Introduction..."
```

**Step 4:** Answer questions
```
AI: "What is the purpose of this assessment?"
User: "To assess impacts of proposed housing development on SAC"
AI: [Generates introduction]
```

**Step 5:** Add professional opinion
```
User types in comment box:
"In my professional opinion, the proposed development
poses a significant risk to habitat 2130 given its
current Unfavourable-Inadequate status and the
additional recreational pressure that would result."
```

**Step 6:** Continue through all sections

**Step 7:** Export completed NIS report

### Example 2: Quick AA Screening

**Step 1:** Select project

**Step 2:** Choose "AA Screening Report"

**Step 3:** Include all data sources

**Step 4:** Rapid Q&A:
```
AI: "Nature of proposal?"
User: "Minor extension to existing building"

AI: "Distance to Natura sites?"
User: "1.2 km from SAC"

AI: "Any pathway for impacts?"
User: "No hydrological connection, no habitat loss"
```

**Step 5:** Review generated screening matrix

**Step 6:** Add concluding opinion

**Step 7:** Export screening report

## Best Practices

### For Users

**Before Starting:**
1. Complete all relevant assessments (GIS, surveys, impact calc, Article 17)
2. Ensure data is up-to-date
3. Review field notes and photos
4. Clarify report objectives

**During Report Generation:**
1. Provide detailed, specific answers to AI questions
2. Review generated content carefully
3. Add professional judgment in comment sections
4. Don't just accept AI content - enhance it with expertise
5. Cite specific evidence from field observations
6. Include caveats and limitations where appropriate

**Adding Comments & Opinions:**
- State confidence levels in assessments
- Provide reasoning for conclusions
- Reference specific field observations
- Note any unusual circumstances
- Explain departures from standard methodology
- Include professional qualifications/experience
- Suggest further surveys if needed

**Review Before Export:**
1. Check all sections are complete
2. Verify data accuracy
3. Ensure logical flow
4. Confirm professional language
5. Add missing context
6. Check for contradictions

### Content Quality Tips

**Good User Comment Example:**
```
"Based on 15 years of experience assessing coastal dunes,
the condition of habitat 2130 at this site is concerning.
The impact calculation shows 33.6% in poor condition, which
aligns with my field observations of extensive trampling
damage along the main access points. The Article 17
assessment correctly identifies this as Unfavourable-Inadequate.
I recommend immediate implementation of boardwalks and
signage to prevent further degradation."
```

**Weak User Comment Example:**
```
"I agree with the assessment."
```

### Data Selection Strategy

**Include When:**
- Data is recent (within 2 years)
- Data is relevant to report scope
- Data quality is good
- Data supports assessment

**Exclude When:**
- Data is outdated
- Data is from different site area
- Data quality is questionable
- Data is preliminary/unverified

## Features & Capabilities

### ✅ Current Features
- 8 report types
- 5 data source types
- Interactive AI chat
- Section-by-section generation
- User comment fields
- Data source selection
- Progress tracking
- Report export

### 🔄 Planned Enhancements
- PDF export with formatting
- Word document generation
- Custom report templates
- Section reordering
- Image insertion
- Table generation
- Bibliography/references
- Version history
- Collaborative editing
- Report approval workflow

## Troubleshooting

### Issue: AI not responding
**Solution:** Check that project is selected and conversation stage is correct

### Issue: No data sources available
**Solution:** Ensure assessments are completed for the selected project

### Issue: Generated content doesn't match data
**Solution:** Regenerate section with more specific user input

### Issue: Can't add comments
**Solution:** Wait for section content to generate first

### Issue: Export button not visible
**Solution:** Ensure at least one section has content

## Integration with Platform

### Workflow Integration
The Intelligent Reporting fits into the standard workflow at the **Reporting Phase**:

```
Field Research Phase:
  ↓
  Field Survey ✓
  Impact Calculation ✓
  Article 17 Assessment ✓
  ↓
Reporting Phase:
  ↓
  Data Quality Check
  Statistical Analysis
  → Generate Assessment Report (Intelligent Reporting) ←
  Peer Review
  Final Report
```

### Data Access
The component accesses data from:
- **Projects database:** Project metadata
- **Surveys database:** Survey data
- **GIS system:** Spatial data (simulated)
- **Data Mine:** Search results (simulated)
- **Impact Calculation:** Assessment results (simulated)
- **Article 17:** Four-parameter data (simulated)

### Future Database Integration
When connected to Supabase:
```sql
-- Store report drafts
CREATE TABLE report_drafts (
    id UUID PRIMARY KEY,
    project_id INTEGER,
    report_type VARCHAR(50),
    sections JSONB,
    data_sources JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

-- Store chat history
CREATE TABLE report_chat_history (
    id UUID PRIMARY KEY,
    report_id UUID REFERENCES report_drafts(id),
    messages JSONB,
    stage VARCHAR(50),
    created_at TIMESTAMPTZ
);

-- Store exported reports
CREATE TABLE generated_reports (
    id UUID PRIMARY KEY,
    report_draft_id UUID REFERENCES report_drafts(id),
    content TEXT,
    format VARCHAR(20),
    exported_at TIMESTAMPTZ,
    exported_by VARCHAR(100)
);
```

## AI Content Generation

### How It Works

The AI content generation uses:

**1. Template System:**
- Pre-written templates for each section type
- Placeholders for data insertion
- Standard ecological terminology
- Professional report structure

**2. Data Injection:**
- Extracts relevant data from selected sources
- Formats data appropriately for context
- Converts technical data to readable text
- Maintains data accuracy

**3. Context Integration:**
- Incorporates user responses to questions
- Adapts language to report type
- Maintains consistent narrative
- Links sections logically

**4. Quality Assurance:**
- Uses correct technical terms
- Follows ecological reporting standards
- Maintains professional tone
- Ensures factual accuracy

### Example Generation Process

**Input:**
- Report Type: NIS
- Section: Baseline Conditions
- Data Sources: Data Mine + Field Survey
- User Context: "SAC with 3 Annex I habitats"

**Processing:**
1. Load NIS baseline template
2. Extract SAC details from Data Mine
3. Extract habitat list from Field Survey
4. Insert data into template
5. Add user context
6. Format professionally

**Output:**
```
The site is designated as Rossbehy SAC (002289) with
qualifying interests including three Annex I habitats:
2130 Fixed coastal dunes (25.3 ha), 1330 Atlantic salt
meadows (8.9 ha), and 1140 Mudflats and sandflats.
Based on field surveys conducted on 2025-11-15 under
clear conditions, these habitats are present and were
assessed for conservation status...
```

## Tips for Effective Use

### Maximize AI Value
1. **Be Specific:** Detailed answers get better results
2. **Provide Context:** Explain unusual circumstances
3. **Use Data:** Reference specific measurements
4. **Be Accurate:** AI relies on your input quality

### Enhance with Expertise
1. **Add Interpretation:** Don't just describe, explain
2. **Provide Opinion:** State your professional view
3. **Include Caveats:** Note limitations and uncertainties
4. **Cite Experience:** Reference relevant background
5. **Make Recommendations:** Suggest actions

### Workflow Efficiency
1. **Complete assessments first:** Have all data ready
2. **Block time:** Generate report in one session
3. **Review as you go:** Don't wait until end
4. **Save frequently:** (When database integrated)
5. **Export early:** Keep versions of progress

## Keyboard Shortcuts

Currently available:
- **Enter:** Send message in chat
- **Tab:** Navigate between sections

Planned shortcuts:
- **Ctrl+S:** Save draft
- **Ctrl+E:** Export report
- **Ctrl+R:** Regenerate section
- **Ctrl+N:** New report
- **Esc:** Close modal

## Accessibility

The Intelligent Reporting interface includes:
- Keyboard navigation support
- Screen reader compatibility
- High contrast text
- Clear visual hierarchy
- Descriptive labels
- Focus indicators

## Performance

**Optimized for:**
- Handling 10+ sections
- Processing 5 data sources simultaneously
- Generating 1000+ word sections
- Maintaining chat history (100+ messages)
- Real-time content preview
- Smooth scrolling

**Typical Response Times:**
- Project selection: <100ms
- Data source loading: <200ms
- AI response generation: 1-2s (simulated)
- Section generation: 2-3s (simulated)
- Report export: <500ms

## Support & Feedback

**For Issues:**
1. Check this guide first
2. Verify data sources are loaded
3. Review conversation stage
4. Try regenerating section
5. Contact platform administrator

**For Improvements:**
- Suggest new report types
- Request additional data sources
- Propose better AI questions
- Share successful workflows
- Recommend export formats

---

**Version:** 1.0
**Last Updated:** November 2025
**Component:** `IntelligentReporting.tsx`
**Author:** Dulra Platform Development Team
