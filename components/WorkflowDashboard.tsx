import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import type { ViewState, AssessmentWorkflow, WorkflowStep } from '../types';
import { ViewType } from '../types';
import { getNextSteps, getWorkflowProgress, createStandardAssessmentWorkflow, updateStepStatus } from '../workflowUtils';
import WorkflowVisualization from './WorkflowVisualization';
import { getStatusColorClass } from '../services';

interface WorkflowDashboardProps {
    setView: (view: ViewState) => void;
}

const WorkflowDashboard: React.FC<WorkflowDashboardProps> = ({ setView }) => {
    // Sample workflows - in a real app, these would come from a database
    const [workflows, setWorkflows] = useState<AssessmentWorkflow[]>([
        {
            ...createStandardAssessmentWorkflow(
                'assess-91',
                '91',
                'Clonakilty Bay SAC',
                'Cian O\'Donnell',
                'Dr. Sarah Murphy',
                '2025-12-01'
            ),
            steps: createStandardAssessmentWorkflow(
                'assess-91',
                '91',
                'Clonakilty Bay SAC',
                'Cian O\'Donnell',
                'Dr. Sarah Murphy',
                '2025-12-01'
            ).steps.map((step, idx) => ({
                ...step,
                status: idx < 3 ? 'completed' as const : idx === 3 ? 'in_progress' as const : 'not_started' as const
            })),
            status: 'in_progress',
            currentPhase: 'desk_research'
        },
        createStandardAssessmentWorkflow(
            'assess-13',
            '13',
            'Rossbehy SAC',
            'Cian O\'Donnell',
            'Dr. Sarah Murphy',
            '2025-12-15'
        )
    ]);

    const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
    const [showWorkflowDetail, setShowWorkflowDetail] = useState(false);

    const handleStepClick = (workflow: AssessmentWorkflow, step: WorkflowStep) => {
        if (step.status === 'not_started') {
            // Start the step
            const updated = updateStepStatus(workflow, step.id, 'in_progress');
            setWorkflows(workflows.map(w => w.id === workflow.id ? updated : w));
        }
    };

    const activeWorkflows = workflows.filter(w => w.status !== 'completed');
    const completedWorkflows = workflows.filter(w => w.status === 'completed');

    return (
        <div className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-secondary">My Assigned Tasks</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Lucide.User className="w-4 h-4" />
                    <span>Cian O'Donnell</span>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Assignments</p>
                            <p className="text-2xl font-bold text-secondary">{workflows.length}</p>
                        </div>
                        <Lucide.Briefcase className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">In Progress</p>
                            <p className="text-2xl font-bold text-secondary">{activeWorkflows.length}</p>
                        </div>
                        <Lucide.Clock className="w-8 h-8 text-orange-500" />
                    </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Completed</p>
                            <p className="text-2xl font-bold text-secondary">{completedWorkflows.length}</p>
                        </div>
                        <Lucide.CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Next Actions</p>
                            <p className="text-2xl font-bold text-secondary">
                                {workflows.reduce((sum, w) => sum + getNextSteps(w).length, 0)}
                            </p>
                        </div>
                        <Lucide.ArrowRight className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Workflow Guide */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold text-secondary mb-4 flex items-center space-x-2">
                    <Lucide.Route className="w-5 h-5" />
                    <span>Assessment Workflow Guide</span>
                </h3>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 text-white rounded-full p-3">
                            <Lucide.Database className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-semibold">1. Desk Research</div>
                            <div className="text-sm text-gray-600">GIS Mapping & Data Mine</div>
                        </div>
                    </div>
                    <Lucide.ArrowRight className="w-6 h-6 text-gray-400" />
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500 text-white rounded-full p-3">
                            <Lucide.MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-semibold">2. Field Research</div>
                            <div className="text-sm text-gray-600">Field Survey & Impact Calculation</div>
                        </div>
                    </div>
                    <Lucide.ArrowRight className="w-6 h-6 text-gray-400" />
                    <div className="flex items-center space-x-3">
                        <div className="bg-purple-500 text-white rounded-full p-3">
                            <Lucide.FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-semibold">3. Reporting</div>
                            <div className="text-sm text-gray-600">Generate Assessment Report</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Workflow Detail Modal */}
            {showWorkflowDetail && selectedWorkflow && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowWorkflowDetail(false)}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-secondary">
                                    {workflows.find(w => w.id === selectedWorkflow)?.siteName} Workflow
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Site Code: {workflows.find(w => w.id === selectedWorkflow)?.siteCode}
                                </p>
                            </div>
                            <button onClick={() => setShowWorkflowDetail(false)} className="text-gray-500 hover:text-gray-700">
                                <Lucide.X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <WorkflowVisualization
                                workflow={workflows.find(w => w.id === selectedWorkflow)!}
                                onStepClick={(step) => handleStepClick(workflows.find(w => w.id === selectedWorkflow)!, step)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Active Workflows */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-secondary flex items-center space-x-2">
                    <Lucide.ListTodo className="w-5 h-5" />
                    <span>Active Assessments</span>
                </h3>

                {activeWorkflows.map(workflow => {
                    const progress = getWorkflowProgress(workflow);
                    const nextSteps = getNextSteps(workflow);
                    const completedCount = workflow.steps.filter(s => s.status === 'completed').length;

                    return (
                        <div key={workflow.id} className="bg-surface rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                            {/* Workflow Header */}
                            <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200 rounded-t-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-xl font-bold text-secondary">{workflow.siteName}</h3>
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColorClass(workflow.status === 'in_progress' ? 'In Progress' : workflow.status === 'completed' ? 'Completed' : 'Not Started')}`}>
                                                {workflow.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <Lucide.Hash className="w-4 h-4" />
                                                <span>Site Code: <strong>{workflow.siteCode}</strong></span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Lucide.UserCheck className="w-4 h-4" />
                                                <span>Assigned by: {workflow.assignedBy}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Lucide.CalendarDays className="w-4 h-4" />
                                                <span>Due: {new Date(workflow.dueDate).toLocaleDateString('en-IE')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Workflow Body */}
                            <div className="p-6">
                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                                        <span className="text-sm font-medium text-gray-700">{progress}% ({completedCount}/{workflow.steps.length} steps)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-accent h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Current Phase */}
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Lucide.Layers className="w-5 h-5 text-blue-600" />
                                        <span className="font-semibold text-gray-900">Current Phase: {workflow.currentPhase.replace('_', ' ')}</span>
                                    </div>
                                </div>

                                {/* Next Steps */}
                                {nextSteps.length > 0 && (
                                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Lucide.ArrowRight className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold text-gray-900">Ready to Start ({nextSteps.length})</span>
                                        </div>
                                        <ul className="space-y-1">
                                            {nextSteps.slice(0, 3).map(step => (
                                                <li key={step.id} className="text-sm text-gray-700 flex items-center space-x-2">
                                                    <Lucide.Circle className="w-3 h-3 text-green-600" />
                                                    <span>{step.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => {
                                            setSelectedWorkflow(workflow.id);
                                            setShowWorkflowDetail(true);
                                        }}
                                        className="bg-accent text-white py-2.5 px-6 rounded-md hover:brightness-95 flex items-center space-x-2 font-medium shadow-sm"
                                    >
                                        <Lucide.GitBranch className="w-5 h-5" />
                                        <span>View Workflow</span>
                                    </button>
                                    {nextSteps.length > 0 && (
                                        <button
                                            onClick={() => {
                                                const nextStep = nextSteps[0];
                                                const viewMap: Record<string, ViewType> = {
                                                    'desk-2': ViewType.GisMapping,
                                                    'desk-3': ViewType.DataMine,
                                                    'field-2': ViewType.FieldSurvey,
                                                    'field-4': ViewType.Impact,
                                                    'report-3': ViewType.Reporting
                                                };
                                                const view = viewMap[nextStep.id] || ViewType.DataMine;
                                                setView({ view, param: { siteCode: workflow.siteCode } });
                                            }}
                                            className="bg-green-500 text-white py-2.5 px-6 rounded-md hover:bg-green-600 flex items-center space-x-2 font-medium shadow-sm"
                                        >
                                            <Lucide.Play className="w-5 h-5" />
                                            <span>Start Next Step</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setView({ view: ViewType.AssessmentDetail, param: { siteCode: workflow.siteCode } })}
                                        className="bg-gray-200 text-gray-700 py-2.5 px-6 rounded-md hover:bg-gray-300 flex items-center space-x-2 font-medium shadow-sm"
                                    >
                                        <Lucide.Eye className="w-5 h-5" />
                                        <span>View Assessment</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-secondary mb-4">Quick Access</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                        onClick={() => setView({ view: ViewType.GisMapping })}
                        className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors flex flex-col items-center space-y-2"
                    >
                        <Lucide.Map className="w-8 h-8" />
                        <span className="font-semibold">GIS Mapping</span>
                    </button>
                    <button
                        onClick={() => setView({ view: ViewType.DataMine })}
                        className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors flex flex-col items-center space-y-2"
                    >
                        <Lucide.Database className="w-8 h-8" />
                        <span className="font-semibold">Data Mine</span>
                    </button>
                    <button
                        onClick={() => setView({ view: ViewType.FieldSurvey })}
                        className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors flex flex-col items-center space-y-2"
                    >
                        <Lucide.ClipboardList className="w-8 h-8" />
                        <span className="font-semibold">Field Survey</span>
                    </button>
                    <button
                        onClick={() => setView({ view: ViewType.Reporting })}
                        className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors flex flex-col items-center space-y-2"
                    >
                        <Lucide.FileText className="w-8 h-8" />
                        <span className="font-semibold">Generate Report</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkflowDashboard;
