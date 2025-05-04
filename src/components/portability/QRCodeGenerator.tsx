// src/components/portability/QRCodeGenerator.tsx
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  patientData: {
    id: string;
    name: string;
    rut: string;
    diagnoses: string[];
    treatments: string[];
    notes: string[];
  };
  sharingOptions: {
    shareBasicInfo: boolean;
    shareDiagnoses: boolean;
    shareTreatments: boolean;
    shareNotes: boolean;
  };
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ patientData, sharingOptions }) => {
  const [qrValue, setQrValue] = useState<string>('');
  
  const generateQRCode = () => {
    // Filtrar la información según las opciones de compartir
    const dataToShare = {
      id: patientData.id,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
      data: {
        ...(sharingOptions.shareBasicInfo && {
          name: patientData.name,
          rut: patientData.rut
        }),
        ...(sharingOptions.shareDiagnoses && {
          diagnoses: patientData.diagnoses
        }),
        ...(sharingOptions.shareTreatments && {
          treatments: patientData.treatments
        }),
        ...(sharingOptions.shareNotes && {
          notes: patientData.notes
        })
      }
    };
    
    // Convertir a JSON y codificar para el QR
    const jsonData = JSON.stringify(dataToShare);
    setQrValue(jsonData);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Generador de Código QR para Portabilidad</h2>
      
      <div className="mb-4">
        <p className="text-gray-700 mb-2">Selecciona la información que deseas compartir:</p>
        <div className="space-y-2">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="shareBasicInfo" 
              className="mr-2"
              checked={sharingOptions.shareBasicInfo}
              readOnly
            />
            <label htmlFor="shareBasicInfo">Información básica (nombre, RUT)</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="shareDiagnoses" 
              className="mr-2"
              checked={sharingOptions.shareDiagnoses}
              readOnly
            />
            <label htmlFor="shareDiagnoses">Diagnósticos</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="shareTreatments" 
              className="mr-2"
              checked={sharingOptions.shareTreatments}
              readOnly
            />
            <label htmlFor="shareTreatments">Tratamientos</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="shareNotes" 
              className="mr-2"
              checked={sharingOptions.shareNotes}
              readOnly
            />
            <label htmlFor="shareNotes">Notas clínicas</label>
          </div>
        </div>
      </div>
      
      <button 
        onClick={generateQRCode}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
      >
        Generar Código QR
      </button>
      
      {qrValue && (
        <div className="flex flex-col items-center">
          <div className="border p-4 rounded-md bg-gray-50">
            <QRCodeSVG value={qrValue} size={200} />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Este código QR expirará en 24 horas por seguridad
          </p>
          <button 
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={() => {
              // En una implementación real, aquí iría la lógica para descargar el QR
              alert('Funcionalidad de descarga en desarrollo');
            }}
          >
            Descargar Código QR
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
