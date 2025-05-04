// src/components/prescriptions/ElectronicPrescriptionSystem.tsx
import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  rut: string;
  age: number;
  diagnosis: string;
  allergies: string[];
}

interface Medication {
  id: string;
  name: string;
  activeIngredient: string;
  presentations: string[];
  category: 'simple' | 'retained' | 'magistral';
  requiresRetention: boolean;
}

interface Prescription {
  id: string;
  patientId: string;
  medicationId: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  date: string;
  status: 'draft' | 'issued' | 'dispensed';
}

const ElectronicPrescriptionSystem: React.FC = () => {
  // Estado para el paciente seleccionado
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  
  // Estado para el medicamento seleccionado
  const [selectedMedicationId, setSelectedMedicationId] = useState<string>('');
  const [selectedPresentation, setSelectedPresentation] = useState<string>('');
  
  // Estado para los detalles de la receta
  const [dosage, setDosage] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  
  // Estado para la receta generada
  const [generatedPrescription, setGeneratedPrescription] = useState<Prescription | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  
  // Datos de ejemplo para pacientes
  const patients: Patient[] = [
    {
      id: '1',
      name: 'María González',
      rut: '12.345.678-9',
      age: 35,
      diagnosis: 'Trastorno de Ansiedad Generalizada',
      allergies: ['Penicilina']
    },
    {
      id: '2',
      name: 'Juan Pérez',
      rut: '14.567.890-1',
      age: 42,
      diagnosis: 'Depresión Mayor',
      allergies: []
    },
    {
      id: '3',
      name: 'Ana Martínez',
      rut: '16.789.012-3',
      age: 28,
      diagnosis: 'TDAH',
      allergies: ['Sulfamidas']
    }
  ];
  
  // Datos de ejemplo para medicamentos
  const medications: Medication[] = [
    {
      id: '1',
      name: 'Sertralina',
      activeIngredient: 'Sertralina clorhidrato',
      presentations: ['50 mg comprimidos', '100 mg comprimidos'],
      category: 'simple',
      requiresRetention: false
    },
    {
      id: '2',
      name: 'Alprazolam',
      activeIngredient: 'Alprazolam',
      presentations: ['0.25 mg comprimidos', '0.5 mg comprimidos', '1 mg comprimidos'],
      category: 'retained',
      requiresRetention: true
    },
    {
      id: '3',
      name: 'Metilfenidato',
      activeIngredient: 'Metilfenidato clorhidrato',
      presentations: ['10 mg comprimidos', '20 mg comprimidos de liberación prolongada'],
      category: 'retained',
      requiresRetention: true
    },
    {
      id: '4',
      name: 'Escitalopram',
      activeIngredient: 'Escitalopram oxalato',
      presentations: ['10 mg comprimidos', '20 mg comprimidos'],
      category: 'simple',
      requiresRetention: false
    },
    {
      id: '5',
      name: 'Fórmula Magistral Ansiolítica',
      activeIngredient: 'Compuesto personalizado',
      presentations: ['Solución oral'],
      category: 'magistral',
      requiresRetention: true
    }
  ];
  
  // Función para generar la receta
  const generatePrescription = () => {
    if (!selectedPatientId || !selectedMedicationId || !selectedPresentation || !dosage || !frequency || !duration) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    
    const newPrescription: Prescription = {
      id: Date.now().toString(),
      patientId: selectedPatientId,
      medicationId: selectedMedicationId,
      dosage,
      frequency,
      duration,
      instructions,
      date: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    
    setGeneratedPrescription(newPrescription);
  };
  
  // Función para emitir la receta
  const issuePrescription = () => {
    if (!generatedPrescription) return;
    
    // En una implementación real, aquí se enviaría la receta al sistema central
    // y se generaría un código único para la receta
    
    setGeneratedPrescription({
      ...generatedPrescription,
      status: 'issued'
    });
    
    setShowQRCode(true);
  };
  
  // Función para enviar la receta al paciente
  const sendPrescriptionToPatient = () => {
    if (!generatedPrescription) return;
    
    // En una implementación real, aquí se enviaría la receta al paciente
    // por correo electrónico o se guardaría en su cuenta
    
    alert('Receta enviada al paciente con éxito.');
  };
  
  // Función para limpiar el formulario
  const resetForm = () => {
    setSelectedPatientId('');
    setSelectedMedicationId('');
    setSelectedPresentation('');
    setDosage('');
    setFrequency('');
    setDuration('');
    setInstructions('');
    setGeneratedPrescription(null);
    setShowQRCode(false);
  };
  
  // Obtener el medicamento seleccionado
  const selectedMedication = medications.find(m => m.id === selectedMedicationId);
  
  // Obtener el paciente seleccionado
  const selectedPatient = patients.find(p => p.id === selectedPatientId);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Sistema de Recetas Electrónicas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Selección de paciente */}
        <div>
          <h2 className="text-xl font-semibold mb-4">1. Seleccionar Paciente</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="mb-4">
              <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
              <select 
                id="patient-select" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                disabled={!!generatedPrescription}
              >
                <option value="">Selecciona un paciente</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.rut}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedPatientId && (
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">Información del Paciente</h3>
                {(() => {
                  const patient = patients.find(p => p.id === selectedPatientId);
                  if (!patient) return null;
                  
                  return (
                    <div className="text-sm">
                      <p><span className="font-medium">Nombre:</span> {patient.name}</p>
                      <p><span className="font-medium">RUT:</span> {patient.rut}</p>
                      <p><span className="font-medium">Edad:</span> {patient.age} años</p>
                      <p><span className="font-medium">Diagnóstico:</span> {patient.diagnosis}</p>
                      <p>
                        <span className="font-medium">Alergias:</span> {
                          patient.allergies.length > 0 
                            ? patient.allergies.join(', ') 
                            : 'No registradas'
                        }
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
        
        {/* Selección de medicamento */}
        <div>
          <h2 className="text-xl font-semibold mb-4">2. Seleccionar Medicamento</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="mb-4">
              <label htmlFor="medication-select" className="block text-sm font-medium text-gray-700 mb-1">Medicamento</label>
              <select 
                id="medication-select" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedMedicationId}
                onChange={(e) => {
                  setSelectedMedicationId(e.target.value);
                  setSelectedPresentation('');
                }}
                disabled={!!generatedPrescription}
              >
                <option value="">Selecciona un medicamento</option>
                {medications.map(medication => (
                  <option key={medication.id} value={medication.id}>
                    {medication.name} ({medication.activeIngredient})
                  </option>
                ))}
              </select>
            </div>
            
            {selectedMedicationId && (
              <>
                <div className="mb-4">
                  <label htmlFor="presentation-select" className="block text-sm font-medium text-gray-700 mb-1">Presentación</label>
                  <select 
                    id="presentation-select" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedPresentation}
                    onChange={(e) => setSelectedPresentation(e.target.value)}
                    disabled={!!generatedPrescription}
                  >
                    <option value="">Selecciona una presentación</option>
                    {selectedMedication?.presentations.map((presentation, index) => (
                      <option key={index} value={presentation}>
                        {presentation}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedMedication?.requiresRetention && (
                  <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 mb-4">
                    <p className="text-sm text-yellow-800">
                      <span className="font-bold">Nota:</span> Este medicamento requiere receta retenida según normativa vigente.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Detalles de la prescripción */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. Detalles de la Prescripción</h2>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="dosage-input" className="block text-sm font-medium text-gray-700 mb-1">Dosis *</label>
              <input
                type="text"
                id="dosage-input"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ej: 1 comprimido"
                disabled={!!generatedPrescription}
              />
            </div>
            
            <div>
              <label htmlFor="frequency-input" className="block text-sm font-medium text-gray-700 mb-1">Frecuencia *</label>
              <input
                type="text"
                id="frequency-input"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ej: Cada 12 horas"
                disabled={!!generatedPrescription}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="duration-input" className="block text-sm font-medium text-gray-700 mb-1">Duración *</label>
              <input
                type="text"
                id="duration-input"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ej: 30 días"
                disabled={!!generatedPrescription}
              />
            </div>
            
            <div>
              <label htmlFor="instructions-input" className="block text-sm font-medium text-gray-700 mb-1">Instrucciones adicionales</label>
              <input
                type="text"
                id="instructions-input"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ej: Tomar después de las comidas"
                disabled={!!generatedPrescription}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              onClick={generatePrescription}
              disabled={!selectedPatientId || !selectedMedicationId || !selectedPresentation || !dosage || !frequency || !duration || !!generatedPrescription}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                selectedPatientId && selectedMedicationId && selectedPresentation && dosage && frequency && duration && !generatedPrescription
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Generar Receta
            </button>
          </div>
        </div>
      </div>
      
      {/* Receta generada */}
      {generatedPrescription && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Receta Generada</h2>
          <div className="bg-white p-6 rounded-lg border border-gray-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-blue-800">RECETA MÉDICA ELECTRÓNICA</h3>
                <p className="text-sm text-gray-500">
                  Fecha: {new Date(generatedPrescription.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">Estado: {
                  generatedPrescription.status === 'draft' ? 'Borrador' :
                  generatedPrescription.status === 'issued' ? 'Emitida' : 'Dispensada'
                }</p>
                <p className="text-sm text-gray-500">ID: {generatedPrescription.id}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold mb-2">Datos del Paciente</h4>
                <div className="bg-gray-50 p-3 rounded border">
                  <p><span className="font-medium">Nombre:</span> {selectedPatient?.name}</p>
                  <p><span className="font-medium">RUT:</span> {selectedPatient?.rut}</p>
                  <p><span className="font-medium">Edad:</span> {selectedPatient?.age} años</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">Datos del Medicamento</h4>
                <div className="bg-gray-50 p-3 rounded border">
                  <p><span className="font-medium">Nombre:</span> {selectedMedication?.name}</p>
                  <p><span className="font-medium">Principio activo:</span> {selectedMedication?.activeIngredient}</p>
                  <p><span className="font-medium">Presentación:</span> {selectedPresentation}</p>
                  <p>
                    <span className="font-medium">Tipo:</span> {
                      selectedMedication?.category === 'simple' ? 'Receta Simple' :
                      selectedMedication?.category === 'retained' ? 'Receta Retenida' : 'Receta Magistral'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">Indicaciones</h4>
              <div className="bg-gray-50 p-3 rounded border">
                <p><span className="font-medium">Dosis:</span> {generatedPrescription.dosage}</p>
                <p><span className="font-medium">Frecuencia:</span> {generatedPrescription.frequency}</p>
                <p><span className="font-medium">Duración:</span> {generatedPrescription.duration}</p>
                {generatedPrescription.instructions && (
                  <p><span className="font-medium">Instrucciones adicionales:</span> {generatedPrescription.instructions}</p>
                )}
              </div>
            </div>
            
            {showQRCode && (
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 border rounded-md">
                  <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm text-center">
                      [Código QR de verificación]<br/>
                      ID: {generatedPrescription.id}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Nueva Receta
              </button>
              
              <div className="space-x-2">
                {generatedPrescription.status === 'draft' && (
                  <button
                    onClick={issuePrescription}
                    className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    Emitir Receta
                  </button>
                )}
                
                {generatedPrescription.status === 'issued' && (
                  <button
                    onClick={sendPrescriptionToPatient}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Enviar al Paciente
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Acerca del Sistema de Recetas Electrónicas</h3>
        <p className="text-sm text-blue-700 mb-2">
          Este sistema permite generar recetas médicas electrónicas que cumplen con la normativa vigente
          y son aceptadas en todas las farmacias del país. Las recetas incluyen un código QR de verificación
          que garantiza su autenticidad y evita falsificaciones.
        </p>
        <p className="text-sm text-blue-700">
          Las recetas electrónicas se envían directamente a la cuenta del paciente, quien puede presentarlas
          en la farmacia desde su dispositivo móvil o imprimirlas si lo prefiere.
        </p>
      </div>
    </div>
  );
};

export default ElectronicPrescriptionSystem;
