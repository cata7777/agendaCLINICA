// src/components/portability/QRCodeScanner.tsx
import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

interface PatientData {
  id: string;
  timestamp: string;
  expiresAt: string;
  data: {
    name?: string;
    rut?: string;
    diagnoses?: string[];
    treatments?: string[];
    notes?: string[];
  };
}

const QRCodeScanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<PatientData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    // Cleanup function to stop scanning when component unmounts
    return () => {
      codeReader.current.reset();
    };
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    setError(null);
    setScannedData(null);
    setIsExpired(false);

    try {
      const videoInputDevices = await codeReader.current.listVideoInputDevices();
      if (videoInputDevices.length === 0) {
        setError('No se encontraron cámaras disponibles.');
        setIsScanning(false);
        return;
      }

      // Use the first available camera
      const firstDeviceId = videoInputDevices[0].deviceId;

      if (videoRef.current) {
        codeReader.current.decodeFromVideoDevice(firstDeviceId, videoRef.current, (result, err) => {
          if (result) {
            try {
              const parsedData: PatientData = JSON.parse(result.getText());
              
              // Verificar si el código QR ha expirado
              const expiryDate = new Date(parsedData.expiresAt);
              const now = new Date();
              
              if (now > expiryDate) {
                setIsExpired(true);
                setError('Este código QR ha expirado. Por favor, solicite uno nuevo al paciente.');
                setScannedData(null);
              } else {
                setScannedData(parsedData);
                setError(null);
                setIsExpired(false);
              }
            } catch (parseErr) {
              setError('Formato de QR inválido. Este código no contiene información clínica válida.');
              setScannedData(null);
            }
            // Stop scanning after a successful read or error
            codeReader.current.reset();
            setIsScanning(false);
          } else if (err && !(err instanceof NotFoundException)) {
            // Ignore NotFoundException, which happens when no QR code is found in the frame
            setError(`Error al escanear: ${err.message}`);
            codeReader.current.reset();
            setIsScanning(false);
          }
        });
      }
    } catch (err: any) {
      setError(`Error al iniciar el escáner: ${err.message}`);
      setIsScanning(false);
    }
  };

  const stopScan = () => {
    codeReader.current.reset();
    setIsScanning(false);
  };

  const importPatientData = () => {
    // En una implementación real, aquí iría la lógica para importar los datos al sistema
    alert('Funcionalidad de importación en desarrollo');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Escáner de Código QR para Portabilidad</h2>

      {!isScanning && (
        <button 
          onClick={startScan}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
        >
          Iniciar Escaneo con Cámara
        </button>
      )}

      {isScanning && (
        <div className="mb-4">
          <video ref={videoRef} className="w-full max-w-md mx-auto border rounded-md" />
          <button 
            onClick={stopScan}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Detener Escaneo
          </button>
          <p className="text-sm text-gray-500 mt-2">Apunte la cámara al código QR...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {scannedData && !isExpired && (
        <div className="border rounded-md p-4 bg-gray-50 mb-4">
          <h3 className="font-bold text-lg mb-2">Información del Paciente Escaneada</h3>
          
          {scannedData.data.name && (
            <div className="mb-2">
              <span className="font-medium">Nombre:</span> {scannedData.data.name}
            </div>
          )}
          
          {scannedData.data.rut && (
            <div className="mb-2">
              <span className="font-medium">RUT:</span> {scannedData.data.rut}
            </div>
          )}
          
          {scannedData.data.diagnoses && scannedData.data.diagnoses.length > 0 && (
            <div className="mb-2">
              <span className="font-medium">Diagnósticos:</span>
              <ul className="list-disc pl-5">
                {scannedData.data.diagnoses.map((diagnosis, index) => (
                  <li key={index}>{diagnosis}</li>
                ))}
              </ul>
            </div>
          )}
          
          {scannedData.data.treatments && scannedData.data.treatments.length > 0 && (
            <div className="mb-2">
              <span className="font-medium">Tratamientos:</span>
              <ul className="list-disc pl-5">
                {scannedData.data.treatments.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </div>
          )}
          
          {scannedData.data.notes && scannedData.data.notes.length > 0 && (
            <div className="mb-2">
              <span className="font-medium">Notas Clínicas:</span>
              <ul className="list-disc pl-5">
                {scannedData.data.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="text-sm text-gray-500 mt-2">
            <p>Código generado: {new Date(scannedData.timestamp).toLocaleString()}</p>
            <p>Expira: {new Date(scannedData.expiresAt).toLocaleString()}</p>
          </div>
          
          <button 
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={importPatientData}
          >
            Importar Datos del Paciente
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;

