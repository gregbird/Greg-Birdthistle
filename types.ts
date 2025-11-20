export enum ViewType {
  Dashboard = 'dashboard-view',
  Tasks = 'tasks-view',
  SurveyTemplates = 'survey-template-view',
  TemplateEditor = 'template-editor-view',
  MySurveys = 'my-surveys-view',
  ProjectDetail = 'project-detail-view',
  EiarEditor = 'eiar-editor-view',
  EcowEditor = 'ecow-editor-view',
  GisMapping = 'gis-mapping-view',
  Settings = 'settings-view',
  DataMine = 'datamine-view',
  FieldSurvey = 'field-survey-view',
  Team = 'team-view',
  Impact = 'impact-view',
  Article17 = 'article17-view',
  Reporting = 'reporting-view',
  Visualisation = 'visualisation-view',
  AssessmentDetail = 'assessment-detail-view',
  SurveyForm = 'survey-form-view',
  Projects = 'projects-view',
  ActionDetail = 'action-detail-view',
  CreateAction = 'create-action-view',
  AuditTrail = 'audit-trail-view',
}

export interface ViewState {
  view: ViewType;
  param?: any;
}

export interface Project {
  id: number;
  name: string;
  client: string;
  code: string;
}

export interface Survey {
  id: number;
  projectId: number;
  siteName: string;
  template: string;
  status: 'Ready' | 'In Progress' | 'Completed';
  data: { [key: string]: any };
  assignedTo?: string[];
}

export interface TeamMember {
  name: string;
  email: string;
  role: string;
  actionsCount?: number;
}

export interface SurveyTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export interface AuditEntry {
  id: number;
  timestamp: string;
  userName: string;
  changeType: 'Created Project' | 'Created Assessment' | 'Updated Assessment' | 'Created Action' | 'Updated Action' | 'Updated GIS Mapping' | 'Data Input' | 'Other';
  itemName: string;
  siteName?: string;
  details?: string;
}

export interface AIChatMessage {
  sender: 'ai' | 'user';
  content: string;
}

export interface ActionDetail {
    title: string;
    objective: string;
    status: 'Completed' | 'In Progress' | 'Not Started';
    completionDate?: string;
    assignedTo?: string;
}

export interface ActionCategory {
    name: string;
    description?: string;
    actions: ActionDetail[];
}

// Types for Structure & Functions Assessment Tool
export interface SFA_Criterion {
    id: string;
    name: string;
    target: string;
}

export interface SFA_HabitatAssessmentRules {
    name: string;
    criteria: SFA_Criterion[];
    rules: {
        inadequateThreshold: number;
        badThreshold: number;
    };
}

export type SFA_Status = 'Pass' | 'Fail';

export interface SFA_CriterionResult {
    status: SFA_Status;
    areaAffected: number;
    notes: string;
}

export interface SFA_Result {
    overallStatus: 'Favourable' | 'Unfavourable – Inadequate' | 'Unfavourable – Bad' | 'Not Assessed';
    failedCriteriaCount: number;
    totalAreaInPoorCondition: number;
}

export interface HabitatAssessment {
    code: string;
    name: string;
    area: string;
    range: 'Favourable' | 'Inadequate' | 'Bad';
    areaStatus: 'Favourable' | 'Inadequate' | 'Bad';
    structureAndFunctions: 'Favourable' | 'Inadequate' | 'Bad';
    futureProspects: 'Favourable' | 'Inadequate' | 'Bad';
    overallStatus: 'Favourable' | 'Inadequate' | 'Bad';
    notes: string;
}

export interface SpeciesAssessment {
    name: string;
    scientificName: string;
    population: 'Favourable' | 'Inadequate' | 'Bad';
    habitat: 'Favourable' | 'Inadequate' | 'Bad';
    futureProspects: 'Favourable' | 'Inadequate' | 'Bad';
    overallStatus: 'Favourable' | 'Inadequate' | 'Bad';
    notes: string;
}

export interface SiteAssessment {
    siteName: string;
    siteCode: string;
    county: string;
    area: string;
    description: string;
    mapUrl: string;
    habitats: HabitatAssessment[];
    species: SpeciesAssessment[];
    managementIssues: string[];
    conservationObjectives: string[];
}

// Workflow Management Types
export type WorkflowStepStatus = 'not_started' | 'in_progress' | 'completed' | 'needs_review' | 'blocked';
export type WorkflowPhase = 'desk_research' | 'field_research' | 'reporting';

export interface WorkflowStep {
    id: string;
    name: string;
    description: string;
    phase: WorkflowPhase;
    status: WorkflowStepStatus;
    dependencies: string[]; // IDs of steps that must be completed first
    assignedTo?: string;
    startedAt?: string;
    completedAt?: string;
    dataVersion?: string;
    outputs?: string[]; // IDs of data products generated
    validationErrors?: string[];
}

export interface WorkflowTemplate {
    id: string;
    name: string;
    description: string;
    steps: WorkflowStep[];
}

export interface AssessmentWorkflow {
    id: string;
    assessmentId: string;
    siteCode: string;
    siteName: string;
    templateId: string;
    status: 'not_started' | 'in_progress' | 'completed';
    currentPhase: WorkflowPhase;
    steps: WorkflowStep[];
    createdAt: string;
    updatedAt: string;
    assignedTo: string;
    assignedBy: string;
    dueDate: string;
}

export interface DataSource {
    id: string;
    name: string;
    type: 'gis' | 'climate' | 'species' | 'survey' | 'external';
    version: string;
    lastUpdated: string;
    url?: string;
    metadata: Record<string, any>;
}

export interface DataDependency {
    stepId: string;
    dataSourceId: string;
    requiredVersion?: string;
    lastValidated?: string;
}

export interface ValidationRule {
    id: string;
    name: string;
    description: string;
    field: string;
    rule: 'required' | 'range' | 'format' | 'custom';
    params?: Record<string, any>;
    errorMessage: string;
}

export interface QualityCheckResult {
    passed: boolean;
    errors: string[];
    warnings: string[];
    timestamp: string;
    checkedBy: string;
}

export interface AssessmentVersion {
    id: string;
    assessmentId: string;
    version: number;
    createdAt: string;
    createdBy: string;
    changes: string[];
    data: Record<string, any>;
    dataSources: DataSource[];
}

export interface BatchOperation {
    id: string;
    type: 'assessment' | 'report' | 'analysis';
    status: 'queued' | 'processing' | 'completed' | 'failed';
    progress: number;
    totalItems: number;
    completedItems: number;
    startedAt?: string;
    completedAt?: string;
    results?: any[];
    errors?: string[];
}

// Article 17 Assessment Types
export type Article17Status = 'Favourable' | 'Unfavourable-Inadequate' | 'Unfavourable-Bad' | 'Unknown';
export type Article17Trend = 'Increasing' | 'Stable' | 'Decreasing' | 'Unknown' | 'Improving' | 'Deteriorating';
export type BiogeographicalRegion = 'Alpine' | 'Atlantic' | 'Black Sea' | 'Boreal' | 'Continental' | 'Macaronesian' | 'Mediterranean' | 'Pannonian' | 'Steppic';
export type MarineRegion = 'Marine Atlantic' | 'Marine Baltic' | 'Marine Black Sea' | 'Marine Macaronesian' | 'Marine Mediterranean';
export type ReportingPeriod = '2007-2012' | '2013-2018' | '2019-2024';
export type AssessmentMethod = '0EQ' | '0MS' | '1' | '2XA' | '2XP' | '2GD' | '2XR' | '3XA' | '3XP' | '3GD' | '3XR' | 'MTX' | 'OTH';

export interface Article17RangeParameter {
    status: Article17Status;
    trend: Article17Trend;
    favourableReferenceRange: number;
    currentRange: number;
    surfaceArea: number;
    shortTermTrend: Article17Trend;
    longTermTrend?: Article17Trend;
    reasonForChange?: string;
}

export interface Article17AreaParameter {
    status: Article17Status;
    trend: Article17Trend;
    favourableReferenceArea: number;
    currentArea: number;
    surfaceArea: number;
    shortTermTrend: Article17Trend;
    longTermTrend?: Article17Trend;
    reasonForChange?: string;
}

export interface Article17StructureParameter {
    status: Article17Status;
    areaInGoodCondition: number;
    areaInPoorCondition: number;
    percentageInGoodCondition: number;
    trend: Article17Trend;
    typicalSpeciesStatus?: Article17Status;
    reasonForChange?: string;
}

export interface Article17FutureProspectsParameter {
    status: Article17Status;
    mainPressures: string[];
    mainThreats: string[];
    significantPressures: boolean;
    longTermViability: 'Good' | 'Poor' | 'Unknown';
}

export interface Article17Assessment {
    id: string;
    habitatCode: string;
    habitatName: string;
    biogeographicalRegion: BiogeographicalRegion | MarineRegion;
    reportingPeriod: ReportingPeriod;
    memberState: string;

    // Four parameters
    range: Article17RangeParameter;
    area: Article17AreaParameter;
    structureAndFunctions: Article17StructureParameter;
    futureProspects: Article17FutureProspectsParameter;

    // Overall assessment
    overallStatus: Article17Status;
    overallTrend: Article17Trend;
    assessmentMethod: AssessmentMethod;

    // Target 1 contribution
    target1Classification?: 'A=' | 'A+' | 'B1' | 'B2' | 'C' | 'D' | 'E';

    // Metadata
    createdAt: string;
    createdBy: string;
    lastModified: string;
    assessmentNotes?: string;
    dataQuality: 'Good' | 'Moderate' | 'Poor';

    // Backcasting comparison
    previousStatus?: Article17Status;
    previousPeriod?: ReportingPeriod;
    natureOfChange?: 'genuine' | 'non-genuine' | 'no-change' | 'unknown';
}

export interface Article17Pressure {
    code: string;
    name: string;
    category: 'Agriculture' | 'Forestry' | 'Fishing' | 'Urbanisation' | 'Mining' | 'Transport' | 'Tourism' | 'Pollution' | 'Climate Change' | 'Invasive Species' | 'Other';
    ranking: 'High' | 'Medium' | 'Low';
    scope: 'Whole area' | 'Majority' | 'Minority' | 'Unknown';
}

export interface Article17ComplianceCheck {
    assessmentId: string;
    checkDate: string;
    compliant: boolean;
    issues: {
        parameter: string;
        issue: string;
        severity: 'Error' | 'Warning' | 'Info';
    }[];
    recommendations: string[];
}