import React, { useState, useEffect, useMemo } from 'react';
import * as Lucide from 'lucide-react';
import { sfaAssessmentLibrary } from '../constants';
import type { SFA_Result, SFA_CriterionResult, SFA_HabitatAssessmentRules } from '../types';

const initialResult: SFA_Result = {
    overallStatus: 'Not Assessed',
    failedCriteriaCount: 0,
    totalAreaInPoorCondition: 0,
};

const ResultCard: React.FC<{ title: string; value: string | number; color: string }> = ({ title, value, color }) => (
    <div className="bg-surface p-4 rounded-lg shadow-md text-center">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

interface ImpactCalculationViewProps {
    showToast?: (message: string, type?: 'success' | 'error') => void;
}

const ImpactCalculationView: React.FC<ImpactCalculationViewProps> = ({ showToast }) => {
    const [selectedHabitat, setSelectedHabitat] = useState<string>('');
    const [assessmentData, setAssessmentData] = useState<{ [key: string]: SFA_CriterionResult }>({});
    const [overallResult, setOverallResult] = useState<SFA_Result>(initialResult);
    const [showSendModal, setShowSendModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const habitatRules: SFA_HabitatAssessmentRules | null = useMemo(() => {
        return selectedHabitat ? sfaAssessmentLibrary[selectedHabitat] : null;
    }, [selectedHabitat]);

    useEffect(() => {
        // Reset when habitat changes
        if (habitatRules) {
            const initialData: { [key: string]: SFA_CriterionResult } = {};
            habitatRules.criteria.forEach(c => {
                initialData[c.id] = { status: 'Pass', areaAffected: 0, notes: '' };
            });
            setAssessmentData(initialData);
        } else {
            setAssessmentData({});
        }
    }, [habitatRules]);

    useEffect(() => {
        if (!habitatRules || Object.keys(assessmentData).length === 0) {
            setOverallResult(initialResult);
            return;
        }

        // FIX: Explicitly type the 'r' parameter to resolve 'unknown' type error.
        const failedCriteria = Object.values(assessmentData).filter((r: SFA_CriterionResult) => r.status === 'Fail');
        const failedCount = failedCriteria.length;
        // Fix: Explicitly type the `sum` parameter in the reduce function to resolve 'unknown' type error.
        const totalAreaAffected = failedCriteria.reduce((sum: number, r: SFA_CriterionResult) => sum + Number(r.areaAffected || 0), 0);

        let status: SFA_Result['overallStatus'] = 'Favourable';
        if (failedCount > 0) {
            if (failedCount >= habitatRules.rules.badThreshold) {
                status = 'Unfavourable – Bad';
            } else if (failedCount >= habitatRules.rules.inadequateThreshold) {
                status = 'Unfavourable – Inadequate';
            } else {
                 // Handles cases where a single failure can be inadequate
                 status = 'Unfavourable – Inadequate';
            }
        }
        
        setOverallResult({
            overallStatus: status,
            failedCriteriaCount: failedCount,
            totalAreaInPoorCondition: totalAreaAffected,
        });

    }, [assessmentData, habitatRules]);

    const handleCriterionChange = (id: string, field: keyof SFA_CriterionResult, value: string | number) => {
        setAssessmentData(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }));
    };
    
    const getStatusColor = (status: SFA_Result['overallStatus']) => {
        switch (status) {
            case 'Favourable': return 'text-status-favourable';
            case 'Unfavourable – Inadequate': return 'text-status-inadequate';
            case 'Unfavourable – Bad': return 'text-status-bad';
            default: return 'text-gray-500';
        }
    };

    const handleSendToPhone = () => {
        if (!phoneNumber) {
            showToast?.('Please enter a phone number', 'error');
            return;
        }

        // Generate mobile impact assessment link
        const assessmentLink = `${window.location.origin}/mobile-impact?habitat=${selectedHabitat}`;

        // Simulate sending SMS
        showToast?.(`Impact assessment link sent to ${phoneNumber} via SMS`, 'success');
        setShowSendModal(false);
        setPhoneNumber('');
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-start mb-1">
                <div>
                    <h2 className="text-3xl font-bold text-secondary">Structure & Functions Assessment</h2>
                    <p className="text-gray-500 mt-1">Criterion-based ecological quality evaluation for Annex I habitats.</p>
                </div>
                <button
                    onClick={() => setShowSendModal(true)}
                    className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center space-x-2"
                >
                    <Lucide.Smartphone className="w-5 h-5" />
                    <span>Send to Mobile</span>
                </button>
            </div>
            <div className="mb-4"></div>

            <div className="mt-6 bg-surface p-6 rounded-lg shadow-md">
                <label htmlFor="habitat-select" className="block text-sm font-medium text-gray-700">1. Select Habitat to Assess</label>
                <select
                    id="habitat-select"
                    value={selectedHabitat}
                    onChange={(e) => setSelectedHabitat(e.target.value)}
                    className="mt-1 block w-full md:w-1/2 p-2 border border-gray-300 rounded-md bg-white"
                >
                    <option value="">-- Please select a habitat --</option>
                    {Object.entries(sfaAssessmentLibrary).map(([code, { name }]) => (
                        <option key={code} value={code}>{name}</option>
                    ))}
                </select>
            </div>
            
            {selectedHabitat && habitatRules && (
                 <>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-secondary">Assessment Summary</h3>
                         <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                             <ResultCard title="Overall Assessment Status" value={overallResult.overallStatus} color={getStatusColor(overallResult.overallStatus)} />
                             <ResultCard title="Failed Criteria Count" value={overallResult.failedCriteriaCount} color={overallResult.failedCriteriaCount > 0 ? 'text-status-bad' : 'text-status-favourable'} />
                             <ResultCard title="Habitat Area in Poor Condition (%)" value={`${overallResult.totalAreaInPoorCondition.toFixed(1)}%`} color={overallResult.totalAreaInPoorCondition > 0 ? 'text-status-inadequate' : 'text-gray-800'} />
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-secondary">2. Evaluate Criteria</h3>
                         <div className="mt-4 bg-surface p-6 rounded-lg shadow-md space-y-6">
                            {habitatRules.criteria.map((criterion, index) => (
                                <div key={criterion.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                        <div className="md:col-span-4">
                                            <p className="font-semibold text-secondary">{index + 1}. {criterion.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">Target: <span className="font-medium">{criterion.target}</span></p>
                                        </div>
                                        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                                                <div className="flex rounded-md shadow-sm">
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleCriterionChange(criterion.id, 'status', 'Pass')}
                                                        className={`px-4 py-2 text-sm font-medium rounded-l-md w-full ${assessmentData[criterion.id]?.status === 'Pass' ? 'bg-accent text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                                    >Pass</button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleCriterionChange(criterion.id, 'status', 'Fail')}
                                                        className={`px-4 py-2 text-sm font-medium rounded-r-md w-full ${assessmentData[criterion.id]?.status === 'Fail' ? 'bg-status-bad text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                                    >Fail</button>
                                                </div>
                                            </div>
                                             <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Area Affected (%)</label>
                                                 <input 
                                                    type="number" 
                                                    value={assessmentData[criterion.id]?.areaAffected || 0}
                                                    onChange={(e) => handleCriterionChange(criterion.id, 'areaAffected', parseFloat(e.target.value))}
                                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                                    disabled={assessmentData[criterion.id]?.status === 'Pass'}
                                                />
                                            </div>
                                             <div className="sm:col-span-3">
                                                 <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
                                                 <input 
                                                    type="text" 
                                                    placeholder="Record findings..."
                                                    value={assessmentData[criterion.id]?.notes || ''}
                                                    onChange={(e) => handleCriterionChange(criterion.id, 'notes', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                </>
            )}

            {/* Send to Mobile Modal */}
            {showSendModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowSendModal(false)}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-secondary flex items-center">
                                    <Lucide.Smartphone className="w-6 h-6 mr-2 text-accent" />
                                    Send to Mobile Device
                                </h3>
                                <button onClick={() => setShowSendModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <Lucide.X className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Enter a mobile phone number to receive an SMS with a link to complete this habitat assessment on a mobile device in the field.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mobile Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="+353 87 123 4567"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                                    />
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                                    <div className="flex">
                                        <Lucide.Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                                        <div className="text-sm text-blue-800">
                                            <p className="font-medium mb-1">Field Data Collection</p>
                                            <p>The assessment link is optimized for field use with easy-to-use forms, GPS location capture, and photo documentation capabilities.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={() => setShowSendModal(false)}
                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSendToPhone}
                                    className="flex-1 py-2 px-4 bg-accent text-white rounded-md hover:bg-orange-500 flex items-center justify-center space-x-2"
                                >
                                    <Lucide.Send className="w-4 h-4" />
                                    <span>Send SMS</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImpactCalculationView;
