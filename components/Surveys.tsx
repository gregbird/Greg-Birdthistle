
import React from 'react';
import type { ViewState, Project, Survey } from '../types';
import { ViewType } from '../types';
import { surveyTemplates } from '../constants';
import * as Lucide from 'lucide-react';
import { generateReport } from '../services';

interface SurveysViewProps {
  setView: (view: ViewState) => void;
  projects: Project[];
  surveys: Survey[];
  openAssignSurveyModal: (surveyId: number) => void;
}

const ProjectDetail: React.FC<{
  project: Project;
  surveys: Survey[];
  setView: (view: ViewState) => void;
  openAssignSurveyModal: (surveyId: number) => void;
}> = ({ project, surveys, setView, openAssignSurveyModal }) => {
  const projectSurveys = surveys.filter(s => s.projectId === project.id);

  const getStatusColorClass = (status: string) => {
    if (status === 'Completed') return 'bg-green-100 text-green-800';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };
  
  const handleGenerateReport = (surveyId: number) => {
    const survey = surveys.find(s => s.id === surveyId);
    const template = surveyTemplates.find(t => t.id === survey?.template);
    if (survey && project && template) {
      generateReport(survey, project, template);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <button onClick={() => setView({ view: ViewType.MySurveys })} className="text-sm text-accent mb-4 flex items-center space-x-1">
        <Lucide.ArrowLeft className="w-4 h-4" />
        <span>Back to Surveys</span>
      </button>
      <div className="bg-surface p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-secondary">{project.name}</h2>
          <p className="text-lg text-gray-500">{project.client}</p>
          <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{project.code}</span>
        </div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button className="border-accent text-accent whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Surveys</button>
          </nav>
        </div>
        <div className="pt-6 space-y-4">
          {projectSurveys.length > 0 ? projectSurveys.map(s => (
            <div key={s.id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-secondary">{s.siteName} <span className="text-xs font-normal text-gray-500 ml-2">({s.template})</span></p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColorClass(s.status)}`}>{s.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                {s.status === 'Ready' && (
                  <button onClick={() => openAssignSurveyModal(s.id)} className="text-sm bg-accent text-white py-1 px-3 rounded-md hover:bg-orange-500">Assign</button>
                )}
                {s.status === 'Completed' && (
                  <button onClick={() => handleGenerateReport(s.id)} className="text-sm bg-secondary text-white py-1 px-3 rounded-md hover:bg-gray-700">Generate Report</button>
                )}
              </div>
            </div>
          )) : <p className="text-gray-500">No surveys created for this project yet.</p>}
        </div>
      </div>
    </div>
  );
};

const MySurveys: React.FC<{
  projects: Project[];
  surveys: Survey[];
  setView: (view: ViewState) => void;
  openNewSurveyModal: (templateId: string) => void;
}> = ({ projects, surveys, setView, openNewSurveyModal }) => {
  return <SurveyTemplates setView={setView} openNewSurveyModal={openNewSurveyModal} />;
};

const SurveyTemplates: React.FC<{ setView: (view: ViewState) => void, openNewSurveyModal: (templateId: string) => void }> = ({ setView, openNewSurveyModal }) => {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-secondary">Start a New Survey</h2>
          <p className="text-gray-500 mt-1">Select a compliant template to begin your report.</p>
        </div>
        <button onClick={() => setView({ view: ViewType.TemplateEditor })} className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center space-x-2">
          <Lucide.Edit className="w-5 h-5" />
          <span>Edit Custom Template</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveyTemplates.map(template => {
            const Icon = Lucide[template.icon as keyof typeof Lucide] as React.ElementType;
            return (
              <div key={template.id} onClick={() => openNewSurveyModal(template.id)} className="bg-surface p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col">
                  <div className="flex-1">
                      <Icon className="w-8 h-8 text-accent mb-3" />
                      <h3 className="font-bold text-lg text-secondary">{template.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  </div>
                  <button className="mt-4 text-sm font-semibold text-accent text-left">Start Survey &rarr;</button>
              </div>
            );
        })}
      </div>
    </div>
  );
};


const SurveysView: React.FC<SurveysViewProps & { viewState: ViewState, openNewSurveyModal: (templateId: string) => void }> = (props) => {
  const { viewState, projects, setView } = props;

  if (viewState.view === ViewType.ProjectDetail) {
    const project = projects.find(p => p.id === viewState.param);
    return project ? <ProjectDetail project={project} {...props} /> : <div>Project not found</div>;
  }
  
  if (viewState.view === ViewType.SurveyTemplates) {
    return <SurveyTemplates setView={setView} openNewSurveyModal={props.openNewSurveyModal} />;
  }
  
  return <MySurveys {...props} />;
};

export default SurveysView;
