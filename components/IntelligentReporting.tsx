import React, { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import type { Project, Survey, AIChatMessage } from '../types';

interface DataSource {
    id: string;
    name: string;
    type: 'gis' | 'datamine' | 'field_survey' | 'impact_calc' | 'article17';
    icon: string;
    data: any;
    selected: boolean;
    lastUpdated: string;
}

interface ReportSection {
    id: string;
    title: string;
    content: string;
    aiGenerated: boolean;
    userComments: string;
    dataSources: string[];
}

interface IntelligentReportingProps {
    projects: Project[];
    surveys: Survey[];
    showToast?: (message: string, type?: 'success' | 'error') => void;
}

const IntelligentReportingView: React.FC<IntelligentReportingProps> = ({ projects, surveys, showToast }) => {
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [chatHistory, setChatHistory] = useState<AIChatMessage[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [reportSections, setReportSections] = useState<ReportSection[]>([]);
    const [dataSources, setDataSources] = useState<DataSource[]>([]);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [showDataSelector, setShowDataSelector] = useState(false);
    const [reportType, setReportType] = useState<string>('');
    const [conversationStage, setConversationStage] = useState<'greeting' | 'project_selection' | 'report_type' | 'data_selection' | 'section_generation' | 'review'>('greeting');

    const chatEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);

    // Report types based on attached document types
    const REPORT_TYPES = [
        { id: 'nia', name: 'Natura Impact Assessment', description: 'Comprehensive NIS for Natura 2000 sites' },
        { id: 'aa_screening', name: 'AA Screening Report', description: 'Stage 1 Appropriate Assessment screening' },
        { id: 'pea', name: 'Preliminary Ecological Appraisal', description: 'Phase 1 habitat survey report' },
        { id: 'ecia', name: 'Ecological Impact Assessment', description: 'EcIA for planning applications' },
        { id: 'article17', name: 'Article 17 Report', description: 'Habitats Directive reporting' },
        { id: 'habitat_assessment', name: 'Habitat Assessment Report', description: 'Detailed habitat condition assessment' },
        { id: 'species_survey', name: 'Species Survey Report', description: 'Protected species survey findings' },
        { id: 'management_plan', name: 'Habitat Management Plan', description: 'Conservation management recommendations' }
    ];

    useEffect(() => {
        // Initialize with greeting
        addAIMessage("Hello! I'm your AI Reporting Assistant. I'll help you create a professional ecological report by asking you questions and gathering the data you've collected. Let me start by asking: which project would you like to create a report for?");
        setConversationStage('project_selection');
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    useEffect(() => {
        // Load data sources when project is selected
        if (selectedProjectId) {
            loadDataSources();
        }
    }, [selectedProjectId]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addAIMessage = (content: string) => {
        setChatHistory(prev => [...prev, { sender: 'ai', content }]);
    };

    const addUserMessage = (content: string) => {
        setChatHistory(prev => [...prev, { sender: 'user', content }]);
    };

    const loadDataSources = () => {
        // Simulate loading data from different tools
        const sources: DataSource[] = [
            {
                id: 'gis-1',
                name: 'GIS Mapping Data',
                type: 'gis',
                icon: 'Map',
                selected: false,
                lastUpdated: '2025-11-18',
                data: {
                    boundaries: 'Site boundary: 45.2 ha',
                    habitats: ['2130 Fixed coastal dunes', '1330 Atlantic salt meadows'],
                    coordinates: 'ITM 650000, 750000'
                }
            },
            {
                id: 'datamine-1',
                name: 'Data Mine Results',
                type: 'datamine',
                icon: 'Database',
                selected: false,
                lastUpdated: '2025-11-17',
                data: {
                    sac: 'Rossbehy SAC (002289)',
                    spa: 'Castlemaine Harbour SPA (004029)',
                    qualifyingInterests: ['2130 Fixed coastal dunes', '1330 Atlantic salt meadows'],
                    conservationObjectives: 'Maintain favourable conservation status'
                }
            },
            {
                id: 'field-1',
                name: 'Field Survey Data',
                type: 'field_survey',
                icon: 'ClipboardList',
                selected: false,
                lastUpdated: '2025-11-19',
                data: {
                    surveyDate: '2025-11-15',
                    weather: 'Clear, 12°C, light wind',
                    habitats: ['2130: 25.3 ha', '1330: 8.9 ha'],
                    species: ['Ammophila arenaria (abundant)', 'Festuca rubra (frequent)']
                }
            },
            {
                id: 'impact-1',
                name: 'Impact Calculation',
                type: 'impact_calc',
                icon: 'Calculator',
                selected: false,
                lastUpdated: '2025-11-19',
                data: {
                    habitatCode: '2130',
                    overallStatus: 'Unfavourable-Inadequate',
                    failedCriteria: 2,
                    areaInPoorCondition: '8.5 ha (33.6%)'
                }
            },
            {
                id: 'article17-1',
                name: 'Article 17 Assessment',
                type: 'article17',
                icon: 'FileText',
                selected: false,
                lastUpdated: '2025-11-19',
                data: {
                    habitatCode: '2130',
                    bioRegion: 'Atlantic',
                    range: 'Favourable',
                    area: 'Unfavourable-Inadequate',
                    structure: 'Unfavourable-Inadequate',
                    futureProspects: 'Unfavourable-Inadequate',
                    overallStatus: 'Unfavourable-Inadequate'
                }
            }
        ];
        setDataSources(sources);
    };

    const handleProjectSelection = (projectId: number) => {
        setSelectedProjectId(projectId);
        const project = projects.find(p => p.id === projectId);
        addUserMessage(`I'd like to create a report for ${project?.name}`);

        setTimeout(() => {
            addAIMessage(`Great! I've loaded the data for "${project?.name}". Now, what type of report would you like to create? Here are some options:\n\n${REPORT_TYPES.map((rt, i) => `${i + 1}. ${rt.name} - ${rt.description}`).join('\n')}\n\nPlease type the number or name of the report type.`);
            setConversationStage('report_type');
        }, 800);
    };

    const handleReportTypeSelection = (type: string) => {
        const reportTypeObj = REPORT_TYPES.find(rt =>
            rt.id === type || rt.name.toLowerCase().includes(type.toLowerCase())
        );

        if (reportTypeObj) {
            setReportType(reportTypeObj.id);
            addUserMessage(`I want to create a ${reportTypeObj.name}`);

            setTimeout(() => {
                addAIMessage(`Perfect! I'll help you create a ${reportTypeObj.name}. I've found ${dataSources.length} data sources from your previous work:\n\n${dataSources.map(ds => `• ${ds.name} (last updated: ${ds.lastUpdated})`).join('\n')}\n\nWould you like to review and select which data sources to include in your report? Type 'yes' to review, or 'no' to include all data.`);
                setConversationStage('data_selection');
            }, 800);
        } else {
            addAIMessage("I didn't recognize that report type. Please choose from the list by typing the number (1-8) or the report name.");
        }
    };

    const handleDataSelection = (response: string) => {
        if (response.toLowerCase().includes('yes') || response.toLowerCase().includes('review')) {
            addUserMessage('Yes, I want to review and select the data sources');
            setShowDataSelector(true);
            addAIMessage("Great! I've opened the data source selector below. Please check the boxes next to the data you want to include, then click 'Confirm Selection'.");
        } else {
            // Select all data sources
            setDataSources(prev => prev.map(ds => ({ ...ds, selected: true })));
            addUserMessage('Include all data sources');
            setTimeout(() => {
                startReportGeneration();
            }, 500);
        }
    };

    const startReportGeneration = () => {
        const selectedSources = dataSources.filter(ds => ds.selected);
        addAIMessage(`Excellent! I'll use ${selectedSources.length} data sources to generate your report. Let me start by asking you some questions about each section...\n\nFirst, let's talk about the **Introduction**. Can you tell me:\n1. What is the purpose of this assessment?\n2. Who commissioned the work?\n3. Are there any specific requirements or constraints I should mention?`);
        setConversationStage('section_generation');

        // Initialize report sections
        const sections: ReportSection[] = [
            { id: 'intro', title: 'Introduction', content: '', aiGenerated: false, userComments: '', dataSources: [] },
            { id: 'methodology', title: 'Methodology', content: '', aiGenerated: false, userComments: '', dataSources: ['field-1'] },
            { id: 'baseline', title: 'Baseline Conditions', content: '', aiGenerated: false, userComments: '', dataSources: ['gis-1', 'datamine-1', 'field-1'] },
            { id: 'assessment', title: 'Impact Assessment', content: '', aiGenerated: false, userComments: '', dataSources: ['impact-1', 'article17-1'] },
            { id: 'mitigation', title: 'Mitigation Measures', content: '', aiGenerated: false, userComments: '', dataSources: [] },
            { id: 'conclusion', title: 'Conclusions', content: '', aiGenerated: false, userComments: '', dataSources: [] }
        ];
        setReportSections(sections);
    };

    const handleUserMessage = () => {
        if (!currentMessage.trim()) return;

        addUserMessage(currentMessage);
        const message = currentMessage.toLowerCase();
        setCurrentMessage('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);

            switch (conversationStage) {
                case 'report_type':
                    handleReportTypeSelection(message);
                    break;
                case 'data_selection':
                    handleDataSelection(message);
                    break;
                case 'section_generation':
                    handleSectionGeneration(message);
                    break;
                default:
                    addAIMessage("I'm here to help! Let me know if you need anything.");
            }
        }, 1000);
    };

    const handleSectionGeneration = async (userInput: string) => {
        // AI generates content based on user input and selected data sources
        const selectedSources = dataSources.filter(ds => ds.selected);

        // Simulate AI generation
        addAIMessage(`Thank you for that information! I'm generating the Introduction section now using your input and data from ${selectedSources.map(s => s.name).join(', ')}...`);

        setTimeout(() => {
            const generatedContent = generateSectionContent('intro', userInput, selectedSources);

            setReportSections(prev => prev.map(section =>
                section.id === 'intro'
                    ? { ...section, content: generatedContent, aiGenerated: true }
                    : section
            ));

            addAIMessage(`I've generated the Introduction section! You can see it in the report preview on the left. Feel free to add your own comments or opinions in the "Your Comments" box below each section.\n\nNow, let's move on to the **Methodology** section. Can you tell me:\n1. What survey methods did you use?\n2. When were the surveys conducted?\n3. Were there any limitations or constraints during the surveys?`);
        }, 2000);
    };

    const generateSectionContent = (sectionId: string, userInput: string, dataSources: DataSource[]): string => {
        // Simulate AI content generation based on section type and data
        const templates: { [key: string]: string } = {
            intro: `This ecological assessment was conducted for ${userInput} at the request of the project commissioner. The assessment aims to evaluate the ecological value of the site and assess potential impacts from proposed development activities.\n\nThe site is located within the ${dataSources.find(d => d.type === 'datamine')?.data.sac || 'designated conservation area'}, which is of significant ecological importance. This report has been prepared in accordance with current best practice guidelines and relevant legislation including the EU Habitats Directive and the Wildlife Acts 1976-2018.`,

            methodology: `Field surveys were conducted on ${dataSources.find(d => d.type === 'field_survey')?.data.surveyDate} under ${dataSources.find(d => d.type === 'field_survey')?.data.weather} conditions. The survey methodology followed standard protocols for habitat and species assessment.\n\nThe site boundary of ${dataSources.find(d => d.type === 'gis')?.data.boundaries} was mapped using GIS. Habitats were classified according to the Heritage Council habitat classification system and assessed against Annex I habitat criteria. Structure and functions assessment followed the Article 17 methodology for EU reporting.`,

            baseline: `The site comprises ${dataSources.find(d => d.type === 'field_survey')?.data.habitats.join(', ')}. Based on the field survey, the following Annex I habitats were recorded:\n\n${dataSources.find(d => d.type === 'field_survey')?.data.habitats.map((h: string) => `• ${h}`).join('\n')}\n\nThe site is designated as ${dataSources.find(d => d.type === 'datamine')?.data.sac} with qualifying interests including ${dataSources.find(d => d.type === 'datamine')?.data.qualifyingInterests.join(', ')}. Conservation objectives for the site are to ${dataSources.find(d => d.type === 'datamine')?.data.conservationObjectives}.`,

            assessment: `Impact calculations were conducted for habitat ${dataSources.find(d => d.type === 'impact_calc')?.data.habitatCode}. The assessment found an overall conservation status of ${dataSources.find(d => d.type === 'impact_calc')?.data.overallStatus}, with ${dataSources.find(d => d.type === 'impact_calc')?.data.failedCriteria} criteria failing assessment thresholds.\n\nArticle 17 assessment results for ${dataSources.find(d => d.type === 'article17')?.data.habitatCode} in the ${dataSources.find(d => d.type === 'article17')?.data.bioRegion} biogeographical region show:\n• Range: ${dataSources.find(d => d.type === 'article17')?.data.range}\n• Area: ${dataSources.find(d => d.type === 'article17')?.data.area}\n• Structure & Functions: ${dataSources.find(d => d.type === 'article17')?.data.structure}\n• Future Prospects: ${dataSources.find(d => d.type === 'article17')?.data.futureProspects}\n• Overall Status: ${dataSources.find(d => d.type === 'article17')?.data.overallStatus}`,

            mitigation: `Based on the impact assessment findings, the following mitigation measures are recommended to minimize ecological impacts and maintain favourable conservation status:\n\n1. Timing of works: All construction activities should be scheduled outside the breeding bird season (March-August) to avoid disturbance to nesting birds.\n\n2. Habitat protection: Protective fencing should be installed around sensitive habitat areas identified in the survey to prevent accidental damage during construction.\n\n3. Erosion control: Silt fencing and appropriate drainage measures should be implemented to prevent sediment runoff into adjacent habitats.\n\n4. Monitoring: An Ecological Clerk of Works (ECoW) should be appointed to oversee all works and ensure compliance with mitigation measures.`,

            conclusion: `This ecological assessment has identified the presence of Annex I habitats and species of conservation importance within the survey area. The impact assessment indicates that the proposed development has the potential to affect these habitats, with a current conservation status of ${dataSources.find(d => d.type === 'impact_calc')?.data.overallStatus}.\n\nWith the implementation of the recommended mitigation measures and adherence to best practice guidelines, the predicted impacts can be reduced to acceptable levels. Ongoing monitoring during construction and operational phases will ensure that conservation objectives are maintained and any unforeseen impacts are identified and addressed promptly.`
        };

        return templates[sectionId] || 'Content pending user input...';
    };

    const toggleDataSource = (id: string) => {
        setDataSources(prev => prev.map(ds =>
            ds.id === id ? { ...ds, selected: !ds.selected } : ds
        ));
    };

    const confirmDataSelection = () => {
        const selectedCount = dataSources.filter(ds => ds.selected).length;
        setShowDataSelector(false);
        addUserMessage(`I've selected ${selectedCount} data sources`);
        setTimeout(() => {
            startReportGeneration();
        }, 500);
    };

    const updateSectionComment = (sectionId: string, comment: string) => {
        setReportSections(prev => prev.map(section =>
            section.id === sectionId ? { ...section, userComments: comment } : section
        ));
    };

    const regenerateSection = (sectionId: string) => {
        addAIMessage(`I'll regenerate the ${reportSections.find(s => s.id === sectionId)?.title} section. Please provide any additional guidance or information you'd like me to incorporate.`);
        setActiveSection(sectionId);
        messageInputRef.current?.focus();
    };

    const exportReport = () => {
        // Generate full report content
        let fullReport = `# ${REPORT_TYPES.find(rt => rt.id === reportType)?.name}\n\n`;
        fullReport += `**Project:** ${projects.find(p => p.id === selectedProjectId)?.name}\n`;
        fullReport += `**Generated:** ${new Date().toLocaleDateString()}\n\n---\n\n`;

        reportSections.forEach(section => {
            if (section.content) {
                fullReport += `## ${section.title}\n\n${section.content}\n\n`;
                if (section.userComments) {
                    fullReport += `**Ecologist's Comments:**\n${section.userComments}\n\n`;
                }
            }
        });

        // Download as text file
        const blob = new Blob([fullReport], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${reportType}-${Date.now()}.txt`;
        a.click();

        showToast?.('Report exported successfully!', 'success');
    };

    const getIconComponent = (iconName: string) => {
        const IconComponent = (Lucide as any)[iconName];
        return IconComponent ? <IconComponent className="w-5 h-5" /> : <Lucide.File className="w-5 h-5" />;
    };

    return (
        <div className="h-screen flex flex-col bg-background">
            {/* Header */}
            <div className="bg-surface border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary flex items-center">
                            <Lucide.Sparkles className="w-7 h-7 mr-3 text-accent" />
                            Intelligent Report Builder
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">AI-powered report generation with your data and expertise</p>
                    </div>
                    {selectedProjectId && (
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">
                                Project: <strong>{projects.find(p => p.id === selectedProjectId)?.name}</strong>
                            </span>
                            {reportType && (
                                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                    {REPORT_TYPES.find(rt => rt.id === reportType)?.name}
                                </span>
                            )}
                            {reportSections.some(s => s.content) && (
                                <button
                                    onClick={exportReport}
                                    className="bg-accent text-white px-4 py-2 rounded-md hover:bg-orange-500 flex items-center space-x-2"
                                >
                                    <Lucide.Download className="w-4 h-4" />
                                    <span>Export Report</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Report Preview */}
                <div className="flex-1 flex flex-col bg-white border-r overflow-hidden">
                    <div className="bg-gray-50 border-b px-6 py-3 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-700 flex items-center">
                            <Lucide.FileText className="w-5 h-5 mr-2 text-accent" />
                            Report Preview
                        </h3>
                        {reportSections.length > 0 && (
                            <span className="text-sm text-gray-500">
                                {reportSections.filter(s => s.content).length} / {reportSections.length} sections completed
                            </span>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {reportSections.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <Lucide.FileQuestion className="w-16 h-16 mb-4" />
                                <p className="text-lg">No report content yet</p>
                                <p className="text-sm">Select a project to begin</p>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto space-y-8">
                                {reportSections.map(section => (
                                    <div key={section.id} className="border rounded-lg overflow-hidden">
                                        <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                                            <h4 className="font-semibold text-gray-800">{section.title}</h4>
                                            <div className="flex items-center space-x-2">
                                                {section.aiGenerated && (
                                                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center">
                                                        <Lucide.Sparkles className="w-3 h-3 mr-1" />
                                                        AI Generated
                                                    </span>
                                                )}
                                                {section.content && (
                                                    <button
                                                        onClick={() => regenerateSection(section.id)}
                                                        className="text-xs text-gray-600 hover:text-accent flex items-center"
                                                    >
                                                        <Lucide.RefreshCw className="w-3 h-3 mr-1" />
                                                        Regenerate
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            {section.content ? (
                                                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                                                    {section.content}
                                                </div>
                                            ) : (
                                                <div className="text-gray-400 italic">Section pending...</div>
                                            )}

                                            {section.dataSources.length > 0 && (
                                                <div className="mt-4 pt-4 border-t">
                                                    <p className="text-xs text-gray-500 mb-2">Data sources used:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {section.dataSources.map(dsId => {
                                                            const ds = dataSources.find(d => d.id === dsId);
                                                            return ds ? (
                                                                <span key={dsId} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded flex items-center">
                                                                    {getIconComponent(ds.icon)}
                                                                    <span className="ml-1">{ds.name}</span>
                                                                </span>
                                                            ) : null;
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-4 pt-4 border-t">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Comments & Opinion
                                                </label>
                                                <textarea
                                                    value={section.userComments}
                                                    onChange={(e) => updateSectionComment(section.id, e.target.value)}
                                                    placeholder="Add your professional opinion, additional context, or modifications here..."
                                                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: AI Chat Assistant */}
                <div className="w-96 flex flex-col bg-surface">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                        <h3 className="font-semibold flex items-center">
                            <Lucide.Bot className="w-5 h-5 mr-2" />
                            AI Assistant
                        </h3>
                        <p className="text-xs text-blue-100 mt-1">I'll guide you through creating your report</p>
                    </div>

                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {!selectedProjectId && conversationStage === 'project_selection' && (
                            <div className="space-y-2">
                                {projects.map(project => (
                                    <button
                                        key={project.id}
                                        onClick={() => handleProjectSelection(project.id)}
                                        className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-accent hover:bg-blue-50 transition"
                                    >
                                        <p className="font-medium text-gray-800">{project.name}</p>
                                        <p className="text-xs text-gray-500">{project.client} • {project.code}</p>
                                    </button>
                                ))}
                            </div>
                        )}

                        {chatHistory.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-lg px-4 py-2 ${
                                        msg.sender === 'user'
                                            ? 'bg-accent text-white'
                                            : 'bg-white border border-gray-200 text-gray-800'
                                    }`}
                                >
                                    {msg.sender === 'ai' && (
                                        <div className="flex items-center mb-1">
                                            <Lucide.Bot className="w-4 h-4 text-blue-600 mr-1" />
                                            <span className="text-xs font-medium text-blue-600">AI</span>
                                        </div>
                                    )}
                                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* Data Source Selector */}
                    {showDataSelector && (
                        <div className="border-t bg-gray-50 p-4">
                            <h4 className="font-semibold text-sm text-gray-700 mb-3 flex items-center">
                                <Lucide.Database className="w-4 h-4 mr-2 text-accent" />
                                Select Data Sources
                            </h4>
                            <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
                                {dataSources.map(ds => (
                                    <label
                                        key={ds.id}
                                        className="flex items-start p-2 bg-white border rounded cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={ds.selected}
                                            onChange={() => toggleDataSource(ds.id)}
                                            className="mt-1 mr-3"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                {getIconComponent(ds.icon)}
                                                <span className="ml-2 font-medium text-sm text-gray-800">{ds.name}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Updated: {ds.lastUpdated}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <button
                                onClick={confirmDataSelection}
                                className="w-full bg-accent text-white py-2 rounded-md hover:bg-orange-500 flex items-center justify-center"
                            >
                                <Lucide.Check className="w-4 h-4 mr-2" />
                                Confirm Selection
                            </button>
                        </div>
                    )}

                    {/* Message Input */}
                    <div className="border-t p-4 bg-white">
                        <div className="flex space-x-2">
                            <input
                                ref={messageInputRef}
                                type="text"
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleUserMessage()}
                                placeholder="Type your response..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-accent focus:border-accent"
                                disabled={!selectedProjectId && conversationStage !== 'project_selection'}
                            />
                            <button
                                onClick={handleUserMessage}
                                disabled={!currentMessage.trim()}
                                className="bg-accent text-white px-4 py-2 rounded-md hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                <Lucide.Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {selectedProjectId ? 'Type your response and press Enter' : 'Select a project to begin'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntelligentReportingView;
