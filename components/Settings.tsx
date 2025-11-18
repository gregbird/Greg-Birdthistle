
import React from 'react';
import * as Lucide from 'lucide-react';
import { gisFields } from '../constants';

const SettingsView: React.FC = () => {
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [toolName, setToolName] = React.useState('');

    const showConnection = (name: string) => {
        setToolName(name);
        setIsConnecting(true);
    };
    
    const showInitialChoice = () => {
        setIsConnecting(false);
        setToolName('');
    }

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-secondary">Settings</h2>
            
            <div className="mt-8 bg-surface p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-secondary mb-1">GIS Integration</h3>
                <p className="text-gray-500 mt-1">Connect to your preferred GIS tool to import site boundaries.</p>

                {!isConnecting ? (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div onClick={() => showConnection('ArcGIS')} className="border p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/ArcGIS_logo.png/220px-ArcGIS_logo.png" alt="ArcGIS Logo" className="h-16 mb-4"/>
                            <h3 className="font-bold text-lg">ArcGIS</h3>
                        </div>
                        <div onClick={() => showConnection('QGIS')} className="border p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/QGIS_Logo_new.svg/200px-QGIS_Logo_new.svg.png" alt="QGIS Logo" className="h-16 mb-4"/>
                            <h3 className="font-bold text-lg">QGIS</h3>
                        </div>
                         <div onClick={() => showConnection('Other GIS')} className="border p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center">
                             <Lucide.UploadCloud className="w-16 h-16 text-accent mb-4" />
                            <h3 className="font-bold text-lg">Upload File</h3>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6">
                        <button onClick={showInitialChoice} className="text-sm text-accent mb-4 flex items-center space-x-1">
                            <Lucide.ArrowLeft className="w-4 h-4" /><span>Back to GIS Options</span>
                        </button>
                        <h3 className="text-2xl font-bold mb-4">Connect to {toolName}</h3>
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Select Fields to Extract</h4>
                            <div className="mt-2 space-y-3 max-h-64 overflow-y-auto p-4 border rounded-md bg-gray-50">
                                {gisFields.map(field => (
                                    <div key={field.id} className="relative flex items-start">
                                        <div className="flex h-5 items-center"><input id={field.id} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" defaultChecked/></div>
                                        <div className="ml-3 text-sm"><label htmlFor={field.id} className="font-medium">{field.name}</label><p className="text-gray-500">{field.description}</p></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-accent text-white py-2 px-4 rounded-md hover:bg-orange-500 flex items-center space-x-2">
                                    <Lucide.Link className="w-5 h-5" />
                                    <span>Connect & Extract Data</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsView;
