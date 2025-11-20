import type {
    WorkflowStep,
    AssessmentWorkflow,
    DataSource,
    ValidationRule,
    QualityCheckResult,
    WorkflowStepStatus
} from './types';

// Workflow Dependency Management
export const getNextSteps = (workflow: AssessmentWorkflow): WorkflowStep[] => {
    return workflow.steps.filter(step => {
        if (step.status === 'completed') return false;

        // Check if all dependencies are completed
        const allDependenciesMet = step.dependencies.every(depId => {
            const depStep = workflow.steps.find(s => s.id === depId);
            return depStep?.status === 'completed';
        });

        return allDependenciesMet;
    });
};

export const getBlockedSteps = (workflow: AssessmentWorkflow): WorkflowStep[] => {
    return workflow.steps.filter(step => {
        if (step.status === 'completed') return false;

        const hasUnmetDependencies = step.dependencies.some(depId => {
            const depStep = workflow.steps.find(s => s.id === depId);
            return depStep?.status !== 'completed';
        });

        return hasUnmetDependencies;
    });
};

export const updateStepStatus = (
    workflow: AssessmentWorkflow,
    stepId: string,
    newStatus: WorkflowStepStatus
): AssessmentWorkflow => {
    const updatedSteps = workflow.steps.map(step => {
        if (step.id === stepId) {
            return {
                ...step,
                status: newStatus,
                ...(newStatus === 'in_progress' && !step.startedAt ? { startedAt: new Date().toISOString() } : {}),
                ...(newStatus === 'completed' ? { completedAt: new Date().toISOString() } : {})
            };
        }
        return step;
    });

    return {
        ...workflow,
        steps: updatedSteps,
        updatedAt: new Date().toISOString()
    };
};

export const getWorkflowProgress = (workflow: AssessmentWorkflow): number => {
    const completedSteps = workflow.steps.filter(s => s.status === 'completed').length;
    return Math.round((completedSteps / workflow.steps.length) * 100);
};

export const getPhaseProgress = (workflow: AssessmentWorkflow, phase: string): number => {
    const phaseSteps = workflow.steps.filter(s => s.phase === phase);
    const completedSteps = phaseSteps.filter(s => s.status === 'completed').length;
    return phaseSteps.length > 0 ? Math.round((completedSteps / phaseSteps.length) * 100) : 0;
};

// Data Validation
export const validateData = (data: any, rules: ValidationRule[]): QualityCheckResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    rules.forEach(rule => {
        const value = data[rule.field];

        switch (rule.rule) {
            case 'required':
                if (!value || value === '') {
                    errors.push(rule.errorMessage);
                }
                break;
            case 'range':
                if (rule.params?.min !== undefined && value < rule.params.min) {
                    errors.push(rule.errorMessage);
                }
                if (rule.params?.max !== undefined && value > rule.params.max) {
                    errors.push(rule.errorMessage);
                }
                break;
            case 'format':
                if (rule.params?.pattern && !new RegExp(rule.params.pattern).test(value)) {
                    errors.push(rule.errorMessage);
                }
                break;
        }
    });

    return {
        passed: errors.length === 0,
        errors,
        warnings,
        timestamp: new Date().toISOString(),
        checkedBy: 'system'
    };
};

// Data Source Management
export const checkDataSourceUpdates = (
    currentSources: DataSource[],
    latestSources: DataSource[]
): { outdated: DataSource[], updated: DataSource[] } => {
    const outdated: DataSource[] = [];
    const updated: DataSource[] = [];

    currentSources.forEach(current => {
        const latest = latestSources.find(s => s.id === current.id);
        if (latest && latest.version !== current.version) {
            outdated.push(current);
            updated.push(latest);
        }
    });

    return { outdated, updated };
};

export const identifyAffectedSteps = (
    workflow: AssessmentWorkflow,
    updatedDataSourceId: string
): WorkflowStep[] => {
    // In a real implementation, this would check data dependencies
    // For now, we'll mark steps that might be affected
    return workflow.steps.filter(step =>
        step.status === 'completed' &&
        step.outputs &&
        step.outputs.length > 0
    );
};

// Workflow Templates
export const createStandardAssessmentWorkflow = (
    assessmentId: string,
    siteCode: string,
    siteName: string,
    assignedTo: string,
    assignedBy: string,
    dueDate: string
): AssessmentWorkflow => {
    return {
        id: `workflow-${Date.now()}`,
        assessmentId,
        siteCode,
        siteName,
        templateId: 'standard-assessment',
        status: 'not_started',
        currentPhase: 'desk_research',
        assignedTo,
        assignedBy,
        dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        steps: [
            // Desk Research Phase
            {
                id: 'desk-1',
                name: 'Review Historical Data',
                description: 'Review existing site records and historical assessments',
                phase: 'desk_research',
                status: 'not_started',
                dependencies: []
            },
            {
                id: 'desk-2',
                name: 'GIS Mapping Analysis',
                description: 'Conduct GIS analysis of site boundaries and habitat types',
                phase: 'desk_research',
                status: 'not_started',
                dependencies: ['desk-1']
            },
            {
                id: 'desk-3',
                name: 'Data Mine Search',
                description: 'Search NPWS, EPA, and other databases for relevant species and habitat data',
                phase: 'desk_research',
                status: 'not_started',
                dependencies: ['desk-1']
            },
            {
                id: 'desk-4',
                name: 'Climate Data Review',
                description: 'Review climate data and trends for the site location',
                phase: 'desk_research',
                status: 'not_started',
                dependencies: ['desk-2']
            },
            {
                id: 'desk-5',
                name: 'Desk Research Report',
                description: 'Compile findings from desk research phase',
                phase: 'desk_research',
                status: 'not_started',
                dependencies: ['desk-2', 'desk-3', 'desk-4']
            },
            // Field Research Phase
            {
                id: 'field-1',
                name: 'Plan Field Survey',
                description: 'Plan field survey route and methodology based on desk research',
                phase: 'field_research',
                status: 'not_started',
                dependencies: ['desk-5']
            },
            {
                id: 'field-2',
                name: 'Conduct Habitat Survey',
                description: 'Conduct on-site habitat condition assessment',
                phase: 'field_research',
                status: 'not_started',
                dependencies: ['field-1']
            },
            {
                id: 'field-3',
                name: 'Species Recording',
                description: 'Record species observations and abundances',
                phase: 'field_research',
                status: 'not_started',
                dependencies: ['field-1']
            },
            {
                id: 'field-4',
                name: 'Impact Calculation',
                description: 'Calculate ecological impact based on field observations',
                phase: 'field_research',
                status: 'not_started',
                dependencies: ['field-2', 'field-3']
            },
            {
                id: 'field-4a',
                name: 'Article 17 Assessment',
                description: 'Complete 4-parameter Article 17 assessment (Range, Area, Structure & Functions, Future Prospects)',
                phase: 'field_research',
                status: 'not_started',
                dependencies: ['field-4']
            },
            {
                id: 'field-5',
                name: 'Photo Documentation',
                description: 'Organize and annotate field photographs',
                phase: 'field_research',
                status: 'not_started',
                dependencies: ['field-2', 'field-3']
            },
            // Reporting Phase
            {
                id: 'report-1',
                name: 'Data Quality Check',
                description: 'Validate all collected data for completeness and accuracy',
                phase: 'reporting',
                status: 'not_started',
                dependencies: ['field-4a', 'field-5']
            },
            {
                id: 'report-2',
                name: 'Statistical Analysis',
                description: 'Perform statistical analysis on habitat and species data',
                phase: 'reporting',
                status: 'not_started',
                dependencies: ['report-1']
            },
            {
                id: 'report-3',
                name: 'Generate Assessment Report',
                description: 'Create comprehensive assessment report with findings and recommendations',
                phase: 'reporting',
                status: 'not_started',
                dependencies: ['report-2']
            },
            {
                id: 'report-4',
                name: 'Peer Review',
                description: 'Internal peer review of assessment report',
                phase: 'reporting',
                status: 'not_started',
                dependencies: ['report-3']
            },
            {
                id: 'report-5',
                name: 'Final Report',
                description: 'Finalize report incorporating review feedback',
                phase: 'reporting',
                status: 'not_started',
                dependencies: ['report-4']
            }
        ]
    };
};

// Generate workflow visualization data
export const generateWorkflowGraph = (workflow: AssessmentWorkflow) => {
    return {
        nodes: workflow.steps.map(step => ({
            id: step.id,
            label: step.name,
            status: step.status,
            phase: step.phase
        })),
        edges: workflow.steps.flatMap(step =>
            step.dependencies.map(depId => ({
                from: depId,
                to: step.id
            }))
        )
    };
};

// Calculate estimated completion time
export const estimateCompletionTime = (workflow: AssessmentWorkflow): string | null => {
    const remainingSteps = workflow.steps.filter(s => s.status !== 'completed');
    if (remainingSteps.length === 0) return null;

    // Simple estimation: 1 day per remaining step (can be made more sophisticated)
    const estimatedDays = remainingSteps.length;
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + estimatedDays);

    return completionDate.toISOString();
};
