import React, { useState } from 'react';
import * as Lucide from 'lucide-react';

interface TutorialStep {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Lucide;
    tips: string[];
    exampleImage?: string;
}

interface OnboardingTutorialProps {
    onComplete?: () => void;
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const tutorialSteps: TutorialStep[] = [
        {
            id: 'welcome',
            title: 'Welcome to Dulra',
            description: 'Dulra is your comprehensive ecological data management platform. This tutorial will guide you through the complete assessment workflow.',
            icon: 'Globe',
            tips: [
                'You can return to this tutorial anytime from the Settings menu',
                'Each assessment follows a structured workflow',
                'Your work is automatically saved as you progress'
            ]
        },
        {
            id: 'workflow-overview',
            title: 'Assessment Workflow',
            description: 'Every ecological assessment follows a three-phase workflow: Desk Research, Field Research, and Reporting. Each phase builds on the previous one.',
            icon: 'GitBranch',
            tips: [
                'Complete steps in order - later steps depend on earlier ones',
                'Green checkmarks indicate completed steps',
                'Blue highlights show steps you can start now',
                'Grey locks indicate steps waiting on dependencies'
            ]
        },
        {
            id: 'desk-research',
            title: 'Phase 1: Desk Research',
            description: 'Start by gathering existing data about your site. Use GIS Mapping to analyze spatial data and Data Mine to search ecological databases.',
            icon: 'Database',
            tips: [
                'Review historical records before fieldwork',
                'Check NPWS and EPA databases for existing data',
                'Use GIS to identify habitat types and boundaries',
                'Download climate data for your site location',
                'Document all data sources for reproducibility'
            ]
        },
        {
            id: 'field-research',
            title: 'Phase 2: Field Research',
            description: 'Conduct on-site surveys to collect primary data. Record species observations, habitat conditions, and environmental parameters.',
            icon: 'MapPin',
            tips: [
                'Plan your survey route based on desk research findings',
                'Use standardized survey methodologies',
                'Record GPS coordinates for all observations',
                'Take representative photographs',
                'Note weather conditions and survey effort',
                'Validate data in the field when possible'
            ]
        },
        {
            id: 'reporting',
            title: 'Phase 3: Reporting',
            description: 'Generate comprehensive reports combining desk and field research. The platform validates your data and creates professional assessments.',
            icon: 'FileText',
            tips: [
                'Run data quality checks before generating reports',
                'Review automated calculations and statistics',
                'Add contextual analysis and recommendations',
                'Include maps, charts, and photographs',
                'Request peer review before finalizing'
            ]
        },
        {
            id: 'data-quality',
            title: 'Data Quality & Validation',
            description: 'Dulra automatically validates your data against ecological standards. Fix any errors before proceeding to the next step.',
            icon: 'ShieldCheck',
            tips: [
                'Validation runs automatically when you complete steps',
                'Red alerts indicate errors that must be fixed',
                'Yellow warnings suggest improvements',
                'All species names should use standard taxonomy',
                'GPS coordinates must be in decimal degree format',
                'Include measurement units for all quantitative data'
            ]
        },
        {
            id: 'dependencies',
            title: 'Understanding Dependencies',
            description: 'Each step in your workflow may depend on previous steps. You cannot start a step until its dependencies are complete.',
            icon: 'Link',
            tips: [
                'Dependencies ensure logical workflow progression',
                'Hover over a step to see what it depends on',
                'Complete steps unlock new  tasks automatically',
                'The workflow diagram shows all relationships',
                'If you update early steps, later steps may need review'
            ]
        },
        {
            id: 'collaboration',
            title: 'Collaboration Features',
            description: 'Track who worked on each step, share findings with team members, and maintain a complete audit trail.',
            icon: 'Users',
            tips: [
                'All changes are automatically tracked',
                'View audit trail to see full project history',
                'Assignments show who is responsible for each task',
                'Comments and notes support team communication',
                'Version history allows restoring previous work'
            ]
        },
        {
            id: 'best-practices',
            title: 'Best Practices',
            description: 'Follow these guidelines to ensure high-quality, reproducible ecological assessments.',
            icon: 'Award',
            tips: [
                'Complete validation checks at each phase',
                'Document your methodology and assumptions',
                'Use consistent naming conventions',
                'Back up important data regularly',
                'Peer review work before final submission',
                'Keep detailed field notes',
                'Photo-document key findings',
                'Reference all data sources'
            ]
        },
        {
            id: 'getting-help',
            title: 'Getting Help',
            description: 'Resources and support are available throughout the platform.',
            icon: 'HelpCircle',
            tips: [
                'Hover over any icon for tooltips',
                'Check the Help menu for documentation',
                'Contact your administrator for technical issues',
                'View example completed assessments',
                'Review ecological guidelines and standards',
                'Join training workshops for advanced features'
            ]
        }
    ];

    const currentStepData = tutorialSteps[currentStep];
    const Icon = Lucide[currentStepData.icon] as React.ElementType;

    const handleNext = () => {
        setCompletedSteps(prev => new Set([...prev, currentStep]));
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            if (onComplete) onComplete();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        if (onComplete) onComplete();
    };

    const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-accent to-blue-600 text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <Icon className="w-8 h-8" />
                            <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                        </div>
                        <button onClick={handleSkip} className="text-white hover:text-gray-200">
                            <Lucide.X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                        <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="text-sm mt-2 opacity-90">
                        Step {currentStep + 1} of {tutorialSteps.length}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <p className="text-lg text-gray-700 mb-6">{currentStepData.description}</p>

                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-2">
                            <Lucide.Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-2">Key Points:</h4>
                                <ul className="space-y-2">
                                    {currentStepData.tips.map((tip, idx) => (
                                        <li key={idx} className="text-sm text-blue-800 flex items-start space-x-2">
                                            <Lucide.Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Visual Guide */}
                    {currentStepData.id === 'workflow-overview' && (
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center justify-around">
                                <div className="text-center">
                                    <div className="bg-blue-500 text-white rounded-full p-4 mx-auto mb-2 w-16 h-16 flex items-center justify-center">
                                        <Lucide.Database className="w-8 h-8" />
                                    </div>
                                    <div className="font-semibold">Desk Research</div>
                                    <div className="text-xs text-gray-600">5 steps</div>
                                </div>
                                <Lucide.ArrowRight className="w-6 h-6 text-gray-400" />
                                <div className="text-center">
                                    <div className="bg-green-500 text-white rounded-full p-4 mx-auto mb-2 w-16 h-16 flex items-center justify-center">
                                        <Lucide.MapPin className="w-8 h-8" />
                                    </div>
                                    <div className="font-semibold">Field Research</div>
                                    <div className="text-xs text-gray-600">5 steps</div>
                                </div>
                                <Lucide.ArrowRight className="w-6 h-6 text-gray-400" />
                                <div className="text-center">
                                    <div className="bg-purple-500 text-white rounded-full p-4 mx-auto mb-2 w-16 h-16 flex items-center justify-center">
                                        <Lucide.FileText className="w-8 h-8" />
                                    </div>
                                    <div className="font-semibold">Reporting</div>
                                    <div className="text-xs text-gray-600">5 steps</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <Lucide.ChevronLeft className="w-5 h-5" />
                        <span>Previous</span>
                    </button>

                    <div className="flex items-center space-x-2">
                        {tutorialSteps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    idx === currentStep
                                        ? 'bg-accent w-8'
                                        : completedSteps.has(idx)
                                        ? 'bg-green-500'
                                        : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleSkip}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            Skip Tutorial
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-accent text-white py-2 px-6 rounded-md hover:brightness-95 flex items-center space-x-2"
                        >
                            <span>{currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}</span>
                            {currentStep < tutorialSteps.length - 1 && <Lucide.ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingTutorial;
