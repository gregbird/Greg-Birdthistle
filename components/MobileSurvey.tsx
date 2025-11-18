import React, { useState, useEffect } from 'react';
import type { Survey, Project } from '../types';
import * as Lucide from 'lucide-react';
import { surveyTemplates } from '../constants';

interface MobileSurveyViewProps {
  surveyId: number | null;
  surveys: Survey[];
  projects: Project[];
  updateSurvey: (survey: Survey) => void;
}

const MobileSurveyView: React.FC<MobileSurveyViewProps> = ({ surveyId, surveys, projects, updateSurvey }) => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [template, setTemplate] = useState<any>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (surveyId) {
      const currentSurvey = surveys.find(s => s.id === surveyId);
      if (currentSurvey) {
        setSurvey(currentSurvey);
        const currentProject = projects.find(p => p.id === currentSurvey.projectId);
        setProject(currentProject || null);
        const currentTemplate = surveyTemplates.find(t => t.id === currentSurvey.template);
        setTemplate(currentTemplate || null);
      }
    }
  }, [surveyId, surveys, projects]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (survey) {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const updatedSurvey = {
            ...survey,
            status: 'Completed' as const,
            data: {
                habitat: formData.get('habitat-type') as string,
                notes: formData.get('habitat-notes') as string,
                species: formData.get('species-observed') as string,
                speciesNotes: formData.get('species-notes') as string,
                photo: photoPreview || survey.data.photo,
            }
        };
        updateSurvey(updatedSurvey);
        setIsSubmitted(true);
    }
  };

  if (!survey || !project || !template) {
    return (
      <div className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
            <Lucide.Loader className="w-12 h-12 text-gray-400 animate-spin mx-auto"/>
            <p className="mt-2 text-gray-500">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
        <div className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl mx-auto bg-surface p-6 rounded-lg shadow-md">
                <div className="text-center py-10">
                    <Lucide.CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-secondary">Survey Submitted</h2>
                    <p className="text-gray-600 mt-2">Thank you. Your data has been successfully recorded.</p>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="w-full max-w-2xl mx-auto bg-surface p-6 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-secondary">{template.name}</h2>
          <p className="text-gray-600">{project.name}</p>
          <p className="text-sm text-gray-500">{survey.siteName}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form fields */}
            <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">Habitat Mapping</label>
                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    <div>
                        <label htmlFor="habitat-type" className="block text-sm font-medium text-gray-600 mb-1">Habitat Type</label>
                        <select id="habitat-type" name="habitat-type" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" required>
                            <option>GS2 - Dry meadows and grassy verges</option>
                            <option>WL1 - Hedgerows</option>
                            <option>WD1 - Oak-birch-holly woodland</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="habitat-notes" className="block text-sm font-medium text-gray-600 mb-1">Notes on Habitat Condition</label>
                        <textarea id="habitat-notes" name="habitat-notes" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"></textarea>
                    </div>
                </div>
            </div>
            {/* Photo Upload */}
            <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-2">GPS-tagged Photos</label>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                    <input type="file" id="photo-upload" className="hidden" accept="image/*" onChange={handlePhotoChange}/>
                    <label htmlFor="photo-upload" className="cursor-pointer bg-white border border-gray-300 rounded-md p-4 flex flex-col items-center">
                        <Lucide.Camera className="w-10 h-10 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-accent">Add Photo</span>
                    </label>
                    {photoPreview && <div className="mt-4"><img src={photoPreview} alt="Preview" className="max-h-40 rounded-md mx-auto"/></div>}
                </div>
            </div>

          <button type="submit" className="w-full bg-accent text-white py-3 px-4 rounded-md hover:bg-orange-500 font-semibold">Submit Survey Data</button>
        </form>
      </div>
    </div>
  );
};

export default MobileSurveyView;