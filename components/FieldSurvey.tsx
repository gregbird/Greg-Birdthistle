import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import { habitatTemplateLibrary } from '../constants';
import type { Project, TeamMember } from '../types';

interface Field {
    field_id: string;
    field_type: string;
    label: string;
    config: {
        target_value?: string;
        input_type: string;
        options?: string[];
    };
    options: {
        is_required: boolean;
        allow_notes: boolean;
        allow_photos?: boolean;
    };
}

interface Module {
    module_type: 'HabitatAssessment' | 'CustomSection';
    module_title: string;
    module_data?: {
        habitat_code: string;
        habitat_name: string;
        fields: Field[];
    };
}

interface SurveyFormModel {
    survey_title: string;
    linked_site: number | null;
    survey_date: string;
    assigned_surveyors: string[];
    modules: Module[];
}

const initialFormModel: SurveyFormModel = {
    survey_title: `New Survey - ${new Date().toISOString().split('T')[0]}`,
    linked_site: null,
    survey_date: new Date().toISOString().split('T')[0],
    assigned_surveyors: [],
    modules: [],
};

interface FieldSurveyViewProps {
    showToast: (message: string, type?: 'success' | 'error') => void;
    projects: Project[];
    teamMembers: TeamMember[];
}

const FieldSurveyView: React.FC<FieldSurveyViewProps> = ({ showToast, projects, teamMembers }) => {
    const [formModel, setFormModel] = useState<SurveyFormModel>(initialFormModel);
    const [isHabitatModalOpen, setIsHabitatModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    const handleAddHabitatModule = (habitatCode: string) => {
        const template = habitatTemplateLibrary[habitatCode];
        if (template) {
            const newModule: Module = {
                module_type: 'HabitatAssessment',
                module_title: `Assessment: ${template.name}`,
                module_data: {
                    habitat_code: habitatCode,
                    habitat_name: template.name,
                    fields: template.attributes,
                },
            };
            setFormModel(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
        }
        setIsHabitatModalOpen(false);
    };

    const handleDeploy = () => {
        if (!formModel.linked_site || !formModel.survey_title) {
            showToast('Please provide a survey title and link it to a site before deploying.', 'error');
            return;
        }
        showToast('Survey has been deployed to the field!', 'success');
    };
    
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-secondary">Configure Field Survey</h2>
            <p className="text-gray-500 mt-1">Create and structure a new survey form for field deployment.</p>

            {/* Survey Header */}
            <div className="mt-8 bg-surface p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Survey Title</label>
                        <input 
                            type="text" 
                            value={formModel.survey_title}
                            onChange={e => setFormModel(prev => ({...prev, survey_title: e.target.value}))}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Survey Date</label>
                        <input 
                            type="date" 
                            value={formModel.survey_date}
                            onChange={e => setFormModel(prev => ({...prev, survey_date: e.target.value}))}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Linked Site</label>
                        <select 
                            value={formModel.linked_site || ''}
                            onChange={e => setFormModel(prev => ({...prev, linked_site: Number(e.target.value)}))}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white"
                        >
                            <option value="" disabled>Select a site...</option>
                            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Assigned Surveyors</label>
                        <select 
                            multiple 
                            value={formModel.assigned_surveyors}
                            onChange={e => {
                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                setFormModel(prev => ({...prev, assigned_surveyors: selected}));
                            }}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md h-24 bg-white"
                        >
                             {teamMembers.map(t => <option key={t.email} value={t.name}>{t.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Form Builder Canvas */}
            <div className="mt-8 bg-surface p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-secondary mb-4">Survey Form Builder</h3>
                 <div className="space-y-4">
                     {formModel.modules.map((module, index) => (
                         <div key={index} className="border border-gray-200 rounded-lg p-4">
                             <h4 className="font-semibold text-secondary">{module.module_title}</h4>
                             {module.module_data && (
                                <div className="mt-4 space-y-3">
                                    {module.module_data.fields.map(field => (
                                        <div key={field.field_id} className="text-sm p-3 bg-gray-50 rounded-md">
                                            <p className="font-medium">{field.label}</p>
                                            <p className="text-xs text-gray-500">Target: {field.config.target_value || 'N/A'} | Input: {field.config.input_type}</p>
                                        </div>
                                    ))}
                                </div>
                             )}
                         </div>
                     ))}
                 </div>
                 <div className="mt-6 border-t pt-6 flex space-x-2">
                    <button onClick={() => setIsHabitatModalOpen(true)} className="bg-blue-100 text-blue-800 py-2 px-4 rounded-md hover:bg-blue-200 flex items-center space-x-2">
                        <Lucide.PlusCircle className="w-5 h-5"/>
                        <span>Add Assessment Target</span>
                    </button>
                 </div>
            </div>
            
             {/* Page Controls */}
            <div className="mt-8 flex justify-end space-x-3">
                 <button onClick={() => showToast('Draft saved!', 'success')} className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-300">Save Draft</button>
                 <button onClick={() => setIsPreviewModalOpen(true)} className="bg-primary text-secondary py-2 px-6 rounded-md hover:brightness-95">Preview</button>
                 <button onClick={handleDeploy} className="bg-accent text-white py-2 px-6 rounded-md hover:bg-orange-500">Deploy to Field</button>
            </div>

            {/* Modals */}
            {isHabitatModalOpen && <AddHabitatModal onSelect={handleAddHabitatModule} onClose={() => setIsHabitatModalOpen(false)} />}
            {isPreviewModalOpen && <PreviewModal formModel={formModel} projects={projects} onClose={() => setIsPreviewModalOpen(false)} />}
        </div>
    );
};

const AddHabitatModal: React.FC<{onSelect: (code: string) => void; onClose: () => void}> = ({ onSelect, onClose }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-surface p-8 rounded-lg shadow-xl w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Select Habitat to Assess</h3>
            <div className="space-y-2">
                {Object.entries(habitatTemplateLibrary).map(([code, template]) => (
                    <button key={code} onClick={() => onSelect(code)} className="w-full text-left p-3 border rounded-md hover:bg-gray-50">
                        {template.name}
                    </button>
                ))}
            </div>
            <div className="mt-6 text-right">
                <button onClick={onClose} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">Cancel</button>
            </div>
        </div>
    </div>
);

const PreviewModal: React.FC<{formModel: SurveyFormModel, projects: Project[], onClose: () => void}> = ({ formModel, projects, onClose }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-surface p-2 rounded-lg shadow-xl w-full max-w-sm h-[80vh] flex flex-col">
            <div className="text-center p-4 border-b">
                <h3 className="font-bold">Mobile Preview</h3>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-6">
                <div className="text-center mb-4">
                    <h2 className="text-xl font-bold">{formModel.survey_title}</h2>
                    <p className="text-sm text-gray-500">{projects.find(p=>p.id === formModel.linked_site)?.name}</p>
                </div>
                {formModel.modules.map((module, i) => (
                    <div key={i}>
                        <h4 className="font-semibold text-lg mb-2">{module.module_title}</h4>
                        {module.module_data?.fields.map(field => (
                             <div key={field.field_id} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                {field.config.target_value && <p className="text-xs text-gray-500 mb-1">Target: {field.config.target_value}</p>}
                                <p className="text-xs bg-blue-100 text-blue-700 inline-block px-2 py-0.5 rounded-full">Input: {field.config.input_type}</p>
                             </div>
                        ))}
                    </div>
                ))}
            </div>
             <div className="p-4 border-t text-right">
                <button onClick={onClose} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">Close Preview</button>
            </div>
        </div>
    </div>
);


export default FieldSurveyView;