import React from 'react';
import * as Lucide from 'lucide-react';
import type { AssessmentWorkflow, WorkflowStep } from '../types';
import { getNextSteps, getBlockedSteps, getPhaseProgress } from '../workflowUtils';

interface WorkflowVisualizationProps {
    workflow: AssessmentWorkflow;
    onStepClick?: (step: WorkflowStep) => void;
}

const WorkflowVisualization: React.FC<WorkflowVisualizationProps> = ({ workflow, onStepClick }) => {
    const nextSteps = getNextSteps(workflow);
    const blockedSteps = getBlockedSteps(workflow);

    const getStepIcon = (step: WorkflowStep) => {
        switch (step.status) {
            case 'completed': return Lucide.CheckCircle2;
            case 'in_progress': return Lucide.Loader;
            case 'blocked': return Lucide.Lock;
            case 'needs_review': return Lucide.AlertCircle;
            default: return Lucide.Circle;
        }
    };

    const getStepColor = (step: WorkflowStep) => {
        switch (step.status) {
            case 'completed': return 'bg-green-100 border-green-500 text-green-800';
            case 'in_progress': return 'bg-blue-100 border-blue-500 text-blue-800';
            case 'blocked': return 'bg-gray-100 border-gray-400 text-gray-600';
            case 'needs_review': return 'bg-orange-100 border-orange-500 text-orange-800';
            default: return 'bg-white border-gray-300 text-gray-700';
        }
    };

    const getPhaseIcon = (phase: string) => {
        switch (phase) {
            case 'desk_research': return Lucide.Database;
            case 'field_research': return Lucide.MapPin;
            case 'reporting': return Lucide.FileText;
            default: return Lucide.Circle;
        }
    };

    const groupStepsByPhase = () => {
        const phases = {
            desk_research: workflow.steps.filter(s => s.phase === 'desk_research'),
            field_research: workflow.steps.filter(s => s.phase === 'field_research'),
            reporting: workflow.steps.filter(s => s.phase === 'reporting')
        };
        return phases;
    };

    const phases = groupStepsByPhase();

    return (
        <div className="space-y-6">
            {/* Phase Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(phases).map(([phaseKey, phaseSteps]) => {
                    const PhaseIcon = getPhaseIcon(phaseKey);
                    const progress = getPhaseProgress(workflow, phaseKey);
                    const completed = phaseSteps.filter(s => s.status === 'completed').length;

                    return (
                        <div key={phaseKey} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                                <PhaseIcon className="w-6 h-6 text-accent" />
                                <h3 className="font-semibold text-gray-900 capitalize">
                                    {phaseKey.replace('_', ' ')}
                                </h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{completed} of {phaseSteps.length} completed</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-accent h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Workflow Steps by Phase */}
            {Object.entries(phases).map(([phaseKey, phaseSteps]) => {
                const PhaseIcon = getPhaseIcon(phaseKey);

                return (
                    <div key={phaseKey} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-200">
                            <PhaseIcon className="w-6 h-6 text-accent" />
                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                {phaseKey.replace('_', ' ')} Steps
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {phaseSteps.map((step, index) => {
                                const StepIcon = getStepIcon(step);
                                const isBlocked = blockedSteps.some(s => s.id === step.id);
                                const isNext = nextSteps.some(s => s.id === step.id);
                                const hasDependencies = step.dependencies.length > 0;

                                return (
                                    <div
                                        key={step.id}
                                        className={`border-2 rounded-lg p-4 transition-all ${getStepColor(step)} ${onStepClick && step.status !== 'completed' ? 'cursor-pointer hover:shadow-md' : ''
                                            } ${isNext ? 'ring-2 ring-blue-400' : ''}`}
                                        onClick={() => onStepClick && step.status !== 'completed' && onStepClick(step)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3 flex-1">
                                                <div className="mt-1">
                                                    <StepIcon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h4 className="font-semibold">{step.name}</h4>
                                                        {isNext && (
                                                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                                                Ready to Start
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm opacity-90">{step.description}</p>

                                                    {hasDependencies && (
                                                        <div className="mt-2 flex items-start space-x-2 text-xs">
                                                            <Lucide.GitBranch className="w-3 h-3 mt-0.5" />
                                                            <div>
                                                                <span className="font-medium">Depends on:</span>{' '}
                                                                {step.dependencies.map((depId, idx) => {
                                                                    const depStep = workflow.steps.find(s => s.id === depId);
                                                                    return (
                                                                        <span key={depId}>
                                                                            {depStep?.name}
                                                                            {idx < step.dependencies.length - 1 ? ', ' : ''}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {step.validationErrors && step.validationErrors.length > 0 && (
                                                        <div className="mt-2 flex items-start space-x-2 text-xs text-red-600">
                                                            <Lucide.AlertTriangle className="w-3 h-3 mt-0.5" />
                                                            <span>{step.validationErrors.length} validation error(s)</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <span className="text-xs font-medium capitalize">
                                                    {step.status.replace('_', ' ')}
                                                </span>
                                                {step.completedAt && (
                                                    <div className="text-xs text-gray-600 mt-1">
                                                        {new Date(step.completedAt).toLocaleDateString('en-IE')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {/* Legend */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Status Legend</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="flex items-center space-x-2">
                        <Lucide.Circle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Not Started</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Lucide.Loader className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">In Progress</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Lucide.CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">Completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Lucide.AlertCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-600">Needs Review</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Lucide.Lock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Blocked</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowVisualization;
