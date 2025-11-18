
import React, { useEffect, useRef } from 'react';
import type { ViewState } from '../types';
import { ViewType } from '../types';
import { sacConditionsCsv, spaConditionsCsv, nhaConditionsCsv } from '../constants';
import { parseCsv, getStatusColorClass, registerChartPlugins } from '../services';

// Declare Chart.js from CDN
declare var Chart: any;

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


const SiteStatusTable: React.FC<{ data: any[] }> = ({ data }) => {
    const generateRandomConservationString = () => {
        const statuses = ['Favourable', 'Inadequate', 'Bad'];
        const randStatus = () => statuses[Math.floor(Math.random() * 3)];
        const statusColor = (status: string) => {
            if (status === 'Favourable') return 'text-status-favourable';
            if (status === 'Inadequate') return 'text-status-inadequate';
            return 'text-status-bad';
        };
        
        const s = [randStatus(), randStatus(), randStatus(), randStatus()];

        return (
            <div className="text-xs space-y-1">
                <div>Range: <span className={`font-medium ${statusColor(s[0])}`}>{s[0]}</span></div>
                <div>Area: <span className={`font-medium ${statusColor(s[1])}`}>{s[1]}</span></div>
                <div>Structure & Functions: <span className={`font-medium ${statusColor(s[2])}`}>{s[2]}</span></div>
                <div>Future Prospects: <span className={`font-medium ${statusColor(s[3])}`}>{s[3]}</span></div>
            </div>
        );
    };
    
    return (
        <div className="pr-2">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 sticky top-0">
                    <tr>
                        <th className="p-2 font-semibold">Site Code</th>
                        <th className="p-2 font-semibold">Site Name</th>
                        <th className="p-2 font-semibold">Habitats Health</th>
                        <th className="p-2 font-semibold">Species Health</th>
                        <th className="p-2 font-semibold">Last Updated</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-2">{row.Sitecode}</td>
                            <td className="p-2">{row.SiteName}</td>
                            <td className="p-2">{generateRandomConservationString()}</td>
                            <td className="p-2">{generateRandomConservationString()}</td>
                            <td className="p-2">{row.LastUpate || row.LastUpdated || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const KeyStats: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('habitats');

    const statsData = {
        habitats: {
            total: 240,
            favourable: 190,
            inadequate: 40,
            unfavourable: 10,
        },
        species: {
            total: 180,
            favourable: 120,
            inadequate: 45,
            unfavourable: 15,
        }
    };

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


const DashboardView: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
    const [siteStatusTab, setSiteStatusTab] = React.useState('sac');

    const siteStatusData = React.useMemo(() => {
        if (siteStatusTab === 'sac') return parseCsv(sacConditionsCsv);
        if (siteStatusTab === 'spa') return parseCsv(spaConditionsCsv);
        return parseCsv(nhaConditionsCsv);
    }, [siteStatusTab]);

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

    const actionsChartData = {
        labels: ['Not Assigned', 'Pending', 'In Progress', 'Completed'],
        datasets: [{
            data: [5, 3, 8, 12],
            backgroundColor: ['#E5E7EB', '#FBBF24', '#3B82F6', '#10B981'],
        }]
    };
    
    const surveysChartData = {
        labels: ['Not Assigned', 'Pending', 'In Progress', 'Completed'],
        datasets: [{
            data: [3, 1, 2, 8],
            backgroundColor: ['#E5E7EB', '#FBBF24', '#3B82F6', '#10B981'],
        }]
    };

    const tabButtonClass = (tabName: string) => 
        `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${siteStatusTab === tabName ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`;


    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-secondary mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div 
                    className="bg-surface p-6 rounded-lg shadow-md cursor-pointer transition-shadow hover:shadow-xl"
                    onClick={() => setView({ view: ViewType.Tasks })}
                >
                    <h3 className="font-semibold text-secondary text-center">Action Status</h3>
                    <div className="h-64 mx-auto mt-4"><DoughnutChart chartId="actions-chart" data={actionsChartData} options={chartOptions}/></div>
                </div>
                <div 
                    className="bg-surface p-6 rounded-lg shadow-md cursor-pointer transition-shadow hover:shadow-xl"
                    onClick={() => setView({ view: ViewType.Tasks })}
                >
                    <h3 className="font-semibold text-secondary text-center">Assessment Status</h3>
                    <div className="h-64 mx-auto mt-4"><DoughnutChart chartId="surveys-chart" data={surveysChartData} options={chartOptions}/></div>
                </div>
                <KeyStats />
            </div>
            
            <div className="bg-surface p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-secondary mb-4">Conservation Site Status</h3>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button onClick={() => setSiteStatusTab('sac')} className={tabButtonClass('sac')}>SAC</button>
                        <button onClick={() => setSiteStatusTab('spa')} className={tabButtonClass('spa')}>SPA</button>
                        <button onClick={() => setSiteStatusTab('nha')} className={tabButtonClass('nha')}>NHA</button>
                    </nav>
                </div>
                <div className="mt-4">
                    <SiteStatusTable data={siteStatusData} />
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
