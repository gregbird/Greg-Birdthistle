import React, { useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import type { ViewState } from '../types';
import { ViewType } from '../types';
import { assessmentsCsvData, actionsCsvData } from '../constants';
import { parseCsv, getStatusColorClass, registerChartPlugins } from '../services';
import WorkflowDashboard from './WorkflowDashboard';

// Declare Chart.js from CDN
declare var Chart: any;

interface DashboardProps {
    setView: (view: ViewState) => void;
    currentUserRole: 'parent' | 'child';
}

const DoughnutChart: React.FC<{ chartId: string, data: any, options: any }> = ({ chartId, data, options }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<any>(null);

    useEffect(() => {
        registerChartPlugins();
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'doughnut',
                data,
                options,
            });
        }
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, options]);

    return <canvas ref={chartRef} id={chartId}></canvas>;
};


const AssessmentsTable: React.FC<{ setView: (view: ViewState) => void; currentUserRole: 'parent' | 'child' }> = ({ setView, currentUserRole }) => {
    const assessmentsData = React.useMemo(() => {
        let data = parseCsv(assessmentsCsvData);
        if (!data.some(item => item.SITECODE === '13')) {
            data.push({ SITECODE: '13', SITE_NAME: 'Rossbehy', Status: 'Completed', COUNTY: 'Kerry', HA: '91.71' });
        }
        if (currentUserRole === 'child') {
            return data.filter(row => row.COUNTY === 'Cork');
        }
        return data;
    }, [currentUserRole]);

    const hasAssessmentDetail = (siteCode: string) => {
        return ['13', '91', '32', '51', '37'].includes(siteCode);
    };

    return (
        <div className="bg-surface p-6 rounded-lg shadow-md">
            <div className="h-[calc(100vh-18rem)] overflow-y-auto pr-2">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="p-2 font-semibold">Site Code</th>
                            <th className="p-2 font-semibold">Site Name</th>
                            <th className="p-2 font-semibold">Status</th>
                            <th className="p-2 font-semibold">County</th>
                            <th className="p-2 font-semibold text-right">Area (ha)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {assessmentsData.map((row, index) => (
                            <tr
                                key={index}
                                className={
                                    hasAssessmentDetail(row.SITECODE)
                                    ? "cursor-pointer hover:bg-blue-50"
                                    : "hover:bg-gray-50"
                                }
                                onClick={() => {
                                    if (hasAssessmentDetail(row.SITECODE)) {
                                        setView({ view: ViewType.AssessmentDetail, param: { siteCode: row.SITECODE } });
                                    }
                                }}
                            >
                                <td className="p-2">{row.SITECODE}</td>
                                <td className="p-2 font-medium text-secondary">{row.SITE_NAME}</td>
                                <td className="p-2"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColorClass(row.Status)}`}>{row.Status}</span></td>
                                <td className="p-2">{row.COUNTY}</td>
                                <td className="p-2 text-right">{row.HA}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ActionsTable: React.FC<{ setView: (view: ViewState) => void; currentUserRole: 'parent' | 'child' }> = ({ setView, currentUserRole }) => {
    const actionsData = React.useMemo(() => {
        const data = parseCsv(actionsCsvData);
        if (currentUserRole === 'child') {
            return data.filter(row => row.COUNTY === 'Cork');
        }
        return data;
    }, [currentUserRole]);
    return (
        <div className="bg-surface p-6 rounded-lg shadow-md">
            <div className="h-[calc(100vh-18rem)] overflow-y-auto pr-2">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="p-2 font-semibold">Site Code</th>
                            <th className="p-2 font-semibold">Site Name</th>
                            <th className="p-2 font-semibold">Status</th>
                            <th className="p-2 font-semibold">Action Type</th>
                            <th className="p-2 font-semibold">County</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {actionsData.map((row, index) => {
                            const hasActionPlan = ['91', '32', '51', '37'].includes(row.SITECODE);
                            return (
                                <tr
                                    key={index}
                                    className={
                                        hasActionPlan
                                        ? "cursor-pointer hover:bg-blue-50"
                                        : "hover:bg-gray-50"
                                    }
                                    onClick={() => {
                                        if (hasActionPlan) {
                                            setView({ view: ViewType.ActionDetail, param: { siteCode: row.SITECODE } });
                                        }
                                    }}
                                >
                                    <td className="p-2">{row.SITECODE}</td>
                                    <td className="p-2 font-medium text-secondary">{row.SITE_NAME}</td>
                                    <td className="p-2"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColorClass(row.Status)}`}>{row.Status}</span></td>
                                    <td className="p-2">{row.ActionType}</td>
                                    <td className="p-2">{row.COUNTY}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const KeyStats: React.FC<{ currentUserRole: 'parent' | 'child' }> = ({ currentUserRole }) => {
    const [activeTab, setActiveTab] = React.useState('habitats');

    const parentStatsData = {
        habitats: { total: 240, favourable: 190, inadequate: 40, unfavourable: 10 },
        species: { total: 180, favourable: 120, inadequate: 45, unfavourable: 15 }
    };
    const childStatsData = {
        habitats: { total: 12, favourable: 8, inadequate: 3, unfavourable: 1 },
        species: { total: 9, favourable: 6, inadequate: 2, unfavourable: 1 }
    };

    const statsData = currentUserRole === 'parent' ? parentStatsData : childStatsData;
    const currentStats = statsData[activeTab as keyof typeof statsData];

    const tabButtonClass = (tabName: string) => 
        `py-2 px-4 text-sm font-medium focus:outline-none ${activeTab === tabName ? 'border-b-2 border-accent text-accent' : 'text-gray-500 hover:text-gray-700'}`;

    return (
        <div className="bg-surface p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex border-b border-gray-200 mb-4">
                <button onClick={() => setActiveTab('habitats')} className={tabButtonClass('habitats')}>Habitats</button>
                <button onClick={() => setActiveTab('species')} className={tabButtonClass('species')}>Species</button>
            </div>
            <div className="space-y-3 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Assessments</span>
                    <span className="font-bold text-secondary text-lg">{currentStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Favourable</span>
                    <span className="font-bold text-status-favourable text-lg">{currentStats.favourable}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Inadequate</span>
                    <span className="font-bold text-status-inadequate text-lg">{currentStats.inadequate}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Unfavourable</span>
                    <span className="font-bold text-status-bad text-lg">{currentStats.unfavourable}</span>
                </div>
            </div>
        </div>
    );
};


const DashboardView: React.FC<DashboardProps> = ({ setView, currentUserRole }) => {
    const [activeTab, setActiveTab] = React.useState('assessments');

    if (currentUserRole === 'child') {
        return <WorkflowDashboard setView={setView} />;
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12 } },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        let label = context.label || '';
                        if (label) label += ': ';
                        const value = context.raw;
                        const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0%';
                        return `${label}${value} (${percentage})`;
                    }
                }
            },
            datalabels: {
                formatter: (value: number, ctx: any) => {
                    let sum = ctx.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                    let percentage = sum > 0 ? (value * 100 / sum).toFixed(0) + "%" : '0%';
                    return value > 0 ? percentage : '';
                },
                color: '#fff',
                font: { weight: 'bold' }
            }
        }
    };

    const parentActionsChartData = {
        labels: ['Not Assigned', 'Pending', 'In Progress', 'Completed'],
        datasets: [{ data: [5, 3, 8, 12], backgroundColor: ['#E5E7EB', '#FBBF24', '#3B82F6', '#10B981'] }]
    };
    const childActionsChartData = {
        labels: ['Not Assigned', 'Pending', 'In Progress', 'Completed'],
        datasets: [{ data: [1, 0, 2, 1], backgroundColor: ['#E5E7EB', '#FBBF24', '#3B82F6', '#10B981'] }]
    };
    const actionsChartData = currentUserRole === 'parent' ? parentActionsChartData : childActionsChartData;
    
    const parentSurveysChartData = {
        labels: ['Not Assigned', 'Pending', 'In Progress', 'Completed'],
        datasets: [{ data: [3, 1, 2, 8], backgroundColor: ['#E5E7EB', '#FBBF24', '#3B82F6', '#10B981'] }]
    };
    const childSurveysChartData = {
        labels: ['Not Assigned', 'Pending', 'In Progress', 'Completed'],
        datasets: [{ data: [0, 0, 1, 1], backgroundColor: ['#E5E7EB', '#FBBF24', '#3B82F6', '#10B981'] }]
    };
    const surveysChartData = currentUserRole === 'parent' ? parentSurveysChartData : childSurveysChartData;

    const tabButtonClass = (tabName: string) =>
        `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tabName ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`;


    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-secondary mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-surface p-6 rounded-lg shadow-md">
                    <h3 className="font-semibold text-secondary text-center">Action Status</h3>
                    <div className="h-64 mx-auto mt-4"><DoughnutChart chartId="actions-chart" data={actionsChartData} options={chartOptions}/></div>
                </div>
                <div className="bg-surface p-6 rounded-lg shadow-md">
                    <h3 className="font-semibold text-secondary text-center">Assessment Status</h3>
                    <div className="h-64 mx-auto mt-4"><DoughnutChart chartId="surveys-chart" data={surveysChartData} options={chartOptions}/></div>
                </div>
                <KeyStats currentUserRole={currentUserRole} />
            </div>
            
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('assessments')} className={tabButtonClass('assessments')}>
                        Conservation Assessments
                    </button>
                    <button onClick={() => setActiveTab('actions')} className={tabButtonClass('actions')}>
                        Conservation Actions
                    </button>
                </nav>
            </div>
            <div className="mt-6">
                {activeTab === 'assessments' && <AssessmentsTable setView={setView} currentUserRole={currentUserRole} />}
                {activeTab === 'actions' && <ActionsTable setView={setView} currentUserRole={currentUserRole} />}
            </div>
        </div>
    );
};

const MyTasksView: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
    const tasks = [
        {
            id: 1,
            site: 'Clonakilty Bay SAC',
            siteCode: '91',
            county: 'Cork',
            type: 'Assessment',
            status: 'In Progress',
            phase: 'Desk Research',
            assignedBy: 'Dr. Sarah Murphy',
            assignedDate: '2025-11-15',
            dueDate: '2025-12-01',
            description: 'Complete habitat assessment and data collection for SAC monitoring',
            completedSteps: ['GIS Review', 'Background Research'],
            nextSteps: ['Complete Data Mine', 'Schedule Field Visit']
        },
        {
            id: 2,
            site: 'Rossbehy SAC',
            siteCode: '13',
            county: 'Kerry',
            type: 'Assessment',
            status: 'Not Started',
            phase: 'Not Started',
            assignedBy: 'Dr. Sarah Murphy',
            assignedDate: '2025-11-18',
            dueDate: '2025-12-15',
            description: 'Conduct ecological impact assessment for coastal habitat',
            completedSteps: [],
            nextSteps: ['Start with GIS Mapping', 'Run Data Mine Search', 'Review Background Data']
        }
    ];

    const getPhaseIcon = (phase: string) => {
        switch(phase) {
            case 'Desk Research': return Lucide.Database;
            case 'Field Research': return Lucide.MapPin;
            case 'Reporting': return Lucide.FileText;
            default: return Lucide.Circle;
        }
    };

    const getNextAction = (phase: string) => {
        switch(phase) {
            case 'Not Started':
                return { text: 'Start Desk Research', view: ViewType.DataMine, icon: Lucide.Database };
            case 'Desk Research':
                return { text: 'Continue to Field Survey', view: ViewType.FieldSurvey, icon: Lucide.MapPin };
            case 'Field Research':
                return { text: 'Generate Report', view: ViewType.Reporting, icon: Lucide.FileText };
            default:
                return { text: 'View Details', view: ViewType.AssessmentDetail, icon: Lucide.Eye };
        }
    };

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Assignments</p>
                            <p className="text-2xl font-bold text-secondary">{tasks.length}</p>
                        </div>
                        <Lucide.Briefcase className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">In Progress</p>
                            <p className="text-2xl font-bold text-secondary">{tasks.filter(t => t.status === 'In Progress').length}</p>
                        </div>
                        <Lucide.Clock className="w-8 h-8 text-orange-500" />
                    </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Due This Week</p>
                            <p className="text-2xl font-bold text-secondary">{tasks.filter(t => new Date(t.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}</p>
                        </div>
                        <Lucide.Calendar className="w-8 h-8 text-green-500" />
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

            {/* Tasks List */}
            <div className="space-y-4">
                {tasks.map(task => {
                    const PhaseIcon = getPhaseIcon(task.phase);
                    const nextAction = getNextAction(task.phase);
                    const NextActionIcon = nextAction.icon;
                    const progressPercentage = task.phase === 'Not Started' ? 0 : task.phase === 'Desk Research' ? 33 : task.phase === 'Field Research' ? 66 : 100;

                    return (
                        <div key={task.id} className="bg-surface rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                            {/* Task Header */}
                            <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200 rounded-t-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-xl font-bold text-secondary">{task.site}</h3>
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColorClass(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <Lucide.Hash className="w-4 h-4" />
                                                <span>Site Code: <strong>{task.siteCode}</strong></span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Lucide.MapPin className="w-4 h-4" />
                                                <span>{task.county}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Lucide.UserCheck className="w-4 h-4" />
                                                <span>Assigned by: {task.assignedBy}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Lucide.CalendarDays className="w-4 h-4" />
                                                <span>Assigned: {new Date(task.assignedDate).toLocaleDateString('en-IE')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Task Body */}
                            <div className="p-6">
                                <p className="text-gray-700 mb-4">{task.description}</p>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Progress</span>
                                        <span className="text-sm font-medium text-gray-700">{progressPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-accent h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Current Phase */}
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <PhaseIcon className="w-5 h-5 text-blue-600" />
                                        <span className="font-semibold text-gray-900">Current Phase: {task.phase}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Lucide.Calendar className="w-4 h-4" />
                                        <span>Due: <strong>{new Date(task.dueDate).toLocaleDateString('en-IE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</strong></span>
                                    </div>
                                </div>

                                {/* Progress Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {task.completedSteps.length > 0 && (
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Lucide.CheckCircle className="w-5 h-5 text-green-600" />
                                                <span className="font-semibold text-gray-900">Completed</span>
                                            </div>
                                            <ul className="space-y-1">
                                                {task.completedSteps.map((step, idx) => (
                                                    <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                                                        <Lucide.Check className="w-4 h-4 text-green-600" />
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Lucide.ListTodo className="w-5 h-5 text-orange-600" />
                                            <span className="font-semibold text-gray-900">Next Steps</span>
                                        </div>
                                        <ul className="space-y-1">
                                            {task.nextSteps.map((step, idx) => (
                                                <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                                                    <Lucide.Circle className="w-3 h-3 text-orange-600" />
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setView({ view: nextAction.view, param: { siteCode: task.siteCode } })}
                                        className="bg-accent text-white py-2.5 px-6 rounded-md hover:brightness-95 flex items-center space-x-2 font-medium shadow-sm"
                                    >
                                        <NextActionIcon className="w-5 h-5" />
                                        <span>{nextAction.text}</span>
                                    </button>
                                    {task.phase !== 'Not Started' && (
                                        <button
                                            onClick={() => setView({ view: ViewType.AssessmentDetail, param: { siteCode: task.siteCode } })}
                                            className="bg-gray-200 text-gray-700 py-2.5 px-6 rounded-md hover:bg-gray-300 flex items-center space-x-2 font-medium shadow-sm"
                                        >
                                            <Lucide.Eye className="w-5 h-5" />
                                            <span>View Full Assessment</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setView({ view: ViewType.Tasks })}
                                        className="bg-white border border-gray-300 text-gray-700 py-2.5 px-6 rounded-md hover:bg-gray-50 flex items-center space-x-2 font-medium shadow-sm"
                                    >
                                        <Lucide.Info className="w-5 h-5" />
                                        <span>Site Status</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-secondary mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

export default DashboardView;