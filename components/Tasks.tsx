import React from 'react';
import { sacConditionsCsv, spaConditionsCsv, nhaConditionsCsv } from '../constants';
import { parseCsv, getStatusColorClass } from '../services';
import type { ViewState } from '../types';
import { ViewType } from '../types';

interface TasksViewProps {
    setView: (view: ViewState) => void;
    currentUserRole: 'parent' | 'child';
}

interface TableProps {
    setView: (view: ViewState) => void;
    currentUserRole: 'parent' | 'child';
}

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

const TasksView: React.FC<TasksViewProps> = ({ setView, currentUserRole }) => {
    const [siteStatusTab, setSiteStatusTab] = React.useState('sac');

    const allSiteStatusData = React.useMemo(() => {
        if (siteStatusTab === 'sac') return parseCsv(sacConditionsCsv);
        if (siteStatusTab === 'spa') return parseCsv(spaConditionsCsv);
        return parseCsv(nhaConditionsCsv);
    }, [siteStatusTab]);

    const siteStatusData = currentUserRole === 'parent'
        ? allSiteStatusData
        : allSiteStatusData.filter(d => d.COUNTY === 'Cork');

    const tabButtonClass = (tabName: string) =>
        `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${siteStatusTab === tabName ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-secondary mb-6">Site Status</h2>
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

export default TasksView;