import React from 'react';
import { ViewType, ViewState, Project } from '../types';
import * as Lucide from 'lucide-react';

const EiarEditor: React.FC<{ project: Project, onSave: () => void }> = ({ project, onSave }) => (
  <div className="p-4 md:p-8">
    <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-4 mb-6 -mx-8 px-8 flex justify-between items-center border-b border-gray-200">
      <div>
        <h2 className="text-2xl font-bold text-secondary">EIAR Editor</h2>
        <p className="text-gray-500 mt-1">Project: {project.name}</p>
      </div>
      <button onClick={onSave} className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center space-x-2">
        <Lucide.Save className="w-5 h-5" />
        <span>Save and Continue</span>
      </button>
    </div>
    <div className="bg-surface p-6 md:p-8 rounded-lg shadow-md space-y-8">
      {/* Chapters */}
      {[
        'Chapter 1: Introduction', 'Chapter 2: Background & Need for the Project', 'Chapter 3: Consideration of Reasonable Alternatives', 
        'Chapter 4: Description of the Proposed Development', 'Chapter 5: Population & Human Health',
        'Chapter 6: Biodiversity (Ecology)', 'Chapter 7: Ornithology', 'Chapter 8: Land, Soils & Geology',
        'Chapter 9: Water (Hydrology & Hydrogeology)', 'Chapter 10: Air & Climate', 'Chapter 11: Noise & Vibration',
        'Chapter 12: Landscape & Visual Impact', 'Chapter 13: Cultural Heritage & Archaeology', 'Chapter 14: Material Assets',
        'Chapter 15: Interactions & Cumulative Effects', 'Volume 3: Appendices'
      ].map(chapter => (
        <div key={chapter}>
          <h3 contentEditable="true" suppressContentEditableWarning={true} className="text-xl font-bold text-secondary focus:outline-accent p-1">{chapter}</h3>
          <textarea className="w-full mt-2 p-3 border rounded-md focus:ring-accent focus:border-accent bg-white" rows={6} placeholder={`Content for ${chapter}...`}></textarea>
        </div>
      ))}
    </div>
  </div>
);

const EcowEditor: React.FC<{ project: Project, onSave: () => void }> = ({ project, onSave }) => (
    <div className="p-4 md:p-8">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-4 mb-6 -mx-8 px-8 flex justify-between items-center border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-secondary">ECoW Report Editor</h2>
          <p className="text-gray-500 mt-1">Project: {project.name}</p>
        </div>
        <button onClick={onSave} className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center space-x-2">
          <Lucide.Save className="w-5 h-5" />
          <span>Save and Continue</span>
        </button>
      </div>
      <div className="bg-surface p-6 md:p-8 rounded-lg shadow-md space-y-8">
        {[
          '1. Project Details', '2. Monitoring Activities', '3. Compliance & Incidents', '4. Recommendations'
        ].map(section => (
          <div key={section}>
            <h3 contentEditable="true" suppressContentEditableWarning={true} className="text-xl font-bold text-secondary focus:outline-accent p-1">{section}</h3>
            <textarea className="w-full mt-2 p-3 border rounded-md focus:ring-accent focus:border-accent bg-white" rows={4} placeholder={`Content for ${section}...`}></textarea>
          </div>
        ))}
      </div>
    </div>
);

const TemplateEditor: React.FC<{ setView: (view: ViewState) => void, showToast: (message: string) => void }> = ({ setView, showToast }) => {
  const [elements, setElements] = React.useState([
    { type: 'heading', content: 'Custom Heading 1' },
    { type: 'paragraph', content: 'This is an editable paragraph. You can add your own content here.' }
  ]);

  const addElement = (type: 'heading' | 'paragraph') => {
    const newElement = type === 'heading' 
      ? { type, content: 'New Editable Heading' }
      : { type, content: 'New editable paragraph. Start typing...' };
    setElements([...elements, newElement]);
  };
  
  const saveTemplate = () => {
    showToast('Custom template saved!');
    setView({ view: ViewType.SurveyTemplates });
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button onClick={() => setView({ view: ViewType.SurveyTemplates })} className="text-sm text-accent mb-2 flex items-center space-x-1">
            <Lucide.ArrowLeft className="w-4 h-4" />
            <span>Back to Templates</span>
          </button>
          <h2 className="text-3xl font-bold text-secondary">Custom Template Editor</h2>
        </div>
        <button onClick={saveTemplate} className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center space-x-2">
          <Lucide.Save className="w-5 h-5" />
          <span>Save Template</span>
        </button>
      </div>
      <div className="bg-surface p-6 md:p-8 rounded-lg shadow-md">
        <div className="border-b pb-4 mb-4 flex items-center space-x-2">
          <button onClick={() => addElement('heading')} className="bg-gray-200 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-300 text-sm flex items-center space-x-1">
            <Lucide.Heading1 className="w-4 h-4" /><span>Add Heading</span>
          </button>
          <button onClick={() => addElement('paragraph')} className="bg-gray-200 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-300 text-sm flex items-center space-x-1">
            <Lucide.Pilcrow className="w-4 h-4" /><span>Add Paragraph</span>
          </button>
        </div>
        <div className="space-y-4">
          {elements.map((el, index) => (
            el.type === 'heading' ? 
              <h3 key={index} contentEditable suppressContentEditableWarning className="text-xl font-bold text-secondary focus:outline-accent p-2 rounded-md">{el.content}</h3> :
              <p key={index} contentEditable suppressContentEditableWarning className="text-gray-700 focus:outline-accent p-2 rounded-md">{el.content}</p>
          ))}
        </div>
      </div>
    </div>
  );
};


interface EditorsViewProps {
  viewState: ViewState;
  projects: Project[];
  setView: (view: ViewState) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const EditorsView: React.FC<EditorsViewProps> = ({ viewState, projects, setView, showToast }) => {
  const { view, param } = viewState;
  
  const handleSave = () => {
    showToast('Content saved successfully!');
    setView({ view: ViewType.ProjectDetail, param: param.projectId });
  };
  
  if (view === ViewType.TemplateEditor) {
    return <TemplateEditor setView={setView} showToast={(msg) => showToast(msg)} />;
  }

  const project = projects.find(p => p.id === param.projectId);
  if (!project) return <div>Project not found. <button onClick={() => setView({view: ViewType.MySurveys})}>Go back</button></div>;

  switch(view) {
    case ViewType.EiarEditor:
      return <EiarEditor project={project} onSave={handleSave} />;
    case ViewType.EcowEditor:
      return <EcowEditor project={project} onSave={handleSave} />;
    default:
      return <div>Invalid editor view</div>;
  }
};

export default EditorsView;