import type { SurveyTemplate, TeamMember, Survey, Project, ActionCategory, SFA_HabitatAssessmentRules } from './types';

export const surveyTemplates: SurveyTemplate[] = [
    { id: "PEA", name: "Preliminary Ecological Appraisal", description: "A baseline ecological assessment.", icon: "ClipboardList" },
    { id: "EcIA", name: "Ecological Impact Assessment", description: "Assess potential project impacts.", icon: "AlertTriangle" },
    { id: "NIS", name: "Natura Impact Statement", description: "For projects affecting Natura 2000 sites.", icon: "ShieldCheck" },
    { id: "AA", name: "Appropriate Assessment Screening", description: "Initial screening for AA.", icon: "Search" },
    { id: "Bat", name: "Bat Survey", description: "Surveys for bat activity and roosts.", icon: "Moon" },
    { id: "Bird", name: "Bird Survey", description: "Various methods for avian populations.", icon: "Bird" },
    { id: "Habitat", name: "Habitat & Botanical Survey", description: "Mapping and assessing habitats.", icon: "Leaf" },
    { id: "Invasive", name: "Invasive Species Survey", description: "Mapping and management plans.", icon: "Bug" },
    { id: "ECoW", name: "ECoW Report", description: "Ecological Clerk of Works monitoring.", icon: "UserCheck" }
];

export const defaultDb: { projects: Project[]; surveys: Survey[]; team: TeamMember[] } = {
    projects: [
        { id: 1, name: "Lough Ennell SAC", client: "NPWS", code: "NPWS-001-25" },
        { id: 91, name: "Clonakilty Bay SAC", client: "Cork CoCo", code: "CCC-091-24"}
    ],
    surveys: [
        { id: 101, projectId: 1, siteName: "Site A - Woodland", template: "PEA", status: "Completed", data: { habitat: "WD1 - Oak-birch-holly woodland", notes: "Mature oak canopy, limited undergrowth.", species: "Sciurus vulgaris (Red Squirrel)", photo: "https://placehold.co/600x400/a3e635/ffffff?text=Woodland+Canopy" } },
        { id: 102, projectId: 1, siteName: "Site B - River Crossing", template: "EcIA", status: "In Progress", data: {} },
    ],
    team: [
        { name: "Dr. Aoife Murphy", email: "aoife.murphy@dulra.ie", role: "Principal Ecologist" },
        { name: "Cian O'Donnell", email: "cian.odonnell@dulra.ie", role: "Field Ecologist" },
        { name: "Siobhán Kelly", email: "siobhan.kelly@dulra.ie", role: "GIS Specialist" }
    ]
};

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

export const sacConditionsCsv = `Site Name ,Site code,Last Upate ,Habitats Health ,Species Health 
River Barrow and River Nore SAC,2162,June 2025,Inadequate,Bad
Hook Head SAC,764,January 2025,Favourable,Favourable
Belgica Mound Province SAC,2327,January 2025,Inadequate,Inadequate
West Connacht Coast SAC,2998,January 2025,Bad,Favourable
Codling Fault Zone SAC,3015,January 2025,Favourable,Inadequate
Lambay Island SAC,204,December 2024,Bad,Bad
Killyconny Bog (Cloghbally) SAC,6,November 2024,Favourable,Inadequate
Lough Oughter and Associated Loughs SAC,7,November 2024,Favourable,Favourable
Ballyallia Lake SAC,4,October 2024,Inadequate,Favourable
Ballycullinan Lake SAC,10,October 2024,Bad,Inadequate
Black Head/Poulsallagh Complex,20,September 2024,Favourable,Favourable
Danes Hole Poulnalecka SAC,90,September 2024,Inadequate,Bad
Dromore Woods & Loughs,32,August 2024,Favourable,Favourable
Moyree River System,57,July 2024,Inadequate,Inadequate
Glengarriff Harbour and Woodland,90,June 2024,Bad,Favourable
Clonakilty Bay SAC,91,May 2024,Favourable,Inadequate
Caha Mountains SAC,93,April 2024,Inadequate,Bad
Lough Hyne Nature Reserve and Environs SAC,97,March 2024,Favourable,Favourable
Roaringwater Bay and Islands SAC,101,February 2024,Inadequate,Inadequate
Three Castle Head to Mizen Head,109,January 2024,Bad,Favourable`;

export const spaConditionsCsv = `Site Name ,Site Code ,Last Updated,Habitats Health ,Species Health 
Lady's Island Lake SPA,4009,July 2025,Favourable,Favourable
Termoncarragh Lake and Annagh Machair SPA,4093,June 2025,Inadequate,Favourable
Inishmore SPA,4152,June 2025,Bad,Bad
Dingle Peninsula SPA,4153,June 2025,Favourable,Inadequate
Horn Head to Fanad Head SPA,4194,June 2025,Inadequate,Inadequate
Cliffs of Moher SPA,4005,June 2025,Favourable,Favourable`;

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
111, Aran Island (Donegal) Cliffs SAC, Completed, Donegal, 613,`;

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
111, Aran Island (Donegal) Cliffs SAC, Completed,Donegal,Site and habitat management,`;

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
