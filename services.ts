
import type { Project, Survey, SurveyTemplate } from './types';

// Declare global variables from CDN scripts
declare var docx: any;
declare var saveAs: any;
declare var Chart: any;
declare var ChartDataLabels: any;
declare var GoogleGenAI: any;

// --- Gemini API Service ---
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API will not function.");
}
const ai = typeof GoogleGenAI !== 'undefined' ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateAiReportContent = async (
  project: Project,
  surveys: Survey[],
  currentReport: string,
  prompt: string
): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API Key not configured. Please set the API_KEY environment variable.");
  }

  const model = "gemini-2.5-flash";
  const fullPrompt = `
    You are an AI assistant helping an ecologist write a report for a project called "${project.name}".
    Here is the project's survey data:
    ${surveys.map(s => `- ${s.siteName}: Status ${s.status}, Template ${s.template}, Data: ${JSON.stringify(s.data)}`).join('\n')}
    
    Here is the current draft of the report:
    ---
    ${currentReport}
    ---
    
    The user wants you to perform the following action: "${prompt}".
    
    Please provide the updated full report content based on this request. Output only the report content in markdown format.
  `;

  try {
    if (!ai) {
      return "AI service not available. Please configure the Gemini API key.";
    }
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return "There was an error generating the report. Please check the console for details.";
  }
};


// --- Utility Functions ---

export const parseCsv = (csvString: string): any[] => {
  const rows = csvString.trim().split('\n');
  if (rows.length < 2) return [];
  const headers = rows.shift()!.split(',').map(h => h.trim().replace(/\s+/g, ''));
  return rows.map(row => {
    const values = row.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] ? values[index].trim() : '';
      return obj;
    }, {} as { [key: string]: string });
  });
};

export const getStatusColorClass = (status?: string): string => {
  if (!status) return 'bg-gray-100 text-gray-800';
  const lowerStatus = status.toLowerCase();
  if (lowerStatus === 'completed' || lowerStatus.includes('favourable')) return 'bg-green-100 text-green-800';
  if (lowerStatus === 'in progress') return 'bg-blue-100 text-blue-800';
  if (lowerStatus === 'pending' || lowerStatus.includes('inadequate')) return 'bg-yellow-100 text-yellow-800';
  if (lowerStatus === 'not assigned') return 'bg-gray-100 text-gray-800';
  if (lowerStatus.includes('bad')) return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};

export const generateReport = (survey: Survey, project: Project, template: SurveyTemplate) => {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = docx;

    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({ text: template.name, heading: HeadingLevel.TITLE }),
                new Paragraph({ text: `Project: ${project.name}`, style: "IntenseQuote" }),
                new Paragraph({ text: `Client: ${project.client}`, style: "IntenseQuote" }),
                new Paragraph({ text: `Survey Site: ${survey.siteName}`, style: "IntenseQuote" }),
                new Paragraph({ text: `Date: ${new Date().toLocaleDateString('en-IE')}`, style: "IntenseQuote" }),
                
                new Paragraph({ text: "1.0 Desk Study", heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
                new Paragraph("A desk-based study was undertaken to identify ecological features within the study area. (Note: Prototype uses placeholder text)."),

                new Paragraph({ text: "2.0 Field Survey Results", heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
                new Paragraph({ text: "2.1 Habitats", heading: HeadingLevel.HEADING_2, spacing: { before: 200 } }),
                new Paragraph({ children: [new TextRun({ text: "Habitat Type: ", bold: true }), new TextRun(survey.data.habitat || 'N/A')] }),
                new Paragraph({ children: [new TextRun({ text: "Condition Notes: ", bold: true }), new TextRun(survey.data.notes || 'N/A')] }),

                new Paragraph({ text: "2.2 Species", heading: HeadingLevel.HEADING_2, spacing: { before: 200 } }),
                new Paragraph({ children: [new TextRun({ text: "Species Observed: ", bold: true }), new TextRun(survey.data.species || 'None recorded.')] }),
                new Paragraph({ children: [new TextRun({ text: "Notes: ", bold: true }), new TextRun(survey.data.speciesNotes || 'N/A')] }),
                
                new Paragraph({ text: "3.0 Photographic Record", heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
                new Paragraph("The following photograph was taken on-site:"),
                new Paragraph({
                    children: [ new TextRun(`[Image placeholder: A photo was captured for ${survey.siteName}]`)]
                }),
            ],
        }],
    });

    Packer.toBlob(doc).then((blob: Blob) => {
        saveAs(blob, `${project.code}_${template.id}_Report.docx`);
    });
};

export const registerChartPlugins = () => {
    if (Chart && ChartDataLabels) {
        Chart.register(ChartDataLabels);
    }
};
