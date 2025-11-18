
import React from 'react';
import type { ViewState } from '../types';
import { ViewType } from '../types';
import * as Lucide from 'lucide-react';
import { getStatusColorClass } from '../services';

const AssessmentDetailView: React.FC<{ setView: (view: ViewState) => void, param: any }> = ({ setView, param }) => {
    const siteCode = param.siteCode;
    // Mocking data for Rossbehy (Site Code 13)
    const siteData = {
        SiteName: 'Rossbehy',
        Sitecode: '13',
        Status: 'Completed',
        COUNTY: 'Kerry',
        HA: '91.71'
    };

    return (
        <div className="p-4 md:p-8">
            <button onClick={() => setView({ view: ViewType.Tasks })} className="text-sm text-accent mb-4 flex items-center space-x-1">
                <Lucide.ArrowLeft className="w-4 h-4" />
                <span>Back to Tasks</span>
            </button>
            <div className="bg-surface p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-secondary">{siteData.SiteName}</h2>
                        <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Site Code: {siteData.Sitecode}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ml-2 ${getStatusColorClass(siteData.Status)}`}>{siteData.Status}</span>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-sm text-gray-500">County: {siteData.COUNTY}</p>
                        <p className="text-sm text-gray-500">Area: {siteData.HA} ha</p>
                    </div>
                </div>
                {/* Map and Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Site Map (Figure 1)</h3>
                        <img src="https://placehold.co/600x400/e2e8f0/475569?text=Rossbehy+Overview+Map" alt="Site Map" className="w-full h-full object-cover rounded-md"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Key Habitats & Species</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold">Habitats</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                                    <li>Fixed coastal dunes with herbaceous vegetation (* priority habitat) (2130)</li>
                                    <li>Embryonic shifting dunes (2110)</li>
                                    <li>Atlantic salt meadows (Glauco-Puccinellietalia maritimae) (1330)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold">Species</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                                    <li>Light-bellied Brent Goose (Branta bernicla hrota)</li>
                                    <li>Ringed Plover (Charadrius hiaticula)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="prose max-w-none text-sm bg-gray-50 p-4 rounded-md border max-h-96 overflow-y-auto">
                    <h4>Site Description</h4>
                    <p>Rossbehy is a large site covering almost 92ha located approximately 1.2km to the north-west of Glenbeigh, Co. Kerry, on the southern shore of Dingle Bay. The site comprises a sand spit which extends northwards into Dingle Bay and an area of saltmarsh which occurs behind (to the east of) the sand dunes.</p>
                </div>
            </div>
        </div>
    );
};

export default AssessmentDetailView;
