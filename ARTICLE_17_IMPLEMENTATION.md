# Article 17 Implementation Guide

## Overview
The Dulra platform has been updated to fully support Article 17 of the EU Habitats Directive assessment methodology (2013-2018 reporting period). This implementation ensures compliance with official EU reporting standards for habitat conservation status assessment.

## What is Article 17?

Article 17 of the EU Habitats Directive requires Member States to regularly report on the conservation status of habitats and species listed in the Directive's Annexes. The methodology uses a standardized four-parameter assessment framework that evaluates:

1. **Range** - Geographic distribution of the habitat
2. **Area** - Surface area covered by the habitat type
3. **Structure & Functions** - Quality and condition of habitat structures
4. **Future Prospects** - Long-term viability based on pressures and threats

## Key Changes Implemented

### 1. New Article 17 Assessment Component

**Location:** `components/Article17Assessment.tsx`

**Features:**
- Complete 4-parameter assessment interface
- Biogeographical and marine region selection
- Reporting period tracking (2007-2012, 2013-2018, 2019-2024)
- Official evaluation matrix implementation
- Real-time overall status calculation
- "Send to Mobile" functionality for field assessments
- Color-coded status indicators (Green/Amber/Red/Unknown)

**Access:** Field Research > Article 17 Assessment

### 2. Updated Type System

**Location:** `types.ts`

**New Types Added:**
- `Article17Status` - Conservation status values
- `Article17Trend` - Trend indicators
- `BiogeographicalRegion` - 9 terrestrial regions
- `MarineRegion` - 5 marine regions
- `ReportingPeriod` - 6-year reporting cycles
- `AssessmentMethod` - Aggregation methods (0EQ, 0MS, 1, 2XA, etc.)
- `Article17Assessment` - Complete assessment structure
- `Article17RangeParameter` - Range assessment data
- `Article17AreaParameter` - Area assessment data
- `Article17StructureParameter` - Structure & functions data
- `Article17FutureProspectsParameter` - Future prospects data
- `Article17Pressure` - Standardized pressure coding
- `Article17ComplianceCheck` - Validation results

### 3. Evaluation Matrix Implementation

The component implements the exact evaluation matrix from the official methodology:

**Overall Status Rules:**
- **Favourable (Green):** All parameters 'green' OR three 'green' + one 'unknown'
- **Unfavourable-Inadequate (Amber):** One or more 'amber' but no 'red'
- **Unfavourable-Bad (Red):** One or more 'red'
- **Unknown:** Two or more 'unknown' combined with green, or all 'unknown'

**Parameter-Specific Criteria:**

**Range:**
- Favourable: Stable or increasing AND not smaller than favourable reference range
- Unfavourable-Bad: Decline >1% per year OR >10% below reference

**Area:**
- Favourable: Stable or increasing AND not smaller than reference area AND no significant distribution changes
- Unfavourable-Bad: Loss >1% per year OR >10% below reference OR major distribution losses

**Structure & Functions:**
- Favourable: Structures and functions in good condition with no significant deteriorations
- Unfavourable-Bad: >25% of area unfavourable regarding structures and functions

**Future Prospects:**
- Favourable: Main pressures/threats not significant, species will remain viable
- Unfavourable-Bad: Severe influence of pressures/threats, long-term viability at risk

### 4. Workflow Integration

**Location:** `workflowUtils.ts`

**Changes:**
- Added new workflow step: "Article 17 Assessment" (field-4a)
- Positioned after "Impact Calculation" (field-4)
- Before "Photo Documentation" (field-5)
- Dependencies updated for Data Quality Check (report-1)

**New 16-Step Workflow:**

**Desk Research (Steps 1-5):**
1. Review Historical Data
2. GIS Mapping Analysis
3. Data Mine Search
4. Climate Data Review
5. Desk Research Report

**Field Research (Steps 6-11):**
6. Plan Field Survey
7. Conduct Habitat Survey
8. Species Recording
9. Impact Calculation
10. **Article 17 Assessment** (NEW)
11. Photo Documentation

**Reporting (Steps 12-16):**
12. Data Quality Check
13. Statistical Analysis
14. Generate Assessment Report
15. Peer Review
16. Final Report

### 5. Navigation Updates

**Location:** `App.tsx`

**Changes:**
- Added `ViewType.Article17` enum value
- Added route handling for Article 17 view
- Added menu item in "Field Research" section
- Imported Article17AssessmentView component

**Menu Location:** Sidebar > Tools > Field Research > Article 17 Assessment

### 6. Assessment Parameters

Each of the four parameters includes:

**Range Parameter:**
- Conservation Status (Favourable/Unfavourable-Inadequate/Unfavourable-Bad/Unknown)
- Short-term Trend (12 years)
- Favourable Reference Range (km²)
- Current Range (km²)

**Area Parameter:**
- Conservation Status
- Short-term Trend (12 years)
- Favourable Reference Area (ha)
- Current Area (ha)

**Structure & Functions Parameter:**
- Conservation Status
- Trend (Improving/Stable/Deteriorating/Unknown)
- Area in Good Condition (%)
- Area in Poor Condition (%)

**Future Prospects Parameter:**
- Conservation Status
- Significant Pressures/Threats (Yes/No)
- Main Pressures & Threats (checklist of 10 common pressures)

### 7. Biogeographical Context

**Terrestrial Biogeographical Regions:**
- Alpine
- Atlantic (relevant for Ireland)
- Black Sea
- Boreal
- Continental
- Macaronesian
- Mediterranean
- Pannonian
- Steppic

**Marine Regions:**
- Marine Atlantic (relevant for Ireland)
- Marine Baltic
- Marine Black Sea
- Marine Macaronesian
- Marine Mediterranean

### 8. Reporting Periods

The system tracks 6-year reporting cycles as per EU requirements:
- 2007-2012 (previous period)
- 2013-2018 (current baseline)
- 2019-2024 (current active period)

### 9. Mobile Field Assessment

**Feature:** "Send to Mobile" button

**Functionality:**
- Generates unique mobile assessment link
- SMS delivery to field device
- Includes habitat code and biogeographical region
- Optimized for tablet/smartphone use
- GPS capture capability
- Offline data entry support

### 10. Visual Design

**Status Indicators:**
- **Favourable:** Green background, green text, check circle icon
- **Unfavourable-Inadequate:** Amber background, yellow text, alert triangle icon
- **Unfavourable-Bad:** Red background, red text, X circle icon
- **Unknown:** Gray background, gray text, help circle icon

**Overall Assessment Display:**
- Large centered status card
- 4-parameter summary grid
- Evaluation matrix rules info box
- Parameter-specific criteria guidance

## Usage Guide

### For Field Users (Child Role)

1. **Start Assessment:**
   - Navigate to: Field Research > Article 17 Assessment
   - Select habitat type (e.g., [2130] Fixed coastal dunes)
   - Select biogeographical region (e.g., Atlantic)
   - Confirm reporting period (default: 2019-2024)

2. **Complete Each Parameter:**
   - **Range:** Enter current range, reference range, assess status and trend
   - **Area:** Enter current area, reference area, assess status and trend
   - **Structure & Functions:** Enter condition percentages, assess status
   - **Future Prospects:** Select pressures/threats, assess overall prospects

3. **Review Overall Status:**
   - System automatically calculates using evaluation matrix
   - Review parameter summary
   - Check evaluation matrix rules

4. **Mobile Field Option:**
   - Click "Send to Mobile" button
   - Enter phone number
   - Receive SMS with assessment link
   - Complete assessment on mobile device in field

### For Admin Users (Parent Role)

1. **Assign Article 17 Assessments:**
   - Create new assessment in Projects
   - Assign to field ecologist
   - Note workflow step "Article 17 Assessment" (field-4a)
   - Set due date

2. **Monitor Progress:**
   - View workflow progress in Projects view
   - Check if Article 17 step is completed
   - Review assessment quality
   - Verify compliance with evaluation matrix

3. **Quality Control:**
   - Ensure all 4 parameters are assessed
   - Verify appropriate reference values used
   - Check biogeographical region matches site
   - Confirm evaluation matrix logic applied correctly

## Data Validation

### Automatic Checks:
- All 4 parameters must be assessed
- Reference values must be positive numbers
- Percentages must be 0-100
- At least one status must be selected for each parameter
- Overall status automatically calculated

### Manual Reviews:
- Verify favourable reference values are justified
- Check that pressures/threats are appropriate for habitat
- Ensure biogeographical region is correct
- Confirm trend assessments are evidence-based

## Integration with Existing Features

### Data Mine Enhancement:
The Data Mine results (Tools > Data Mine) now include context for Article 17 assessments:
- Rossbehy SAC/SPA data includes conservation status for each habitat
- Color-coded status indicators match Article 17 scheme
- Historical trend data available for comparison
- Reference values provided where available

### Workflow Tracking:
- Article 17 Assessment appears in workflow visualizations
- Dependencies tracked (requires Impact Calculation)
- Progress percentage includes Article 17 step
- Phase progress updated when Article 17 completed

### Reporting:
- Article 17 data available for report generation
- Status summary included in assessment reports
- Evaluation matrix results documented
- Trend analysis incorporated

## Best Practices

### 1. Reference Values:
- Use official NPWS favourable reference values where available
- Document sources for custom reference values
- Review reference values periodically
- Consider site-specific conditions

### 2. Trend Assessment:
- Base trends on 12-year time period minimum
- Use quantitative data where possible
- Document evidence for trend conclusions
- Consider climate change impacts

### 3. Pressure/Threat Identification:
- Use standardized pressure codes
- Rank pressures by significance (High/Medium/Low)
- Consider cumulative impacts
- Update pressure lists regularly

### 4. Status Determination:
- Follow evaluation matrix strictly
- Document justification for borderline cases
- Use "Unknown" only when truly insufficient data
- Seek peer review for complex assessments

### 5. Data Quality:
- Validate all input data before assessment
- Use consistent units (km² for range, ha for area)
- Cross-check with other data sources
- Maintain audit trail of data sources

## Compliance Checklist

Before submitting an Article 17 assessment, verify:

- [ ] Habitat code correctly selected
- [ ] Biogeographical region appropriate for site
- [ ] Reporting period set correctly
- [ ] All 4 parameters assessed
- [ ] Reference values justified and documented
- [ ] Trends based on >12 year data
- [ ] Pressures/threats identified and ranked
- [ ] Overall status follows evaluation matrix
- [ ] Data sources documented
- [ ] Quality checks passed
- [ ] Peer review completed

## Technical Details

### File Structure:
```
components/
├── Article17Assessment.tsx     (Main component)
├── ImpactCalculation.tsx       (Original S&F tool)
└── Tools.tsx                    (Enhanced Data Mine)

types.ts                         (Article 17 types)
workflowUtils.ts                 (Updated workflow)
App.tsx                          (Navigation integration)
```

### Component Props:
```typescript
interface Article17AssessmentProps {
    showToast?: (message: string, type?: 'success' | 'error') => void;
}
```

### State Management:
- All assessment data managed in component state
- Automatic calculation of overall status
- Real-time validation of inputs
- Modal state for "Send to Mobile" feature

## Future Enhancements

### Planned Features:
1. **Database Integration:**
   - Save assessments to Supabase
   - Version history tracking
   - Backcasting support for Target 1

2. **Reporting Templates:**
   - XML export for official submission
   - PDF report generation
   - Comparison with previous periods

3. **Data Import:**
   - Import from NPWS Article 17 database
   - Bulk import for multiple habitats
   - API integration with EEA database

4. **Advanced Analytics:**
   - Trend visualization charts
   - Aggregation methods (Method 1, 2, 3)
   - Target 1 contribution tracking
   - Nature of change analysis

5. **Compliance Checker:**
   - Automated validation against Article 17 rules
   - Warning system for borderline cases
   - Recommendation engine
   - Quality score calculation

## References

### Official Documentation:
1. **EEA Methodology Document:**
   "Article 17 biogeographical assessments - Methodology of assessments under Article 17 of the EU habitats directive 2013-2018"
   European Environment Agency / European Topic Centre on Biological Diversity

2. **Reporting Guidelines:**
   DG Environment. 2017. "Reporting under Article 17 of the Habitats Directive: Explanatory notes and guidelines for the period 2013-2018." Brussels.

3. **Article 17 Web Tool:**
   https://nature-art17.eionet.europa.eu/article17/reports2012/

### Key Concepts:
- **Favourable Conservation Status:** Situation where habitat is prospering in quality and extent with good prospects for the future
- **Evaluation Matrix:** Standardized decision rules for combining parameter assessments
- **Biogeographical Assessment:** Assessment at the level of biogeographical/marine region within a Member State
- **Aggregation Methods:** Statistical methods for combining Member State data to EU level
- **Target 1:** EU Biodiversity Strategy target for achieving favourable or improving conservation status

## Support

For questions about Article 17 assessments:
1. Review official EEA methodology document
2. Check Article 17 web tool for examples
3. Consult with NPWS for Ireland-specific guidance
4. Review example assessments in platform
5. Contact platform administrator for technical support

---

**Document Version:** 1.0
**Last Updated:** November 2025
**Implementation Date:** November 2025
**Compliance Level:** Full compliance with Article 17 (2013-2018) methodology
