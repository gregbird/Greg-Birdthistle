
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
  Reporting = 'reporting-view',
  Visualisation = 'visualisation-view',
  AssessmentDetail = 'assessment-detail-view',
  SurveyForm = 'survey-form-view',
  Projects = 'projects-view',
  ActionDetail = 'action-detail-view',
  CreateAction = 'create-action-view',
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
}

export interface TeamMember {
  name: string;
  email: string;
  role: string;
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
