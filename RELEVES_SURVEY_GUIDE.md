# Relevés Survey Guide

## Overview

The Relevés Survey is a professional phytosociological vegetation sampling tool designed for field ecologists to record detailed vegetation data following standard relevé methodology. The tool works **completely offline**, storing all data locally in your browser.

## Key Features

### ✅ **Offline-First Design**
- All data saved to browser localStorage automatically
- Works without internet connection in the field
- Online/offline status indicator
- No data loss even when connection drops
- Perfect for remote field locations

### 📋 **Comprehensive Data Collection**

**6 Main Sections:**
1. **Site Information** - Basic survey metadata
2. **Plot & Location** - GPS coordinates and plot characteristics
3. **Environment** - Substrate, habitat, management
4. **Vegetation Structure** - Layer heights and cover percentages
5. **Species List** - Full species recording with Braun-Blanquet scale
6. **Notes & Photos** - Additional observations

### 🌱 **Professional Standards**
- Braun-Blanquet cover-abundance scale (r, +, 1-5)
- FOSSIT habitat classification codes
- Annex I habitat codes
- Four vegetation layers (Tree, Shrub, Herb, Moss)
- Standard plot sizes (2x2m to 20x20m)

### 💾 **Data Management**
- Create, edit, duplicate, and delete relevés
- Search by plot number, locality, or habitat
- Export all data to CSV format
- Track species count per relevé
- Sync status indicators

## Getting Started

### Accessing the Tool

**Navigation:** Field Research > Relevés Survey

**Access Level:** Available to both Admin and Assessor users

### Creating Your First Relevé

1. Click **"New Relevé"** button
2. Fill in required fields (marked with *)
3. Work through the 6 tabs
4. Add species observations
5. Click **"Save Relevé"** to store offline

## Using the Survey

### Tab 1: Site Information

**Required Fields:**
- **Plot Number**: Unique identifier (e.g., R001, R002)
- **Survey Date**: Date of survey
- **Surveyor**: Your name
- **Locality**: Site location description

**Optional Fields:**
- County

**Example:**
```
Plot Number: R001
Survey Date: 2025-11-20
Surveyor: Dr. Sarah Murphy
Locality: Rossbehy Dunes, Castlemaine Harbour
County: Kerry
```

### Tab 2: Plot & Location

**Location Coordinates:**
- Latitude (decimal degrees, e.g., 52.1234)
- Longitude (decimal degrees, e.g., -9.5678)
- Altitude in meters
- Grid Reference (ITM format)

**Plot Characteristics:**
- **Plot Size**: 2x2m, 4x4m, 5x5m, 10x10m, 20x20m, Other
- **Shape**: Square, Rectangle, Circle, Irregular
- **Slope**: 0-90 degrees
- **Aspect**: N, NE, E, SE, S, SW, W, NW, Flat

**Tips:**
- Use GPS device for accurate coordinates
- Measure slope with clinometer
- Record aspect with compass

### Tab 3: Environment

**Substrate Characteristics:**
- **Soil Type**: Sand, Sandy loam, Loam, Clay loam, Clay, Peat, Rocky, Gravel
- **Soil Depth**: In centimeters
- **Soil Moisture**: Dry, Moist, Wet, Waterlogged, Inundated
- **Soil pH**: 4.0-8.0 range
- **Rock Exposure**: Percentage (0-100%)

**Habitat Classification:**
- **Habitat Type**: Free text description
- **FOSSIT Code**: e.g., GS3, HD1, WN1
- **Annex I Habitat Code**: e.g., 2130, 1330, 6210

**Management & Impacts:**
- **Land Use**: Grazing, Mowing, Abandoned, Recreation, Conservation, Agriculture, Forestry
- **Grazing Intensity**: None, Light, Moderate, Heavy, Severe
- **Disturbance/Damage**: Free text (e.g., trampling, erosion, vehicle tracks)
- **Threats/Pressures**: Free text (e.g., recreational pressure, invasive species)

### Tab 4: Vegetation Structure

**Overall Cover:**
- Total Vegetation Cover (%)

**Layer Breakdown:**

**Tree Layer (T1):**
- Height in meters (e.g., 8-12)
- Cover percentage

**Shrub Layer (T2):**
- Height in meters (e.g., 1-3)
- Cover percentage

**Herb Layer (T3):**
- Height in centimeters (e.g., 10-40)
- Cover percentage

**Moss/Lichen Layer (T4):**
- Cover percentage

**Example:**
```
Total Vegetation: 85%
Tree Layer: 0m, 0%
Shrub Layer: 0.5-1.5m, 15%
Herb Layer: 20-60cm, 70%
Moss Layer: 5%
```

### Tab 5: Species List

**Adding Species:**
1. Click **"Add Species"** button
2. Enter scientific name (e.g., *Festuca rubra*)
3. Select cover-abundance value
4. Choose vegetation layer
5. Add notes if needed
6. Repeat for all species

**Braun-Blanquet Cover-Abundance Scale:**
- **r** = rare, single individuals
- **+** = <1% cover, few individuals
- **1** = 1-5% cover, numerous but low cover
- **2** = 6-25% cover, any number
- **3** = 26-50% cover
- **4** = 51-75% cover
- **5** = 76-100% cover

**Species Entry Example:**
```
Scientific Name: Ammophila arenaria
Cover-Abundance: 4 (51-75%)
Layer: Herb
Notes: Dominant species, flowering

Scientific Name: Festuca rubra
Cover-Abundance: 2 (6-25%)
Layer: Herb
Notes: Throughout plot

Scientific Name: Sedum acre
Cover-Abundance: + (<1%)
Layer: Herb
Notes: Occasional in bare patches
```

**Tips:**
- Use full scientific names with author if known
- Record all vascular plants, bryophytes, and lichens
- List species in order of dominance
- Note phenology (flowering, fruiting)
- Record unusual features or condition

### Tab 6: Notes & Photos

**General Notes:**
- Additional observations
- Unusual features
- Context information
- Weather conditions during survey
- Any factors affecting vegetation

**Photo References:**
- List photo file names or numbers
- Multiple photos can be comma-separated
- e.g., "IMG_1234.jpg, IMG_1235.jpg, IMG_1236.jpg"

**Example Notes:**
```
General Notes: "Plot located in middle of dune slack.
Recent storm damage evident with sand deposition on
western edge. Rabbit grazing pressure moderate.
Weather: Clear, 15°C, light SW wind. Surveyed 10:30-11:45."

Photo References: "IMG_2401.jpg (overview), IMG_2402.jpg
(ground view), IMG_2403.jpg (Ammophila detail)"
```

## Data Management Features

### Saving & Editing

**Auto-Save:**
- Data saved when you click "Save Relevé"
- Stored in browser localStorage
- Persistent across browser sessions
- No internet required

**Edit Existing:**
- Click pencil icon in relevé list
- Make changes
- Click "Save Relevé" again
- Updated timestamp recorded

### Duplicate Relevé

**Use Case:** Multiple plots at same site with similar characteristics

**How To:**
1. Find relevé to duplicate
2. Click copy icon
3. System creates duplicate with "_copy" suffix
4. Edit plot number and unique details
5. Save as new relevé

**Benefits:**
- Saves time re-entering site info
- Maintains consistency
- Quick setup for plot series

### Delete Relevé

1. Click trash icon next to relevé
2. Confirm deletion
3. Relevé permanently removed from localStorage

**Warning:** Deletion cannot be undone. Export data regularly!

### Search & Filter

**Search by:**
- Plot number
- Locality
- Habitat type

**Real-time filtering:** Type in search box, list updates instantly

### Export to CSV

**Purpose:** Transfer data to spreadsheet for analysis

**Steps:**
1. Click **"Export CSV"** button
2. File downloads automatically
3. Named: `releves_YYYY-MM-DD.csv`

**CSV Includes:**
- All plot metadata
- Location data
- Habitat information
- Vegetation structure
- Species count (but not individual species)
- Notes

**For Species Lists:**
- Currently export shows counts only
- For full species export, use individual relevé data
- Future enhancement: detailed species export

## Offline Usage

### Working Without Internet

**The relevés survey is specifically designed for offline field use:**

✅ **What Works Offline:**
- Create new relevés
- Edit existing relevés
- Add/remove species
- Save all data
- Search existing relevés
- Duplicate relevés
- Delete relevés
- Export to CSV

❌ **What Requires Internet:**
- Initial page load
- Sync to cloud database (future feature)

### Field Workflow Recommendation

**Before Going to Field:**
1. Open Dulra platform
2. Navigate to Relevés Survey
3. Ensure page loads completely
4. Check you can see existing relevés (if any)
5. Browser is now ready for offline use

**In the Field:**
1. Create new relevé
2. Fill in site information
3. Record all data
4. Save relevé (stored locally)
5. Continue with more relevés
6. All data persists in browser

**After Field Work:**
1. Return to internet connection
2. Open Relevés Survey
3. All data still available
4. Export to CSV for backup
5. Data remains in browser for future access

### Data Safety Tips

**Protect Your Data:**
- Don't clear browser cache/data
- Export CSV backups regularly
- Use same browser each time
- Don't use incognito/private mode (data not persisted)
- Consider exporting after each field day

**Browser Storage:**
- Data stored in localStorage
- Persists until manually cleared
- Not shared between browsers
- Unique to each browser profile

## Dashboard Statistics

**Real-time Stats Displayed:**
- **Total Relevés**: Count of all surveys
- **Total Species**: Sum of all species records across all relevés
- **Unique Habitats**: Count of different habitat types
- **Offline Saved**: Number of relevés stored locally

**Sync Status:**
- **Saved (Offline)**: Stored in browser only
- **Pending**: Queued for cloud sync (future)
- **Synced**: Backed up to cloud (future)

## Best Practices

### Pre-Survey Preparation

1. **Review Site**: Check GIS mapping data
2. **Plan Route**: Decide plot locations
3. **Equipment Check**: GPS, clinometer, pH meter, camera
4. **Reference Materials**: Have species guides ready
5. **Browser Test**: Ensure offline capability works

### During Survey

1. **Complete Required Fields First**: Plot number, date, surveyor
2. **Location Data**: Record GPS immediately
3. **Systematic Recording**: Work through layers top to bottom
4. **Species Names**: Use full scientific names
5. **Photos**: Take multiple angles, include scale
6. **Notes**: Record anything unusual or contextual

### After Survey

1. **Review Data**: Check for completeness
2. **Quality Check**: Verify coordinates, species names
3. **Export Backup**: Download CSV copy
4. **Photo Organization**: Match photo references to files
5. **Data Analysis**: Import CSV to statistical software if needed

## Tips for Efficient Data Entry

### Quick Entry Techniques

**Plot Numbering:**
- Use consistent format: R001, R002, R003
- Include site code if multiple sites: ROS-R001, CAS-R001
- Sequential numbering for transects

**Copy-Paste:**
- Duplicate similar plots to save time
- Edit only what changed
- Maintain consistency

**Species Recording:**
- Most common first
- Group by layer
- Use shortcuts: "Amm are" for *Ammophila arenaria*
- Add full names later if needed

**Vegetation Structure:**
- Estimate quickly using visual comparison
- Round to nearest 5% for cover
- Height ranges acceptable (8-12m)

### Common Pitfalls to Avoid

❌ **Don't:**
- Leave plot number blank (you can't save without it)
- Use spaces in plot numbers (use hyphens: R-001)
- Forget to add surveyor name
- Mix up layer assignments
- Skip species layer designation
- Forget to save before leaving page

✅ **Do:**
- Fill in required fields immediately
- Use consistent naming conventions
- Record all species, even rare ones
- Note weather conditions
- Take reference photos
- Save frequently
- Export backups regularly

## Troubleshooting

### Data Not Saving

**Issue:** Click save but relevé doesn't appear in list

**Solution:**
- Check required fields are filled (Plot Number, Surveyor)
- Ensure browser allows localStorage
- Check browser console for errors
- Try different browser

### Data Disappeared

**Issue:** Previously saved relevés not showing

**Solution:**
- Check you're using same browser
- Check browser data wasn't cleared
- Look in browser settings > localStorage
- Import backup CSV if available

### Can't Add Species

**Issue:** "Add Species" button not working

**Solution:**
- Ensure you saved the relevé first
- Check you're in edit mode
- Refresh page and try again

### Export Not Working

**Issue:** CSV doesn't download

**Solution:**
- Check browser download settings
- Allow pop-ups/downloads from site
- Check browser download folder
- Try different browser

### Offline Mode Not Working

**Issue:** Can't access without internet

**Solution:**
- Page must load once with internet first
- Clear cache and reload with internet
- Ensure browser supports localStorage
- Check browser offline mode settings

## Future Enhancements

Planned features include:
- Cloud database sync with Supabase
- Multi-user collaboration
- Photo upload and attachment
- GPS coordinate capture directly in app
- Species name autocomplete
- Habitat type suggestions
- Advanced CSV export with full species lists
- PDF report generation
- Import CSV functionality
- Mobile app version
- Offline map tiles
- Comparison between relevés
- Statistical analysis tools
- Species richness calculations

## Data Standards

### Scientific Names

- Use binomial nomenclature: *Genus species*
- Include author if known: *Festuca rubra* L.
- Subspecies format: *Festuca rubra* subsp. *commutata*
- Variety format: *Festuca rubra* var. *pruinosa*

### Habitat Codes

**FOSSIT:**
- GS1: Dry calcareous and neutral grassland
- GS3: Dry-humid acid grassland
- GS4: Wet grassland
- HD1: Marram dunes
- PB2: Salicornia flats

**Annex I:**
- 2130: Fixed coastal dunes
- 1330: Atlantic salt meadows
- 6210: Semi-natural dry grasslands
- 6410: Molinia meadows
- 7230: Alkaline fens

### Cover Scales

**Braun-Blanquet (recommended):**
- r, +, 1, 2, 3, 4, 5

**Alternatives (convert to BB scale):**
- Domin scale: 1-10
- Percentage: 0-100%
- DAFOR: Dominant, Abundant, Frequent, Occasional, Rare

## Support & Training

### Learning Resources

- Review example relevés in system
- Consult botanical field guides
- Follow phytosociological methodology guides
- Attend vegetation survey training courses

### Getting Help

1. Check this guide
2. Review onboarding tutorial
3. Consult field manual
4. Contact platform administrator
5. Join training workshops

---

**Version:** 1.0
**Last Updated:** November 2025
**Component:** `RelevesSurvey.tsx`
**Methodology:** Based on Braun-Blanquet phytosociological approach
