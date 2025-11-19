import React from 'react';
import type { ViewState } from '../types';
import { ViewType } from '../types';
import * as Lucide from 'lucide-react';
import { siteAssessments } from '../constants';

const getConservationStatusColor = (status: 'Favourable' | 'Inadequate' | 'Bad') => {
    if (status === 'Favourable') return 'text-status-favourable';
    if (status === 'Inadequate') return 'text-status-inadequate';
    return 'text-status-bad';
};

const getConservationStatusBadge = (status: 'Favourable' | 'Inadequate' | 'Bad') => {
    if (status === 'Favourable') return 'bg-green-100 text-green-800';
    if (status === 'Inadequate') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
};

interface AssessmentDetailViewProps {
    setView: (view: ViewState) => void;
    param: any;
}

const AssessmentDetailView: React.FC<AssessmentDetailViewProps> = ({ setView, param }) => {
    const siteCode = param.siteCode.toString();
    const siteData = siteAssessments[siteCode];

    if (!siteData) {
        return (
            <div className="p-4 md:p-8">
                <button onClick={() => setView({ view: ViewType.Dashboard })} className="text-sm text-accent mb-4 flex items-center space-x-1">
                    <Lucide.ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                </button>
                <div className="bg-surface p-6 rounded-lg shadow-md">
                    <p>No assessment data available for this site.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <button onClick={() => setView({ view: ViewType.Dashboard })} className="text-sm text-accent mb-4 flex items-center space-x-1">
                <Lucide.ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
            </button>

            <div className="bg-surface p-6 md:p-8 rounded-lg shadow-md">
                <div className="border-b pb-6 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-secondary">{siteData.siteName}</h2>
                            <div className="flex items-center space-x-3 mt-2">
                                <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Site Code: {siteData.siteCode.padStart(6, '0')}</span>
                                <span className="text-sm text-gray-600">County: {siteData.county}</span>
                                <span className="text-sm text-gray-600">Area: {siteData.area}</span>
                            </div>
                        </div>
                        {siteData.siteCode === '13' && (
                            <a
                                href="https://www.npws.ie/sites/default/files/protected-sites/conservation_objectives/CO000364.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors text-sm font-medium"
                            >
                                <Lucide.FileText className="w-4 h-4" />
                                <span>View Full Report (PDF)</span>
                            </a>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Site Map</h3>
                        <img src={siteData.mapUrl} alt={`${siteData.siteName} Map`} className="w-full h-64 object-cover rounded-md"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Site Description</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{siteData.description}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-secondary mb-4">Habitat Assessments</h3>
                    <div className="space-y-4">
                        {siteData.habitats.map((habitat, index) => (
                            <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-bold text-secondary text-lg">{habitat.name}</h4>
                                        <p className="text-sm text-gray-600 mt-1">Code: {habitat.code} | Area: {habitat.area}</p>
                                    </div>
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getConservationStatusBadge(habitat.overallStatus)}`}>
                                        {habitat.overallStatus}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                                    <div>
                                        <span className="text-gray-600 block">Range</span>
                                        <span className={`font-semibold ${getConservationStatusColor(habitat.range)}`}>{habitat.range}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 block">Area Status</span>
                                        <span className={`font-semibold ${getConservationStatusColor(habitat.areaStatus)}`}>{habitat.areaStatus}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 block">Structure & Functions</span>
                                        <span className={`font-semibold ${getConservationStatusColor(habitat.structureAndFunctions)}`}>{habitat.structureAndFunctions}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 block">Future Prospects</span>
                                        <span className={`font-semibold ${getConservationStatusColor(habitat.futureProspects)}`}>{habitat.futureProspects}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded border border-gray-200">
                                    <p className="text-sm text-gray-700">{habitat.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-secondary mb-4">Species Assessments</h3>
                    <div className="space-y-4">
                        {siteData.species.map((species, index) => (
                            <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-bold text-secondary text-lg">{species.name}</h4>
                                        <p className="text-sm text-gray-600 italic">{species.scientificName}</p>
                                    </div>
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getConservationStatusBadge(species.overallStatus)}`}>
                                        {species.overallStatus}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                                    <div>
                                        <span className="text-gray-600 block">Population</span>
                                        <span className={`font-semibold ${getConservationStatusColor(species.population)}`}>{species.population}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 block">Habitat</span>
                                        <span className={`font-semibold ${getConservationStatusColor(species.habitat)}`}>{species.habitat}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 block">Future Prospects</span>
                                        <span className={`font-semibold ${getConservationStatusColor(species.futureProspects)}`}>{species.futureProspects}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded border border-gray-200">
                                    <p className="text-sm text-gray-700">{species.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Management Issues</h3>
                        <ul className="space-y-2">
                            {siteData.managementIssues.map((issue, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                    <Lucide.AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{issue}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Conservation Objectives</h3>
                        <ul className="space-y-2">
                            {siteData.conservationObjectives.map((objective, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                    <Lucide.Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{objective}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentDetailView;
