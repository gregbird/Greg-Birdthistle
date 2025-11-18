
import React from 'react';
import { assessmentsCsvData } from '../constants';
import { parseCsv } from '../services';

// Interface for the project data used in this view
interface ProjectProgress {
    name: string;
    code: string;
    progress: number; // 0-100
}

// A sub-component for the 4-stage progress bar
const ProjectProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    const stages = [
        { name: 'Desktop Research', threshold: 25 },
        { name: 'Field Survey', threshold: 50 },
        { name: 'Report', threshold: 75 },
        { name: 'Final data deliveries', threshold: 100 },
    ];

    // Determine the current active stage name
    const activeStageIndex = stages.findIndex(stage => progress < stage.threshold);
    const activeStageName = progress === 100 ? 'Completed' : stages[activeStageIndex]?.name || 'Final data deliveries';

    return (
        <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Current Stage: <span className="font-semibold text-secondary">{activeStageName}</span></span>
                <span className="font-semibold text-secondary">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
                {stages.map((stage, index) => {
                    const stageStart = stages[index - 1]?.threshold || 0;
                    const stageWidth = stage.threshold - stageStart;
                    const progressInStage = Math.max(0, Math.min(stageWidth, progress - stageStart));
                    const isLastStage = index === stages.length - 1;

                    return (
                        <div
                            key={stage.name}
                            className={`h-full bg-gray-200 ${!isLastStage ? 'border-r-2 border-surface' : ''}`}
                            style={{ width: `${stageWidth}%` }}
                            title={`${stage.name}: ${stageStart}-${stage.threshold}%`}
                        >
                            <div
                                className="h-full bg-accent"
                                style={{ width: `${(progressInStage / stageWidth) * 100}%` }}
                            ></div>
                        </div>
                    );
                })}
            </div>
             <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
            </div>
        </div>
    );
};


const ProjectsView: React.FC = () => {
    // Generate a list of 25 projects from the constants file
    const projectData = React.useMemo(() => {
        const parsedData = parseCsv(assessmentsCsvData);
        const projects: ProjectProgress[] = [];
        
        if (parsedData.length === 0) return [];

        // Ensure we have 25 projects by looping if necessary
        while (projects.length < 25) {
            projects.push(...parsedData.slice(0, 25 - projects.length).map(item => ({
                name: item.SITE_NAME,
                code: `DUL-${item.SITECODE}-${Math.floor(100 + Math.random() * 900)}`,
                progress: Math.random() * 100, // Random progress for demonstration
            })));
        }
        return projects;
    }, []);

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-secondary">Projects</h2>
            </div>

            <div className="bg-surface p-4 md:p-6 rounded-lg shadow-md">
                <div className="space-y-8">
                    {projectData.map((project, index) => (
                        <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                                <h3 className="font-bold text-lg text-secondary mb-1 sm:mb-0">{project.name}</h3>
                                <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full self-start sm:self-center">{project.code}</span>
                            </div>
                            <ProjectProgressBar progress={project.progress} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsView;
