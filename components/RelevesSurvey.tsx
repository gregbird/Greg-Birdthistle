import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';

interface Species {
    id: string;
    scientificName: string;
    coverAbundance: string;
    layer: string;
    notes: string;
}

interface Releve {
    id: string;
    // Site Information
    plotNumber: string;
    surveyDate: string;
    surveyor: string;
    locality: string;
    county: string;

    // Location Data
    latitude: string;
    longitude: string;
    altitude: string;
    gridReference: string;

    // Plot Characteristics
    plotSize: string;
    shape: string;
    slope: string;
    aspect: string;

    // Substrate & Environment
    soilType: string;
    soilDepth: string;
    soilMoisture: string;
    soilPh: string;
    rockExposure: string;

    // Vegetation Structure
    totalVegetationCover: string;
    treeLayerHeight: string;
    treeLayerCover: string;
    shrubLayerHeight: string;
    shrubLayerCover: string;
    herbLayerHeight: string;
    herbLayerCover: string;
    mossLayerCover: string;

    // Habitat Information
    habitatType: string;
    fossilCode: string;
    annexIHabitat: string;

    // Management & Impacts
    landUse: string;
    grazingIntensity: string;
    disturbance: string;
    threats: string;

    // Species List
    species: Species[];

    // Additional Notes
    generalNotes: string;
    photoReferences: string;

    // Metadata
    createdAt: string;
    updatedAt: string;
    syncStatus: 'saved' | 'pending' | 'synced';
}

interface RelevesSurveyProps {
    showToast?: (message: string, type?: 'success' | 'error') => void;
}

const RelevesSurvey: React.FC<RelevesSurveyProps> = ({ showToast }) => {
    const [releves, setReleves] = useState<Releve[]>([]);
    const [currentReleve, setCurrentReleve] = useState<Releve | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'edit'>('list');
    const [activeTab, setActiveTab] = useState<'site' | 'plot' | 'environment' | 'vegetation' | 'species' | 'notes'>('site');
    const [searchTerm, setSearchTerm] = useState('');
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // Load releves from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('dulra_releves');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setReleves(parsed);
            } catch (e) {
                console.error('Error loading releves:', e);
            }
        }

        // Monitor online/offline status
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Save releves to localStorage whenever they change
    useEffect(() => {
        if (releves.length > 0) {
            localStorage.setItem('dulra_releves', JSON.stringify(releves));
        }
    }, [releves]);

    const createNewReleve = () => {
        const newReleve: Releve = {
            id: `releve_${Date.now()}`,
            plotNumber: '',
            surveyDate: new Date().toISOString().split('T')[0],
            surveyor: '',
            locality: '',
            county: '',
            latitude: '',
            longitude: '',
            altitude: '',
            gridReference: '',
            plotSize: '4x4m',
            shape: 'Square',
            slope: '',
            aspect: '',
            soilType: '',
            soilDepth: '',
            soilMoisture: '',
            soilPh: '',
            rockExposure: '',
            totalVegetationCover: '',
            treeLayerHeight: '',
            treeLayerCover: '',
            shrubLayerHeight: '',
            shrubLayerCover: '',
            herbLayerHeight: '',
            herbLayerCover: '',
            mossLayerCover: '',
            habitatType: '',
            fossilCode: '',
            annexIHabitat: '',
            landUse: '',
            grazingIntensity: '',
            disturbance: '',
            threats: '',
            species: [],
            generalNotes: '',
            photoReferences: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            syncStatus: 'saved'
        };
        setCurrentReleve(newReleve);
        setViewMode('edit');
        setActiveTab('site');
    };

    const saveReleve = () => {
        if (!currentReleve) return;

        const updatedReleve = {
            ...currentReleve,
            updatedAt: new Date().toISOString(),
            syncStatus: 'saved' as const
        };

        const existingIndex = releves.findIndex(r => r.id === currentReleve.id);
        if (existingIndex >= 0) {
            const updated = [...releves];
            updated[existingIndex] = updatedReleve;
            setReleves(updated);
            showToast?.('Relevé updated successfully (saved offline)', 'success');
        } else {
            setReleves([...releves, updatedReleve]);
            showToast?.('Relevé saved successfully (saved offline)', 'success');
        }

        setViewMode('list');
        setCurrentReleve(null);
    };

    const deleteReleve = (id: string) => {
        if (window.confirm('Are you sure you want to delete this relevé?')) {
            setReleves(releves.filter(r => r.id !== id));
            showToast?.('Relevé deleted', 'success');
        }
    };

    const editReleve = (releve: Releve) => {
        setCurrentReleve({ ...releve });
        setViewMode('edit');
        setActiveTab('site');
    };

    const duplicateReleve = (releve: Releve) => {
        const duplicate: Releve = {
            ...releve,
            id: `releve_${Date.now()}`,
            plotNumber: `${releve.plotNumber}_copy`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            syncStatus: 'saved'
        };
        setCurrentReleve(duplicate);
        setViewMode('edit');
        showToast?.('Relevé duplicated - edit and save', 'success');
    };

    const addSpecies = () => {
        if (!currentReleve) return;
        const newSpecies: Species = {
            id: `species_${Date.now()}`,
            scientificName: '',
            coverAbundance: '',
            layer: 'Herb',
            notes: ''
        };
        setCurrentReleve({
            ...currentReleve,
            species: [...currentReleve.species, newSpecies]
        });
    };

    const updateSpecies = (id: string, field: keyof Species, value: string) => {
        if (!currentReleve) return;
        setCurrentReleve({
            ...currentReleve,
            species: currentReleve.species.map(s =>
                s.id === id ? { ...s, [field]: value } : s
            )
        });
    };

    const removeSpecies = (id: string) => {
        if (!currentReleve) return;
        setCurrentReleve({
            ...currentReleve,
            species: currentReleve.species.filter(s => s.id !== id)
        });
    };

    const updateField = (field: keyof Releve, value: any) => {
        if (!currentReleve) return;
        setCurrentReleve({
            ...currentReleve,
            [field]: value
        });
    };

    const exportToCSV = () => {
        if (releves.length === 0) {
            showToast?.('No relevés to export', 'error');
            return;
        }

        // Create CSV header
        const headers = [
            'Plot Number', 'Date', 'Surveyor', 'Locality', 'County',
            'Latitude', 'Longitude', 'Altitude', 'Grid Ref',
            'Plot Size', 'Slope', 'Aspect',
            'Soil Type', 'Soil Moisture', 'pH',
            'Total Veg Cover', 'Tree Cover', 'Shrub Cover', 'Herb Cover',
            'Habitat Type', 'FOSSIT', 'Annex I',
            'Land Use', 'Grazing', 'Threats',
            'Species Count', 'Notes'
        ];

        const rows = releves.map(r => [
            r.plotNumber, r.surveyDate, r.surveyor, r.locality, r.county,
            r.latitude, r.longitude, r.altitude, r.gridReference,
            r.plotSize, r.slope, r.aspect,
            r.soilType, r.soilMoisture, r.soilPh,
            r.totalVegetationCover, r.treeLayerCover, r.shrubLayerCover, r.herbLayerCover,
            r.habitatType, r.fossilCode, r.annexIHabitat,
            r.landUse, r.grazingIntensity, r.threats,
            r.species.length, r.generalNotes
        ]);

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `releves_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        showToast?.('Relevés exported to CSV', 'success');
    };

    const filteredReleves = releves.filter(r =>
        r.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.habitatType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderTabContent = () => {
        if (!currentReleve) return null;

        switch (activeTab) {
            case 'site':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plot Number *</label>
                                <input
                                    type="text"
                                    value={currentReleve.plotNumber}
                                    onChange={(e) => updateField('plotNumber', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., R001"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Survey Date *</label>
                                <input
                                    type="date"
                                    value={currentReleve.surveyDate}
                                    onChange={(e) => updateField('surveyDate', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Surveyor *</label>
                                <input
                                    type="text"
                                    value={currentReleve.surveyor}
                                    onChange={(e) => updateField('surveyor', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                                <input
                                    type="text"
                                    value={currentReleve.county}
                                    onChange={(e) => updateField('county', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Kerry"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Locality *</label>
                                <input
                                    type="text"
                                    value={currentReleve.locality}
                                    onChange={(e) => updateField('locality', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Rossbehy Dunes, Castlemaine Harbour"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'plot':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-secondary">Location Coordinates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude (Decimal)</label>
                                <input
                                    type="text"
                                    value={currentReleve.latitude}
                                    onChange={(e) => updateField('latitude', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="52.1234"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude (Decimal)</label>
                                <input
                                    type="text"
                                    value={currentReleve.longitude}
                                    onChange={(e) => updateField('longitude', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="-9.5678"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Altitude (m)</label>
                                <input
                                    type="text"
                                    value={currentReleve.altitude}
                                    onChange={(e) => updateField('altitude', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="15"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Grid Reference</label>
                                <input
                                    type="text"
                                    value={currentReleve.gridReference}
                                    onChange={(e) => updateField('gridReference', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="ITM E123456, N234567"
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-secondary mt-6">Plot Characteristics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plot Size</label>
                                <select
                                    value={currentReleve.plotSize}
                                    onChange={(e) => updateField('plotSize', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option>2x2m</option>
                                    <option>4x4m</option>
                                    <option>5x5m</option>
                                    <option>10x10m</option>
                                    <option>20x20m</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
                                <select
                                    value={currentReleve.shape}
                                    onChange={(e) => updateField('shape', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option>Square</option>
                                    <option>Rectangle</option>
                                    <option>Circle</option>
                                    <option>Irregular</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slope (degrees)</label>
                                <input
                                    type="text"
                                    value={currentReleve.slope}
                                    onChange={(e) => updateField('slope', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="0-90"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Aspect</label>
                                <select
                                    value={currentReleve.aspect}
                                    onChange={(e) => updateField('aspect', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option value="">Select...</option>
                                    <option>N</option>
                                    <option>NE</option>
                                    <option>E</option>
                                    <option>SE</option>
                                    <option>S</option>
                                    <option>SW</option>
                                    <option>W</option>
                                    <option>NW</option>
                                    <option>Flat</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 'environment':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-secondary">Substrate Characteristics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                                <select
                                    value={currentReleve.soilType}
                                    onChange={(e) => updateField('soilType', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option value="">Select...</option>
                                    <option>Sand</option>
                                    <option>Sandy loam</option>
                                    <option>Loam</option>
                                    <option>Clay loam</option>
                                    <option>Clay</option>
                                    <option>Peat</option>
                                    <option>Rocky</option>
                                    <option>Gravel</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Depth (cm)</label>
                                <input
                                    type="text"
                                    value={currentReleve.soilDepth}
                                    onChange={(e) => updateField('soilDepth', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., 30"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Moisture</label>
                                <select
                                    value={currentReleve.soilMoisture}
                                    onChange={(e) => updateField('soilMoisture', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option value="">Select...</option>
                                    <option>Dry</option>
                                    <option>Moist</option>
                                    <option>Wet</option>
                                    <option>Waterlogged</option>
                                    <option>Inundated</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Soil pH</label>
                                <input
                                    type="text"
                                    value={currentReleve.soilPh}
                                    onChange={(e) => updateField('soilPh', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="4.0-8.0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rock Exposure (%)</label>
                                <input
                                    type="text"
                                    value={currentReleve.rockExposure}
                                    onChange={(e) => updateField('rockExposure', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="0-100"
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-secondary mt-6">Habitat Classification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Habitat Type</label>
                                <input
                                    type="text"
                                    value={currentReleve.habitatType}
                                    onChange={(e) => updateField('habitatType', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Dry-humid acid grassland"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">FOSSIT Code</label>
                                <input
                                    type="text"
                                    value={currentReleve.fossilCode}
                                    onChange={(e) => updateField('fossilCode', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., GS3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Annex I Habitat Code</label>
                                <input
                                    type="text"
                                    value={currentReleve.annexIHabitat}
                                    onChange={(e) => updateField('annexIHabitat', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., 2130"
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-secondary mt-6">Management & Impacts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Land Use</label>
                                <select
                                    value={currentReleve.landUse}
                                    onChange={(e) => updateField('landUse', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option value="">Select...</option>
                                    <option>Grazing</option>
                                    <option>Mowing</option>
                                    <option>Abandoned</option>
                                    <option>Recreation</option>
                                    <option>Conservation</option>
                                    <option>Agriculture</option>
                                    <option>Forestry</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Grazing Intensity</label>
                                <select
                                    value={currentReleve.grazingIntensity}
                                    onChange={(e) => updateField('grazingIntensity', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option value="">Select...</option>
                                    <option>None</option>
                                    <option>Light</option>
                                    <option>Moderate</option>
                                    <option>Heavy</option>
                                    <option>Severe</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Disturbance/Damage</label>
                                <input
                                    type="text"
                                    value={currentReleve.disturbance}
                                    onChange={(e) => updateField('disturbance', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Trampling, erosion, vehicle tracks"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Threats/Pressures</label>
                                <textarea
                                    value={currentReleve.threats}
                                    onChange={(e) => updateField('threats', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows={2}
                                    placeholder="e.g., Recreational pressure, invasive species"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'vegetation':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-secondary">Overall Vegetation Cover</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Vegetation Cover (%)</label>
                                <input
                                    type="text"
                                    value={currentReleve.totalVegetationCover}
                                    onChange={(e) => updateField('totalVegetationCover', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="0-100"
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-secondary mt-6">Vegetation Layers</h3>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 mb-3">Tree Layer (T1)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
                                    <input
                                        type="text"
                                        value={currentReleve.treeLayerHeight}
                                        onChange={(e) => updateField('treeLayerHeight', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                        placeholder="e.g., 8-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover (%)</label>
                                    <input
                                        type="text"
                                        value={currentReleve.treeLayerCover}
                                        onChange={(e) => updateField('treeLayerCover', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                        placeholder="0-100"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 mb-3">Shrub Layer (T2)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
                                    <input
                                        type="text"
                                        value={currentReleve.shrubLayerHeight}
                                        onChange={(e) => updateField('shrubLayerHeight', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                        placeholder="e.g., 1-3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover (%)</label>
                                    <input
                                        type="text"
                                        value={currentReleve.shrubLayerCover}
                                        onChange={(e) => updateField('shrubLayerCover', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                        placeholder="0-100"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 mb-3">Herb Layer (T3)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                                    <input
                                        type="text"
                                        value={currentReleve.herbLayerHeight}
                                        onChange={(e) => updateField('herbLayerHeight', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                        placeholder="e.g., 10-40"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover (%)</label>
                                    <input
                                        type="text"
                                        value={currentReleve.herbLayerCover}
                                        onChange={(e) => updateField('herbLayerCover', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                        placeholder="0-100"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 mb-3">Moss/Lichen Layer (T4)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover (%)</label>
                                    <input
                                        type="text"
                                        value={currentReleve.mossLayerCover}
                                        onChange={(e) => updateField('mossLayerCover', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                        placeholder="0-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'species':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-secondary">Species List</h3>
                            <button
                                onClick={addSpecies}
                                className="bg-accent text-white px-4 py-2 rounded-md hover:bg-orange-500 flex items-center space-x-2"
                            >
                                <Lucide.Plus className="w-4 h-4" />
                                <span>Add Species</span>
                            </button>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                            <p className="text-sm text-blue-700">
                                <strong>Cover-Abundance Scale (Braun-Blanquet):</strong><br />
                                r = rare, + = &lt;1%, 1 = 1-5%, 2 = 6-25%, 3 = 26-50%, 4 = 51-75%, 5 = 76-100%
                            </p>
                        </div>

                        {currentReleve.species.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Lucide.Leaf className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                <p>No species recorded yet</p>
                                <p className="text-sm">Click "Add Species" to start recording</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {currentReleve.species.map((species, index) => (
                                    <div key={species.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="text-sm font-medium text-gray-500">Species #{index + 1}</span>
                                            <button
                                                onClick={() => removeSpecies(species.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Lucide.Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Scientific Name *</label>
                                                <input
                                                    type="text"
                                                    value={species.scientificName}
                                                    onChange={(e) => updateSpecies(species.id, 'scientificName', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                    placeholder="e.g., Festuca rubra"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover-Abundance</label>
                                                <select
                                                    value={species.coverAbundance}
                                                    onChange={(e) => updateSpecies(species.id, 'coverAbundance', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="r">r (rare)</option>
                                                    <option value="+">+ (&lt;1%)</option>
                                                    <option value="1">1 (1-5%)</option>
                                                    <option value="2">2 (6-25%)</option>
                                                    <option value="3">3 (26-50%)</option>
                                                    <option value="4">4 (51-75%)</option>
                                                    <option value="5">5 (76-100%)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Layer</label>
                                                <select
                                                    value={species.layer}
                                                    onChange={(e) => updateSpecies(species.id, 'layer', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                                >
                                                    <option>Tree</option>
                                                    <option>Shrub</option>
                                                    <option>Herb</option>
                                                    <option>Moss</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                                <input
                                                    type="text"
                                                    value={species.notes}
                                                    onChange={(e) => updateSpecies(species.id, 'notes', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                    placeholder="e.g., Flowering, stunted growth"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'notes':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">General Notes</label>
                            <textarea
                                value={currentReleve.generalNotes}
                                onChange={(e) => updateField('generalNotes', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                rows={6}
                                placeholder="Additional observations, unusual features, context information..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Photo References</label>
                            <textarea
                                value={currentReleve.photoReferences}
                                onChange={(e) => updateField('photoReferences', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                rows={3}
                                placeholder="Photo file names or numbers, e.g., IMG_1234.jpg, IMG_1235.jpg"
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (viewMode === 'list') {
        return (
            <div className="p-6 bg-background min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-surface rounded-lg shadow-md p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-3xl font-bold text-secondary flex items-center">
                                    <Lucide.Leaf className="w-8 h-8 mr-3 text-accent" />
                                    Relevés Survey
                                </h2>
                                <p className="text-gray-600 mt-1">Phytosociological vegetation sampling</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${isOnline ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {isOnline ? (
                                        <><Lucide.Wifi className="w-4 h-4 inline mr-1" />Online</>
                                    ) : (
                                        <><Lucide.WifiOff className="w-4 h-4 inline mr-1" />Offline</>
                                    )}
                                </div>
                                <button
                                    onClick={exportToCSV}
                                    disabled={releves.length === 0}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    <Lucide.Download className="w-4 h-4" />
                                    <span>Export CSV</span>
                                </button>
                                <button
                                    onClick={createNewReleve}
                                    className="bg-accent text-white px-6 py-2 rounded-md hover:bg-orange-500 flex items-center space-x-2"
                                >
                                    <Lucide.Plus className="w-5 h-5" />
                                    <span>New Relevé</span>
                                </button>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Lucide.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by plot number, locality, or habitat..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-surface rounded-lg shadow-md p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Relevés</p>
                                    <p className="text-3xl font-bold text-secondary">{releves.length}</p>
                                </div>
                                <Lucide.FileText className="w-10 h-10 text-accent" />
                            </div>
                        </div>
                        <div className="bg-surface rounded-lg shadow-md p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Species</p>
                                    <p className="text-3xl font-bold text-secondary">
                                        {releves.reduce((sum, r) => sum + r.species.length, 0)}
                                    </p>
                                </div>
                                <Lucide.Sprout className="w-10 h-10 text-green-600" />
                            </div>
                        </div>
                        <div className="bg-surface rounded-lg shadow-md p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Unique Habitats</p>
                                    <p className="text-3xl font-bold text-secondary">
                                        {new Set(releves.map(r => r.habitatType).filter(Boolean)).size}
                                    </p>
                                </div>
                                <Lucide.Map className="w-10 h-10 text-blue-600" />
                            </div>
                        </div>
                        <div className="bg-surface rounded-lg shadow-md p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Offline Saved</p>
                                    <p className="text-3xl font-bold text-secondary">
                                        {releves.filter(r => r.syncStatus === 'saved').length}
                                    </p>
                                </div>
                                <Lucide.Save className="w-10 h-10 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    {/* Relevés List */}
                    <div className="bg-surface rounded-lg shadow-md overflow-hidden">
                        {filteredReleves.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <Lucide.Leaf className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-lg font-medium">No relevés recorded yet</p>
                                <p className="text-sm mt-2">Click "New Relevé" to start your first vegetation survey</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plot</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Locality</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Habitat</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Species</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredReleves.map(releve => (
                                            <tr key={releve.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{releve.plotNumber}</div>
                                                    <div className="text-xs text-gray-500">{releve.surveyor}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {releve.surveyDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{releve.locality}</div>
                                                    <div className="text-xs text-gray-500">{releve.county}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{releve.habitatType || '-'}</div>
                                                    {releve.fossilCode && (
                                                        <div className="text-xs text-gray-500">FOSSIT: {releve.fossilCode}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        {releve.species.length}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                                        releve.syncStatus === 'synced' ? 'bg-green-100 text-green-800' :
                                                        releve.syncStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        <Lucide.Save className="w-3 h-3 mr-1" />
                                                        {releve.syncStatus === 'saved' ? 'Offline' : releve.syncStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => editReleve(releve)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="Edit"
                                                    >
                                                        <Lucide.Edit2 className="w-4 h-4 inline" />
                                                    </button>
                                                    <button
                                                        onClick={() => duplicateReleve(releve)}
                                                        className="text-green-600 hover:text-green-800"
                                                        title="Duplicate"
                                                    >
                                                        <Lucide.Copy className="w-4 h-4 inline" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteReleve(releve.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Delete"
                                                    >
                                                        <Lucide.Trash2 className="w-4 h-4 inline" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Edit Mode
    return (
        <div className="p-6 bg-background min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-surface rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-secondary">
                                {currentReleve?.plotNumber || 'New Relevé'}
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                {currentReleve?.createdAt === currentReleve?.updatedAt ? 'Creating new' : 'Editing'} vegetation relevé
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => {
                                    if (window.confirm('Discard changes?')) {
                                        setViewMode('list');
                                        setCurrentReleve(null);
                                    }
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveReleve}
                                disabled={!currentReleve?.plotNumber || !currentReleve?.surveyor}
                                className="bg-accent text-white px-6 py-2 rounded-md hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                            >
                                <Lucide.Save className="w-5 h-5" />
                                <span>Save Relevé</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-surface rounded-lg shadow-md mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px overflow-x-auto">
                            {[
                                { id: 'site', label: 'Site Info', icon: 'MapPin' },
                                { id: 'plot', label: 'Plot & Location', icon: 'Compass' },
                                { id: 'environment', label: 'Environment', icon: 'Mountain' },
                                { id: 'vegetation', label: 'Vegetation Structure', icon: 'Trees' },
                                { id: 'species', label: 'Species List', icon: 'Leaf' },
                                { id: 'notes', label: 'Notes & Photos', icon: 'FileText' }
                            ].map(tab => {
                                const IconComponent = (Lucide as any)[tab.icon];
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                                            activeTab === tab.id
                                                ? 'border-accent text-accent'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {renderTabContent()}
                    </div>
                </div>

                {/* Save Button (bottom) */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => {
                            if (window.confirm('Discard changes?')) {
                                setViewMode('list');
                                setCurrentReleve(null);
                            }
                        }}
                        className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveReleve}
                        disabled={!currentReleve?.plotNumber || !currentReleve?.surveyor}
                        className="bg-accent text-white px-8 py-2 rounded-md hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        <Lucide.Save className="w-5 h-5" />
                        <span>Save Relevé</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RelevesSurvey;
