
import React, { useState, useMemo } from 'react';
import * as Lucide from 'lucide-react';
import { assessmentsCsvData } from '../constants';
import { parseCsv } from '../services';
import type { ViewState, AssessmentWorkflow } from '../types';
import { ViewType } from '../types';
import { createStandardAssessmentWorkflow, getWorkflowProgress, getPhaseProgress, getNextSteps } from '../workflowUtils';
import WorkflowVisualization from './WorkflowVisualization';

type ProjectStatus = 'Pending' | 'Not Started' | 'In Progress' | 'Completed';

// Expanded interface to include dates and a specific status
interface ProjectProgress {
    name: string;
    code: string;
    siteCode: string;
    progress: number;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    workflow?: AssessmentWorkflow;
    assignedTo?: string;
}

interface ProjectsViewProps {
    setView?: (view: ViewState) => void;
}

// Helper function to determine schedule status and styling based on the explicit status
const getScheduleStatus = (project: ProjectProgress): { status: string; color: string; icon: React.ElementType } => {
    const now = new Date();
    const deadline = project.endDate;
    const daysUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 3600 * 24);

    switch (project.status) {
        case 'Completed':
            return { status: 'Completed', color: 'text-green-700 bg-green-100', icon: Lucide.CheckCircle };
        case 'Pending':
            return { status: 'Pending', color: 'text-gray-700 bg-gray-100', icon: Lucide.PauseCircle };
        case 'Not Started':
             return { status: 'Not Started', color: 'text-gray-700 bg-gray-100', icon: Lucide.Circle };
        case 'In Progress':
            if (now > deadline) {
                return { status: 'Overdue', color: 'text-red-700 bg-red-100', icon: Lucide.AlertCircle };
            }
            if (daysUntilDeadline <= 14) {
                return { status: 'Nearing Deadline', color: 'text-yellow-700 bg-yellow-100', icon: Lucide.Clock };
            }
            return { status: 'On Track', color: 'text-blue-700 bg-blue-100', icon: Lucide.TrendingUp };
        default:
             return { status: 'Unknown', color: 'text-gray-700 bg-gray-100', icon: Lucide.HelpCircle };
    }
};

const ProjectsView: React.FC<ProjectsViewProps> = ({ setView }) => {
    const [activeFilter, setActiveFilter] = useState<ProjectStatus | 'All'>('All');
    const [selectedProject, setSelectedProject] = useState<ProjectProgress | null>(null);
    const [showWorkflowModal, setShowWorkflowModal] = useState(false);

    const teamMembers = ['Cian O\'Donnell', 'Sarah Murphy', 'John Smith', 'Emma O\'Brien', 'Michael Kelly'];

    const projectData = useMemo(() => {
        const parsedData = parseCsv(assessmentsCsvData);
        if (parsedData.length === 0) return [];

        const projects: ProjectProgress[] = [];

        const generateProjectDetails = (siteName: string, siteCode: string): Omit<ProjectProgress, 'name' | 'code' | 'siteCode'> => {
            const now = new Date();
            const statusRng = Math.random();
            let status: ProjectStatus;
            let progress: number;

            if (statusRng < 0.15) {
                status = 'Pending';
                progress = 0;
            } else if (statusRng < 0.3) {
                status = 'Not Started';
                progress = 0;
            } else if (statusRng > 0.85) {
                status = 'Completed';
                progress = 100;
            } else {
                status = 'In Progress';
                progress = Math.floor(Math.random() * 95) + 1;
            }

            let startDate, endDate;
            const randomDaysPast = Math.floor(Math.random() * 60);
            const randomDaysFuture = Math.floor(Math.random() * 90) + 7;
            const dayMilliseconds = 86400000;

            if (status === 'Completed') {
                endDate = new Date(now.getTime() - randomDaysPast * dayMilliseconds);
                startDate = new Date(endDate.getTime() - 90 * dayMilliseconds);
            } else if (status === 'Not Started' || status === 'Pending') {
                startDate = new Date(now.getTime() + randomDaysPast * dayMilliseconds);
                endDate = new Date(startDate.getTime() + 90 * dayMilliseconds);
            } else {
                startDate = new Date(now.getTime() - randomDaysPast * dayMilliseconds);
                const endRng = Math.random();
                if (endRng < 0.2) {
                    endDate = new Date(now.getTime() - Math.floor(Math.random() * 14) * dayMilliseconds);
                } else if (endRng < 0.5) {
                    endDate = new Date(now.getTime() + Math.floor(Math.random() * 14) * dayMilliseconds);
                } else {
                    endDate = new Date(now.getTime() + randomDaysFuture * dayMilliseconds);
                }
            }

            // Create workflow for the project
            let workflow: AssessmentWorkflow | undefined;
            const assignedTo = teamMembers[Math.floor(Math.random() * teamMembers.length)];

            if (status !== 'Pending' && status !== 'Not Started') {
                workflow = createStandardAssessmentWorkflow(
                    `assess-${siteCode}`,
                    siteCode,
                    siteName,
                    assignedTo,
                    'Dr. Sarah Murphy',
                    endDate.toISOString()
                );

                // Update workflow steps based on progress
                const targetCompletedSteps = Math.floor((progress / 100) * workflow.steps.length);
                workflow.steps = workflow.steps.map((step, idx) => ({
                    ...step,
                    status: idx < targetCompletedSteps ? 'completed' as const :
                            idx === targetCompletedSteps ? 'in_progress' as const :
                            'not_started' as const
                }));

                // Update workflow status and phase
                if (progress === 100) {
                    workflow.status = 'completed';
                    workflow.currentPhase = 'reporting';
                } else if (targetCompletedSteps >= 10) {
                    workflow.status = 'in_progress';
                    workflow.currentPhase = 'reporting';
                } else if (targetCompletedSteps >= 5) {
                    workflow.status = 'in_progress';
                    workflow.currentPhase = 'field_research';
                } else {
                    workflow.status = 'in_progress';
                    workflow.currentPhase = 'desk_research';
                }
            }

            return { progress, startDate, endDate, status, workflow, assignedTo };
        };

        while (projects.length < 25) {
            projects.push(...parsedData.slice(0, 25 - projects.length).map(item => {
                const details = generateProjectDetails(item.SITE_NAME, item.SITECODE);
                return {
                    name: item.SITE_NAME,
                    code: `DUL-${item.SITECODE}-${Math.floor(100 + Math.random() * 900)}`,
                    siteCode: item.SITECODE,
                    ...details,
                };
            }));
        }
        return projects;
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projectData;
        return projectData.filter(p => p.status === activeFilter);
    }, [projectData, activeFilter]);
    
    const filterOptions: Array<ProjectStatus | 'All'> = ['All', 'Pending', 'Not Started', 'In Progress', 'Completed'];

    const handleProjectClick = (project: ProjectProgress) => {
        setSelectedProject(project);
        setShowWorkflowModal(true);
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-secondary">Projects</h2>
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                   {filterOptions.map(filter => (
                        <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === filter ? 'bg-surface text-secondary shadow-sm' : 'text-gray-500 hover:text-secondary'}`}>
                            {filter}
                        </button>
                   ))}
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => {
                        const { status, color, icon: StatusIcon } = getScheduleStatus(project);
                        const phaseIcon = project.workflow?.currentPhase === 'desk_research' ? Lucide.Database :
                                         project.workflow?.currentPhase === 'field_research' ? Lucide.MapPin :
                                         project.workflow?.currentPhase === 'reporting' ? Lucide.FileText : Lucide.Circle;
                        const PhaseIcon = phaseIcon;

                        return (
                            <div
                                key={index}
                                className="bg-surface rounded-lg shadow-md p-5 flex flex-col space-y-4 hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
                                onClick={() => handleProjectClick(project)}
                            >
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-secondary leading-tight">{project.name}</h3>
                                        <div className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center space-x-1.5 shrink-0 ${color}`}>
                                            <StatusIcon className="w-4 h-4" />
                                            <span>{status}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">{project.code}</p>

                                    {project.assignedTo && (
                                        <div className="flex items-center space-x-1 text-xs text-gray-600 mb-2">
                                            <Lucide.User className="w-3 h-3" />
                                            <span>{project.assignedTo}</span>
                                        </div>
                                    )}

                                    {project.workflow && (
                                        <div className="flex items-center space-x-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                                            <PhaseIcon className="w-3 h-3" />
                                            <span className="capitalize">{project.workflow.currentPhase.replace('_', ' ')}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span className="font-semibold text-secondary">{project.progress.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${project.progress}%` }}></div>
                                    </div>
                                </div>

                                {project.workflow && (
                                    <div className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                                        <div className="flex justify-between mb-1">
                                            <span>Desk Research</span>
                                            <span className="font-medium">{getPhaseProgress(project.workflow, 'desk_research')}%</span>
                                        </div>
                                        <div className="flex justify-between mb-1">
                                            <span>Field Research</span>
                                            <span className="font-medium">{getPhaseProgress(project.workflow, 'field_research')}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Reporting</span>
                                            <span className="font-medium">{getPhaseProgress(project.workflow, 'reporting')}%</span>
                                        </div>
                                    </div>
                                )}

                                <div className="text-xs text-gray-500 border-t pt-3 flex justify-between items-center">
                                    <span>
                                        {project.status !== 'Completed'
                                            ? `Due: ${project.endDate.toLocaleDateString('en-IE')}`
                                            : `Completed: ${project.endDate.toLocaleDateString('en-IE')}`
                                        }
                                    </span>
                                    {project.workflow && (
                                        <span className="text-accent font-medium">
                                            View Workflow →
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                 <div className="text-center py-20 text-gray-500 bg-surface rounded-lg shadow-md">
                    <Lucide.FolderSearch className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="font-semibold text-lg text-secondary">No Projects Found</h3>
                    <p>No projects match the filter "{activeFilter}".</p>
                </div>
            )}

            {/* Workflow Modal */}
            {showWorkflowModal && selectedProject && selectedProject.workflow && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowWorkflowModal(false)}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-secondary">{selectedProject.name}</h3>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <Lucide.Hash className="w-4 h-4" />
                                        <span>Site Code: {selectedProject.siteCode}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Lucide.Code className="w-4 h-4" />
                                        <span>{selectedProject.code}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Lucide.User className="w-4 h-4" />
                                        <span>{selectedProject.assignedTo}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setShowWorkflowModal(false)} className="text-gray-500 hover:text-gray-700">
                                <Lucide.X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <WorkflowVisualization workflow={selectedProject.workflow} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsView;
