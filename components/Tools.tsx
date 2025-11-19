
import React, { useState, useRef } from 'react';
import type { ViewState, TeamMember, Project, Survey, AIChatMessage } from '../types';
import { ViewType } from '../types';
import * as Lucide from 'lucide-react';
import { generateAiReportContent } from '../services';
import ImpactCalculationView from './ImpactCalculation';


const GisMappingView: React.FC = () => {
    const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
    const [layerVisibility, setLayerVisibility] = useState<{ [key: string]: boolean }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const datasets = {
        "NPWS Datasets": ["Natural Heritage Areas", "proposed Natural Heritage Areas", "Special Area of Conservation", "Special Areas of Protection"],
        "EPA Datasets": ["Pollution Impact Potential for Nitrogen", "Pollution Impact Potential for Phosphorus", "PIP Phosphorus flow paths"],
        "DAFM datasets": ["LPIS data", "BPS data"]
    };

    const handleDatasetToggle = (dataset: string) => {
        setSelectedDatasets(prev =>
            prev.includes(dataset)
                ? prev.filter(d => d !== dataset)
                : [...prev, dataset]
        );
    };

    const handleLoadMap = () => {
        setIsLoading(true);
        setTimeout(() => {
            const initialVisibility: { [key: string]: boolean } = {};
            selectedDatasets.forEach(d => {
                initialVisibility[d] = true;
            });
            setLayerVisibility(initialVisibility);
            setIsLoading(false);
            setShowMap(true);
        }, 2000); // Simulate loading
    };

    const handleLayerVisibilityToggle = (dataset: string) => {
        setLayerVisibility(prev => ({
            ...prev,
            [dataset]: !prev[dataset]
        }));
    };
    
    const processFiles = (files: FileList) => {
        if (files && files.length > 0) {
            const newFileNames = Array.from(files).map(file => file.name);
            setUploadedFiles(prev => [...new Set([...prev, ...newFileNames])]);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            processFiles(event.target.files);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        processFiles(event.dataTransfer.files);
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };


    const resetView = () => {
        setSelectedDatasets([]);
        setLayerVisibility({});
        setIsLoading(false);
        setShowMap(false);
        setSearchQuery('');
        // We keep uploaded files so user doesn't have to re-upload
    };
    
    const visibleLayers = Object.entries(layerVisibility)
        .filter(([, isVisible]) => isVisible)
        .map(([dataset]) => dataset);

    const mapText = visibleLayers.length > 0 
        ? `Visible Layers: ${visibleLayers.join(', ')}`
        : 'No Layers Visible';
    
    const mapImageUrl = `https://placehold.co/1200x800/e2e8f0/475569?text=${encodeURIComponent(mapText)}`;

    const filteredPredefinedDatasets = Object.entries(datasets)
        .map(([category, items]) => {
            const filteredItems = items.filter(item =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return [category, filteredItems] as [string, string[]];
        })
        .filter(([, items]) => items.length > 0);
    
    const filteredUploadedFiles = uploadedFiles.filter(file => 
        file.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-secondary">GIS Mapping</h2>
                {showMap && <button onClick={resetView} className="text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300 flex items-center space-x-1"><Lucide.ListRestart className="w-4 h-4" /><span>Select New Datasets</span></button>}
            </div>

            {!showMap && !isLoading && (
                <div className="bg-surface p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-secondary">Select datasets to load on the map</h3>
                    
                    <div className="relative my-4">
                        <Lucide.Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search datasets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm bg-white"
                        />
                    </div>

                    <div className="mt-4 space-y-6">
                         {/* Upload Section */}
                        <div>
                             <h4 className="font-bold text-secondary mb-3">Upload Your Data</h4>
                             <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={triggerFileUpload}
                                className={`mt-2 flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors cursor-pointer ${isDragging ? 'border-accent bg-orange-50' : 'border-gray-300 hover:border-accent'}`}
                            >
                                <div className="text-center">
                                    <Lucide.UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <p className="pl-1">
                                            Drag & drop files here, or <span className="font-semibold text-accent">click to upload</span>
                                        </p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">GeoJSON, KML, GPX, SHP files supported</p>
                                    <input ref={fileInputRef} onChange={handleFileUpload} type="file" className="hidden" multiple accept=".geojson,.kml,.gpx,.shp" />
                                </div>
                            </div>

                             {filteredUploadedFiles.length > 0 && (
                                 <div className="mt-4">
                                     <h5 className="text-sm font-medium text-gray-600">Uploaded Files:</h5>
                                     <div className="flex flex-wrap gap-2 mt-2">
                                         {filteredUploadedFiles.map(file => (
                                             <button
                                                 key={file}
                                                 onClick={() => handleDatasetToggle(file)}
                                                 className={`px-3 py-1.5 text-sm rounded-full transition-colors cursor-pointer flex items-center space-x-2 border
                                                     ${selectedDatasets.includes(file)
                                                         ? 'bg-accent border-accent text-white hover:bg-orange-500'
                                                         : 'bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-200'
                                                     }`}
                                             >
                                                 {selectedDatasets.includes(file) && <Lucide.Check className="w-4 h-4" />}
                                                 <Lucide.File className="w-4 h-4" />
                                                 <span>{file}</span>
                                             </button>
                                         ))}
                                     </div>
                                 </div>
                             )}
                        </div>

                        {filteredPredefinedDatasets.length > 0 ? filteredPredefinedDatasets.map(([category, items]) => (
                            <div key={category}>
                                <h4 className="font-bold text-secondary mb-3">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {items.map(item => (
                                        <button 
                                            key={item} 
                                            onClick={() => handleDatasetToggle(item)}
                                            className={`px-3 py-1.5 text-sm rounded-full transition-colors cursor-pointer flex items-center space-x-2 border
                                                ${selectedDatasets.includes(item) 
                                                    ? 'bg-accent border-accent text-white hover:bg-orange-500' 
                                                    : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {selectedDatasets.includes(item) && <Lucide.Check className="w-4 h-4" />}
                                            <span>{item}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )) : (
                            searchQuery && uploadedFiles.length === 0 && <p className="text-gray-500 text-center py-4">No predefined datasets found matching your search.</p>
                        )}
                    </div>

                    <div className="mt-8 border-t pt-6 flex justify-end">
                        <button 
                            onClick={handleLoadMap} 
                            disabled={selectedDatasets.length === 0}
                            className="bg-accent text-white py-2 px-6 rounded-md hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            <Lucide.Map className="w-5 h-5"/>
                            <span>Load Map ({selectedDatasets.length})</span>
                        </button>
                    </div>
                </div>
            )}
            
            {isLoading && (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="loading-spinner"></div>
                    <p className="mt-4 text-gray-600">Loading map with selected datasets...</p>
                </div>
            )}
            
            {showMap && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-surface p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-secondary border-b pb-2 mb-3 flex items-center space-x-2">
                                <Lucide.Layers className="w-5 h-5" />
                                <span>Layer Control</span>
                            </h3>
                            <div className="space-y-3">
                                {selectedDatasets.map(dataset => (
                                    <label key={dataset} className="flex items-center space-x-3 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            checked={layerVisibility[dataset] || false}
                                            onChange={() => handleLayerVisibilityToggle(dataset)}
                                            className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                                        />
                                        <span className="select-none">{dataset}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <div className="bg-surface p-2 rounded-lg shadow-md">
                            <div className="relative w-full h-[600px] bg-gray-100 rounded-md overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                                    <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
                                        <defs>
                                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" strokeWidth="0.5"/>
                                            </pattern>
                                        </defs>
                                        <rect width="1200" height="600" fill="url(#grid)" />

                                        {/* Ireland coastline simplified */}
                                        <path d="M 400 150 Q 380 120 350 130 Q 320 140 300 180 L 280 250 Q 270 300 290 350 Q 300 380 280 420 L 250 480 Q 260 520 300 530 Q 350 540 400 520 Q 450 510 480 480 L 520 430 Q 560 380 580 320 Q 600 260 580 200 Q 560 150 520 130 Q 480 120 450 140 Z"
                                              fill="#c7e8c7"
                                              stroke="#2d5016"
                                              strokeWidth="2"/>

                                        {/* Water bodies */}
                                        <circle cx="380" cy="280" r="15" fill="#4a90e2" opacity="0.6" />
                                        <ellipse cx="320" cy="350" rx="25" ry="15" fill="#4a90e2" opacity="0.6" />

                                        {/* Visible layers based on selection */}
                                        {layerVisibility['Natural Heritage Areas'] && (
                                            <>
                                                <polygon points="350,200 380,190 390,220 360,230" fill="#90EE90" opacity="0.7" stroke="#228B22" strokeWidth="1.5" />
                                                <text x="365" y="215" fontSize="10" fill="#1a5c1a" fontWeight="bold">NHA</text>
                                            </>
                                        )}

                                        {layerVisibility['Special Area of Conservation'] && (
                                            <>
                                                <polygon points="420,300 460,290 470,330 440,340 410,320" fill="#FFD700" opacity="0.7" stroke="#DAA520" strokeWidth="2" />
                                                <text x="430" y="320" fontSize="10" fill="#8B6914" fontWeight="bold">SAC</text>
                                            </>
                                        )}

                                        {layerVisibility['Special Areas of Protection'] && (
                                            <>
                                                <polygon points="300,400 340,390 350,430 320,445" fill="#FF6B6B" opacity="0.7" stroke="#C92A2A" strokeWidth="2" />
                                                <text x="315" y="420" fontSize="10" fill="#8B0000" fontWeight="bold">SPA</text>
                                            </>
                                        )}

                                        {layerVisibility['Pollution Impact Potential for Nitrogen'] && (
                                            <>
                                                <circle cx="500" cy="250" r="40" fill="#FFA500" opacity="0.5" stroke="#FF8C00" strokeWidth="2" strokeDasharray="5,5" />
                                                <text x="480" y="255" fontSize="9" fill="#8B4500">N Impact</text>
                                            </>
                                        )}

                                        {layerVisibility['Pollution Impact Potential for Phosphorus'] && (
                                            <>
                                                <circle cx="340" cy="450" r="35" fill="#9370DB" opacity="0.5" stroke="#663399" strokeWidth="2" strokeDasharray="5,5" />
                                                <text x="323" y="455" fontSize="9" fill="#4B0082">P Impact</text>
                                            </>
                                        )}

                                        {/* Cork markers */}
                                        <g transform="translate(280, 470)">
                                            <circle r="5" fill="#E63946" stroke="white" strokeWidth="2"/>
                                            <text x="10" y="5" fontSize="11" fill="#1a1a1a" fontWeight="600">Cork</text>
                                        </g>

                                        {/* Site markers for Cork sites */}
                                        <g transform="translate(260, 440)">
                                            <circle r="4" fill="#0077BE" stroke="white" strokeWidth="1.5"/>
                                            <text x="8" y="4" fontSize="9" fill="#1a1a1a">Clonakilty Bay</text>
                                        </g>

                                        <g transform="translate(300, 450)">
                                            <circle r="4" fill="#0077BE" stroke="white" strokeWidth="1.5"/>
                                            <text x="8" y="4" fontSize="9" fill="#1a1a1a">Rossbehy</text>
                                        </g>
                                    </svg>
                                </div>

                                {/* Map controls */}
                                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
                                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                                        <Lucide.Plus className="w-5 h-5" />
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                                        <Lucide.Minus className="w-5 h-5" />
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                                        <Lucide.Home className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Legend */}
                                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs">
                                    <div className="font-semibold mb-2">Active Layers</div>
                                    {visibleLayers.length === 0 ? (
                                        <div className="text-gray-500 italic">No layers visible</div>
                                    ) : (
                                        <div className="space-y-1">
                                            {layerVisibility['Natural Heritage Areas'] && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 h-4 bg-green-400 border border-green-600 rounded-sm"></div>
                                                    <span>NHA</span>
                                                </div>
                                            )}
                                            {layerVisibility['Special Area of Conservation'] && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 h-4 bg-yellow-400 border-2 border-yellow-600 rounded-sm"></div>
                                                    <span>SAC</span>
                                                </div>
                                            )}
                                            {layerVisibility['Special Areas of Protection'] && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 h-4 bg-red-400 border-2 border-red-700 rounded-sm"></div>
                                                    <span>SPA</span>
                                                </div>
                                            )}
                                            {layerVisibility['Pollution Impact Potential for Nitrogen'] && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 h-4 bg-orange-400 border border-dashed border-orange-600 rounded-full"></div>
                                                    <span>N Impact</span>
                                                </div>
                                            )}
                                            {layerVisibility['Pollution Impact Potential for Phosphorus'] && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 h-4 bg-purple-400 border border-dashed border-purple-600 rounded-full"></div>
                                                    <span>P Impact</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Scale bar */}
                                <div className="absolute bottom-4 right-4 bg-white rounded px-3 py-1 shadow-lg text-xs">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-16 h-1 bg-gray-800 border-t-2 border-b-2 border-l-2 border-r-2 border-gray-800"></div>
                                        <span className="font-medium">50 km</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

const DataMineView: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [boundaryFile, setBoundaryFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setBoundaryFile(event.target.files[0]);
        }
    };

    const handleDataMine = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setShowResults(false);
        setTimeout(() => {
            setIsLoading(false);
            setShowResults(true);
        }, 2500); // Simulate API call
    };
    
    const TagInput: React.FC<{ placeholder: string }> = ({ placeholder }) => {
        const [tags, setTags] = useState<string[]>([]);
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== 'Enter') return;
            const value = e.currentTarget.value;
            if (!value.trim()) return;
            setTags([...tags, value]);
            e.currentTarget.value = '';
            e.preventDefault();
        };
        const removeTag = (index: number) => {
            setTags(tags.filter((_, i) => i !== index));
        };
        return (
            <div className="w-full p-2 border border-gray-300 rounded-md flex flex-wrap items-center gap-2 bg-white">
                {tags.map((tag, index) => (
                    <div key={index} className="bg-accent text-white text-sm px-2 py-1 rounded-md flex items-center">
                        {tag}
                        <button onClick={() => removeTag(index)} className="ml-2 text-white hover:bg-orange-600 rounded-full w-4 h-4 flex items-center justify-center">&times;</button>
                    </div>
                ))}
                <input onKeyDown={handleKeyDown} type="text" placeholder={placeholder} className="flex-grow bg-transparent focus:outline-none" />
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="p-4 md:p-8 flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
                <div className="loading-spinner"></div>
                <p className="mt-4 text-gray-600">Data mining in progress...</p>
                <p className="text-sm text-gray-500">This may take a moment.</p>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="p-4 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-secondary">Data Mine Results</h2>
                        <p className="text-gray-500 mt-1">For: Clonakilty Bay SAC (000091)</p>
                    </div>
                    <button onClick={() => setShowResults(false)} className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500">
                        Start New Search
                    </button>
                </div>
                <div className="space-y-6">
                    {/* Results Cards */}
                    <div className="bg-surface p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg text-secondary flex items-center"><Lucide.Sparkles className="w-5 h-5 mr-2 text-accent"/>Generated Summary</h3>
                        <p className="mt-2 text-sm text-gray-600">Clonakilty Bay SAC is primarily designated for its estuarine and dune habitats. Recent NPWS reports (2022) indicate the Fixed Dune habitat [2130] is in "Unfavourable" condition due to scrub encroachment and insufficient bare ground. Water quality data from the EPA shows moderate nutrient levels in the estuary, a known pressure on saltmarsh habitats.</p>
                    </div>
                    <div className="bg-surface p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg text-secondary flex items-center"><Lucide.FileText className="w-5 h-5 mr-2 text-accent"/>Key Documents Found</h3>
                        <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
                           <li>NPWS (2022) - Site-Specific Conservation Objectives for Clonakilty Bay SAC [000091] - <a href="#" className="text-accent">Download</a></li>
                           <li>EPA (2023) - Water Quality Report: Clonakilty Bay Transitional Waterbody - <a href="#" className="text-accent">Link</a></li>
                           <li>Cork County Council (2021) - Inchydoney Beach Management Plan - <a href="#" className="text-accent">Download</a></li>
                        </ul>
                    </div>
                     <div className="bg-surface p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg text-secondary flex items-center"><Lucide.AlertTriangle className="w-5 h-5 mr-2 text-accent"/>Identified Pressures & Threats</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Scrub Encroachment</span>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Recreational Pressure</span>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Nutrient Loading</span>
                        </div>
                    </div>
                    <div className="bg-surface p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg text-secondary flex items-center"><Lucide.SearchX className="w-5 h-5 mr-2 text-accent"/>Data Gap Analysis</h3>
                        <p className="mt-2 text-sm text-gray-600">No recent (post-2020) dedicated surveys for wintering birds within the SPA section were found. Data on the impact of recreational trampling on dune vegetation is qualitative and lacks quantitative metrics.</p>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-secondary">Data Mine</h2>
            <p className="text-gray-500 mt-1">Provide a "digital fingerprint" of the site to find relevant data.</p>
            
            <form onSubmit={handleDataMine} className="mt-6 bg-surface p-6 md:p-8 rounded-lg shadow-md">
                {/* Tier 1 */}
                <div className="border-b pb-6 mb-6">
                    <h3 className="text-lg font-semibold text-secondary mb-4">Tier 1: Foundational Site Identifiers (The "Where")</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Boundary File (Best)</label>
                            <div className="mt-1 flex items-center space-x-2">
                                <label className="cursor-pointer bg-white border border-gray-300 rounded-md p-2 flex items-center justify-center w-full">
                                    <Lucide.UploadCloud className="w-5 h-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">{boundaryFile ? boundaryFile.name : 'Upload GeoJSON, KML, SHP'}</span>
                                    <input type="file" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">OR Site Code</label>
                            <input type="text" placeholder="e.g., 000091" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">OR Central Coordinate</label>
                            <input type="text" placeholder="e.g., 51.605, -8.874" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Site Name(s) & Alias</label>
                            <input type="text" placeholder="e.g., Clonakilty Bay SAC, Inchydoney" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                        </div>
                    </div>
                </div>

                {/* Tier 2 */}
                <div className="border-b pb-6 mb-6">
                     <h3 className="text-lg font-semibold text-secondary mb-4">Tier 2: Ecological & Statutory Context (The "What")</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">Statutory Designations</label>
                            <div className="space-y-2">
                                {["Special Area of Conservation (SAC)", "Special Protection Area (SPA)", "Natural Heritage Area (NHA)"].map(item => (
                                    <label key={item} className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" /> <span className="ml-2 text-sm">{item}</span></label>
                                ))}
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Known Qualifying Interests (Tags)</label>
                             <TagInput placeholder="Add habitat or species..." />
                        </div>
                     </div>
                </div>

                {/* Tier 3 & 4 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
                    <div className="border-b lg:border-b-0 lg:border-r lg:pr-6 pb-6 mb-6">
                         <h3 className="text-lg font-semibold text-secondary mb-4">Tier 3: Thematic Search (The "Specifics")</h3>
                         <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Key Data Topics</label>
                                <div className="space-y-2">
                                    {["Condition / Status", "Pressures / Threats", "Conservation / Management", "Hydrology / Water Quality"].map(item => (
                                        <label key={item} className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" /> <span className="ml-2 text-sm">{item}</span></label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords for Pressures (Tags)</label>
                                <TagInput placeholder="Add pressure keywords..." />
                            </div>
                         </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-secondary mb-4">Tier 4: Filters (The "Quality Control")</h3>
                         <div className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Source Prioritisation</label>
                                <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                                    <option>Statutory Bodies (NPWS, EPA...)</option>
                                    <option>Academic</option>
                                    <option>Grey Literature (NGOs, etc)</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
                                <div className="flex items-center space-x-2">
                                    <input type="date" className="w-full p-2 border border-gray-300 rounded-md bg-white"/>
                                    <span>to</span>
                                    <input type="date" className="w-full p-2 border border-gray-300 rounded-md bg-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 border-t pt-6 flex justify-end">
                    <button type="submit" className="bg-accent text-white py-2 px-6 rounded-md hover:bg-orange-500 flex items-center space-x-2">
                        <Lucide.Search className="w-5 h-5"/>
                        <span>Run Data Mine</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

const VisualisationView: React.FC = () => {
    const [currentStep, setCurrentStep] = useState('basic');

    const navItems = [
        { id: 'basic', name: 'Basic Information', icon: 'Edit' },
        { id: 'impacts', name: 'Impacts', icon: 'Speaker' },
        { id: 'metrics', name: 'Metrics', icon: 'BarChart3' },
        { id: 'habitats', name: 'Habitats', icon: 'Leaf' },
        { id: 'sites', name: 'Sites', icon: 'Map' },
        { id: 'funding', name: 'Funding', icon: 'Landmark' },
        { id: 'badges', name: 'Badges', icon: 'Award' },
        { id: 'finish', name: 'Finish', icon: 'CheckCircle' }
    ];

    const renderStepContent = () => {
        const item = navItems.find(i => i.id === currentStep);
        switch (currentStep) {
            case 'basic':
                return (
                    <div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <div className="bg-gray-200 p-1 rounded-sm">
                                       <Lucide.Trees className="w-5 h-5 text-gray-600" />
                                    </div>
                                </div>
                                <input type="text" placeholder="Enter project name" className="w-full p-3 pl-12 border border-gray-300 rounded-md bg-white"/>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <select className="w-full p-3 border border-gray-300 rounded-md bg-white">
                                <option>Ireland</option>
                                <option>United Kingdom</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea rows={4} placeholder="Project description..." className="w-full p-3 border border-gray-300 rounded-md bg-white"></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <div className="relative">
                                     <input type="text" placeholder="dd/mm/yyyy" className="w-full p-3 border border-gray-300 rounded-md bg-white"/>
                                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                         <Lucide.Calendar className="w-5 h-5 text-gray-400" />
                                     </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <div className="relative">
                                    <input type="text" placeholder="dd/mm/yyyy" className="w-full p-3 border border-gray-300 rounded-md bg-white"/>
                                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                         <Lucide.Calendar className="w-5 h-5 text-gray-400" />
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Phase</label>
                            <input type="text" placeholder="e.g., Planning" className="w-full p-3 border border-gray-300 rounded-md bg-white"/>
                        </div>
                    </div>
                );
            case 'finish':
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-secondary mb-4">Project Visualisation Ready</h3>
                        <p className="text-gray-600 mb-4">Your project visualisation is now configured. You can view it at the public link below or by clicking the button.</p>
                        <div className="bg-gray-100 p-4 rounded-md mb-4">
                            <a href="https://app.dulra.io/map/fe98c2fd-7371-4af1-a598-50eb9482fc9b" target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline break-all">
                                https://app.dulra.io/map/fe98c2fd-7371-4af1-a598-50eb9482fc9b
                            </a>
                        </div>
                        <a href="https://app.dulra.io/map/fe98c2fd-7371-4af1-a598-50eb9482fc9b" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-secondary text-white py-2 px-4 rounded-md hover:bg-gray-700">
                           <Lucide.ExternalLink className="w-4 h-4" />
                           <span>Show Visualisation</span>
                        </a>
                    </div>
                );
            case 'impacts':
            case 'metrics':
            case 'habitats':
            case 'sites':
            case 'funding':
            case 'badges':
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-secondary">{item?.name}</h3>
                        <p className="mt-2 text-gray-500">Configuration options for this section will be available here.</p>
                    </div>
                );
            default: // Should not be reached but good practice
                 return (
                    <div>
                        <h3 className="text-2xl font-bold text-secondary">Unknown Step</h3>
                        <p className="mt-2 text-gray-500">Please select a valid configuration step.</p>
                    </div>
                );
        }
    };
    
    const currentStepIndex = navItems.findIndex(item => item.id === currentStep);
    const nextStepId = currentStepIndex < navItems.length - 1 ? navItems[currentStepIndex + 1].id : null;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-secondary">Configure Project Visualisation</h2>
            <p className="text-gray-500 mt-1">Set up your project's public-facing visualisation page.</p>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Nav */}
                <div className="lg:col-span-1">
                    <nav className="space-y-1">
                        {navItems.map(item => {
                            const Icon = Lucide[item.icon as keyof typeof Lucide] as React.ElementType;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentStep(item.id)}
                                    className={`w-full flex items-center space-x-3 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                                        currentStep === item.id 
                                            ? 'bg-blue-100 text-accent' 
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className={`w-5 h-5 ${currentStep === item.id ? 'text-accent' : 'text-gray-500'}`} />
                                    <span>{item.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Right Content */}
                <div className="lg:col-span-3 bg-surface p-6 md:p-8 rounded-lg shadow-md flex flex-col">
                    <div className="flex-grow">
                        {renderStepContent()}
                    </div>

                    <div className="mt-8 border-t pt-6 flex justify-end items-center space-x-4">
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-800">Cancel</button>
                        {nextStepId ? (
                             <button onClick={() => setCurrentStep(nextStepId)} className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center space-x-2">
                                <span>Next step</span>
                                <Lucide.ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Finish</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export const TeamView: React.FC<{ team: TeamMember[], openThirdPartyModal: () => void }> = ({ team, openThirdPartyModal }) => (
    <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-secondary">Team Management</h2>
            <button onClick={openThirdPartyModal} className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center space-x-2">
                <Lucide.Share2 className="w-5 h-5" />
                <span>Assign to 3rd Party</span>
            </button>
        </div>
        <div className="bg-surface rounded-lg shadow-md">
            <table className="w-full text-left">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 text-sm font-semibold">Name</th>
                        <th className="p-4 text-sm font-semibold">Email</th>
                        <th className="p-4 text-sm font-semibold">Role</th>
                        <th className="p-4 text-sm font-semibold text-center">Assigned Actions</th>
                        <th className="p-4 text-sm font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {team.map((member, index) => (
                        <tr key={index}>
                            <td className="p-4 font-medium">{member.name}</td>
                            <td className="p-4 text-gray-600">{member.email}</td>
                            <td className="p-4"><span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">{member.role}</span></td>
                            <td className="p-4 text-center font-medium text-secondary">{member.actionsCount || 0}</td>
                            <td className="p-4"><button className="text-gray-400 hover:text-accent"><Lucide.MoreHorizontal /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const ReportingView: React.FC<{ projects: Project[], surveys: Survey[] }> = ({ projects, surveys }) => {
    const [chatHistory, setChatHistory] = React.useState<AIChatMessage[]>([
        { sender: 'ai', content: "Welcome! I can help draft a report. Select a project and I'll load its data." }
    ]);
    const [prompt, setPrompt] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [reportContent, setReportContent] = React.useState('');
    const [selectedProjectId, setSelectedProjectId] = React.useState<number | null>(null);

    const handleGenerate = async (initialPrompt: string) => {
        if (!selectedProjectId) {
            setChatHistory(prev => [...prev, { sender: 'ai', content: "Please select a project first." }]);
            return;
        }
        setIsLoading(true);

        const project = projects.find(p => p.id === selectedProjectId);
        const projectSurveys = surveys.filter(s => s.projectId === selectedProjectId);
        if (!project) return;
        
        const userMessage: AIChatMessage = { sender: 'user', content: initialPrompt };
        setChatHistory(prev => [...prev, userMessage]);

        const response = await generateAiReportContent(project, projectSurveys, reportContent, initialPrompt);
        setReportContent(response);
        setChatHistory(prev => [...prev, { sender: 'ai', content: "Here is the updated draft." }]);
        setIsLoading(false);
    };
    
    return (
        <div className="p-0 md:p-8 h-full bg-surface md:bg-background">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-8 h-full">
                {/* Left Panel: Editor */}
                <div className="lg:col-span-3 bg-surface rounded-lg lg:shadow-md flex flex-col h-[calc(100vh-8rem)] lg:h-auto">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h3 className="text-xl font-bold">Generated Report</h3>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 prose max-w-none">
                        {isLoading ? <div className="loading-spinner"></div> : <div dangerouslySetInnerHTML={{ __html: reportContent.replace(/\n/g, '<br/>') }} />}
                    </div>
                </div>
                {/* Right Panel: AI Assistant */}
                <div className="lg:col-span-2 bg-surface rounded-lg lg:shadow-md flex flex-col h-[calc(100vh-8rem)] lg:h-auto">
                    <div className="p-4 border-b"><h3 className="text-xl font-bold">AI Reporting Assistant</h3></div>
                    <div className="p-6 overflow-y-auto flex-1 space-y-4">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`p-3 rounded-lg text-sm ${msg.sender === 'ai' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200'}`}>{msg.content}</div>
                        ))}
                    </div>
                    <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                        <div className="space-y-4">
                            <select onChange={(e) => setSelectedProjectId(Number(e.target.value))} className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option>Select a Project...</option>
                                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                            <button onClick={() => handleGenerate('Generate a draft report from all available data.')} disabled={isLoading} className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center justify-center space-x-2 disabled:bg-orange-300">
                                <Lucide.Sparkles className="w-5 h-5" />
                                <span>Generate Draft Report</span>
                            </button>
                             <div className="relative">
                                <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Ask for refinements..." className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm bg-white"/>
                                <button onClick={() => handleGenerate(prompt)} disabled={isLoading} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-accent disabled:text-gray-300">
                                    <Lucide.Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ToolsViewProps {
  viewState: ViewState;
  setView: (view: ViewState) => void;
  projects: Project[];
  surveys: Survey[];
}

const ToolsView: React.FC<ToolsViewProps> = (props) => {
  const { viewState, projects, surveys } = props;

  switch(viewState.view) {
    case ViewType.GisMapping: return <GisMappingView />;
    case ViewType.DataMine: return <DataMineView />;
    case ViewType.Reporting: return <ReportingView projects={projects} surveys={surveys}/>;
    case ViewType.Visualisation: return <VisualisationView />;
    default: return <div>Select a tool from the sidebar.</div>;
  }
};

export default ToolsView;
