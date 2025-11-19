import React, { useEffect, useRef } from 'react';
import type { ViewState } from '../types';
import { ViewType } from '../types';
import { assessmentsCsvData, actionsCsvData } from '../constants';
import { parseCsv, getStatusColorClass, registerChartPlugins } from '../services';

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
                                    row.SITECODE === '13' || row.SITECODE === '91'
                                    ? "cursor-pointer hover:bg-blue-50"
                                    : "hover:bg-gray-50"
                                }
                                onClick={() => {
                                    if (row.SITECODE === '13') setView({ view: ViewType.AssessmentDetail, param: { siteCode: 13 } });
                                    if (row.SITECODE === '91') setView({ view: ViewType.ActionDetail, param: { siteCode: 91 } });
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
                        {actionsData.map((row, index) => (
                            <tr
                                key={index}
                                className={
                                    row.SITECODE === '91'
                                    ? "cursor-pointer hover:bg-blue-50"
                                    : "hover:bg-gray-50"
                                }
                                onClick={() => {
                                    if (row.SITECODE === '91') setView({ view: ViewType.ActionDetail, param: { siteCode: 91 } });
                                }}
                            >
                                <td className="p-2">{row.SITECODE}</td>
                                <td className="p-2 font-medium text-secondary">{row.SITE_NAME}</td>
                                <td className="p-2"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColorClass(row.Status)}`}>{row.Status}</span></td>
                                <td className="p-2">{row.ActionType}</td>
                                <td className="p-2">{row.COUNTY}</td>
                            </tr>
                        ))}
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

export default DashboardView;