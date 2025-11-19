import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import type { QualityCheckResult, ValidationRule } from '../types';
import { validateData } from '../workflowUtils';

interface DataValidationProps {
    data: any;
    onValidationComplete?: (result: QualityCheckResult) => void;
}

const DataValidation: React.FC<DataValidationProps> = ({ data, onValidationComplete }) => {
    const [validationResult, setValidationResult] = useState<QualityCheckResult | null>(null);
    const [isValidating, setIsValidating] = useState(false);

    // Define validation rules for ecological data
    const validationRules: ValidationRule[] = [
        {
            id: 'species-name-required',
            name: 'Species Name Required',
            description: 'All species records must have a name',
            field: 'speciesName',
            rule: 'required',
            errorMessage: 'Species name is required'
        },
        {
            id: 'coordinates-format',
            name: 'Coordinates Format',
            description: 'Coordinates must be in valid format',
            field: 'coordinates',
            rule: 'format',
            params: { pattern: '^-?\\d+\\.\\d+,-?\\d+\\.\\d+$' },
            errorMessage: 'Coordinates must be in format: latitude,longitude'
        },
        {
            id: 'population-range',
            name: 'Population Count Range',
            description: 'Population count must be non-negative',
            field: 'populationCount',
            rule: 'range',
            params: { min: 0, max: 1000000 },
            errorMessage: 'Population count must be between 0 and 1,000,000'
        },
        {
            id: 'habitat-area-range',
            name: 'Habitat Area Range',
            description: 'Habitat area must be positive',
            field: 'habitatArea',
            rule: 'range',
            params: { min: 0.01 },
            errorMessage: 'Habitat area must be greater than 0'
        },
        {
            id: 'date-format',
            name: 'Survey Date Format',
            description: 'Survey date must be in ISO format',
            field: 'surveyDate',
            rule: 'format',
            params: { pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
            errorMessage: 'Survey date must be in format: YYYY-MM-DD'
        }
    ];

    const runValidation = () => {
        setIsValidating(true);

        // Simulate async validation
        setTimeout(() => {
            const result = validateData(data, validationRules);
            setValidationResult(result);
            setIsValidating(false);

            if (onValidationComplete) {
                onValidationComplete(result);
            }
        }, 500);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <Lucide.ShieldCheck className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-semibold text-secondary">Data Quality Check</h3>
                </div>
                <button
                    onClick={runValidation}
                    disabled={isValidating}
                    className="bg-accent text-white py-2 px-4 rounded-md hover:brightness-95 flex items-center space-x-2 disabled:opacity-50"
                >
                    {isValidating ? (
                        <>
                            <Lucide.Loader className="w-4 h-4 animate-spin" />
                            <span>Validating...</span>
                        </>
                    ) : (
                        <>
                            <Lucide.Play className="w-4 h-4" />
                            <span>Run Validation</span>
                        </>
                    )}
                </button>
            </div>

            {/* Validation Rules */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Validation Rules</h4>
                <div className="space-y-2">
                    {validationRules.map(rule => (
                        <div key={rule.id} className="flex items-start space-x-2 text-sm">
                            <Lucide.CheckSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                                <span className="font-medium">{rule.name}:</span>{' '}
                                <span className="text-gray-600">{rule.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Validation Results */}
            {validationResult && (
                <div className="space-y-4">
                    <div className={`p-4 rounded-lg border-2 ${
                        validationResult.passed
                            ? 'bg-green-50 border-green-500'
                            : 'bg-red-50 border-red-500'
                    }`}>
                        <div className="flex items-center space-x-2 mb-2">
                            {validationResult.passed ? (
                                <Lucide.CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                                <Lucide.XCircle className="w-6 h-6 text-red-600" />
                            )}
                            <span className="font-semibold text-lg">
                                {validationResult.passed ? 'All Checks Passed' : 'Validation Failed'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Checked at: {new Date(validationResult.timestamp).toLocaleString('en-IE')}
                        </p>
                    </div>

                    {/* Errors */}
                    {validationResult.errors.length > 0 && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <Lucide.AlertTriangle className="w-5 h-5 text-red-600" />
                                <h5 className="font-semibold text-red-900">
                                    {validationResult.errors.length} Error(s) Found
                                </h5>
                            </div>
                            <ul className="space-y-1 mt-2">
                                {validationResult.errors.map((error, idx) => (
                                    <li key={idx} className="text-sm text-red-700 flex items-start space-x-2">
                                        <span className="mt-0.5">•</span>
                                        <span>{error}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Warnings */}
                    {validationResult.warnings.length > 0 && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <Lucide.AlertCircle className="w-5 h-5 text-yellow-600" />
                                <h5 className="font-semibold text-yellow-900">
                                    {validationResult.warnings.length} Warning(s)
                                </h5>
                            </div>
                            <ul className="space-y-1 mt-2">
                                {validationResult.warnings.map((warning, idx) => (
                                    <li key={idx} className="text-sm text-yellow-700 flex items-start space-x-2">
                                        <span className="mt-0.5">•</span>
                                        <span>{warning}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Best Practices */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                    <Lucide.Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <h5 className="font-semibold text-blue-900 mb-1">Data Quality Tips</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Always validate data before proceeding to the next workflow step</li>
                            <li>• Use standardized species names from approved taxonomic databases</li>
                            <li>• Record GPS coordinates in decimal degree format</li>
                            <li>• Include units of measurement for all quantitative data</li>
                            <li>• Document data collection methods and conditions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataValidation;
