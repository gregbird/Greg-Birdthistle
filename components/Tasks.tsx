
import React from 'react';
import { assessmentsCsvData, actionsCsvData } from '../constants';
import { parseCsv, getStatusColorClass } from '../services';
import type { ViewState } from '../types';
import { ViewType } from '../types';

const AssessmentsTable: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
    const assessmentsData = React.useMemo(() => {
        let data = parseCsv(assessmentsCsvData);
        if (!data.some(item => item.SITECODE === '13')) {
            data.push({ SITECODE: '13', SITE_NAME: 'Rossbehy', Status: 'Completed', COUNTY: 'Kerry', HA: '91.71' });
        }
        return data;
    }, []);

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

const ActionsTable: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
    const actionsData = React.useMemo(() => parseCsv(actionsCsvData), []);
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

const TasksView: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
    const [activeTab, setActiveTab] = React.useState('assessments');

    const tabButtonClass = (tabName: string) =>
        `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tabName ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-secondary mb-6">Tasks</h2>
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
                {activeTab === 'assessments' && <AssessmentsTable setView={setView} />}
                {activeTab === 'actions' && <ActionsTable setView={setView} />}
            </div>
        </div>
    );
};

export default TasksView;
