import React, { useState } from 'react';
import type { ViewState, ActionCategory, ActionDetail, TeamMember } from '../types';
import { ViewType } from '../types';
import * as Lucide from 'lucide-react';
import { clonakiltyBayActions, defaultDb } from '../constants';

const ActionStatusBadge: React.FC<{ status: 'Completed' | 'In Progress' | 'Not Started' }> = ({ status }) => {
    const statusMap = {
        'Completed': { text: 'Completed', color: 'bg-green-100 text-green-800' },
        'In Progress': { text: 'In Progress', color: 'bg-blue-100 text-blue-800' },
        'Not Started': { text: 'Not Started', color: 'bg-gray-100 text-gray-800' },
    };
    const { text, color } = statusMap[status];
    return <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}>{text}</span>;
};

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (action: ActionDetail) => void;
    actionToEdit: ActionDetail | null;
    teamMembers: TeamMember[];
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, onSave, actionToEdit, teamMembers }) => {
    const [action, setAction] = useState<ActionDetail>(
        actionToEdit || { title: '', objective: '', status: 'Not Started' }
    );

    React.useEffect(() => {
        setAction(actionToEdit || { title: '', objective: '', status: 'Not Started' });
    }, [actionToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAction(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(action);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-surface p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h3 className="text-xl font-bold mb-6">{actionToEdit ? 'Edit Action' : 'Add New Action'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Action Title</label>
                        <input type="text" name="title" value={action.title} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Objective</label>
                        <textarea name="objective" value={action.objective} onChange={handleChange} rows={4} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white" required></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select name="status" value={action.status} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option>Not Started</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                            <input type="date" name="completionDate" value={action.completionDate || ''} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                            <select name="assignedTo" value={action.assignedTo || ''} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option value="">Unassigned</option>
                                {teamMembers.map(member => <option key={member.name} value={member.name}>{member.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">Cancel</button>
                        <button type="submit" className="bg-accent text-white py-2 px-4 rounded-md">Save Action</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ActionDetailView: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
    const [actionPlan, setActionPlan] = useState<ActionCategory[]>(clonakiltyBayActions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingState, setEditingState] = useState<{ categoryIndex: number; actionIndex?: number; action: ActionDetail | null } | null>(null);

    const teamMembers = defaultDb.team;

    const handleOpenModal = (categoryIndex: number, actionIndex?: number) => {
        const action = actionIndex !== undefined ? actionPlan[categoryIndex].actions[actionIndex] : null;
        setEditingState({ categoryIndex, actionIndex, action });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingState(null);
    };

    const handleSaveAction = (action: ActionDetail) => {
        if (!editingState) return;
        const { categoryIndex, actionIndex } = editingState;
        const newActionPlan = JSON.parse(JSON.stringify(actionPlan)); // Deep copy

        if (actionIndex !== undefined) { // Editing existing action
            newActionPlan[categoryIndex].actions[actionIndex] = action;
        } else { // Adding new action
            newActionPlan[categoryIndex].actions.push(action);
        }
        setActionPlan(newActionPlan);
    };

    const allActions = actionPlan.flatMap(category => category.actions);
    const completedActions = allActions.filter(a => a.status === 'Completed').length;
    const progress = allActions.length > 0 ? (completedActions / allActions.length) * 100 : 0;

    return (
        <div className="p-4 md:p-8">
            <button onClick={() => setView({ view: ViewType.Tasks })} className="text-sm text-accent mb-4 flex items-center space-x-1">
                <Lucide.ArrowLeft className="w-4 h-4" />
                <span>Back to Tasks</span>
            </button>
            <div className="bg-surface p-6 md:p-8 rounded-lg shadow-md">
                <div className="border-b pb-6 mb-6">
                    <h2 className="text-3xl font-bold text-secondary">Conservation Actions</h2>
                    <p className="text-lg text-gray-500 mt-1">Clonakilty Bay SAC (Inchydoney Island) - Site Code: 000091</p>
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                            <span className="text-sm font-bold text-secondary">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-accent h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {actionPlan.map((category, catIndex) => (
                        <div key={category.name}>
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-secondary">{category.name}</h3>
                            </div>
                            {category.description && <p className="mt-1 text-sm text-gray-600 max-w-3xl">{category.description}</p>}
                            <div className="mt-4 space-y-4 border-l-2 border-gray-200 pl-6">
                                {category.actions.map((action, actIndex) => (
                                    <div key={action.title} className="bg-gray-50 p-4 rounded-md group">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-semibold text-secondary">{action.title}</h4>
                                            <div className="flex items-center space-x-2">
                                                <ActionStatusBadge status={action.status} />
                                                <button onClick={() => handleOpenModal(catIndex, actIndex)} className="text-gray-400 hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Lucide.Edit2 className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-700">{action.objective}</p>
                                        {(action.completionDate || action.assignedTo) && (
                                            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center space-x-6 text-xs text-gray-500">
                                                {action.completionDate && (
                                                    <div className="flex items-center space-x-1.5">
                                                        <Lucide.Calendar className="w-3.5 h-3.5"/>
                                                        <span>Due: {action.completionDate}</span>
                                                    </div>
                                                )}
                                                 {action.assignedTo && (
                                                    <div className="flex items-center space-x-1.5">
                                                        <Lucide.User className="w-3.5 h-3.5"/>
                                                        <span>Assigned: {action.assignedTo}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button onClick={() => handleOpenModal(catIndex)} className="text-sm text-accent hover:text-orange-500 flex items-center space-x-1">
                                    <Lucide.PlusCircle className="w-4 h-4"/>
                                    <span>Add Action</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ActionModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveAction}
                actionToEdit={editingState?.action || null}
                teamMembers={teamMembers}
            />
        </div>
    );
};

export default ActionDetailView;