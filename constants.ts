import type { SurveyTemplate, TeamMember, Survey, Project, ActionCategory, SFA_HabitatAssessmentRules, AuditEntry, SiteAssessment } from './types';

export const surveyTemplates: SurveyTemplate[] = [
    { id: "PEA", name: "Preliminary Ecological Appraisal", description: "Phase 1 Habitat Survey to provide a baseline ecological assessment of a site, identifying key habitats and potential constraints.", icon: "ClipboardList" },
    { id: "EcIA", name: "Ecological Impact Assessment", description: "A comprehensive assessment to identify, quantify, and evaluate the potential impacts of a proposed project on ecosystems.", icon: "AlertTriangle" },
    { id: "NIS", name: "Natura Impact Statement", description: "A detailed report required for any plan or project that may affect a Natura 2000 site (SAC or SPA).", icon: "ShieldCheck" },
    { id: "AA", name: "Appropriate Assessment Screening", description: "Stage 1 screening report to determine if a plan or project is likely to have significant effects on a Natura 2000 site.", icon: "Search" },
    { id: "Bat", name: "Bat Survey", description: "Includes preliminary roost assessments, dusk emergence/dawn re-entry surveys, and activity transects for bats.", icon: "Moon" },
    { id: "Bird", name: "Bird Survey", description: "Customisable surveys for breeding birds (BBS), wintering birds (WeBS), and vantage point surveys for specific species.", icon: "Bird" },
    { id: "Habitat", name: "Habitat & Botanical Survey", description: "Detailed botanical surveys including quadrat analysis, vegetation mapping (Fossitt), and Annex I habitat assessment.", icon: "Leaf" },
    { id: "Invasive", name: "Invasive Species Survey", description: "Identifies and maps non-native invasive species, providing management recommendations in line with regulations.", icon: "Bug" },
    { id: "ECoW", name: "ECoW Report", description: "Provides a template for Ecological Clerk of Works (ECoW) site monitoring reports to ensure environmental compliance.", icon: "UserCheck" }
];

export const defaultDb: { projects: Project[]; surveys: Survey[]; team: TeamMember[] } = {
    projects: [
        { id: 1, name: "Lough Ennell SAC", client: "NPWS", code: "NPWS-001-25" },
        { id: 91, name: "Clonakilty Bay SAC", client: "Cork CoCo", code: "CCC-091-24"}
    ],
    surveys: [
        { id: 101, projectId: 1, siteName: "Site A - Woodland", template: "PEA", status: "Completed", data: { habitat: "WD1 - Oak-birch-holly woodland", notes: "Mature oak canopy, limited undergrowth.", species: "Sciurus vulgaris (Red Squirrel)", photo: "https://placehold.co/600x400/a3e635/ffffff?text=Woodland+Canopy" } },
        { id: 102, projectId: 1, siteName: "Site B - River Crossing", template: "EcIA", status: "In Progress", data: {}, assignedTo: ["Cian O'Donnell"] },
    ],
    team: [
        { name: "Dr. Aoife Murphy", email: "aoife.murphy@dulra.ie", role: "Principal Ecologist", actionsCount: 5 },
        { name: "Cian O'Donnell", email: "cian.odonnell@dulra.ie", role: "Field Ecologist", actionsCount: 12 },
        { name: "Siobhán Kelly", email: "siobhan.kelly@dulra.ie", role: "GIS Specialist", actionsCount: 3 },
        { name: "Liam Byrne", email: "liam.byrne@dulra.ie", role: "Senior Ecologist", actionsCount: 8 },
        { name: "Niamh Walsh", email: "niamh.walsh@dulra.ie", role: "Project Manager", actionsCount: 2 },
        { name: "Conor Ryan", email: "conor.ryan@dulra.ie", role: "Graduate Ecologist", actionsCount: 15 },
        { name: "Aoife Doyle", email: "aoife.doyle@dulra.ie", role: "Ornithologist", actionsCount: 7 },
        { name: "Sean McCarthy", email: "sean.mccarthy@dulra.ie", role: "Field Ecologist", actionsCount: 11 },
        { name: "Fionnuala Gallagher", email: "fionnuala.gallagher@dulra.ie", role: "Botanist", actionsCount: 4 },
        { name: "Eoin Brennan", email: "eoin.brennan@dulra.ie", role: "GIS Specialist", actionsCount: 6 },
        { name: "Ciara Moore", email: "ciara.moore@dulra.ie", role: "Data Analyst", actionsCount: 1 },
        { name: "Padraig O'Connor", email: "padraig.oconnor@dulra.ie", role: "Senior Ecologist", actionsCount: 9 },
        { name: "Roisin Farrell", email: "roisin.farrell@dulra.ie", role: "Field Ecologist", actionsCount: 14 },
        { name: "Darragh Quinn", email: "darragh.quinn@dulra.ie", role: "Graduate Ecologist", actionsCount: 18 },
        { name: "Aisling Fitzgerald", email: "aisling.fitzgerald@dulra.ie", role: "Principal Ecologist", actionsCount: 3 },
        { name: "Tadhg Kennedy", email: "tadhg.kennedy@dulra.ie", role: "Ornithologist", actionsCount: 6 },
        { name: "Orla Murray", email: "orla.murray@dulra.ie", role: "GIS Specialist", actionsCount: 5 },
        { name: "Shane Power", email: "shane.power@dulra.ie", role: "Project Manager", actionsCount: 1 },
        { name: "Deirdre Healy", email: "deirdre.healy@dulra.ie", role: "Botanist", actionsCount: 8 },
        { name: "Ronan Daly", email: "ronan.daly@dulra.ie", role: "Field Ecologist", actionsCount: 13 },
        { name: "Grainne Casey", email: "grainne.casey@dulra.ie", role: "Senior Ecologist", actionsCount: 7 },
        { name: "Colm Maher", email: "colm.maher@dulra.ie", role: "Data Analyst", actionsCount: 2 },
        { name: "Maeve O'Sullivan", email: "maeve.osullivan@dulra.ie", role: "Graduate Ecologist", actionsCount: 16 }
    ]
};

export const defaultAuditTrail: AuditEntry[] = [
    { id: 1, timestamp: '2025-11-19T14:32:00', userName: 'Dr. Aoife Murphy', changeType: 'Created Project', itemName: 'Lough Ennell SAC', details: 'Project created for NPWS with code NPWS-001-25' },
    { id: 2, timestamp: '2025-11-19T14:45:30', userName: 'Cian O\'Donnell', changeType: 'Created Assessment', itemName: 'Site A - Woodland', siteName: 'Site A - Woodland', details: 'PEA template selected' },
    { id: 3, timestamp: '2025-11-19T15:12:15', userName: 'Siobhán Kelly', changeType: 'Updated GIS Mapping', itemName: 'Lough Ennell SAC', details: 'Updated habitat mapping with new boundary data' },
    { id: 4, timestamp: '2025-11-19T15:45:00', userName: 'Conor Ryan', changeType: 'Data Input', itemName: 'Site A - Woodland', siteName: 'Site A - Woodland', details: 'Entered habitat classification: WD1 - Oak-birch-holly woodland' },
    { id: 5, timestamp: '2025-11-19T16:20:30', userName: 'Aoife Doyle', changeType: 'Created Assessment', itemName: 'Site B - River Crossing', siteName: 'Site B - River Crossing', details: 'EcIA template selected' },
    { id: 6, timestamp: '2025-11-19T16:55:45', userName: 'Roisin Farrell', changeType: 'Data Input', itemName: 'Site A - Woodland', siteName: 'Site A - Woodland', details: 'Recorded species: Sciurus vulgaris (Red Squirrel)' },
    { id: 7, timestamp: '2025-11-19T17:10:00', userName: 'Liam Byrne', changeType: 'Created Action', itemName: 'Action-001', details: 'Conservation action created for habitat management' },
    { id: 8, timestamp: '2025-11-19T17:35:20', userName: 'Fionnuala Gallagher', changeType: 'Data Input', itemName: 'Site B - River Crossing', siteName: 'Site B - River Crossing', details: 'Botanical survey data entered' },
    { id: 9, timestamp: '2025-11-19T18:00:15', userName: 'Eoin Brennan', changeType: 'Updated GIS Mapping', itemName: 'Clonakilty Bay SAC', details: 'Added site access points and boundary layers' },
    { id: 10, timestamp: '2025-11-19T18:25:40', userName: 'Sean McCarthy', changeType: 'Updated Assessment', itemName: 'Site A - Woodland', siteName: 'Site A - Woodland', details: 'Field observations and notes updated' },
    { id: 11, timestamp: '2025-11-18T10:15:00', userName: 'Tadhg Kennedy', changeType: 'Data Input', itemName: 'Site A - Woodland', siteName: 'Site A - Woodland', details: 'Bird survey transect data recorded' },
    { id: 12, timestamp: '2025-11-18T11:45:30', userName: 'Darragh Quinn', changeType: 'Created Project', itemName: 'Clonakilty Bay SAC', details: 'Project created for Cork CoCo with code CCC-091-24' },
    { id: 13, timestamp: '2025-11-18T13:20:15', userName: 'Ciara Moore', changeType: 'Data Input', itemName: 'Lough Ennell SAC', siteName: 'Site A - Woodland', details: 'Data validation and QA checks completed' },
    { id: 14, timestamp: '2025-11-18T14:50:00', userName: 'Padraig O\'Connor', changeType: 'Created Assessment', itemName: 'Site Assessment-001', siteName: 'Site A - Woodland', details: 'Habitat evaluation assessment started' },
    { id: 15, timestamp: '2025-11-18T15:30:45', userName: 'Niamh Walsh', changeType: 'Updated Action', itemName: 'Action-001', details: 'Action status updated to In Progress' },
    { id: 16, timestamp: '2025-11-18T16:00:20', userName: 'Orla Murray', changeType: 'Updated GIS Mapping', itemName: 'Lough Ennell SAC', details: 'Threat mapping layer added for invasive species' },
    { id: 17, timestamp: '2025-11-18T16:45:10', userName: 'Ronan Daly', changeType: 'Data Input', itemName: 'Site B - River Crossing', siteName: 'Site B - River Crossing', details: 'Water quality parameters recorded' },
    { id: 18, timestamp: '2025-11-18T17:15:35', userName: 'Grainne Casey', changeType: 'Created Action', itemName: 'Action-002', details: 'Restoration action for river habitat created' },
    { id: 19, timestamp: '2025-11-17T09:30:00', userName: 'Aisling Fitzgerald', changeType: 'Created Assessment', itemName: 'NIS Assessment-001', siteName: 'Clonakilty Bay SAC', details: 'Natura Impact Statement assessment initiated' },
    { id: 20, timestamp: '2025-11-17T10:20:45', userName: 'Deirdre Healy', changeType: 'Data Input', itemName: 'Clonakilty Bay SAC', siteName: 'Clonakilty Bay SAC', details: 'Botanical species list compiled' }
];

export const gisFields = [
    { id: 'foss_qualifi', name: 'FOSS_QUALIFI', description: 'Qualifier code for Guide to Habitats classification subtypes.' },
    { id: 'add_hab', name: 'ADD_HAB', description: 'Field for secondary habitat classification schemes.' },
    { id: 'foss_name', name: 'FOSS_NAME', description: 'Habitat name corresponding to the Guide to Habitats code.' },
    { id: 'area_length', name: 'AREA / LENGTH', description: 'Total area (m²) for polygons or length (m) for polylines.' },
    { id: 'easting_northing', name: 'EASTING / NORTHING', description: 'Coordinates of a point feature or centroid.' },
    { id: 'photo_id', name: 'PHOTO_ID', description: 'Photo identification numbers related to the habitat feature.' },
    { id: 'annex_spp', name: 'ANNEX_SPP / RDB_SPP', description: 'Binary (0/1) for presence of Annex II/I or Red Data book species.' },
    { id: 'evaluation', name: 'EVALUATION', description: 'Conservation evaluation (e.g., International, National).' },
    { id: 'condition', name: 'CONDITION', description: 'Ecological condition of habitats (e.g., scale 1-5).' },
    { id: 'threats', name: 'THREATS', description: 'Specific codes identifying threats to habitats.' },
    { id: 'notes_species', name: 'NOTES / SPECIES', description: 'General comments, characteristic, or notable species.' }
];

export const sacConditionsCsv = `Site Name ,Site code,Last Upate ,Habitats Health ,Species Health,COUNTY
River Barrow and River Nore SAC,2162,June 2025,Inadequate,Bad,Wexford
Hook Head SAC,764,January 2025,Favourable,Favourable,Wexford
Belgica Mound Province SAC,2327,January 2025,Inadequate,Inadequate,Offshore
West Connacht Coast SAC,2998,January 2025,Bad,Favourable,Galway
Codling Fault Zone SAC,3015,January 2025,Favourable,Inadequate,Offshore
Lambay Island SAC,204,December 2024,Bad,Bad,Dublin
Killyconny Bog (Cloghbally) SAC,6,November 2024,Favourable,Inadequate,Cavan
Lough Oughter and Associated Loughs SAC,7,November 2024,Favourable,Favourable,Cavan
Ballyallia Lake SAC,4,October 2024,Inadequate,Favourable,Clare
Ballycullinan Lake SAC,10,October 2024,Bad,Inadequate,Clare
Black Head/Poulsallagh Complex,20,September 2024,Favourable,Favourable,Clare
Danes Hole Poulnalecka SAC,90,September 2024,Inadequate,Bad,Clare
Dromore Woods & Loughs,32,August 2024,Favourable,Favourable,Clare
Moyree River System,57,July 2024,Inadequate,Inadequate,Clare
Glengarriff Harbour and Woodland,90,June 2024,Bad,Favourable,Cork
Clonakilty Bay SAC,91,May 2024,Favourable,Inadequate,Cork
Caha Mountains SAC,93,April 2024,Inadequate,Bad,Cork
Lough Hyne Nature Reserve and Environs SAC,97,March 2024,Favourable,Favourable,Cork
Roaringwater Bay and Islands SAC,101,February 2024,Inadequate,Inadequate,Cork
Three Castle Head to Mizen Head,109,January 2024,Bad,Favourable,Cork
Ballymacoda Bay SAC,77,Dec 2023,Favourable,Favourable,Cork
Great Island Channel SAC,1058,Nov 2023,Inadequate,Favourable,Cork
Blackwater River SAC,2170,Oct 2023,Bad,Bad,Cork
Old Head of Kinsale SAC,70,Sep 2023,Favourable,Inadequate,Cork
Courtmacsherry Estuary SAC,81,Aug 2023,Inadequate,Inadequate,Cork
Kilkeran Lake and Castlefreke Dunes SAC,71,Jul 2023,Favourable,Favourable,Cork
Galley Head to Duneen Head SAC,69,Jun 2023,Bad,Favourable,Cork
Sheep's Head SAC,79,May 2023,Favourable,Inadequate,Cork
Kenmare River SAC,2158,Apr 2023,Inadequate,Bad,Cork
Beara Peninsula SAC,84,Mar 2023,Favourable,Favourable,Cork`;

export const spaConditionsCsv = `Site Name ,Site Code ,Last Updated,Habitats Health ,Species Health,COUNTY
Lady's Island Lake SPA,4009,July 2025,Favourable,Favourable,Wexford
Termoncarragh Lake and Annagh Machair SPA,4093,June 2025,Inadequate,Favourable,Mayo
Inishmore SPA,4152,June 2025,Bad,Bad,Galway
Dingle Peninsula SPA,4153,June 2025,Favourable,Inadequate,Kerry
Horn Head to Fanad Head SPA,4194,June 2025,Inadequate,Inadequate,Donegal
Cliffs of Moher SPA,4005,June 2025,Favourable,Favourable,Clare
Cork Harbour SPA,4030,May 2025,Inadequate,Favourable,Cork
Ballymacoda Bay SPA,4023,April 2025,Favourable,Favourable,Cork
Sovereign Islands SPA,4124,March 2025,Bad,Inadequate,Cork
Clonakilty Bay SPA,4081,Feb 2025,Inadequate,Bad,Cork`;

export const nhaConditionsCsv = `Site Name ,Site Code ,Last Updated,Habitats Health ,Species Health 
Slieve Rushen Bog NHA,9,Not Assigned,Cavan,674.7
Inishduff NHA,151,Pending,Donegal,46.5
Roaninish NHA,184,In Progress,Donegal,145.8
Lough Namucka Bog NHA,220,Completed,Galway,221.0`;

export const assessmentsCsvData = `SITECODE,SITE_NAME,Status,COUNTY,HA,Link to Survey 
9,Slieve Rushen Bog NHA,Not Assigned,Cavan,674.7,https://www.npws.ie/protected-sites/nha/000009
151,Inishduff NHA,Pending,Donegal,46.5,https://www.npws.ie/protected-sites/nha/000151
184,Roaninish NHA,In Progress,Donegal,145.8,https://www.npws.ie/protected-sites/nha/000184
220,Lough Namucka Bog NHA,Completed,Galway,221.0,https://www.npws.ie/protected-sites/nha/000220
6, Killyconny Bog (Cloghbally) SAC,Pending, Cavan, 284,
7, Lough Oughter and Associated Loughs SAC, Completed, Galway, 898,
4, Ballyallia Lake SAC, Completed, Galway, 897,
10, Ballycullinan Lake SAC, Completed, Galway, 798, 
20, Black Head/Poulsallagh Complex, Completed, Donegal,199,
90, Danes Hole Poulnalecka SAC, Completed, Mayo, 7889
32, Dromore Woods & Loughs, Completed, Cork, 8978,
37, Pouladatig Cave 1999,  Completed, Cork, 879,
51, Lough Gash Turlough SAC, Completed, Cork, 878,
54, Moneen Mountain 1997, Completed, Limerick, 9889,
57, Moyree River System, Completed, Cork, 878,
64, Poulnagordon Cave (Quin) SAC, Completed, Cork, 878,
77, Ballymacoda(Clonpriest and Pillmore)SAC, Completed, Cork, 7768,
90, Glengarriff Harbour and Woodland, Completed, Cork, 756,
91,Clonakilty Bay SAC (Inchydoney Island),Completed,Cork,521,
93, Caha Mountains SAC, Completed, Donegal, 426,
97, Lough Hyne Nature Reserve and Environs SAC, Completed, Sligo, 549,
101, Roaringwater Bay and Islands SAC, Completed, Sligo,470,
106, St. Gobnet's Wood SAC, Completed, Donegal,216,
109, Three Castle Head to Mizen Head, Completed, Donegal,540,
111, Aran Island (Donegal) Cliffs SAC, Completed, Donegal, 613,
1058,Great Island Channel SAC,In Progress,Cork,1200,
2170,Blackwater River SAC,Pending,Cork,15000,
70,Old Head of Kinsale SAC,Not Assigned,Cork,250,
81,Courtmacsherry Estuary SAC,Completed,Cork,750,
71,Kilkeran Lake and Castlefreke Dunes SAC,In Progress,Cork,300,
69,Galley Head to Duneen Head SAC,Pending,Cork,400,
79,Sheep's Head SAC,Not Assigned,Cork,600,
2158,Kenmare River SAC,Completed,Cork,25000,
84,Beara Peninsula SAC,In Progress,Cork,1800,
4030,Cork Harbour SPA,Pending,Cork,6500,
4023,Ballymacoda Bay SPA,Not Assigned,Cork,1000,
4124,Sovereign Islands SPA,Completed,Cork,50,
4081,Clonakilty Bay SPA,In Progress,Cork,600,
72,Bandon River SAC,Pending,Cork,800,
75,Gyleen races and Dumping Ground SAC,Not Assigned,Cork,1300,`;

export const actionsCsvData = `SITECODE,SITE_NAME,Status,COUNTY,Action Type,Link to Survey
245,Clooncullaun Bog NHA,In Progress,Galway,Site and habitat management,https://www.npws.ie/protected-sites/nha/000245
247,Slieve Bog NHA,Completed,Galway,Species protection,https://www.npws.ie/protected-sites/nha/000247
249,Cloonoolish Bog NHA,Completed,Galway,Species protection,https://www.npws.ie/protected-sites/nha/000249
253,Cregganna Marsh NHA,Completed,Galway,Species protection,https://www.npws.ie/protected-sites/nha/000253
254,Crit Island West NHA,Not Assigned,Galway,Public engagement and education,https://www.npws.ie/protected-sites/nha/000254
267,Funshin Bog NHA,Not Assigned,Galway,Site and habitat management,https://www.npws.ie/protected-sites/nha/000267
280,Castle Ffrench West Bog NHA,Not Assigned,Galway,Site and habitat management,https://www.npws.ie/protected-sites/nha/000280
281,Keeloges Bog NHA,Pending,Galway,Site and habitat management,https://www.npws.ie/protected-sites/nha/000281
283,Kilmore Bog NHA,Pending,Galway,Site and habitat management,https://www.npws.ie/protected-sites/nha/000283
284,Kilnaborris Bog NHA,Pending,Galway,Site and habitat management,https://www.npws.ie/protected-sites/nha/000284
6, Killyconny Bog (Cloghbally) SAC, Completed,Cavan, Site and habitat management,
7, Lough Oughter and Associated Loughs SAC, Completed, Galway, Site and habitat management,
4, Ballyallia Lake SAC, Completed,Galway, Site and habitat management,
10, Ballycullinan Lake SAC, Completed, Galway,  Site and habitat management,
20, Black Head/Poulsallagh Complex, Completed, Donegal,Site and habitat management,
90, Danes Hole Poulnalecka SAC, Completed, Mayo, Site and habitat management,
32, Dromore Woods & Loughs, Completed, Cork, Site and habitat management,
37, Pouladatig Cave 1999,  Completed, Cork, Site and habitat management,
51, Lough Gash Turlough SAC, Completed, Cork,Site and habitat management,
54, Moneen Mountain 1997, Completed, Limerick, Site and habitat management,
57, Moyree River System, Completed,Cork,Site and habitat management,
64, Poulnagordon Cave (Quin) SAC, Completed, Cork, Site and habitat management,
77, Ballymacoda(Clonpriest and Pillmore)SAC, Completed,Cork,  Site and habitat management,
90, Glengarriff Harbour and Woodland, Completed,Cork, Site and habitat management,
91,Clonakilty Bay SAC (Inchydoney Island),Completed,Cork,Site and habitat management,
93, Caha Mountains SAC, Completed, Donegal, Site and habitat management,
97, Lough Hyne Nature Reserve and Environs SAC,Completed, Sligo,  Site and habitat management,
101, Roaringwater Bay and Islands SAC, Completed, Sligo,Site and habitat management,
106, St. Gobnet's Wood SAC, Completed,Donegal,Site and habitat management
109, Three Castle Head to Mizen Head, Completed, Donegal,Site and habitat management,
111, Aran Island (Donegal) Cliffs SAC, Completed,Donegal,Site and habitat management,
1058,Great Island Channel SAC,In Progress,Cork,Invasive Species Control,
2170,Blackwater River SAC,Pending,Cork,Hydrological Works,
70,Old Head of Kinsale SAC,Not Assigned,Cork,Species Monitoring,
81,Courtmacsherry Estuary SAC,Completed,Cork,Path Repair,
71,Kilkeran Lake and Castlefreke Dunes SAC,In Progress,Cork,Visitor Management,
69,Galley Head to Duneen Head SAC,Pending,Cork,Grazing Management,
79,Sheep's Head SAC,Not Assigned,Cork,Scrub Removal,
2158,Kenmare River SAC,Completed,Cork,Invasive Species Control,
84,Beara Peninsula SAC,In Progress,Cork,Hydrological Works,
4030,Cork Harbour SPA,Pending,Cork,Species Monitoring,
4023,Ballymacoda Bay SPA,Not Assigned,Cork,Path Repair,
4124,Sovereign Islands SPA,Completed,Cork,Visitor Management,
4081,Clonakilty Bay SPA,In Progress,Cork,Grazing Management,
72,Bandon River SAC,Pending,Cork,Scrub Removal,
75,Gyleen races and Dumping Ground SAC,Not Assigned,Cork,Invasive Species Control,`;

export const clonakiltyBayActions: ActionCategory[] = [
  {
    name: '1. Habitat Restoration (Addressing Failed Attributes)',
    description: 'These actions directly target the failed attributes of "insufficient bare ground" and "area loss" due to scrub encroachment.',
    actions: [
      {
        title: '1.1 Introduce Conservation Grazing',
        objective: 'Introduce a low-intensity, seasonal grazing programme using hardy cattle breeds to create bare ground, control scrub, and vary sward height.',
        status: 'In Progress',
        completionDate: '2025-12-31',
        assignedTo: 'Cian O\'Donnell',
      },
      {
        title: '1.2 Manage Invasive & Native Scrub',
        objective: 'Targeted removal of invasive non-native species (e.g., Sea-buckthorn) and cutting back dense native scrub like Bramble or Gorse to reclaim lost dune habitat.',
        status: 'Completed',
        completionDate: '2024-08-01',
        assignedTo: 'Cian O\'Donnell',
      },
      {
        title: '1.3 "Re-activate" Dune Dynamism (If Required)',
        objective: 'In extreme cases of over-stabilisation, mechanically create "dune slacks" or "blowouts" by stripping the top vegetated soil layer to expose bare sand.',
        status: 'Not Started',
        completionDate: '2026-03-01',
        assignedTo: 'Dr. Aoife Murphy',
      },
    ],
  },
  {
    name: '2. Visitor & Access Management',
    description: 'These are standard supporting measures to reduce pressure and allow the restoration actions to work.',
    actions: [
      {
        title: '2.1 Rationalise Public Access',
        objective: 'Install post-and-wire fencing to protect sensitive areas, define pathways with boardwalks, and install interpretation signage to guide visitors.',
        status: 'Completed',
        completionDate: '2024-06-15',
        assignedTo: 'Siobhán Kelly',
      },
    ],
  },
  {
    name: '3. Monitoring',
    description: 'The NPWS would conduct follow-up monitoring (repeating the condition assessment) to measure the success of the actions.',
    actions: [
      {
        title: '3.1 Conduct Follow-up Monitoring',
        objective: 'Check if targets are met: increased bare ground, varied sward height, reduced scrub cover, and stabilised or increased fixed dune habitat area.',
        status: 'Not Started',
        completionDate: '2026-09-01',
        assignedTo: 'Dr. Aoife Murphy',
      },
    ],
  },
];

export const dromoreWoodsActions: ActionCategory[] = [
  {
    name: '1. Habitat Restoration (Addressing Failed Attributes)',
    description: 'Actions to restore woodland structure and prevent encroachment of non-native species.',
    actions: [
      {
        title: '1.1 Native Tree Planting Programme',
        objective: 'Plant native oak, ash, and birch saplings to restore natural woodland canopy structure and increase biodiversity.',
        status: 'In Progress',
        completionDate: '2025-11-30',
        assignedTo: 'Liam Byrne',
      },
      {
        title: '1.2 Remove Invasive Rhododendron',
        objective: 'Systematic removal of Rhododendron ponticum which is out-competing native understory vegetation and reducing light levels.',
        status: 'In Progress',
        completionDate: '2025-09-15',
        assignedTo: 'Fionnuala Gallagher',
      },
      {
        title: '1.3 Restore Woodland Edge Habitats',
        objective: 'Create graduated woodland edge with native shrubs and wildflowers to increase structural diversity.',
        status: 'Not Started',
        completionDate: '2026-05-01',
        assignedTo: 'Padraig O\'Connor',
      },
    ],
  },
  {
    name: '2. Visitor & Access Management',
    description: 'Protect sensitive woodland areas while maintaining appropriate public access.',
    actions: [
      {
        title: '2.1 Install Protective Fencing',
        objective: 'Fence off regeneration areas and nesting sites to prevent trampling and disturbance.',
        status: 'Completed',
        completionDate: '2024-07-20',
        assignedTo: 'Siobhán Kelly',
      },
      {
        title: '2.2 Pathway Maintenance',
        objective: 'Repair and maintain woodland trails to prevent erosion and guide visitors away from sensitive areas.',
        status: 'In Progress',
        completionDate: '2025-10-15',
        assignedTo: 'Eoin Brennan',
      },
    ],
  },
  {
    name: '3. Monitoring',
    description: 'Regular assessment of woodland health and regeneration success.',
    actions: [
      {
        title: '3.1 Annual Woodland Health Survey',
        objective: 'Monitor canopy cover, understory diversity, presence of indicator species, and natural regeneration rates.',
        status: 'Not Started',
        completionDate: '2026-06-30',
        assignedTo: 'Dr. Aoife Murphy',
      },
    ],
  },
];

export const loughGashActions: ActionCategory[] = [
  {
    name: '1. Habitat Restoration (Addressing Failed Attributes)',
    description: 'Actions to restore hydrological function and improve turlough habitat quality.',
    actions: [
      {
        title: '1.1 Restore Natural Hydrology',
        objective: 'Remove drainage modifications and restore natural water level fluctuations essential for turlough functioning.',
        status: 'In Progress',
        completionDate: '2025-10-30',
        assignedTo: 'Conor Ryan',
      },
      {
        title: '1.2 Implement Appropriate Grazing Regime',
        objective: 'Introduce light winter grazing to maintain open turlough grassland and prevent scrub encroachment.',
        status: 'Not Started',
        completionDate: '2026-02-28',
        assignedTo: 'Sean McCarthy',
      },
      {
        title: '1.3 Control Invasive Species',
        objective: 'Remove invasive species that threaten the unique turlough flora, particularly around the flood zone.',
        status: 'Completed',
        completionDate: '2024-09-10',
        assignedTo: 'Roisin Farrell',
      },
    ],
  },
  {
    name: '2. Visitor & Access Management',
    description: 'Manage access to protect the delicate turlough ecosystem.',
    actions: [
      {
        title: '2.1 Seasonal Access Restrictions',
        objective: 'Implement seasonal closures during critical flooding periods to prevent disturbance to habitat and wildlife.',
        status: 'Completed',
        completionDate: '2024-05-15',
        assignedTo: 'Niamh Walsh',
      },
    ],
  },
  {
    name: '3. Monitoring',
    description: 'Track hydrological conditions and habitat quality.',
    actions: [
      {
        title: '3.1 Hydrological and Ecological Monitoring',
        objective: 'Monitor water levels, flooding duration, vegetation composition, and presence of turlough-specific species.',
        status: 'Not Started',
        completionDate: '2026-12-01',
        assignedTo: 'Ciara Moore',
      },
    ],
  },
];

export const pouladatigCaveActions: ActionCategory[] = [
  {
    name: '1. Habitat Restoration (Addressing Failed Attributes)',
    description: 'Actions to protect cave habitat and maintain suitable conditions for bat populations.',
    actions: [
      {
        title: '1.1 Maintain Cave Microclimate',
        objective: 'Ensure stable temperature and humidity levels by controlling access points and preventing unauthorised entry.',
        status: 'Completed',
        completionDate: '2024-04-20',
        assignedTo: 'Aoife Doyle',
      },
      {
        title: '1.2 Restore Surface Habitat',
        objective: 'Restore woodland and scrub around cave entrance to provide foraging habitat for bat populations.',
        status: 'In Progress',
        completionDate: '2025-08-30',
        assignedTo: 'Tadhg Kennedy',
      },
      {
        title: '1.3 Install Bat-Friendly Gating',
        objective: 'Replace inadequate barriers with bat-friendly gates that allow bat access while preventing human disturbance.',
        status: 'In Progress',
        completionDate: '2025-12-15',
        assignedTo: 'Deirdre Healy',
      },
    ],
  },
  {
    name: '2. Visitor & Access Management',
    description: 'Strict access control to protect sensitive cave ecosystem.',
    actions: [
      {
        title: '2.1 Implement Permit System',
        objective: 'Establish controlled access permit system for educational and research visits only.',
        status: 'Completed',
        completionDate: '2024-03-10',
        assignedTo: 'Shane Power',
      },
      {
        title: '2.2 Install Warning Signage',
        objective: 'Place clear signage explaining the ecological importance and legal protection of the site.',
        status: 'Completed',
        completionDate: '2024-03-25',
        assignedTo: 'Orla Murray',
      },
    ],
  },
  {
    name: '3. Monitoring',
    description: 'Regular monitoring of bat populations and cave conditions.',
    actions: [
      {
        title: '3.1 Annual Bat Population Survey',
        objective: 'Conduct annual surveys to monitor bat species diversity, population sizes, and breeding success.',
        status: 'Not Started',
        completionDate: '2026-08-01',
        assignedTo: 'Aoife Doyle',
      },
    ],
  },
];

export const siteActionPlans: { [siteCode: string]: { siteName: string; actions: ActionCategory[] } } = {
  '91': { siteName: 'Clonakilty Bay SAC (Inchydoney Island)', actions: clonakiltyBayActions },
  '32': { siteName: 'Dromore Woods & Loughs', actions: dromoreWoodsActions },
  '51': { siteName: 'Lough Gash Turlough SAC', actions: loughGashActions },
  '37': { siteName: 'Pouladatig Cave', actions: pouladatigCaveActions },
};

export const clonakiltyBayAssessment: SiteAssessment = {
  siteName: 'Clonakilty Bay SAC (Inchydoney Island)',
  siteCode: '91',
  county: 'Cork',
  area: '87.4 ha',
  description: 'Clonakilty Bay SAC comprises a coastal sand dune system on Inchydoney Island, located approximately 3km south of Clonakilty town. The site features a series of fixed and mobile dunes with associated dune slacks and embryonic shifting dunes. The area is subject to moderate recreational pressure, with beach access points and informal pathways throughout the dune system.',
  mapUrl: 'https://placehold.co/600x400/e2e8f0/475569?text=Clonakilty+Bay+Overview+Map',
  habitats: [
    {
      code: '2130',
      name: 'Fixed coastal dunes with herbaceous vegetation (* priority habitat)',
      area: '52.3 ha',
      range: 'Favourable',
      areaStatus: 'Inadequate',
      structureAndFunctions: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Area loss due to scrub encroachment (bramble, gorse) covering approximately 15% of the habitat. Insufficient bare ground (<5% observed vs. 10-50% target). Vegetation structure shows limited diversity with dominant grasses suppressing typical dune flora. Positive indicators include presence of characteristic species and low non-native species cover.'
    },
    {
      code: '2110',
      name: 'Embryonic shifting dunes',
      area: '18.6 ha',
      range: 'Favourable',
      areaStatus: 'Favourable',
      structureAndFunctions: 'Favourable',
      futureProspects: 'Favourable',
      overallStatus: 'Favourable',
      notes: 'Well-developed embryonic dunes with typical pioneer vegetation including Elymus farctus and Ammophila arenaria. Natural dynamic processes ongoing with active sand accretion. Limited trampling impact observed only at designated access points.'
    },
    {
      code: '1330',
      name: 'Atlantic salt meadows',
      area: '16.5 ha',
      range: 'Favourable',
      areaStatus: 'Favourable',
      structureAndFunctions: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Saltmarsh shows signs of under-grazing with rank vegetation in upper zones. Sward height exceeds optimal range in 30% of the area. Some erosion along creek edges. Species composition remains largely intact with good representation of typical saltmarsh communities.'
    }
  ],
  species: [
    {
      name: 'Ringed Plover',
      scientificName: 'Charadrius hiaticula',
      population: 'Inadequate',
      habitat: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Population estimate: 4-6 breeding pairs (below favorable reference value of 10+ pairs). Breeding success impacted by recreational disturbance during nesting season. Suitable nesting habitat reduced due to vegetation encroachment on upper beach areas.'
    },
    {
      name: 'Light-bellied Brent Goose',
      scientificName: 'Branta bernicla hrota',
      population: 'Favourable',
      habitat: 'Favourable',
      futureProspects: 'Favourable',
      overallStatus: 'Favourable',
      notes: 'Winter population regularly exceeds 200 individuals. Saltmarsh feeding areas remain in good condition. No significant threats identified to wintering population.'
    }
  ],
  managementIssues: [
    'Scrub encroachment (bramble, gorse) on fixed dune habitats reducing characteristic open dune vegetation',
    'Insufficient grazing pressure leading to rank vegetation on saltmarsh and loss of bare ground on dunes',
    'Informal pathway network causing localized trampling and vegetation damage',
    'Recreational disturbance to breeding birds during peak visitor season (May-August)',
    'Lack of signage to guide visitors and protect sensitive areas'
  ],
  conservationObjectives: [
    'Restore area of fixed dune habitat (2130) through scrub management to achieve 95% of baseline extent',
    'Maintain embryonic dunes (2110) in favorable condition through natural processes',
    'Improve structure and functions of saltmarsh (1330) through appropriate grazing management',
    'Increase Ringed Plover breeding population to favorable reference value through habitat improvement and disturbance reduction',
    'Maintain Light-bellied Brent Goose winter population above 200 individuals'
  ]
};

export const dromoreWoodsAssessment: SiteAssessment = {
  siteName: 'Dromore Woods & Loughs',
  siteCode: '32',
  county: 'Cork',
  area: '423.8 ha',
  description: 'Dromore Woods & Loughs SAC is a large complex site comprising ancient oak-ash woodland, two oligotrophic lakes, and associated wetland habitats. Located 8km northwest of Kenmare, the site represents one of the most significant examples of native woodland in Southwest Ireland. The woodland shows a diverse age structure with some veteran trees over 300 years old.',
  mapUrl: 'https://placehold.co/600x400/e2e8f0/475569?text=Dromore+Woods+Overview+Map',
  habitats: [
    {
      code: '91A0',
      name: 'Old sessile oak woods with Ilex and Blechnum',
      area: '287.3 ha',
      range: 'Favourable',
      areaStatus: 'Favourable',
      structureAndFunctions: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Woodland extent is stable but regeneration is severely impacted by deer browsing. Ground flora shows poor regeneration with <5% of quadrats containing tree seedlings. Canopy structure remains good with diverse age classes. Invasive Rhododendron ponticum present in approximately 8% of woodland area, spreading from historical plantings. Veteran tree component well-represented.'
    },
    {
      code: '3110',
      name: 'Oligotrophic waters containing very few minerals',
      area: '92.4 ha',
      range: 'Favourable',
      areaStatus: 'Favourable',
      structureAndFunctions: 'Favourable',
      futureProspects: 'Favourable',
      overallStatus: 'Favourable',
      notes: 'Water quality remains excellent with oligotrophic status maintained. Aquatic vegetation communities typical and well-developed. No evidence of eutrophication. Fish populations healthy including Arctic charr.'
    },
    {
      code: '7140',
      name: 'Transition mires and quaking bogs',
      area: '44.1 ha',
      range: 'Favourable',
      areaStatus: 'Favourable',
      structureAndFunctions: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Hydrology partially impacted by historic drainage. Some areas showing signs of drying with scrub encroachment (willow, birch). Sphagnum cover reduced to 40-50% in affected areas (target >70%). Characteristic species assemblage still present but under pressure.'
    }
  ],
  species: [
    {
      name: 'Lesser Horseshoe Bat',
      scientificName: 'Rhinolophus hipposideros',
      population: 'Favourable',
      habitat: 'Favourable',
      futureProspects: 'Favourable',
      overallStatus: 'Favourable',
      notes: 'Maternity roost contains 120-150 individuals. Foraging habitat (woodland edge, riparian zones) in excellent condition. No threats identified. Population stable/increasing based on long-term monitoring data.'
    },
    {
      name: 'Otter',
      scientificName: 'Lutra lutra',
      population: 'Favourable',
      habitat: 'Favourable',
      futureProspects: 'Favourable',
      overallStatus: 'Favourable',
      notes: 'Strong signs of otter presence on both loughs and connecting streams. Holts and resting places well-distributed. Fish prey populations healthy.'
    },
    {
      name: 'Kerry Slug',
      scientificName: 'Geomalacus maculosus',
      population: 'Favourable',
      habitat: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Population appears viable but habitat quality declining due to Rhododendron invasion altering woodland structure and bryophyte communities. Found on veteran oaks and woodland boulders. Habitat suitability reduced in areas with dense Rhododendron cover.'
    }
  ],
  managementIssues: [
    'Rhododendron ponticum invasion covering 8% of woodland, spreading rapidly and outcompeting native flora',
    'Excessive deer browsing preventing woodland regeneration and ground flora development',
    'Historic drainage impacts on transition mire hydrology leading to drying and scrub encroachment',
    'Lack of active management to maintain open mire areas',
    'Unauthorized trail development causing soil compaction and disturbance to sensitive areas'
  ],
  conservationObjectives: [
    'Eradicate Rhododendron ponticum from woodland through systematic removal program',
    'Implement deer management to reduce browsing pressure and enable natural regeneration',
    'Restore transition mire hydrology through drain blocking and scrub management',
    'Maintain oligotrophic lake water quality through catchment protection',
    'Protect Lesser Horseshoe Bat maternity roost and maintain foraging habitat connectivity'
  ]
};

export const loughGashAssessment: SiteAssessment = {
  siteName: 'Lough Gash Turlough SAC',
  siteCode: '51',
  county: 'Cork',
  area: '53.2 ha',
  description: 'Lough Gash is a turlough (seasonal lake) located 5km northeast of Newmarket, representing one of the southernmost examples of this rare karst wetland habitat type in Ireland. The site floods during winter months through groundwater upwelling and drains completely in summer, creating a unique habitat supporting specialized plant and invertebrate communities.',
  mapUrl: 'https://placehold.co/600x400/e2e8f0/475569?text=Lough+Gash+Overview+Map',
  habitats: [
    {
      code: '3180',
      name: 'Turloughs (* priority habitat)',
      area: '37.6 ha',
      range: 'Favourable',
      areaStatus: 'Favourable',
      structureAndFunctions: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Hydrological function maintained but vegetation zonation impacted by nutrient enrichment. Characteristic turlough flora present but reduced in abundance. Potamogeton coloratus (fen pondweed) population declined. Evidence of eutrophication with increased algal growth during wet phase. Water quality shows elevated phosphate levels (0.08mg/l vs. target <0.03mg/l). Poaching damage from livestock around margins.'
    },
    {
      code: '6510',
      name: 'Lowland hay meadows',
      area: '15.6 ha',
      range: 'Inadequate',
      areaStatus: 'Inadequate',
      structureAndFunctions: 'Bad',
      futureProspects: 'Bad',
      overallStatus: 'Bad',
      notes: 'Significant habitat degradation due to agricultural intensification. Indicator species reduced to <3 species per quadrat (target >7). Ryegrass dominance >70% in most areas. Evidence of recent fertilizer application. Meadow area reduced by approximately 30% since baseline assessment. Management changed from traditional hay cutting to silage production with earlier cutting dates.'
    }
  ],
  species: [
    {
      name: 'Whooper Swan',
      scientificName: 'Cygnus cygnus',
      population: 'Inadequate',
      habitat: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Winter population reduced from 40-50 birds (2010-2015) to 15-20 birds currently. Habitat quality decline likely contributing factor. Grazing areas impacted by agricultural intensification. Birds now favoring alternative sites in the region.'
    }
  ],
  managementIssues: [
    'Nutrient enrichment of turlough from agricultural runoff, particularly phosphates',
    'Loss of traditional hay meadow management leading to species-poor grassland',
    'Intensified agricultural practices including fertilizer application and earlier cutting dates',
    'Livestock poaching damage around turlough margins',
    'Degradation of characteristic turlough vegetation zonation',
    'Decline in turlough water quality affecting aquatic communities'
  ],
  conservationObjectives: [
    'Restore turlough water quality to oligotrophic status through catchment management',
    'Restore hay meadow habitat through cessation of fertilizer use and return to traditional management',
    'Increase indicator species richness in meadows to target levels',
    'Manage livestock access to prevent poaching damage while maintaining appropriate grazing pressure',
    'Restore Whooper Swan population to favorable reference values through habitat improvement'
  ]
};

export const pouladatigCaveAssessment: SiteAssessment = {
  siteName: 'Pouladatig Cave SAC',
  siteCode: '37',
  county: 'Cork',
  area: '2.1 ha',
  description: 'Pouladatig Cave is a small but significant limestone cave system located 3km south of Fermoy. The cave provides important roosting habitat for Lesser Horseshoe Bats and contains well-developed cave formations. The site includes the cave entrance area with surrounding scrub and the underground passages extending approximately 250m.',
  mapUrl: 'https://placehold.co/600x400/e2e8f0/475569?text=Pouladatig+Cave+Overview+Map',
  habitats: [
    {
      code: '8310',
      name: 'Caves not open to the public',
      area: '0.3 ha',
      range: 'Favourable',
      areaStatus: 'Favourable',
      structureAndFunctions: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Cave structure intact but disturbance issues identified. Evidence of unauthorized access with multiple impacts: graffiti on formations (5 locations), litter accumulation, and disturbance to roosting bats during sensitive periods. Temperature and humidity monitoring shows increased fluctuation due to altered air flow from enlarged entrance. Some speleothem damage documented. Cave-adapted invertebrate communities present but reduced diversity compared to historical records.'
    },
    {
      code: '6210',
      name: 'Semi-natural dry grasslands and scrubland facies on calcareous substrates',
      area: '1.8 ha',
      range: 'Favourable',
      areaStatus: 'Favourable',
      structureAndFunctions: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Calcareous grassland around cave entrance showing scrub encroachment (blackthorn, hazel) covering 40% of grassland area. Characteristic flora still present including orchids but reduced abundance. Lack of grazing management leading to structural changes. Important as foraging habitat for cave-roosting bats.'
    }
  ],
  species: [
    {
      name: 'Lesser Horseshoe Bat',
      scientificName: 'Rhinolophus hipposideros',
      population: 'Inadequate',
      habitat: 'Inadequate',
      futureProspects: 'Inadequate',
      overallStatus: 'Inadequate',
      notes: 'Hibernation roost population declined from 35-40 individuals (2012-2016) to 18-22 individuals currently. Disturbance events documented during winter roost period including unauthorized cave access and photography. Cave microclimate alterations may be contributing to population decline. Foraging habitat around site being lost to scrub encroachment.'
    }
  ],
  managementIssues: [
    'Unauthorized access to cave causing direct disturbance to roosting bats and damage to cave formations',
    'Lack of effective access control measures (gate damaged/removed)',
    'Scrub encroachment on calcareous grassland reducing bat foraging habitat',
    'Microclimate alterations affecting hibernation roost suitability',
    'Litter and graffiti within cave system',
    'Limited monitoring and surveillance of the site'
  ],
  conservationObjectives: [
    'Eliminate disturbance to Lesser Horseshoe Bat hibernation roost through improved access control',
    'Restore cave microclimate to optimal hibernation conditions',
    'Increase hibernation roost population to favorable reference value (>30 individuals)',
    'Maintain and enhance bat foraging habitat through scrub management in surrounding grassland',
    'Protect cave formations from further damage',
    'Implement regular monitoring and surveillance program'
  ]
};

export const siteAssessments: { [siteCode: string]: SiteAssessment } = {
  '91': clonakiltyBayAssessment,
  '32': dromoreWoodsAssessment,
  '51': loughGashAssessment,
  '37': pouladatigCaveAssessment,
  '13': {
    siteName: 'Rossbehy',
    siteCode: '13',
    county: 'Kerry',
    area: '91.71 ha',
    description: 'Rossbehy is a large site covering almost 92ha located approximately 1.2km to the north-west of Glenbeigh, Co. Kerry, on the southern shore of Dingle Bay. The site comprises a sand spit which extends northwards into Dingle Bay and an area of saltmarsh which occurs behind (to the east of) the sand dunes.',
    mapUrl: 'https://placehold.co/600x400/e2e8f0/475569?text=Rossbehy+Overview+Map',
    habitats: [
      {
        code: '2130',
        name: 'Fixed coastal dunes with herbaceous vegetation (* priority habitat)',
        area: '45.2 ha',
        range: 'Favourable',
        areaStatus: 'Favourable',
        structureAndFunctions: 'Favourable',
        futureProspects: 'Favourable',
        overallStatus: 'Favourable',
        notes: 'Excellent example of fixed dune habitat with diverse vegetation assemblage. All assessment attributes meet favorable targets. Bare ground percentage within optimal range (15-25%). Natural dynamic processes ongoing. Minimal recreational pressure.'
      },
      {
        code: '2110',
        name: 'Embryonic shifting dunes',
        area: '23.4 ha',
        range: 'Favourable',
        areaStatus: 'Favourable',
        structureAndFunctions: 'Favourable',
        futureProspects: 'Favourable',
        overallStatus: 'Favourable',
        notes: 'Well-developed embryonic dune system with active accretion. Pioneer vegetation communities intact.'
      },
      {
        code: '1330',
        name: 'Atlantic salt meadows',
        area: '23.1 ha',
        range: 'Favourable',
        areaStatus: 'Favourable',
        structureAndFunctions: 'Favourable',
        futureProspects: 'Favourable',
        overallStatus: 'Favourable',
        notes: 'High-quality saltmarsh with complete zonation. Species composition excellent with all typical communities well-represented.'
      }
    ],
    species: [
      {
        name: 'Light-bellied Brent Goose',
        scientificName: 'Branta bernicla hrota',
        population: 'Favourable',
        habitat: 'Favourable',
        futureProspects: 'Favourable',
        overallStatus: 'Favourable',
        notes: 'Internationally important winter population regularly exceeding 400 individuals. Feeding habitat in excellent condition.'
      },
      {
        name: 'Ringed Plover',
        scientificName: 'Charadrius hiaticula',
        population: 'Favourable',
        habitat: 'Favourable',
        futureProspects: 'Favourable',
        overallStatus: 'Favourable',
        notes: 'Breeding population of 12-15 pairs. Nesting habitat undisturbed and in optimal condition.'
      }
    ],
    managementIssues: [
      'Low level of informal pathway use requiring monitoring',
      'Potential future pressure from recreational activities'
    ],
    conservationObjectives: [
      'Maintain all habitats in favorable conservation status',
      'Maintain bird populations at or above current levels',
      'Continue monitoring to detect any future pressures'
    ]
  }
};

export const actionTypes: string[] = [
  'Scrub Removal', 'Grazing Management', 'Visitor Management', 'Path Repair',
  'Species Monitoring', 'Hydrological Works', 'Invasive Species Control', 'Other'
];

export const assessmentFailures: string[] = [
  'Attribute: Vegetation structure: Bare ground (Target: 10-50%)',
  'Attribute: Vegetation composition: Non-native species (Target: <1%)',
  'Attribute: Habitat Area (Target: >95% of baseline)',
  'Attribute: Sward Height (Target: Mosaic structure)',
];

export const thirdPartyContractors: string[] = [
  'EcoServe Ltd.',
  'Clonakilty Tidy Towns (Volunteers)',
  'WildScapes Land Management',
  'AquaFact',
];

export const habitatTemplateLibrary: { [key: string]: any } = {
    '[2130]': {
        name: '[2130] Fixed Coastal Dunes',
        attributes: [
            {
                field_id: 'attr_2130_01',
                field_type: 'AttributeStandard',
                label: 'Habitat area',
                config: { target_value: 'Area stable or increasing', input_type: 'info_box' },
                options: { is_required: true, allow_notes: true, allow_photos: false }
            },
            {
                field_id: 'attr_2130_02',
                field_type: 'AttributeStandard',
                label: 'Vegetation structure: Bare ground',
                config: { target_value: '10-50%', input_type: 'percentage_slider' },
                options: { is_required: true, allow_notes: true, allow_photos: true }
            },
            {
                field_id: 'attr_2130_03',
                field_type: 'AttributeStandard',
                label: 'Vegetation composition: Non-native species',
                config: { target_value: '<1%', input_type: 'percentage_slider' },
                options: { is_required: true, allow_notes: true, allow_photos: true }
            },
            {
                field_id: 'attr_2130_04',
                field_type: 'AttributeStandard',
                label: 'Vegetation composition: Scrub/trees',
                config: { target_value: '<5%', input_type: 'percentage_slider' },
                options: { is_required: true, allow_notes: true, allow_photos: true }
            }
        ]
    },
    '[2110]': {
        name: '[2110] Embryonic Shifting Dunes',
        attributes: [
             {
                field_id: 'attr_2110_01',
                field_type: 'AttributeStandard',
                label: 'Habitat area',
                config: { target_value: 'Area stable or increasing', input_type: 'info_box' },
                options: { is_required: true, allow_notes: true, allow_photos: false }
            },
             {
                field_id: 'attr_2110_02',
                field_type: 'AttributeStandard',
                label: 'Physical structure: Sand-binding species',
                config: { target_value: 'Elytrigia juncea and/or Leymus arenarius present', input_type: 'boolean_toggle' },
                options: { is_required: true, allow_notes: true, allow_photos: true }
            }
        ]
    }
};

export const sfaAssessmentLibrary: { [key: string]: SFA_HabitatAssessmentRules } = {
    '2130': {
        name: '[2130] Fixed dunes',
        criteria: [
            { id: '2130-01', name: 'Habitat area', target: 'Area stable or increasing' },
            { id: '2130-02', name: 'Positive indicator species', target: 'Minimum of 4 species recorded at each monitoring stop' },
            { id: '2130-03', name: 'Vegetation structure: Bare ground', target: '10-50% cover' },
            { id: '2130-04', name: 'Vegetation height', target: 'Diversity of tall and short vegetation' },
            { id: '2130-05', name: 'Negative indicator species: Non-native', target: '<1% cover' },
            { id: '2130-06', name: 'Negative indicator species: Scrub/trees', target: '<5% cover' },
            { id: '2130-07', name: 'Physical disturbance', target: 'No signs of significant disturbance' },
        ],
        rules: {
            inadequateThreshold: 2, // 1 or 2 failures = Inadequate
            badThreshold: 3,      // 3 or more failures = Bad
        },
    },
    '1330': {
        name: '[1330] Atlantic saltmarsh',
        criteria: [
            { id: '1330-01', name: 'Habitat area', target: 'Area stable or increasing' },
            { id: '1330-02', name: 'Positive indicator species', target: 'Minimum of 12 species' },
            { id: '1330-03', name: 'Negative indicator: Spartina anglica', target: 'Cover increase at no more than 25% of stops' },
            { id: '1330-04', name: 'Physical disturbance', target: 'No signs of infilling, reclamation, or pollution' },
            { id: '1330-05', name: 'Ecosystem function: Zones', target: 'Number of zones covering >1% of area is stable' },
            { id: '1330-06', name: 'Vegetation height', target: 'Sward height appropriate for zoning' },
            { id: '1330-07', name: 'Drainage', target: 'No new drainage channels' },
            { id: '1330-08', name: 'Grazing pressure', target: 'Appropriate levels, no signs of over/under-grazing' },
        ],
        rules: {
            inadequateThreshold: 4, // 1-4 failures = Inadequate
            badThreshold: 5,      // 5 or more failures = Bad
        },
    },
};