import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import type {
    Article17Assessment,
    Article17Status,
    Article17Trend,
    BiogeographicalRegion,
    MarineRegion,
    ReportingPeriod,
    Article17Pressure
} from '../types';

interface Article17AssessmentProps {
    showToast?: (message: string, type?: 'success' | 'error') => void;
}

const Article17AssessmentView: React.FC<Article17AssessmentProps> = ({ showToast }) => {
    const [selectedHabitat, setSelectedHabitat] = useState<string>('');
    const [bioRegion, setBioRegion] = useState<BiogeographicalRegion | MarineRegion | ''>('');
    const [reportingPeriod, setReportingPeriod] = useState<ReportingPeriod>('2019-2024');
    const [showSendModal, setShowSendModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    // Range Parameter
    const [rangeStatus, setRangeStatus] = useState<Article17Status>('Unknown');
    const [rangeTrend, setRangeTrend] = useState<Article17Trend>('Unknown');
    const [favourableRefRange, setFavourableRefRange] = useState<number>(0);
    const [currentRange, setCurrentRange] = useState<number>(0);

    // Area Parameter
    const [areaStatus, setAreaStatus] = useState<Article17Status>('Unknown');
    const [areaTrend, setAreaTrend] = useState<Article17Trend>('Unknown');
    const [favourableRefArea, setFavourableRefArea] = useState<number>(0);
    const [currentArea, setCurrentArea] = useState<number>(0);

    // Structure & Functions Parameter
    const [structureStatus, setStructureStatus] = useState<Article17Status>('Unknown');
    const [structureTrend, setStructureTrend] = useState<Article17Trend>('Unknown');
    const [areaGoodCondition, setAreaGoodCondition] = useState<number>(0);
    const [areaPoorCondition, setAreaPoorCondition] = useState<number>(0);

    // Future Prospects Parameter
    const [futureStatus, setFutureStatus] = useState<Article17Status>('Unknown');
    const [mainPressures, setMainPressures] = useState<string[]>([]);
    const [significantPressures, setSignificantPressures] = useState<boolean>(false);

    // Overall Assessment
    const [overallStatus, setOverallStatus] = useState<Article17Status>('Unknown');
    const [overallTrend, setOverallTrend] = useState<Article17Trend>('Unknown');

    const BIOGEOGRAPHICAL_REGIONS: BiogeographicalRegion[] = [
        'Alpine', 'Atlantic', 'Black Sea', 'Boreal', 'Continental',
        'Macaronesian', 'Mediterranean', 'Pannonian', 'Steppic'
    ];

    const MARINE_REGIONS: MarineRegion[] = [
        'Marine Atlantic', 'Marine Baltic', 'Marine Black Sea',
        'Marine Macaronesian', 'Marine Mediterranean'
    ];

    const HABITATS = {
        '2110': 'Embryonic shifting dunes',
        '2120': 'Shifting dunes (white dunes)',
        '2130': 'Fixed coastal dunes',
        '1330': 'Atlantic salt meadows',
        '1140': 'Mudflats and sandflats',
        '6210': 'Semi-natural dry grasslands',
        '91E0': 'Alluvial forests'
    };

    const COMMON_PRESSURES = [
        'Recreational pressure (trampling)',
        'Erosion (natural & human-induced)',
        'Vehicle access',
        'Invasive species',
        'Climate change',
        'Agricultural intensification',
        'Abandonment of pastoral systems',
        'Urbanisation',
        'Nutrient loading',
        'Water pollution'
    ];

    // Article 17 Evaluation Matrix Logic
    useEffect(() => {
        calculateOverallStatus();
    }, [rangeStatus, areaStatus, structureStatus, futureStatus]);

    const calculateOverallStatus = () => {
        const statuses = [rangeStatus, areaStatus, structureStatus, futureStatus];

        // Count unknowns
        const unknownCount = statuses.filter(s => s === 'Unknown').length;

        // If two or more unknown combined with green or all unknown
        if (unknownCount >= 2) {
            setOverallStatus('Unknown');
            return;
        }

        // If one or more 'Unfavourable-Bad'
        if (statuses.some(s => s === 'Unfavourable-Bad')) {
            setOverallStatus('Unfavourable-Bad');
            return;
        }

        // If one or more 'Unfavourable-Inadequate' but no 'Unfavourable-Bad'
        if (statuses.some(s => s === 'Unfavourable-Inadequate')) {
            setOverallStatus('Unfavourable-Inadequate');
            return;
        }

        // All 'Favourable' OR three 'Favourable' and one 'Unknown'
        const favourableCount = statuses.filter(s => s === 'Favourable').length;
        if (favourableCount === 4 || (favourableCount === 3 && unknownCount === 1)) {
            setOverallStatus('Favourable');
            return;
        }

        setOverallStatus('Unknown');
    };

    const getStatusColor = (status: Article17Status): string => {
        switch (status) {
            case 'Favourable': return 'bg-green-100 text-green-800 border-green-300';
            case 'Unfavourable-Inadequate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Unfavourable-Bad': return 'bg-red-100 text-red-800 border-red-300';
            case 'Unknown': return 'bg-gray-100 text-gray-800 border-gray-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusIcon = (status: Article17Status) => {
        switch (status) {
            case 'Favourable': return <Lucide.CheckCircle className="w-5 h-5 text-green-600" />;
            case 'Unfavourable-Inadequate': return <Lucide.AlertTriangle className="w-5 h-5 text-yellow-600" />;
            case 'Unfavourable-Bad': return <Lucide.XCircle className="w-5 h-5 text-red-600" />;
            case 'Unknown': return <Lucide.HelpCircle className="w-5 h-5 text-gray-600" />;
        }
    };

    const handleSendToPhone = () => {
        if (!phoneNumber) {
            showToast?.('Please enter a phone number', 'error');
            return;
        }
        const assessmentLink = `${window.location.origin}/mobile-article17?habitat=${selectedHabitat}&region=${bioRegion}`;
        showToast?.(`Article 17 assessment link sent to ${phoneNumber} via SMS`, 'success');
        setShowSendModal(false);
        setPhoneNumber('');
    };

    const togglePressure = (pressure: string) => {
        setMainPressures(prev =>
            prev.includes(pressure)
                ? prev.filter(p => p !== pressure)
                : [...prev, pressure]
        );
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-3xl font-bold text-secondary flex items-center">
                        <Lucide.FileText className="w-8 h-8 mr-3 text-accent" />
                        Article 17 Assessment
                    </h2>
                    <p className="text-gray-500 mt-1">Four-parameter assessment based on EU Habitats Directive reporting methodology</p>
                </div>
                <button
                    onClick={() => setShowSendModal(true)}
                    className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center space-x-2"
                >
                    <Lucide.Smartphone className="w-5 h-5" />
                    <span>Send to Mobile</span>
                </button>
            </div>

            {/* Assessment Context */}
            <div className="bg-surface p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                    <Lucide.Settings className="w-5 h-5 mr-2 text-accent" />
                    Assessment Context
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Habitat Type</label>
                        <select
                            value={selectedHabitat}
                            onChange={(e) => setSelectedHabitat(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white"
                        >
                            <option value="">-- Select Habitat --</option>
                            {Object.entries(HABITATS).map(([code, name]) => (
                                <option key={code} value={code}>[{code}] {name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Biogeographical/Marine Region</label>
                        <select
                            value={bioRegion}
                            onChange={(e) => setBioRegion(e.target.value as BiogeographicalRegion | MarineRegion)}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white"
                        >
                            <option value="">-- Select Region --</option>
                            <optgroup label="Terrestrial Biogeographical Regions">
                                {BIOGEOGRAPHICAL_REGIONS.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Marine Regions">
                                {MARINE_REGIONS.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Period</label>
                        <select
                            value={reportingPeriod}
                            onChange={(e) => setReportingPeriod(e.target.value as ReportingPeriod)}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white"
                        >
                            <option value="2007-2012">2007-2012</option>
                            <option value="2013-2018">2013-2018</option>
                            <option value="2019-2024">2019-2024 (Current)</option>
                        </select>
                    </div>
                </div>
            </div>

            {selectedHabitat && bioRegion && (
                <>
                    {/* Parameter 1: Range */}
                    <div className="bg-surface p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                            <Lucide.Map className="w-5 h-5 mr-2 text-accent" />
                            Parameter 1: Range
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Conservation Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['Favourable', 'Unfavourable-Inadequate', 'Unfavourable-Bad', 'Unknown'] as Article17Status[]).map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setRangeStatus(status)}
                                            className={`p-2 rounded border-2 text-sm font-medium transition ${
                                                rangeStatus === status
                                                    ? getStatusColor(status)
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Short-term Trend (12 years)</label>
                                <select
                                    value={rangeTrend}
                                    onChange={(e) => setRangeTrend(e.target.value as Article17Trend)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option value="Increasing">Increasing</option>
                                    <option value="Stable">Stable</option>
                                    <option value="Decreasing">Decreasing</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Favourable Reference Range (km²)</label>
                                <input
                                    type="number"
                                    value={favourableRefRange}
                                    onChange={(e) => setFavourableRefRange(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Range (km²)</label>
                                <input
                                    type="number"
                                    value={currentRange}
                                    onChange={(e) => setCurrentRange(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm text-blue-800">
                                <strong>Criteria:</strong> Favourable when stable or increasing AND not smaller than favourable reference range.
                                Unfavourable-Bad if decline &gt;1% per year OR &gt;10% below reference.
                            </p>
                        </div>
                    </div>

                    {/* Parameter 2: Area */}
                    <div className="bg-surface p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                            <Lucide.Maximize2 className="w-5 h-5 mr-2 text-accent" />
                            Parameter 2: Area Covered by Habitat
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Conservation Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['Favourable', 'Unfavourable-Inadequate', 'Unfavourable-Bad', 'Unknown'] as Article17Status[]).map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setAreaStatus(status)}
                                            className={`p-2 rounded border-2 text-sm font-medium transition ${
                                                areaStatus === status
                                                    ? getStatusColor(status)
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Short-term Trend (12 years)</label>
                                <select
                                    value={areaTrend}
                                    onChange={(e) => setAreaTrend(e.target.value as Article17Trend)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option value="Increasing">Increasing</option>
                                    <option value="Stable">Stable</option>
                                    <option value="Decreasing">Decreasing</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Favourable Reference Area (ha)</label>
                                <input
                                    type="number"
                                    value={favourableRefArea}
                                    onChange={(e) => setFavourableRefArea(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Area (ha)</label>
                                <input
                                    type="number"
                                    value={currentArea}
                                    onChange={(e) => setCurrentArea(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm text-blue-800">
                                <strong>Criteria:</strong> Favourable when stable or increasing AND not smaller than favourable reference area AND without significant distribution changes.
                                Unfavourable-Bad if loss &gt;1% per year OR &gt;10% below reference OR major distribution losses.
                            </p>
                        </div>
                    </div>

                    {/* Parameter 3: Structure & Functions */}
                    <div className="bg-surface p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                            <Lucide.Layers className="w-5 h-5 mr-2 text-accent" />
                            Parameter 3: Structure & Functions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Conservation Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['Favourable', 'Unfavourable-Inadequate', 'Unfavourable-Bad', 'Unknown'] as Article17Status[]).map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setStructureStatus(status)}
                                            className={`p-2 rounded border-2 text-sm font-medium transition ${
                                                structureStatus === status
                                                    ? getStatusColor(status)
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Trend</label>
                                <select
                                    value={structureTrend}
                                    onChange={(e) => setStructureTrend(e.target.value as Article17Trend)}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                >
                                    <option value="Improving">Improving</option>
                                    <option value="Stable">Stable</option>
                                    <option value="Deteriorating">Deteriorating</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Area in Good Condition (%)</label>
                                <input
                                    type="number"
                                    value={areaGoodCondition}
                                    onChange={(e) => setAreaGoodCondition(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Area in Poor Condition (%)</label>
                                <input
                                    type="number"
                                    value={areaPoorCondition}
                                    onChange={(e) => setAreaPoorCondition(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm text-blue-800">
                                <strong>Criteria:</strong> Favourable when structures and functions (including typical species) in good condition with no significant deteriorations.
                                Unfavourable-Bad if &gt;25% of area unfavourable regarding structures and functions.
                            </p>
                        </div>
                    </div>

                    {/* Parameter 4: Future Prospects */}
                    <div className="bg-surface p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                            <Lucide.TrendingUp className="w-5 h-5 mr-2 text-accent" />
                            Parameter 4: Future Prospects
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Conservation Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['Favourable', 'Unfavourable-Inadequate', 'Unfavourable-Bad', 'Unknown'] as Article17Status[]).map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setFutureStatus(status)}
                                            className={`p-2 rounded border-2 text-sm font-medium transition ${
                                                futureStatus === status
                                                    ? getStatusColor(status)
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Significant Pressures/Threats</label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            checked={significantPressures === true}
                                            onChange={() => setSignificantPressures(true)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            checked={significantPressures === false}
                                            onChange={() => setSignificantPressures(false)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">No</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Main Pressures & Threats</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {COMMON_PRESSURES.map(pressure => (
                                    <label key={pressure} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={mainPressures.includes(pressure)}
                                            onChange={() => togglePressure(pressure)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">{pressure}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm text-blue-800">
                                <strong>Criteria:</strong> Favourable when main pressures/threats not significant and species will remain viable long-term.
                                Unfavourable-Bad if severe influence of pressures/threats with very bad prospects and long-term viability at risk.
                            </p>
                        </div>
                    </div>

                    {/* Overall Assessment */}
                    <div className="bg-surface p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                            <Lucide.Award className="w-5 h-5 mr-2 text-accent" />
                            Overall Conservation Status
                        </h3>
                        <div className="flex items-center justify-center py-8">
                            <div className={`p-6 rounded-lg border-4 ${getStatusColor(overallStatus)}`}>
                                <div className="flex items-center space-x-3">
                                    {getStatusIcon(overallStatus)}
                                    <div>
                                        <p className="text-sm font-medium">Overall Status</p>
                                        <p className="text-2xl font-bold">{overallStatus}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold text-gray-700 mb-3">Parameter Summary</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center justify-between p-2 bg-white rounded border">
                                    <span className="text-sm">Range</span>
                                    <span className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(rangeStatus)}`}>
                                        {rangeStatus}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white rounded border">
                                    <span className="text-sm">Area</span>
                                    <span className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(areaStatus)}`}>
                                        {areaStatus}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white rounded border">
                                    <span className="text-sm">Structure & Functions</span>
                                    <span className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(structureStatus)}`}>
                                        {structureStatus}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white rounded border">
                                    <span className="text-sm">Future Prospects</span>
                                    <span className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(futureStatus)}`}>
                                        {futureStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                                <Lucide.Info className="w-4 h-4 mr-2" />
                                Evaluation Matrix Rules
                            </h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• <strong>Favourable:</strong> All 'green' OR three 'green' and one 'unknown'</li>
                                <li>• <strong>Unfavourable-Inadequate:</strong> One or more 'amber' but no 'red'</li>
                                <li>• <strong>Unfavourable-Bad:</strong> One or more 'red'</li>
                                <li>• <strong>Unknown:</strong> Two or more 'unknown' combined with green or all 'unknown'</li>
                            </ul>
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
                                Enter a mobile phone number to receive an SMS with a link to complete this Article 17 assessment on a mobile device in the field.
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
                                            <p className="font-medium mb-1">Article 17 Field Assessment</p>
                                            <p>The assessment link includes all 4 parameters with field-optimized data entry, GPS capture, and offline capability.</p>
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

export default Article17AssessmentView;
