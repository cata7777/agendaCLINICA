// src/app/ficha-clinica/page.tsx
import React from 'react';
import AutosaveForm from '../../components/clinical/AutosaveForm';

export default function ClinicalRecordPage() {
  // En una implementación real, esta función enviaría los datos al servidor
  const handleSave = async (data: Record<string, any>) => {
    console.log('Guardando datos:', data);
    // Simulamos una operación asíncrona
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  // Datos de ejemplo para la ficha
  const initialData = {
    patientName: 'María González',
    diagnosis: 'Trastorno de Ansiedad Generalizada',
    sessionNotes: 'La paciente reporta mejora en síntomas de ansiedad tras implementar técnicas de respiración y mindfulness. Continúa experimentando dificultades en situaciones sociales.',
    treatmentPlan: 'Continuar con exposición gradual a situaciones sociales. Mantener práctica diaria de mindfulness. Revisar medicación en próxima sesión.'
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Sistema de Ficha Clínica con Autoguardado</h1>
      
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
        <h2 className="font-semibold text-yellow-800 mb-2">Acerca del Sistema de Autoguardado</h2>
        <p className="text-sm text-yellow-700">
          Este sistema guarda automáticamente la información de la ficha clínica cada 30 segundos cuando hay cambios sin guardar.
          También guarda automáticamente si intentas cerrar la página o si ocurre un corte de energía.
          Esto evita la pérdida de información y te permite concentrarte en la atención al paciente.
        </p>
      </div>
      
      <AutosaveForm 
        initialData={initialData}
        onSave={handleSave}
        saveInterval={30000} // 30 segundos
        formId="clinical-record-form"
      />
    </div>
  );
}
