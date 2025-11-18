
import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import type { Project, TeamMember } from '../types';

// Define interfaces for dynamic form entries
interface HabitatEntry {
    code: string;
    name: string;
    notes: string;
}

interface FaunaEntry {
    species: string;
    number: string;
    evidence: string;
    notes: string;
}

interface FloraEntry {
    species: string;
    dafor: string;
}

interface FieldSurveyViewProps {
    showToast: (message: string, type?: 'success' | 'error') => void;
    projects: Project[];
    teamMembers: TeamMember[];
}

const FieldSurveyView: React.FC<FieldSurveyViewProps> = () => {
    // State for each section with initial values from the screenshot
    const [habitats, setHabitats] = useState<HabitatEntry[]>([{ code: 'e.g., GS2', name: 'e.g., Dry meadows', notes: '' }]);
    const [fauna, setFauna] = useState<FaunaEntry[]>([{ species: 'e.g., Otter', number: '1', evidence: 'e.g., Spraint', notes: '' }]);
    const [flora, setFlora] = useState<FloraEntry[]>([{ species: '', dafor: 'O' }]);

    // Generic handler for array state updates
    const handleArrayChange = <T,>(
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        index: number,
        field: keyof T,
        value: string
    ) => {
        setter(prev => {
            const newArr = [...prev];
            newArr[index] = { ...newArr[index], [field]: value };
            return newArr;
        });
    };

    const addEntry = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, newEntry: T) => {
        setter(prev => [...prev, newEntry]);
    };

    const removeEntry = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };
    
    const DAFOR_OPTIONS = [
        { value: 'D', label: 'Dominant' },
        { value: 'A', label: 'Abundant' },
        { value: 'F', label: 'Frequent' },
        { value: 'O', label: 'Occasional' },
        { value: 'R', label: 'Rare' },
    ];

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-secondary mb-1">Field Survey Editor</h2>
            <p className="text-gray-500 mb-6">Enter and manage field survey data directly into the system.</p>
            <div className="bg-surface p-6 md:p-8 rounded-lg shadow-md space-y-8">
                {/* Survey Details */}
                <div>
                    <h3 className="text-xl font-bold text-secondary border-b pb-2">Survey Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Survey Name</label>
                            <input type="text" defaultValue="Phase 1 Habitat Survey" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" defaultValue="2025-09-23" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Surveyor(s)</label>
                            <input type="text" defaultValue="Dr. Aoife Murphy" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                        </div>
                    </div>
                </div>

                {/* Site Conditions */}
                <div>
                    <h3 className="text-xl font-bold text-secondary border-b pb-2">Site Conditions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <input type="time" defaultValue="10:30" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Temp (°C)</label>
                            <input type="number" defaultValue="14" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Wind</label>
                            <select defaultValue="Light Breeze" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option>Calm</option>
                                <option>Light Breeze</option>
                                <option>Moderate</option>
                                <option>Strong</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cloud Cover</label>
                            <select defaultValue="50%" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option>0%</option>
                                <option>25%</option>
                                <option>50%</option>
                                <option>75%</option>
                                <option>100%</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Precipitation</label>
                             <select defaultValue="None" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option>None</option>
                                <option>Drizzle</option>
                                <option>Rain</option>
                                <option>Heavy Rain</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Habitat Mapping */}
                <div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-xl font-bold text-secondary">Habitat Mapping</h3>
                        <button onClick={() => addEntry(setHabitats, { code: '', name: '', notes: '' })} className="text-sm bg-accent text-white py-1 px-3 rounded-md hover:bg-orange-500 flex items-center space-x-1">
                            <Lucide.Plus className="w-4 h-4" />
                            <span>Add Entry</span>
                        </button>
                    </div>
                    <div className="mt-4 space-y-4">
                        {habitats.map((habitat, index) => (
                            <div key={index} className="p-4 border rounded-md bg-gray-50 relative">
                                <button onClick={() => removeEntry(setHabitats, index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Lucide.XCircle className="w-5 h-5"/></button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Habitat Code</label>
                                        <input type="text" value={habitat.code} onChange={e => handleArrayChange(setHabitats, index, 'code', e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Habitat Name</label>
                                        <input type="text" value={habitat.name} onChange={e => handleArrayChange(setHabitats, index, 'name', e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                                    <textarea value={habitat.notes} onChange={e => handleArrayChange(setHabitats, index, 'notes', e.target.value)} rows={3} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fauna */}
                <div>
                     <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-xl font-bold text-secondary">Fauna</h3>
                        <button onClick={() => addEntry(setFauna, { species: '', number: '', evidence: '', notes: '' })} className="text-sm bg-accent text-white py-1 px-3 rounded-md hover:bg-orange-500 flex items-center space-x-1">
                            <Lucide.Plus className="w-4 h-4" />
                            <span>Add Sighting</span>
                        </button>
                    </div>
                    <div className="mt-4 space-y-4">
                        {fauna.map((sighting, index) => (
                             <div key={index} className="p-4 border rounded-md bg-gray-50 relative">
                                <button onClick={() => removeEntry(setFauna, index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Lucide.XCircle className="w-5 h-5"/></button>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Species</label>
                                        <input type="text" value={sighting.species} onChange={e => handleArrayChange(setFauna, index, 'species', e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Number</label>
                                        <input type="number" value={sighting.number} onChange={e => handleArrayChange(setFauna, index, 'number', e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                                    </div>
                                     <div>
                                        <label className="block text-sm font-medium text-gray-700">Evidence</label>
                                        <input type="text" value={sighting.evidence} onChange={e => handleArrayChange(setFauna, index, 'evidence', e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                                    <textarea value={sighting.notes} onChange={e => handleArrayChange(setFauna, index, 'notes', e.target.value)} rows={3} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"></textarea>
                                </div>
                                 <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Image</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <Lucide.Image className="mx-auto h-12 w-12 text-gray-400"/>
                                            <div className="flex text-sm text-gray-600"><label className="relative cursor-pointer bg-white rounded-md font-medium text-accent hover:text-orange-500 focus-within:outline-none"><span>Upload a file</span><input type="file" className="sr-only"/></label><p className="pl-1">or drag and drop</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Flora */}
                <div>
                     <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-xl font-bold text-secondary">Flora</h3>
                        <button onClick={() => addEntry(setFlora, { species: '', dafor: 'O' })} className="text-sm bg-accent text-white py-1 px-3 rounded-md hover:bg-orange-500 flex items-center space-x-1">
                            <Lucide.Plus className="w-4 h-4" />
                            <span>Add Record</span>
                        </button>
                    </div>
                    <div className="mt-4 space-y-4">
                        {flora.map((record, index) => (
                             <div key={index} className="p-4 border rounded-md bg-gray-50 relative">
                                <button onClick={() => removeEntry(setFlora, index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Lucide.XCircle className="w-5 h-5"/></button>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Species Name</label>
                                        <input type="text" value={record.species} onChange={e => handleArrayChange(setFlora, index, 'species', e.target.value)} placeholder="e.g., Bluebell" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">DAFOR Scale</label>
                                         <select value={record.dafor} onChange={e => handleArrayChange(setFlora, index, 'dafor', e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                            {DAFOR_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Field Notes */}
                <div>
                    <h3 className="text-xl font-bold text-secondary border-b pb-2">Field Notes</h3>
                    <textarea className="w-full mt-4 p-3 border rounded-md focus:ring-accent focus:border-accent bg-white" rows={8} placeholder="Enter general field notes, observations, or constraints..."></textarea>
                </div>
            </div>
        </div>
    );
};

export default FieldSurveyView;
