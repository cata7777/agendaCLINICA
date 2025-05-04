// src/components/portability/PortabilityDashboard.tsx
import React, { useState } from 'react';
import { usePortability } from './PortabilityContext';
import QRCodeGenerator from './QRCodeGenerator';
import QRCodeScanner from './QRCodeScanner';

const PortabilityDashboard: React.FC = () => {
  const { patientData, sharingOptions, updatePatientData, updateSharingOptions } = usePortability();
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');

  // Función para manejar cambios en los datos del paciente
  const handlePatientDataChange = (field: keyof typeof patientData, value: string) => {
    updatePatientData({ [field]: value });
  };

  // Función para manejar cambios en las opciones de compartir
  const handleSharingOptionChange = (option: keyof typeof sharingOptions) => {
    updateSharingOptions({ [option]: !sharingOptions[option] });
  };

  // Función para agregar un nuevo diagnóstico
  const handleAddDiagnosis = (diagnosis: string) => {
    if (diagnosis.trim()) {
      updatePatientData({
        diagnoses: [...patientData.diagnoses, diagnosis.trim()]
      });
    }
  };

  // Función para agregar un nuevo tratamiento
  const handleAddTreatment = (treatment: string) => {
    if (treatment.trim()) {
      updatePatientData({
        treatments: [...patientData.treatments, treatment.trim()]
      });
    }
  };

  // Función para agregar una nueva nota
  const handleAddNote = (note: string) => {
    if (note.trim()) {
      updatePatientData({
        notes: [...patientData.notes, note.trim()]
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Sistema de Portabilidad de Datos Clínicos</h1>
      
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'generate' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('generate')}
          >
            Generar Código QR
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'scan' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('scan')}
          >
            Escanear Código QR
          </button>
        </div>
      </div>
      
      {activeTab === 'generate' ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Información del Paciente</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    value={patientData.name}
                    onChange={(e) => handlePatientDataChange('name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
                  <input
                    type="text"
                    value={patientData.rut}
                    onChange={(e) => handlePatientDataChange('rut', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diagnósticos</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="diagnosis-input"
                      className="flex-grow p-2 border border-gray-300 rounded-l-md"
                      placeholder="Agregar diagnóstico"
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('diagnosis-input') as HTMLInputElement;
                        handleAddDiagnosis(input.value);
                        input.value = '';
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                    >
                      Agregar
                    </button>
                  </div>
                  <ul className="list-disc pl-5">
                    {patientData.diagnoses.map((diagnosis, index) => (
                      <li key={index}>{diagnosis}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tratamientos</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="treatment-input"
                      className="flex-grow p-2 border border-gray-300 rounded-l-md"
                      placeholder="Agregar tratamiento"
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('treatment-input') as HTMLInputElement;
                        handleAddTreatment(input.value);
                        input.value = '';
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                    >
                      Agregar
                    </button>
                  </div>
                  <ul className="list-disc pl-5">
                    {patientData.treatments.map((treatment, index) => (
                      <li key={index}>{treatment}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas Clínicas</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="note-input"
                      className="flex-grow p-2 border border-gray-300 rounded-l-md"
                      placeholder="Agregar nota"
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('note-input') as HTMLInputElement;
                        handleAddNote(input.value);
                        input.value = '';
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                    >
                      Agregar
                    </button>
                  </div>
                  <ul className="list-disc pl-5">
                    {patientData.notes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Opciones de Compartir</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="shareBasicInfo"
                    checked={sharingOptions.shareBasicInfo}
                    onChange={() => handleSharingOptionChange('shareBasicInfo')}
                    className="mr-2"
                  />
                  <label htmlFor="shareBasicInfo">Información básica (nombre, RUT)</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="shareDiagnoses"
                    checked={sharingOptions.shareDiagnoses}
                    onChange={() => handleSharingOptionChange('shareDiagnoses')}
                    className="mr-2"
                  />
                  <label htmlFor="shareDiagnoses">Diagnósticos</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="shareTreatments"
                    checked={sharingOptions.shareTreatments}
                    onChange={() => handleSharingOptionChange('shareTreatments')}
                    className="mr-2"
                  />
                  <label htmlFor="shareTreatments">Tratamientos</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="shareNotes"
                    checked={sharingOptions.shareNotes}
                    onChange={() => handleSharingOptionChange('shareNotes')}
                    className="mr-2"
                  />
                  <label htmlFor="shareNotes">Notas clínicas</label>
                </div>
              </div>
              
              <QRCodeGenerator patientData={patientData} sharingOptions={sharingOptions} />
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Acerca de la Portabilidad de Datos</h3>
            <p className="text-sm text-blue-700">
              Este sistema te permite compartir tu información clínica de manera segura con otros profesionales de la salud.
              Tú decides qué información compartir y cuándo hacerlo. El código QR generado expira después de 24 horas por seguridad.
              Recuerda que eres dueño de tu información y tienes control total sobre ella.
            </p>
          </div>
        </div>
      ) : (
        <QRCodeScanner />
      )}
    </div>
  );
};

export default PortabilityDashboard;
