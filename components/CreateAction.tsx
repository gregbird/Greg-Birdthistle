import React from 'react';
import * as Lucide from 'lucide-react';
import { ViewState, ViewType } from '../types';
import { assessmentsCsvData, actionTypes, assessmentFailures, thirdPartyContractors, defaultDb } from '../constants';
import { parseCsv } from '../services';

interface CreateActionViewProps {
    setView: (view: ViewState) => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
}

const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-b border-gray-200 pb-8 mb-8">
        <h3 className="text-xl font-bold text-secondary mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {children}
        </div>
    </div>
);

const FormField: React.FC<{ label: string, children: React.ReactNode, fullWidth?: boolean, required?: boolean }> = ({ label, children, fullWidth = false, required = false }) => (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
    </div>
);

const CreateActionView: React.FC<CreateActionViewProps> = ({ setView, showToast }) => {

    const siteOptions = React.useMemo(() => parseCsv(assessmentsCsvData), []);
    const teamMembers = defaultDb.team;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        showToast('New action has been created successfully!');
        setView({ view: ViewType.Tasks });
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-secondary">Create a New Action</h2>
            </div>
            <form onSubmit={handleSubmit} className="bg-surface p-6 md:p-8 rounded-lg shadow-md">
                
                {/* 1. Action Justification */}
                <FormSection title='1. Action Justification (The "Why")'>
                    <FormField label="Site Name" required>
                        <select defaultValue="91" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed">
                            {siteOptions.map(site => (
                                <option key={site.SITECODE} value={site.SITECODE}>
                                    {site.SITE_NAME} ({site.SITECODE})
                                </option>
                            ))}
                        </select>
                    </FormField>
                     <FormField label="Target Habitat / Species" required>
                        <input type="text" defaultValue="[2130] Fixed coastal dunes" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    </FormField>
                    <FormField label="Linked Assessment Failure" fullWidth required>
                         <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                            {assessmentFailures.map(failure => <option key={failure}>{failure}</option>)}
                        </select>
                    </FormField>
                    <FormField label="Action Objective" fullWidth required>
                        <textarea rows={3} placeholder="e.g., To increase bare ground to 15% in Zone A." className="w-full p-2 border border-gray-300 rounded-md bg-white"></textarea>
                    </FormField>
                </FormSection>

                {/* 2. Action Details */}
                <FormSection title='2. Action Details (The "What")'>
                    <FormField label="Action Title" required>
                        <input type="text" placeholder="e.g., Inchydoney Dune - Scrub Removal (Phase 1)" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                    </FormField>
                    <FormField label="Action Type" required>
                         <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                            {actionTypes.map(type => <option key={type}>{type}</option>)}
                        </select>
                    </FormField>
                     <FormField label="Detailed Scope of Works" fullWidth required>
                        <textarea rows={5} placeholder="Full description of tasks, methods, and standards required." className="w-full p-2 border border-gray-300 rounded-md bg-white"></textarea>
                    </FormField>
                    <FormField label="Biosecurity Requirements" fullWidth>
                        <textarea rows={3} placeholder="e.g., All machinery must be washed down..." className="w-full p-2 border border-gray-300 rounded-md bg-white"></textarea>
                    </FormField>
                </FormSection>

                {/* 3. Location Details */}
                <FormSection title='3. Location Details (The "Where")'>
                    <FormField label="Work Zone / Sub-site">
                        <input type="text" placeholder="e.g., Inchydoney Island - Western fixed dune system" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                    </FormField>
                    <FormField label="Grid Reference">
                        <input type="text" placeholder="e.g., W 12345 67890" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                    </FormField>
                     <FormField label="Location Map" fullWidth>
                        <div className="h-64 w-full bg-gray-100 border rounded-md flex items-center justify-center text-gray-500">
                           <p>Interactive Map Interface Area</p>
                        </div>
                        <div className="flex space-x-2 mt-2">
                             <button type="button" className="text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300 flex items-center space-x-1"><Lucide.MapPin className="w-4 h-4" /><span>Drop Pin</span></button>
                             <button type="button" className="text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300 flex items-center space-x-1"><Lucide.Spline className="w-4 h-4" /><span>Draw Polygon</span></button>
                             <button type="button" className="text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300 flex items-center space-x-1"><Lucide.Upload className="w-4 h-4" /><span>Upload KML/SHP</span></button>
                        </div>
                    </FormField>
                     <FormField label="Access Instructions" fullWidth>
                        <textarea rows={3} placeholder="e.g., Access via the public beach car park." className="w-full p-2 border border-gray-300 rounded-md bg-white"></textarea>
                    </FormField>
                </FormSection>

                {/* 4. Assignment & Responsibility */}
                <FormSection title='4. Assignment & Responsibility (The "Who")'>
                    <FormField label="Assigned 3rd Party">
                         <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                            <option value="">Select a contractor...</option>
                            {thirdPartyContractors.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </FormField>
                     <FormField label="3rd Party Contact">
                        <input type="text" placeholder="e.g., Jane Doe (jane.doe@ecoserve.ie)" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                    </FormField>
                    <FormField label="Internal Project Manager" required>
                        <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                            <option value="">Select a team member...</option>
                            {teamMembers.map(m => <option key={m.email}>{m.name}</option>)}
                        </select>
                    </FormField>
                </FormSection>

                {/* 5. Scheduling & Constraints */}
                 <FormSection title='5. Scheduling & Constraints (The "When")'>
                     <FormField label="Start Date" required>
                        <input type="date" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                    </FormField>
                    <FormField label="Completion Deadline" required>
                        <input type="date" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                    </FormField>
                    <FormField label="Status" required>
                        <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                            <option>Pending Assignment</option>
                            <option>Assigned</option>
                            <option>In Progress</option>
                            <option>Blocked</option>
                            <option>For Review</option>
                            <option>Complete</option>
                        </select>
                    </FormField>
                    <FormField label="Ecological Constraints / Timing" fullWidth>
                        <textarea rows={3} placeholder="e.g., WARNING: Work must be completed outside of the bird nesting season..." className="w-full p-2 border border-gray-300 rounded-md bg-yellow-50 placeholder-yellow-700"></textarea>
                    </FormField>
                 </FormSection>

                 {/* 6. Budget & Reporting */}
                <FormSection title='6. Budget & Reporting (The "How")'>
                    <FormField label="Budget Code / PO Number">
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                    </FormField>
                    <FormField label="Agreed Cost (€)">
                        <input type="number" step="0.01" className="w-full p-2 border border-gray-300 rounded-md bg-white" />
                    </FormField>
                    <FormField label="Definition of Done / Completion Criteria" fullWidth required>
                        <textarea rows={4} placeholder="e.g., All cut scrub removed from site. Photo log of treated stumps provided." className="w-full p-2 border border-gray-300 rounded-md bg-white"></textarea>
                    </FormField>
                    <FormField label="Required Evidence for Completion" fullWidth>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                             {['Photographic evidence (before and after)', 'Written report', 'GPS tracklog of work area', 'Invoice', 'On-site inspection'].map(item => (
                                <label key={item} className="flex items-center space-x-2 text-sm">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"/>
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </FormField>
                </FormSection>

                {/* 7. Supporting Information */}
                 <div className="border-b border-gray-200 pb-8 mb-8">
                    <h3 className="text-xl font-bold text-secondary mb-4">7. Supporting Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="File Attachments">
                             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <Lucide.File className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-accent hover:text-orange-500 focus-within:outline-none">
                                            <span>Upload files</span>
                                            <input type="file" className="sr-only" multiple />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PDF, DOCX, KML, SHP up to 10MB</p>
                                </div>
                            </div>
                        </FormField>
                        <FormField label="Health & Safety Notes">
                            <textarea rows={6} placeholder="e.g., Site is open to the public. Contractor must provide their own RAMS." className="w-full p-2 border border-gray-300 rounded-md bg-white"></textarea>
                        </FormField>
                    </div>
                </div>


                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={() => setView({ view: ViewType.Dashboard })} className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-300">
                        Cancel
                    </button>
                    <button type="submit" className="bg-accent text-white py-2 px-6 rounded-md hover:bg-orange-500">
                        Save Action
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CreateActionView;