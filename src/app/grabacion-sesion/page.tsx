// src/app/grabacion-sesion/page.tsx
import React from 'react';
import SessionRecorder from '../../components/clinical/SessionRecorder';
import AutosaveForm from '../../components/clinical/AutosaveForm';

export default function SessionRecordingPage() {
  // En una implementación real, esta función enviaría los datos al servidor
  const handleSave = async (data: Record<string, any>) => {
    console.log('Guardando datos:', data);
    // Simulamos una operación asíncrona
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  // Función para manejar la transcripción completada
  const handleTranscriptionComplete = (transcription: string) => {
    // En una implementación real, esto actualizaría el formulario con la transcripción
    console.log('Transcripción completada:', transcription);
    // Aquí se podría actualizar el estado global o enviar la transcripción al servidor
  };

  // Datos iniciales vacíos para el formulario
  const initialData = {
    patientName: '',
    diagnosis: '',
    sessionNotes: '',
    treatmentPlan: ''
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Grabación y Transcripción de Sesiones</h1>
      
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
        <h2 className="font-semibold text-yellow-800 mb-2">Acerca de esta Funcionalidad</h2>
        <p className="text-sm text-yellow-700">
          Esta funcionalidad innovadora te permite concentrarte completamente en tu paciente durante la sesión,
          sin preocuparte por tomar notas. Graba la sesión (con consentimiento del paciente), obtén una transcripción
          automática y utilízala para completar la ficha clínica.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SessionRecorder onTranscriptionComplete={handleTranscriptionComplete} />
        </div>
        
        <div>
          <AutosaveForm 
            initialData={initialData}
            onSave={handleSave}
            saveInterval={30000} // 30 segundos
            formId="session-notes-form"
          />
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Flujo de Trabajo Recomendado</h3>
        <ol className="list-decimal pl-5 text-sm text-blue-700 space-y-2">
          <li>Obtén el consentimiento explícito del paciente para grabar la sesión</li>
          <li>Inicia la grabación al comenzar la sesión</li>
          <li>Concéntrate completamente en tu paciente durante la sesión</li>
          <li>Detén la grabación al finalizar</li>
          <li>Transcribe automáticamente el audio</li>
          <li>Utiliza la transcripción para completar la ficha clínica</li>
          <li>Edita según sea necesario y guarda la ficha</li>
        </ol>
      </div>
    </div>
  );
}
