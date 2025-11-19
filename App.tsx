
import React, { useState, useEffect, useCallback } from 'react';
import * as Lucide from 'lucide-react';
import type { ViewState, Project, Survey, TeamMember, ToastState, AuditEntry } from './types';
import { ViewType } from './types';
import { defaultDb, surveyTemplates, defaultAuditTrail } from './constants';
import DashboardView from './components/Dashboard';
import TasksView from './components/Tasks';
import SurveysView from './components/Surveys';
import EditorsView from './components/Editors';
import ToolsView, { TeamView } from './components/Tools';
import AssessmentDetailView from './components/AssessmentDetail';
import MobileSurveyView from './components/MobileSurvey';
import SettingsView from './components/Settings';
import ProjectsView from './components/Projects';
import ActionDetailView from './components/ActionDetail';
import CreateActionView from './components/CreateAction';
import FieldSurveyView from './components/FieldSurvey';
import ImpactCalculationView from './components/ImpactCalculation';
import AuditTrailView from './components/AuditTrail';
import OnboardingTutorial from './components/OnboardingTutorial';

// --- Helper Hook for Local Storage ---
function useLocalStorage<T,>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}

// --- Sidebar Component ---
const Sidebar: React.FC<{
  setView: (view: ViewState) => void,
  openTaskTypeModal: () => void,
  currentUserRole: 'parent' | 'child',
  setCurrentUserRole: (role: 'parent' | 'child') => void,
}> = ({ setView, openTaskTypeModal, currentUserRole, setCurrentUserRole }) => {
  const menuItems = {
    Workspace: [
      { name: 'Dashboard', icon: 'LayoutDashboard', view: ViewType.Dashboard },
      { name: 'Projects', icon: 'Briefcase', view: ViewType.Projects },
      { name: 'Site Status', icon: 'CheckSquare', view: ViewType.Tasks },
      { name: 'Surveys', icon: 'Folder', view: ViewType.MySurveys },
      { name: 'Team Members', icon: 'Users', view: ViewType.Team },
      { name: 'Audit Trail', icon: 'History', view: ViewType.AuditTrail },
    ],
    "Desk Research": [
        { name: 'GIS Mapping', icon: 'Map', view: ViewType.GisMapping },
        { name: 'Data Mine', icon: 'Database', view: ViewType.DataMine },
    ],
    "Field Research": [
        { name: 'Field Survey', icon: 'ClipboardList', view: ViewType.FieldSurvey },
        { name: 'Impact Calculation', icon: 'Calculator', view: ViewType.Impact },
    ],
    Reporting: [
        { name: 'Intelligent Reporting', icon: 'FileText', view: ViewType.Reporting },
        { name: 'Visualisation', icon: 'BarChart2', view: ViewType.Visualisation },
    ]
  };

  const childMenuItems = {
    Workspace: [
      { name: 'My Tasks', icon: 'LayoutDashboard', view: ViewType.Dashboard },
      { name: 'Site Status', icon: 'CheckSquare', view: ViewType.Tasks },
      { name: 'Surveys', icon: 'Folder', view: ViewType.MySurveys },
    ],
    "Desk Research": menuItems["Desk Research"],
    "Field Research": menuItems["Field Research"],
    Reporting: menuItems.Reporting,
  };

  const visibleMenuItems = currentUserRole === 'parent' ? menuItems : childMenuItems;

  return (
    <aside className="w-64 bg-surface flex flex-col border-r border-gray-200">
      <div className="flex items-center space-x-2 p-4 border-b border-gray-200">
          <Lucide.Globe className="w-7 h-7 text-secondary" />
          <h1 className="text-2xl font-bold text-secondary">Dulra</h1>
      </div>
      
      <nav className="p-4 flex-1 overflow-y-auto">
          {currentUserRole === 'parent' && (
            <button onClick={openTaskTypeModal} className="w-full bg-primary text-secondary py-2.5 px-4 rounded-md hover:brightness-95 flex items-center space-x-2 justify-center text-sm font-semibold mb-6">
                <Lucide.PlusCircle className="w-5 h-5" />
                <span>Create a Site Task</span>
            </button>
          )}

          {Object.entries(visibleMenuItems).map(([category, items]) => (
            <div key={category} className="mb-4 last:mb-0">
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{category}</h3>
                <div className="mt-2 space-y-1">
                    {items.map(item => {
                        const Icon = Lucide[item.icon as keyof typeof Lucide] as React.ElementType;
                        return (
                            <button key={item.name} onClick={() => setView({ view: item.view })} className="w-full text-left flex items-center space-x-2 py-2 px-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
          ))}
           
           {currentUserRole === 'parent' && (
             <div className="mt-4">
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Configuration</h3>
                <div className="mt-2 space-y-1">
                    <button onClick={() => setView({ view: ViewType.Settings })} className="w-full text-left flex items-center space-x-2 py-2 px-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                        <Lucide.Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </button>
                </div>
            </div>
           )}
      </nav>

      {/* User Role Switcher */}
      <div className="p-4 border-t border-gray-200">
          <label htmlFor="user-role-switcher" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Demonstration View</label>
          <div className="flex rounded-md shadow-sm">
              <button onClick={() => setCurrentUserRole('parent')} className={`w-1/2 px-2 py-1 text-xs font-medium rounded-l-md transition-colors ${currentUserRole === 'parent' ? 'bg-accent text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                  Parent (Admin)
              </button>
              <button onClick={() => setCurrentUserRole('child')} className={`w-1/2 px-2 py-1 text-xs font-medium rounded-r-md transition-colors ${currentUserRole === 'child' ? 'bg-accent text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                  Child (User)
              </button>
          </div>
      </div>
    </aside>
  );
};

// --- Toast Notification Component ---
const Toast: React.FC<{ toast: ToastState, hide: () => void }> = ({ toast, hide }) => {
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => hide(), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show, hide]);

    const bgColor = toast.type === 'success' ? 'bg-green-600' : 'bg-red-600';
    const Icon = toast.type === 'success' ? Lucide.CheckCircle : Lucide.AlertCircle;

    return (
        <div className={`fixed bottom-8 right-8 p-4 rounded-lg shadow-lg text-white transition-transform duration-300 ${toast.show ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'} ${bgColor}`}>
            <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <span>{toast.message}</span>
            </div>
        </div>
    );
};

const PermissionDenied: React.FC = () => (
    <div className="p-4 md:p-8 text-center">
        <Lucide.Lock className="w-16 h-16 text-status-bad mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-secondary">Access Denied</h2>
        <p className="text-gray-500 mt-2">You do not have permission to view this page. Please switch to the Parent (Admin) view.</p>
    </div>
);

const App: React.FC = () => {
  const [db, setDb] = useLocalStorage('dulraDb', defaultDb);
  const [auditTrail, setAuditTrail] = useLocalStorage('dulraAuditTrail', defaultAuditTrail);
  const [viewState, setViewState] = useState<ViewState>({ view: ViewType.Dashboard });
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const [currentUserRole, setCurrentUserRole] = useLocalStorage<'parent' | 'child'>('dulraUserRole', 'parent');
  const [showOnboarding, setShowOnboarding] = useLocalStorage('dulraOnboardingCompleted', false);

  // Modal States
  const [newSurveyModal, setNewSurveyModal] = useState<{show: boolean, templateId: string | null}>({show: false, templateId: null});
  const [assignSurveyModal, setAssignSurveyModal] = useState<{show: boolean, surveyId: number | null}>({show: false, surveyId: null});
  const [thirdPartyModal, setThirdPartyModal] = useState<{show: boolean, link: string | null}>({show: false, link: null});
  const [isTaskTypeModalOpen, setIsTaskTypeModalOpen] = useState(false);

  const mainContentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle URL-based survey loading
    const params = new URLSearchParams(window.location.search);
    const surveyId = params.get('survey');
    if (surveyId) {
      setViewState({ view: ViewType.SurveyForm, param: { surveyId: parseInt(surveyId, 10) }});
    }
  }, []);

  const setView = (newViewState: ViewState) => {
    setViewState(newViewState);
    mainContentRef.current?.scrollTo(0, 0);
  };
  
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };
  
  const createNewSurvey = (projectName: string, clientName: string) => {
    if (!newSurveyModal.templateId) return;
    const newProjectId = (db.projects[db.projects.length - 1]?.id || 0) + 1;
    const newProject = {
        id: newProjectId, name: projectName, client: clientName,
        code: `${clientName.substring(0,3).toUpperCase()}-${String(Math.floor(100 + Math.random() * 900))}-25`
    };
    const newSurveyId = (db.surveys[db.surveys.length - 1]?.id || 0) + 1;
    const newSurvey = { id: newSurveyId, projectId: newProjectId, siteName: "Default Site", template: newSurveyModal.templateId, status: 'Ready' as const, data: {} };

    setDb({ ...db, projects: [...db.projects, newProject], surveys: [...db.surveys, newSurvey] });
    setNewSurveyModal({show: false, templateId: null});
    
    const editorViews: { [key: string]: ViewType } = { 'EcIA': ViewType.EiarEditor, 'ECoW': ViewType.EcowEditor };
    const nextView = editorViews[newSurvey.template] || ViewType.ProjectDetail;
    const param = nextView === ViewType.ProjectDetail ? newProjectId : { projectId: newProjectId };
    setView({ view: nextView, param });
  };

  const updateSurvey = (updatedSurvey: Survey) => {
    const surveyIndex = db.surveys.findIndex(s => s.id === updatedSurvey.id);
    if(surveyIndex > -1) {
        const newSurveys = [...db.surveys];
        newSurveys[surveyIndex] = updatedSurvey;
        setDb({...db, surveys: newSurveys});
    }
  };

  // Filter data based on user role
  const childUser = "Cian O'Donnell";
  const visibleSurveys = currentUserRole === 'child'
      ? db.surveys.filter(s => s.assignedTo?.includes(childUser))
      : db.surveys;
  const visibleProjectIds = [...new Set(visibleSurveys.map(s => s.projectId))];
  const visibleProjects = currentUserRole === 'child'
      ? db.projects.filter(p => visibleProjectIds.includes(p.id))
      : db.projects;


  const renderView = () => {
    switch (viewState.view) {
      case ViewType.Dashboard: return <DashboardView setView={setView} currentUserRole={currentUserRole}/>;
      case ViewType.Projects: return currentUserRole === 'parent' ? <ProjectsView /> : <PermissionDenied />;
      case ViewType.Tasks: return <TasksView setView={setView} currentUserRole={currentUserRole}/>;
      case ViewType.Settings: return currentUserRole === 'parent' ? <SettingsView /> : <PermissionDenied />;
      case ViewType.Team: return currentUserRole === 'parent' ? <TeamView team={db.team} openThirdPartyModal={() => setThirdPartyModal({show: true, link: null})}/> : <PermissionDenied />;
      case ViewType.FieldSurvey: return <FieldSurveyView projects={db.projects} teamMembers={db.team} showToast={showToast} />;
      case ViewType.Impact: return <ImpactCalculationView />;
      case ViewType.MySurveys:
      case ViewType.SurveyTemplates:
      case ViewType.ProjectDetail:
        return <SurveysView 
            viewState={viewState}
            setView={setView}
            projects={visibleProjects}
            surveys={visibleSurveys}
            openNewSurveyModal={(templateId) => setNewSurveyModal({show: true, templateId})}
            openAssignSurveyModal={(surveyId) => setAssignSurveyModal({show: true, surveyId})}
          />;
      case ViewType.EiarEditor:
      case ViewType.EcowEditor:
      case ViewType.TemplateEditor:
        return <EditorsView viewState={viewState} projects={db.projects} setView={setView} showToast={showToast} />;
      case ViewType.GisMapping:
      case ViewType.DataMine:
      case ViewType.Reporting:
      case ViewType.Visualisation:
        return <ToolsView 
          viewState={viewState} 
          setView={setView} 
          projects={visibleProjects}
          surveys={visibleSurveys}
        />;
      case ViewType.AssessmentDetail: return <AssessmentDetailView setView={setView} param={viewState.param}/>;
      case ViewType.ActionDetail: return <ActionDetailView setView={setView} siteCode={viewState.param?.siteCode} />;
      case ViewType.CreateAction: return <CreateActionView setView={setView} showToast={showToast} />;
      case ViewType.AuditTrail: return currentUserRole === 'parent' ? <AuditTrailView auditTrail={auditTrail} /> : <PermissionDenied />;
      case ViewType.SurveyForm: return null; // Handled separately
      default: return <DashboardView setView={setView} currentUserRole={currentUserRole}/>;
    }
  };

  if (viewState.view === ViewType.SurveyForm) {
      return <MobileSurveyView surveyId={viewState.param.surveyId} surveys={db.surveys} projects={db.projects} updateSurvey={updateSurvey}/>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        setView={setView} 
        openTaskTypeModal={() => setIsTaskTypeModalOpen(true)} 
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
      />
      <main ref={mainContentRef} className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
      
      {/* --- Modals --- */}
      {isTaskTypeModalOpen && <TaskTypeModal closeModal={() => setIsTaskTypeModalOpen(false)} setView={setView} />}
      {newSurveyModal.show && <NewSurveyModal createSurvey={createNewSurvey} closeModal={() => setNewSurveyModal({show: false, templateId: null})} />}
      {assignSurveyModal.show && <AssignSurveyModal surveyId={assignSurveyModal.surveyId!} closeModal={() => setAssignSurveyModal({show: false, surveyId: null})} showToast={showToast} />}
      {thirdPartyModal.show && <ThirdPartyModal link={thirdPartyModal.link} setLink={(link) => setThirdPartyModal({show:true, link})} closeModal={() => setThirdPartyModal({show: false, link: null})} showToast={showToast} />}
      {!showOnboarding && currentUserRole === 'child' && <OnboardingTutorial onComplete={() => setShowOnboarding(true)} />}

      <Toast toast={toast} hide={() => setToast({ ...toast, show: false })} />
    </div>
  );
};

// --- Modal Components ---

const TaskTypeModal: React.FC<{closeModal: () => void, setView: (v: ViewState) => void}> = ({closeModal, setView}) => {
    const handleSelect = (type: 'assessment' | 'action') => {
        if (type === 'assessment') {
            setView({ view: ViewType.SurveyTemplates });
        } else {
            setView({ view: ViewType.CreateAction });
        }
        closeModal();
    };
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
            <div className="bg-surface p-8 rounded-lg shadow-xl w-full max-w-lg text-center" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold text-secondary mb-6">What would you like to create?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button onClick={() => handleSelect('assessment')} className="p-6 border rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center text-center hover:border-accent">
                        <Lucide.FileText className="w-10 h-10 text-accent mb-3"/>
                        <span className="font-semibold text-secondary">Assessment</span>
                        <p className="text-sm text-gray-500 mt-1">Start a new survey using a standard template.</p>
                    </button>
                    <button onClick={() => handleSelect('action')} className="p-6 border rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center text-center hover:border-accent">
                        <Lucide.Wrench className="w-10 h-10 text-accent mb-3"/>
                        <span className="font-semibold text-secondary">Action</span>
                        <p className="text-sm text-gray-500 mt-1">Create a new work order or conservation task.</p>
                    </button>
                </div>
                <button onClick={closeModal} className="mt-8 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            </div>
        </div>
    );
};

const NewSurveyModal: React.FC<{createSurvey: (p: string, c: string) => void, closeModal: () => void}> = ({createSurvey, closeModal}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const projectName = formData.get('projectName') as string;
        const clientName = formData.get('clientName') as string;
        createSurvey(projectName, clientName);
    };
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-surface p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">Create New Survey Project</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="new-project-name" className="block text-sm font-medium text-gray-700">Project Name</label>
                        <input type="text" name="projectName" defaultValue={`New Survey - ${new Date().toLocaleDateString('en-IE')}`} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="new-client-name" className="block text-sm font-medium text-gray-700">Client Name</label>
                        <input type="text" name="clientName" defaultValue="Default Client" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={closeModal} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">Cancel</button>
                        <button type="submit" className="bg-accent text-white py-2 px-4 rounded-md">Create Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AssignSurveyModal: React.FC<{surveyId: number, closeModal: () => void, showToast: (m:string)=>void}> = ({surveyId, closeModal, showToast}) => {
    const link = `${window.location.origin}${window.location.pathname}?survey=${surveyId}`;
    const copyLink = () => {
        navigator.clipboard.writeText(link);
        showToast("Link copied to clipboard!");
    };
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-surface p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
                <h3 className="text-xl font-bold mb-2">Survey Ready to Assign</h3>
                <div className="bg-gray-100 p-3 rounded-md mb-4">
                    <input type="text" readOnly value={link} className="w-full bg-transparent text-sm border-none focus:ring-0" />
                </div>
                <div className="flex justify-center space-x-3">
                    <button onClick={copyLink} className="bg-accent text-white py-2 px-4 rounded-md flex items-center space-x-2"><Lucide.Copy className="w-4 h-4"/><span>Copy Link</span></button>
                    <button onClick={closeModal} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">Close</button>
                </div>
            </div>
        </div>
    );
};

const ThirdPartyModal: React.FC<{link: string | null, setLink: (l: string) => void, closeModal: () => void, showToast: (m:string)=>void}> = ({link, setLink, closeModal, showToast}) => {
    const generateLink = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const randomToken = Math.random().toString(36).substring(2, 12);
        const newLink = `${window.location.origin}${window.location.pathname}?task=third-party&token=${randomToken}`;
        setLink(newLink);
    };
    const copyLink = () => {
        if (!link) return;
        navigator.clipboard.writeText(link);
        showToast("Link copied to clipboard!");
    };
    
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-surface p-8 rounded-lg shadow-xl w-full max-w-lg">
                {!link ? (
                    <form onSubmit={generateLink}>
                        <h3 className="text-xl font-bold mb-4">Assign Task to a Third Party</h3>
                        <button type="submit" className="w-full bg-accent text-white py-2 px-4 rounded-md">Generate Secure Link</button>
                        <button type="button" onClick={closeModal} className="w-full mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md">Cancel</button>
                    </form>
                ) : (
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">Secure Link Generated</h3>
                        <div className="bg-gray-100 p-3 rounded-md mb-4">
                            <input type="text" readOnly value={link} className="w-full bg-transparent text-sm border-none focus:ring-0" />
                        </div>
                        <div className="flex justify-center space-x-3">
                            <button onClick={copyLink} className="bg-accent text-white py-2 px-4 rounded-md flex items-center space-x-2"><Lucide.Copy className="w-4 h-4"/><span>Copy Link</span></button>
                            <button onClick={closeModal} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">Done</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
