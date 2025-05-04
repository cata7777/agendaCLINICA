// src/components/portability/PortabilityContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir la estructura de los datos del paciente
interface PatientData {
  id: string;
  name: string;
  rut: string;
  diagnoses: string[];
  treatments: string[];
  notes: string[];
}

// Definir la estructura de las opciones de compartir
interface SharingOptions {
  shareBasicInfo: boolean;
  shareDiagnoses: boolean;
  shareTreatments: boolean;
  shareNotes: boolean;
}

// Definir la estructura del contexto
interface PortabilityContextType {
  patientData: PatientData;
  sharingOptions: SharingOptions;
  updatePatientData: (data: Partial<PatientData>) => void;
  updateSharingOptions: (options: Partial<SharingOptions>) => void;
  importedData: PatientData | null;
  setImportedData: (data: PatientData | null) => void;
}

// Crear el contexto con valores por defecto
const PortabilityContext = createContext<PortabilityContextType | undefined>(undefined);

// Proveedor del contexto
export const PortabilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para los datos del paciente
  const [patientData, setPatientData] = useState<PatientData>({
    id: '',
    name: '',
    rut: '',
    diagnoses: [],
    treatments: [],
    notes: []
  });

  // Estado para las opciones de compartir
  const [sharingOptions, setSharingOptions] = useState<SharingOptions>({
    shareBasicInfo: true,
    shareDiagnoses: false,
    shareTreatments: false,
    shareNotes: false
  });

  // Estado para los datos importados
  const [importedData, setImportedData] = useState<PatientData | null>(null);

  // Función para actualizar los datos del paciente
  const updatePatientData = (data: Partial<PatientData>) => {
    setPatientData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Función para actualizar las opciones de compartir
  const updateSharingOptions = (options: Partial<SharingOptions>) => {
    setSharingOptions(prevOptions => ({
      ...prevOptions,
      ...options
    }));
  };

  // Valor del contexto
  const value = {
    patientData,
    sharingOptions,
    updatePatientData,
    updateSharingOptions,
    importedData,
    setImportedData
  };

  return (
    <PortabilityContext.Provider value={value}>
      {children}
    </PortabilityContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const usePortability = () => {
  const context = useContext(PortabilityContext);
  if (context === undefined) {
    throw new Error('usePortability debe ser usado dentro de un PortabilityProvider');
  }
  return context;
};
