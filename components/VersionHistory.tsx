import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import type { AssessmentVersion, DataSource } from '../types';

interface VersionHistoryProps {
    assessmentId: string;
    currentVersion: number;
    onRestoreVersion?: (version: AssessmentVersion) => void;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({
    assessmentId,
    currentVersion,
    onRestoreVersion
}) => {
    // Sample version history - in a real app, this would come from a database
    const [versions] = useState<AssessmentVersion[]>([
        {
            id: 'v3',
            assessmentId,
            version: 3,
            createdAt: '2025-11-19T10:30:00Z',
            createdBy: 'Cian O\'Donnell',
            changes: [
                'Updated species count for Natterer\'s bat',
                'Added new habitat polygon',
                'Corrected GPS coordinates for survey point 5'
            ],
            data: {},
            dataSources: [
                {
                    id: 'npws-2024-v2',
                    name: 'NPWS Species Database',
                    type: 'species',
                    version: '2024.2',
                    lastUpdated: '2024-11-01',
                    metadata: {}
                },
                {
                    id: 'met-eireann-2024',
                    name: 'Met Éireann Climate Data',
                    type: 'climate',
                    version: '2024.11',
                    lastUpdated: '2024-11-15',
                    metadata: {}
                }
            ]
        },
        {
            id: 'v2',
            assessmentId,
            version: 2,
            createdAt: '2025-11-18T14:20:00Z',
            createdBy: 'Cian O\'Donnell',
            changes: [
                'Completed field survey data entry',
                'Added photo documentation',
                'Validated habitat classifications'
            ],
            data: {},
            dataSources: [
                {
                    id: 'npws-2024-v2',
                    name: 'NPWS Species Database',
                    type: 'species',
                    version: '2024.2',
                    lastUpdated: '2024-11-01',
                    metadata: {}
                },
                {
                    id: 'met-eireann-2024',
                    name: 'Met Éireann Climate Data',
                    type: 'climate',
                    version: '2024.10',
                    lastUpdated: '2024-10-15',
                    metadata: {}
                }
            ]
        },
        {
            id: 'v1',
            assessmentId,
            version: 1,
            createdAt: '2025-11-15T09:00:00Z',
            createdBy: 'Dr. Sarah Murphy',
            changes: [
                'Initial assessment created',
                'Desk research completed',
                'GIS analysis complete'
            ],
            data: {},
            dataSources: [
                {
                    id: 'npws-2024-v1',
                    name: 'NPWS Species Database',
                    type: 'species',
                    version: '2024.1',
                    lastUpdated: '2024-10-01',
                    metadata: {}
                }
            ]
        }
    ]);

    const [selectedVersion, setSelectedVersion] = useState<AssessmentVersion | null>(null);

    const getDataSourceIcon = (type: string) => {
        switch (type) {
            case 'gis': return Lucide.Map;
            case 'climate': return Lucide.Cloud;
            case 'species': return Lucide.Bug;
            case 'survey': return Lucide.ClipboardList;
            default: return Lucide.Database;
        }
    };

    return (
        <div className="space-y-4">
            {/* Version Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <Lucide.History className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-semibold text-secondary">Version History</h3>
                </div>

                <div className="space-y-4">
                    {versions.map((version, index) => {
                        const isLatest = version.version === currentVersion;
                        const timeSince = new Date(version.createdAt).toLocaleString('en-IE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });

                        return (
                            <div
                                key={version.id}
                                className={`relative border-2 rounded-lg p-4 transition-all ${
                                    isLatest
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-white border-gray-200 hover:border-accent cursor-pointer'
                                }`}
                                onClick={() => !isLatest && setSelectedVersion(version)}
                            >
                                {/* Timeline connector */}
                                {index < versions.length - 1 && (
                                    <div className="absolute left-8 top-full h-4 w-0.5 bg-gray-300" />
                                )}

                                <div className="flex items-start space-x-4">
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                        isLatest ? 'bg-green-500' : 'bg-gray-300'
                                    }`}>
                                        <span className="text-white font-bold">v{version.version}</span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="font-semibold text-gray-900">
                                                        Version {version.version}
                                                    </h4>
                                                    {isLatest && (
                                                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {timeSince} by {version.createdBy}
                                                </p>
                                            </div>
                                            {!isLatest && onRestoreVersion && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm(`Restore to version ${version.version}? This will create a new version.`)) {
                                                            onRestoreVersion(version);
                                                        }
                                                    }}
                                                    className="text-accent hover:text-accent-dark flex items-center space-x-1 text-sm"
                                                >
                                                    <Lucide.RotateCcw className="w-4 h-4" />
                                                    <span>Restore</span>
                                                </button>
                                            )}
                                        </div>

                                        {/* Changes */}
                                        <div className="bg-white bg-opacity-60 rounded p-3 mb-2">
                                            <h5 className="text-sm font-semibold text-gray-700 mb-1">Changes:</h5>
                                            <ul className="space-y-1">
                                                {version.changes.map((change, idx) => (
                                                    <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                                                        <Lucide.Circle className="w-2 h-2 mt-1.5 flex-shrink-0" />
                                                        <span>{change}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Data Sources Used */}
                                        <div>
                                            <h5 className="text-xs font-semibold text-gray-700 mb-2">Data Sources:</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {version.dataSources.map((source) => {
                                                    const Icon = getDataSourceIcon(source.type);
                                                    return (
                                                        <div
                                                            key={source.id}
                                                            className="flex items-center space-x-1 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                                                        >
                                                            <Icon className="w-3 h-3" />
                                                            <span>{source.name} ({source.version})</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Version Comparison */}
            {selectedVersion && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-secondary">Version {selectedVersion.version} Details</h4>
                        <button
                            onClick={() => setSelectedVersion(null)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <Lucide.X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Metadata</h5>
                            <div className="bg-gray-50 rounded p-3 text-sm">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="text-gray-600">Created:</span>{' '}
                                        <span className="font-medium">{new Date(selectedVersion.createdAt).toLocaleString('en-IE')}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Author:</span>{' '}
                                        <span className="font-medium">{selectedVersion.createdBy}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Data Source Versions</h5>
                            <div className="space-y-2">
                                {selectedVersion.dataSources.map((source) => {
                                    const Icon = getDataSourceIcon(source.type);
                                    return (
                                        <div key={source.id} className="bg-gray-50 rounded p-3 flex items-center space-x-3">
                                            <Icon className="w-5 h-5 text-accent" />
                                            <div className="flex-1">
                                                <div className="font-medium text-sm">{source.name}</div>
                                                <div className="text-xs text-gray-600">
                                                    Version: {source.version} • Updated: {new Date(source.lastUpdated).toLocaleDateString('en-IE')}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                    <Lucide.Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <h5 className="font-semibold text-blue-900 mb-1">About Versioning</h5>
                        <p className="text-sm text-blue-800">
                            Every change to an assessment creates a new version. This allows you to track
                            the evolution of your work, identify when changes were made, and restore previous
                            versions if needed. Data source versions are also tracked to ensure reproducibility.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VersionHistory;
