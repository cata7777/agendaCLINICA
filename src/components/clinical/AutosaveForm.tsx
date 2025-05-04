// src/components/clinical/AutosaveForm.tsx
import React, { useState, useEffect } from 'react';

interface AutosaveFormProps {
  initialData?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
  saveInterval?: number; // en milisegundos
  formId: string;
}

const AutosaveForm: React.FC<AutosaveFormProps> = ({
  initialData = {},
  onSave,
  saveInterval = 30000, // 30 segundos por defecto
  formId
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Efecto para autoguardado periódico
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (hasUnsavedChanges) {
        saveData();
      }
    }, saveInterval);

    // Limpiar intervalo al desmontar
    return () => clearInterval(intervalId);
  }, [formData, hasUnsavedChanges, saveInterval]);

  // Efecto para guardar al cerrar/recargar la página
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        saveData();
        // Mensaje estándar de confirmación (el texto real lo controla el navegador)
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, hasUnsavedChanges]);

  // Función para guardar datos
  const saveData = async () => {
    setIsSaving(true);
    try {
      // En una implementación real, aquí se enviarían los datos al servidor
      await onSave(formData);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error al guardar:', error);
      // Aquí se podría implementar lógica para reintentar o notificar al usuario
    } finally {
      setIsSaving(false);
    }
  };

  // Manejador para cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setHasUnsavedChanges(true);
  };

  // Manejador para guardar manualmente
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveData();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Ficha Clínica</h2>
        <div className="flex items-center">
          {lastSaved && (
            <span className="text-sm text-gray-500 mr-3">
              Último guardado: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isSaving ? 'bg-blue-100 text-blue-800' : 
            hasUnsavedChanges ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {isSaving ? 'Guardando...' : hasUnsavedChanges ? 'Cambios sin guardar' : 'Guardado'}
          </span>
        </div>
      </div>

      <form id={formId} onSubmit={handleSave} className="space-y-6">
        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Paciente
          </label>
          <input
            type="text"
            name="patientName"
            id="patientName"
            value={formData.patientName || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
            Diagnóstico
          </label>
          <input
            type="text"
            name="diagnosis"
            id="diagnosis"
            value={formData.diagnosis || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="sessionNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Notas de Sesión
          </label>
          <textarea
            name="sessionNotes"
            id="sessionNotes"
            rows={5}
            value={formData.sessionNotes || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="treatmentPlan" className="block text-sm font-medium text-gray-700 mb-1">
            Plan de Tratamiento
          </label>
          <textarea
            name="treatmentPlan"
            id="treatmentPlan"
            rows={3}
            value={formData.treatmentPlan || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            disabled={isSaving || !hasUnsavedChanges}
          >
            {isSaving ? 'Guardando...' : 'Guardar Manualmente'}
          </button>
        </div>
      </form>

      <div className="mt-4 bg-blue-50 p-3 rounded-md">
        <p className="text-sm text-blue-700">
          Esta ficha se guarda automáticamente cada {saveInterval / 1000} segundos cuando hay cambios sin guardar.
          También se guarda automáticamente si intentas cerrar la página.
        </p>
      </div>
    </div>
  );
};

export default AutosaveForm;
